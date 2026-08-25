English | [繁體中文](../zh-Hant/customization.md)

# Customization

Colors, fonts, and favicons.

## Color palette

All colors are CSS custom properties defined at the top of
`src/styles/global.css`. There are two blocks:

- `:root` — the light-mode ("water-blue") palette.
- `:root.dark` — the dark-mode ("night-sky-blue") palette.

`<html>` always carries either `.dark` or `.light` (the "follow system" setting
is resolved to one of them in the inline script at the top of `BaseHead.astro`),
so there is no `@media (prefers-color-scheme)` block to keep in sync — you edit
one dark token table, not two.

Key variables:

| Variable | Role |
| :--- | :--- |
| `--accent` / `--accent-dark` / `--accent-light` | Primary accent and its hover / tint variants. |
| `--bg` / `--bg-gradient-start` | Page background and the top of its gradient. |
| `--text` | Body text color. |
| `--black` / `--gray` / `--gray-light` / `--gray-dark` | Grayscale ramp, stored as raw `R, G, B` triples for use in `rgba(var(--gray), …)`. |
| `--callout-*-c` / `--callout-*-fg` | Per-type callout border/icon color and title color. |

The inline comments record the measured WCAG contrast ratio for each foreground
token. If you re-theme, re-check contrast for text tokens (`-fg`, `--text`,
`--gray`) so you don't regress accessibility — the ratios in the comments tell
you how much headroom each one had.

To change the accent from water-blue to something else, edit `--accent` and its
variants in **both** blocks; most of the UI derives from them.

## Fonts

Three variable fonts ship with the theme, each with a distinct role:

| Font | Role | Where declared |
| :--- | :--- | :--- |
| **Nunito** | Latin text, digits, common punctuation | `@font-face` in `global.css` |
| **Chiron GoRound TC** | Traditional Chinese (CJK) glyphs | `public/fonts/chiron-go-round-tc-1.011/css/vf.css` |
| **Monaspace Radon** | Code blocks and inline code | `@font-face` in `global.css` |

The body stack is `font-family: 'Nunito', 'Chiron GoRound TC WS', sans-serif`.
Nunito is deliberately first: it handles Latin/digits/punctuation (and loads in
~29ms), and only characters it lacks — i.e. Chinese — fall through to Chiron's
CJK subsets. This avoids loading Chiron's 116KB Latin (`lgc`) subset and
eliminates a second Latin re-shape.

`BaseHead.astro` has a two-stage Chinese font strategy: it preloads and inlines
the `@font-face` rules for the most-common-hanzi subsets (so first paint gets
real glyphs), and lets the remaining rare-character subsets load non-blocking.
All faces use `font-display: swap`.

### Swapping the CJK font

To use a different Traditional/Simplified Chinese font:

1. Drop the font's files under `public/fonts/<your-font>/` and point the
   `<link rel="stylesheet">` in `BaseHead.astro` at its CSS (or replace the
   inlined `@font-face` rules).
2. Update the `font-family` name in the body stack in `global.css`.
3. Update the preload `<link>` and the inlined critical-subset `@font-face` in
   `BaseHead.astro` to match the new font's subset filenames — or, if the font
   isn't subset, remove that optimization and just load it plainly.
4. Update `public/_headers` if you renamed the font folder (it long-caches
   `/fonts/*`), and refresh the `NOTICE` / `OFL.txt` licensing entries.

> **Simplified Chinese sites.** The theme ships as `zh-Hant` and its bundled
> font, Chiron GoRound TC, is a Traditional Chinese face (subset-sliced). For a
> Simplified Chinese site, follow the same swap above and replace it with an SC
> font — e.g. **Source Han Sans SC / Noto Sans SC** (both OFL) — so glyph forms
> match SC conventions and no simplified-only characters fall through to a
> system fallback. There's no separate SC build; it's the font-swap path.

### Dropping Chinese entirely (English-first sites)

If you're running an English-only site, you don't need Chiron at all. The
`going-english-first` demo post walks through this: remove the Chiron
`<link>`, preload, and inlined `@font-face` from `BaseHead.astro`, and simplify
the body stack to `font-family: 'Nunito', sans-serif`. Delete the
`public/fonts/chiron-go-round-tc-1.011/` folder and its `NOTICE` entry.

### Licensing

All three fonts are under the SIL Open Font License 1.1. Each ships its own
`OFL.txt`, and sources/copyright are listed in the root `NOTICE`. If you add or
remove a font, keep `NOTICE` in sync.

## Favicons

Favicons are served verbatim from `public/` and linked in `BaseHead.astro`:

- `public/favicon.svg` — primary (modern browsers)
- `public/favicon.ico` — legacy fallback (`sizes="any"`)
- `public/apple-touch-icon.png` — iOS home screen

Replace these three files with your own to rebrand.
