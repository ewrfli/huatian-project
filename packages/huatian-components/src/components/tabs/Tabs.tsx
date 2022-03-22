import { defineComponent, PropType, reactive, ref, Ref, provide, inject } from "vue";
import classes from './tabs.module.scss'


type RenderMenuItem = ({isActive} : {isActive : boolean}) => JSX.Element
type TabMenu = {
  render : RenderMenuItem
}
const _Tabs = defineComponent({
  props : {
    defaultActiveIndex : {
      type : Number
    },
    scrollBehavior : {
      type : String as PropType<"body" | "inner">,
      default : "body"
    }
  },
  setup(props, context) {

    const tabs = reactive<Array<TabMenu>>([])
    const activeIndex = ref(props.defaultActiveIndex || 0)
    provide('tabs', tabs)
    
    return () => {
      const defaultSlot = context.slots.default!
      const vNodes = defaultSlot().map( (vNode, i) => {
        if(!vNode.props) {
          vNode.props = {}
        }
        if(!vNode.props.style) {
          vNode.props.style = {}
        }
        if(props.scrollBehavior === 'body') {
          vNode.props.style.overflow = 'unset' 
        } else {

          vNode.props.style['overflow'] = 'auto' 
        }
        vNode.props.index = i
        vNode.props.activeIndex = activeIndex.value 
        return vNode
      })
      return (
        <div class={classes.tabs}>
          {vNodes}
          <TabMenu
            scrollBehavior={props.scrollBehavior}
            onActiveIndexChanged={(idx) => {
              activeIndex.value = idx
            }}
            tabs={tabs}
            activeIndex={activeIndex.value}
          />
        </div>
      )
    }
  }
})

const TabMenu = ({
  tabs,
  activeIndex,
  onActiveIndexChanged,
  scrollBehavior,
}: {
  tabs: TabMenu[]
  activeIndex: number
  onActiveIndexChanged?: (index: number) => void
  scrollBehavior: "body" | "inner"
}) => {
  return (
    <div class={classes.menu} style={{
      position : scrollBehavior === 'body' ? "fixed" : 'absolute'
    }}>
      {tabs.map((tab, i) => {
        return (
          <div
            
            class={classes["menu-item"]}
            onClick={() => {
              onActiveIndexChanged &&
                activeIndex !== i &&
                onActiveIndexChanged(i)
            }}
          >
            {tab.render({ isActive: activeIndex === i })}
          </div>
        )
      })}
    </div>
  )
}

const Tab = defineComponent({
  props : {
    renderMenu : {
      required : true,
      type : Function as PropType<RenderMenuItem>
    },
    activeIndex : {
      type : Number,
      // required : true
    },
    index : {
      type : Number,
      //required : true
    },
    style : {
      type : Object
    }
  },
  setup(props, context){
    const tabs = inject("tabs") as TabMenu[]
    tabs.push({
      render : props.renderMenu
    })
    return () => {
      const defaultSlot = context.slots.default!
      const show = props.activeIndex === props.index
      if(!show) {
        return null
      }
      return <div class={classes.tab} style={{
        // display : show ? 'block' : 'none',
        ...props.style
      }}>
        {defaultSlot()}
      </div>
    }
  }

})

_Tabs.Tab = Tab

export const Tabs  = _Tabs as typeof _Tabs & {
  Tab : typeof Tab
}

