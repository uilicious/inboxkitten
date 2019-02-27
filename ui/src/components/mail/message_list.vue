<template>
    <vue-scroll :ops="vueScrollBarOps">
      <pulse-loader v-if="refreshing" class="loading"></pulse-loader>
      <div class="table-box" v-if="listOfMessages.length > 0">
        <div :class="rowCls(index)" v-for="(msg, index) in listOfMessages" :key="msg.url"
             @click="getMessage(msg.storage.url)">

          <div class="row-info">
            <div class="row-name">{{formatName(msg.message.headers.from)}}</div>
            <div class="row-subject">{{(msg.message.headers.subject)}}</div>
          </div>

          <div class="row-time">{{calculateTime(msg)}}</div>
        </div>
      </div>
      <div class="no-mails" v-if="listOfMessages.length == 0">
        <p>
          There for no messages for this kitten :(<br/><br/>
          Press on the 'Refresh' button if you want to overwork the kittens...
        </p>
        <button class="refresh-button" @click="refreshList" v-if="!refreshing">Refresh</button>
      </div>
    </vue-scroll>
</template>

<script>
import NavBar from '../NavBar.vue'
import 'normalize.css'
import config from '@/../config/apiconfig.js'
import axios from 'axios'
import moment from 'moment'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'MessageList',
  data: () => {
    return {
      listOfMessages: [],
      vueScrollBarOps: {
        bar: {
          background: 'darkgrey'
        }
      },
      refreshing: false
    }
  },
  mounted () {
    let currentEmail = this.$route.params.email
    if (currentEmail === '') {
      this.$router.push({name: 'Kitten Land'})
    }

    this.getMessageList()

    this.retrieveMessage = window.setInterval(this.getMessageList, 10000)

    this.$eventHub.$on('refreshInbox', this.getMessageList)
    this.$eventHub.$on('refresh', this.getMessageList)
  },
  beforeDestroy () {
    window.clearInterval(this.retrieveMessage)

    this.$eventHub.$off('refreshInbox', this.getMessageList)
    this.$eventHub.$off('refresh', this.getMessageList)
  },
  methods: {
    refreshList () {
      this.refreshing = true
      this.getMessageList()
    },
    getMessageList () {
      this.refreshing = true
      let email = this.$route.params.email
      axios.get(config.apiUrl + '/list?recipient=' + email)
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

    getMessage (url) {
      let [protocol, empty, host, ...uri] = url.split('/')
      let [region, ...remainingHost] = host.split('.')
      let mailkey = region + '-' + uri[uri.length - 1]
      this.$router.push({
        name: 'Detail',
        params: {
          key: mailkey
        }
      })

      this.$eventHub.$emit('getMessage', '')
    },

    //
    // Utility Functions
    //

    calculateTime (msg) {
      let now = moment()
      let theDate = moment(msg.timestamp * 1000)
      let diff = now.diff(theDate, 'day')
      if (diff === 0) {
        return theDate.format('hh:mm a')
      } else if (diff > 0) {
        return theDate.format('DD MMM')
      }
    },

    formatName (sender) {
      // Sender does not contain any formatted name, do not format them
      if (sender.includes('<') || sender.includes('>')) {
        let [name, emailUnformatted, ...rest] = sender.split(' <')
        let [email, ...unknown] = emailUnformatted.split('>')
        return email
      }
      return sender
    },

    rowCls (index) {
      if (index % 2 === 0) {
        return 'table-row even'
      }
      return 'table-row odd'
    }
  },
  components: {
    NavBar: NavBar,
    PulseLoader: PulseLoader
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '@/scss/_color.scss';

  .table-box {
    width: 100%;
    height: auto;
    .table-row {
      display: flex;
      flex-direction: row;
      /*justify-content: space-evenly;*/
      justify-content: flex-start;
      border: 3px solid white;
      border-bottom: 3px solid #20a0ff;

      .row-info {
        width: 75%;

        .row-name {
          font-weight: bold;
          text-align: left;
        }
      }
    }
  }

  .table-row:hover {
    border: 3px solid black;
    background-color: $cta-hover;
  }

  .no-mails {
    text-align: center;
    vertical-align: center;
    overflow: auto;
    margin-top: 2rem;
    z-index: 10;
  }

  .refresh-button {
    border: 3px solid black;
    background-color: $cta-base;
    color: $cta-base-text;
  }

  .refresh-button:hover {
    background-color: $cta-hover;
    color: $cta-hover-text;
  }

  .loading {
    z-index:9;
    position:absolute;
    padding-top: 5rem;
    left:50%;
  }

  @media (min-width: 760px) {
    .table-row {
      padding: 1rem;
      .row-info {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        .row-name {
        }
      }
      border-bottom: 1px solid #20a0ff;
    }
  }

  @media (max-width: 760px) {
    .table-row {
      display: flex;
      flex-direction: row;
      width: 98vw;
      margin: auto;
      background-color: white;
      border-bottom: 1px solid #20a0ff;

      .row-info {
        text-align: left;
        padding-left: 0.5rem;
        .row-name {
          font-size: 1rem;
          font-weight: bold;
          padding: 0.5rem;
          /*background: #06FFAB;*/
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .row-subject {
          /*background-color: coral;*/
          width: 100%;
          padding-left: 0.5rem;
          padding-bottom: 0.5rem;
          font-size: 0.75rem;
          font-weight: bold;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      .row-time {
        width: 20%;
        font-size: 12px;
        text-align: center;
        vertical-align: middle;
        padding: 0.5rem;
        padding-left: 0;
      }
    }

    .loading{
      left:40%;
    }
  }
</style>
