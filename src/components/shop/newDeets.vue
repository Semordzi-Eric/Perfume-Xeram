<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { formatCurrency } from '@/utils/formatCurrency'
import type { Product } from '@/types/types'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const id = ref<number>(Number(route.params.id))
const product = ref(productStore.getProductById(id.value))

const selectedVariant = ref(product.value.variant[0])
const reorderedVariants = ref([...product.value.variant])

const displayVariants = computed(() =>
  reorderedVariants.value.filter((variant) => variant.id !== selectedVariant.value.id),
)

const selectVariant = (variant: Product['variant'][number]) => {
  const previousSelected = selectedVariant.value
  const clickedIndex = reorderedVariants.value.findIndex((v) => v.id === variant.id)
  const previousSelectedIndex = reorderedVariants.value.findIndex(
    (v) => v.id === previousSelected.id,
  )

  const newVariants = [...reorderedVariants.value]
  newVariants[clickedIndex] = previousSelected
  if (previousSelectedIndex !== -1) {
    newVariants[previousSelectedIndex] = variant
  }

  reorderedVariants.value = newVariants
  selectedVariant.value = variant

  router.push({
    name: 'productDetails',
    params: { id: product.value.id, variantId: variant.id },
  })
}
</script>

<template>
  <div class="-mt-10 min-h-screen">
    <div class="container mx-auto py-3 md:px-4 md:py-8">
      <div class="flex flex-col gap-8 md:flex-row">
        <div class="w-full md:w-1/2">
          <div class="p-4 md:p-8">
            <img
              :src="selectedVariant.image"
              :alt="product.name"
              class="mx-auto w-full max-w-md rounded-2xl"
            />
          </div>

          <div class="mt-4 flex justify-center space-x-8 md:space-x-13">
            <div
              v-for="variant in displayVariants"
              :key="variant.id"
              class="h-24 w-24 cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform hover:scale-110"
              @click="selectVariant(variant)"
            >
              <img :src="variant.image" :alt="variant.size" class="h-full w-full" />
            </div>
          </div>
        </div>

        <div class="mt-10 flex w-full flex-col md:w-1/2">
          <h1 class="mb-4 px-3 text-4xl font-light text-(--ui-text-highlighted)">
            {{ product.name }}
          </h1>
          <div class="mb-6 rounded-lg p-3">
            <p class="text-base leading-relaxed">{{ product.description }}</p>
          </div>

          <div class="mb-4">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium">Price</p>
              <p class="font-medium">Size</p>
            </div>
            <USeparator
              class="my-2"
              type="solid"
              size="sm"
              :ui="{ border: 'border-(--ui-border-inverted)' }"
            />
            <div class="flex items-center justify-between">
              <p class="text-base font-medium">{{ formatCurrency(selectedVariant.price) }}</p>
              <p class="text-base font-medium">{{ selectedVariant.size }}</p>
            </div>
          </div>

          <div class="mt-3 flex w-full items-center justify-center">
            <UButton
              label="Add to Cart"
              leading-icon="i-lucide-shopping-cart"
              size="xl"
              color="neutral"
              class="cursor-pointer rounded-full border-2 px-8 py-3 font-semibold transition hover:bg-(--ui-bg-inverted) hover:text-white"
            />
          </div>

          <div class="mt-15 md:mt-25">
            <div class="mb-4 flex justify-between">
              <p class="font-medium text-(--ui-text-highlighted)">Ingredients</p>
              <p class="font-medium text-(--ui-text-highlighted)">Details</p>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <p class="text-base">Pink Grapefruit</p>
                <p class="text-base">100% Organic</p>
              </div>
              <div class="flex justify-between">
                <p class="text-base">Jasmine</p>
                <p class="text-base">Female</p>
              </div>
              <div class="flex justify-between">
                <p class="text-base">Petite (France)</p>
                <p class="text-base"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
