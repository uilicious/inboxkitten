import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import LandingPage from '@/landingpage.vue'
import KittenRouter from '@/kittenrouter.vue'
import Inbox from '@/components/mail/inbox.vue'
import MessageDetail from '@/components/mail/message_detail.vue'
import MessageList from '@/components/mail/message_list.vue'
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'

Vue.mixin({
  created () {
    // pass the event hub down to descendents
    if (!this.$eventHub && this.$root.$eventHub) {
      this.$eventHub = this.$root.$eventHub
    }
  }
})

Vue.use(Vuex)
Vue.use(Router)
Vue.use(vuescroll)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Kitten Land',
      component: LandingPage
    },
    {
      path: '/inbox/:email',
      name: 'Inbox',
      redirect: {name: 'List'},
      component: Inbox,
      children: [
        {
          path: '',
          redirect: {name: 'List'}
        },
        {
          path: 'list',
          name: 'List',
          component: MessageList
        },
        {
          path: 'message/:region/:key',
          name: 'Message',
          component: MessageDetail
        },
        {
          path: '*',
          redirect: {name: 'List'}
        }
      ]
    },
    {
      path: '/kittenrouter',
      name: 'KittenRouter',
      component: KittenRouter
    },
    {
      path: '*',
      redirect: {name: 'Kitten Land'}
    }
  ]
})
