<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { formatCurrency } from '@/utils/formatCurrency'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types/types'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const { cartItems, products } = storeToRefs(productStore)
const { addToCart } = productStore

const id = ref<number>(Number(route.params.id))
const product = ref(productStore.getProductById(id.value))

if (!product.value) {
  router.push({ name: 'not-found' })
}

const selectedVariant = ref(product.value.variant[0])
const reorderedVariants = ref([...(product.value.variant || [])])

const displayVariants = computed(() => {
  return reorderedVariants.value.filter((variant) => variant.id !== selectedVariant.value.id)
})

const variantInCart = computed(() => {
  if (!product.value || !selectedVariant.value) return { inCart: false, quantity: 0 }
  const cartItem = cartItems.value.find((item) => item.id === selectedVariant.value.id)
  return { inCart: !!cartItem, quantity: cartItem ? cartItem.quantity : 0 }
})

const selectVariant = (variant: Product['variant'][0]) => {
  const previousSelected = selectedVariant.value
  const clickedIndex = reorderedVariants.value.findIndex((v) => v.id === variant.id)
  const newVariants = [...reorderedVariants.value]
  newVariants[clickedIndex] = previousSelected
  const previousSelectedIndex = reorderedVariants.value.findIndex((v) => v.id === previousSelected.id)
  if (previousSelectedIndex !== -1) newVariants[previousSelectedIndex] = variant
  reorderedVariants.value = newVariants
  selectedVariant.value = variant
  router.push({ name: 'productDetails', params: { id: product.value.id, variantId: variant.id } })
}

const feedbackVisible = ref(false)
const addItemToCart = () => {
  if (!product.value || !selectedVariant.value) return
  try {
    addToCart(product.value.id, selectedVariant.value.id)
    feedbackVisible.value = true
    setTimeout(() => { feedbackVisible.value = false }, 2500)
  } catch (error) {
    console.error('Failed to add item to cart:', error)
  }
}

// Related products
const relatedProducts = computed(() =>
  products.value
    .filter((p) => p.id !== product.value.id && p.category === product.value.category)
    .slice(0, 4)
)

// Image parallax
const imageOffset = ref(0)
const onScroll = () => {
  const heroEl = document.querySelector('.product-hero') as HTMLElement | null
  if (!heroEl) return
  const rect = heroEl.getBoundingClientRect()
  imageOffset.value = -rect.top * 0.15
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  const variantId = Number(route.params.variantId)
  if (variantId && product.value) {
    const variant = product.value.variant.find((v) => v.id === variantId)
    if (variant) selectedVariant.value = variant
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed')
      })
    },
    { threshold: 0.12 },
  )
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const goTo = (productId: number, variantId: number) => {
  router.push({ name: 'productDetails', params: { id: productId, variantId } })
}
</script>

