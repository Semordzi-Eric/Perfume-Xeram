<script setup lang="ts"></script>

<template>
  <section class="reveal-on-scroll w-full overflow-hidden bg-obsidian py-24 md:py-32 relative">

    <!-- Atmospheric background -->
    <div class="absolute inset-0 pointer-events-none opacity-50" style="background: radial-gradient(circle at 20% 30%, rgba(201,168,76,0.10), transparent 50%), radial-gradient(circle at 80% 70%, rgba(201,168,76,0.08), transparent 50%);" />

    <div class="relative max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-16 items-center">

      <!-- Left text -->
      <div class="md:col-span-6 md:order-2">
        <p class="eyebrow mb-5">Philosophy · 02</p>
        <h2 class="font-editorial text-4xl md:text-6xl lg:text-7xl text-ivory tracking-tight leading-[0.95] mb-8">
          Where modern <span class="italic font-display text-gold">creativity</span> meets timeless heritage.
        </h2>

        <div class="gold-divider mb-8" style="margin-left: 0;" />

        <p class="text-base font-light text-ash leading-loose mb-6">
          Our perfumers were trained between continents — Paris, Mumbai, Accra. They write fragrances the way a novelist writes characters: with a backstory, a register, a way of entering a room.
        </p>
        <p class="text-base font-light text-ash leading-loose mb-10">
          We believe a great fragrance has three lives. The one you smell. The one you remember. And the one others tell about you, after you have left.
        </p>

        <!-- Pillars -->
        <div class="grid grid-cols-2 gap-8 mt-10">
          <div>
            <p class="numeral text-4xl text-gold mb-2">i.</p>
            <h4 class="font-editorial text-lg text-ivory mb-1">Slow-made</h4>
            <p class="text-xs text-ash font-light leading-relaxed">Hand-blended in small batches. No shortcuts.</p>
          </div>
          <div>
            <p class="numeral text-4xl text-gold mb-2">ii.</p>
            <h4 class="font-editorial text-lg text-ivory mb-1">Cruelty-free</h4>
            <p class="text-xs text-ash font-light leading-relaxed">Synthetic musks where ethics demand it.</p>
          </div>
          <div>
            <p class="numeral text-4xl text-gold mb-2">iii.</p>
            <h4 class="font-editorial text-lg text-ivory mb-1">Single-batch</h4>
            <p class="text-xs text-ash font-light leading-relaxed">Each bottle traceable to the day it was made.</p>
          </div>
          <div>
            <p class="numeral text-4xl text-gold mb-2">iv.</p>
            <h4 class="font-editorial text-lg text-ivory mb-1">Refillable</h4>
            <p class="text-xs text-ash font-light leading-relaxed">A bottle is not disposable. We refill yours.</p>
          </div>
        </div>
      </div>

      <!-- Right image -->
      <div class="md:col-span-6 md:order-1 relative">
        <div class="relative aspect-[4/5] w-full overflow-hidden">
          <img
            src="/img/about2.png"
            alt="Xeram ingredients and craft"
            class="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent pointer-events-none" />
          <div class="absolute top-6 right-6 corner-tr" />
          <div class="absolute bottom-6 left-6 corner-bl" />
        </div>

        <!-- Side floating numeral -->
        <div class="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2">
          <span class="numeral text-[10rem] text-gold/[0.13] leading-none">02</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-obsidian { background-color: #0a0a0a; }
.text-gold { color: #c9a84c; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, #c9a84c, transparent);
}

.eyebrow {
  display: inline-block;
  font-size: 0.625rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
}

.numeral {
  font-family: 'Italiana', serif;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.04em;
}

.corner-tr { width: 32px; height: 32px; border-top: 1px solid rgba(232,213,163,0.7); border-right: 1px solid rgba(232,213,163,0.7); }
.corner-bl { width: 32px; height: 32px; border-bottom: 1px solid rgba(232,213,163,0.7); border-left: 1px solid rgba(232,213,163,0.7); }
</style>
