<script setup lang="ts"></script>

<template>
  <section class="reveal-on-scroll relative w-full overflow-hidden">
    <!-- Atmospheric bg -->
    <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at top, rgba(201,168,76,0.06) 0%, transparent 55%);" />

    <div class="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">

      <!-- Eyebrow + heading -->
      <div class="text-center mb-20">
        <p class="eyebrow mb-5">Heritage · MMXXIV</p>
        <h1 class="font-editorial text-6xl md:text-8xl lg:text-9xl font-light text-obsidian dark:text-ivory leading-[0.9] tracking-tight">
          The essence of luxury,
          <span class="block italic font-display text-gold-shimmer">in every bottle.</span>
        </h1>
      </div>

      <!-- Two-column layout -->
      <div class="grid md:grid-cols-12 gap-10 md:gap-16 items-start">

        <!-- Left — image with overlay numerals -->
        <div class="md:col-span-7 relative">
          <div class="relative aspect-[4/5] w-full overflow-hidden bg-cream dark:bg-charcoal">
            <img
              src="/img/about.png"
              alt="Xeram atelier"
              class="w-full h-full object-cover object-center transition-transform duration-[3s] hover:scale-105"
            />
            <!-- Vignette -->
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
            <!-- Decorative ornament -->
            <div class="absolute top-6 left-6 corner-tl" />
            <div class="absolute bottom-6 right-6 corner-br" />

            <!-- Caption ribbon -->
            <div class="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between text-[9px] tracking-[0.4em] uppercase text-ivory">
              <span>Maison Xeram · Atelier</span>
              <span>N° 01 — Origins</span>
            </div>
          </div>

          <!-- Side floating numeral -->
          <div class="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2">
            <span class="numeral text-[10rem] text-gold/[0.10] dark:text-gold/[0.13] leading-none">01</span>
          </div>
        </div>

        <!-- Right — text -->
        <div class="md:col-span-5 md:py-12">
          <p class="font-display italic text-2xl text-gold mb-8 leading-snug">
            "We do not chase trends. We bottle moments."
          </p>

          <div class="gold-divider mb-8" style="margin-left: 0;" />

          <p class="text-base font-light text-ash dark:text-smoke leading-loose mb-6">
            Founded in 2024 in Accra by Isaac Semordzi, Xeram Perfumes was born from a simple disquiet — that fragrance, in West Africa, deserved a house of its own.
          </p>
          <p class="text-base font-light text-ash dark:text-smoke leading-loose mb-6">
            Our compositions begin with the raw materials, not the brief. Aged ouds from Assam. Cold-pressed bergamot from Calabria. Rose absolutes from Grasse. Each bottle is hand-blended in batches small enough that the perfumer remembers every one.
          </p>
          <p class="text-base font-light text-ash dark:text-smoke leading-loose mb-10">
            We make two things — Originals, where we write our own olfactive grammar, and Impressions, where we honour the icons at a fraction of their fee. Both, we believe, deserve to be worn the world over.
          </p>

          <!-- Founder signature -->
          <div class="mt-12 flex items-center gap-4">
            <div class="signature-line" />
            <div>
              <p class="font-display italic text-xl text-obsidian dark:text-ivory">Isaac Semordzi</p>
              <p class="text-[9px] tracking-[0.4em] uppercase text-gold font-light mt-1">Founder · Accra</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stat strip -->
      <div class="mt-24 grid grid-cols-2 md:grid-cols-4 border-y border-gold/15 divide-x divide-gold/15">
        <div class="text-center px-4 py-10">
          <p class="numeral text-5xl text-gold mb-2">2024</p>
          <p class="text-[9px] tracking-[0.4em] uppercase text-ash font-light">Founded</p>
        </div>
        <div class="text-center px-4 py-10">
          <p class="numeral text-5xl text-gold mb-2">07</p>
          <p class="text-[9px] tracking-[0.4em] uppercase text-ash font-light">Compositions</p>
        </div>
        <div class="text-center px-4 py-10">
          <p class="numeral text-5xl text-gold mb-2">∞</p>
          <p class="text-[9px] tracking-[0.4em] uppercase text-ash font-light">Hand Blended</p>
        </div>
        <div class="text-center px-4 py-10">
          <p class="numeral text-5xl text-gold mb-2">100%</p>
          <p class="text-[9px] tracking-[0.4em] uppercase text-ash font-light">Made in Accra</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-gold { color: #c9a84c; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }
.text-smoke { color: #bbbbbb; }
.bg-cream { background-color: #f0ebe4; }
.bg-charcoal { background-color: #1a1a1a; }
.bg-obsidian { background-color: #0a0a0a; }

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
  animation: shimmer-x 4s linear infinite;
}
@keyframes shimmer-x {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.signature-line {
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, #c9a84c, transparent);
}

.corner-tl { width: 32px; height: 32px; border-top: 1px solid rgba(232,213,163,0.7); border-left: 1px solid rgba(232,213,163,0.7); }
.corner-br { width: 32px; height: 32px; border-bottom: 1px solid rgba(232,213,163,0.7); border-right: 1px solid rgba(232,213,163,0.7); }
</style>
