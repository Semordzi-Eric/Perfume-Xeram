# Xeram Perfumes

A Vue 3 + Vite + Tailwind v4 + Nuxt UI editorial luxury perfume site.

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:5173> (Vite will open it automatically).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
.
├── public/                  # Static assets served at /
│   ├── favicon.svg
│   ├── hero.png             # ← placeholder, replace with your hero
│   └── img/
│       ├── perf.png         # ← 6 placeholder bottles (replace with your real product PNGs)
│       ├── perf2.png
│       ├── perf3.png
│       ├── perf4.png
│       ├── perf5.png
│       ├── perf6.png
│       ├── about.png        # ← 3 placeholder editorial images
│       ├── about2.png
│       └── discover.png
├── src/
│   ├── App.vue
│   ├── main.ts
│   ├── assets/
│   │   ├── main.css         # ← global theme + dark mode
│   │   └── base.css
│   ├── components/
│   │   ├── about/           # Intro / Creativity / Craft / Discover sections
│   │   ├── footer/
│   │   ├── home/            # WhyChooseUs, CollectionSection, DeliveryText
│   │   ├── icons/
│   │   ├── nav/
│   │   └── shop/
│   ├── router/
│   ├── stores/              # Pinia stores
│   ├── types/
│   ├── utils/
│   └── views/               # All routed pages
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── env.d.ts
```

## Replacing the placeholder images

The `/public/img/perf*.png` are stylised placeholder bottles — drop your own
product PNGs at the same paths and the site will pick them up immediately.
The other placeholder paths are listed above.

The hero image (`/public/hero.png`) is used on the homepage and login page.

## Editorial photography (Why Choose Xeram, Collections, Delivery, Contact)

These pull from Unsplash's CDN at runtime. The URLs are in plain sight inside
each component file (search for `images.unsplash.com`). For production you
should download, optimize (AVIF/WebP), and serve them locally.

## Tech stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 6** (with `vite-plugin-vue-devtools`)
- **TypeScript** + `vue-tsc`
- **Tailwind CSS v4** (via `@tailwindcss/vite` — no `tailwind.config.ts` needed,
  theme is defined in `src/assets/main.css` via `@theme {}`)
- **Nuxt UI v3** (component library)
- **Pinia** (state)
- **vue-router** (hash history)
- **VueUse** (`useColorMode` for dark mode, `onClickOutside`, etc.)
- **@formkit/auto-animate** (list transitions)

## Dark mode

Toggled via the sun/moon icon in the navbar. Uses VueUse's `useColorMode`,
which adds a `.dark` class to `<html>`. Theme transitions are smoothed in
`src/assets/main.css` under "Dark Mode Refinements".

## Notes

- Hash routing is used (`createWebHashHistory`) — URLs look like `/#/contact`.
  If you'd prefer clean URLs, swap to `createWebHistory` in `src/router/index.ts`
  and configure your host to fall back to `index.html`.
- The custom gold cursor is intentionally hidden on touch devices.

---

✦ Maison Xeram · MMXXVI ✦
