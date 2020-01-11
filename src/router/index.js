import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresNavBar: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresNavBar: true }

  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { requiresNavBar: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: { requiresNavBar: false }
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/Terms.vue'),
    meta: { requiresNavBar: true }
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('../views/Books.vue'),
    meta: { requiresNavBar: true }
  },
  {
    path:'/search',
    name:'search',
    component: () => import('../views/Search.vue'),
    meta: {requiresNavBar: true }
  },
  {
    path:'/loans',
    name:'loans',
    component: () => import('../views/Loans.vue'),
    meta: {requiresNavBar: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.fullPath == '/login' || to.fullPath == '/register') {
    if (store.state.loggedIn) {
      console.log("Logged IN");
      next('/books');
    }
    else {
      next();
    }
  }
  next();
});


export default router
