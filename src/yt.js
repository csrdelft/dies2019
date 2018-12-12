export default class YoutubePlayer {
    player = {};

    constructor() {
        if (!window['YT']) {
            let tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this)
        } else {
            this.onYouTubeIframeAPIReady();
        }

        let playerTag = document.createElement('div');
        playerTag.id = 'yt-player';
        playerTag.style.display = 'none';
        document.body.appendChild(playerTag);
    }

    onYouTubeIframeAPIReady() {
        this.player = new window['YT'].Player('yt-player', {
            events: {
                'onReady': this.onPlayerReady.bind(this),
                'onStateChange': this.onStateChange.bind(this),
            }
        })
    }

    onStateChange(event) {
        console.log("State change", event);
    }

    onPlayerReady(event) {
        // event.target.playVideo();
    }

    changeVideo(videoId) {
        console.log(this.player)
        this.player.loadVideoById(videoId);
    }
}