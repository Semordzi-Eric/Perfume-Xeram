<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRevealOnScroll } from '@/composables/useRevealOnScroll'
import FAQ from '@/components/footer/FAQ.vue'

const links = ref([
  { to: '/shop/all-products', label: 'All Products' },
  { to: '/shop/all-products', label: 'Xeram Impressions' },
  { to: '/shop/all-products', label: 'Xeram Originals' },
])

const products = ref([
  {
    image: '/img/products/nishane-hacivat.png',
    label: 'Nishane Hacivat',
    subtitle: '15ml / 30ml',
    accord: 'Citrus · Woody · Fruity',
  },
  {
    image: '/img/products/oud-wood.png',
    label: 'Oud Wood',
    subtitle: '4ml / 30ml',
    accord: 'Woody · Balsamic · Warm Spicy',
  },
  {
    image: '/img/products/212-vip-man.png',
    label: '212 VIP Man',
    subtitle: '15ml / 30ml',
    accord: 'Aromatic · Spicy · Fresh',
  },
])

const marqueeWords = [
  'Eau de Parfum', '·', 'Crafted in Ghana', '·', 'Made by Hand', '·',
  '20 — 30% Concentration', '·', 'Aged Ouds', '·', 'Grasse Florals',
  '·', 'Cruelty Free', '·', 'Slow Made', '·',
]

// Scroll behavior
const heroRef = ref<HTMLElement | null>(null)
const parallaxOffset = ref(0)
const heroOpacity = ref(1)
const heroScale = ref(1)

const onScroll = () => {
  const y = window.scrollY
  parallaxOffset.value = y * 0.4
  // Fade out hero as user scrolls past it
  const vh = window.innerHeight
  heroOpacity.value = Math.max(0, 1 - y / (vh * 0.85))
  heroScale.value = 1 + Math.min(0.06, y / (vh * 12))
}

const cursorPos = ref({ x: 0, y: 0 })
const onCursorMove = (e: MouseEvent) => {
  cursorPos.value = { x: e.clientX, y: e.clientY }
}


// Floating particles
const particles = computed(() =>
  Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    x: (i * 37) % 100,
    y: (i * 53) % 100,
    size: 1 + ((i * 7) % 3),
    delay: (i * 0.4) % 6,
    duration: 6 + ((i * 1.3) % 8),
  })),
)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onCursorMove)

})

// Shared composable handles IntersectionObserver with proper cleanup
useRevealOnScroll(0.15)

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('mousemove', onCursorMove)
})
</script>

