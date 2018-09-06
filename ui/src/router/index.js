import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import LandingPage from '@/landingpage.vue'
import Inbox from '@/components/mail/inbox.vue'
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(vuescroll)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Kitten Land',
      component: LandingPage
    },
    {
      path: '/inbox',
      name: 'Inbox',
      component: Inbox
    }
  ]
})
