<script setup lang="ts">
import { useRevealOnScroll } from '@/composables/useRevealOnScroll'

const marqueeItems = [
  'Maison de Parfum', '·', 'Crafted in Accra', '·', 'Since 2024', '·',
  'Slow Made', '·', 'By Hand', '·', 'Aged Ouds', '·', 'Grasse Florals',
  '·', 'Cruelty Free', '·',
]

const craftPillars = [
  {
    title: 'Rare Ingredients',
    body: 'We source only what belongs in a fine fragrance — aged ouds from Assam, Grasse rose absolutes, Madagascan vanilla. No shortcuts. No synthetic imposters where a real material should be.',
  },
  {
    title: 'Artisan Blending',
    body: 'Every fragrance is measured drop by drop by a trained nose. Each batch is blended by hand and aged for a minimum of four weeks before it bears the Xeram name.',
  },
  {
    title: 'Obsessive Revisions',
    body: 'A new composition goes through dozens of revisions before it is released. If a single note is out of balance, we start again. Perfection is non-negotiable.',
  },
]

const brandStats = [
  { value: '20+', label: 'Compositions' },
  { value: '3+', label: 'Years Crafting' },
  { value: '1000+', label: 'Clients Served' },
  { value: '100%', label: 'Hand-blended' },
]

useRevealOnScroll(0.12)
</script>

