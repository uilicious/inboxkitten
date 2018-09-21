<template>
  <div class="message-details">
    <div class="subject">{{emailContent.subject}}</div>
    <div class="meta-info">
      <div class="left">
        <div class="sender"><b>{{emailContent.name}}</b>{{emailContent.emailAddress}}</div>
        <div class="to">to: {{emailContent.recipients}}</div>
      </div>
      <div class="date">{{emailContent.Date}}</div>
    </div>
    <iframe id="message-content" scrolling="yes"></iframe>
  </div>
</template>

<script>
  import 'normalize.css'
  import config from '@/../config/apiconfig.js'
  import axios from 'axios'

  export default {
    name: 'MessageDetail',
    data: () => {
      return {
        emailContent: {}
      }
    },
    mounted () {
      if (this.$route.params.key === undefined) {
        this.$router.push({
          name: 'Kitten Land'
        })
      }

      this.getMessage()
      this.$eventHub.$on('refresh', this.getMessage)
    },
    beforeDestroy () {
      this.$eventHub.$off('refresh', this.getMessage)
    },
    methods: {
      getMessage () {
        let mailKey = this.$route.params.key
        this.formatHtml('')
        axios.get(config.apiUrl + '/getKey?mailKey=' + mailKey)
          .then(res => {
            this.emailContent = res.data
            let [name, ...rest] = this.formatName(this.emailContent.from)
            this.emailContent.name = name
            this.emailContent.emailAddress = ' <' + rest
            let content = res.data['body-html'] || res.data['body-plain']
            this.formatHtml(content)
          }).catch((e) => {
            this.emailContent.name = 'Kitten Squads'
            this.emailContent.recipients = 'Master'
            this.formatHtml('The kittens found no messages :(')
        })
      },
      formatHtml (content) {
        let iframe = document.getElementById('message-content')
        let html = content
        iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html)
      },
      formatName (sender) {
        let [name, ...rest] = sender.split(' <')
        return [name, rest]
      }
    },
    components: {
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  .message-details {
    height: auto;
    overflow:auto;
    display:flex;
    flex-direction: column;

    .subject {
      font-weight: bold;
      font-size:1.5rem;
      padding:1rem;
      padding-bottom:0;
      text-align: left;
    }

    .meta-info{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
      padding: 1rem;
      border-bottom: 1px solid #20a0ff;
    }
  }

  @media (max-width: 760px) {
    .message-details{
      top: 8rem;
      .subject{
        font-size:1rem;
      }
      .meta-info{
        font-size:0.6rem;
      }
    }
    #message-content{
      flex:1;
    }
  }

  #message-content{
    width: 100%;
    height: 100%;
    overflow: auto;
    border: none;
  }
</style>
