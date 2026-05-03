<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const reviews = ref([
  {
    rating: 5,
    title: 'A scent that arrives before you do.',
    body: 'I bought Club De Nuit on impulse. Three months later it is the only fragrance I reach for after sundown. People stop me in lifts. They never used to.',
    author: 'Adwoa M.',
    role: 'Architect',
    location: 'East Legon · Accra',
    fragrance: 'Club De Nuit · 100ml',
    date: 'November 2025',
  },
  {
    rating: 5,
    title: 'Worth every cedi, and then some.',
    body: 'I wore Tom Ford for years. I bought Black Orchid impression as an experiment. My wife didn\'t notice the switch. My wallet did. Xeram is not playing.',
    author: 'Kwesi A.',
    role: 'Surgeon',
    location: 'Cantonments · Accra',
    fragrance: 'Black Orchid · 100ml',
    date: 'October 2025',
  },
  {
    rating: 5,
    title: 'The packaging alone is a love letter.',
    body: 'I gifted Oud De Arabia to my mother for her sixtieth. The box, the paper, the seal — she didn\'t even open it for two days. She just kept looking at it.',
    author: 'Esi B.',
    role: 'Lawyer',
    location: 'Tema',
    fragrance: 'Oud De Arabia · 50ml',
    date: 'October 2025',
  },
  {
    rating: 5,
    title: 'It lasts. Genuinely.',
    body: 'I sprayed Asad at 7am. Came home at 11pm. Still there, on the collar of my shirt. I have never had that with anything I bought from a duty-free.',
    author: 'Samuel O.',
    role: 'Pilot',
    location: 'Airport City · Accra',
    fragrance: 'Asad · 150ml',
    date: 'September 2025',
  },
  {
    rating: 5,
    title: 'My signature for the year.',
    body: 'Restraint and warmth in one bottle. Allure Homme has become my Tuesday-through-Sunday. The Mondays I let her wear it. Sue me.',
    author: 'Nana K.',
    role: 'Brand Director',
    location: 'Airport Hills',
    fragrance: 'Allure Homme · 100ml',
    date: 'September 2025',
  },
  {
    rating: 5,
    title: 'Black Orchid impression — uncanny.',
    body: 'I have the original sitting on my shelf for comparison. Eyes closed, twenty minutes in: I cannot tell them apart. Saved me a small fortune.',
    author: 'Maame Y.',
    role: 'Investor',
    location: 'Roman Ridge',
    fragrance: 'Black Orchid · 50ml',
    date: 'August 2025',
  },
])

const pressMentions = ref([
  { outlet: 'GH Magazine', headline: 'A new house of fragrance, made on home soil.', date: 'Spring 2025' },
  { outlet: 'The Continental', headline: 'Xeram\'s Originals are the most interesting West African scent project we\'ve smelled this year.', date: 'June 2025' },
  { outlet: 'Studio West', headline: '"Slow-made, hand-blended, and quietly excellent."', date: 'July 2025' },
  { outlet: 'Aṣẹ Quarterly', headline: 'On the perfumers writing a new African olfactive vocabulary.', date: 'October 2025' },
])

const totalReviews = computed(() => reviews.value.length)
const avgRating = computed(() => {
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const ratingBreakdown = computed(() => {
  const counts = [0, 0, 0, 0, 0]
  reviews.value.forEach((r) => { counts[r.rating - 1]++ })
  return [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: counts[stars - 1],
    pct: (counts[stars - 1] / reviews.value.length) * 100,
  }))
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
    { threshold: 0.1 },
  )
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el))
})
</script>

