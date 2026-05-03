const props = defineProps({
  text: String,
  duration: Number,
  type: String,
})

const toast = useToast()

export function useShowToast() {
  toast.add({
    title: props.text,
    duration: props.duration,
    color: 'success',
  })
}