<template>
  <div class="home-page flex w-full flex-col items-center">

    <!-- ═══════════════ CINEMATIC HERO ═══════════════ -->
    <section
      ref="heroRef"
      class="hero-section relative w-full overflow-hidden"
      style="height: 100svh; min-height: 680px;"
    >
      <div
        class="absolute inset-0 w-full h-full"
        :style="{
          transform: `translateY(${parallaxOffset}px) scale(${1.15 * heroScale})`,
          transformOrigin: 'center top',
          opacity: heroOpacity,
        }"
      >
        <img src="/hero.png" alt="Xeram Premium Perfume" class="w-full h-full object-cover" />
      </div>

      <!-- Cinematic gradient stack -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/85" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />

      <!-- Mouse-reactive radial glow -->
      <div
        class="absolute inset-0 pointer-events-none transition-opacity duration-700"
        :style="{
          background: `radial-gradient(circle 380px at ${cursorPos.x}px ${cursorPos.y}px, rgba(201,168,76,0.18), transparent 65%)`,
        }"
      />

      <!-- Floating gold particles -->
      <div class="absolute inset-0 pointer-events-none">
        <span
          v-for="p in particles"
          :key="p.id"
          class="hero-particle"
          :style="{
            left: p.x + '%',
            top: p.y + '%',
            width: p.size + 'px',
            height: p.size + 'px',
            animationDelay: p.delay + 's',
            animationDuration: p.duration + 's',
          }"
        />
      </div>

      <!-- Decorative corner ornaments -->
      <div class="absolute top-8 left-8 corner-ornament corner-tl opacity-0 animate-[fade-in-up_1s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards]" />
      <div class="absolute top-8 right-8 corner-ornament corner-tr opacity-0 animate-[fade-in-up_1s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards]" />
      <div class="absolute bottom-8 left-8 corner-ornament corner-bl opacity-0 animate-[fade-in-up_1s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards]" />
      <div class="absolute bottom-8 right-8 corner-ornament corner-br opacity-0 animate-[fade-in-up_1s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards]" />

      <!-- Vertical text — left side -->
      <div class="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 opacity-0 animate-[fade-in-up_1s_cubic-bezier(0.16,1,0.3,1)_1.6s_forwards]">
        <span class="vertical-text text-[9px] tracking-[0.5em] uppercase text-gold/70 font-light">
          MMXXIV — Maison Xeram
        </span>
        <div class="w-px h-24 bg-gradient-to-b from-gold/60 to-transparent" />
      </div>

      <!-- Vertical text — right side -->
      <div class="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 opacity-0 animate-[fade-in-up_1s_cubic-bezier(0.16,1,0.3,1)_1.7s_forwards]">
        <div class="w-px h-24 bg-gradient-to-t from-gold/60 to-transparent" />
        <span class="vertical-text text-[9px] tracking-[0.5em] uppercase text-gold/70 font-light">
          N° 01 — Signature
        </span>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">

        <!-- Eyebrow with hairlines -->
        <div class="flex items-center gap-4 mb-8 opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards]">
          <span class="block w-12 h-px bg-gold/60" />
          <p class="text-[10px] tracking-[0.5em] text-gold font-light uppercase">Maison Xeram</p>
          <span class="block w-12 h-px bg-gold/60" />
        </div>

        <!-- Editorial headline -->
        <h1 class="hero-headline opacity-0 animate-[fade-in-up_1.1s_cubic-bezier(0.16,1,0.3,1)_0.55s_forwards]">
          <span class="block font-editorial text-ivory">Signature</span>
          <span class="block font-display italic text-gold-shimmer">Scents</span>
        </h1>

        <!-- Refined divider -->
        <div class="my-9 flex items-center gap-3 opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.95s_forwards]">
          <span class="block w-16 h-px bg-gold/40" />
          <span class="text-gold text-xs">✦</span>
          <span class="block w-16 h-px bg-gold/40" />
        </div>

        <!-- Tagline -->
        <p class="hero-sub mb-12 max-w-md text-xs tracking-[0.3em] uppercase text-ivory/80 font-light leading-relaxed opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_1.1s_forwards]">
          A house of fragrance. Born in Accra.<br/>Crafted for the connoisseur.
        </p>

        <!-- CTA Cluster -->
        <div class="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_1.3s_forwards]">
          <RouterLink to="/shop/all-products" class="luxury-btn">
            <span>Discover the House</span>
          </RouterLink>
          <a href="/Xeram_Catalogue.pdf" target="_blank" class="hero-link-btn">
            <span>Download Catalogue</span>
            <span class="ml-2 text-gold">↓</span>
          </a>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_1.85s_forwards]">
        <span class="text-[9px] tracking-[0.4em] uppercase text-ivory/50 font-light">Scroll to Begin</span>
        <div class="scroll-line" />
      </div>
    </section>

    <!-- ═══════════════ MARQUEE TICKER ═══════════════ -->
    <section class="marquee-section w-full bg-obsidian py-8 border-y border-gold/10 overflow-hidden" aria-hidden="true">
      <div class="marquee-track">
        <span
          v-for="(word, i) in [...marqueeWords, ...marqueeWords]"
          :key="i"
          class="inline-flex items-center px-6 font-editorial text-2xl md:text-4xl text-ivory/90 whitespace-nowrap"
          :class="word === '·' ? 'text-gold/70 px-3' : ''"
        >
          {{ word }}
        </span>
      </div>
    </section>

    <!-- ═══════════════ CATEGORY NAVIGATION ═══════════════ -->
    <section class="reveal-on-scroll w-full py-16 border-b border-gold/10 bg-ivory dark:bg-obsidian">
      <div class="text-center mb-10">
        <p class="eyebrow mb-3">Discover the Catalogue</p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-12">
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="cat-link text-[10px] tracking-[0.3em] uppercase font-light text-ash hover:text-obsidian dark:hover:text-ivory transition-colors duration-300"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </section>

    <!-- ═══════════════ COLLECTION GRID ═══════════════ -->
    <section class="reveal-on-scroll w-full">
      <!-- Section header -->
      <div class="text-center py-20 px-6 bg-ivory dark:bg-obsidian">
        <p class="eyebrow mb-5">Three Vessels</p>
        <h2 class="font-editorial text-5xl md:text-7xl font-light text-obsidian dark:text-ivory tracking-tight mb-6">
          A Format <span class="italic font-display">for every</span> Ritual
        </h2>
        <div class="gold-divider" />
      </div>

      <div class="w-full grid grid-cols-1 md:grid-cols-3">
        <RouterLink
          v-for="(product, i) in products"
          :key="product.label"
          to="/shop/all-products"
          class="product-card group relative overflow-hidden block"
          :style="{ animationDelay: `${i * 0.15}s` }"
        >
          <!-- Image -->
          <div class="aspect-[3/4] w-full overflow-hidden bg-cream dark:bg-charcoal relative">
            <!-- Background numeral -->
            <span class="absolute inset-0 flex items-center justify-center numeral text-[28rem] text-gold/[0.04] dark:text-gold/[0.06] pointer-events-none select-none z-10">
              {{ i + 1 }}
            </span>
            <img
              decoding="async"
              loading="lazy"
              :src="product.image"
              :alt="product.label"
              class="absolute inset-0 h-full w-full object-cover transition-all duration-[1.8s] ease-out group-hover:scale-110"
            />
            <!-- Cinematic gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-obsidian/15 to-transparent" />
            <!-- Gold glow on hover -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                 style="background: radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 65%);" />
            <!-- Hairline frame on hover -->
            <div class="absolute inset-3 border border-gold/0 group-hover:border-gold/30 transition-all duration-700 pointer-events-none z-10" />
          </div>

          <!-- Static label below image -->
          <div class="bg-ivory dark:bg-obsidian px-8 py-10 text-center border-t border-gold/15 transition-colors duration-500 group-hover:bg-cream dark:group-hover:bg-charcoal">
            <p class="text-[9px] tracking-[0.4em] uppercase text-gold font-light mb-3">{{ product.subtitle }}</p>
            <h3 class="font-editorial text-3xl text-obsidian dark:text-ivory mb-3">{{ product.label }}</h3>
            <div class="gold-divider mb-4" />
            <p class="text-[10px] tracking-[0.18em] uppercase text-ash font-light italic">{{ product.accord }}</p>
            <div class="mt-6 inline-flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-gold font-light overflow-hidden">
              <span class="cta-text inline-block transform-gpu transition-transform duration-500 group-hover:translate-x-1">
                Discover
              </span>
              <span class="text-gold transform-gpu transition-transform duration-500 group-hover:translate-x-2">→</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- Section components -->
    <WhyChooseUs />
    <CollectionSection />
    <DeliveryText />
    <FAQ />
  </div>
