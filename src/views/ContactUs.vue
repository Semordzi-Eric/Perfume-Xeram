<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@nuxt/ui/composables/useToast'
import { useRevealOnScroll } from '@/composables/useRevealOnScroll'

const toast = useToast()

const formData = ref({
  name: '',
  email: '',
  subject: 'General Enquiry',
  message: '',
})

const subjectOptions = [
  'General Enquiry',
  'Personal Consultation',
  'Bespoke / Bulk Order',
  'Press & Partnerships',
  'Returns & Exchanges',
]

const isLoading = ref(false)

const handleSubmit = async () => {
  try {
    isLoading.value = true
    // POST to Formspree (replace YOUR_FORM_ID with your actual Formspree form ID)
    // Get a free endpoint at https://formspree.io — takes ~2 minutes to set up.
    const response = await fetch(
      import.meta.env.VITE_FORMSPREE_URL ?? 'https://formspree.io/f/YOUR_FORM_ID',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData.value),
      },
    )
    if (!response.ok) throw new Error('Server error')
    toast.add({
      title: 'Message Sent',
      description: 'Thank you. Your letter has been received.',
      icon: 'i-lucide-check-circle',
      color: 'primary',
    })
    formData.value = { name: '', email: '', subject: 'General Enquiry', message: '' }
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.add({
      title: 'Failed to Send',
      description: 'Something went wrong. Please try again.',
      icon: 'i-lucide-alert-circle',
      color: 'error',
    })
  } finally {
    isLoading.value = false
  }
}

useRevealOnScroll()
</script>

