<script setup lang="ts">
import { computed, ref } from 'vue'

const open = ref(false)

const props = defineProps<{
  actionType: 'remove' | 'clear'
  item?: { name: string; size: string }
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const title = computed(() => (props.actionType === 'remove' ? 'Remove from Cart' : 'Clear the Cart'))

const handleConfirm = () => {
  emit('confirm')
  open.value = false
}
</script>

<template>
  <div>
    <!-- Trigger button -->
    <button
      v-if="props.actionType === 'remove'"
      @click="open = true"
      class="trigger-remove text-[10px] tracking-[0.3em] uppercase text-ash hover:text-gold transition-colors duration-300 font-light flex items-center gap-2"
      aria-label="Remove item"
    >
      <span class="trigger-x">×</span>
      <span>Remove</span>
    </button>

    <button
      v-else
      @click="open = true"
      class="trigger-clear text-[10px] tracking-[0.3em] uppercase text-ash hover:text-gold transition-colors duration-300 font-light flex items-center gap-2"
    >
      <span>Clear cart</span>
    </button>

    <!-- Modal overlay -->
    <transition name="modal-bg">
      <div
        v-if="open"
        class="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="open = false"
      >
        <transition name="modal-card">
          <div
            v-if="open"
            class="modal-card relative bg-obsidian border border-gold/20 max-w-md w-full"
          >
            <!-- Corners -->
            <div class="absolute top-3 left-3 corner-tl-sm" />
            <div class="absolute top-3 right-3 corner-tr-sm" />
            <div class="absolute bottom-3 left-3 corner-bl-sm" />
            <div class="absolute bottom-3 right-3 corner-br-sm" />

            <div class="p-10 md:p-12">
              <!-- Header -->
              <p class="eyebrow mb-4">Confirm</p>
              <h3 class="font-editorial text-3xl text-ivory leading-tight mb-4">
                {{ title }}
              </h3>
              <div class="gold-divider mb-8" style="margin-left: 0;" />

              <!-- Message -->
              <p v-if="props.actionType === 'remove'" class="font-display italic text-base text-ash leading-relaxed mb-10">
                Are you sure you'd like to remove
                <span class="text-ivory">{{ props.item?.name }}</span>
                <span v-if="props.item?.size" class="text-gold/80"> · {{ props.item.size }}</span>
                from your cart?
              </p>
              <p v-else class="font-display italic text-base text-ash leading-relaxed mb-10">
                This will remove every composition from your cart. Your shelf will be cleared.
              </p>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  @click="open = false"
                  class="modal-btn modal-btn-cancel py-3.5 px-7 text-[10px] tracking-[0.4em] uppercase font-light"
                >
                  Cancel
                </button>
                <button
                  @click="handleConfirm"
                  class="modal-btn modal-btn-confirm py-3.5 px-7 text-[10px] tracking-[0.4em] uppercase font-light"
                >
                  {{ props.actionType === 'remove' ? 'Remove' : 'Clear All' }}
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.modal-backdrop {
  background: rgba(5, 5, 5, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.modal-card {
  background: #0a0a0a;
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(201, 168, 76, 0.05);
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

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, #c9a84c, transparent);
}

.text-gold { color: #c9a84c; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }

/* Triggers */
.trigger-remove, .trigger-clear {
  background: transparent;
  border: none;
  cursor: none;
  font-family: 'Inter', sans-serif;
}
.trigger-x {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(201,168,76,0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  transition: all 0.3s ease;
}
.trigger-remove:hover .trigger-x {
  border-color: #c9a84c;
  background: #c9a84c;
  color: #0a0a0a;
}

/* Modal buttons */
.modal-btn {
  cursor: none;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-btn-cancel {
  background: transparent;
  border: 1px solid rgba(245, 240, 235, 0.2);
  color: #ccc;
}
.modal-btn-cancel:hover {
  border-color: rgba(245, 240, 235, 0.4);
  color: #f5f0eb;
}

.modal-btn-confirm {
  background: #c9a84c;
  border: 1px solid #c9a84c;
  color: #0a0a0a;
}
.modal-btn-confirm:hover {
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

/* Modal transitions */
.modal-bg-enter-active, .modal-bg-leave-active { transition: opacity 0.4s ease; }
.modal-bg-enter-from, .modal-bg-leave-to { opacity: 0; }

.modal-card-enter-active { transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-card-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.modal-card-enter-from, .modal-card-leave-to { opacity: 0; transform: translateY(20px) scale(0.96); }
</style>
