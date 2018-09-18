<template>
  <div>
    <nav-bar></nav-bar>
    <vue-scroll :ops="vueScrollBarOps">
      <div class="table-box">
        <div :class="rowCls(index)" v-for="(msg, index) in listOfMessages" :key="msg.url" @click="getMessage(msg.storage.url)">
          <div class="row-icon">
          </div>

          <div class="row-info">
            <div class="row-name">{{formatName(msg.message.headers.from)}}</div>
            <div class="row-subject">{{(msg.message.headers.subject)}}</div>
          </div>

          <div class="row-time">{{calculateTime(msg)}}</div>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
  import NavBar from '../NavBar.vue'
  import 'normalize.css'
  import config from '@/../config/apiconfig.js'
  import axios from 'axios'
  import moment from 'moment'

  export default {
    name: 'inbox',
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
    },

    beforeDestroy () {
      window.clearInterval(this.retrieveMessage)

      this.$eventHub.$off('refreshInbox', this.getMessageList)
    },
    methods: {

      calculateTime (msg) {
        let now = moment()
        let theDate = moment(msg.timestamp*1000)
        console.log()
        let diff = now.diff(theDate, 'day')
        if(diff == 0){
          return theDate.format('hh:mm a')
        } else if (diff > 0){
          return theDate.format('DD MMM')
        }
      },
      refreshList () {
        this.refreshing = true
        this.getMessageList()
      },
      getMessageList () {
        let email = this.$route.params.email
        axios.get(config.apiUrl + '/list?recipient=' + email.toLowerCase())
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
      formatName (sender) {
        let [name, ...rest] = sender.split(' <')
        return name
      },
      rowCls(index){
        if (index%2==0){
          return "table-row even"
        }
        return "table-row odd"
      }
    },
    components: {
      NavBar: NavBar
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '@/scss/_color.scss';

  .table-box {
    width:100%;
    height:auto;
    .table-row {
      .row-info {
      }

    }

    @media (max-width: 760px) {
      .table-row {
        display:flex;
        flex-direction: row;
        width:98vw;
        margin:auto;
        background-color: white;
        border-bottom:1px solid #20a0ff;

        .row-icon {
          width:0;
        }

        .row-info {
          text-align: left;
          padding-left: 0.5rem;
          width: 75%;
          .row-name{
            font-size: 1rem;
            font-weight: bold;
            padding:0.5rem;
            /*background: #06FFAB;*/
            width:100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .row-subject{
            /*background-color: coral;*/
            width:100%;
            padding-left:0.5rem;
            padding-bottom:0.5rem;
            font-size: 0.75rem;
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }

        .row-time{
          width:20%;
          font-size:12px;
          text-align: center;
          vertical-align: middle;
          padding: 0.5rem;
          padding-left:0;
        }
      }

      .table-row:hover{
        border: 3px solid black;
        background-color: $cta-hover;
      }
    }
  }
</style>