<template>
  <section class="contact-page min-h-screen grid grid-cols-1 md:grid-cols-2">

    <!-- LEFT panel -->
    <div class="relative overflow-hidden bg-obsidian min-h-[55vh] md:min-h-screen">
      <img
        src="https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&w=1600&q=85"
        srcset="
          https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&w=800&q=80 800w,
          https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&w=1600&q=85 1600w
        "
        alt="The Xeram atelier — perfume bottles in soft golden light"
        class="absolute inset-0 w-full h-full object-cover opacity-55 transition-transform duration-[8s] ease-out hover:scale-105"
        loading="eager"
        decoding="async"
      />
      <!-- Layered atmospheric overlays -->
      <div class="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian/65 to-obsidian/30" />
      <div class="absolute inset-0 pointer-events-none"
           style="background: radial-gradient(ellipse at 25% 80%, rgba(201,168,76,0.10) 0%, transparent 55%);" />

      <!-- Corners -->
      <div class="absolute top-8 left-8 corner-tl" />
      <div class="absolute bottom-8 right-8 corner-br" />

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-between h-full p-12 md:p-16 min-h-[55vh] md:min-h-screen">
        <div>
          <p class="eyebrow mb-6">Reach Out · MMXXIV</p>
          <h1 class="font-editorial text-5xl md:text-7xl lg:text-8xl text-ivory leading-[0.92] tracking-tight mb-8">
            Let's <span class="italic font-display text-gold-shimmer">connect.</span>
          </h1>
          <div class="gold-divider mb-8" style="margin-left: 0;" />
          <p class="text-base font-light text-ivory/75 max-w-md leading-loose">
            Whether you seek your signature scent, a bespoke order, or simply have a question — we read every letter.
          </p>
        </div>

        <div class="space-y-7 mt-12 max-w-md">
          <div class="gold-divider-full" />

          <div class="grid grid-cols-1 gap-7">
            <div>
              <p class="text-[9px] tracking-[0.4em] uppercase text-gold font-light mb-2">The Atelier</p>
              <p class="font-display italic text-base text-ivory leading-snug">
                123 Independence Avenue<br/>Cantonments · Accra · Ghana
              </p>
            </div>
            <div class="grid grid-cols-2 gap-7">
              <div>
                <p class="text-[9px] tracking-[0.4em] uppercase text-gold font-light mb-2">Write</p>
                <p class="text-sm font-light text-ivory/75">hello@xeramperfumes.com</p>
                <p class="text-sm font-light text-ivory/75 mt-1">+233 (0) 555 123 456</p>
              </div>
              <div>
                <p class="text-[9px] tracking-[0.4em] uppercase text-gold font-light mb-2">Visit</p>
                <p class="text-sm font-light text-ivory/75">Mon–Fri · 09:00 – 18:00</p>
                <p class="text-sm font-light text-ivory/75 mt-1">Sat · 10:00 – 14:00</p>
              </div>
            </div>
          </div>

          <div class="gold-divider-full" />

          <p class="text-[9px] tracking-[0.4em] uppercase text-ash font-light italic">
            ✦ For private consultations, please request an appointment ✦
          </p>
        </div>
      </div>
    </div>

    <!-- RIGHT panel -->
    <div class="flex flex-col justify-center px-8 sm:px-12 md:px-16 py-16 md:py-24 bg-charcoal">
      <div class="max-w-md w-full mx-auto">
        <p class="eyebrow mb-5">Send a Letter</p>
        <h2 class="font-editorial text-4xl md:text-5xl text-ivory mb-6 leading-tight">
          We'd <span class="italic font-display text-gold">love</span> to hear from you.
        </h2>
        <div class="gold-divider mb-12" style="margin-left: 0;" />

        <form @submit.prevent="handleSubmit">
          <fieldset :disabled="isLoading" class="space-y-9 border-none p-0 m-0">
          <!-- Name -->
          <div class="form-field">
            <label class="form-label">Full Name</label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="Your name"
              required
              autocomplete="name"
              class="luxury-input"
            />
          </div>

          <!-- Email -->
          <div class="form-field">
            <label class="form-label">Email Address</label>
            <input
              v-model="formData.email"
              type="email"
              placeholder="your@email.com"
              required
              autocomplete="email"
              class="luxury-input"
            />
          </div>

          <!-- Subject -->
          <div class="form-field">
            <label class="form-label">Subject</label>
            <select v-model="formData.subject" class="luxury-input luxury-select">
              <option v-for="opt in subjectOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>

          <!-- Message -->
          <div class="form-field">
            <label class="form-label">Message</label>
            <textarea
              v-model="formData.message"
              placeholder="Tell us how we can help..."
              required
              rows="4"
              class="luxury-input resize-none"
            />
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="contact-submit-btn w-full py-5 text-[10px] tracking-[0.4em] uppercase font-light"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Send Letter</span>
            <span v-else class="flex items-center justify-center gap-2">
              <span class="loading-dot" /><span class="loading-dot" style="animation-delay: 0.2s" /><span class="loading-dot" style="animation-delay: 0.4s" />
            </span>
          </button>
          </fieldset>
        </form>

        <!-- ═══════════════ Find Us — Editorial Map ═══════════════ -->
        <div class="mt-14">
          <div class="flex items-end justify-between mb-5">
            <div>
              <p class="text-[9px] tracking-[0.5em] uppercase text-gold font-light mb-2">Find Us</p>
              <p class="font-display italic text-base text-ivory/90 leading-snug">The Atelier · Cantonments</p>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=University+of+Ghana"
              target="_blank"
              rel="noopener"
              class="map-cta text-[9px] tracking-[0.4em] uppercase font-light text-gold/80 hover:text-gold flex items-center gap-2 transition-colors"
            >
              <span>Directions</span>
              <span class="text-xs">→</span>
            </a>
          </div>

          <div class="map-frame relative overflow-hidden">
            <!-- Map -->
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15881.725547217631!2d-0.21527881284178213!3d5.6505620000000265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9c7ebaeabe93%3A0xd78257e67498c1a0!2sUniversity%20of%20Ghana!5e0!3m2!1sen!2sgh!4v1744121281177!5m2!1sen!2sgh"
              class="map-iframe w-full border-0"
              style="height: 280px;"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Xeram atelier location — Cantonments, Accra"
            />
            <!-- Vignette + warm gold tint to harmonize the map -->
            <div class="map-overlay absolute inset-0 pointer-events-none" />
            <!-- Editorial pin marker (pulse) -->
            <div class="map-pin pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span class="map-pin-pulse" />
              <span class="map-pin-dot" />
              <span class="map-pin-label">XERAM</span>
            </div>
            <!-- Hairline corners -->
            <span class="map-corner map-corner-tl" />
            <span class="map-corner map-corner-tr" />
            <span class="map-corner map-corner-bl" />
            <span class="map-corner map-corner-br" />
            <!-- Coordinate label -->
            <div class="absolute bottom-3 left-4 z-10 text-[8px] tracking-[0.35em] uppercase text-gold/70 font-light">
              5°39′N · 0°11′W
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-page {}

