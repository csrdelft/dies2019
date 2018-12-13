import Vue from 'vue'
import Player from './Player.vue'

import './assets/style.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(Player),
}).$mount('#player')
