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
    path: '/explore',
    name: 'explore',
    component: () => import('../views/Explore.vue'),
    meta: { requiresNavBar: true }
  },
  {
    path: '/book/:bookId',
    name: 'book',
    component: () => import('../views/Book.vue'),
    meta: { requiresNavBar: true }
  },
  {
    path: '/book/loans/:bookId',
    name: 'bookLoans',
    component: () => import('../views/LoansBook.vue'),
    meta: {requiresNavBar: true}
  },
  {
    path: '/loans',
    name: 'loans',
    component: () => import('../views/Loans.vue'),
    meta: { requiresNavBar: true }
  },
  {
    path: '/books/create',
    name: 'postBook',
    component: () => import('../views/CreateBook.vue'),
    meta: { requiresNavBar: true },
    beforeEnter: (to, from, next) => {
      if (store.state.loggedIn && store.state.rol == 'admin') {
        console.log("ADMIN");
        next();
      }
      else {
        next('/404');
      }
    }
  },
  {
    path: '/500',
    name: 'serverError',
    component: () => import('../components/ServerError.vue'),
    meta: { requiresNavBar: false }
  },
  {
    path: '/403',
    name: 'unauthorized',
    component: () => import('../components/Unauthorized.vue'),
    meta: { requiresNavBar: false }
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('../components/NotFound.vue'),
    meta: { requiresNavBar: false }
  },
  {
    path: '*',
    redirect: '/404'
  },
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
      next('/explore');
    }
    else {
      next();
    }
  }
  next();
});


export default router
