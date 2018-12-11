import playlist from './playlist.js';

console.log(playlist);

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('player', {
        height: '240',
        width: '320',
        videoId: 'CC5ca6Hsb2Q',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

document.getElementById("play-pause")
  .addEventListener("click", function (event) {
    if (player.getPlayerState() === 1) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {

}
function stopVideo() {
    player.stopVideo();
}