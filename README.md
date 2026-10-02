# DC UPS landing

One-page landing (Ukrainian) for a router UPS: hero, problem → solution, interactive "how it works" demo, use cases, tech details, FAQ and an order dialog.

HTML, SCSS and vanilla JavaScript, built with Vite. The markup will later move into a WordPress + WooCommerce theme; until then `index.html` is the page.

## Run

```bash
npm install
```

```bash
npm run dev
```

Vite serves the site at `http://localhost:5173` and compiles SCSS on the fly.

Other commands:

- `npm run build` — production build into `dist/`: one CSS file and one JS file with hashed names, sorted into `css/`, `js/`, `fonts/` and `img/` (see `vite.config.js`).
- `npm run preview` — serves `dist/` at `http://localhost:4173` to check the build.
- `npm run lint` — ESLint over `src/js`.

## Deploy

Not set up yet. The build is static: upload the contents of `dist/`.

## Structure

```
index.html           the page; Vite entry
vite.config.js       build output folders
public/              files that keep their names (og-image.webp)
src/
  scss/
    style.scss       entry: @use in order core → shared blocks → layout → sections
    core/            _var (tokens, mixins), _breakpoints, _fonts, _base
    layout/          _page, _header, _footer, _sticky-bar
    components/      one partial per block (_hero, _demo, _faq, _order, …)
  js/
    main.js          entry: imports and init order
    core/            env.js (media queries), in-view.js (viewport watcher), keys.js (arrow-key navigation)
    layout/          sticky-bar.js
    components/      one module per block, same name as its SCSS partial
  fonts/
  img/
```

## Worth knowing before you change things

- Styles and scripts never hook onto IDs, only onto classes. IDs in the markup exist for anchor links (`#demo`, `#buy`) and ARIA references (`aria-controls`, `aria-labelledby`).
- BEM everywhere, no inline styles. In SCSS a block is one file with elements written as `&__element`. State classes are `is-*` and are set only by JS.
- Design tokens are SCSS variables in `core/_var.scss`. Values that change at runtime (demo state, blink duration, pointer spotlight, active tab) are CSS custom properties named `--block-thing`.
- Breakpoints live in `core/_breakpoints.scss`: `sm` 420px (header shows the section links) and `md` 720px (demo steps sit in a row). Use `media-breakpoint-up()`.
- Use the `hover` mixin for hover looks (hover-capable devices only, same look on keyboard focus) and the `backdrop-filter` mixin for blurred backdrops: the CSS minifier drops the standard property if the prefixed one is written after it.
- The header menu (`.header__menu`) is the one place styled by tag: its `li` and `a` carry no classes.
- Lists are real `ul` / `ol` / `dl` with `role="list"` where markers are removed (Safari drops list semantics otherwise). Payment options in the order dialog are native radio inputs inside their labels.
- `vite.config.js` has a small plugin that keeps the `<head>` order of `index.html` in the built page (Vite would move the CSS and JS tags to the end). It looks for the `<!-- Scripts and styles -->` comment, so keep that comment as it is.
- `_src/` holds source photos and the design PDF. It is ignored by git and exists only locally.
- The order form does not send anything yet: submitting only shows the confirmation (`src/js/components/order.js`).
- Telegram / Viber links and the `/ru/`, `/en/` language links are placeholders.
- Fonts are self-hosted in `src/fonts/` (Inter and Manrope, variable WOFF2, SIL Open Font License 1.1): latin and cyrillic subsets, plus a one-glyph file for the hryvnia sign. Characters outside these subsets fall back to the system font; `index.html` preloads the two cyrillic files.
- The page is meant to live at `https://potuzhno.pp.ua/dc-ups/`: the canonical, `og:url` and `og:image` in `index.html` point there. `public/og-image.webp` is a copy of the product shot; it still needs a proper 1200×630 image. If the static build is ever deployed on its own, set Vite's `base` to `/dc-ups/` so asset paths and the image URL match.
- Scroll reveals are hidden only inside `@media (scripting: enabled)`, so the page is complete without JavaScript. There is no `no-js` class and no inline script.
- Battery life: the spec table says "до 8 годин*" (confirmed by the owner), but the asterisk has no footnote and the FAQ answer still says the figure "буде вказаний на основі тестування". Align the two when the copy is next touched.
