<template>
  <div class="app">
    <div class="nav">

      <div class="back-button" @click="goToMain"> &lt; Back</div>
      <input v-model="email" v-on:keyup.enter="changeInbox" id="email"/> @{{domain}}
      <button @click="changeInbox" class="pure-button pure-button-primary fetch-button">Retrieve Emails</button>
      <pulse-loader v-if="refreshing" class="loading"></pulse-loader>
    </div>
    <div class="content">
      <div class="left">
        <vue-scroll :ops="vueScrollBarOps">
          <table class="pure-table message-list">
            <tr class="message-list-headers">
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
            <p>
              There for no messages for this kitten :(<br/><br/>
              Press on the 'Refresh' button if you want to overwork the kittens...
            </p>
            <button class="pure-button pure-button-primary" @click="refreshList" v-if="!refreshing">Refresh</button>
            <pulse-loader v-if="refreshing"></pulse-loader>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'Inbox',
  data: () => {
    return {
      email: '',
      refreshing: false,
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
    domain () {
      return config.domain
    }
  },

  mounted () {
    let currentEmail = this.$route.params.email
    if (currentEmail === '') {
      this.$router.push({name: 'Kitten Land'})
    }

    this.email = currentEmail
    this.getMessageList()

    this.retrieveMessage = window.setInterval(this.getMessageList, 10000)
  },

  beforeDestroy () {
    window.clearInterval(this.retrieveMessage)
  },

  methods: {
    getMessage (url) {
      let [protocol, empty, host, ...uri] = url.split('/')
      let [region, ...remainingHost] = host.split('.')
      console.log('Protocol: ' + protocol + empty)
      console.log('Domain: ', remainingHost)

      axios.get(config.apiUrl + '/getKey?mailKey=' + region + '-' + uri[uri.length - 1])
        .then(res => {
          this.emailContent = res.data
          this.$eventHub.$emit('iframe_content', res.data['body-html'])
        })
    },
    refreshList () {
      this.refreshing = true
      this.getMessageList()
    },
    getMessageList () {
      axios.get(config.apiUrl + '/list?recipient=' + this.email.toLowerCase())
        .then(res => {
          this.listOfMessages = res.data
          this.refreshing = false
        }).catch((e) => {
          this.refreshing = false
        })
    },
    changeInbox () {
      this.$router.push({
        params: {
          email: this.email
        }
      })
      this.emailContent = {}
      this.$eventHub.$emit('iframe_content', '')
      this.refreshList()
    },

    calculateTime (msg) {
      var date = new Date(Math.round(msg.timestamp * 1000))
      var currentTime = new Date().getTime()
      var difference = currentTime / 1000 - Math.floor(msg.timestamp)
      var timeDisplay = date.toLocaleString()

      if (difference < 60) {
        timeDisplay = Math.round(difference) + ' seconds ago'
      } else if (difference < 3600) {
        timeDisplay = 'about ' + Math.round(Math.floor(difference / 60)) + ' minutes ago'
      } else if (difference < 86400) {
        timeDisplay = 'about ' + Math.round(Math.floor(difference / 3600)) + ' hours ago'
      } else if (difference >= 86400) {
        timeDisplay = 'about ' + Math.round(Math.floor(difference / 86400)) + ' days ago'
      }
      return timeDisplay
    },
    goToMain () {
      this.$router.push({
        name: 'Kitten Land'
      })
    }
  },

  components: {
    MessageDisplay,
    PulseLoader
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
    height: 8vh;
    background: #F3F3F3;
    align-items: baseline;
    justify-content: baseline;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  #email {
    text-align: right;
    margin-right: 0.25rem;
    margin-left: 1rem;
    border-radius: 10px;
    padding-right: 0.5rem;
  }

  .fetch-button {
    align-self: auto;
    margin-left: 1rem;
    order: 2;
  }

  .left {
    width: 40vw;
    border-right: 1px solid lightgray;
  }

  .message-list {
    width: 100%;
    th, td {
      text-align: left;
      font-size: 12px;
      border: 0;
    }

    tr {
      padding-left: 1rem;
      border: 1px solid lightgrey;
    }

    .message-row:hover {
      box-shadow: 2px 1px 2px 2px lightgrey;
      overflow: auto;
      cursor: pointer;
    }
  }

  .message-list-headers {
    background-color: #fffd8c;
  }

  .right {
    flex: 1;
  }

  .content {
    display: flex;
    flex-direction: row;
    align-content: center;
    height: 100%;
    width: 100%;
  }

  .no-mails {
    text-align: center;
    vertical-align: center;
    overflow: hidden;
    margin-top: 2rem;
  }

  .back-button {
    cursor: pointer;
    margin-left: 2rem;
  }

  .loading {
    margin-left:1rem;
    order:3
  }

  @media only screen and (max-width: 800px) {
    .content {
      display: flex;
      flex-direction: column;
    }

    .left {
      width: 100vw;
      border-bottom: 1px solid lightgray;
      margin-bottom: 1rem;
      height: 20vh;
    }
  }
</style>
