import {defineComponent, PropType} from 'vue'
import classes from './layout.module.scss'

export const Flex = defineComponent({
  props: {
    type: {
      type: String as PropType<'row' | 'column'>,
      default: 'row',
    },
    class : {
      type : String,
    },
    align : {
      type : String as PropType<'flex-start' | 'center' | 'flex-end'>
    },
    flex : {
      type : Number,
      required : false
    },
    justify : {
      type: String as PropType<'flex-start' | 'flex-end' | 'center' | 'space-between'>
    }
  },
  setup(props, context) {
    return () => {
      const finalClass = `${classes.flex} ${
        classes[props.type]
      } ${props.class || ""} ${
        classes["align-" + props.align] || ""
      } ${classes['justify-' + props.justify] || ""}`
      return (
        <div
          class={finalClass}
          style={{ flex: props.flex || "" }}
        >
          {context.slots.default!()}
        </div>
      )
    }
  },
})