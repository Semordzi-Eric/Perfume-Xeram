<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import { RouterView } from 'vue-router'

const isLoaded = ref(false)
const cursorDot = ref<HTMLElement | null>(null)
const cursorRing = ref<HTMLElement | null>(null)

const FooterComponentLazy = defineAsyncComponent({
  loader: () => import('@/components/footer/FooterComponent.vue'),
})

let mouseX = 0, mouseY = 0
let dotX = 0, dotY = 0
let ringX = 0, ringY = 0
let raf = 0

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const animateCursor = () => {
  // Dot follows fast, ring lags slightly
  dotX += (mouseX - dotX) * 0.5
  dotY += (mouseY - dotY) * 0.5
  ringX += (mouseX - ringX) * 0.18
  ringY += (mouseY - ringY) * 0.18

  if (cursorDot.value) {
    cursorDot.value.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
  }
  if (cursorRing.value) {
    cursorRing.value.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
  }
  raf = requestAnimationFrame(animateCursor)
}

const onMouseDown = () => {
  cursorRing.value?.classList.add('clicking')
}
const onMouseUp = () => {
  cursorRing.value?.classList.remove('clicking')
}

const onMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target) return
  if (target.closest('a, button, [role="button"], input, textarea, select, .x-hover')) {
    cursorRing.value?.classList.add('hovering')
  } else {
    cursorRing.value?.classList.remove('hovering')
  }
}

const onMouseLeave = () => {
  if (cursorDot.value) cursorDot.value.style.opacity = '0'
  if (cursorRing.value) cursorRing.value.style.opacity = '0'
}
const onMouseEnter = () => {
  if (cursorDot.value) cursorDot.value.style.opacity = '1'
  if (cursorRing.value) cursorRing.value.style.opacity = '1'
}

onMounted(() => {
  isLoaded.value = true
  // Detect touch / coarse pointer — skip cursor wiring entirely on touch
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
  if (isTouch) return

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('mouseover', onMouseOver)
  document.documentElement.addEventListener('mouseleave', onMouseLeave)
  document.documentElement.addEventListener('mouseenter', onMouseEnter)
  raf = requestAnimationFrame(animateCursor)
})

onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('mouseover', onMouseOver)
  document.documentElement.removeEventListener('mouseleave', onMouseLeave)
  document.documentElement.removeEventListener('mouseenter', onMouseEnter)
})
</script>

<template>
  <UApp>
    <!-- Film grain overlay -->
    <div class="grain-overlay" aria-hidden="true" />

    <!-- Custom cursor -->
    <div ref="cursorDot" class="x-cursor-dot" aria-hidden="true" />
    <div ref="cursorRing" class="x-cursor-ring" aria-hidden="true" />

    <NavBar />
    <RouterView v-if="isLoaded" v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
    <FooterComponentLazy v-if="isLoaded" />
  </UApp>
</template>

<style scoped></style>
