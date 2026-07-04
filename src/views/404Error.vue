<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const cursorPos = ref({ x: 0, y: 0 })
const onMouseMove = (e: MouseEvent) => {
  cursorPos.value = { x: e.clientX, y: e.clientY }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <section class="not-found relative min-h-[80vh] w-full overflow-hidden bg-obsidian flex items-center justify-center">
    <!-- Mouse-reactive radial glow -->
    <div
      class="absolute inset-0 pointer-events-none transition-opacity duration-700"
      :style="{
        background: `radial-gradient(circle 500px at ${cursorPos.x}px ${cursorPos.y}px, rgba(201,168,76,0.16), transparent 65%)`,
      }"
    />

    <!-- Floating gold particles -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="i in 12"
        :key="i"
        class="error-particle"
        :style="{
          left: ((i * 41) % 100) + '%',
          top: ((i * 29) % 100) + '%',
          animationDelay: (i * 0.5) + 's',
          animationDuration: (8 + (i % 6)) + 's',
        }"
      />
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-2xl">

      <!-- Massive 404 numeral -->
      <div class="relative">
        <h1 class="numeral text-[14rem] md:text-[20rem] leading-none tracking-tighter text-gold-shimmer">
          404
        </h1>
        <!-- Vapor lines -->
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span class="block w-px h-6 bg-gradient-to-t from-gold/50 to-transparent" />
          <span class="block w-px h-3 bg-gradient-to-t from-gold/40 to-transparent" />
        </div>
      </div>

      <p class="eyebrow mt-2 mb-5">A scent we lost</p>

      <h2 class="font-editorial text-3xl md:text-5xl text-ivory mb-5 leading-tight">
        This bottle <span class="italic font-display text-gold">evaporated</span>.
      </h2>

      <div class="gold-divider mb-8" />

      <p class="text-sm font-light text-ash leading-loose mb-12 max-w-md mx-auto">
        The page you reached for is no longer here — perhaps it was discontinued, perhaps it was never bottled. The atelier is still open.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink to="/" class="luxury-btn">
          Return to the Maison
        </RouterLink>
        <RouterLink to="/shop/all-products" class="ghost-btn">
          <span>Browse the Atelier</span>
          <span class="text-gold ml-2">→</span>
        </RouterLink>
      </div>

      <!-- Bottom note -->
      <p class="text-[9px] tracking-[0.4em] uppercase text-ash/60 font-light mt-16 italic">
        ✦ Maison Xeram · Lost & Found ✦
      </p>
    </div>
  </section>
</template>

<style scoped>
.not-found {}

.bg-obsidian { background-color: #0a0a0a; }
.text-gold { color: #c9a84c; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }

.gold-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
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
  letter-spacing: -0.05em;
}

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

.ghost-btn {
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
  border: 1px solid rgba(245, 240, 235, 0.2);
}
.ghost-btn:hover {
  color: #c9a84c;
  border-color: rgba(201, 168, 76, 0.6);
  letter-spacing: 0.4em;
}

.error-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(232, 213, 163, 0.6);
  border-radius: 50%;
  filter: blur(0.5px);
  animation: particle-drift linear infinite;
  pointer-events: none;
}
</style>
