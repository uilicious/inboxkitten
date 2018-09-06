<template>
  <div class="app">
    <div class="nav">
      <input v-model="email" v-on:keyup.enter="changeInbox" id="email"/> @inboxkitten.com
      <button @click="changeInbox" class="pure-button fetch-button">Fetch!</button>
    </div>
    <div class="content">
      <div class="left">
        <vue-scroll :ops="vueScrollBarOps" >
          <table class="pure-table message-list">
            <tr>
              <th>Subject</th>
              <th>From</th>
              <th>Time</th>
            </tr>
            <tr class="message-row" v-for="msg in listOfMessages" :key="msg.url" @click="getMessage(msg.storage.url)">
              <td>{{msg.message.headers.subject}}</td>
              <td>{{msg.message.headers.from}}</td>
              <td>{{calculateTime(msg)}}</td>
            </tr>
          </table>
          <div class="no-mails" v-if="listOfMessages.length == 0">
            There for no messages for this kitten :(
          </div>
        </vue-scroll>
      </div>
      <message-display :emailContent="emailContent" class="right"></message-display>
    </div>
  </div>
</template>

<script>
import MessageDisplay from './MessageDisplay.vue'
import config from '@/../config/apiconfig.js'
import axios from 'axios'

export default {
  name: 'Inbox',
  data: () => {
    return {
      viewMessageDetail: false,
      email: '',
      emailContent: {},
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
      axios.get(config.apiUrl + '/getUrl?url=' + url)
        .then(res => {
          this.emailContent = res.data
          this.$eventHub.$emit('iframe_content', res.data['body-html'])
        })
    },
    getMessageList () {
      axios.get(config.apiUrl + '/list?recipient=' + this.email.toLowerCase() + '@test.popskitten.com')
        .then(res => {
          this.listOfMessages = res.data
        })
    },
    changeInbox () {
      this.$store.commit('changeEmail', this.email)
      this.emailContent = {}
      this.$eventHub.$emit('iframe_content', '')
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
    MessageDisplay
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">

  .app {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    box-shadow: 2px 2px 3px 3px darkgray;
  }

  .nav {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10vh;
    background: #F3F3F3;
    align-items: center;
    justify-content: baseline;
  }

  #email{
    text-align: right;
    margin-right: 0.25rem;
    margin-left:2rem;
    border-radius: 10px;
    padding-right: 0.5rem;
  }

  .fetch-button {
    align-self:auto;
    margin-left: 1rem;
    margin-bottom:1rem;
    order:2;
  }

  .left {
    width: 40vw;
    border-right: 1px solid lightgray;
  }

  .message-list {
    width: 100%;
    th,td{
      text-align: left;
      font-size: 12px;
      border: 0;
    }

    tr{
      padding-left: 1rem;
      border: 1px solid lightgrey;
    }

    .message-row:hover {
      box-shadow: 2px 1px 2px 2px lightgrey;
      overflow: auto;
      cursor: pointer;
    }
  }

  .right {
    flex:1;
  }

  .content {
    display: flex;
    flex-direction: row;
    align-content: center;
    height: 100%;
    width:100%;
  }

  .no-mails {
    text-align: center;
    vertical-align: center;
    overflow: hidden;
  }
</style>
