import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignUp from '@/views/SignUp.vue'
import Login from "@/views/Login";
import Category from "@/views/Category"
import Product from "@/views/Product";
import Cart from "@/views/Cart";
import SingleOrder from "@/views/SingleOrder";
import Order from "@/views/Order";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/order/:ref',
    name: 'order-single',
    component: SingleOrder
  },
  {
    path: '/orders',
    name: 'orders',
    component: Order
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router