// @ts-check

import { readdirSync, readFileSync } from 'node:fs';
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkAlert } from 'remark-github-blockquote-alert';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { defineConfig } from 'astro/config';

// ── sitemap lastmod ──
// 讀每篇文章 frontmatter 的日期，建立 slug → ISO 日期的對照表，
// 在 sitemap serialize 時掛到對應 URL，讓爬蟲知道哪些頁面更新過、優先重爬。

// 重現 Astro glob loader 的 slug 規則（其底層用 github-slugger）：
// 小寫、空白轉連字號、移除點號等標點，保留字母/數字/底線/連字號與 CJK。
// 已驗證對現有所有檔名輸出皆與實際 URL 一致；若未來某檔對不上，
// 該頁只是少了 lastmod（優雅降級），不會弄壞建置。
const slugify = (name) =>
	name.toLowerCase().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}_-]+/gu, '');

const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);

/** @type {Map<string, string>} slug → ISO 日期字串 */
const blogLastmod = new Map();
for (const file of readdirSync(BLOG_DIR)) {
	if (!/\.(md|mdx)$/.test(file)) continue;
	const raw = readFileSync(new URL(file, BLOG_DIR), 'utf-8');
	const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!fm) continue;
	const field = (key) => {
		const m = fm[1].match(new RegExp(`^${key}:\\s*['"]?([^'"\\n]+)['"]?\\s*$`, 'm'));
		return m ? m[1].trim() : null;
	};
	// 優先用 updatedDate（修改日），沒有才退回 pubDate（發布日）
	const dateStr = field('updatedDate') ?? field('pubDate');
	if (!dateStr) continue;
	const d = new Date(dateStr);
	if (Number.isNaN(d.valueOf())) continue;
	blogLastmod.set(slugify(file.replace(/\.(md|mdx)$/, '')), d.toISOString());
}

// https://astro.build/config
export default defineConfig({
	site: 'https://sofiagomezsanchez6-estrellas.github.io', // ← 換成你的網站正式網址（影響 canonical / sitemap / RSS / OG 絕對連結）
	integrations: [
		mdx(),
		sitemap({
			// /tags/* 全帶 noindex（BaseLayout 的 noindex prop），不該同時出現在
			// sitemap——「請索引」與「勿索引」互相矛盾，GSC 會回報已提交但遭排除。
			filter: (page) => !new URL(page).pathname.startsWith('/tags/'),
			serialize(item) {
				const slug = new URL(item.url).pathname.match(/^\/blog\/([^/]+)\/$/)?.[1];
				const lastmod = slug && blogLastmod.get(slug);
				if (lastmod) item.lastmod = lastmod;
				return item;
			},
		}),
	],
	markdown: {
		// 用新的 processor API（Astro 6.4+）。頂層 markdown.remarkPlugins/rehypePlugins
		// 在 v7 會移除，unified() 是非 deprecated 的接法；它擴充預設管線、保留 gfm/語法高亮。
		processor: unified({
			// GFM 註腳（`[^1]` + `[^1]: …`）自動產生的區塊在地化：
			// 預設標籤是英文 "Footnotes" 且 sr-only 隱藏；改成可見的「註解」h2、↩ 在地化。
			// 註腳區塊一律生成在文件最末（GFM 硬限制，位置不可調）。
			remarkRehype: {
				footnoteLabel: '註解',
				footnoteLabelProperties: {}, // 清掉預設的 sr-only class → 標題可見
				footnoteBackLabel: '回到內文',
			},
			// GitHub 警示語法 `> [!NOTE]` → markdown-alert class（樣式在 BlogPost，與外掛解耦）
			remarkPlugins: [remarkAlert],
			rehypePlugins: [
				// 先讓 Astro 產生標題 id，autolink 才有 href 可指；順序不能顛倒
				rehypeHeadingIds,
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'append',
						properties: { className: ['heading-anchor'], ariaLabel: '此章節的連結' },
						content: { type: 'text', value: '#' },
					},
				],
			],
		}),
	},
	build: {
		// 把 CSS 內聯進 HTML，消除 render-blocking 的外部樣式請求
		// （主要是每頁都載入的 Header CSS）。靜態站經 CDN 快取，代價極小。
		inlineStylesheets: 'always',
	},
	redirects: {
		// 舊路徑 → 新路徑的轉址。例：
		// '/old-path': '/new-path',
	},
});
