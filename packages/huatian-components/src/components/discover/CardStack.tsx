import {
  defineComponent,
  PropType,
  StyleValue,
  reactive,
  computed,
  watch,
  ref
} from "vue"
import classes from "./cardstack.module.scss"

export type SocialCardProps = {
  id: number
  img: string
}

export const CardStack = defineComponent({
  props: {
    list: {
      type: Array as PropType<SocialCardProps[]>,
      required: true,
    },
    onConfirm : {
      type : Function as PropType<(card : SocialCardProps, like : boolean) => void>
    } 
  },
  setup({ onConfirm }) {
    console.log('setup card stack.')
    function confirm(card: SocialCardProps, like: boolean) {
      onConfirm && onConfirm(card, like)
    }
    return ({list} : {
      list : SocialCardProps[]
    }) => {
      return (
        <div class={classes["card-stack"]}>
          {list.map((card, i) => {
            return (
              <Card
                onConfirm={(card, like) => confirm(card, like)}
                key={card.id}
                card={card}
                index={i}
              />
            )
          })}
        </div>
      )
    }
  },
})

function useTouchEvents(enabled: boolean = true) {
  const diff = reactive({ x: 0, y: 0 })
  const state = ref<"init"|"start"|"release"|"move">("init")
  let startX: number = 0,
    startY: number = 0
  function handleStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      state.value = "start"
    }
  }

  function handleMove(e: TouchEvent) {
    if (e.touches.length === 1) {
      diff.x = e.touches[0].clientX - startX
      diff.y = e.touches[0].clientY - startY
      state.value = "move"
    }
  }

  function handleEnd(e: TouchEvent) {
    state.value = "release"
  }

  return {
    handlers: enabled ? {
      onTouchstart: handleStart,
      onTouchmove: handleMove,
      onTouchend: handleEnd,
    } : {},
    diff,
    state,
    reset : () => {
      diff.x = 0
      diff.y = 0
      state.value = "init"
    }
  }
}

const Card = defineComponent({
  props: {
    card: {
      type: Object as PropType<SocialCardProps>,
      required: true,
    },
    style: {
      type: Object as PropType<StyleValue>,
    },
    index: {
      type: Number,
      required: true,
    },
    onConfirm : {
      type : Function as PropType<(card : SocialCardProps, like: boolean) => void>,
    }
  },
  setup({ card, style, index, onConfirm }) {
    const { handlers, diff, state, reset } = useTouchEvents(index === 0)
   
    const trans = computed(() => {
      const W = window.innerWidth
      const r = diff.x / W
      return [r * 50, diff.x * 0.2]
    })
    
    watch(state, () => {
      if(state.value === "release") {
        if(trans.value[0] > 30) {
          onConfirm && onConfirm(card, true)
        } else if(trans.value[0] < -30) {
          onConfirm && onConfirm(card, false)
        } else {
          reset()
        }

      }
    })

    return () => {
      const style = {
        zIndex: 1000 - index,
        transformOrigin : 'bottom center',
        transform: `translate(${0 + trans.value[1]}px, ${
          index * 10
        }px) scale(${(1 - index / 50).toFixed(2)}) rotateZ(${trans.value[0]}deg)`,
      }
      return (
        <div
          class={classes.card}
          style={style}
          {...handlers}
        >
          <img src={card.img} />
        </div>
      )
    }
  },
})
