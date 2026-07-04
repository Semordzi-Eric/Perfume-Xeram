import type { CartItem, Product } from '@/types/types'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('ProductStore', () => {
  let currentId = 1
  let currentVariantId = 101

  const products = ref<Product[]>([
    {
      id: currentId++,
      name: 'Nishane Hacivat',
      category: 'Xeram Impressions',
      description: 'A vibrant and sophisticated chypre fragrance. This impression captures the joyful brilliance of pineapple, grapefruit, and bergamot, leading to a stunning woody base of cedarwood and patchouli.',
      defaultImage: '/img/products/nishane-hacivat.png',
      accord: 'Citrus · Woody · Fruity',
      tagline: 'Joyful brilliance.',
      inspiredBy: 'An impression in the spirit of Nishane Hacivat.',
      mood: ['Vibrant', 'Sophisticated', 'Uplifting'],
      intensity: 5,
      longevity: 5,
      sillage: 5,
      origin: 'Impressions · Radiant Citrus',
      notes: {
        top: ['Pineapple', 'Grapefruit', 'Bergamot'],
        heart: ['Cedarwood', 'Patchouli', 'Jasmine'],
        base: ['Oakmoss', 'Clearwood'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/nishane-hacivat.png' },
        { id: currentVariantId++, size: '15ml', price: 80, image: '/img/products/nishane-hacivat.png' }
      ],
    },
    {
      id: currentId++,
      name: '212 VIP Man',
      category: 'Xeram Impressions',
      description: 'A charismatic and magnetic fragrance for the life of the party. The scent blends vodka with frozen mint, passion fruit, leather and caviar, creating an explosive and sophisticated aura.',
      defaultImage: '/img/products/212-vip-man.png',
      accord: 'Aromatic · Spicy · Fresh',
      tagline: 'Are you on the list?',
      inspiredBy: 'An impression in the spirit of Carolina Herrera 212 VIP Men.',
      mood: ['Charismatic', 'Magnetic', 'Energetic'],
      intensity: 4,
      longevity: 4,
      sillage: 4,
      origin: 'Impressions · The Nightlife',
      notes: {
        top: ['Passion Fruit', 'Lime', 'Pepper'],
        heart: ['Vodka', 'Gin', 'Mint'],
        base: ['Amber', 'Leather', 'Woody Notes'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 120, image: '/img/products/212-vip-man.png' },
        { id: currentVariantId++, size: '15ml', price: 65, image: '/img/products/212-vip-man.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Oud Wood',
      category: 'Xeram Impressions',
      description: 'Rare. Exotic. Distinctive. A pioneering composition of exotic woods and spices. This blend wraps you in the smoky richness of agarwood, sandalwood, and rosewood.',
      defaultImage: '/img/products/oud-wood.png',
      accord: 'Woody · Balsamic · Warm Spicy',
      tagline: 'Rare and distinctive.',
      inspiredBy: 'An impression in the spirit of Tom Ford Oud Wood.',
      mood: ['Exotic', 'Elegant', 'Mysterious'],
      intensity: 5,
      longevity: 5,
      sillage: 4,
      origin: 'Impressions · Precious Woods',
      notes: {
        top: ['Rosewood', 'Cardamom', 'Chinese Pepper'],
        heart: ['Oud', 'Sandalwood', 'Vetiver'],
        base: ['Tonka Bean', 'Vanilla', 'Amber'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 180, image: '/img/products/oud-wood.png' },
        { id: currentVariantId++, size: '4ml', price: 30, image: '/img/products/oud-wood.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Versace Eros',
      category: 'Xeram Impressions',
      description: 'A fragrance that interprets sublime masculinity through a luminous aura with an intense, vibrant and glowing freshness. Passionate and heroic.',
      defaultImage: '/img/products/versace-eros.png',
      accord: 'Aromatic · Fresh Spicy · Vanilla',
      tagline: 'Sublime masculinity.',
      inspiredBy: 'An impression in the spirit of Versace Eros.',
      mood: ['Heroic', 'Passionate', 'Luminous'],
      intensity: 4,
      longevity: 4,
      sillage: 5,
      origin: 'Impressions · Luminous Aura',
      notes: {
        top: ['Mint', 'Green Apple', 'Lemon'],
        heart: ['Tonka Bean', 'Ambroxan', 'Geranium'],
        base: ['Madagascar Vanilla', 'Virginian Cedar', 'Vetiver'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 110, image: '/img/products/versace-eros.png' },
        { id: currentVariantId++, size: '15ml', price: 60, image: '/img/products/versace-eros.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Dior Sauvage',
      category: 'Xeram Impressions',
      description: 'A radically fresh composition, raw and noble all at once. Radiant top notes burst with the juicy freshness of Reggio di Calabria Bergamot.',
      defaultImage: '/img/products/dior-sauvage.png',
      accord: 'Fresh Spicy · Amber · Citrus',
      tagline: 'Raw and noble.',
      inspiredBy: 'An impression in the spirit of Dior Sauvage.',
      mood: ['Wild', 'Fresh', 'Noble'],
      intensity: 5,
      longevity: 5,
      sillage: 5,
      origin: 'Impressions · Radically Fresh',
      notes: {
        top: ['Calabrian Bergamot', 'Pepper'],
        heart: ['Sichuan Pepper', 'Lavender', 'Pink Pepper'],
        base: ['Ambroxan', 'Cedar', 'Labdanum'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/dior-sauvage.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Black Orchid',
      category: 'Xeram Impressions',
      description: 'A luxurious and sensual fragrance of rich, dark accords and an alluring potion of black orchids and spice.',
      defaultImage: '/img/products/black-orchid.png',
      accord: 'Warm Floral · Earthy · Woody',
      tagline: 'Luxurious and sensual.',
      inspiredBy: 'An impression in the spirit of Tom Ford Black Orchid.',
      mood: ['Sensual', 'Luxurious', 'Dark'],
      intensity: 5,
      longevity: 5,
      sillage: 5,
      origin: 'Impressions · Dark Accords',
      notes: {
        top: ['Truffle', 'Gardenia', 'Blackcurrant'],
        heart: ['Orchid', 'Spices', 'Fruity Notes'],
        base: ['Mexican Chocolate', 'Patchouli', 'Vanilla'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/black-orchid.png' },
        { id: currentVariantId++, size: '15ml', price: 80, image: '/img/products/black-orchid.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Ombré Nomade',
      category: 'Xeram Impressions',
      description: 'Swirls of oud wood for a journey into the heart of the desert. Designed for lovers of rare essences, Ombré Nomade concentrates that sensation of infinity into one of the most mythical ingredients in perfumery, oud wood.',
      defaultImage: '/img/products/ombre-nomade.png',
      accord: 'Amber Woody · Warm Spicy · Smoky',
      tagline: 'Journey into the desert.',
      inspiredBy: 'An impression in the spirit of Louis Vuitton Ombré Nomade.',
      mood: ['Mystical', 'Intense', 'Warm'],
      intensity: 5,
      longevity: 5,
      sillage: 5,
      origin: 'Impressions · Desert Woods',
      notes: {
        top: ['Raspberry', 'Incense'],
        heart: ['Rose', 'Birch', 'Saffron'],
        base: ['Oud Wood', 'Benzoin', 'Amberwood'],
      },
      variant: [
        { id: currentVariantId++, size: '50ml', price: 250, image: '/img/products/ombre-nomade.png' },
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/ombre-nomade.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Pink Chiffon',
      category: 'Xeram Impressions',
      description: 'A light, sweet, and airy fragrance perfect for everyday wear. Notes of wild berries and soft pink petals.',
      defaultImage: '/img/products/pink-chiffon.png',
      accord: 'Sweet · Floral · Fruity',
      tagline: 'Soft and airy.',
      inspiredBy: 'An impression in the spirit of Pink Chiffon.',
      mood: ['Sweet', 'Playful', 'Feminine'],
      intensity: 3,
      longevity: 4,
      sillage: 3,
      origin: 'Impressions · Floral Berries',
      notes: {
        top: ['Wild Berries', 'Mandarin'],
        heart: ['Pink Petals', 'Jasmine'],
        base: ['Vanilla', 'Musk'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/pink-chiffon.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Cool Water Woman',
      category: 'Xeram Impressions',
      description: 'Experience the exhilarating freshness of the ocean. A blend of aquatic and botanical notes.',
      defaultImage: '/img/products/cool-water-woman.png',
      accord: 'Aquatic · Fresh · Floral',
      tagline: 'Oceanic freshness.',
      inspiredBy: 'An impression in the spirit of Davidoff Cool Water Woman.',
      mood: ['Fresh', 'Invigorating', 'Clean'],
      intensity: 3,
      longevity: 4,
      sillage: 4,
      origin: 'Impressions · Aquatic Freshness',
      notes: {
        top: ['Melon', 'Lotus', 'Lemon'],
        heart: ['Water Lily', 'Jasmine'],
        base: ['Musk', 'Vetiver'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/cool-water-woman.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Oud Madawi',
      category: 'Xeram Impressions',
      description: 'A rich and opulent oriental fragrance featuring a majestic blend of precious oud and sweet florals.',
      defaultImage: '/img/products/oud-madawi.png',
      accord: 'Oriental · Sweet · Woody',
      tagline: 'Rich and opulent.',
      inspiredBy: 'An impression in the spirit of Arabian Oud Madawi.',
      mood: ['Opulent', 'Majestic', 'Elegant'],
      intensity: 5,
      longevity: 5,
      sillage: 5,
      origin: 'Impressions · Arabian Nights',
      notes: {
        top: ['Peach', 'Apple Blossom'],
        heart: ['Pineapple Blossom', 'Jasmine'],
        base: ['Oud', 'Musk', 'Patchouli'],
      },
      variant: [
        { id: currentVariantId++, size: '50ml', price: 250, image: '/img/products/oud-madawi.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Oud Maracuja',
      category: 'Xeram Impressions',
      description: 'An exotic collision of deep oud wood and vibrant passion fruit. A tropical yet dark and mysterious scent.',
      defaultImage: '/img/products/oud-maracuja.png',
      accord: 'Fruity · Woody · Leather',
      tagline: 'Tropical mystery.',
      inspiredBy: 'An impression in the spirit of Maison Crivelli Oud Maracuja.',
      mood: ['Exotic', 'Mysterious', 'Vibrant'],
      intensity: 5,
      longevity: 5,
      sillage: 5,
      origin: 'Impressions · Tropical Oud',
      notes: {
        top: ['Passion Fruit', 'Saffron'],
        heart: ['Turkish Rose', 'Oud'],
        base: ['Leather', 'Vanilla'],
      },
      variant: [
        { id: currentVariantId++, size: '50ml', price: 250, image: '/img/products/oud-maracuja.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Bleu de Chanel',
      category: 'Xeram Impressions',
      description: 'A tribute to masculine freedom in an aromatic-woody fragrance with a captivating trail.',
      defaultImage: '/img/brand/bleu-de-chanel-lifestyle.png',
      accord: 'Citrus · Woody · Aromatic',
      tagline: 'Masculine freedom.',
      inspiredBy: 'An impression in the spirit of Bleu de Chanel.',
      mood: ['Confident', 'Elegant', 'Fresh'],
      intensity: 4,
      longevity: 5,
      sillage: 4,
      origin: 'Impressions · Aromatic Woods',
      notes: {
        top: ['Grapefruit', 'Lemon', 'Mint'],
        heart: ['Ginger', 'Nutmeg', 'Jasmine'],
        base: ['Incense', 'Vetiver', 'Cedar'],
      },
      variant: [
        { id: currentVariantId++, size: '50ml', price: 250, image: '/img/brand/bleu-de-chanel-lifestyle.png' },
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/brand/bleu-de-chanel-lifestyle.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Escada',
      category: 'Xeram Impressions',
      description: 'A burst of joyful, fruity, and floral notes that evoke summer memories and endless sunshine.',
      defaultImage: '/img/brand/escada-lifestyle.png',
      accord: 'Fruity · Sweet · Floral',
      tagline: 'Joyful sunshine.',
      inspiredBy: 'An impression in the spirit of Escada.',
      mood: ['Joyful', 'Radiant', 'Sweet'],
      intensity: 3,
      longevity: 3,
      sillage: 3,
      origin: 'Impressions · Summer Fruits',
      notes: {
        top: ['Mango', 'Nectarine'],
        heart: ['Lotus', 'Raspberry'],
        base: ['Coconut', 'Sandalwood'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/brand/escada-lifestyle.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Le Male',
      category: 'Xeram Impressions',
      description: 'An unconventional vision of masculinity. Lavender, referencing the familiar, comforting scent of shaving soap, is enhanced by the sensuality of vanilla.',
      defaultImage: '/img/brand/le-male-lifestyle.png',
      accord: 'Aromatic · Vanilla · Fresh Spicy',
      tagline: 'Unconventional masculinity.',
      inspiredBy: 'An impression in the spirit of Jean Paul Gaultier Le Male.',
      mood: ['Sensual', 'Comforting', 'Bold'],
      intensity: 4,
      longevity: 5,
      sillage: 4,
      origin: 'Impressions · Classic Aromatic',
      notes: {
        top: ['Mint', 'Lavender', 'Bergamot'],
        heart: ['Cinnamon', 'Cumin', 'Orange Blossom'],
        base: ['Vanilla', 'Tonka Bean', 'Sandalwood'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/brand/le-male-lifestyle.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Stronger With You',
      category: 'Xeram Impressions',
      description: 'A warm, sensual fragrance that captures the energy of modern love. Spicy and sweet accords blend flawlessly.',
      defaultImage: '/img/brand/stronger-with-you-lifestyle.png',
      accord: 'Warm Spicy · Vanilla · Sweet',
      tagline: 'Energy of modern love.',
      inspiredBy: 'An impression in the spirit of Emporio Armani Stronger With You.',
      mood: ['Romantic', 'Warm', 'Charming'],
      intensity: 4,
      longevity: 5,
      sillage: 4,
      origin: 'Impressions · Warm Spices',
      notes: {
        top: ['Cardamom', 'Pink Pepper'],
        heart: ['Sage', 'Melon'],
        base: ['Vanilla', 'Chestnut', 'Cedar'],
      },
      variant: [
        { id: currentVariantId++, size: '50ml', price: 250, image: '/img/brand/stronger-with-you-lifestyle.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Hundred Silent Ways',
      category: 'Xeram Impressions',
      description: 'A beautiful floral tribute that speaks louder than words. A creamy, sweet, and elegant composition.',
      defaultImage: '/img/brand/hundred-silent-ways-lifestyle.png',
      accord: 'White Floral · Vanilla · Powdery',
      tagline: 'Louder than words.',
      inspiredBy: 'An impression in the spirit of Nishane Hundred Silent Ways.',
      mood: ['Elegant', 'Creamy', 'Beautiful'],
      intensity: 4,
      longevity: 5,
      sillage: 4,
      origin: 'Impressions · Elegant Florals',
      notes: {
        top: ['Tuberose', 'Peach', 'Mandarin'],
        heart: ['White Jasmine', 'Gardenia'],
        base: ['Vanilla', 'Sandalwood', 'Vetiver'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/brand/hundred-silent-ways-lifestyle.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Coconut Passion',
      category: 'Xeram Impressions',
      description: 'A warm and comforting scent that wraps you in an island breeze of rich coconut and vanilla.',
      defaultImage: '/img/products/coconut-passion.png',
      accord: 'Sweet · Vanilla · Coconut',
      tagline: 'Island breeze.',
      inspiredBy: 'An impression in the spirit of Victoria\'s Secret Coconut Passion.',
      mood: ['Warm', 'Comforting', 'Sweet'],
      intensity: 3,
      longevity: 4,
      sillage: 3,
      origin: 'Impressions · Sweet Island',
      notes: {
        top: ['Coconut', 'Aloe Vera'],
        heart: ['Vanilla', 'Lily of the Valley'],
        base: ['Chamomile', 'Musk'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/coconut-passion.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Invictus',
      category: 'Xeram Impressions',
      description: 'The scent of victory. A fresh and sporty woody-aquatic fragrance that embodies power and dynamism.',
      defaultImage: '/img/products/invictus.png',
      accord: 'Citrus · Marine · Woody',
      tagline: 'The scent of victory.',
      inspiredBy: 'An impression in the spirit of Paco Rabanne Invictus.',
      mood: ['Energetic', 'Powerful', 'Sporty'],
      intensity: 4,
      longevity: 4,
      sillage: 4,
      origin: 'Impressions · Aquatic Wood',
      notes: {
        top: ['Grapefruit', 'Sea Notes'],
        heart: ['Bay Leaf', 'Jasmine'],
        base: ['Guaiac Wood', 'Oakmoss', 'Patchouli'],
      },
      variant: [
        { id: currentVariantId++, size: '50ml', price: 250, image: '/img/products/invictus.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Baccarat Rouge 540',
      category: 'Xeram Impressions',
      description: 'Luminous and sophisticated. This poetic alchemy lays on the skin like an amber, floral, and woody breeze.',
      defaultImage: '/img/products/baccarat-rouge-540.png',
      accord: 'Amber · Woody · Warm Spicy',
      tagline: 'Poetic alchemy.',
      inspiredBy: 'An impression in the spirit of Maison Francis Kurkdjian Baccarat Rouge 540.',
      mood: ['Luminous', 'Sophisticated', 'Ethereal'],
      intensity: 5,
      longevity: 5,
      sillage: 5,
      origin: 'Impressions · Luminous Amber',
      notes: {
        top: ['Saffron', 'Jasmine'],
        heart: ['Amberwood', 'Ambergris'],
        base: ['Fir Resin', 'Cedar'],
      },
      variant: [
        { id: currentVariantId++, size: '50ml', price: 250, image: '/img/products/baccarat-rouge-540.png' },
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/baccarat-rouge-540.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Aventus Creed',
      category: 'Xeram Impressions',
      description: 'Celebrating strength, vision and success. A masterful blend of crisp fruits and rich, smoky woods.',
      defaultImage: '/img/products/aventus-creed.png',
      accord: 'Fruity · Sweet · Leather',
      tagline: 'Strength and vision.',
      inspiredBy: 'An impression in the spirit of Creed Aventus.',
      mood: ['Successful', 'Bold', 'Confident'],
      intensity: 4,
      longevity: 5,
      sillage: 4,
      origin: 'Impressions · Regal Wood',
      notes: {
        top: ['Pineapple', 'Bergamot', 'Blackcurrant'],
        heart: ['Birch', 'Patchouli', 'Moroccan Rose'],
        base: ['Musk', 'Oakmoss', 'Ambergris'],
      },
      variant: [
        { id: currentVariantId++, size: '50ml', price: 250, image: '/img/products/aventus-creed.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Erba Pura',
      category: 'Xeram Impressions',
      description: 'A delicious and modern blend of Mediterranean citrus and sweet fruits layered over a warm and sensual amber oriental base.',
      defaultImage: '/img/products/erba-pura.png',
      accord: 'Fruity · Citrus · Sweet',
      tagline: 'Mediterranean sunshine.',
      inspiredBy: 'An impression in the spirit of Xerjoff Erba Pura.',
      mood: ['Delicious', 'Modern', 'Radiant'],
      intensity: 5,
      longevity: 5,
      sillage: 5,
      origin: 'Impressions · Sweet Citrus',
      notes: {
        top: ['Sicilian Orange', 'Calabrian Bergamot', 'Lemon'],
        heart: ['Fruity Notes'],
        base: ['White Musk', 'Madagascar Vanilla', 'Amber'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/erba-pura.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Delina',
      category: 'Xeram Impressions',
      description: 'A charming and firmly modern floral bouquet. A highly nuanced fragrance which is both sweet and sensual.',
      defaultImage: '/img/products/delina.png',
      accord: 'Rose · Floral · Fruity',
      tagline: 'Modern floral bouquet.',
      inspiredBy: 'An impression in the spirit of Parfums de Marly Delina.',
      mood: ['Charming', 'Feminine', 'Sensual'],
      intensity: 4,
      longevity: 5,
      sillage: 4,
      origin: 'Impressions · Nuanced Rose',
      notes: {
        top: ['Litchi', 'Rhubarb', 'Bergamot'],
        heart: ['Turkish Rose', 'Peony', 'Vanilla'],
        base: ['Cashmeran', 'Musk', 'Vetiver'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/delina.png' }
      ],
    },
    {
      id: currentId++,
      name: 'Good Girl',
      category: 'Xeram Impressions',
      description: 'A sensual, evocative fragrance born of the beautiful contradictions and the ever-present duality of modern women.',
      defaultImage: '/img/products/good-girl.png',
      accord: 'White Floral · Warm Spicy · Sweet',
      tagline: 'Beautiful contradictions.',
      inspiredBy: 'An impression in the spirit of Carolina Herrera Good Girl.',
      mood: ['Evocative', 'Daring', 'Elegant'],
      intensity: 4,
      longevity: 4,
      sillage: 4,
      origin: 'Impressions · Dual Nature',
      notes: {
        top: ['Almond', 'Coffee', 'Bergamot'],
        heart: ['Tuberose', 'Jasmine Sambac', 'Orange Blossom'],
        base: ['Tonka Bean', 'Cacao', 'Vanilla'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/good-girl.png' }
      ],
    },
    {
      id: currentId++,
      name: 'La Vie Est Belle',
      category: 'Xeram Impressions',
      description: 'A universal declaration to the beauty of life. An elegant and rich iris, balanced with the depth of patchouli and sweet gourmand notes.',
      defaultImage: '/img/products/la-vie-est-belle.png',
      accord: 'Sweet · Vanilla · Powdery',
      tagline: 'Life is beautiful.',
      inspiredBy: 'An impression in the spirit of Lancôme La Vie Est Belle.',
      mood: ['Elegant', 'Joyful', 'Radiant'],
      intensity: 4,
      longevity: 5,
      sillage: 5,
      origin: 'Impressions · Elegant Gourmand',
      notes: {
        top: ['Blackcurrant', 'Pear'],
        heart: ['Iris', 'Jasmine', 'Orange Blossom'],
        base: ['Praline', 'Vanilla', 'Patchouli'],
      },
      variant: [
        { id: currentVariantId++, size: '30ml', price: 150, image: '/img/products/la-vie-est-belle.png' }
      ],
    },

  ])

  const cartItems = ref<CartItem[]>([])

  /** Returns the product matching the given id, or undefined if not found. */
  const productById = computed(() => {
    return (id: number): Product | undefined =>
      products.value.find((product) => product.id === id)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  function addToCart(productId: number, variantId: number, quantity: number = 1): void {
    try {
      if (!productId || !variantId || quantity <= 0) {
        throw new Error('Invalid product ID, variant ID, or quantity')
      }
      const product = productById.value(productId)
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
    productById,
    cartItems,
    totalPrice,
    addToCart,
    removeItemFromCart,
    clearCart,
    cartItemsCount,
    incrementQuantity,
    decrementQuantity,
  }
}, {
  // Persist only cartItems to localStorage — not the full product catalogue
  persist: {
    key: 'xeram-cart',
    storage: localStorage,
    paths: ['cartItems'],
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
