<script setup lang="ts"></script>

<template>
  <RouterLink :to="{ name: 'home' }" class="xeram-logo group inline-flex flex-col items-center" aria-label="Xeram — Home">
    <!-- Top hairline + ornament -->
    <div class="flex items-center gap-2 mb-1.5">
      <span class="block w-6 h-px bg-gold/60 transition-all duration-500 group-hover:w-8" />
      <span class="text-gold text-[8px]">✦</span>
      <span class="block w-6 h-px bg-gold/60 transition-all duration-500 group-hover:w-8" />
    </div>

    <!-- Wordmark -->
    <span class="logo-word font-editorial text-[22px] md:text-[26px] tracking-[0.32em] text-obsidian dark:text-ivory leading-none">
      XERAM
    </span>

    <!-- Tagline -->
    <span class="logo-tag text-[7px] tracking-[0.4em] uppercase text-ash dark:text-smoke font-light mt-1.5">
      Maison de Parfum
    </span>
  </RouterLink>
</template>

<style scoped>
.xeram-logo {
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  position: relative;
}

.logo-word {
  font-weight: 400;
  transition: letter-spacing 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
}
.xeram-logo:hover .logo-word { letter-spacing: 0.4em; color: #c9a84c; }
.dark .xeram-logo:hover .logo-word { color: #c9a84c; }

.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-gold { color: #c9a84c; }
.text-ash { color: #888888; }
.text-smoke { color: #888888; }
.bg-gold\/60 { background-color: rgba(201,168,76,0.6); }
</style>
