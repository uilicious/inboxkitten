import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/landingpage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main page',
      component: LandingPage
    }
  ]
})
