<template>
  <section class="delivery-section w-full overflow-hidden">

    <!-- Dark cinematic header band -->
    <div class="bg-obsidian py-24 px-6 text-center reveal-on-scroll">
      <div class="gold-divider-full mb-16" />
      <p class="text-[10px] tracking-[0.5em] uppercase text-gold font-light mb-4">Our Promise</p>
      <h2 class="font-display text-4xl md:text-6xl font-light text-ivory mb-6 tracking-wide">
        Swift. Secure. Delivered.
      </h2>
      <div class="gold-divider mx-auto mb-8" />
      <p class="text-sm font-light text-ash max-w-2xl mx-auto leading-loose">
        At Xeram Perfumes, your order is treated with the same care as the fragrance itself.
        Our <span class="text-gold-light">FedEx tracked delivery service</span> reaches every corner of the country
        with precision and elegance.
      </p>
      <div class="gold-divider-full mt-16" />
    </div>

    <!-- Stat Metrics -->
    <div class="bg-charcoal py-16 px-6 reveal-on-scroll">
      <div class="max-w-4xl mx-auto grid grid-cols-3 gap-0 divide-x divide-gold/15">
        <div v-for="stat in stats" :key="stat.label" class="text-center px-6 py-4">
          <p class="font-display text-4xl md:text-5xl font-light text-gold mb-2">{{ stat.value }}</p>
          <p class="text-[9px] tracking-[0.3em] uppercase text-ash font-light">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <!-- Feature Cards -->
    <div class="bg-obsidian pb-24 px-6 reveal-on-scroll">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">
        <div
          v-for="feature in deliveryFeatures"
          :key="feature.title"
          class="delivery-card group bg-obsidian hover:bg-charcoal transition-colors duration-500 p-10 text-center"
        >
          <!-- Icon -->
          <div class="delivery-icon-wrap mx-auto mb-8">
            <span class="text-3xl">{{ feature.icon }}</span>
          </div>

          <!-- Image -->
          <div class="relative overflow-hidden mb-8 delivery-image-frame" style="aspect-ratio: 4/5;">
            <img
              :src="feature.image"
              :alt="feature.imageAlt"
              class="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-110"
              :srcset="feature.srcSet"
              loading="lazy"
              decoding="async"
            />
            <!-- Cinematic gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/25 to-transparent" />
            <!-- Gold radial glow on hover -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                 style="background: radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, transparent 60%);" />
            <!-- Hairline border that brightens on hover -->
            <div class="absolute inset-2 border border-gold/0 group-hover:border-gold/30 transition-all duration-700 pointer-events-none" />
          </div>

          <h3 class="font-display text-xl font-light text-ivory mb-4 leading-snug">{{ feature.title }}</h3>
          <div class="gold-divider mx-auto mb-5" />
          <p class="text-xs text-ash font-light leading-loose">{{ feature.description }}</p>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const stats = [
  { value: '3-5', label: 'Days Delivery' },
  { value: '100%', label: 'Tracked Orders' },
  { value: '24/7', label: 'Customer Care' },
]

const deliveryFeatures = [
  {
    title: 'Effortless Shipping',
    description: 'Enjoy hassle-free delivery with real-time FedEx tracking at every step of your journey.',
    image: '/img/home_5.png',
    srcSet: '',
    imageAlt: 'Hand-wrapped luxury parcel ready for shipping',
    icon: '✦',
  },
  {
    title: 'Guaranteed Timeframes',
    description: 'Most orders arrive within 3-5 business days. We don\'t keep you waiting.',
    image: '/img/home_2.png',
    srcSet: '',
    imageAlt: 'Express courier delivering an elegant package',
    icon: '✦',
  },
  {
    title: 'Your Satisfaction First',
    description: 'Every order is handled with care. If anything falls short, we make it right. Always.',
    image: '/img/home_3.png',
    srcSet: '',
    imageAlt: 'Customer unwrapping luxury fragrance with delight',
    icon: '✦',
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
.delivery-section { background-color: #0a0a0a; }

.delivery-icon-wrap {
  width: 56px;
  height: 56px;
  border: 1px solid rgba(201,168,76,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.delivery-card {
  border: none;
}

.text-gold { color: #c9a84c; }
.text-gold-light { color: #e8d5a3; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-charcoal { background-color: #1a1a1a; }

.gold-divider {
  width: 36px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
}
</style>
