[English](./README.md) | 繁體中文

<p align="center">
  <img src="./src/assets/avatar.png" width="140" alt="碧落 Biluo logo" />
</p>

<h1 align="center">碧落 Biluo</h1>

<p align="center">
  <img src="./assets/banner.png" alt="碧落 Biluo —— 亮色與暗色主題，以切換鈕的圓形 reveal 分隔" />
</p>

一個注重效能與排版的部落格主題，以 [Astro](https://astro.build) 靜態輸出建置，
部署在 **Cloudflare Workers Static Assets**。內容走 Markdown／MDX 內容集合，
搜尋用 Pagefind，留言用 Giscus，並具備暗色模式、樹狀系列文、標籤分群、
RSS／sitemap／llms.txt，以及 i18n-ready 的單一語系設計。

> 主題定名 **碧落 / Biluo**，取自白居易《長恨歌》「上窮碧落下黃泉」，「碧落」即青碧的
> 天界／天空，呼應本主題的水藍（亮色）與夜空藍（暗色）配色。

> **授權一覽**：主題程式碼採 MIT（見 `LICENSE`）；隨附字型為 SIL OFL 1.1
> （見 `NOTICE` 與 `public/fonts/` 下各 `OFL.txt`）；你新增的內容屬於你自己。
> 詳見 [授權](#授權)。

## 功能

- 明亮／暗色模式，水藍／夜空藍配色
- 標籤巢狀分群，以及樹狀結構的系列文
- 全站搜尋（[Pagefind](https://pagefind.app) 建置期索引，非 Google `site:`）
- Callout／Admonition 區塊（note／tip／important／warning／caution）
- GitHub 風格註腳（標籤已在地化）、標題錨點連結
- 程式碼區塊複製鈕、圖片點擊放大、閱讀時間估計
- 置頂文章、相似文章推薦、目錄（TOC）、分頁
- RSS（含 XSL 樣式頁）、sitemap、`llms.txt`、`robots.txt`
- 預設 hero 圖 fallback、`og:image` fallback 到文章 hero
- 手機抽屜式 header、自訂 404 頁
- UI 字串集中化（i18n-ready、刻意採單一語系）

<p align="center">
  <img src="./assets/post.png" width="720" alt="文章頁：目錄、系列導覽、在地化 callout 與語法高亮程式碼" />
</p>
<p align="center"><sub>文章頁 —— 目錄、系列導覽、在地化 callout 與程式碼高亮。</sub></p>

## 技術棧

- **[Astro](https://astro.build) 7**（`output: static`），Node 22+
- **內容**：Markdown／MDX 內容集合（`@astrojs/mdx`）；GitHub 警示語法、標題錨點。
  Markdown 管線在 `astro.config.mjs` 以 `processor: unified({...})` 設定
  （Astro 7 的第一級接法）。`@astrojs/markdown-remark` 是承重依賴。
- **搜尋**：[Pagefind](https://pagefind.app)（建置期索引）
- **圖片**：Astro `<Image>` + `sharp`（webp／縮放）
- **留言**：Giscus，provider 可抽換（見 `src/data/comments.ts`）；預設關閉
- **部署**：Cloudflare Workers Static Assets（`wrangler`）

## 快速開始

| 指令 | 作用 |
| :--- | :--- |
| `pnpm install` | 安裝相依套件 |
| `pnpm dev` | 開發伺服器 `localhost:4321`（`astro dev`） |
| `pnpm build` | 建置到 `./dist/`（`astro build` + Pagefind 索引） |
| `pnpm preview` | 以 `wrangler dev` 在地服務 `dist`（`localhost:8787`，最貼近線上） |
| `pnpm deploy` | 建置並 `wrangler deploy` |

> 非互動環境（CI／agent）請用 `CI=true pnpm build`（pnpm 11 否則會卡在互動提示）。
>
> 檢查頁面數量：`pnpm build && find ./dist -maxdepth 10 -type f | wc -l`

## 設定（要改先看這裡）

| 想改的東西 | 檔案 |
| :--- | :--- |
| 站名／描述／作者／每頁篇數 | `src/consts.ts` |
| 文章 | `src/content/blog/*.{md,mdx}`（frontmatter schema 在 `src/content.config.ts`） |
| 系列文（內容） | `src/data/series.ts`（型別／邏輯在 `src/lib/series.ts`） |
| 標籤分類與群組 | `src/data/taxonomy.ts`（型別／邏輯在 `src/lib/taxonomy.ts`） |
| 友站清單 | `src/data/blogroll.ts` |
| 留言板（Giscus） | `src/data/comments.ts`（值到 [giscus.app](https://giscus.app) 取得） |
| UI 字串（i18n） | `src/i18n/ui.ts` |
| 站台 URL／Markdown 管線／轉址／sitemap | `astro.config.mjs` |
| Cloudflare 部署（404 處理、assets 目錄） | `wrangler.jsonc` |
| 靜態資產快取標頭 | `public/_headers` |

文章 frontmatter 欄位：`title`（必填）、`description`、`pubDate`（必填）、
`updatedDate`、`heroImage`、`tags`、`pinned`。

**圖片放哪**：要經 Astro 優化（縮放／webp，hero／series／avatar）放 `src/assets/`；
原樣輸出（favicon、字型、`_headers`）放 `public/`。

## 文件

更深入的指南放在 [`docs/`](./docs/)（英文與繁體中文）：

- [內容](./docs/zh-Hant/content.md) — 文章 frontmatter、系列文資料模型、標籤、語言分面。
- [客製化](./docs/zh-Hant/customization.md) — 配色、字型（抽換或移除）、favicon。
- [搜尋](./docs/zh-Hant/search.md) — Pagefind 怎麼建索引，以及為何 `pnpm dev` 搜不到東西。
- [留言板](./docs/zh-Hant/comments.md) — 啟用 Giscus 與接上其他 provider。
- [部署](./docs/zh-Hant/deployment.md) — Cloudflare Workers 與其他靜態主機。
- [SEO 與爬蟲](./docs/zh-Hant/seo-and-crawlers.md) — robots.txt 與 AI 爬蟲政策、sitemap、社群預覽、`llms.txt`。

`src/content/blog/` 下的 demo 文同時也是文件。

## 專案結構

```text
src/
├── assets/           # 經 Astro 優化的圖（hero / series / avatar）
├── components/       # Astro 元件（Header、SeriesCard、Comments…）
├── content/blog/     # 文章（Markdown / MDX）
├── content.config.ts # 文章 frontmatter schema
├── consts.ts         # 站台基本設定
├── data/             # 內容資料：series / taxonomy / blogroll / comments
├── i18n/             # UI 字串（ui.ts）與工具（utils.ts）
├── layouts/          # 版面（BaseLayout / BlogPost…）
├── lib/              # 資料 schema 與邏輯（series / taxonomy）
├── pages/            # 路由（blog / series / tags / rss / 404…）
└── styles/           # 全域樣式（global.css）
public/               # 原樣資產：favicon / fonts / _headers
astro.config.mjs      # site URL / Markdown 管線 / redirects / sitemap
wrangler.jsonc        # Cloudflare Workers Static Assets 部署設定
```

## 部署

部署為 **Cloudflare Workers Static Assets**（非 Pages；`wrangler.jsonc` 只設
`assets`、無 `main`）。兩個與 Pages 不同、要注意的點：

- **自訂 404**：須在 `wrangler.jsonc` 設 `assets.not_found_handling: "404-page"`，
  否則自訂 404 只在 `pnpm dev` 生效、線上回空白 404。
- **快取標頭**：預設為 `max-age=0, must-revalidate`。`public/_headers` 對
  `/_astro/*` 與 `/fonts/*` 上 `immutable` 長快取（HTML 維持預設以即時更新）。
  若更名字型資料夾，記得同步改 `@font-face` 引用與 `_headers` 規則。

## 國際化

本主題**刻意採單一語系設計**（i18n-*ready*，非多語）。所有 UI 字串集中在
`src/i18n/ui.ts`，其中 `siteLocale` 是全站語系的單一真相來源
（`<html lang>`、`og:locale`、日期格式化）。隨附預設為繁體中文（`zh-Hant`）。

要做英文為主的站，改 `src/i18n/ui.ts` 的 `defaultLang`／`siteLocale` 並翻譯 UI
字串即可。本主題沒有逐篇語言切換器；要在站上組織多種語言的內容，可把標籤與系列
當作分面（facet）使用。（有一篇 demo 文會走過這個做法。）

## 藍圖（Roadmap）

- **Remark → Sätteri。** Markdown 管線目前跑在 Remark 上（透過
  `astro.config.mjs` 的 `processor: unified({...})`）。計畫是待
  [**Sätteri**](https://github.com/bruits/satteri)——一個以 Rust 解析與編譯、外掛
  仍跑在 JavaScript，並建立在相同 unified（Remark/Rehype）生態上的 Markdown/MDX
  處理器——推出**正式版**、周邊套件成熟後，將其替換過去。替換只會在 Sätteri 已是
  正式版**且**現有管線的每一項功能都能在其上
  確實複現、切換過去不造成任何退化時才進行——在那之前，維持 Remark。

## 授權

- **程式碼** — MIT（`LICENSE`）。
- **字型** — SIL Open Font License 1.1。各字型在 `public/fonts/` 下隨附自己的
  `OFL.txt`；出處與版權列於 `NOTICE`。
- **內容** — 屬於你。你在 `src/content/` 與 `src/assets/` 下新增的內容不在主題的
  MIT 授權範圍內。頁尾會渲染可設定的內容授權（預設 CC BY-NC-ND 4.0）。
