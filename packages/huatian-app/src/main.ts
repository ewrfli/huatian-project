import App from './App'
import { createApp } from 'vue'
import {RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router' 

const modules = import.meta.glob("./pages/**/*.tsx")

async function run(){

  const routes : RouteRecordRaw[] = []

  for(let key in modules) {
    const mod = await modules[key]()
    for(let key in mod) {

      mod[key].displayName = key 
      if(key === 'Home') {
        routes.push({
          path : '/',
          name : 'home',
          component: mod['Home']
        })
        continue
      }

      let routePath = '/' + key.toLowerCase()
      if(mod[key].route) {
        routePath = mod[key].route.path
      }

      routes.push({
        path : routePath, 
        name : key,
        component : mod[key] 
      })
    }
  }



  const history = createWebHashHistory()

  const router = createRouter({
    routes,
    history
  })

  const app = createApp(App, {routes})
  app.use(router)
  app.mount('#app')
}

run()



