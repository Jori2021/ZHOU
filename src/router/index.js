import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Login',
    component: () => import('../views/Login')
  },
  // {
  //   path:'/home',
  //   name:'Home',
  //   component: () => import('../views/Home'),
  //   children:[
  //     {
  //       path:'/custom',
  //       name:'Customer',
  //       component: () => import('../views/Customer')
  //     },
  //     {
  //       path:'/product',
  //       name:'Product',
  //       component: () => import('../views/Product')
  //     },
  //     {
  //       path:'/entrepot',
  //       name:'Entrepot',
  //       component: () => import('../views/Entrepot')
  //     },
  //     {
  //       path:'/inventory',
  //       name:'Inventory',
  //       component: () =>import('../views/inventory')
  //     },
  //     {
  //       path:'/total',
  //       name:'Total',
  //       component: () =>import('../views/Total')
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export const setRoutes =() => {
  const storeMenu =localStorage.getItem("menusList")
  if(storeMenu) {
    const homeRoute = {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home'),
      children:[]
    }
    const menu = JSON.parse(storeMenu)
    menu.forEach(item => {
      if (item.path.length) {
        let itemMenu = {
          path: item.path,
          name: item.name,
          component: () => import('../views/' + item.pagePath +'.vue')
        }
        homeRoute.children.push(itemMenu)
      }
    })
    const currentRouteNames = router.getRoutes().map(v => v.name)
    if (!currentRouteNames.includes('Home')) {
      router.addRoute(homeRoute)
    }
  }
}
setRoutes()

export default router
