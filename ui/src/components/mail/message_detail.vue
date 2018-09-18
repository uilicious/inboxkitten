<template>
  <div class="message-details">
    <div class="subject">{{emailContent.subject}}</div>
    <div class="meta-info">
      <div class="left">
        <div class="sender"><b>{{emailContent.name}}</b>{{emailContent.emailAddress}}</div>
        <div class="to">to {{emailContent.recipients}}</div>
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
    },
    beforeDestroy () {
    },
    methods: {
      getMessage () {
        let mailKey = this.$route.params.key
        axios.get(config.apiUrl + '/getKey?mailKey=' + mailKey)
          .then(res => {
            this.$router.push({
              name: 'Detail'
            })
            this.emailContent = res.data
            let [name, ...rest] = this.formatName(this.emailContent.from)
            this.emailContent.name = name
            this.emailContent.emailAddress = ' <' + rest
            this.formatHtml(res.data['body-html'])
          }).catch((e) => {
            this.emailContent.name = 'Kitten Squads'
            this.emailContent.recipients = 'Master'
            this.formatHtml('The kittens found no messages :(')
          console.log(this.emailContent)
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
    width: 100vw;
    height: auto;
    position:absolute;
    top:12rem;
    bottom:0;

    .subject {
      font-weight: bold;
      font-size:1.5rem;
      padding:1rem;
      text-align: left;
    }

    .meta-info{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
      padding: 1rem;
      border-bottom: 1px solid #20a0ff;
      .date {
        /*align-self: flex-end;*/
      }

    }
  }

  @media (max-width: 760px) {
    .message-details{
      top: 8rem;
    }
  }

  #message-content{
    height: 80%;
    width: 100%;
    overflow: auto;
    flex:1;
  }
</style>