<template>
  <div class="about-page bg-ivory dark:bg-obsidian min-h-screen">

    <!-- HERO -->
    <section class="reveal-on-scroll relative w-full overflow-hidden flex items-center" style="min-height: 100svh;">
      <div class="absolute inset-0">
        <img src="/img/home_1.png" alt="The Xeram atelier" class="w-full h-full object-cover opacity-40" fetchpriority="high" decoding="async" />
        <div class="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/50 to-obsidian/90" />
        <div class="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-obsidian/40" />
        <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.12) 0%, transparent 55%);" />
      </div>
      <div class="absolute top-8 left-8 corner-ornament corner-tl" />
      <div class="absolute top-8 right-8 corner-ornament corner-tr" />
      <div class="absolute bottom-8 left-8 corner-ornament corner-bl" />
      <div class="absolute bottom-8 right-8 corner-ornament corner-br" />
      <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-32 grid md:grid-cols-12 gap-12 items-center w-full">
        <div class="md:col-span-7">
          <p class="eyebrow mb-6">Our Story · MMXXIV</p>
          <h1 class="font-editorial text-6xl md:text-8xl lg:text-9xl text-ivory leading-[0.9] tracking-tight mb-8">
            Born in<br/>
            <span class="italic font-display text-gold-shimmer">Accra.</span>
          </h1>
          <div class="gold-divider mb-8" style="margin-left: 0;" />
          <p class="text-base font-light text-ivory/75 max-w-lg leading-loose">
            Xeram Perfumes is a Ghanaian maison de parfum. We believe luxury fragrance should not require a transatlantic flight. We compose in Accra. We deliver nationwide.
          </p>
        </div>
        <div class="md:col-span-5 hidden md:block">
          <div class="border border-gold/20 p-10 text-right">
            <p class="numeral text-8xl text-gold/30 leading-none mb-4">N°1</p>
            <p class="text-[9px] tracking-[0.5em] uppercase text-gold font-light mb-3">Maison</p>
            <p class="font-display italic text-xl text-ivory/80 leading-snug">
              The first house of fine fragrance founded in the Gold Coast.
            </p>
          </div>
        </div>
      </div>
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span class="text-[9px] tracking-[0.4em] uppercase text-ivory/40 font-light">Scroll</span>
        <div class="scroll-line-about" />
      </div>
    </section>

    <!-- MARQUEE -->
    <div class="w-full bg-obsidian border-y border-gold/10 py-6 overflow-hidden" aria-hidden="true">
      <div class="marquee-track">
        <span
          v-for="(word, i) in [...marqueeItems, ...marqueeItems]"
          :key="i"
          class="inline-flex items-center px-8 font-editorial text-xl md:text-2xl text-ivory/70 whitespace-nowrap"
          :class="word === '·' ? 'text-gold/60 px-4' : ''"
        >{{ word }}</span>
      </div>
    </div>

    <!-- PHILOSOPHY -->
    <section class="reveal-on-scroll w-full py-32 px-6 bg-ivory dark:bg-obsidian">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <p class="eyebrow mb-5">Our Philosophy</p>
          <h2 class="font-editorial text-5xl md:text-6xl text-obsidian dark:text-ivory leading-[0.95] tracking-tight mb-8">
            Scent is the<br/>
            <span class="italic font-display text-gold">shortest path</span><br/>
            to memory.
          </h2>
          <div class="gold-divider mb-8" style="margin-left: 0;" />
          <p class="text-base font-light text-ash dark:text-smoke leading-loose mb-6 max-w-md">
            We don't create fragrances. We compose experiences. Every bottle in the Xeram atelier begins with a question: what should this person feel when they walk into the room?
          </p>
          <p class="text-base font-light text-ash dark:text-smoke leading-loose max-w-md">
            That question guides every ingredient selection, every dilution ratio, every blending decision. The answer, when we get it right, is a fragrance that doesn't announce itself — it reveals itself.
          </p>
        </div>
        <div class="relative">
          <div class="aspect-[4/5] overflow-hidden bg-cream dark:bg-charcoal group relative">
            <img src="/img/home_2.png" alt="Xeram perfume philosophy" class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" loading="lazy" decoding="async" />
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent" />
          </div>
          <span class="absolute -bottom-6 -left-6 numeral text-[10rem] text-gold/[0.06] dark:text-gold/[0.09] leading-none select-none pointer-events-none">01</span>
        </div>
      </div>
    </section>

    <!-- THE CRAFT -->
    <section class="reveal-on-scroll w-full bg-obsidian py-32 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <p class="eyebrow mb-5">The Craft</p>
          <h2 class="font-editorial text-5xl md:text-7xl text-ivory leading-[0.92] tracking-tight mb-6">
            Made by <span class="italic font-display text-gold">hand.</span><br/>Not by committee.
          </h2>
          <div class="gold-divider mb-8" />
          <p class="text-sm font-light text-ash max-w-xl mx-auto leading-loose">
            Each composition is blended in small batches. Aged for weeks. Revised dozens of times. We don't rush. Neither should you.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">
          <div v-for="(pillar, i) in craftPillars" :key="i" class="group bg-obsidian hover:bg-charcoal transition-colors duration-500 p-12 text-center">
            <p class="numeral text-6xl text-gold/50 mb-6 leading-none">0{{ i + 1 }}</p>
            <h3 class="font-editorial text-2xl text-ivory mb-4">{{ pillar.title }}</h3>
            <div class="gold-divider mb-6" />
            <p class="text-sm font-light text-ash leading-loose">{{ pillar.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ORIGIN -->
    <section class="reveal-on-scroll w-full py-32 px-6 bg-cream dark:bg-charcoal">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div class="relative">
            <div class="aspect-[3/4] overflow-hidden bg-ivory dark:bg-graphite group relative">
              <img src="/img/home_3.png" alt="Accra, birthplace of Xeram Perfumes" class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" loading="lazy" decoding="async" />
              <div class="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent" />
              <div class="absolute bottom-6 left-6 right-6">
                <p class="text-[8px] tracking-[0.4em] uppercase text-gold/80 font-light">Accra, Ghana</p>
                <p class="font-display italic text-ivory/80 text-base mt-1">5°33′N · 0°12′W</p>
              </div>
            </div>
          </div>
          <div>
            <p class="eyebrow mb-5">Where We Come From</p>
            <h2 class="font-editorial text-4xl md:text-5xl text-obsidian dark:text-ivory leading-[0.95] tracking-tight mb-8">
              The Gold Coast<br/>
              gave us <span class="italic font-display text-gold">gold.</span>
            </h2>
            <div class="gold-divider mb-8" style="margin-left: 0;" />
            <p class="text-base font-light text-ash dark:text-smoke leading-loose mb-6">
              Ghana has always been a land of substance. Gold, cocoa, kente — everything that comes from here carries weight. Xeram Perfumes is another name on that list.
            </p>
            <p class="text-base font-light text-ash dark:text-smoke leading-loose mb-10">
              We are not inspired by Europe. We are inspired by what happens when Ghanaian precision meets the great tradition of French perfumery. Something new. Something ours.
            </p>
            <RouterLink to="/shop/all-products" class="luxury-btn">
              Visit the Atelier
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="reveal-on-scroll w-full bg-obsidian py-20 px-6 border-y border-gold/10">
      <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gold/10">
        <div v-for="stat in brandStats" :key="stat.label" class="text-center px-8 py-4">
          <p class="numeral text-5xl md:text-6xl text-gold mb-2">{{ stat.value }}</p>
          <p class="text-[9px] tracking-[0.4em] uppercase text-ash font-light">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- DISCOVER CTA -->
    <section class="reveal-on-scroll w-full py-32 px-6 text-center bg-ivory dark:bg-obsidian">
      <p class="eyebrow mb-5">Ready?</p>
      <h2 class="font-editorial text-5xl md:text-7xl text-obsidian dark:text-ivory leading-[0.92] tracking-tight mb-6">
        Find the scent<br/>
        that becomes <span class="italic font-display text-gold">yours.</span>
      </h2>
      <div class="gold-divider mb-10" />
      <p class="text-sm font-light text-ash max-w-md mx-auto leading-loose mb-12">
        Explore the full catalogue. Filter by mood, accord, or intensity. Or simply trust your instinct — some decisions are made by the nose, not the mind.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink to="/shop/all-products" class="luxury-btn">
          Browse the Collection
        </RouterLink>
        <RouterLink to="/contact" class="ghost-about-btn">
          <span>Book a Consultation</span>
          <span class="ml-2 text-gold">→</span>
        </RouterLink>
      </div>
    </section>

  </div>
</template>

<style scoped>
.about-page {}

.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-cream { background-color: #f0ebe4; }
.bg-charcoal { background-color: #1a1a1a; }
.bg-graphite { background-color: #2a2a2a; }
.text-gold { color: #c9a84c; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #6b6b6b; }
.text-smoke { color: #bbbbbb; }

.gold-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, #c9a84c, transparent);
  margin: 0 auto;
}

.eyebrow {
  display: inline-block;
  font-size: 0.625rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
}

.numeral {
  font-family: 'Italiana', serif;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.04em;
}

.text-gold-shimmer {
  background: linear-gradient(135deg, #c9a84c 0%, #e8d5a3 40%, #a07830 80%, #c9a84c 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer-about 4s linear infinite;
}
@keyframes shimmer-about {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.corner-ornament {
  width: 28px;
  height: 28px;
  border-color: rgba(201, 168, 76, 0.45);
}
.corner-tl { border-top: 1px solid; border-left: 1px solid; }
.corner-tr { border-top: 1px solid; border-right: 1px solid; }
.corner-bl { border-bottom: 1px solid; border-left: 1px solid; }
.corner-br { border-bottom: 1px solid; border-right: 1px solid; }

.scroll-line-about {
  width: 1px;
  height: 48px;
  background: linear-gradient(180deg, rgba(201,168,76,0.8), transparent);
  animation: scroll-bounce-about 2s ease-in-out infinite;
}
@keyframes scroll-bounce-about {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(0.5); opacity: 0.4; }
}

.ghost-about-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.05rem 2rem;
  color: #0a0a0a;
  font-size: 0.65rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
  transition: all 0.4s ease;
  text-decoration: none;
  border: 1px solid rgba(10, 10, 10, 0.2);
}
.dark .ghost-about-btn { color: #f5f0eb; border-color: rgba(245, 240, 235, 0.2); }
.ghost-about-btn:hover {
  color: #c9a84c;
  border-color: rgba(201, 168, 76, 0.6);
  letter-spacing: 0.4em;
}
</style>
