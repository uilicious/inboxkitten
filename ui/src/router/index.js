import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/landingpage.vue'
import Inbox from '@/components/mail/inbox.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Kitten Land',
      component: LandingPage
    },
    {
      path: '/inbox/:email',
      name: 'Inbox',
      component: Inbox
    }
  ]
})
