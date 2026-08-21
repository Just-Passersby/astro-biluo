---
title: "Going English-first (Removing the Chinese-specific Bits)"
description: "If your site won't use Chinese, here's exactly what to change and what you can delete."
pubDate: 2026-06-16
tags: ["English", "Localization"]
---

Biluo ships as a Traditional Chinese (`zh-Hant`) theme, but nothing about it is
locked to Chinese. This guide lists the few places to change to run an
English-first site — and what you can safely delete.

> [!NOTE]
> The theme is **single-locale**: there's no per-post language switcher. You're
> switching the *whole site* to English, not adding a second language.

## 1. Switch the site locale

Everything locale-related flows from `src/i18n/ui.ts`:

1. Add an `en` entry to the `ui` object and translate the strings (they're short
   UI labels — nav, search, pagination, post chrome).
2. Add `en` to `localeTags`, e.g.
   `en: { html: 'en', og: 'en_US', intl: 'en', giscus: 'en' }`.
3. Set `defaultLang = 'en'`.

That single source of truth feeds `<html lang>`, `og:locale`, JSON-LD
`inLanguage`, and date formatting — so changing it here updates them everywhere.

While you're in `ui.ts`, point `license.url` at the English CC deed (or your own
license) and translate `license.fullName` / `license.contact`.

## 2. Footnote labels

The footnote section heading and back-link are localized in `astro.config.mjs`:

```js
remarkRehype: {
  footnoteLabel: 'Footnotes',
  footnoteBackLabel: 'Back to content',
}
```

## 3. Callouts — nothing to do

Callout titles (Note / Tip / Important / Warning / Caution) come from
`remark-github-blockquote-alert` and are **already English** by default. No
change needed.

To remove the labels at the front for alerts, you can comment out

the code in

`src/layouts/BlogPost.astro`

```css
:global(.markdown-alert-title::before) { font-size: 1.15em; letter-spacing: normal; }
:global(.markdown-alert-note .markdown-alert-title::before)      { content: '注意'; }
:global(.markdown-alert-note .markdown-alert-title::before)      { content: '注意'; }
:global(.markdown-alert-tip .markdown-alert-title::before)       { content: '提示'; }
:global(.markdown-alert-important .markdown-alert-title::before) { content: '重要'; }
:global(.markdown-alert-warning .markdown-alert-title::before)   { content: '警告'; }
:global(.markdown-alert-caution .markdown-alert-title::before)   { content: '危險'; }
:global(.markdown-alert-caution .markdown-alert-title::before)   { content: '危險'; }
```

## 4. Fonts (optional, but recommended for English-only)

The CJK body font (Chiron GoRound TC) is only worth its bytes if you render
Chinese. For an English-only site:

- In `src/styles/global.css`, drop `'Chiron GoRound TC WS'` from the body
  `font-family` stack, leaving `'Nunito', sans-serif`. Keep Monaspace Radon for
  code.
- In `src/components/BaseHead.astro`, remove the inlined CJK `@font-face`
  declarations, the `preload` for the CJK slice, and the `vf.css` stylesheet
  link.
- Delete `public/fonts/chiron-go-round-tc-1.011/`, and remove its entry from
  `NOTICE` and the `/fonts/*` rule in `public/_headers` if it no longer applies.

> [!TIP]
> Nunito (Latin) and Monaspace Radon (code) are also OFL fonts and stay. After
> removing Chiron you'll ship noticeably fewer font bytes per page.

## 5. The obvious text

Update `src/consts.ts` (title, description, author) and the `src/pages/about.astro`
copy to English. Then rebuild and skim the home, post, tags, and series pages.

That's the whole list. Everything else in the theme is language-neutral.
