import { createWebHistory, createRouter } from "vue-router";
import store from '../store';
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from '../views/Login'
import NotFound from '../views/NotFound'
import Products from '../views/Products'
import NewProduct from '../views/NewProduct'
import EditProduct from '../views/EditProduct'
import Users from '../views/Users'
import MyCard from '../views/MyCard'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: '/login',
    name: "Login",
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/products',
    name: "Products",
    component: Products,
    meta: { requiresAuth: true },
  },
  {
    path: '/products/create',
    name: "NewProduct",
    component: NewProduct,
    meta: { requiresAuth: true },
  },
  {
    path: '/products/:id/edit',
    name: "EditProduct",
    component: EditProduct,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/cards',
    name: 'MyCard',
    component: MyCard,
    meta: { requiresAuth: true }
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
