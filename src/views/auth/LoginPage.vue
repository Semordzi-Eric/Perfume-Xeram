<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = ref({
  email: '',
  password: '',
  rememberMe: false,
})
const isLoading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const handleLogin = async (e: Event) => {
  e.preventDefault()
  isLoading.value = true
  errorMessage.value = ''
  try {
    await new Promise((resolve) => setTimeout(resolve, 1600))
    // In a real app, verify credentials. For now, just navigate home.
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
    errorMessage.value = 'Unable to sign in. Please check your details and try again.'
  } finally {
    isLoading.value = false
  }
}

const cursorPos = ref({ x: 0, y: 0 })
const onCursorMove = (e: MouseEvent) => {
  cursorPos.value = { x: e.clientX, y: e.clientY }
}

const interactiveBgStyle = computed(() => {
  const offsetX = typeof globalThis !== 'undefined' ? globalThis.innerWidth / 2 : 0
  return {
    background: `radial-gradient(circle 380px at ${cursorPos.value.x - offsetX}px ${cursorPos.value.y}px, rgba(201,168,76,0.18), transparent 65%)`
  }
})

onMounted(() => {
  window.addEventListener('mousemove', onCursorMove)
})
</script>

<template>
  <section class="auth-page min-h-screen grid grid-cols-1 lg:grid-cols-2">

    <!-- LEFT — Atmospheric image panel -->
    <div class="hidden lg:flex relative overflow-hidden bg-obsidian">
      <img
        src="/hero.png"
        alt="Xeram"
        class="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[8s] hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian/60 to-obsidian/20" />
      <div
        class="absolute inset-0 pointer-events-none"
        :style="interactiveBgStyle"
      />

      <!-- Corner ornaments -->
      <div class="absolute top-10 left-10 corner-tl" />
      <div class="absolute bottom-10 right-10 corner-br" />

      <!-- Vertical text -->
      <div class="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
        <span class="vertical-text text-[9px] tracking-[0.5em] uppercase text-gold/70 font-light">
          Maison Xeram · MMXXIV
        </span>
        <div class="w-px h-24 bg-gradient-to-b from-gold/60 to-transparent" />
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-end p-16 w-full">
        <p class="eyebrow mb-5">Sign In</p>
        <h2 class="font-editorial text-5xl xl:text-7xl text-ivory leading-[0.92] tracking-tight mb-6">
          Welcome <span class="italic font-display text-gold-shimmer">back.</span>
        </h2>
        <div class="gold-divider mb-6" style="margin-left: 0;" />
        <p class="font-display italic text-base xl:text-lg text-ivory/75 leading-snug max-w-md">
          The atelier remembers you. Pick up where you left — your selections, your past orders, all waiting.
        </p>
      </div>
    </div>

    <!-- RIGHT — Form -->
    <div class="flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-16 lg:py-24 bg-ivory dark:bg-obsidian relative overflow-hidden">

      <!-- Mobile-only top decoration -->
      <div class="lg:hidden text-center mb-12 pt-4">
        <p class="eyebrow mb-3">Sign In</p>
        <h2 class="font-editorial text-4xl text-obsidian dark:text-ivory mb-3">
          Welcome <span class="italic font-display text-gold">back.</span>
        </h2>
        <div class="gold-divider mt-3" />
      </div>

      <!-- Background numeral (decorative) -->
      <span class="absolute top-1/2 -right-20 -translate-y-1/2 numeral text-[24rem] text-gold/[0.04] dark:text-gold/[0.06] pointer-events-none select-none leading-none">
        ✦
      </span>

      <div class="relative z-10 w-full max-w-md mx-auto">

        <!-- Desktop heading -->
        <div class="hidden lg:block mb-12">
          <p class="eyebrow mb-4">The Maison</p>
          <h1 class="font-editorial text-4xl text-obsidian dark:text-ivory mb-3 leading-tight">
            Sign in to your account
          </h1>
          <div class="gold-divider" style="margin-left: 0;" />
        </div>

        <form @submit="handleLogin" class="space-y-9">

          <!-- Email -->
          <div class="form-field">
            <label class="form-label">Email Address</label>
            <input
              v-model="state.email"
              type="email"
              placeholder="your@email.com"
              required
              autocomplete="email"
              class="auth-input"
            />
          </div>

          <!-- Password -->
          <div class="form-field">
            <label class="form-label flex items-center justify-between">
              <span>Password</span>
              <a href="#" class="text-[9px] tracking-[0.3em] uppercase text-gold/80 font-light hover:text-gold transition-colors duration-300 italic font-display normal-case">
                Forgot?
              </a>
            </label>
            <div class="relative">
              <input
                v-model="state.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                required
                autocomplete="current-password"
                class="auth-input pr-10"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-0 bottom-3 text-[9px] tracking-[0.25em] uppercase text-ash hover:text-gold transition-colors"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <!-- Remember -->
          <label class="flex items-center gap-3 cursor-none">
            <span class="custom-check" :class="state.rememberMe ? 'is-checked' : ''">
              <span class="check-mark">✓</span>
              <input v-model="state.rememberMe" type="checkbox" class="sr-only" />
            </span>
            <span class="text-[10px] tracking-[0.3em] uppercase text-ash font-light">Remember me</span>
          </label>

          <!-- Error -->
          <transition name="fade-quick">
            <div v-if="errorMessage" class="text-[10px] tracking-[0.2em] text-red-400/80 font-light">
              {{ errorMessage }}
            </div>
          </transition>

          <!-- Submit -->
          <button
            type="submit"
            class="auth-submit w-full py-5 text-[10px] tracking-[0.4em] uppercase font-light"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Enter the Maison</span>
            <span v-else class="flex items-center justify-center gap-2">
              <span class="loading-dot" /><span class="loading-dot" style="animation-delay: 0.2s" /><span class="loading-dot" style="animation-delay: 0.4s" />
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="my-12 flex items-center gap-4">
          <span class="flex-1 h-px bg-gold/20" />
          <span class="text-[9px] tracking-[0.3em] uppercase text-ash font-light italic">or</span>
          <span class="flex-1 h-px bg-gold/20" />
        </div>

        <!-- Social -->
        <button class="social-btn w-full py-4 flex items-center justify-center gap-3 text-[10px] tracking-[0.4em] uppercase font-light">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="currentColor"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="currentColor"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="currentColor"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="currentColor"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <!-- Sign up CTA -->
        <p class="text-center mt-12 text-[10px] tracking-[0.3em] uppercase text-ash font-light">
          New to the Maison?
          <router-link :to="{ name: 'signup' }" class="ml-2 text-gold hover-line">Create Account</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.auth-page {}

