<script setup lang="ts">
import { ref } from 'vue'

const faqs = ref([
  {
    label: 'What makes Xeram fragrances unique?',
    content:
      'Xeram sources only the finest raw materials — aged ouds from Assam, Grasse rose absolutes, and rare Madagascan vanilla. Every fragrance is blended by hand in small batches to ensure unparalleled quality and longevity.',
  },
  {
    label: 'How long do Xeram perfumes last on skin?',
    content:
      'Our Originals are crafted with a concentration of 20-30% pure fragrance oil, delivering exceptional longevity of 8-12 hours. Xeram Impressions perform at 15-20% concentration for a 6-8 hour projection.',
  },
  {
    label: 'Which bottle size should I choose?',
    content:
      'If you\'re exploring a new scent, we recommend starting with our 50ml. For a signature fragrance you wear daily, the 100ml or 150ml offers the best value. Our 200ml is the collector\'s choice.',
  },
  {
    label: 'How do I order via WhatsApp?',
    content:
      'Simply add your desired items to cart and proceed to checkout — you\'ll be redirected to WhatsApp with your full order details pre-filled. Our team will confirm and process your order within the hour.',
  },
  {
    label: 'Do you offer nationwide delivery?',
    content:
      'Yes. We partner with FedEx for all deliveries, covering every region of the country. Standard delivery takes 3-5 business days. All orders are fully tracked from the moment they leave our hands.',
  },
  {
    label: 'What is your return and exchange policy?',
    content:
      'We stand behind every bottle we sell. If you\'re unsatisfied for any reason, contact us within 7 days of delivery and we\'ll arrange an exchange or store credit. Your satisfaction is our measure of success.',
  },
])

const openIndex = ref<number | null>(null)

const toggle = (i: number) => {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section class="faq-section w-full py-24 px-6 bg-ivory dark:bg-obsidian">

    <!-- Header -->
    <div class="reveal-on-scroll text-center mb-16">
      <p class="text-[10px] tracking-[0.5em] uppercase text-gold font-light mb-4">Questions & Answers</p>
      <h2 class="font-display text-4xl md:text-5xl font-light text-obsidian dark:text-ivory mb-6 tracking-wide">
        Frequently Asked
      </h2>
      <div class="gold-divider mx-auto" />
    </div>

    <!-- FAQ Accordion -->
    <div class="reveal-on-scroll max-w-3xl mx-auto">
      <div
        v-for="(faq, i) in faqs"
        :key="i"
        class="faq-item border-b border-gold/15 last:border-b-0"
      >
        <!-- Question row -->
        <button
          class="faq-question group w-full flex items-center justify-between py-7 text-left"
          @click="toggle(i)"
        >
          <span
            class="font-display text-xl font-light text-obsidian dark:text-ivory group-hover:text-gold transition-colors duration-300 pr-8"
            :class="openIndex === i ? 'text-gold' : ''"
          >
            {{ faq.label }}
          </span>
          <span
            class="faq-icon flex-shrink-0 w-8 h-8 border border-gold/30 flex items-center justify-center text-gold transition-all duration-300"
            :class="openIndex === i ? 'rotate-45 bg-gold/10' : ''"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" stroke-width="1" />
              <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" stroke-width="1" />
            </svg>
          </span>
        </button>

        <!-- Answer panel -->
        <div
          class="faq-answer overflow-hidden transition-all duration-500 ease-in-out"
          :style="{ maxHeight: openIndex === i ? '300px' : '0' }"
        >
          <p class="pb-8 pr-14 text-sm font-light text-ash dark:text-smoke leading-loose">
            {{ faq.content }}
          </p>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.faq-section { }

.faq-icon {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
}

.text-gold { color: #c9a84c; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }
.text-smoke { color: #bbbbbb; }
.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.border-gold { border-color: rgba(201,168,76,0.15); }

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}

.faq-question { background: none; border: none; cursor: pointer; }
</style>
