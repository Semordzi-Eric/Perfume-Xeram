<script setup lang="ts">
import type { MenuItems } from '@/types/types'

const props = defineProps({
  mobileMenuOpen: { type: Boolean, default: false, required: true },
  menuItems: { type: Array as () => MenuItems[], required: true },
  activeLink: { type: String, required: true },
  setActiveLink: { type: Function, required: true },
})

const emit = defineEmits(['toggle-mobile-menu'])

function toggleMobileMenu() {
  emit('toggle-mobile-menu')
}
</script>

<template>
  <MobileToggle :mobile-menu-open="mobileMenuOpen" @toggle-mobile-menu="toggleMobileMenu" />

  <!-- Full-screen luxury overlay -->
  <transition name="luxury-overlay">
    <div
      v-if="mobileMenuOpen"
      class="mobile-overlay fixed inset-0 z-40 md:hidden"
      @click.self="toggleMobileMenu"
    >
      <!-- Atmospheric background -->
      <div class="absolute inset-0 bg-obsidian" />
      <div class="absolute inset-0 opacity-40" style="background: radial-gradient(circle at 30% 20%, rgba(201,168,76,0.15), transparent 60%), radial-gradient(circle at 80% 80%, rgba(201,168,76,0.10), transparent 60%);" />

      <!-- Content -->
      <div class="relative z-10 h-full flex flex-col justify-between pt-28 pb-16 px-10 overflow-y-auto">

        <!-- Top eyebrow -->
        <div class="text-center mb-8">
          <p class="text-[9px] tracking-[0.5em] uppercase text-gold font-light mb-2">Maison Xeram</p>
          <div class="gold-divider mx-auto" />
        </div>

        <!-- Menu items -->
        <nav class="flex-1 flex flex-col items-center justify-center">
          <ul class="flex flex-col items-center gap-7 w-full">
            <li
              v-for="(item, i) in menuItems"
              :key="item.label"
              class="overflow-hidden"
              :style="{ animationDelay: `${0.1 + i * 0.08}s` }"
              @click="setActiveLink()"
            >
              <RouterLink
                :to="item.route"
                class="mobile-link font-editorial text-4xl text-ivory inline-block"
                :class="activeLink === item.route?.name?.toString() ? 'active' : ''"
                @click="toggleMobileMenu"
              >
                <span class="mobile-link-inner block">{{ item.label }}</span>
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Bottom auth + social -->
        <div class="text-center pt-10">
          <div class="gold-divider-full mb-8" />

          <div class="flex flex-col gap-3 mb-10">
            <RouterLink
              to="/login"
              class="block w-full py-4 text-[10px] tracking-[0.4em] uppercase text-ivory border border-gold/30 hover:bg-gold hover:text-obsidian transition-all duration-500"
              @click="toggleMobileMenu"
            >
              Sign In
            </RouterLink>
            <RouterLink
              to="/signup"
              class="block w-full py-4 text-[10px] tracking-[0.4em] uppercase text-obsidian bg-gold border border-gold hover:bg-transparent hover:text-gold transition-all duration-500"
              @click="toggleMobileMenu"
            >
              Create Account
            </RouterLink>
          </div>

          <p class="text-[9px] tracking-[0.4em] uppercase text-ash font-light">
            Crafted in Accra · Worn the world over
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.mobile-overlay {
  background-color: #0a0a0a;
}

.mobile-link {
  position: relative;
  font-weight: 400;
  text-decoration: none;
  padding: 0.25rem 0;
  transition: color 0.4s ease;
}

.mobile-link-inner {
  transform: translateY(110%);
  animation: mobile-link-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: inherit;
}

@keyframes mobile-link-in {
  to { transform: translateY(0); }
}

.mobile-link::before {
  content: '✦';
  position: absolute;
  left: -1.5em;
  top: 50%;
  transform: translateY(-50%) scale(0);
  color: #c9a84c;
  font-size: 0.6em;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-link.active,
.mobile-link:hover {
  color: #c9a84c;
}
.mobile-link.active::before,
.mobile-link:hover::before {
  transform: translateY(-50%) scale(1);
}

.text-gold { color: #c9a84c; }
.text-ivory { color: #f5f0eb; }
.text-obsidian { color: #0a0a0a; }
.text-ash { color: #888888; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-gold { background-color: #c9a84c; }
.border-gold { border-color: rgba(201,168,76,0.3); }

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
}

/* Overlay transitions */
.luxury-overlay-enter-active,
.luxury-overlay-leave-active {
  transition: opacity 0.5s ease;
}
.luxury-overlay-enter-from,
.luxury-overlay-leave-to {
  opacity: 0;
}
</style>