<template>
  <div class="reviews-page bg-ivory dark:bg-obsidian min-h-screen">

    <!-- ═══════════════ HERO ═══════════════ -->
    <section class="reveal-on-scroll relative w-full overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at top, rgba(201,168,76,0.07) 0%, transparent 55%);" />

      <div class="relative max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-36 text-center">
        <p class="eyebrow mb-5">Said in Confidence</p>
        <h1 class="font-editorial text-6xl md:text-8xl lg:text-9xl font-light text-obsidian dark:text-ivory leading-[0.9] tracking-tight mb-8">
          What our <span class="italic font-display text-gold-shimmer">people</span><br/>tell us.
        </h1>
        <div class="gold-divider mb-8" />
        <p class="text-sm font-light text-ash max-w-xl mx-auto leading-loose">
          Every review here is from a verified buyer. We don't pay for endorsements. We let the bottles speak — and then we listen.
        </p>
      </div>
    </section>

    <!-- ═══════════════ RATING SUMMARY ═══════════════ -->
    <section class="reveal-on-scroll w-full bg-obsidian py-20 md:py-28 px-6">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <!-- Left: big number -->
        <div class="text-center md:text-left">
          <p class="eyebrow mb-3">Overall Verdict</p>
          <div class="flex items-baseline gap-4 justify-center md:justify-start mb-3">
            <span class="numeral text-9xl md:text-[10rem] text-gold-shimmer leading-none">
              {{ avgRating }}
            </span>
            <span class="text-2xl text-ash font-light"> / 5</span>
          </div>
          <div class="flex justify-center md:justify-start gap-1 mb-3">
            <svg v-for="i in 5" :key="i" width="14" height="14" viewBox="0 0 24 24" fill="#c9a84c">
              <path d="M12 .587l3.668 7.568L24 9.748l-6 5.85L19.336 24 12 20.018 4.664 24 6 15.598 0 9.748l8.332-1.593z" />
            </svg>
          </div>
          <p class="text-xs tracking-widest uppercase text-ash font-light">Based on {{ totalReviews }} verified reviews</p>
        </div>

        <!-- Right: breakdown bars -->
        <div class="space-y-3">
          <div v-for="r in ratingBreakdown" :key="r.stars" class="flex items-center gap-4">
            <span class="text-[10px] tracking-widest text-ash font-light w-10">{{ r.stars }} ★</span>
            <div class="flex-1 h-px bg-gold/15 relative overflow-hidden">
              <div
                class="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                :style="{ width: r.pct + '%' }"
              />
            </div>
            <span class="text-[10px] text-ash font-light w-8 text-right">{{ r.count }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════ EDITORIAL TESTIMONIALS ═══════════════ -->
    <section class="reveal-on-scroll w-full py-24 md:py-32 px-6 bg-ivory dark:bg-obsidian">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <p class="eyebrow mb-4">Letters Received</p>
          <h2 class="font-editorial text-4xl md:text-6xl text-obsidian dark:text-ivory tracking-tight">
            Six voices, <span class="italic font-display text-gold">one house.</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/10">
          <article
            v-for="(review, i) in reviews"
            :key="i"
            class="review-card bg-ivory dark:bg-obsidian p-10 md:p-14 transition-colors duration-500 hover:bg-cream dark:hover:bg-charcoal"
            :class="i % 4 === 0 || i % 4 === 3 ? 'md:bg-cream md:dark:bg-charcoal' : ''"
          >
            <!-- Decorative numeral -->
            <div class="flex items-start justify-between mb-6">
              <span class="numeral text-5xl text-gold/40">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="flex gap-1">
                <svg v-for="s in review.rating" :key="s" width="11" height="11" viewBox="0 0 24 24" fill="#c9a84c">
                  <path d="M12 .587l3.668 7.568L24 9.748l-6 5.85L19.336 24 12 20.018 4.664 24 6 15.598 0 9.748l8.332-1.593z" />
                </svg>
              </div>
            </div>

            <!-- Title -->
            <h3 class="font-editorial text-2xl md:text-3xl text-obsidian dark:text-ivory mb-5 leading-snug">
              {{ review.title }}
            </h3>

            <div class="gold-divider mb-6" style="margin-left: 0;" />

            <!-- Body -->
            <p class="font-display italic text-base md:text-lg text-ash dark:text-smoke leading-relaxed mb-8">
              "{{ review.body }}"
            </p>

            <!-- Footer -->
            <div class="border-t border-gold/15 pt-5 flex items-end justify-between flex-wrap gap-3">
              <div>
                <p class="font-editorial text-base text-obsidian dark:text-ivory">{{ review.author }}</p>
                <p class="text-[10px] tracking-[0.3em] uppercase text-gold/80 font-light mt-1">
                  {{ review.role }} — {{ review.location }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-[10px] tracking-[0.2em] uppercase text-ash font-light">{{ review.fragrance }}</p>
                <p class="text-[9px] tracking-[0.3em] uppercase text-ash/60 font-light italic mt-0.5">{{ review.date }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══════════════ PRESS ═══════════════ -->
    <section class="reveal-on-scroll w-full bg-obsidian py-24 md:py-32 px-6 border-t border-gold/10">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <p class="eyebrow mb-4">In Print</p>
          <h2 class="font-editorial text-4xl md:text-5xl text-ivory tracking-tight mb-6">
            What others have <span class="italic font-display text-gold">written</span> about us.
          </h2>
          <div class="gold-divider" />
        </div>

        <div class="space-y-px bg-gold/15">
          <article
            v-for="(p, i) in pressMentions"
            :key="i"
            class="press-row bg-obsidian px-8 md:px-12 py-10 grid md:grid-cols-12 gap-6 items-center hover:bg-charcoal transition-colors duration-500"
          >
            <div class="md:col-span-3 flex items-center gap-4">
              <span class="numeral text-3xl text-gold/50">{{ String(i + 1).padStart(2, '0') }}</span>
              <p class="font-editorial text-2xl text-ivory tracking-tight">{{ p.outlet }}</p>
            </div>
            <div class="md:col-span-7">
              <p class="font-display italic text-lg md:text-xl text-ash dark:text-smoke leading-snug">
                "{{ p.headline }}"
              </p>
            </div>
            <div class="md:col-span-2 md:text-right">
              <p class="text-[10px] tracking-[0.3em] uppercase text-gold/80 font-light">{{ p.date }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══════════════ CTA ═══════════════ -->
    <section class="reveal-on-scroll w-full bg-cream dark:bg-charcoal py-24 px-6 text-center">
      <p class="eyebrow mb-5">The Next One</p>
      <h2 class="font-editorial text-4xl md:text-6xl text-obsidian dark:text-ivory mb-6 leading-tight">
        Could be <span class="italic font-display text-gold">yours.</span>
      </h2>
      <div class="gold-divider mb-8" />
      <p class="text-sm font-light text-ash max-w-md mx-auto leading-loose mb-10">
        We read every letter. The shelf is open — find the one that becomes a story you'll want to tell.
      </p>
      <RouterLink to="/shop/all-products" class="luxury-btn">
        Visit the Atelier
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.reviews-page {}

.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-cream { background-color: #f0ebe4; }
.bg-charcoal { background-color: #1a1a1a; }
.text-gold { color: #c9a84c; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }
.text-smoke { color: #bbbbbb; }

.gold-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
  margin: 0 auto;
}

.from-gold-dark { --tw-gradient-from: #a07830 var(--tw-gradient-from-position); }
.via-gold { --tw-gradient-via: #c9a84c var(--tw-gradient-via-position); }
.to-gold-light { --tw-gradient-to: #e8d5a3 var(--tw-gradient-to-position); }

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
  line-height: 1;
  letter-spacing: -0.04em;
}

.text-gold-shimmer {
  background: linear-gradient(135deg, #c9a84c 0%, #e8d5a3 40%, #a07830 80%, #c9a84c 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer-anim 4s linear infinite;
}
@keyframes shimmer-anim {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.review-card {
  position: relative;
}
</style>
