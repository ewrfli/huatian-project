import { defineComponent, PropType, provide } from "vue"
import { RouteRecordRaw, RouterView } from "vue-router"
import classes from "./app.module.scss"
import "./main.css"

export default defineComponent({
  props: {
    routes: {
      type: Array as PropType<RouteRecordRaw[]>,
      required: true,
    },
  },
  setup() {
    console.log(import.meta.env)
    const token = sessionStorage['token']
    provide('token', token)
  
    return () => {
      if(!token) {
        return <h1>请登录</h1>
      }
      return (
        <>
          <div class={classes.container}>
            <RouterView />
          </div>
        </>
      )
    }
  },
})
