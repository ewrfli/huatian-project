import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  watch,
  ref,
} from "vue"
import classes from "./listview.module.scss"

export const ListView = defineComponent({
  props: {
    onBottom: {
      type: Function as PropType<() => Promise<unknown>>,
    },
  },
  setup({onBottom}, ctx) {
    
    const bottomRef = ref<HTMLDivElement | null>(null)
    const loading = ref(false)

    ctx.expose({
      scrollToBottom : () => {
        window.scrollTo(0, Number.MAX_SAFE_INTEGER)
      }
    })
    
    watch(bottomRef, () => {
      if(!bottomRef.value) {
        return
      }
      const options : IntersectionObserverInit = {
        root : null,
        threshold : [0.5, 0.75, 1.0],
        rootMargin : '100px'
      }

      const intersectionHandler : IntersectionObserverCallback  = async (entries) => {
        if(loading.value) {
          return
        }

        for(let entry of entries) {
          if(onBottom) {
            loading.value = true
            try{
              await onBottom()
            }finally {
              loading.value = false
            }
          }
        }
      }

      const observer = new IntersectionObserver(intersectionHandler, options)
      observer.observe(bottomRef.value)
    })

    return () => {
      return (
        <div class={classes.listview}>
          {ctx.slots.default!()}
          <div ref={bottomRef} class={classes['bottom-bar']}></div>
        </div>
      )
    }
  },
})
