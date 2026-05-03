<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import type { Product } from '@/types/types'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

// const id = ref<number>(1)

// const formatCurrency = (value: number) => {
//   return new Intl.NumberFormat('en-GH', {
//     style: 'currency',
//     currency: 'GHS',
//     minimumFractionDigits: 2,
//   }).format(value)
// }

const productStore = useProductStore()

const { products } = storeToRefs(productStore)

// const products = ref<Product[]>([
//   {
//     id: id.value++,
//     name: 'Club De Nuit',
//     price: 39.99,
//     image: '/img/perf.png',
//     category: 'Xeram Originals',
//   },
//   {
//     id: id.value++,
//     name: 'Oud De Arabia',
//     price: 39.99,
//     image: '/img/perf2.png',
//     category: 'Xeram Impressions',
//   },
//   {
//     id: id.value++,
//     name: 'Asad',
//     price: 39.99,
//     image: '/img/perf3.png',
//     category: 'Xeram Originals',
//   },
//   {
//     id: id.value++,
//     name: 'Allure Homme',
//     price: 39.99,
//     image: '/img/perf4.png',
//     category: 'Xeram Impressions',
//   },
//   {
//     id: id.value++,
//     name: 'Chanel No 5',
//     price: 39.99,
//     image: '/img/perf5.png',
//     category: 'Xeram Impressions',
//   },
// ])

const categories = ref<string[]>(['All Product', 'Xeram Impressions', 'Xeram Originals'])
const selectedCategory = ref<string>('All Product')

const filteredProducts = computed<Product[]>(() => {
  if (selectedCategory.value === 'All Product') return products.value
  return products.value.filter((product) => product.category === selectedCategory.value)
})
</script>

<template>
  <div>
    <!-- Header Section -->
    <div class="mb-12 text-center">
      <h1 class="mb-2 text-xl font-light md:text-3xl">
        Check out our full collection of products tailored to your needs
      </h1>
    </div>

    <!-- Category Filters -->
    <div class="mb-8 flex justify-center space-x-4">
      <button
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        :class="[
          'rounded-full px-2.5 py-3 text-xs font-medium transition-colors duration-300 md:px-6 md:py-4 md:text-base',
          selectedCategory === category
            ? 'bg-(--ui-bg-inverted) text-white dark:text-black'
            : 'border border-(--ui-border-accented) bg-(--ui-bg) hover:bg-(--ui-bg-elevated)',
        ]"
      >
        {{ category }}
      </button>
    </div>

    <!-- Product Grid -->
    <div
      class="mx-auto grid w-[80%] grid-cols-2 gap-8 md:grid-cols-4"
      v-auto-animate="{ duration: 400, easing: 'linear' }"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="group relative flex flex-col"
      >
        <!-- Product Image -->
        <div
          class="aspect-w-1 relative aspect-square w-full overflow-hidden rounded-lg"
          @click="$router.push({ name: 'productDetails', params: { id: product.id } })"
        >
          <img
            :src="product.defaultImage"
            :alt="product.name"
            class="aspect-square h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <!-- Add to Cart Button - Overlay -->
          <div
            class="bg-opacity-0 group-hover:bg-opacity-30 absolute inset-0 flex items-center justify-center transition-all duration-300 hover:bg-black/50"
          >
            <UButton
              variant="solid"
              color="neutral"
              class="scale-90 transform cursor-pointer rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:shadow-xl"
            >
              Add to Cart
            </UButton>
          </div>
        </div>

        <!-- Product Details -->
        <div class="mt-2 flex flex-col items-center justify-between px-2 md:mt-4 md:flex-row">
          <h3 class="cursor-pointer text-sm font-medium md:text-base">
            {{ product.name }}
          </h3>
          <!-- <p class="cursor-pointer text-sm font-medium md:text-base">
            {{ formatCurrency(product.price) }}
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
