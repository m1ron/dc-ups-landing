# DC UPS landing

One-page landing (Ukrainian) for a router UPS: hero, problem → solution, interactive "how it works" demo, use cases, tech details, FAQ and an order dialog.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run

Any static server from the project root, for example:

```bash
python3 -m http.server 8765
```

Then open `http://localhost:8765`. Opening `index.html` straight from disk does not work: the scripts are ES modules.

## Deploy

Not set up yet. The site is static: upload `index.html` and `assets/` as they are.

## Structure

```
index.html
assets/
  css/
    style.css        entry: @import in order core → shared blocks → layout → sections
    core/            var.css (tokens), fonts.css (@font-face), base.css (element defaults, focus ring, reduced motion)
    layout/          page, header, footer, sticky-bar
    components/      one file per block (hero, demo, faq, order, …)
  js/
    main.js          entry: imports and init order
    core/            env.js (media queries), keys.js (arrow-key navigation)
    layout/          sticky-bar.js
    components/      one module per block, same name as its CSS file
  fonts/
  img/
```

## Worth knowing before you change things

- BEM everywhere, no inline styles. State classes are `is-*` and are set only by JS.
- `_src/` holds source photos and the design PDF. It is ignored by git and exists only locally.
- The order form does not send anything yet: submitting only shows the confirmation (`assets/js/components/order.js`).
- Telegram / Viber links and the `/ru/`, `/en/` language links are placeholders.
- `style.css` uses native `@import`, so the browser loads 24 small CSS files. Fine for development; concatenate them (or add a bundler) before caring about load time.
- Fonts are self-hosted in `assets/fonts/` (Inter and Manrope, variable WOFF2, SIL Open Font License 1.1): latin and cyrillic subsets, plus a one-glyph file for the hryvnia sign. Characters outside these subsets fall back to the system font; `index.html` preloads the two cyrillic files.
- The demo colours are custom properties on `.demo` / `.demo.is-on` (`assets/css/components/demo.css`); the layout switches from a column to a row at 720px.
- `<html>` starts with `no-js`; the first inline script swaps it to `js`. Scroll reveals are hidden only under `.js`, so the page is complete without JavaScript.
- FAQ answer about battery life ("буде вказаний на основі тестування") and the "до 8 годин*" spec are pending real test data.
