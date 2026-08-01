// 站台層級的全域設定：站名、描述、作者、社群連結、內容授權等。要客製先從這裡改。

export const SITE_TITLE = '碧落 Biluo';
export const SITE_DESCRIPTION = '碧落 Biluo — 注重效能與排版的 Astro 部落格主題，這裡是它的線上示範站。';

// 作者顯示名稱（用於 JSON-LD 結構化資料的 author / Person）。對讀者／搜尋引擎呈現的人設名。
export const SITE_AUTHOR = 'Just-Passersby';

// 頁尾版權持有者（© 後面那個名字）。版權聲明慣例用穩定可識別的身分（例如你的姓名或 GitHub handle）。
// 可與 SITE_AUTHOR 不同：前者是人設顯示名、此處是版權署名。
export const COPYRIGHT_NAME = 'Just-Passersby';

// 站上文章內容的授權（顯示於頁尾）。與程式碼的 MIT（見 LICENSE）分開：程式 MIT、內容歸你。
// 預設「保留所有權利」；要改用 CC 等授權，改這裡的代碼，並到 src/i18n/ui.ts 填 license.* 三個值。
export const CONTENT_LICENSE = 'All rights reserved';

// 全部文章列表每頁顯示篇數
export const POSTS_PER_PAGE = 15;

// 頁尾社群／聯絡連結。icon 對應 src/lib/social-icons.ts 的鍵（查無則退回通用圖示，
// 連結照樣可用，要專屬圖示再去那邊補一筆 path）。label 是螢幕報讀文字，直接寫字串、
// 不走 i18n——個人連結標籤毋須翻譯。email 等聯絡方式就填 mailto: 當作一筆。
// RSS 不放這裡（由 Footer 固定渲染，屬站台功能非個人社群）。
export const SOCIAL_LINKS: { icon: string; label: string; href: string }[] = [
	{ icon: 'github', label: 'GitHub', href: 'https://github.com/your-name' },
	// { icon: 'mail', label: 'Email', href: 'mailto:you@example.com' },
];
