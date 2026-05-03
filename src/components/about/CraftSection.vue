<script setup lang="ts">
const stages = [
  {
    n: '01',
    title: 'The Brief',
    body: 'Every fragrance begins as a sentence — sometimes a single word. The perfumer interrogates it for a week before lifting a pipette.',
  },
  {
    n: '02',
    title: 'The Materials',
    body: 'We commission ingredients from around the world. Aged ouds from Assam. Bergamot from Calabria. Frankincense from Oman. No compromise.',
  },
  {
    n: '03',
    title: 'The Composition',
    body: 'Trial blends in glass beakers. Tested on skin and on paper. Let to rest twenty days. Then revised. Then rested again.',
  },
  {
    n: '04',
    title: 'The Maceration',
    body: 'The accepted formula is married to alcohol and aged in dark tanks for three to six weeks. Time is the cheapest ingredient — and the most overlooked.',
  },
  {
    n: '05',
    title: 'The Bottling',
    body: 'Filled by hand, sealed by hand, signed by hand. Every batch numbered. Every customer reachable to the perfumer who blended their bottle.',
  },
]
</script>

<template>
  <section class="reveal-on-scroll w-full bg-ivory dark:bg-obsidian py-24 md:py-36 px-6 overflow-hidden">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-20">
        <p class="eyebrow mb-5">The Process · 03</p>
        <h2 class="font-editorial text-4xl md:text-6xl text-obsidian dark:text-ivory tracking-tight mb-6 leading-tight">
          From idea <span class="italic font-display text-gold">to bottle.</span><br/>
          Five stages. No shortcut.
        </h2>
        <div class="gold-divider" />
      </div>

      <!-- Stages — editorial accordion timeline -->
      <div class="max-w-5xl mx-auto">
        <div
          v-for="(stage, i) in stages"
          :key="stage.n"
          class="stage-row group grid md:grid-cols-12 gap-6 md:gap-12 py-12 border-t border-gold/15 last:border-b last:border-gold/15 items-baseline transition-all duration-700"
        >
          <!-- Numeral -->
          <div class="md:col-span-2">
            <span class="numeral block text-7xl md:text-8xl text-gold/40 group-hover:text-gold/80 transition-colors duration-700 leading-none">
              {{ stage.n }}
            </span>
          </div>
          <!-- Title -->
          <div class="md:col-span-4">
            <h3 class="font-editorial text-3xl md:text-4xl text-obsidian dark:text-ivory leading-tight transition-transform duration-700 group-hover:translate-x-2">
              {{ stage.title }}
            </h3>
          </div>
          <!-- Body -->
          <div class="md:col-span-6">
            <p class="text-base font-light text-ash dark:text-smoke leading-loose">
              {{ stage.body }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
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

.eyebrow {
  display: inline-block;
  font-size: 0.625rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #c9a84c;
  font-weight: 300;
}

.numeral {
  font-family: 'Italiana', serif;
  font-weight: 400;
  letter-spacing: -0.04em;
}

.stage-row:hover {
  background: linear-gradient(90deg, rgba(201,168,76,0.04), transparent);
}
</style>
