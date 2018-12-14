import Vue from 'vue'
import Player from './Player.vue'
import detectIE from './detect-ie'

// Laad stylesheet (wordt in productie netjes in een los bestand gezet)
import './assets/style.scss'

Vue.config.productionTip = false;

new Vue({
  render: h => h(Player),
}).$mount('#player');

// Schrale IE/Edge ondersteund geen svg mix-blend-mode
if (detectIE() !== false) {
  document.getElementById('vinyl-svg').style.opacity = '0';
}
