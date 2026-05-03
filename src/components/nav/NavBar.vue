<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { onClickOutside, useColorMode } from '@vueuse/core'
import type { MenuItems } from '@/types/types'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/ProductStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const mode = useColorMode()
const productStore = useProductStore()
const { cartItemsCount } = storeToRefs(productStore)

const announceMessages = [
  'Complimentary shipping on orders over GHS 500',
  'New: Maison Xeram Discovery Set — five worlds of scent',
  'Made by hand in Accra. Delivered nationwide via FedEx.',
]
const announceIndex = ref(0)

const scrolled = ref(false)
const onScroll = () => {
  scrolled.value = window.scrollY > 60
}

let announceInterval: number | undefined
onMounted(() => {
  window.addEventListener('scroll', onScroll)
  announceInterval = window.setInterval(() => {
    announceIndex.value = (announceIndex.value + 1) % announceMessages.length
  }, 5000)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (announceInterval) clearInterval(announceInterval)
})

const menuItems = ref<NavigationMenuItem[]>([
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Reviews', to: '/reviews' },
])

const mobileMenuItems = ref<MenuItems[]>([
  { label: 'Home', route: { name: 'home' } },
  { label: 'Shop', route: { name: 'shop' } },
  { label: 'About', route: { name: 'about' } },
  { label: 'Contact', route: { name: 'contact' } },
  { label: 'Reviews', route: { name: 'reviews' } },
])

