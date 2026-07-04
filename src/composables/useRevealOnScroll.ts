import { onMounted, onUnmounted } from 'vue'

/**
 * Shared composable that drives the .reveal-on-scroll animation.
 * Creates a single IntersectionObserver, disconnects it when the
 * component is unmounted to prevent memory leaks.
 */
export function useRevealOnScroll(threshold = 0.1) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('revealed')
        }),
      { threshold },
    )
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer!.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })
}
