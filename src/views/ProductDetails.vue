<!-- <script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const id = ref<number>(Number(route.params.id))
const { getProductById } = productStore

const product = getProductById(id.value)

const selectedVariant = ref(product.variant[0])

const reorderedVariants = ref([...product.variant])

const displayVariants = computed(() => {
  return reorderedVariants.value.filter((variant) => variant.id !== selectedVariant.value.id)
})

// Function to update the selected variant and swap positions
const selectVariant = (variant: (typeof product.variant)[0]) => {
  const previousSelected = selectedVariant.value

  // Find the index of the clicked variant
  const clickedIndex = reorderedVariants.value.findIndex((v) => v.id === variant.id)

  // Create a new array with the swap
  const newVariants = [...reorderedVariants.value]
  newVariants[clickedIndex] = previousSelected // Put previously selected variant in clicked position

  // Find where the previously selected variant was and put the newly selected there
  const previousSelectedIndex = reorderedVariants.value.findIndex(
    (v) => v.id === previousSelected.id,
  )
  if (previousSelectedIndex !== -1) {
    newVariants[previousSelectedIndex] = variant
  }

  // Update the reordered variants
  reorderedVariants.value = newVariants

  // Update the selected variant
  selectedVariant.value = variant

  router.push({
    name: 'productDetails',
    params: { id: product.id, variantId: variant.id },
  })
}
</script> -->

<template>
  <div>
    <MainDetails />
  </div>
</template>
