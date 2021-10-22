import Vue from 'vue/dist/vue.js'
import { cleanLabResults } from './cleanLabResults.js'

new Vue({
  el: '#app',
  data: {
    labInput: ''
  },
  computed: {
    labOutput: function () {
      return cleanLabResults(this.labInput)
    }
  }
})