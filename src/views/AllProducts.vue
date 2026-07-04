<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import type { Product } from '@/types/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { storeToRefs } from 'pinia'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRevealOnScroll } from '@/composables/useRevealOnScroll'

const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const categories = ref<string[]>(['All Fragrances', 'Xeram Originals', 'Xeram Impressions'])
const selectedCategory = ref<string>('All Fragrances')

// Sort
const sortOptions = ['Featured', 'Price · Low to High', 'Price · High to Low', 'A — Z']
const selectedSort = ref('Featured')

const filteredProducts = computed<Product[]>(() => {
  let arr = [...products.value]
  if (selectedCategory.value !== 'All Fragrances') {
    arr = arr.filter((p) => p.category === selectedCategory.value)
  }
  switch (selectedSort.value) {
    case 'Price · Low to High':
      arr.sort((a, b) => a.variant[0].price - b.variant[0].price)
      break
    case 'Price · High to Low':
      arr.sort((a, b) => b.variant[0].price - a.variant[0].price)
      break
    case 'A — Z':
      arr.sort((a, b) => a.name.localeCompare(b.name))
      break
  }
  return arr
})

const sortMenuOpen = ref(false)

// Close sort dropdown when clicking outside
const onDocClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.sort-dropdown-wrapper')) {
    sortMenuOpen.value = false
  }
}
onMounted(() => document.addEventListener('click', onDocClick, { capture: true }))
onUnmounted(() => document.removeEventListener('click', onDocClick, { capture: true }))

useRevealOnScroll()
</script>

