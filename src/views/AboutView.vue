<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
    { threshold: 0.1 },
  )
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el))
})
</script>

<template>
  <div class="about-page bg-ivory dark:bg-obsidian">
    <IntroSection />
    <CreativitySection />
    <CraftSection />
    <DiscoverSection />
  </div>
</template>

<style scoped>
.about-page {}
.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
</style>
