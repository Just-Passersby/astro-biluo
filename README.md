English | [繁體中文](./README.zh-Hant.md)

<p align="center">
  <img src="./src/assets/avatar.png" width="140" alt="Biluo logo" />
</p>

<h1 align="center">Biluo (碧落)</h1>

<p align="center">
  <img src="./assets/banner.png" alt="Biluo — light and dark themes, split by the theme-toggle's circular reveal" />
</p>

A clean, performance-focused blog theme built with [Astro](https://astro.build)
and deployed to **Cloudflare Workers Static Assets**. Content is authored in
Markdown / MDX content collections, search is powered by Pagefind, comments by
Giscus, with dark mode, a tree-structured series system, grouped tags, RSS /
sitemap / llms.txt, and an i18n-ready single-locale design.

> The name **碧落 / Biluo** comes from the classical Chinese term for the *azure
> heavens*, echoing the theme's water-blue (light) and night-sky-blue (dark)
> palette.

> **Licensing at a glance:** the theme source code is MIT (see `LICENSE`); the
> bundled fonts are SIL OFL 1.1 (see `NOTICE` and the `OFL.txt` files under
> `public/fonts/`); any content you add is your own. See [License](#license).

## Features

- Light / dark mode with water-blue / night-sky-blue palettes
- Tags with nested groups, and a tree-structured series system
- Full-text search via [Pagefind](https://pagefind.app) (build-time index, not Google `site:`)
- Callouts / admonitions (note / tip / important / warning / caution)
- GitHub-style footnotes (label localized), heading anchor links
- Code-block copy button, click-to-zoom images, reading-time estimate
- Pinned post, related posts, table of contents, pagination
- RSS (with styled XSL view), sitemap, `llms.txt`, `robots.txt`
- Default hero image fallback, `og:image` fallback to a post's hero
- Mobile drawer header, custom 404 page
- Centralized UI strings (i18n-ready, single-locale by design)

<p align="center">
  <img src="./assets/post.png" width="720" alt="A post page: table of contents, series navigation, localized callouts, and syntax-highlighted code" />
</p>
<p align="center"><sub>A post page — table of contents, series navigation, localized callouts, and code highlighting.</sub></p>

## Tech stack

- **[Astro](https://astro.build) 7** (`output: static`), Node 22+
- **Content**: Markdown / MDX content collections (`@astrojs/mdx`); GitHub alert
  syntax, heading anchors. The Markdown pipeline is configured in
  `astro.config.mjs` via `processor: unified({...})` (Astro 7's first-class
  integration point). `@astrojs/markdown-remark` is a load-bearing dependency.
- **Search**: [Pagefind](https://pagefind.app) (build-time index)
- **Images**: Astro `<Image>` + `sharp` (webp / resizing)
- **Comments**: Giscus, provider-swappable (see `src/data/comments.ts`); off by default
- **Deploy**: Cloudflare Workers Static Assets (`wrangler`)

## Quick start

| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server at `localhost:4321` (`astro dev`) |
| `pnpm build` | Build to `./dist/` (`astro build` + Pagefind index) |
| `pnpm preview` | Serve `dist` with `wrangler dev` at `localhost:8787` (closest to production) |
| `pnpm deploy` | Build and `wrangler deploy` |

> In non-interactive environments (CI / agents) build with `CI=true pnpm build`
> (pnpm 11 otherwise blocks on an interactive prompt).
>
> Check page count: `pnpm build && find ./dist -maxdepth 10 -type f | wc -l`

## Configuration (where to change what)

| What you want to change | File |
| :--- | :--- |
| Site title / description / author / posts-per-page | `src/consts.ts` |
| Posts | `src/content/blog/*.{md,mdx}` (frontmatter schema in `src/content.config.ts`) |
| Series (content) | `src/data/series.ts` (types / logic in `src/lib/series.ts`) |
| Tags taxonomy & groups | `src/data/taxonomy.ts` (types / logic in `src/lib/taxonomy.ts`) |
| Blogroll | `src/data/blogroll.ts` |
| Comments (Giscus) | `src/data/comments.ts` (values from [giscus.app](https://giscus.app)) |
| UI strings (i18n) | `src/i18n/ui.ts` |
| Site URL / Markdown pipeline / redirects / sitemap | `astro.config.mjs` |
| Cloudflare deploy (404 handling, assets dir) | `wrangler.jsonc` |
| Static-asset cache headers | `public/_headers` |

Post frontmatter fields: `title` (required), `description`, `pubDate`
(required), `updatedDate`, `heroImage`, `tags`, `pinned`.

**Where images go**: images that should go through Astro's optimizer (resize /
webp — hero / series / avatar) live in `src/assets/`; assets served verbatim
(favicon, fonts, `_headers`) live in `public/`.

## Documentation

Deeper guides live in [`docs/`](./docs/) (English and 繁體中文):

- [Content](./docs/en/content.md) — post frontmatter, the series data model,
  tags, and language facets.
- [Customization](./docs/en/customization.md) — color palette, fonts (swap or
  drop them), favicons.
- [Search](./docs/en/search.md) — how Pagefind indexes the site, and why search
  is blank in `pnpm dev`.
- [Comments](./docs/en/comments.md) — enabling Giscus and wiring up other
  providers.
- [Deployment](./docs/en/deployment.md) — Cloudflare Workers and other static
  hosts.
- [SEO and crawlers](./docs/en/seo-and-crawlers.md) — robots.txt and the
  AI-crawler policy, sitemap, social previews, `llms.txt`.

The demo posts under `src/content/blog/` also double as documentation.

## Project structure

```text
src/
├── assets/           # Astro-optimized images (hero / series / avatar)
├── components/       # Astro components (Header, SeriesCard, Comments…)
├── content/blog/     # Posts (Markdown / MDX)
├── content.config.ts # Post frontmatter schema
├── consts.ts         # Site-level settings
├── data/             # Content data: series / taxonomy / blogroll / comments
├── i18n/             # UI strings (ui.ts) and helpers (utils.ts)
├── layouts/          # Layouts (BaseLayout / BlogPost…)
├── lib/              # Data schema & logic (series / taxonomy)
├── pages/            # Routes (blog / series / tags / rss / 404…)
└── styles/           # Global styles (global.css)
public/               # Verbatim assets: favicon / fonts / _headers
astro.config.mjs      # site URL / Markdown pipeline / redirects / sitemap
wrangler.jsonc        # Cloudflare Workers Static Assets deploy config
```

## Deployment

This theme deploys to **Cloudflare Workers Static Assets** (not Pages;
`wrangler.jsonc` only sets `assets`, with no `main`). Two gotchas that differ
from Pages:

- **Custom 404**: set `assets.not_found_handling: "404-page"` in
  `wrangler.jsonc`, otherwise the custom 404 only works in `pnpm dev` and
  returns a blank 404 in production.
- **Cache headers**: the default is `max-age=0, must-revalidate`. `public/_headers`
  puts `immutable` long-cache on `/_astro/*` and `/fonts/*` (HTML stays on the
  default so it updates immediately). If you rename the font folder, update both
  the `@font-face` references and the `_headers` rules.

## Internationalization

The theme is **single-locale by design** (i18n-*ready*, not multilingual). All
UI strings live in `src/i18n/ui.ts`, and `siteLocale` there is the single source
of truth for the site's locale (`<html lang>`, `og:locale`, date formatting).
The shipped default is Traditional Chinese (`zh-Hant`).

To run an English-first site, change `defaultLang` / `siteLocale` in
`src/i18n/ui.ts` and translate the UI strings. There is no per-post language
switcher; to organize content in more than one language, use tags and series as
facets. (A demo post walks through this.)

## Roadmap

- **Remark → Sätteri.** The Markdown pipeline currently runs on Remark (via
  `processor: unified({...})` in `astro.config.mjs`). The plan is to switch it to
  **Sätteri** once that project reaches a **stable release** and its surrounding
  packages mature. The switch will only
  land once Sätteri is stable *and* every feature the current pipeline provides
  is verifiably reproduced on it, with no regression — until then, Remark stays.

## License

- **Code** — MIT (`LICENSE`).
- **Fonts** — SIL Open Font License 1.1. Each font ships its own `OFL.txt` under
  `public/fonts/`; sources and copyright are listed in `NOTICE`.
- **Content** — yours. Anything you add under `src/content/` and `src/assets/`
  is not covered by the theme's MIT license. The footer renders a configurable
  content license (default CC BY-NC-ND 4.0).
