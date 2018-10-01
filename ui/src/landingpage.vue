<template>
  <div class="landing-page">
    <div class="header-background">
      <div class="header">
        <div class="bear-container">
          <div class="bear"></div>
          <div class="left-ear"></div>
          <div class="right-ear"></div>
          <div class="left-eye"></div>
          <div class="right-eye"></div>
          <div class="nose"></div>
          <div class="mouth"></div>
          <div class="hand"></div>
        </div>
        <h1>Tua mãe, aquela ursa</h1>
        <h3>Crie um email descartável @tuamaeaquelaursa.com</h3>
      </div>
      <div class="email-selection">
        <form v-on:submit.prevent="goToInbox">
          <div class="input-box">
            <input class="input-email" name="email" aria-label="email" type="text" v-model="randomName" id="email-input"/>
            <div class="input-suffix" @click="emailInputFocus">@{{domain}}</div>
          </div>
          <div class="submit-box"><input type="submit" class="submit" value="Criar email"/></div>
        </form>
      </div>
    </div>
    <div class="info-guide">
      <div class="features">
        <div class="feature-card">
          <h3>Evite SPAM</h3>
          <p>Precisa se cadastrar em um site ou baixar um ebook que requer email? Evite SPAM, utilize um email descartável. Ele dura algumas horas e você poderá receber o email de confirmação de cadastro/link de download</p>
        </div>
        <div class="feature-card">
          <h3>Irrite Marketeiros</h3>
          <p>Imagina só a reação do pessoal do marketing quando perceber que estão mandando emails para ”tua mãe, aquela ursa”. Bom, eles merecem, ninguém gosta de SPAM.</p>
        </div>
        <div class="feature-card">
          <h3>Emails autodestrutivos</h3>
          <p>Depois de algumas horas, o endereço de email e todos os emails que você recebeu vão pelos ares. Não se preocupe, utilizamos ingredientes orgânicos e todos os emails são reciclados.</p>
        </div>
      </div>
    </div>
    <div class="share">
      <h3>Compartilhe tua mãe, aquela ursa, com seus amigos</h3>
      <div class="sharethis-inline-share-buttons"></div>
    </div>
    <div class="footer">
      <p>Orgulhosamente desenvolvido por Ronaldo Fuzinato, Cassiano Calegari e o pessoal do <a href="https://autentique.com.br" target="_blank">Autentique.com.br</a>. Com base no projeto <a href="https://github.com/uilicious/inboxkitten" target="_blank">uilicious/inboxkitten</a></p>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import config from '@/../config/apiconfig.js'
  import 'normalize.css'

  export default {
    name: 'LandingPage',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        randomName: ''
      }
    },
    mounted () {
      this.randomName = this.generateRandomName().toString()
    },
    computed: {
      domain () {
        return config.domain
      }
    },
    methods: {
      generateRandomName () {
        var Leite = require('leite')
        var leite = new Leite()
        var name = leite.pessoa.nome({sexo: 'Feminino'}).toLowerCase().replace(/\s+/g, '-').replace("'", '') + '-' + Math.floor(Math.random() * 90 + 10)
        if (name.normalize) {
          name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        }
        return name
      },
      goToInbox () {
        this.$router.push({
          name: 'Inbox',
          params: {
            email: this.randomName
          }
        })
      },
      emailInputFocus () {
        $('#email-input').select()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import url("https://use.fontawesome.com/releases/v5.3.1/css/all.css");
  @import "scss/landingpage.scss";
</style>