.bg-obsidian { background-color: #0a0a0a; }
.bg-charcoal { background-color: #1a1a1a; }
.text-gold { color: #c9a84c; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }

.gold-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, #c9a84c, transparent);
}
.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
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

.form-label {
  display: block;
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.75);
  font-weight: 300;
  margin-bottom: 0.6rem;
  font-family: 'Inter', sans-serif;
}

.luxury-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 0;
  padding: 0.85rem 0;
  color: #f5f0eb;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 300;
  letter-spacing: 0.03em;
  outline: none;
  transition: border-color 0.4s ease;
}
.luxury-input:focus {
  border-bottom-color: #c9a84c;
}
.luxury-input::placeholder {
  color: rgba(232, 213, 163, 0.25);
  font-size: 0.75rem;
}
.luxury-select {
  cursor: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23c9a84c' d='M0 0h10L5 6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
  padding-right: 1.5rem;
}
.luxury-select option { background-color: #1a1a1a; color: #f5f0eb; }

.contact-submit-btn {
  background: transparent;
  border: 1px solid rgba(201, 168, 76, 0.4);
  color: #c9a84c;
  cursor: none;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.contact-submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #c9a84c;
  transform: translateX(-101%);
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}
.contact-submit-btn:not(:disabled):hover::before { transform: translateX(0); }
.contact-submit-btn:not(:disabled):hover { color: #0a0a0a; letter-spacing: 0.5em; }
.contact-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }
.contact-submit-btn > * { position: relative; z-index: 1; }

.loading-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #c9a84c;
  animation: dot-pulse 1.2s ease-in-out infinite;
}
@keyframes dot-pulse {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

/* Corners */
.corner-tl { width: 32px; height: 32px; border-top: 1px solid rgba(232,213,163,0.5); border-left: 1px solid rgba(232,213,163,0.5); }
.corner-br { width: 32px; height: 32px; border-bottom: 1px solid rgba(232,213,163,0.5); border-right: 1px solid rgba(232,213,163,0.5); }

/* Fade transitions */
.fade-quick-enter-active, .fade-quick-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.fade-quick-enter-from, .fade-quick-leave-to { opacity: 0; transform: translateY(-4px); }

/* ═══════════════ Editorial Map ═══════════════ */
.map-frame {
  border: 1px solid rgba(201, 168, 76, 0.22);
  background: #0a0a0a;
  transition: border-color 0.6s ease, box-shadow 0.6s ease;
}
.map-frame:hover {
  border-color: rgba(201, 168, 76, 0.5);
  box-shadow: 0 18px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(201, 168, 76, 0.12);
}

.map-iframe {
  filter: grayscale(0.4) contrast(1.05) brightness(0.78) saturate(0.85);
  transition: filter 0.8s ease;
}
.map-frame:hover .map-iframe {
  filter: grayscale(0.15) contrast(1.05) brightness(0.92) saturate(1);
}

.map-overlay {
  background:
    radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.45) 100%),
    linear-gradient(180deg, rgba(10,10,10,0.20), rgba(10,10,10,0.0) 30%, rgba(10,10,10,0.0) 70%, rgba(10,10,10,0.55)),
    radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08), transparent 60%);
  transition: opacity 0.6s ease;
}
.map-frame:hover .map-overlay { opacity: 0.7; }

/* Custom pin marker */
.map-pin {
  z-index: 5;
}
.map-pin-dot {
  position: absolute;
  top: 0; left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #c9a84c;
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 0 2px rgba(10, 10, 10, 0.85),
    0 0 0 3px rgba(201, 168, 76, 0.55),
    0 0 18px rgba(201, 168, 76, 0.6);
}
.map-pin-pulse {
  position: absolute;
  top: 0; left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(201, 168, 76, 0.55);
  transform: translate(-50%, -50%);
  animation: map-pin-ripple 2.4s cubic-bezier(0.16,1,0.3,1) infinite;
}
.map-pin-label {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Italiana', serif;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  color: #e8d5a3;
  text-shadow: 0 1px 6px rgba(0,0,0,0.85);
  white-space: nowrap;
}

@keyframes map-pin-ripple {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
  100% { transform: translate(-50%, -50%) scale(4.5); opacity: 0; }
}

/* Map corners */
.map-corner {
  position: absolute;
  width: 14px;
  height: 14px;
  pointer-events: none;
  z-index: 4;
}
.map-corner-tl { top: 8px; left: 8px; border-top: 1px solid rgba(232,213,163,0.6); border-left: 1px solid rgba(232,213,163,0.6); }
.map-corner-tr { top: 8px; right: 8px; border-top: 1px solid rgba(232,213,163,0.6); border-right: 1px solid rgba(232,213,163,0.6); }
.map-corner-bl { bottom: 8px; left: 8px; border-bottom: 1px solid rgba(232,213,163,0.6); border-left: 1px solid rgba(232,213,163,0.6); }
.map-corner-br { bottom: 8px; right: 8px; border-bottom: 1px solid rgba(232,213,163,0.6); border-right: 1px solid rgba(232,213,163,0.6); }

.map-cta:hover { letter-spacing: 0.5em; }
.map-cta { transition: color 0.3s ease, letter-spacing 0.5s cubic-bezier(0.16,1,0.3,1); }
</style>
