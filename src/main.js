import Vue from 'vue'
import VimeoPlayer from '@vimeo/player'
import axios from 'axios';
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

let vimeoContainer = document.querySelector('#vimeo');
let vimeoPlayer = new VimeoPlayer(vimeoContainer.querySelector('iframe'));

vimeoPlayer.on('play', () => {
    vimeoContainer.classList.remove('closed');
    // Computed, want de breedte is onbekend
    vimeoContainer.style.height = vimeoContainer.clientWidth / 16 * 9 + 'px';

    // stop de muziek
    document.dispatchEvent(new Event('pauseMusic'));
});
vimeoPlayer.on('pause', () => {
    vimeoContainer.classList.add('closed');
    vimeoContainer.style.height = null;
});

document.addEventListener('pauseVideo', () => vimeoPlayer.pause());

let form = document.querySelector('#galadate-form');
let errorContainer = form.querySelector('.errors');
form.addEventListener('input', () => errorContainer.textContent = '');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    form.classList.add('loading');

    let formData = new FormData(form);
    axios
        .post(form.action, formData)
        .catch((error) => errorContainer.textContent = error)
        .then(() => {
            form.classList.remove('loading');
            errorContainer.textContent = 'Bericht is verzonden';
        })
});