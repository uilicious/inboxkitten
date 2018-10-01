<template>
  <nav class="nav">
    <div class="back-button" @click="backAPage"><i class="fa fa-arrow-left fa-3x"/></div>
    <div class="logo-box">
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
    </div>

    <form v-on:submit.prevent="" class="form-box">
      <input name="email" type="hidden" v-model="email" />
      <input type="text" class="input-email" aria-label="email" v-model="fullEmail" id="email-input" @focus="emailInputFocus" readonly />
      <button type="button" class="copy" @click="emailInputCopy">Copiar</button>
      <button type="button" class="refresh" @click="emitRefresh">Atualizar</button>
    </form>
  </nav>
</template>

<script>
  import config from '@/../config/apiconfig.js'
  import 'normalize.css'
  import $ from 'jquery'
  export default {
    name: 'NavBar',
    data: () => {
      return {
        email: '',
        fullEmail: ''
      }
    },
    computed: {
      domain () {
        return config.domain
      }
    },
    mounted () {
      this.email = this.$route.params.email
      if (this.email === '') {
        this.goMainPage()
      } else {
        this.fullEmail = this.email + '@' + config.domain
      }
    },
    methods: {
      goMainPage () {
        this.$router.push({
          name: 'Kitten Land'
        })
      },
      emailInputFocus () {
        $('#email-input').select()
      },
      emailInputCopy () {
        this.emailInputFocus()
        document.execCommand('copy')
      },
      emitRefresh () {
        this.$eventHub.$emit('refresh', '')
      },
      changeInbox () {
        this.$router.push({
          name: 'List',
          params: {
            email: this.email
          }
        })
        this.$eventHub.$emit('refreshInbox', {email: this.email})
      },
      backAPage () {
        if (this.$route.name === 'List') {
          this.$router.push({
            name: 'Kitten Land'
          })
        } else {
          this.$router.push({
            name: 'List'
          })
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "@/scss/_color.scss";
  @import "@/scss/landingpage.scss";
  .nav {
    background: #849CC2;
    width: 100vw;
    height: 15rem;
    text-align: left;
    padding-top:2rem;
    padding-bottom:2rem;
    top: 0;

    .logo-box{
      width:100%;
      height:12rem;
      text-align: center;
      vertical-align: center;
      display: block;
      overflow: hidden;

      .logo {
        width:6rem;
      }
      .logo:hover {
        cursor: pointer;
      }
    }

    .back-button {
      position:absolute;
      padding:5rem;
      padding-right:3rem;
      padding-left:8rem;
      cursor: pointer;
      margin:0;
    }
  }

  //
  // Email form box
  //

  .form-box {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;

    .domain-text {
      display: none;
      width:14rem;
      border-top-right-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
    }

    .input-email {
      text-align: center;
      margin-left: 8rem;
      border: none;
      border-top-left-radius: 0.4rem;
      border-bottom-left-radius: 0.4rem;
      width: 25rem;
    }
    .submit {
      background: $cta-base;
      color: $cta-base-text;
      border-left-width: 0;
    }

    .submit:hover {
      background-color: $cta-hover;
      color: $cta-hover-text;
    }
    .refresh {
      padding: 0.5rem 1rem 0.5rem 1rem;
      border: none;
      background: $cta-base;
      color: $cta-base-text;
      border-radius: 0.4rem;
      margin-left: 1rem;
    }
    .refresh:hover {
      background-color: $cta-hover;
      color: $cta-hover-text;
    }

    .copy {
      padding: 0.5rem 1rem 0.5rem 1rem;
      border: none;
      background: $black;
      color: $cta-base-text;
      border-radius: 0 0.4rem 0.4rem 0;
      margin-left: 0;
    }
    .copy:hover {
      background-color: lighten($black, 10%);
      color: $cta-hover-text;
    }
  }

  @media (min-width: 760px) { // IPad and above
    .nav{
      .logo-box{
        height:12rem;
        .logo{
          width:16rem;
        }
      }

      .back-button {
        padding-left:2rem;
      }
    }

    .form-box{
      .domain-text{
        display: inline-block;
        background:white;
        text-align: center;
        margin: 0;
        padding:0.5rem;
        vertical-align: middle;
        border-left-width: 0;
        background-color: $domain-base;
        cursor: pointer;
        width:12rem;
      }
    }
  }

  @media (max-width: 768px) { // IPad portrait
    .nav{
      .back-button{
        padding:3rem;
        padding-left:3rem;
      }
    }
    .form-box .input-email {
      margin-left: 0;
      margin-top: 3px;
      border-top-right-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
    }
  }

  @media (max-width:760px) { // Smartphones
    .nav {
      height:12rem;

      .back-button {
        padding: 1rem;
        padding-left: 2rem;

        font-size: 10px;
      }
    }

    .form-box{
      .input-email{
        padding: 0.2rem 1rem 0.2rem 1rem;
        width: calc(100% - 4rem);
      }
      .refresh, .copy {
        display:none;
      }
    }
  }

  @media (max-width: 320px) { // IPhone 5/SE

    .form-box{
      .input-email{
        width: 7rem;
      }
    }
  }

</style>