.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.text-gold { color: #c9a84c; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }

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
  letter-spacing: -0.04em;
}

.gold-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, #c9a84c, transparent);
  margin: 0 auto;
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
.corner-br { width: 32px; height: 32px; border-bottom: 1px solid rgba(232,213,163,0.5); border-right: 1px solid rgba(232,213,163,0.5); }

/* Form */
.form-label {
  display: block;
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.85);
  font-weight: 300;
  margin-bottom: 0.65rem;
  font-family: 'Inter', sans-serif;
}

.auth-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(201, 168, 76, 0.25);
  border-radius: 0;
  padding: 0.85rem 0;
  color: #0a0a0a;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  letter-spacing: 0.02em;
  outline: none;
  transition: border-color 0.4s ease;
}
.dark .auth-input { color: #f5f0eb; }
.auth-input:focus { border-bottom-color: #c9a84c; }
.auth-input::placeholder {
  color: rgba(136, 136, 136, 0.5);
  font-size: 0.85rem;
  letter-spacing: 0;
}
.dark .auth-input::placeholder { color: rgba(232, 213, 163, 0.3); }

/* Custom checkbox */
.custom-check {
  width: 16px;
  height: 16px;
  border: 1px solid rgba(201, 168, 76, 0.4);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  cursor: none;
}
.custom-check.is-checked {
  background: #c9a84c;
  border-color: #c9a84c;
}
.check-mark {
  font-size: 9px;
  color: #0a0a0a;
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.is-checked .check-mark { opacity: 1; transform: scale(1); }

/* Submit */
.auth-submit {
  background: #0a0a0a;
  color: #f5f0eb;
  border: 1px solid #0a0a0a;
  cursor: none;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.dark .auth-submit { background: #f5f0eb; color: #0a0a0a; border-color: #f5f0eb; }
.auth-submit::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #c9a84c;
  transform: translateX(-101%);
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}
.auth-submit:not(:disabled):hover::before { transform: translateX(0); }
.auth-submit:not(:disabled):hover { color: #0a0a0a; border-color: #c9a84c; letter-spacing: 0.5em; }
.auth-submit:disabled { opacity: 0.55; cursor: not-allowed; }
.auth-submit > * { position: relative; z-index: 1; }

/* Social button */
.social-btn {
  background: transparent;
  border: 1px solid rgba(201, 168, 76, 0.3);
  color: #888;
  cursor: none;
  font-family: 'Inter', sans-serif;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.social-btn:hover {
  border-color: #c9a84c;
  color: #c9a84c;
  letter-spacing: 0.5em;
}

/* Loading dots */
.loading-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  animation: dot-pulse 1.2s ease-in-out infinite;
}
@keyframes dot-pulse {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

/* Hover line */
.hover-line {
  position: relative;
  display: inline-block;
  text-decoration: none;
}
.hover-line::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background: #c9a84c;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-line:hover::after { transform: scaleX(1); }

/* Fade-quick */
.fade-quick-enter-active, .fade-quick-leave-active { transition: opacity 0.35s ease; }
.fade-quick-enter-from, .fade-quick-leave-to { opacity: 0; }

/* Sr-only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
