<script setup lang="ts"></script>

<template>
  <section class="reveal-on-scroll relative w-full overflow-hidden">
    <!-- Background image with overlays -->
    <div class="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
      <img
        src="/img/discover.png"
        alt="Xeram luxury fragrances"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-[6s] hover:scale-105"
      />
      <div class="absolute inset-0 bg-obsidian/65" />
      <div class="absolute inset-0 vignette-grad" />

      <!-- Corner ornaments -->
      <div class="absolute top-8 left-8 corner-tl" />
      <div class="absolute top-8 right-8 corner-tr" />
      <div class="absolute bottom-8 left-8 corner-bl" />
      <div class="absolute bottom-8 right-8 corner-br" />

      <!-- Vertical text -->
      <div class="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6">
        <span class="vertical-text text-[9px] tracking-[0.5em] uppercase text-gold/70 font-light">
          Maison Xeram
        </span>
        <div class="w-px h-24 bg-gradient-to-b from-gold/60 to-transparent" />
      </div>

      <!-- Vertical text right -->
      <div class="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6">
        <div class="w-px h-24 bg-gradient-to-t from-gold/60 to-transparent" />
        <span class="vertical-text text-[9px] tracking-[0.5em] uppercase text-gold/70 font-light">
          MMXXIV — N° 04
        </span>
      </div>

      <!-- Content -->
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p class="eyebrow mb-6">The Maison Awaits</p>

        <h2 class="font-editorial text-5xl md:text-7xl lg:text-8xl text-ivory leading-[0.92] tracking-tight mb-8 max-w-4xl">
          Discover our exquisite
          <span class="block italic font-display text-gold-shimmer">fragrances.</span>
        </h2>

        <div class="my-2 flex items-center gap-3">
          <span class="block w-12 h-px bg-gold/50" />
          <span class="text-gold text-xs">✦</span>
          <span class="block w-12 h-px bg-gold/50" />
        </div>

        <p class="mt-6 max-w-md text-sm md:text-base font-light text-ivory/80 leading-loose mb-10">
          Begin where the writers, the architects, and the surgeons begin. The shelf is open.
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          <RouterLink to="/shop/all-products" class="luxury-btn">
            Browse the Atelier
          </RouterLink>
          <RouterLink to="/contact" class="ghost-btn-light">
            <span>Request a Consultation</span>
            <span class="text-gold ml-2">→</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-obsidian { background-color: #0a0a0a; }
.text-gold { color: #c9a84c; }
.text-ivory { color: #f5f0eb; }

.vignette-grad {
  background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%);
}

.eyebrow {
  display: inline-block;
  font-size: 0.625rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
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

/* Vertical text */
.vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

/* Corners */
.corner-tl { width: 32px; height: 32px; border-top: 1px solid rgba(232,213,163,0.5); border-left: 1px solid rgba(232,213,163,0.5); }
.corner-tr { width: 32px; height: 32px; border-top: 1px solid rgba(232,213,163,0.5); border-right: 1px solid rgba(232,213,163,0.5); }
.corner-bl { width: 32px; height: 32px; border-bottom: 1px solid rgba(232,213,163,0.5); border-left: 1px solid rgba(232,213,163,0.5); }
.corner-br { width: 32px; height: 32px; border-bottom: 1px solid rgba(232,213,163,0.5); border-right: 1px solid rgba(232,213,163,0.5); }

.ghost-btn-light {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.05rem 2.25rem;
  color: #f5f0eb;
  font-size: 0.65rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
  transition: all 0.4s ease;
  text-decoration: none;
  border: 1px solid rgba(245, 240, 235, 0.3);
}
.ghost-btn-light:hover {
  color: #c9a84c;
  border-color: rgba(201, 168, 76, 0.6);
  letter-spacing: 0.4em;
}
</style>
