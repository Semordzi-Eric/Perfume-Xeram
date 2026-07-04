<template>
  <section class="why-section w-full overflow-hidden">

    <!-- Section Header -->
    <div class="reveal-on-scroll text-center py-20 px-6 bg-ivory dark:bg-obsidian">
      <p class="text-[10px] tracking-[0.5em] uppercase text-gold font-light mb-4">Our Promise</p>
      <h2 class="font-display text-4xl md:text-6xl font-light tracking-wide text-obsidian dark:text-ivory mb-6">
        Why Choose Xeram
      </h2>
      <div class="gold-divider mx-auto" />
    </div>

    <!-- Editorial Alternating Blocks -->
    <div
      v-for="(item, index) in sections"
      :key="index"
      class="reveal-on-scroll editorial-block grid grid-cols-1 md:grid-cols-2 min-h-[70vh]"
      :class="index % 2 === 1 ? 'reverse-layout' : ''"
    >
      <!-- Image Side -->
      <div class="editorial-image relative overflow-hidden group">
        <img
          decoding="async"
          loading="lazy"
          :srcset="item.imageSrcset"
          :src="item.imageSrc"
          :alt="item.imageAlt"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.4s] ease-out group-hover:scale-105"
        />
        <!-- Cinematic vignette + gold tint -->
        <div class="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent" />
        <div class="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700"
             style="background: radial-gradient(ellipse at 30% 70%, rgba(201,168,76,0.10) 0%, transparent 60%);" />
        <!-- Hairline corner ornaments -->
        <span class="absolute top-6 left-6 corner-tl" />
        <span class="absolute bottom-6 right-6 corner-br" />
        <!-- Decorative numeral -->
        <div class="absolute top-8 right-8 md:top-12 md:right-12">
          <span class="editorial-numeral font-display text-ivory/25 select-none">{{ String(index + 1).padStart(2, '0') }}</span>
        </div>
      </div>

      <!-- Text Side -->
      <div
        class="editorial-text flex flex-col justify-center px-10 py-16 md:px-16 md:py-24"
        :class="index % 2 === 0 ? 'bg-ivory dark:bg-obsidian' : 'bg-cream dark:bg-charcoal'"
      >
        <p class="text-[9px] tracking-[0.5em] uppercase text-gold font-light mb-6">0{{ index + 1 }} — Excellence</p>
        <h3 class="font-display text-3xl md:text-4xl lg:text-5xl font-light text-obsidian dark:text-ivory mb-8 leading-tight">
          {{ item.title }}
        </h3>
        <div class="gold-divider mb-8" style="margin-left: 0; margin-right: auto;" />
        <p class="text-sm font-light text-ash dark:text-smoke leading-loose max-w-md">
          {{ item.description }}
        </p>
        <div class="mt-10">
          <RouterLink to="/shop/all-products" class="editorial-cta group inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-obsidian dark:text-ivory font-light">
            <span class="group-hover:text-gold transition-colors duration-300">Discover More</span>
            <span class="editorial-arrow text-gold transition-transform duration-300 group-hover:translate-x-2">→</span>
          </RouterLink>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { useRevealOnScroll } from '@/composables/useRevealOnScroll'

const sections = [
  {
    title: 'The Art of Fine Ingredients',
    description:
      'We source only the most exceptional ingredients from around the world — rare florals, aged ouds, and precious resins. Each note is chosen with an obsessive attention to quality, creating fragrances that last and linger.',
    imageSrc: '/img/home_1.png',
    imageAlt: 'Rare botanical ingredients for luxury perfume',
    imageSrcset: '',
  },
  {
    title: 'Elegance in Every Bottle',
    description:
      'Our bottles are designed as objects of desire — each one a sculptural testament to luxury. Gold-accented glass vessels that sit on your vanity as a statement of refined taste.',
    imageSrc: '/img/home_2.png',
    imageAlt: 'Sculptural luxury perfume bottle on marble',
    imageSrcset: '',
  },
  {
    title: 'Crafted by Master Perfumers',
    description:
      'Every composition is the work of artisan noses with decades of training — measured drop by drop, aged for weeks, and perfected through dozens of revisions before it ever bears the Xeram name.',
    imageSrc: '/img/home_3.png',
    imageAlt: 'Master perfumer at work in the atelier',
    imageSrcset: '',
  },
]

useRevealOnScroll()
</script>

<style scoped>
.why-section {
  background-color: #f5f0eb;
}
.dark .why-section {
  background-color: #0a0a0a;
}

.editorial-image {
  min-height: 60vw;
}
@media (min-width: 768px) {
  .editorial-image {
    min-height: unset;
  }
}

.editorial-numeral {
  font-size: clamp(5rem, 15vw, 12rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.04em;
}

.bg-ivory { background-color: #f5f0eb; }
.bg-cream { background-color: #f0ebe4; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-charcoal { background-color: #1a1a1a; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-gold { color: #c9a84c; }
.text-ash { color: #888888; }
.text-smoke { color: #bbbbbb; }

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, #c9a84c, transparent);
}

/* Corner ornaments */
.corner-tl, .corner-br {
  width: 24px;
  height: 24px;
  pointer-events: none;
}
.corner-tl {
  border-top: 1px solid rgba(232, 213, 163, 0.55);
  border-left: 1px solid rgba(232, 213, 163, 0.55);
}
.corner-br {
  border-bottom: 1px solid rgba(232, 213, 163, 0.55);
  border-right: 1px solid rgba(232, 213, 163, 0.55);
}

/* Reverse alternating layout on desktop */
@media (min-width: 768px) {
  .reverse-layout > *:first-child {
    order: 2;
  }
}
</style>
