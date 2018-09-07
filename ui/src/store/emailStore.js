import config from '@/../config/apiconfig.js'

// State
const state = {
  currentEmail: '',
  domain: config.domain,
  apiUrl: config.apiUrl
}

const mutations = {
  changeEmail: function (state, value) {
    state.currentEmail = value
  }
}

const getters = {}

const actions = {}

export default {
  mutations,
  state,
  getters,
  actions
}
