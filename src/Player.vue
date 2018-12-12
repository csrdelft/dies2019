<template>
    <div id="player" class="player">
        <Record ref="record"></Record>
        <div ref="tracks" class="tracks">
            <Song v-for="(song, i) in playlist"
                  :key="song.id"
                  :titel="song.titel"
                  :beschrijving="song.beschrijving"
                  :cover="song.cover"
                  :distance="Math.abs(songIndex - i)"
                  @play="play(song)"/>
        </div>
        <Controls :beschrijving="currentSong.beschrijving" :titel="currentSong.titel" @next="playNextSong" @previous="playPreviousSong"></Controls>
    </div>
</template>

<script>
    import Song from './components/Song.vue'
    import Record from './components/Record'
    import YoutubePlayer from 'youtube-player'
    import PlayerStates from './PlayerStates'
    import playlist from './playlist.js'
    import Controls from './components/Controls'
    import {TimelineLite, Power2} from 'gsap'

    export default {
        name: 'app',
        components: {
            Controls,
            Song,
            Record
        },
        computed: {
            songIndex() {
                return this.playlist.indexOf(this.currentSong);
            },
            tracksLeftPos() {
                return -this.songIndex * 360;
            }
        },
        async created() {
            this.player = YoutubePlayer('yt-player');
            this.player.on('stateChange', (event) => {
                if (event.data === PlayerStates.ENDED) {
                    this.playNextSong();
                }

                this.isPlaying = event.data === PlayerStates.PLAYING;
            })

            // this.player.getPlaylist().then(console.log);
        },
        data: () => ({
            player: {},
            playlist: playlist,
            currentSong: playlist[0],
            timeline: new TimelineLite(),
            isPlaying: false,
        }),
        methods: {
            playNextSong() {
                if (this.songIndex > this.playlist.length) {
                    this.play(this.playlist[0]);
                } else {
                    this.play(this.playlist[this.songIndex + 1]);
                }
            },
            playPreviousSong() {
                if (this.songIndex === 0) {
                    this.play(this.playlist[this.playlist.length - 1]);
                } else {
                    this.play(this.playlist[this.songIndex - 1]);
                }
            },
            play(song) {
                const {record, tracks} = this.$refs;

                if (this.currentSong === song) {
                    if (this.isPlaying) {
                        this.player.pauseVideo();

                        this.timeline
                            .clear()
                            .to(record.$el, 0.2, {top: 350});

                        return;
                    } else {
                        this.timeline
                            .clear()
                            .to(record.$el, 0.5, {top: 250});

                        this.player.playVideo();
                        return;
                    }
                }

                this.currentSong = song;
                this.player.loadVideoById(song.ytId, song.start);

                this.timeline
                    .clear()
                    .to(record.$el, 0.2, {top: 350})
                    .to(record.$el, 0, {opacity: 0}).to(tracks, 1, {
                        left: this.tracksLeftPos,
                        ease: Power2.easeInOut
                    })
                    .to(record.$el, 0, {opacity: 1})
                    .to(record.$el, 0.5, {top: 250});
            },
        }
    }
</script>

<style scoped>
    .player {
        overflow: hidden;
        margin-top: -200px;
    }

    .tracks {
        margin-left: calc(50% - 180px);
        display: flex;
        flex-direction: row;
        position: relative;
    }
</style>
