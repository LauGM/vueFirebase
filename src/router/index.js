import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/RegisterView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/CarritoView.vue')
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('../views/InfoView.vue')
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/NewView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/TablaView.vue')
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: () => import('../views/PedidosView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
