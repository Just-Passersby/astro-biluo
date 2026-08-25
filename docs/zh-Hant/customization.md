[English](../en/customization.md) | 繁體中文

# 客製化

配色、字型與 favicon。

## 配色

所有顏色都是 `src/styles/global.css` 頂端的 CSS 自訂屬性。分兩區塊：

- `:root` — 淺色模式（「水藍」）配色。
- `:root.dark` — 深色模式（「夜空藍」）配色。

`<html>` 上永遠帶著 `.dark` 或 `.light`（「跟隨系統」在 `BaseHead.astro` 頂端的
inline script 就即時解析成其中之一），所以沒有 `@media (prefers-color-scheme)`
區塊要同步——你只維護一份深色 token 表，不是兩份。

主要變數：

| 變數 | 作用 |
| :--- | :--- |
| `--accent` / `--accent-dark` / `--accent-light` | 主色調與其 hover／點綴變體。 |
| `--bg` / `--bg-gradient-start` | 頁面背景與其漸層頂端。 |
| `--text` | 內文文字色。 |
| `--black` / `--gray` / `--gray-light` / `--gray-dark` | 灰階級距，以原始 `R, G, B` 三元組存放，供 `rgba(var(--gray), …)` 使用。 |
| `--callout-*-c` / `--callout-*-fg` | 各類型 callout 的邊框／圖示色與標題色。 |

行內註解記錄了每個前景 token 實測的 WCAG 對比值。重新配色時，記得重新檢查文字
token（`-fg`、`--text`、`--gray`）的對比，別讓無障礙倒退——註解裡的比值會告訴你
每個 token 原本留了多少餘裕。

想把主色從水藍換成別的，改**兩個區塊**裡的 `--accent` 及其變體即可；大部分 UI
都是從它們衍生的。

## 字型

主題隨附三套變體字型，各司其職：

| 字型 | 角色 | 宣告位置 |
| :--- | :--- | :--- |
| **Nunito** | 拉丁文字、數字、常用標點 | `global.css` 的 `@font-face` |
| **Chiron GoRound TC** | 繁體中文（CJK）字形 | `public/fonts/chiron-go-round-tc-1.011/css/vf.css` |
| **Monaspace Radon** | 程式碼區塊與行內程式碼 | `global.css` 的 `@font-face` |

內文字型堆疊是 `font-family: 'Nunito', 'Chiron GoRound TC WS', sans-serif`。
Nunito 刻意排第一：它接管拉丁／數字／標點（且約 29ms 就載入），只有它沒有的字
——也就是中文——才落到 Chiron 的 CJK 切片。如此不必載 Chiron 的 116KB 拉丁
（`lgc`）切片，也消掉拉丁的二次換字。

`BaseHead.astro` 有一套兩段式的中文字型策略：preload 並 inline 最常用漢字切片的
`@font-face`（讓首屏就拿到真字形），其餘罕用字切片則以非阻塞方式載入。所有 face
皆 `font-display: swap`。

### 抽換 CJK 字型

要換成別的繁／簡中文字型：

1. 把字型檔放到 `public/fonts/<你的字型>/`，並把 `BaseHead.astro` 裡的
   `<link rel="stylesheet">` 指向它的 CSS（或替換掉那幾條 inline 的 `@font-face`）。
2. 更新 `global.css` 內文堆疊裡的 `font-family` 名稱。
3. 更新 `BaseHead.astro` 裡的 preload `<link>` 與 inline 的關鍵切片 `@font-face`，
   對上新字型的切片檔名——或者，如果新字型沒有分切片，就移除這項優化、直接整支載。
4. 若你改了字型資料夾名稱，記得更新 `public/_headers`（它對 `/fonts/*` 上長快取），
   並同步 `NOTICE` / `OFL.txt` 的授權條目。

> **簡體中文站。** 本主題以 `zh-Hant` 為預設，隨附的 Chiron GoRound TC 是繁體字形
> （切片版）。要做簡中站，照上面的抽換流程，把它換成一套 SC 字型——例如
> **思源黑體 SC / Noto Sans SC**（皆 OFL）——讓字形符合簡中慣例，也避免簡中專用字
> 掉到系統 fallback。主題沒有另外的簡中建置版，就是走換字這條路。

### 完全不用中文（英文為主的站）

如果你經營的是純英文站，根本不需要 Chiron。`going-english-first` 這篇 demo 文
會走過這個流程：從 `BaseHead.astro` 移除 Chiron 的 `<link>`、preload 與 inline
`@font-face`，並把內文堆疊簡化成 `font-family: 'Nunito', sans-serif`。刪掉
`public/fonts/chiron-go-round-tc-1.011/` 資料夾與它在 `NOTICE` 的條目。

### 授權

三套字型皆採 SIL Open Font License 1.1。每套都隨附自己的 `OFL.txt`，出處／版權
列在根目錄的 `NOTICE`。若你新增或移除字型，記得同步 `NOTICE`。

## Favicon

Favicon 從 `public/` 原樣輸出，並在 `BaseHead.astro` 裡連結：

- `public/favicon.svg` — 主要（現代瀏覽器）
- `public/favicon.ico` — 舊版後備（`sizes="any"`）
- `public/apple-touch-icon.png` — iOS 主畫面

換成你自己的這三個檔即可換品牌識別。