</template>

<style scoped>
.home-page {
  background-color: var(--color-ivory, #f5f0eb);
}
.dark .home-page {
  background-color: var(--color-obsidian, #0a0a0a);
}

/* Hero headline */
.hero-headline {
  font-size: clamp(3.8rem, 13vw, 10rem);
  font-weight: 400;
  line-height: 0.88;
  letter-spacing: -0.025em;
  margin-bottom: 0;
}

.text-ivory { color: #f5f0eb; }
.text-gold { color: #c9a84c; }
.text-ash { color: #888888; }

.text-gold-shimmer {
  background: linear-gradient(135deg, #c9a84c 0%, #e8d5a3 40%, #a07830 80%, #c9a84c 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
}

/* Hero particles */
.hero-particle {
  position: absolute;
  background: rgba(232, 213, 163, 0.6);
  border-radius: 50%;
  filter: blur(0.5px);
  animation: particle-drift linear infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* Hero secondary link button */
.hero-link-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.05rem 2rem;
  color: #f5f0eb;
  font-size: 0.65rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
  transition: color 0.4s ease;
  text-decoration: none;
}
.hero-link-btn:hover { color: #c9a84c; }

/* Vertical text */
.vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

/* Corner ornaments */
.corner-ornament {
  width: 32px;
  height: 32px;
  border-color: rgba(201, 168, 76, 0.5);
}
.corner-tl { border-top: 1px solid; border-left: 1px solid; }
.corner-tr { border-top: 1px solid; border-right: 1px solid; }
.corner-bl { border-bottom: 1px solid; border-left: 1px solid; }
.corner-br { border-bottom: 1px solid; border-right: 1px solid; }

/* Scroll line */
.scroll-line {
  width: 1px;
  height: 56px;
  background: linear-gradient(180deg, rgba(201,168,76,0.9), transparent);
  animation: scroll-bounce 2s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(0.6); opacity: 0.4; }
}

/* Category links */
.cat-link {
  position: relative;
  padding-bottom: 6px;
  font-family: 'Inter', sans-serif;
}
.cat-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #c9a84c;
  transform: scaleX(0);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.cat-link:hover::after { transform: scaleX(1); }

/* Product card border on grid */
.product-card {
  border-right: 1px solid rgba(201,168,76,0.12);
  border-bottom: 1px solid rgba(201,168,76,0.12);
  text-decoration: none;
}
.product-card:last-child { border-right: none; }

/* Color tokens */
.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-cream { background-color: #f0ebe4; }
.bg-charcoal { background-color: #1a1a1a; }
.border-gold { border-color: #c9a84c; }
</style>
