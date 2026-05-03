# Xeram — Imagery & Dark Mode Refinement

This pass replaces stock/generic imagery with high-quality editorial photography that
matches the maison aesthetic, makes the contact map a designed object, and rebuilds
the dark mode so it feels atmospheric rather than just "the lights are off."

## How to install

Drop the `src/` folder into your existing `Xeram-Perfumes/` project root, overwriting
the current one.

```bash
# from your project root
rm -rf src
# then copy this src/ in

npm run dev
```

No `package.json` changes. All new images load from Unsplash CDN (free, reliable,
no auth) — if you'd rather self-host, the URLs are obvious in each component and
trivial to swap for `/img/...` paths.

---

## Files changed (6)

### Imagery

**`src/components/home/WhyChooseUs.vue`**
- Replaced both Framer-hosted images with editorial perfume photography:
  - "The Art of Fine Ingredients" → rare botanicals composition
  - "Elegance in Every Bottle" → sculptural bottle on marble
- Added a third block: "Crafted by Master Perfumers" (atelier hands at work).
- Image side now has corner ornaments, a richer cinematic vignette, and a
  dark-mode-only gold radial tint that fades in.
- Slow scale-on-hover bumped from 2s to 2.4s (more cinematic).

**`src/components/home/DeliveryText.vue`**
- Replaced the three Framer delivery PNGs with editorial photography
  (hand-wrapped parcel, courier in motion, recipient unboxing).
- Aspect ratio 16:9 → 4:5 — taller, more editorial.
- Added a gold radial glow on hover, plus a hairline gold frame that reveals
  on hover. Image scale-up bumped from 1.5s to 1.8s with `ease-out`.
- Unified the icon glyphs to ✦ (the original 📦 / ⏱ emoji broke the
  type voice; replace with custom SVG icons later if you prefer).

**`src/components/home/CollectionSection.vue`**
- Replaced 5 repeating Framer PNGs with 5 distinct cinematic perfume photographs.
- Removed `object-contain mix-blend-lighten p-8` (that treatment was specific
  to transparent bottle PNGs); now `object-cover` full-bleed with a graduated
  obsidian overlay so text is always legible.
- Added per-card "N° 0X" collection number, a gold radial glow on hover, and
  a hairline frame that brightens on hover.

**`src/views/HomeView.vue`** (Three Vessels grid only)
- Replaced the three Framer bottle PNGs in the "Three Vessels" / "A Format
  for every Ritual" section with cinematic Unsplash photography.
- Image classes updated to match (cover-fill, cinematic gradient, gold glow,
  hairline frame on hover). Background numerals pushed to z-10 so they stay
  visible above the photo gradient.
- Note: the actual product/shop bottles are still your local `/img/perf*.png`
  via `ProductStore.ts`. Those weren't touched.

**`src/views/ContactUs.vue` — left panel image**
- Replaced the generic interior shot with a warm, atmospheric perfume-on-vanity
  image. Bumped opacity from 0.40 to 0.55. Added a dark gold radial wash on
  the bottom-left corner of the panel.
- Slow zoom on hover bumped from 6s to 8s, eased.

### The Map (now a designed object, not a default iframe)

**`src/views/ContactUs.vue` — map block**

Before: a 220px iframe at 70% opacity with a 1px gold border.

After:
- A labelled section header — "Find Us · The Atelier · Cantonments" —
  paired with a "Directions →" link that opens Google Maps directions.
- New `.map-frame` wrapper with hover-state gold border and a soft drop shadow.
- The iframe gets a CSS filter (`grayscale 0.4, brightness 0.78,
  saturate 0.85`) so it harmonizes with the obsidian palette. Filter relaxes
  on hover so the live map is fully readable when you actually want to use it.
- A `.map-overlay` with a multiply-blended vignette + warm gold radial — adds
  depth without obscuring readability. Reduces opacity on hover.
- Custom **animated gold pin** at center: a solid gold dot on a dark ring,
  plus a 2.4s ripple pulse, plus an "XERAM" label in Italiana above it.
- Four hairline `.map-corner` brackets at the corners — same vocabulary as the
  rest of the maison.
- Coordinate label ("5°39′N · 0°11′W") at bottom-left in tracked uppercase.
- Iframe height bumped from 220px to 280px.

If your real atelier address is different, just update the iframe `src` —
all the styling stays.

### Shop / Atelier dark mode

**`src/views/AllProducts.vue`**
- Hero section gets an extra dark-mode-only atmospheric gold radial layer
  (top-center + bottom-right), so dark-mode shop landing isn't just
  "obsidian rectangle, type, more obsidian rectangle".
