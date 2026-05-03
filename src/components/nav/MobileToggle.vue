<script setup lang="ts">
const props = defineProps({
  mobileMenuOpen: { type: Boolean, default: false, required: true },
})

const emit = defineEmits(['toggle-mobile-menu'])

function toggleMobileMenu() {
  emit('toggle-mobile-menu')
}
</script>

<template>
  <button
    @click="toggleMobileMenu"
    class="hamburger md:hidden flex flex-col items-center justify-center gap-1.5 p-2 ml-1 z-50 relative"
    :class="props.mobileMenuOpen ? 'is-open' : ''"
    :aria-label="props.mobileMenuOpen ? 'Close menu' : 'Open menu'"
    :aria-expanded="props.mobileMenuOpen"
  >
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  </button>
</template>

<style scoped>
.hamburger {
  background: transparent;
  border: none;
  cursor: none;
  width: 36px;
  height: 36px;
}

.hamburger-line {
  display: block;
  height: 1px;
  width: 22px;
  background: #555;
  transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
}

.dark .hamburger-line { background: #ccc; }

.is-open .hamburger-line {
  background: #c9a84c;
}

/* Animated state */
.is-open .hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.is-open .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.is-open .hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Hover */
.hamburger:hover .hamburger-line {
  background: #c9a84c;
}
</style>
