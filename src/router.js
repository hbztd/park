import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/UserManager.vue')
    },
    {
      path: '/user2',
      name: 'user2',
      component: () => import('./components/UserEdit.vue')
    },
    {
      path: '/user3',
      name: 'user3',
      component: () => import('./views/UserPermission.vue')
    },
    {
      path: '/user4',
      name: 'user4',
      component: () => import('./components/UserChangePwd.vue')
    },
    {
      path: '/seat',
      name: 'seat',
      component: () => import('./views/Seat.vue')
    },
    {
      path: '/seat2',
      name: 'seat2',
      component: () => import('./views/SeatManager.vue')
    },
    {
      path: '/seat3',
      name: 'seat3',
      component: () => import('./components/SeatEdit.vue')
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('./views/Card.vue')
    },
    {
      path: '/card2',
      name: 'card2',
      component: () => import('./views/CardManager.vue')
    },
    {
      path: '/card3',
      name: 'card3',
      component: () => import('./components/CardEdit.vue')
    },
    {
      path: '/fixed',
      name: 'fixed',
      component: () => import('./views/Fixed.vue')
    },
    {
      path: '/fixed2',
      name: 'fixed2',
      component: () => import('./views/FixedManager.vue')
    },
    {
      path: '/temp',
      name: 'temp',
      component: () => import('./views/Temp.vue')
    },
    {
      path: '/temp2',
      name: 'temp2',
      component: () => import('./views/TempManager.vue')
    }
  ]
})
