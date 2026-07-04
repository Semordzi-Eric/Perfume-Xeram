import { useToast } from '@nuxt/ui/composables/useToast'
export function useShowToast() {
  const toast = useToast()

  const show = (text: string, duration: number = 3000, color: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    toast.add({
      title: text,
      duration,
      color: color as any,
    })
  }

  return { show }
}
