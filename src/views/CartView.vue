<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import { formatCurrency } from '@/utils/formatCurrency'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import ConfirmationModal from '@/components/shop/ConfirmationModal.vue'
import { useRevealOnScroll } from '@/composables/useRevealOnScroll'

import { useToast } from '@nuxt/ui/composables/useToast'

const router = useRouter()
const toast = useToast()
const productStore = useProductStore()
const { cartItemsCount, cartItems, totalPrice } = storeToRefs(productStore)
const { incrementQuantity, decrementQuantity, removeItemFromCart, clearCart } = productStore

const handleRemoveItem = (id: number, name: string) => {
  removeItemFromCart(id)
  toast.add({
    title: 'Item Removed',
    description: `${name} has been removed from your vanity.`,
    icon: 'i-lucide-trash-2',
    color: 'neutral'
  })
}

const handleClearCart = () => {
  clearCart()
  toast.add({
    title: 'Vanity Cleared',
    description: 'All items have been removed.',
    icon: 'i-lucide-trash-2',
    color: 'neutral'
  })
}

const viewProductDetails = (productId: number, variantId: number) => {
  router.push(`/shop/details/${productId}/${variantId}`)
}

const proceedToCheckout = () => {
  if (cartItems.value.length === 0) return

  let message = 'Hello! I would like to place an order from the Atelier:\n\n'
  cartItems.value.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.size}) - Qty: ${item.quantity} - ${formatCurrency(item.price * item.quantity)}\n`
  })
  message += `\nTotal: ${formatCurrency(totalPrice.value)}\n`
  message += `\nPlease assist with the clearance. I will provide images of the picked products if needed.`

  const encodedMessage = encodeURIComponent(message)
  // Use a clean wa.me URL that always works regardless of base URL format
  const phoneOrLink = import.meta.env.VITE_WHATSAPP_NUMBER ?? '233596425884'
  const whatsappUrl = `https://wa.me/${phoneOrLink}?text=${encodedMessage}`
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
}


useRevealOnScroll()
</script>

