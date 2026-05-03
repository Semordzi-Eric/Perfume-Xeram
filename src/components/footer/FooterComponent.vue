<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const currentYear = useDateFormat(useNow(), 'YYYY')

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Reviews', to: '/reviews' },
]
</script>

<template>
  <footer class="footer-luxury w-full bg-obsidian overflow-hidden">

    <!-- Gold top border -->
    <div class="gold-divider-full" />

    <!-- Main footer content -->
    <div class="max-w-6xl mx-auto px-8 py-20">

      <!-- Logo + tagline -->
      <div class="text-center mb-16">
        <RouterLink to="/" class="inline-block mb-6">
          <img
            src="https://framerusercontent.com/images/sQCmgYexIataswnwC1ra5wB4nNc.png"
            alt="Xeram Perfumes"
            class="h-12 w-auto mx-auto object-contain brightness-0 invert"
          />
        </RouterLink>
        <div class="gold-divider mx-auto mb-6" />
        <p class="text-[10px] tracking-[0.4em] uppercase text-ash font-light">
          Crafted for the connoisseur
        </p>
      </div>

      <!-- Nav links -->
      <nav class="flex flex-wrap items-center justify-center gap-8 mb-16">
        <RouterLink
          v-for="link in footerLinks"
          :key="link.label"
          :to="link.to"
          class="footer-link text-[10px] tracking-[0.3em] uppercase font-light text-ash hover:text-gold transition-colors duration-300"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Social icons -->
      <div class="flex items-center justify-center gap-6 mb-16">
        <a href="#" class="social-icon group">
          <InstagramIcon class="size-4 text-ash group-hover:text-gold transition-colors duration-300" />
        </a>
        <a href="#" class="social-icon group">
          <WhatsAPP class="size-4 text-ash group-hover:text-gold transition-colors duration-300" />
        </a>
        <a href="#" class="social-icon group">
          <FaceBook class="size-4 text-ash group-hover:text-gold transition-colors duration-300" />
        </a>
        <a href="#" class="social-icon group">
          <TwitterIcon class="size-5 text-ash group-hover:text-gold transition-colors duration-300" />
        </a>
      </div>

      <!-- Bottom bar -->
      <div class="gold-divider-full mb-8" />
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-[10px] tracking-[0.2em] uppercase text-ash/60 font-light">
          © {{ currentYear }} Xeram Perfumes. All rights reserved.
        </p>
        <button
          @click="scrollToTop"
          class="back-to-top group flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-ash hover:text-gold transition-colors duration-300 font-light"
        >
          <span>Back to Top</span>
          <span class="back-to-top-arrow text-gold transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </button>
      </div>
    </div>

  </footer>
</template>

<style scoped>
.footer-luxury {
  background-color: #0a0a0a;
}

.text-gold { color: #c9a84c; }
.text-ash { color: #888888; }
.bg-obsidian { background-color: #0a0a0a; }

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent);
}

.social-icon {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(201, 168, 76, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}
.social-icon:hover {
  border-color: rgba(201, 168, 76, 0.4);
  background-color: rgba(201, 168, 76, 0.05);
}

.footer-link {
  position: relative;
}
.footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: #c9a84c;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-link:hover::after { transform: scaleX(1); }

.back-to-top { background: none; border: none; cursor: pointer; }
</style>
