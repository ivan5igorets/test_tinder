import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: () => import(/* webpackChunkName: "about" */ '../views/Start.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue'),
    beforeEnter: (to, from, next) => {
      console.log(from);
      if (from.name !== 'Start' && from.name !== 'Final') {
        next({name: 'Start'})
      } else {
        next()
      }
    }
  },
  {
    path: '/final',
    name: 'Final',
    component: () => import(/* webpackChunkName: "about" */ '../views/Final.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name !== 'Main') {
        next({name: 'Start'})
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
