import type { CartItem, Product } from '@/types/types'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('ProductStore', () => {
  const id = ref<number>(1)
  const variantID = ref<number>(101)

  const products = ref<Product[]>([
    {
      id: id.value++,
      name: 'Bleu de Chanel',
      category: 'Xeram Impressions',
      description:
        'A woody, aromatic fragrance for the man who defies convention. The profoundly sensual Eau de Parfum, infused with crisp citrus notes, offers an intense concentration of the fresh, clean and vibrant fragrance.',
      defaultImage: '/img/brand_1.jpg',
      accord: 'Woody · Aromatic · Fresh',
      tagline: 'Defy convention.',
      inspiredBy: 'An impression in the spirit of Bleu de Chanel.',
      mood: ['Confident', 'Sophisticated', 'Modern'],
      intensity: 4,
      longevity: 5,
      sillage: 4,
      origin: 'Impressions · The Archetype',
      notes: {
        top: ['Citrus', 'Peppermint'],
        heart: ['Cedar', 'Labdanum'],
        base: ['Sandalwood', 'Patchouli'],
      },
      variant: [
        { id: variantID.value++, size: '50ml', price: 130, image: '/img/brand_1.jpg' }
      ],
    },
    {
      id: id.value++,
      name: 'Ombré Nomade & Oud Maracuja',
      category: 'Xeram Originals',
      description:
        'A daring blend of Ombré Nomade\'s swirling agarwood and Oud Maracuja\'s tropical passion fruit depth. A true masterpiece.',
      defaultImage: '/img/brand_2.jpg',
      accord: 'Oud · Leather · Tropical',
      tagline: 'A daring blend.',
      inspiredBy: 'Inspired by Louis Vuitton Ombré Nomade and Oud Maracuja.',
      mood: ['Bold', 'Exotic', 'Sensual'],
      intensity: 5,
      longevity: 5,
      sillage: 5,
      origin: 'Accra · Maison Originals',
      notes: {
        top: ['Passion Fruit', 'Raspberry'],
        heart: ['Agarwood (Oud)', 'Rose'],
        base: ['Leather', 'Benzoin'],
      },
      variant: [
        { id: variantID.value++, size: '30ml', price: 150, image: '/img/brand_2.jpg' }
      ],
    },
    {
      id: id.value++,
      name: 'Pink Chiffon',
      category: 'Xeram Impressions',
      description:
        'A light-as-air pairing of soft pink petals & vanilla chiffon icing expresses the flirty femininity of feeling pretty in pink.',
      defaultImage: '/img/brand_3.jpg',
      accord: 'Sweet · Floral · Airy',
      tagline: 'Pretty in pink.',
      inspiredBy: 'An impression of Pink Chiffon.',
      mood: ['Playful', 'Feminine', 'Sweet'],
      intensity: 3,
      longevity: 3,
      sillage: 3,
      origin: 'Impressions · Delicate Petals',
      notes: {
        top: ['Wild Berries', 'Mandarin'],
        heart: ['Pink Petals', 'Water Lily'],
        base: ['Vanilla Chiffon', 'Musk'],
      },
      variant: [
        { id: variantID.value++, size: '30ml', price: 80, image: '/img/brand_3.jpg' }
      ],
    },
    {
      id: id.value++,
      name: 'Xeram Discovery Set',
      category: 'Xeram Originals',
      description:
        'Explore the Xeram collection with our Discovery Set. Featuring a variety of travel-sized impressions including Pink Chiffon, Creed Aventus, and more.',
      defaultImage: '/img/brand_4.jpg',
      accord: 'Variety · Discovery · Travel',
      tagline: 'Explore the collection.',
      mood: ['Curious', 'Adventurous', 'Versatile'],
      intensity: 4,
      longevity: 4,
      sillage: 4,
      origin: 'Accra · Maison Originals',
      notes: {
        top: ['Various'],
        heart: ['Various'],
        base: ['Various'],
      },
      variant: [
        { id: variantID.value++, size: 'Sample Pack', price: 50, image: '/img/brand_4.jpg' }
      ],
    },
    {
      id: id.value++,
      name: 'Jean Paul Gaultier Le Male',
      category: 'Xeram Impressions',
      description:
        'An intensive and sensible, modern, and comfortably warm, masculine and gentle fragrance. Le Male is magnetically attractive fragrance which seduces with its uniqueness.',
      defaultImage: '/img/brand_5.png',
      accord: 'Aromatic · Fougere · Warm',
      tagline: 'Magnetically attractive.',
      inspiredBy: 'An impression in the spirit of Jean Paul Gaultier Le Male.',
      mood: ['Sensual', 'Classic', 'Masculine'],
      intensity: 4,
      longevity: 4,
      sillage: 4,
      origin: 'Impressions · Modern Gentleman',
      notes: {
        top: ['Mint', 'Lavender'],
        heart: ['Cinnamon', 'Orange Blossom'],
        base: ['Vanilla', 'Tonka Bean'],
      },
      variant: [
        { id: variantID.value++, size: '50ml', price: 120, image: '/img/brand_5.png' }
      ],
    },
  ])

  const cartItems = ref<CartItem[]>([])
  const selectedProduct = ref<Product | null>(null)

  const productById = computed(() => {
    return (id: number) => {
      const product = products.value.find((product) => product.id === id)
      return product as Product
    }
  })

  const getProductById = (id: number) => {
    return products.value.find((product) => product.id === id) as Product
  }

  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  function addToCart(productId: number, variantId: number, quantity: number = 1): void {
    try {
      if (!productId || !variantId || quantity <= 0) {
        throw new Error('Invalid product ID, variant ID, or quantity')
      }
      const product = getProductById(productId)
      if (!product) throw new Error('Product not found')
      const variant = product.variant.find((v) => v.id === variantId)
      if (!variant) throw new Error('Variant not found')

      const existingItemIndex = cartItems.value.findIndex((item) => item.id === variantId)
      if (existingItemIndex !== -1) {
        cartItems.value[existingItemIndex].quantity += quantity
      } else {
        cartItems.value.push({
          id: variant.id,
          productId: product.id,
          name: product.name,
          size: variant.size,
          price: variant.price,
          image: variant.image,
          quantity: quantity,
        })
      }
    } catch (error: unknown) {
      console.error('Error adding item to cart:', error instanceof Error ? error.message : error)
    }
  }

  function removeItemFromCart(variantId: number): void {
    try {
      if (!variantId) throw new Error('Invalid item ID')
      const index = cartItems.value.findIndex((cartItem) => cartItem.id === variantId)
      if (index === -1) throw new Error('Item not found in cart')
      cartItems.value.splice(index, 1)
    } catch (error: unknown) {
      console.error('Error removing item from cart:', error instanceof Error ? error.message : error)
    }
  }

  function incrementQuantity(itemId: number): void {
    try {
      const item = cartItems.value.find((i) => i.id === itemId)
      if (!item) throw new Error('Item not found in cart')
      item.quantity++
    } catch (error: unknown) {
      console.error('Error incrementing item quantity:', error instanceof Error ? error.message : error)
    }
  }

  function decrementQuantity(variantId: number): void {
    try {
      const item = cartItems.value.find((i) => i.id === variantId)
      if (!item) throw new Error('Item not found in cart')
      if (item.quantity > 1) {
        item.quantity--
      } else {
        removeItemFromCart(variantId)
      }
    } catch (error: unknown) {
      console.error('Error decrementing item quantity:', error instanceof Error ? error.message : error)
    }
  }

  function clearCart() {
    cartItems.value = []
  }

  const cartItemsCount = computed(() => cartItems.value.length)

  return {
    products,
    selectedProduct,
    productById,
    cartItems,
    totalPrice,
    addToCart,
    removeItemFromCart,
    getProductById,
    clearCart,
    cartItemsCount,
    incrementQuantity,
    decrementQuantity,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