- Each product card image area now has:
  - `.atelier-image-bg` — a slight surface gradient instead of flat charcoal
  - `.atelier-image-glow` — an internal gold radial that's invisible in light
    mode and softly visible in dark mode, intensifying on hover.
  - Background numeral opacity bumped in dark mode (0.08 → 0.10, hover 0.10 → 0.16)
    so the editorial numerals actually read on a dark surface.

### Global dark mode (`src/assets/main.css`)

- **Atmospheric body wash.** `.dark body` now has a fixed background-image:
  two soft gold radials (20% top, 80% bottom). Stops dark mode from feeling
  like a flat black wall. `background-attachment: fixed` so it doesn't scroll
  with content.
- **Smoother theme-toggle transitions.** Color/border/background transitions
  on common surface elements (body, header, footer, section, article,
  div[class*="bg-"], etc.) — 0.5s cubic-bezier. Toggling sun/moon now feels
  like dimming the room rather than flipping a switch.
- **Better dark scrollbars and selection.** Gold-tinted track, slightly
  stronger thumb gradient.
- **New surface utilities** (`.surface-1`, `.surface-2`, `.surface-3`) — three
  subtly differentiated dark surfaces (with hairline top-light gradient) for
  when you want elevation between sections without resorting to flat
  charcoal-vs-obsidian contrast.
- **`.panel-luminous`** — a subtle white-tint panel for inset cards on dark.
- **`.gold-halo`** — drop-in absolute positioned radial glow utility, opacity 0
  in light mode, opacity 1 in dark mode. Useful on hero panels.
- **Dark-mode focus rings** in gold (1px, offset 3px) — accessibility +
  on-brand.
- **Stronger film grain** in dark mode (opacity 0.22 → 0.26) for that
  cinematic obsidian quality.
- **Softer dark-mode placeholder text** (rgba 0.4 → 0.32) — less shouty.

---

## What was *not* changed

- `package.json`, `vite.config.ts`, `tsconfig*.json` — no changes
- `src/router/index.ts`, `src/main.ts` — preserved
- `src/utils/*`, `src/types/*`, `src/stores/*` — preserved
- `src/components/icons/*` — preserved
- `src/components/footer/*`, `src/components/nav/*` — preserved
- `src/components/about/*`, `src/components/shop/*` — preserved
- `src/views/AboutView.vue`, `ReviewsView.vue`, `CartView.vue`,
  `ProductDetails.vue`, `ShopView.vue`, `404Error.vue`,
  `auth/LoginPage.vue`, `auth/SignupPage.vue` — preserved
- `src/products.json`, `src/assets/base.css`, `src/assets/logo.svg` — preserved
- All `/public/img/perf*.png` product bottles — your originals, preserved

---

## Acceptance checks (please verify after install)

1. **Why Choose Xeram** — three editorial blocks now (was two), each image
   has corner ornaments and a richer overlay; alternates left/right.
2. **Delivery section** — three taller (4:5) editorial photographs, gold
   radial glow on hover, hairline frame reveals on hover.
3. **Exquisite Collections** — five distinct fragrance images (no repeats),
   N° 0X badge bottom-left of each card, gold halo on hover.
4. **Three Vessels (home)** — full-bleed photographs with cinematic gradient;
   numerals still readable on top.
5. **Contact left panel** — warmer, more atmospheric image; gold wash on
   bottom-left.
6. **Contact map** — "Find Us / Directions" header, animated gold pin with
   XERAM label, 4 corner brackets, coordinate label, filter relaxes on hover.
7. **Dark mode toggle** — should now feel like a smooth dim, not an instant
   flip; body has a subtle gold atmospheric wash; shop product cards have a
   visible gold radial under each bottle.
8. **Film grain** — slightly stronger on dark mode (more cinematic).

---

## Known caveats

- **Unsplash hotlinks.** All new images are hotlinked from
  `images.unsplash.com` with `?auto=format&fit=crop&w=...` query params.
  Unsplash allows this under their license, but for production you should
  ideally download the images, optimize them (AVIF/WebP), and serve them
  from your own `/public/img/` folder. Image attribution per Unsplash's
  guidelines is appreciated.
- **Map filter.** The grayscale/brightness filter on the iframe is a CSS
  filter on a third-party iframe — works in all modern browsers but if you
  ever swap to Mapbox or Leaflet for full control, keep the same vocabulary
  (gold pin, corner brackets, vignette overlay).
- **Theme-toggle transition selector** is broad
  (`div[class*="bg-"], div[class*="border-"], ...`). If you notice any
  transition jank on a specific element, add it to a more-specific exclusion
  rule rather than removing the global one — the smoothness is the point.

---

✦ Maison Xeram · MMXXVI ✦
