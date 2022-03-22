import App from './App'
import { createApp } from 'vue'
import {RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router' 


const modules = import.meta.glob("./stories/**/*.tsx")

async function run(){

  const routes : RouteRecordRaw[] = []

  for(let key in modules) {
    const mod = await modules[key]()
    for(let key in mod) {
      mod[key].displayName = key 
      routes.push({
        path : '/' + key.toLowerCase(),
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