<template>
  <div class="shop-page min-h-screen bg-ivory dark:bg-obsidian">

    <!-- ═══════════════ EDITORIAL HERO ═══════════════ -->
    <section class="reveal-on-scroll relative w-full overflow-hidden">
      <!-- Gradient atmosphere -->
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at top, rgba(201,168,76,0.06) 0%, transparent 50%);"/>
      <!-- Stronger atmospheric glow in dark mode -->
      <div class="absolute inset-0 pointer-events-none hidden dark:block" style="background: radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(201,168,76,0.05) 0%, transparent 60%);"/>

      <div class="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid md:grid-cols-12 gap-8 items-end">
        <div class="md:col-span-8">
          <p class="eyebrow mb-5">The Atelier</p>
          <h1 class="font-editorial text-6xl md:text-8xl lg:text-9xl font-light text-obsidian dark:text-ivory leading-[0.9] tracking-tight">
            Every fragrance,
            <span class="block italic font-display text-gold-shimmer">a world unto itself.</span>
          </h1>
        </div>
        <div class="md:col-span-4 md:pb-4 md:text-right">
          <div class="gold-divider md:ml-auto mb-5" style="margin: 0;" />
          <p class="text-sm font-light text-ash leading-loose max-w-sm md:ml-auto">
            Seven compositions. Originals built from oil, impressions of the icons. Choose what speaks closest to skin.
          </p>
          <div class="mt-6 flex md:justify-end items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-gold/70 font-light">
            <span class="numeral text-3xl text-gold">{{ products.length }}</span>
            <span>Compositions</span>
          </div>
        </div>
      </div>
      <div class="gold-divider-full" />
    </section>

    <!-- ═══════════════ FILTER BAR ═══════════════ -->
    <section class="reveal-on-scroll sticky top-[80px] md:top-[88px] z-30 w-full bg-ivory/85 dark:bg-obsidian/85 backdrop-blur-xl border-b border-gold/10">
      <div class="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between flex-wrap gap-6">

        <!-- Category filters -->
        <div class="flex flex-wrap items-center gap-8 md:gap-10">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="category-filter text-[10px] tracking-[0.3em] uppercase font-light transition-colors duration-300"
            :class="selectedCategory === category ? 'active' : ''"
          >
            {{ category }}
          </button>
        </div>

        <!-- Sort dropdown -->
        <div class="relative sort-dropdown-wrapper">
          <button
            @click="sortMenuOpen = !sortMenuOpen"
            class="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-light text-ash hover:text-gold transition-colors duration-300"
          >
            <span class="text-[8px] text-gold">↓↑</span>
            <span>Sort: {{ selectedSort }}</span>
            <span class="transform transition-transform" :class="sortMenuOpen ? 'rotate-180' : ''">▾</span>
          </button>
          <transition name="fade-quick">
            <div
              v-if="sortMenuOpen"
              class="absolute top-full right-0 mt-3 min-w-[220px] bg-obsidian border border-gold/20 z-30 shadow-2xl"
            >
              <button
                v-for="opt in sortOptions"
                :key="opt"
                class="block w-full px-5 py-3.5 text-left text-[10px] tracking-[0.25em] uppercase font-light border-b border-gold/10 last:border-b-0 transition-colors duration-200"
                :class="selectedSort === opt ? 'text-gold bg-gold/5' : 'text-ash hover:text-ivory hover:bg-gold/5'"
                @click="() => { selectedSort = opt; sortMenuOpen = false }"
              >
                {{ opt }}
              </button>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- ═══════════════ PRODUCT GRID ═══════════════ -->
    <section
      class="reveal-on-scroll w-full pb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      v-auto-animate="{ duration: 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }"
    >
      <RouterLink
        v-for="(product, idx) in filteredProducts"
        :key="product.variant[0].id"
        :to="{ name: 'productDetails', params: { id: product.id, variantId: product.variant[0].id } }"
        class="atelier-card group relative cursor-pointer overflow-hidden"
        :aria-label="`${product.name} — ${product.category}. From ${formatCurrency(product.variant[0].price)}`"
      >
        <!-- Image area -->
        <div class="relative aspect-[3/4] w-full overflow-hidden bg-cream dark:bg-charcoal atelier-image-bg">
          <!-- Dark-mode atmospheric gold radial -->
          <div class="absolute inset-0 pointer-events-none atelier-image-glow" />

          <!-- Background numeral -->
          <span class="absolute inset-0 flex items-center justify-center numeral text-[14rem] text-gold/[0.05] dark:text-gold/[0.10] pointer-events-none select-none transition-all duration-700 group-hover:scale-110 group-hover:text-gold/[0.10] dark:group-hover:text-gold/[0.16]">
            {{ String(idx + 1).padStart(2, '0') }}
          </span>

          <!-- Bottle image -->
          <img
            :src="product.variant[0].image"
            :alt="product.name"
            class="relative h-full w-full object-contain p-10 transition-all duration-[1.8s] group-hover:scale-110 group-hover:rotate-1 mix-blend-multiply dark:mix-blend-lighten"
            decoding="async"
            :loading="idx < 4 ? 'eager' : 'lazy'"
            :fetchpriority="idx < 4 ? 'high' : 'auto'"
          />

          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/8 transition-all duration-700" />

          <!-- Gold border reveal on hover -->
          <div class="absolute inset-3 border border-gold/0 group-hover:border-gold/30 transition-all duration-700 pointer-events-none" />

          <!-- Slide-up CTA -->
          <div class="absolute inset-x-0 bottom-0 py-6 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-obsidian/85 via-obsidian/40 to-transparent">
            <div class="flex items-center justify-center gap-2 text-[9px] tracking-[0.4em] uppercase text-gold font-light">
              <span>Discover</span>
              <span class="text-gold" aria-hidden="true">→</span>
            </div>
          </div>

          <!-- Top corner badge -->
          <div class="absolute top-4 left-4 text-[8px] tracking-[0.3em] uppercase text-gold/70 font-light" aria-hidden="true">
            N° {{ String(product.id).padStart(2, '0') }}
          </div>
        </div>

        <!-- Info -->
        <div class="px-6 py-7 text-center border-t border-gold/12">
          <p class="text-[8px] tracking-[0.4em] uppercase text-gold/80 font-light mb-2">{{ product.category }}</p>
          <h3 class="font-editorial text-2xl text-obsidian dark:text-ivory mb-2 group-hover:text-gold transition-colors duration-300">
            {{ product.name }}
          </h3>
          <p v-if="product.tagline" class="text-[11px] italic font-display text-ash leading-snug mb-3 max-w-[26ch] mx-auto">
            {{ product.tagline }}
          </p>
          <div class="gold-divider mx-auto mb-4" style="width: 28px;" />
          <p class="text-xs tracking-wider text-ash font-light">
            From <span class="text-obsidian dark:text-ivory">{{ formatCurrency(product.variant[0].price) }}</span>
          </p>
        </div>
      </RouterLink>
    </section>

    <!-- ═══════════════ EMPTY STATE ═══════════════ -->
    <section v-if="filteredProducts.length === 0" class="w-full py-32 flex flex-col items-center justify-center text-center px-6">
      <span class="numeral text-6xl text-gold/30 mb-6">✧</span>
      <h3 class="font-editorial text-3xl text-obsidian dark:text-ivory mb-4">No compositions found.</h3>
      <p class="text-sm font-light text-ash max-w-sm mx-auto">
        We currently do not have any fragrances available in this collection. Please explore our other offerings.
      </p>
      <button @click="selectedCategory = 'All Fragrances'" class="mt-8 hover-line text-[10px] tracking-[0.3em] uppercase text-gold font-light">
        View All Fragrances
      </button>
    </section>

    <!-- ═══════════════ TAILORED CTA ═══════════════ -->
    <section class="reveal-on-scroll w-full bg-obsidian py-24 px-6 text-center">
      <p class="eyebrow mb-5">Need Guidance</p>
      <h2 class="font-editorial text-3xl md:text-5xl text-ivory mb-6 leading-tight">
        Not sure which fragrance is yours?
      </h2>
      <div class="gold-divider mb-8" />
      <p class="text-sm font-light text-ash max-w-md mx-auto leading-loose mb-10">
        Tell us how you want to be remembered. Our team curates a personal selection — by appointment, in private.
      </p>
      <RouterLink to="/contact" class="luxury-btn">
        Request a Consultation
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.shop-page {}