<template>
  <div class="cart-page min-h-screen bg-ivory dark:bg-obsidian pt-8 pb-32">
    <div class="max-w-7xl mx-auto px-6 md:px-12" v-auto-animate>

      <!-- ═══════════════ EDITORIAL HEADER ═══════════════ -->
      <div class="reveal-on-scroll text-center pt-12 pb-20 relative">
        <!-- Background numeral -->
        <span class="absolute inset-0 flex items-center justify-center numeral text-[18rem] md:text-[24rem] text-gold/[0.04] dark:text-gold/[0.06] pointer-events-none select-none -z-0 leading-none">
          {{ String(cartItemsCount).padStart(2, '0') }}
        </span>

        <div class="relative z-10">
          <p class="eyebrow mb-5">Your Selection</p>
          <h1 class="font-editorial text-5xl md:text-7xl lg:text-8xl text-obsidian dark:text-ivory tracking-tight leading-[0.95] mb-6">
            The <span class="italic font-display text-gold-shimmer">Vanity</span>
          </h1>
          <div class="gold-divider mb-6" />
          <p v-if="cartItemsCount > 0" class="text-[10px] tracking-[0.4em] uppercase text-ash font-light">
            {{ cartItemsCount }} {{ cartItemsCount === 1 ? 'composition' : 'compositions' }} reserved
          </p>
        </div>
      </div>

      <!-- ═══════════════ EMPTY STATE ═══════════════ -->
      <div
        v-if="cartItemsCount === 0"
        class="reveal-on-scroll flex flex-col items-center justify-center py-20 text-center"
        :key="1"
      >
        <div class="empty-cart-icon mb-10">
          <UIcon name="i-lucide-shopping-bag" class="size-12 text-gold/40" />
        </div>
        <h2 class="font-editorial text-3xl md:text-4xl text-obsidian dark:text-ivory mb-4">
          The shelf is <span class="italic font-display text-gold">empty.</span>
        </h2>
        <div class="gold-divider mb-6" />
        <p class="font-display italic text-base md:text-lg text-ash mb-12 max-w-md leading-relaxed">
          Every great fragrance begins as a question.<br/>
          Browse the atelier and find your answer.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <RouterLink to="/shop/all-products" class="luxury-btn">
            Visit the Atelier
          </RouterLink>
          <RouterLink to="/about" class="ghost-cart-btn">
            <span>Read Our Story</span>
            <span class="text-gold ml-2">→</span>
          </RouterLink>
        </div>
      </div>

      <!-- ═══════════════ CART WITH ITEMS ═══════════════ -->
      <div v-else class="grid grid-cols-1 gap-12 lg:grid-cols-3" :key="2">

        <!-- LEFT: Cart Items -->
        <div class="lg:col-span-2">
          <div class="gold-divider-full mb-0" />
          <TransitionGroup name="list" tag="ul" v-auto-animate>
            <li
              v-for="(item, idx) in cartItems"
              :key="item.id"
              class="cart-item flex gap-6 py-9 border-b border-gold/10 group"
            >
              <!-- Side numeral -->
              <span class="numeral text-3xl text-gold/30 hidden sm:block flex-shrink-0 w-8 self-start mt-2">
                {{ String(idx + 1).padStart(2, '0') }}
              </span>

              <!-- Thumbnail -->
              <button
                class="cart-thumb flex-shrink-0 w-24 h-32 md:w-28 md:h-36 bg-cream dark:bg-charcoal overflow-hidden border border-gold/10 hover:border-gold/40 transition-all duration-500 relative"
                @click="viewProductDetails(item.productId, item.id)"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-110"
                />
              </button>

              <!-- Details -->
              <div class="flex flex-1 flex-col justify-between min-w-0">
                <div class="flex items-start justify-between gap-4 flex-wrap">
                  <div class="min-w-0">
                    <p class="text-[9px] tracking-[0.4em] uppercase text-gold font-light mb-1.5">
                      Eau de Parfum · {{ item.size }}
                    </p>
                    <h3
                      class="font-editorial text-2xl md:text-3xl text-obsidian dark:text-ivory cursor-pointer hover:text-gold transition-colors duration-400 leading-tight"
                      @click="viewProductDetails(item.productId, item.id)"
                    >
                      {{ item.name }}
                    </h3>
                  </div>
                  <div class="text-right">
                    <p class="text-[9px] tracking-[0.3em] uppercase text-ash font-light mb-1">Subtotal</p>
                    <p class="font-editorial text-2xl md:text-3xl text-obsidian dark:text-ivory">
                      {{ formatCurrency(item.price * item.quantity) }}
                    </p>
                    <p class="text-[10px] text-ash/70 font-light italic mt-1">
                      {{ formatCurrency(item.price) }} each
                    </p>
                  </div>
                </div>

                <div class="flex items-center justify-between mt-5 flex-wrap gap-4">
                  <!-- Qty controls -->
                  <div class="qty-controls flex items-center border border-gold/20">
                    <button
                      class="qty-btn"
                      :disabled="item.quantity <= 1"
                      @click="decrementQuantity(item.id)"
                      aria-label="Decrease quantity"
                    >
                      <span>−</span>
                    </button>
                    <span class="qty-value">{{ item.quantity }}</span>
                    <button
                      class="qty-btn"
                      @click="incrementQuantity(item.id)"
                      aria-label="Increase quantity"
                    >
                      <span>+</span>
                    </button>
                  </div>

                  <!-- Remove -->
                  <ConfirmationModal
                    action-type="remove"
                    :item="{ name: item.name, size: item.size }"
                    @confirm="handleRemoveItem(item.id, item.name)"
                  />
                </div>
              </div>
            </li>
          </TransitionGroup>

          <!-- Bottom actions -->
          <div class="mt-10 flex items-center justify-between flex-wrap gap-6">
            <ConfirmationModal action-type="clear" @confirm="handleClearCart" />
            <RouterLink
              to="/shop/all-products"
              class="hover-line flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-light text-ash hover:text-gold transition-colors duration-400"
            >
              <span class="text-gold">←</span>
              <span>Continue Browsing</span>
            </RouterLink>
          </div>
        </div>

        <!-- RIGHT: Order Summary -->
        <div class="lg:col-span-1">
          <div class="order-summary-panel relative bg-obsidian text-ivory border border-gold/15 overflow-hidden">
            <!-- Decorative corner -->
            <div class="absolute top-4 left-4 corner-tl-sm" />
            <div class="absolute top-4 right-4 corner-tr-sm" />

            <div class="p-9 md:p-10">
              <p class="eyebrow mb-3">Your Order</p>
              <h2 class="font-editorial text-3xl text-ivory mb-3 leading-tight">
                Summary
              </h2>
              <div class="gold-divider mb-9" style="margin-left: 0;" />

              <div class="space-y-5 mb-9">
                <div class="flex justify-between items-baseline">
                  <p class="text-xs tracking-wide text-ash font-light">
                    Subtotal · {{ cartItemsCount }} {{ cartItemsCount === 1 ? 'item' : 'items' }}
                  </p>
                  <p class="text-sm text-ivory font-light">{{ formatCurrency(totalPrice) }}</p>
                </div>
                <div class="flex justify-between items-baseline">
                  <p class="text-xs tracking-wide text-ash font-light">Shipping</p>
                  <p class="text-sm text-gold font-display italic">Complimentary</p>
                </div>
                <div class="flex justify-between items-baseline">
                  <p class="text-xs tracking-wide text-ash font-light">Tax</p>
                  <p class="text-sm text-ivory font-light">{{ formatCurrency(0) }}</p>
                </div>
                <div class="flex justify-between items-baseline">
                  <p class="text-xs tracking-wide text-ash font-light">Gift wrap</p>
                  <p class="text-sm text-gold font-display italic">Always</p>
                </div>
              </div>

              <div class="border-t border-gold/15 pt-7 mb-9">
                <div class="flex justify-between items-baseline">
                  <p class="text-[9px] tracking-[0.4em] uppercase text-ash font-light">Total</p>
                  <p class="font-editorial text-4xl text-ivory">{{ formatCurrency(totalPrice) }}</p>
                </div>
                <p class="text-[10px] tracking-[0.2em] uppercase text-ash/60 font-light italic mt-2 text-right">
                  All taxes included
                </p>
              </div>

              <button 
                class="checkout-btn w-full py-5 text-[10px] tracking-[0.4em] uppercase font-light mb-5"
                @click="proceedToCheckout"
                :disabled="cartItemsCount === 0"
              >
                <span>Proceed to Checkout</span>
                <span class="ml-2">→</span>
              </button>

              <!-- Trust strip -->
              <div class="grid grid-cols-3 gap-2 pt-7 border-t border-gold/15 text-center">
                <div>
                  <UIcon name="i-heroicons-lock-closed" class="size-3 text-gold/70 mx-auto mb-1" />
                  <p class="text-[8px] tracking-[0.25em] uppercase text-ash/60 font-light">Secure</p>
                </div>
                <div class="border-x border-gold/10">
                  <UIcon name="i-heroicons-truck" class="size-3 text-gold/70 mx-auto mb-1" />
                  <p class="text-[8px] tracking-[0.25em] uppercase text-ash/60 font-light">Tracked</p>
                </div>
                <div>
                  <UIcon name="i-heroicons-arrow-path" class="size-3 text-gold/70 mx-auto mb-1" />
                  <p class="text-[8px] tracking-[0.25em] uppercase text-ash/60 font-light">7-day Returns</p>
                </div>
              </div>
            </div>

            <!-- Bottom corners -->
            <div class="absolute bottom-4 left-4 corner-bl-sm" />
            <div class="absolute bottom-4 right-4 corner-br-sm" />
          </div>

          <!-- Promotional whisper -->
          <p class="text-center mt-6 text-[10px] tracking-[0.3em] uppercase text-ash/70 font-light italic">
            ✦ Hand-wrapped in Accra ✦
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {}

