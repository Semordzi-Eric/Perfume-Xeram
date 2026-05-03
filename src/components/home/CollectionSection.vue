<template>
  <section class="collection-section w-full overflow-hidden py-24 bg-obsidian">

    <!-- Header -->
    <div class="reveal-on-scroll text-center mb-16 px-6">
      <p class="text-[10px] tracking-[0.5em] uppercase text-gold font-light mb-4">Curated For You</p>
      <h2 class="font-display text-4xl md:text-6xl font-light text-ivory mb-6 tracking-wide">
        Exquisite Collections
      </h2>
      <div class="gold-divider mx-auto mb-8" />
      <p class="text-sm font-light text-ash max-w-xl mx-auto leading-loose">
        From timeless originals to captivating impressions — a universe of scent awaits.
      </p>
    </div>

    <!-- Horizontal Scroll Ribbon -->
    <div class="reveal-on-scroll collection-ribbon-wrap relative">
      <!-- Fade edges -->
      <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-obsidian to-transparent" />
      <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-obsidian to-transparent" />

      <div class="collection-ribbon flex gap-6 overflow-x-auto px-16 pb-4 scroll-smooth" style="scrollbar-width: none;">
        <div
          v-for="(collection, index) in collections"
          :key="index"
          class="collection-card magnetic-card group relative flex-shrink-0 cursor-pointer"
        >
          <!-- Card image -->
          <div class="relative overflow-hidden w-full" style="aspect-ratio: 3/4;">
            <img
              :src="collection.image"
              :alt="collection.title"
              class="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <!-- Cinematic gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/30 to-obsidian/10" />
            <!-- Gold glow on hover -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style="background: radial-gradient(ellipse at center, rgba(201,168,76,0.20) 0%, transparent 65%);" />
            <!-- Hairline frame on hover -->
            <div class="absolute inset-3 border border-gold/0 group-hover:border-gold/30 transition-all duration-700 pointer-events-none" />
            <!-- Bottom-left collection number -->
            <div class="absolute bottom-4 left-4 text-[8px] tracking-[0.4em] uppercase text-gold/80 font-light">
              N° 0{{ index + 1 }}
            </div>
          </div>

          <!-- Card content -->
          <div class="p-6 text-center border-t border-gold/20">
            <p class="text-[9px] tracking-[0.4em] uppercase text-gold font-light mb-3">Collection</p>
            <h3 class="font-display text-xl font-light text-ivory mb-3 leading-tight">
              {{ collection.title }}
            </h3>
            <p class="text-xs text-ash font-light leading-loose">{{ collection.description }}</p>
            <div class="mt-5 inline-flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-gold font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span>Explore</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="reveal-on-scroll text-center mt-16">
      <RouterLink to="/shop/all-products" class="luxury-btn">
        Browse All Collections
        <span class="ml-2">→</span>
      </RouterLink>
    </div>

  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const collections = [
  {
    title: 'Xeram Originals',
    description: 'Authentic scents crafted from rare, organic oils sourced from across the globe.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Xeram Impressions',
    description: 'The finest luxury designer impressions — elegance made accessible.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Signature 50ml',
    description: 'The intimate size. A perfect introduction to your signature scent.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Grand 100ml',
    description: 'The collector\'s choice. A generous expression of uncompromising quality.',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Majestic 150ml',
    description: 'The statement piece. When you want your presence felt before you enter the room.',
    image: 'https://images.unsplash.com/photo-1557170334-a9086d21c2d6?auto=format&fit=crop&w=900&q=85',
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('revealed')),
    { threshold: 0.1 },
  )
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.collection-section {
  background-color: #0a0a0a;
}

.collection-ribbon::-webkit-scrollbar { display: none; }

.collection-card {
  width: 280px;
  background: #111111;
  border: 1px solid rgba(201, 168, 76, 0.1);
  transition: border-color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.collection-card:hover {
  border-color: rgba(201, 168, 76, 0.35);
  transform: translateY(-8px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(201, 168, 76, 0.15);
}

.text-gold { color: #c9a84c; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }
.border-gold { border-color: #c9a84c; }

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
</style>