/* Sticky filter bar adapts to nav */
@media (max-width: 768px) {
  .shop-page section.sticky { top: 64px; }
}

.atelier-card {
  border-right: 1px solid rgba(201,168,76,0.10);
  border-bottom: 1px solid rgba(201,168,76,0.10);
  cursor: none;
}
.atelier-card:nth-child(2n) { border-right: 1px solid rgba(201,168,76,0.10); }
@media (min-width: 1024px) {
  .atelier-card:nth-child(3n) { border-right: 1px solid rgba(201,168,76,0.10); }
}
@media (min-width: 1280px) {
  .atelier-card:nth-child(4n) { border-right: none; }
}

/* Atmospheric image background — adds subtle depth, especially in dark mode */
.atelier-image-bg {
  background-image: linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.04));
}
.dark .atelier-image-bg {
  background-color: #131313;
  background-image:
    linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.0));
}
.atelier-image-glow {
  background: radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.0) 0%, transparent 70%);
  transition: background 0.8s ease;
}
.dark .atelier-image-glow {
  background: radial-gradient(ellipse at 50% 65%, rgba(201,168,76,0.08) 0%, transparent 65%);
}
.atelier-card:hover .atelier-image-glow {
  background: radial-gradient(ellipse at 50% 55%, rgba(201,168,76,0.10) 0%, transparent 65%);
}
.dark .atelier-card:hover .atelier-image-glow {
  background: radial-gradient(ellipse at 50% 55%, rgba(201,168,76,0.18) 0%, transparent 60%);
}

.category-filter {
  position: relative;
  padding-bottom: 6px;
  color: #888888;
  background: none;
  border: none;
  cursor: none;
  font-family: 'Inter', sans-serif;
}
.category-filter::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #c9a84c;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.category-filter:hover,
.category-filter.active { color: #0a0a0a; }
.dark .category-filter:hover,
.dark .category-filter.active { color: #f5f0eb; }
.category-filter.active::after,
.category-filter:hover::after { transform: scaleX(1); }

.text-gold { color: #c9a84c; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }
.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-cream { background-color: #f0ebe4; }
.bg-charcoal { background-color: #1a1a1a; }
.border-gold { border-color: rgba(201,168,76,0.1); }

.gold-divider {
  width: 32px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
}

/* Numeral / editorial helper */
.numeral {
  font-family: 'Italiana', serif;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.04em;
}

/* Eyebrow */
.eyebrow {
  display: inline-block;
  font-size: 0.625rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
}

/* Gold shimmer text */
.text-gold-shimmer {
  background: linear-gradient(135deg, #c9a84c 0%, #e8d5a3 40%, #a07830 80%, #c9a84c 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer-anim 4s linear infinite;
}
@keyframes shimmer-anim {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* Sort dropdown fade */
.fade-quick-enter-active, .fade-quick-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-quick-enter-from, .fade-quick-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
