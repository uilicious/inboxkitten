// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import email from './store/emailStore'

Vue.config.productionTip = false

let store = new Vuex.Store({
  modules: {
    email: email
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>',
  created () {
    this.$eventHub = new Vue({
      name: 'EventHub',
      parent: this,
      functional: true
    })
  }
})