.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-cream { background-color: #f0ebe4; }
.bg-charcoal { background-color: #1a1a1a; }
.text-gold { color: #c9a84c; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }

.gold-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
  margin: 0 auto;
}
.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
}

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
  animation: shimmer-x 4s linear infinite;
}
@keyframes shimmer-x {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* Empty cart */
.empty-cart-icon {
  width: 88px;
  height: 88px;
  border: 1px solid rgba(201,168,76,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.empty-cart-icon::before,
.empty-cart-icon::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 1px;
  background: rgba(201,168,76,0.5);
}
.empty-cart-icon::before { top: 50%; left: -18px; }
.empty-cart-icon::after { top: 50%; right: -18px; }

.ghost-cart-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.05rem 2rem;
  color: #0a0a0a;
  font-size: 0.65rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
  transition: all 0.4s ease;
  text-decoration: none;
  border: 1px solid rgba(10, 10, 10, 0.2);
}
.dark .ghost-cart-btn { color: #f5f0eb; border-color: rgba(245, 240, 235, 0.2); }
.ghost-cart-btn:hover {
  color: #c9a84c;
  border-color: rgba(201, 168, 76, 0.6);
  letter-spacing: 0.4em;
}

/* Qty */
.qty-controls {
  background: transparent;
}
.qty-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-right: 1px solid rgba(201,168,76,0.15);
  cursor: none;
  color: #888;
  font-size: 14px;
  transition: all 0.3s ease;
}
.qty-btn:last-child { border-right: none; border-left: 1px solid rgba(201,168,76,0.15); }
.qty-btn:hover { background: rgba(201,168,76,0.1); color: #c9a84c; }
.qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.qty-value {
  width: 44px;
  text-align: center;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: #0a0a0a;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
}
.dark .qty-value { color: #f5f0eb; }

/* Order Summary */
.order-summary-panel {
  position: sticky;
  top: 100px;
}

.checkout-btn {
  background: #c9a84c;
  color: #0a0a0a;
  border: 1px solid #c9a84c;
  cursor: none;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}
.checkout-btn:hover {
  background: transparent;
  color: #c9a84c;
  letter-spacing: 0.5em;
}

/* Corners */
.corner-tl-sm, .corner-tr-sm, .corner-bl-sm, .corner-br-sm {
  width: 12px;
  height: 12px;
  border-color: rgba(201,168,76,0.5);
  pointer-events: none;
}
.corner-tl-sm { border-top: 1px solid; border-left: 1px solid; }
.corner-tr-sm { border-top: 1px solid; border-right: 1px solid; }
.corner-bl-sm { border-bottom: 1px solid; border-left: 1px solid; }
.corner-br-sm { border-bottom: 1px solid; border-right: 1px solid; }

/* Hover line */
.hover-line {
  position: relative;
  display: inline-block;
  cursor: none;
  text-decoration: none;
}
.hover-line::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  height: 1px;
  background: #c9a84c;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-line:hover::after { transform: scaleX(1); }

/* List transitions */
.list-enter-active,
.list-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.list-enter-from { opacity: 0; transform: translateX(-20px); }
.list-leave-to { opacity: 0; transform: translateX(20px); }
</style>