<template>
  <div v-if="product" class="product-page bg-ivory dark:bg-obsidian min-h-screen">

    <!-- Breadcrumb -->
    <div class="max-w-[1600px] mx-auto px-6 md:px-12 pt-10 pb-6 flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase text-ash font-light">
      <RouterLink to="/" class="hover:text-gold transition-colors duration-300">Maison</RouterLink>
      <span class="text-gold/40">—</span>
      <RouterLink to="/shop/all-products" class="hover:text-gold transition-colors duration-300">Atelier</RouterLink>
      <span class="text-gold/40">—</span>
      <span class="text-gold">{{ product.category }}</span>
      <span class="text-gold/40">—</span>
      <span class="text-obsidian dark:text-ivory">{{ product.name }}</span>
    </div>

    <!-- ═══════════════ HERO SECTION ═══════════════ -->
    <section class="product-hero relative max-w-[1600px] mx-auto px-6 md:px-12 pb-20 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

      <!-- IMAGE COLUMN -->
      <div class="relative">
        <!-- Oversized name behind image -->
        <div class="hidden lg:block absolute -top-4 -right-12 pointer-events-none select-none">
          <span class="vertical-name font-editorial text-[6rem] xl:text-[7.5rem] text-gold/[0.07] dark:text-gold/[0.09] leading-none whitespace-nowrap">
            {{ product.name }}
          </span>
        </div>

        <div class="relative aspect-[3/4] w-full overflow-hidden bg-cream dark:bg-charcoal group">
          <!-- Background numeral -->
          <span class="absolute inset-0 flex items-center justify-center numeral text-[28rem] text-gold/[0.04] dark:text-gold/[0.06] pointer-events-none select-none -z-0">
            {{ String(product.id).padStart(2, '0') }}
          </span>

          <!-- Bottle image with subtle parallax -->
          <img
            :src="selectedVariant.image"
            :alt="product.name"
            class="relative w-full h-full object-contain p-16 transition-all duration-[1.5s] group-hover:scale-105"
            :style="{ transform: `translateY(${imageOffset}px)` }"
          />

          <!-- Inner gold border on hover -->
          <div class="absolute inset-4 border border-gold/0 group-hover:border-gold/25 transition-all duration-700 pointer-events-none" />

          <!-- Bottom decorative info -->
          <div class="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[8px] tracking-[0.4em] uppercase text-ash">
            <span>Eau de Parfum</span>
            <span>{{ selectedVariant.size }}</span>
          </div>
        </div>

        <!-- Variant thumbnails -->
        <div class="mt-6 flex gap-3 overflow-x-auto pb-2">
          <button
            v-for="variant in [selectedVariant, ...displayVariants]"
            :key="variant.id"
            class="variant-thumb group relative aspect-square w-20 flex-shrink-0 cursor-pointer overflow-hidden bg-cream dark:bg-charcoal border transition-all duration-300"
            :class="variant.id === selectedVariant.id ? 'border-gold' : 'border-gold/10 hover:border-gold/40'"
            @click="selectVariant(variant)"
          >
            <img
              :src="variant.image"
              :alt="variant.size"
              class="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute bottom-0 left-0 right-0 py-1 text-center bg-ivory/70 dark:bg-obsidian/70 backdrop-blur-sm">
              <span class="text-[8px] tracking-widest text-ash uppercase">{{ variant.size }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- INFO COLUMN -->
      <div class="flex flex-col justify-center max-w-xl lg:py-12">
        <!-- Origin tag -->
        <p v-if="product.origin" class="text-[9px] tracking-[0.5em] uppercase text-gold font-light mb-4">
          {{ product.origin }}
        </p>

        <!-- Product name -->
        <h1 class="font-editorial text-5xl md:text-6xl lg:text-7xl text-obsidian dark:text-ivory mb-4 leading-[0.95] tracking-tight">
          {{ product.name }}
        </h1>

        <!-- Tagline -->
        <p v-if="product.tagline" class="font-display italic text-2xl md:text-3xl text-gold mb-6 font-light">
          {{ product.tagline }}
        </p>

        <div class="gold-divider mb-8" style="margin-left: 0;" />

        <!-- Description -->
        <p class="text-sm md:text-base font-light text-ash dark:text-smoke leading-loose mb-6 max-w-md">
          {{ product.description }}
        </p>

        <!-- Inspired by note -->
        <p v-if="product.inspiredBy" class="text-[10px] tracking-[0.25em] uppercase text-gold/70 italic mb-10">
          {{ product.inspiredBy }}
        </p>

        <!-- Mood chips -->
        <div v-if="product.mood && product.mood.length" class="flex flex-wrap gap-2 mb-10">
          <span
            v-for="m in product.mood"
            :key="m"
            class="mood-chip text-[9px] tracking-[0.25em] uppercase font-light"
          >
            {{ m }}
          </span>
        </div>

        <!-- Price/Size meta -->
        <div class="border-t border-gold/15 border-b border-gold/15 py-7 mb-8 grid grid-cols-2 gap-4">
          <div>
            <p class="text-[9px] tracking-[0.3em] uppercase text-ash font-light mb-2">Price</p>
            <p class="font-editorial text-3xl text-obsidian dark:text-ivory">
              {{ formatCurrency(selectedVariant.price) }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-[9px] tracking-[0.3em] uppercase text-ash font-light mb-2">Volume</p>
            <p class="font-editorial text-3xl text-obsidian dark:text-ivory">
              {{ selectedVariant.size }}
            </p>
          </div>
        </div>

        <!-- Variant selector -->
        <div class="mb-10">
          <p class="text-[9px] tracking-[0.3em] uppercase text-ash font-light mb-4">Select Volume</p>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="variant in product.variant"
              :key="variant.id"
              @click="selectVariant(variant)"
              class="size-selector text-[10px] tracking-[0.25em] uppercase font-light transition-all duration-400"
              :class="variant.id === selectedVariant.id ? 'active' : ''"
            >
              <span class="block">{{ variant.size }}</span>
              <span class="block text-[8px] tracking-[0.15em] mt-0.5 opacity-60">{{ formatCurrency(variant.price) }}</span>
            </button>
          </div>
        </div>

        <!-- Add to Cart -->
        <div class="relative">
          <button
            class="add-to-cart-btn w-full py-5 text-[10px] tracking-[0.4em] uppercase font-light transition-all duration-500"
            @click="addItemToCart"
          >
            <span v-if="!feedbackVisible">
              {{ variantInCart.inCart ? `Add Another (${variantInCart.quantity} in cart)` : 'Add to Cart' }}
            </span>
            <span v-else class="text-gold flex items-center justify-center gap-2">
              <span>✦</span><span>Added with care</span>
            </span>
          </button>

          <div v-if="feedbackVisible" class="cart-feedback-shimmer absolute inset-0 pointer-events-none" />
        </div>

        <!-- Trust strip -->
        <div class="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-gold/10">
          <div class="text-center">
            <p class="text-[9px] tracking-[0.3em] uppercase text-gold/80 font-light mb-1">Tracked</p>
            <p class="text-[10px] text-ash">Door-to-door</p>
          </div>
          <div class="text-center border-x border-gold/10">
            <p class="text-[9px] tracking-[0.3em] uppercase text-gold/80 font-light mb-1">Returns</p>
            <p class="text-[10px] text-ash">7-day</p>
          </div>
          <div class="text-center">
            <p class="text-[9px] tracking-[0.3em] uppercase text-gold/80 font-light mb-1">Made</p>
            <p class="text-[10px] text-ash">By Hand</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════ FRAGRANCE PYRAMID SECTION ═══════════════ -->
    <section v-if="product.notes" class="reveal-on-scroll w-full bg-obsidian py-24 md:py-32 px-6">
      <div class="max-w-6xl mx-auto">

        <!-- Section header -->
        <div class="text-center mb-20">
          <p class="eyebrow mb-4">The Olfactive Pyramid</p>
          <h2 class="font-editorial text-4xl md:text-6xl text-ivory tracking-tight mb-6 leading-tight">
            How <span class="italic font-display text-gold">{{ product.name }}</span> unfolds
          </h2>
          <div class="gold-divider mb-6" />
          <p class="text-sm font-light text-ash max-w-xl mx-auto leading-loose">
            A fragrance moves in three acts — the opening, the heart, and the dry-down. Each note speaks in its own time.
          </p>
        </div>

        <!-- Pyramid layout -->
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-20 items-center">

          <!-- LEFT — note descriptions -->
          <div class="space-y-12 lg:text-right order-2 lg:order-1">
            <!-- Top -->
            <div class="reveal-on-scroll note-block">
              <div class="flex items-center gap-3 lg:justify-end mb-3">
                <span class="numeral text-3xl text-gold/60">01</span>
                <p class="text-[10px] tracking-[0.4em] uppercase text-gold font-light">Top — The Arrival</p>
              </div>
              <h3 class="font-editorial text-2xl text-ivory mb-3">First impression</h3>
              <p class="text-sm font-light text-ash leading-loose mb-4">
                The opening — what you smell within seconds. Bright, volatile, immediate.
              </p>
              <div class="flex flex-wrap gap-2 lg:justify-end">
                <span v-for="n in product.notes.top" :key="n" class="note-chip">{{ n }}</span>
              </div>
            </div>

            <!-- Heart -->
            <div class="reveal-on-scroll note-block" style="transition-delay: 0.15s">
              <div class="flex items-center gap-3 lg:justify-end mb-3">
                <span class="numeral text-3xl text-gold/60">02</span>
                <p class="text-[10px] tracking-[0.4em] uppercase text-gold font-light">Heart — The Soul</p>
              </div>
              <h3 class="font-editorial text-2xl text-ivory mb-3">The character</h3>
              <p class="text-sm font-light text-ash leading-loose mb-4">
                The fragrance settles. This is the personality — what you recognise as the scent itself.
              </p>
              <div class="flex flex-wrap gap-2 lg:justify-end">
                <span v-for="n in product.notes.heart" :key="n" class="note-chip">{{ n }}</span>
              </div>
            </div>

            <!-- Base -->
            <div class="reveal-on-scroll note-block" style="transition-delay: 0.3s">
              <div class="flex items-center gap-3 lg:justify-end mb-3">
                <span class="numeral text-3xl text-gold/60">03</span>
                <p class="text-[10px] tracking-[0.4em] uppercase text-gold font-light">Base — The Memory</p>
              </div>
              <h3 class="font-editorial text-2xl text-ivory mb-3">The lasting trail</h3>
              <p class="text-sm font-light text-ash leading-loose mb-4">
                Hours later, the dry-down. What clings to fabric, what others remember when you have left the room.
              </p>
              <div class="flex flex-wrap gap-2 lg:justify-end">
                <span v-for="n in product.notes.base" :key="n" class="note-chip">{{ n }}</span>
              </div>
            </div>
          </div>

          <!-- CENTRE — pyramid SVG -->
          <div class="reveal-on-scroll order-1 lg:order-2 flex justify-center">
            <svg viewBox="0 0 320 360" class="pyramid-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="pyrGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#e8d5a3" stop-opacity="0.95" />
                  <stop offset="50%" stop-color="#c9a84c" stop-opacity="0.85" />
                  <stop offset="100%" stop-color="#a07830" stop-opacity="0.7" />
                </linearGradient>
                <linearGradient id="pyrLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="rgba(201,168,76,0)" />
                  <stop offset="50%" stop-color="rgba(201,168,76,0.6)" />
                  <stop offset="100%" stop-color="rgba(201,168,76,0)" />
                </linearGradient>
                <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stop-color="rgba(201,168,76,0.25)" />
                  <stop offset="100%" stop-color="rgba(201,168,76,0)" />
                </radialGradient>
              </defs>

              <!-- Soft glow behind -->
              <ellipse cx="160" cy="180" rx="160" ry="160" fill="url(#glow)" />

              <!-- Pyramid layers -->
              <!-- Top tier -->
              <polygon points="160,20 200,80 120,80" fill="none" stroke="url(#pyrGold)" stroke-width="1" class="pyr-tier pyr-top" />
              <text x="160" y="60" text-anchor="middle" class="pyr-label">TOP</text>

              <!-- Middle tier -->
              <polygon points="120,80 200,80 240,180 80,180" fill="none" stroke="url(#pyrGold)" stroke-width="1" class="pyr-tier pyr-heart" />
              <text x="160" y="140" text-anchor="middle" class="pyr-label">HEART</text>

              <!-- Bottom tier -->
              <polygon points="80,180 240,180 280,300 40,300" fill="none" stroke="url(#pyrGold)" stroke-width="1" class="pyr-tier pyr-base" />
              <text x="160" y="250" text-anchor="middle" class="pyr-label">BASE</text>

              <!-- Crown ornament -->
              <circle cx="160" cy="20" r="3" fill="#c9a84c" />
              <circle cx="160" cy="20" r="6" fill="none" stroke="#c9a84c" stroke-opacity="0.4" />

              <!-- Bottom hairline -->
              <line x1="20" y1="320" x2="300" y2="320" stroke="url(#pyrLine)" stroke-width="1" />

              <!-- Decorative serif name -->
              <text x="160" y="345" text-anchor="middle" class="pyr-name">{{ product.name.toUpperCase() }}</text>
            </svg>
          </div>

          <!-- RIGHT — performance meters -->
          <div class="space-y-10 order-3">
            <div class="meter-block">
              <div class="flex items-center justify-between mb-3">
                <p class="text-[10px] tracking-[0.4em] uppercase text-gold font-light">Intensity</p>
                <span class="numeral text-2xl text-gold/60">{{ product.intensity || 4 }}/5</span>
              </div>
              <div class="meter-track">
                <div
                  v-for="i in 5"
                  :key="i"
                  class="meter-bar"
                  :class="{ 'meter-bar-on': i <= (product.intensity || 4) }"
                  :style="{ transitionDelay: `${i * 0.08}s` }"
                />
              </div>
              <p class="mt-3 text-xs font-light text-ash">How forcefully the scent announces itself.</p>
            </div>

            <div class="meter-block">
              <div class="flex items-center justify-between mb-3">
                <p class="text-[10px] tracking-[0.4em] uppercase text-gold font-light">Longevity</p>
                <span class="numeral text-2xl text-gold/60">{{ product.longevity || 4 }}/5</span>
              </div>
              <div class="meter-track">
                <div
                  v-for="i in 5"
                  :key="i"
                  class="meter-bar"
                  :class="{ 'meter-bar-on': i <= (product.longevity || 4) }"
                  :style="{ transitionDelay: `${i * 0.08}s` }"
                />
              </div>
              <p class="mt-3 text-xs font-light text-ash">Hours of presence on skin and fabric.</p>
            </div>

            <div class="meter-block">
              <div class="flex items-center justify-between mb-3">
                <p class="text-[10px] tracking-[0.4em] uppercase text-gold font-light">Sillage</p>
                <span class="numeral text-2xl text-gold/60">{{ product.sillage || 3 }}/5</span>
              </div>
              <div class="meter-track">
                <div
                  v-for="i in 5"
                  :key="i"
                  class="meter-bar"
                  :class="{ 'meter-bar-on': i <= (product.sillage || 3) }"
                  :style="{ transitionDelay: `${i * 0.08}s` }"
                />
              </div>
              <p class="mt-3 text-xs font-light text-ash">The trail you leave when you pass through a room.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════ THE RITUAL — How to wear ═══════════════ -->
    <section class="reveal-on-scroll w-full bg-ivory dark:bg-obsidian py-24 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <p class="eyebrow mb-4">The Ritual</p>
          <h2 class="font-editorial text-4xl md:text-5xl text-obsidian dark:text-ivory tracking-tight mb-6">
            How to wear <span class="italic font-display text-gold">{{ product.name }}</span>
          </h2>
          <div class="gold-divider" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center">
            <p class="numeral text-5xl text-gold mb-4">i</p>
            <h3 class="font-editorial text-xl text-obsidian dark:text-ivory mb-3">Pulse Points</h3>
            <p class="text-sm font-light text-ash leading-loose">
              Apply to wrists, neck, and the inside of elbows. Warmth lifts the fragrance.
            </p>
          </div>
          <div class="text-center md:border-x border-gold/15 md:px-12">
            <p class="numeral text-5xl text-gold mb-4">ii</p>
            <h3 class="font-editorial text-xl text-obsidian dark:text-ivory mb-3">Do Not Rub</h3>
            <p class="text-sm font-light text-ash leading-loose">
              Let the perfume dry on the skin. Friction breaks the top notes too quickly.
            </p>
          </div>
          <div class="text-center">
            <p class="numeral text-5xl text-gold mb-4">iii</p>
            <h3 class="font-editorial text-xl text-obsidian dark:text-ivory mb-3">Two Hours</h3>
            <p class="text-sm font-light text-ash leading-loose">
              Reassess after the heart settles. The fragrance you smell at minute one is not the one others remember.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════ RELATED ═══════════════ -->
    <section v-if="relatedProducts.length" class="reveal-on-scroll w-full bg-cream dark:bg-charcoal py-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p class="eyebrow mb-3">Continue the Journey</p>
            <h2 class="font-editorial text-3xl md:text-4xl text-obsidian dark:text-ivory">
              From the same <span class="italic font-display text-gold">{{ product.category }}</span>
            </h2>
          </div>
          <RouterLink to="/shop/all-products" class="hover-line text-[10px] tracking-[0.3em] uppercase text-gold font-light">
            View All Fragrances →
          </RouterLink>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10">
          <button
            v-for="rp in relatedProducts"
            :key="rp.id"
            class="related-card group relative bg-ivory dark:bg-obsidian text-left p-6 cursor-pointer"
            @click="goTo(rp.id, rp.variant[0].id)"
          >
            <div class="aspect-[3/4] bg-cream dark:bg-charcoal mb-4 overflow-hidden relative">
              <img
                :src="rp.defaultImage"
                :alt="rp.name"
                class="w-full h-full object-contain p-6 transition-transform duration-[1.5s] group-hover:scale-110"
              />
            </div>
            <p class="text-[8px] tracking-[0.3em] uppercase text-gold/70 font-light mb-1">{{ rp.category }}</p>
            <h3 class="font-editorial text-xl text-obsidian dark:text-ivory mb-1 group-hover:text-gold transition-colors">
              {{ rp.name }}
            </h3>
            <p class="text-[10px] text-ash font-light italic mb-3">{{ rp.tagline }}</p>
            <p class="text-xs text-ash">From {{ formatCurrency(rp.variant[0].price) }}</p>
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.product-page {}

.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-cream { background-color: #f0ebe4; }
.bg-charcoal { background-color: #1a1a1a; }
.text-gold { color: #c9a84c; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }
.text-smoke { color: #bbbbbb; }
.border-gold { border-color: #c9a84c; }

.gold-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, #c9a84c, transparent);
  margin: 0 auto;
}

/* Vertical decorative name */
.vertical-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  letter-spacing: 0.04em;
  line-height: 0.9;
}

/* Mood chips */
.mood-chip {
  padding: 0.45rem 1rem;
  border: 1px solid rgba(201, 168, 76, 0.3);
  color: #888888;
  background: transparent;
}
.dark .mood-chip { color: #aaa; }

/* Note chips */
.note-chip {
  padding: 0.4rem 0.9rem;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  font-family: 'Cormorant Garamond', serif;
  color: #f5f0eb;
  background: rgba(201, 168, 76, 0.08);
  border: 1px solid rgba(201, 168, 76, 0.2);
  font-style: italic;
}

/* Size selector */
.size-selector {
  padding: 0.7rem 1.2rem;
  border: 1px solid rgba(201, 168, 76, 0.2);
  color: #888888;
  background: transparent;
  cursor: none;
  text-align: center;
  min-width: 80px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.size-selector:hover {
  border-color: rgba(201, 168, 76, 0.5);
  color: #0a0a0a;
}
.dark .size-selector:hover { color: #f5f0eb; }
.size-selector.active {
  border-color: #c9a84c;
  background: rgba(201, 168, 76, 0.08);
  color: #c9a84c;
}

/* Add to cart button */
.add-to-cart-btn {
  background: #0a0a0a;
  color: #f5f0eb;
  border: 1px solid #0a0a0a;
  cursor: none;
  position: relative;
  overflow: hidden;
}
.dark .add-to-cart-btn {
  background: #f5f0eb;
  color: #0a0a0a;
  border-color: #f5f0eb;
}
.add-to-cart-btn:hover {
  background: #c9a84c;
  border-color: #c9a84c;
  color: #0a0a0a;
  letter-spacing: 0.5em;
}

.cart-feedback-shimmer {
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent);
  animation: shimmer-sweep 1.2s ease-in-out;
}
@keyframes shimmer-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Pyramid SVG */
.pyramid-svg {
  width: 100%;
  max-width: 320px;
  height: auto;
}
.pyr-tier {
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
  animation: draw-stroke 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.pyr-top { animation-delay: 0.1s; }
.pyr-heart { animation-delay: 0.4s; }
.pyr-base { animation-delay: 0.7s; }
@keyframes draw-stroke {
  to { stroke-dashoffset: 0; }
}
.pyr-label {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  letter-spacing: 0.4em;
  fill: rgba(201, 168, 76, 0.7);
  opacity: 0;
  animation: fade-in 1s ease forwards;
}
.pyr-top + .pyr-label { animation-delay: 0.7s; }
.pyramid-svg text:nth-of-type(1) { animation-delay: 0.6s; }
.pyramid-svg text:nth-of-type(2) { animation-delay: 0.9s; }
.pyramid-svg text:nth-of-type(3) { animation-delay: 1.2s; }
.pyramid-svg text:nth-of-type(4) { animation-delay: 1.5s; }
@keyframes fade-in {
  to { opacity: 1; }
}
.pyr-name {
  font-family: 'Italiana', serif;
  font-size: 11px;
  letter-spacing: 0.4em;
  fill: rgba(232, 213, 163, 0.85);
  opacity: 0;
  animation: fade-in 1.5s ease forwards;
}

/* Note blocks reveal */
.note-block {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.note-block.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Meter */
.meter-track {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
}
.meter-bar {
  height: 4px;
  background: rgba(201, 168, 76, 0.15);
  transition: background-color 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.meter-bar-on {
  background: linear-gradient(90deg, #a07830, #c9a84c, #e8d5a3);
}

.meter-block {}

/* Numeral helper */
.numeral {
  font-family: 'Italiana', serif;
  font-weight: 400;
}

.eyebrow {
  font-size: 0.625rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
}

/* Related card */
.related-card {
  border: none;
  transition: background-color 0.4s ease;
  cursor: none;
}
.related-card:hover {
  background-color: #f0ebe4;
}
.dark .related-card:hover {
  background-color: #1a1a1a;
}

/* Hover-line utility (in case it isn't loaded globally yet) */
.hover-line {
  position: relative;
  display: inline-block;
}
.hover-line::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  height: 1px;
  background: #c9a84c;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-line:hover::after { transform: scaleX(1); }
</style>