const mobileMenuOpen = ref<boolean>(false)
const activeLink = ref<string | null>('home')
const setActiveLink = () => {
  activeLink.value = (router.currentRoute.value.name as string) ?? 'home'
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const mobileNav = useTemplateRef<HTMLElement>('mobileNav')

onClickOutside(mobileNav, (event) => {
  if (window.innerWidth <= 768 && mobileMenuOpen.value) {
    const clickedInsideMobileNav =
      mobileNav.value &&
      mobileNav.value instanceof HTMLElement &&
      mobileNav.value.contains(event.target as Node)
    if (!clickedInsideMobileNav) {
      mobileMenuOpen.value = false
    }
  }
})

const displayCartItemCount = computed(() => {
  return cartItemsCount.value > 99 ? '99+' : cartItemsCount.value.toString()
})

watch(
  () => router.currentRoute.value.name,
  () => {
    setActiveLink()
    mobileMenuOpen.value = false
  },
  { immediate: true },
)

onMounted(() => {
  setActiveLink()
})
</script>

<template>
  <header class="navbar-luxury sticky top-0 z-50 w-full" :class="scrolled ? 'scrolled' : ''">

    <!-- Announcement bar -->
    <div class="announce-bar w-full overflow-hidden bg-obsidian text-ivory" v-show="!scrolled">
      <div class="relative h-7 flex items-center justify-center px-6">
        <transition name="announce" mode="out-in">
          <p :key="announceIndex" class="text-[9px] tracking-[0.4em] uppercase font-light text-ivory/80">
            <span class="text-gold mr-2">✦</span>
            {{ announceMessages[announceIndex] }}
            <span class="text-gold ml-2">✦</span>
          </p>
        </transition>
      </div>
    </div>

    <!-- Main nav -->
    <nav class="flex w-full items-center justify-between px-6 py-5 md:py-6 relative">

      <!-- Mobile Nav -->
      <MobileNav
        ref="mobileNav"
        :mobile-menu-open="mobileMenuOpen"
        :menu-items="mobileMenuItems"
        :active-link="activeLink as string"
        :set-active-link="setActiveLink"
        @toggleMobileMenu="toggleMobileMenu"
      />

      <!-- Desktop: Left nav links -->
      <section class="hidden flex-1 md:flex">
        <nav class="flex items-center gap-10">
          <RouterLink
            v-for="item in menuItems.slice(0, 3)"
            :key="item.label as string"
            :to="(item.to as string)"
            class="nav-link-luxury text-[10px] tracking-[0.3em] uppercase font-light"
            :class="activeLink === (item.label as string).toLowerCase() ? 'active' : ''"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </section>

      <!-- Center: Logo -->
      <section class="flex items-center justify-center flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
        <LogoComponent />
      </section>

      <!-- Right: Cart + dark mode -->
      <section class="flex flex-1 items-center justify-end gap-3 md:gap-7">
        <!-- Desktop right links -->
        <nav class="hidden items-center gap-10 md:flex">
          <RouterLink
            v-for="item in menuItems.slice(3)"
            :key="item.label as string"
            :to="(item.to as string)"
            class="nav-link-luxury text-[10px] tracking-[0.3em] uppercase font-light"
            :class="activeLink === (item.label as string).toLowerCase() ? 'active' : ''"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <!-- Cart Icon -->
        <RouterLink
          to="/cart"
          class="relative p-2 nav-icon-wrapper hover:bg-transparent"
        >
          <UIcon name="i-lucide-shopping-bag" class="size-[18px] nav-icon-luxury transition-colors" />
          <span
            v-if="cartItemsCount > 0"
            class="cart-badge absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full text-[9px] font-medium"
          >
            {{ displayCartItemCount }}
          </span>
        </RouterLink>

        <!-- Dark Mode Toggle -->
        <button
          @click="mode = mode === 'dark' ? 'light' : 'dark'"
          class="nav-icon-wrapper p-2 bg-transparent border-none"
          aria-label="Toggle theme"
        >
          <SunIcon v-if="mode === 'light'" class="size-4 nav-icon-luxury" />
          <MoonIcon v-else class="size-4 nav-icon-luxury" />
        </button>
      </section>
    </nav>

    <!-- Gold bottom border -->
    <div class="gold-divider-full transition-opacity duration-500" :style="{ opacity: scrolled ? 1 : 0 }" />
  </header>
</template>

<style scoped>
.navbar-luxury {
  background: rgba(245, 240, 235, 0.92);
  backdrop-filter: blur(28px) saturate(140%);
  -webkit-backdrop-filter: blur(28px) saturate(140%);
  border-bottom: 1px solid rgba(201, 168, 76, 0);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.dark .navbar-luxury {
  background: rgba(10, 10, 10, 0.92);
}

.navbar-luxury.scrolled {
  border-bottom: 1px solid rgba(201, 168, 76, 0.15);
}

.navbar-luxury.scrolled nav {
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
}

/* Announce bar */
.announce-bar {
  border-bottom: 1px solid rgba(201, 168, 76, 0.15);
  font-family: 'Inter', sans-serif;
}

/* Announce text transitions */
.announce-enter-active,
.announce-leave-active {
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.announce-enter-from { opacity: 0; transform: translateY(8px); }
.announce-leave-to { opacity: 0; transform: translateY(-8px); }
.announce-enter-to,
.announce-leave-from { opacity: 1; transform: translateY(0); }

/* Nav links */
.nav-link-luxury {
  color: #888888;
  position: relative;
  transition: color 0.3s ease;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
}

.nav-link-luxury::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-gold, #c9a84c);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link-luxury:hover,
.nav-link-luxury.active {
  color: #0a0a0a;
}

.dark .nav-link-luxury:hover,
.dark .nav-link-luxury.active {
  color: #f5f0eb;
}

.nav-link-luxury:hover::after,
.nav-link-luxury.active::after {
  transform: scaleX(1);
}

/* Nav icons */
.nav-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  cursor: none;
}
.nav-icon-luxury {
  color: #555555;
  transition: color 0.3s ease;
}
.dark .nav-icon-luxury {
  color: #aaaaaa;
}
.nav-icon-wrapper:hover .nav-icon-luxury,
:deep(.nav-icon-luxury:hover) { color: #c9a84c; }

/* Cart badge */
.cart-badge {
  background: #c9a84c;
  color: #0a0a0a;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.text-gold { color: #c9a84c; }
.text-ivory { color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }

.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
}
</style>
