<template>
  <div class="app">
    <div class="nav">
      <div class="left">Hello {{email}}</div>
      <div class="right nav-right">
        <div>
          <button v-if="viewMessageDetail" @click="viewMessageDetail = !viewMessageDetail">Back</button>
        </div>

        <div class="email-input">
          <input v-model="email" v-on:keyup.enter="changeInbox"/> @inboxkitten.com
        </div>
      </div>
    </div>
    <div class="content">
      <div class="sidebar left">
        sidebar
      </div>
      <vue-scroll classes="right" :ops="vueScrollBarOps" v-if="!viewMessageDetail">
        <div>
          <div class="no-mails" v-if="listOfMessages.length == 0">
            There for no messages for this kitten :(
          </div>
          <div v-for="msg in listOfMessages" :key="msg.url" @click="getMessage(msg.url)">
            <message-box :message="msg" :timeCalculated="calculateTime(msg)"></message-box>
          </div>
        </div>
      </vue-scroll>
      <vue-scroll classes="right" v-if="viewMessageDetail">
        <div>

        </div>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import MessageBox from './MessageBox.vue'
import config from '@/../config/apiconfig.js'
import axios from 'axios'

export default {
  name: 'Inbox',
  data: () => {
    return {
      viewMessageDetail: false,
      email: '',
      listOfMessages: [],
      vueScrollBarOps: {
        bar: {
          background: 'darkgrey'
        }
      }
    }
  },
  computed: {

    currentEmail: {
      get: function () {
        return this.$store.state.email.currentEmail
      }
    }

  },

  mounted () {
    if (this.currentEmail === '') {
      this.$router.push({name: 'Kitten Land'})
    }

    this.email = this.currentEmail
    this.getMessageList()
  },

  methods: {
    getMessage (url) {
      this.viewMessageDetail = true
    },
    getMessageList () {
      axios.get(config.apiUrl + '/list?recipient=' + this.email.toLowerCase() + '@test.popskitten.com')
        .then(res => {
          this.listOfMessages = res.data
        })
    },
    changeInbox () {
      this.$store.commit('changeEmail', this.email)
      this.getMessageList()
    },

    calculateTime (msg) {
      var date = new Date(Math.round(msg.timestamp * 1000))
      var currentTime = new Date().getTime()
      var difference = currentTime / 1000 - Math.floor(msg.timestamp)
      var timeDisplay = date.toLocaleString()

      if (difference < 60) {
        timeDisplay = difference + ' seconds ago'
      } else if (difference < 3600) {
        timeDisplay = 'about ' + Math.floor(difference / 60) + ' minutes ago'
      } else if (difference < 86400) {
        timeDisplay = 'about ' + Math.floor(difference / 3600) + ' hours ago'
      } else if (difference >= 86400) {
        timeDisplay = 'about ' + Math.floor(difference / 86400) + ' days ago'
      }
      return timeDisplay
    }
  },

  components: {
    MessageBox
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">

  .app {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 85vh;
    width: 90vw;
    left: 5%;
    box-shadow: 2px 2px 3px 3px darkgray;
  }

  .nav {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10vh;
    background: #F3F3F3;
    align-items: center;
    justify-content: center;
  }

  .nav-right {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: baseline;
    margin-right: 1rem;
  }

  .left {
    width: 30vw;
  }

  .right {
    flex-grow: 1;
  }

  input {
    text-align: right;
  }

  .email-input {
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    justify-content: flex-end;
    flex-grow: 1;
  }

  .content {
    display: flex;
    flex-direction: row;
    align-content: center;
    height: 100%;
  }

  .sidebar {
    background-color: #F3F3F3;
    height: 100%;
  }

  .no-mails {
    text-align: center;
    vertical-align: center;
    overflow: hidden;
  }
</style>
