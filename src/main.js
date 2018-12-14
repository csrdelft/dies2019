import Vue from 'vue'
import Player from './Player.vue'
import detectIE from './detect-ie'
import VimeoPlayer from '@vimeo/player'

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

let vimeoContainer = document.getElementById('vimeo');
var iframe = document.querySelector('iframe');
var vimeoPlayer = new VimeoPlayer(iframe);

vimeoPlayer.on('play', function () {
    vimeoContainer.classList.remove('closed');
    // Computed, want de breedte is onbekend
    vimeoContainer.style.height = vimeoContainer.clientWidth / 16 * 9 + 'px';

    // stop de muziek
    document.dispatchEvent(new Event('pauseMusic'));
});

vimeoPlayer.on('pause', function () {
    vimeoContainer.classList.add('closed');
    vimeoContainer.style.height = null;
});

document.addEventListener('pauseVideo', () => {
    vimeoPlayer.pause();
});
