<template>
  <div>
    <div>
      <input type="text" :value="randomName"/>
    </div>
    <!-- Detail setup guide-->
    <div>
      <p>
        Host your own InboxKitten!
        - Deploy on ExpressJS
        - Deploy using Google Lambda functions
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      randomName: ''
    }
  },
  mounted () {
    this.randomName = this.generateRandomName()
  },
  methods: {
    generateRandomName () {
      var randomWords = require('random-words')
      return randomWords({exactly: 1, wordsPerString: 2, separator: '', formatter: (word) => word.slice(0, 1).toUpperCase().concat(word.slice(1))})
    }
  }
}
</script>

<style scoped>

</style>
