import type { CartItem, Product } from '@/types/types'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('ProductStore', () => {
  const id = ref<number>(1)
  const variantID = ref<number>(101)

  const products = ref<Product[]>([
    {
      id: id.value++,
      name: 'Club De Nuit',
      category: 'Xeram Originals',
      description:
        'A nocturnal composition. Dark florals laid over deep spice and a velvet base — the signature of those who arrive after midnight and leave a memory behind.',
      defaultImage: '/img/perf.png',
      accord: 'Sensual · Nocturnal · Magnetic',
      tagline: 'A scent for arrivals.',
      mood: ['Sensual', 'Confident', 'Nocturnal'],
      intensity: 5,
      longevity: 5,
      sillage: 4,
      origin: 'Accra · Maison Originals',
      notes: {
        top: ['Bergamot', 'Black Pepper'],
        heart: ['Black Iris', 'Saffron'],
        base: ['Ambroxan', 'Vetiver', 'Cedar'],
      },
      variant: [
        { id: variantID.value++, size: '20ml', price: 19.99, image: '/img/perf.png' },
        { id: variantID.value++, size: '50ml', price: 39.99, image: '/img/perf2.png' },
        { id: variantID.value++, size: '100ml', price: 59.99, image: '/img/perf3.png' },
        { id: variantID.value++, size: '150ml', price: 79.99, image: '/img/perf4.png' },
      ],
    },
    {
      id: id.value++,
      name: 'Oud De Arabia',
      category: 'Xeram Impressions',
      description:
        'Aged oud from the East, softened by amber resin and a flicker of warm spice. Worn close to the skin, it whispers of caravan routes and stone courtyards.',
      defaultImage: '/img/perf2.png',
      accord: 'Warm · Spiced · Resinous',
      tagline: 'A passage to the East.',
      inspiredBy: 'Inspired by the storied amber roads of Arabia.',
      mood: ['Warm', 'Mysterious', 'Sensual'],
      intensity: 5,
      longevity: 5,
      sillage: 5,
      origin: 'Impressions · Eastern Accord',
      notes: {
        top: ['Pink Pepper', 'Cardamom'],
        heart: ['Aged Oud', 'Rose Absolute'],
        base: ['Amber', 'Tonka Bean', 'Sandalwood'],
      },
      variant: [
        { id: variantID.value++, size: '20ml', price: 24.99, image: '/img/perf3.png' },
        { id: variantID.value++, size: '50ml', price: 49.99, image: '/img/perf4.png' },
        { id: variantID.value++, size: '100ml', price: 69.99, image: '/img/perf5.png' },
        { id: variantID.value++, size: '150ml', price: 79.99, image: '/img/perf6.png' },
      ],
    },
    {
      id: id.value++,
      name: 'Asad',
      category: 'Xeram Originals',
      description:
        'A daytime composition with confidence at its centre. Bright citrus opens onto an aromatic spine of woods — for those who walk in first and ask later.',
      defaultImage: '/img/perf3.png',
      accord: 'Vivid · Aromatic · Self-assured',
      tagline: 'For those who walk in first.',
      mood: ['Energetic', 'Refined', 'Daytime'],
      intensity: 3,
      longevity: 4,
      sillage: 3,
      origin: 'Accra · Maison Originals',
      notes: {
        top: ['Sicilian Bergamot', 'Lemon Zest'],
        heart: ['Lavender', 'Geranium'],
        base: ['Vetiver', 'Patchouli', 'Cashmeran'],
      },
      variant: [
        { id: variantID.value++, size: '20ml', price: 14.99, image: '/img/perf6.png' },
        { id: variantID.value++, size: '50ml', price: 44.99, image: '/img/perf4.png' },
        { id: variantID.value++, size: '100ml', price: 64.99, image: '/img/perf3.png' },
        { id: variantID.value++, size: '150ml', price: 79.99, image: '/img/perf2.png' },
      ],
    },
    {
      id: id.value++,
      name: 'Allure Homme',
      category: 'Xeram Impressions',
      description:
        'A modern gentleman\'s composition. Citrus warms into spice, then settles into a quiet vanilla — restraint with a long memory.',
      defaultImage: '/img/perf4.png',
      accord: 'Refined · Warm · Quietly Bold',
      tagline: 'Restraint, with memory.',
      inspiredBy: 'An impression in the spirit of Chanel\u2009Allure\u2009Homme.',
      mood: ['Sophisticated', 'Versatile', 'Modern'],
      intensity: 3,
      longevity: 4,
      sillage: 3,
      origin: 'Impressions · Modern Gentleman',
      notes: {
        top: ['Mandarin', 'Neroli'],
        heart: ['Pepper', 'Jasmine'],
        base: ['Tonka', 'Vanilla', 'Labdanum'],
      },
      variant: [
        { id: variantID.value++, size: '20ml', price: 22.99, image: '/img/perf3.png' },
        { id: variantID.value++, size: '50ml', price: 42.99, image: '/img/perf2.png' },
        { id: variantID.value++, size: '100ml', price: 62.99, image: '/img/perf4.png' },
        { id: variantID.value++, size: '150ml', price: 79.99, image: '/img/perf5.png' },
      ],
    },
    {
      id: id.value++,
      name: 'Chanel No 5',
      category: 'Xeram Impressions',
      description:
        'The archetype. Aldehydic florals lifted into the air, then drawn down by powdery musk — a portrait that never dates.',
      defaultImage: '/img/perf5.png',
      accord: 'Floral · Powdery · Iconic',
      tagline: 'A portrait that never dates.',
      inspiredBy: 'An impression in the spirit of Chanel\u2009N°\u20095.',
      mood: ['Timeless', 'Feminine', 'Elegant'],
      intensity: 4,
      longevity: 4,
      sillage: 4,
      origin: 'Impressions · The Archetype',
      notes: {
        top: ['Aldehydes', 'Ylang-Ylang'],
        heart: ['Rose de Mai', 'Jasmine'],
        base: ['Sandalwood', 'White Musk', 'Vetiver'],
      },
      variant: [
        { id: variantID.value++, size: '20ml', price: 24.99, image: '/img/perf4.png' },
        { id: variantID.value++, size: '50ml', price: 54.99, image: '/img/perf6.png' },
        { id: variantID.value++, size: '100ml', price: 74.99, image: '/img/perf5.png' },
        { id: variantID.value++, size: '150ml', price: 79.99, image: '/img/perf3.png' },
      ],
    },
    {
      id: id.value++,
      name: 'Black Orchid',
      category: 'Xeram Impressions',
      description:
        'A study in shadow. Black truffle and dark florals laced with patchouli and a thread of cocoa — sensual, mineral, deliberate.',
      defaultImage: '/img/perf6.png',
      accord: 'Dark Floral · Velvet · Decadent',
      tagline: 'Worn after dark.',
      inspiredBy: 'An impression in the spirit of Tom\u2009Ford Black\u2009Orchid.',
      mood: ['Decadent', 'Mysterious', 'Provocative'],
      intensity: 5,
      longevity: 5,
      sillage: 5,
      origin: 'Impressions · The Velvet Hour',
      notes: {
        top: ['Truffle', 'Black Plum'],
        heart: ['Black Orchid', 'Spice'],
        base: ['Patchouli', 'Dark Chocolate', 'Incense'],
      },
      variant: [
        { id: variantID.value++, size: '20ml', price: 29.99, image: '/img/perf5.png' },
        { id: variantID.value++, size: '50ml', price: 59.99, image: '/img/perf2.png' },
        { id: variantID.value++, size: '100ml', price: 79.99, image: '/img/perf4.png' },
        { id: variantID.value++, size: '150ml', price: 89.99, image: '/img/perf3.png' },
      ],
    },
    {
      id: id.value++,
      name: 'Asad Noir',
      category: 'Xeram Originals',
      description:
        'A night-time counterpoint to Asad. Smoke, leather, and a dry woody trail — quiet entrance, long shadow.',
      defaultImage: '/img/perf.png',
      accord: 'Smoke · Leather · Dry Wood',
      tagline: 'Quiet entrance, long shadow.',
      mood: ['Smoky', 'Leathery', 'Bold'],
      intensity: 5,
      longevity: 5,
      sillage: 4,
      origin: 'Accra · Maison Originals',
      notes: {
        top: ['Smoked Cardamom', 'Pink Pepper'],
        heart: ['Leather', 'Iris'],
        base: ['Oud', 'Cypriol', 'Cashmere Wood'],
      },
      variant: [
        { id: variantID.value++, size: '20ml', price: 29.99, image: '/img/perf.png' },
        { id: variantID.value++, size: '50ml', price: 59.99, image: '/img/perf3.png' },
        { id: variantID.value++, size: '100ml', price: 79.99, image: '/img/perf4.png' },
        { id: variantID.value++, size: '150ml', price: 99.99, image: '/img/perf5.png' },
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
