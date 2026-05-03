import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as data from '@/products.json'
import type { NewProduct, Variants } from '@/types/types'

export const useCounterStore = defineStore('counter', () => {
  const products = ref<NewProduct[]>(data.products)
  const selectedProduct = ref<NewProduct | null>(null)
  const selectedVariant = ref<Variants | null>(null)

  function setProducts(productList: NewProduct[]) {
    products.value = productList
  }

  function selectProduct(productId: number, variantId?: number) {
    const product = products.value.find((p) => p.id === productId)
    if (!product) return

    selectedProduct.value = product

    selectedVariant.value =
      product.variants.find((v) => v.variantId === variantId) || product.variants[0]
  }

  function selectVariant(variantId: number) {
    if (!selectedProduct.value) return
    const variant = selectedProduct.value.variants.find((v) => v.variantId === variantId)
    if (variant) selectedVariant.value = variant
  }

  return {
    products,
    selectedProduct,
    selectedVariant,
    setProducts,
    selectProduct,
    selectVariant,
  }
})
