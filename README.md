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
    style.scss       entry: @use in order core → components → layout → sections
    core/            _var (tokens, mixins), _breakpoints, _fonts, _base (normalize + element defaults)
    components/      reusable blocks: _container, _eyebrow, _title, _stock, _sweep, _blink, _reveal, _feature, _order
    layout/          page chrome: _page, _main, _header, _footer, _sticky-bar
    sections/        one partial per section of this landing: _hero, _problem, _demo, _usecase, _specs, _faq, _buy
  js/
    main.js          entry: imports and init order
    core/            env.js (media queries), in-view.js (viewport watcher), keys.js (arrow-key navigation)
    components/      reveal.js, feature.js, order.js
    layout/          sticky-bar.js
    sections/        demo.js, specs.js, faq.js — same names as the SCSS partials
  fonts/
  img/
```

## Worth knowing before you change things

- Styles and scripts never hook onto IDs, only onto classes. IDs in the markup exist for anchor links (`#top` on `main`, so the logo scrolls to the very top; `#demo`, `#buy`) and ARIA references (`aria-controls`, `aria-labelledby`).
- BEM everywhere, no inline styles. In SCSS a block is one file; elements are `&__element`, a child element nests inside its parent with the suffix form (`&__cell { &-fill {} }`), pseudo-elements and tag rules nest inside their element, and repeated one-line rules stay on one line. Declarations follow a fixed order (width → height → padding → border → margin → display → position → the rest with the font description and then `color` at its end → background → animation → transition → transform → box-shadow → opacity), plain `@include`s after them; see the guidelines. State classes are `is-*` and are set only by JS.
- Components are blocks that could appear on any landing and don't know where they stand; sections are the pieces of this page with its copy and order. A new landing gets its own entry with the shared core, components and layout plus its own sections.
- Design tokens are SCSS variables in `core/_var.scss`: colours (alphas are written as `rgba($color-accent, 0.5)`), hairlines (`$color-line`), radii, the content column, section paddings, durations and easings. Repeated patterns are mixins there too: `bars`, `label-caps`, `dot`, `button-pill`, `card`, `hover`, `backdrop-filter`, `anchor-offset`. Values that change at runtime (demo state, blink duration, pointer spotlight, active tab) are CSS custom properties named `--block-thing`.
- Breakpoints are the Bootstrap-style `$grid-breakpoints` map (xs 0, xsl 420, sm 540, md 768, lg 992, xl 1340, xxl 1600, xxxl 1900) with `media-breakpoint-up/down/between/only`, both in `core/_breakpoints.scss`. `_var` forwards them, so `@use '../core/var' as *;` is the only import a partial needs. Thresholds follow the layout, not device models. Layouts switch only at these breakpoints, never on content-driven wrapping (`flex-wrap` with a basis, `auto-fit`): `xsl` (header links, spec tiles in two columns), `sm` (hero facts in one row, delivery facts 2×2), `md` (problem cards, demo steps, use-case features, spec tiles in three columns, box contents in two), `lg` (use-case photo + panel, specs figure + facts, FAQ head + list, buy card, order dialog, spec table in two columns, delivery facts in one row).
- Horizontal and vertical spacing live on different elements. `.main` holds the air above the first section (`$page-top`, under the fixed header) and below the last one; a section (`.hero`, `.problem`, …) sets only its own vertical paddings; inside it a `.container` centres the content, caps its width (`$container-width`) and adds the side gutters (`$gutter`). When a section's wrapper has layout of its own it mixes the two classes (`container hero__inner`); cards and the footer strip sit inside a plain `<div class="container">`, because their border would otherwise span the gutters. The header pill is the one exception: it is fixed page chrome with its own narrower gutters. Per-breakpoint widths, if ever needed, go into `components/_container.scss`.
- Sections that anchor links scroll to include the `anchor-offset` mixin, so their content stops 24px below the fixed header. A new section with an `id` needs it too (pass the section's own top padding).
- Use the `hover` mixin for hover looks (hover-capable devices only, same look on keyboard focus) and the `backdrop-filter` mixin for blurred backdrops: the CSS minifier drops the standard property if the prefixed one is written after it.
- Inside list blocks the items carry no classes and are styled by tag: `li` and `a` in `.header__menu`, `.hero__perks`, `.usecase__list`, `.specs__box-list`, `.buy__perks`, `.footer__meta`, `.footer__contacts`; `strong` + `span` for a value and its label (hero stats, use cases); plain `dt` / `dd` in the definition lists. The rule of thumb: a short, obvious pair inside a list gets tags, not new classes. In SCSS those tag rules are nested inside the parent element's block. Dots, check marks, step numbers, button arrows and footer separators are `::before` / `::after` (see the `glyph`, `check-mark` and `dot` mixins); counters number the demo steps and the box contents.
- FAQ questions are `h3` elements with `role="button"`, `tabindex="0"` and `aria-expanded` (an explicit decision: no button inside the heading); `faq.js` handles click, Enter and Space. The `+` / `×` at the right is `span.faq__question-toggle`, whose two pseudo-elements are the bars (the `bars` mixin, also used for the dialog's close button). Note that `role="button"` replaces the heading role for assistive technology.
- Lists are real `ul` / `ol` / `dl` (the header links are a `menu`) with `role="list"` where markers are removed (Safari drops list semantics otherwise).
- `vite.config.js` has a small plugin that keeps the `<head>` order of `index.html` in the built page (Vite would move the CSS and JS tags to the end). It looks for the `<!-- Scripts and styles -->` comment, so keep that comment as it is.
- `_src/` holds source photos and the design PDF. It is ignored by git and exists only locally.
- The order form does not send anything yet: submitting only shows the confirmation (`src/js/components/order.js`).
- Telegram / Viber links and the `/ru/`, `/en/` language links are placeholders.
- Fonts are self-hosted in `src/fonts/` (Inter and Manrope, variable WOFF2, SIL Open Font License 1.1): the cyrillic subset is the main file (`inter.woff2`, `manrope.woff2`), the latin subset is `*-latin.woff2`. Prices are written «грн.», so there is no file for the ₴ sign. Characters outside these subsets fall back to the system font; `index.html` preloads the two main files.
- The page is meant to live at `https://potuzhno.pp.ua/dc-ups/`: the canonical, `og:url` and `og:image` in `index.html` point there. `public/og-image.webp` is a copy of the product shot; it still needs a proper 1200×630 image. If the static build is ever deployed on its own, set Vite's `base` to `/dc-ups/` so asset paths and the image URL match.
- Scroll reveals are hidden only inside `@media (scripting: enabled)`, so the page is complete without JavaScript. There is no `no-js` class and no inline script.
- Battery life: the spec table says "до 8 годин*" (confirmed by the owner), but the asterisk has no footnote and the FAQ answer still says the figure "буде вказаний на основі тестування". Align the two when the copy is next touched.
