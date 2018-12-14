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
                  :currentSong="currentSong === song"
                  :playing="isPlaying"
                  @play="play(song)"/>
        </div>

        <Controls :beschrijving="currentSong.beschrijving"
                  :titel="currentSong.titel"
                  :is-playing="isPlaying"
                  :is-buffering="isBuffering"
                  :is-moving="isMoving"
                  @play="playCurrentSong"
                  @next="playNextSong"
                  @previous="playPreviousSong" />
    </div>
</template>

<script>
    import YoutubePlayer from 'youtube-player'
    import {Power2, TimelineLite} from 'gsap'
    import Song from './components/Song'
    import Record from './components/Record'
    import PlayerStates from './PlayerStates'
    import playlist from './playlist'
    import Controls from './components/Controls'

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
        created() {
            this.player.on('stateChange', (event) => {
                if (event.data === PlayerStates.ENDED) {
                    this.playNextSong();
                }

                this.isPlaying = event.data === PlayerStates.PLAYING;
                this.isBuffering = event.data === PlayerStates.BUFFERING;
            });

            // currentSong is de eerste activiteit die nog niet is afgelopen of de allerlaatste activiteit
            this.currentSong = this.playlist.slice(-1)[0];
            for (let song of this.playlist) {
                if (song.moment > new Date()) {
                    this.currentSong = song;
                    break;
                }
            }
            this.player.cueVideoById(this.currentSong.ytId, this.currentSong.start);

            // .yt-item nodes zitten in de html omdat ze dan sneller geladen worden
            document.querySelectorAll('.yt-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.play(this.playlist.find(s => s.id === item.id));
                })
            })
        },
        mounted() {
            this.scrollTo(this.currentSong, 0);
        },
        data: () => ({
            player: YoutubePlayer('yt-player'),
            playlist: playlist,
            currentSong: null,
            timeline: new TimelineLite(),
            isPlaying: false,
            isBuffering: false,
            isMoving: false,
        }),
        methods: {
            getSongIndex(song) {
                return this.playlist.indexOf(song);
            },
            playCurrentSong() {
                this.play(this.currentSong);
            },
            playNextSong() {
                if (this.songIndex >= this.playlist.length - 1) {
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
            async skip() {
                this.player.seekTo(await this.player.getDuration() - 5, true);
            },
            scrollTo(song, duration = 1) {
                const {tracks} = this.$refs;

                this.timeline
                    .call(() => this.isMoving = true)
                    .to(tracks, duration, {
                        left: this.getSongIndex(song) * -360,
                        ease: Power2.easeInOut
                    })
                    .call(() => this.isMoving = false);
            },
            hideRecord() {
                const {record} = this.$refs;

                this.timeline
                    .to(record.$el, 0.2, {top: 350})
                    .to(record.$el, 0, {opacity: 0});

            },
            showRecord() {
                const {record} = this.$refs;

                this.timeline
                    .to(record.$el, 0, {opacity: 1})
                    .to(record.$el, 0.5, {top: 250});
            },
            updatePlayButtons(song) {
                let previous = document.querySelectorAll(".playing");
                previous.forEach(prev => prev.classList.remove("playing"));

                if (this.currentSong !== song || !this.isPlaying) {
                    let element = document.getElementById(song.id);
                    element.querySelector(".play").classList.add("playing");
                }
            },
            play(song) {
                this.updatePlayButtons(song);

                if (this.currentSong !== song) {
                    this.currentSong = song;
                    this.player.loadVideoById(song.ytId, song.start);

                    this.timeline.clear();
                    this.hideRecord();
                    this.scrollTo(song);
                    this.showRecord();
                } else {
                    if (this.isPlaying || this.isBuffering) {
                        this.player.pauseVideo();

                        this.hideRecord();
                    } else {
                        this.player.playVideo();

                        this.showRecord();
                    }
                }
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
