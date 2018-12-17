<template>
    <div id="player" class="player">
        <Record ref="record"></Record>
        <div ref="tracks" class="tracks">
            <Cover v-for="(song, i) in playlist"
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

        <!--Alleen weergeven als er een keer is gespeeld.-->
        <MiniPlayer v-if="heeftGespeeld"
                    :is-playing="isPlaying"
                    :titel="currentSong.titel"
                    :is-buffering="isBuffering"
                    :cover="currentSong.cover"
                    @play="playCurrentSong"
                    @next="playNextSong"
                    @previous="playPreviousSong"/>
    </div>
</template>

<script>
    import YoutubePlayer from 'youtube-player'
    import {Power2, TimelineLite} from 'gsap'
    import Cover from './components/Cover'
    import Record from './components/Record'
    import Controls from './components/Controls'
    import PlayerStates from './PlayerStates'
    import MiniPlayer from "./components/MiniPlayer";
    import playlist from './playlist'

    export default {
        name: 'app',
        components: {
            MiniPlayer,
            Controls,
            Cover,
            Record
        },
        computed: {
            songIndex() {
                return this.playlist.indexOf(this.currentSong);
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

            let now = new Date(2019, 2, 20);
            this.currentSong = this.playlist.find(song => song.moment > now) || this.playlist[this.playlist.length - 1];

            // Zet de eerste video klaar.
            this.player.cueVideoById(this.currentSong.ytId, this.currentSong.start);

            // .yt-item nodes zitten in de html omdat ze dan sneller geladen worden en zonder js werken
            document.querySelectorAll('.yt-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.play(this.playlist.find(s => s.id === item.id));
                })
            });

            // Global event pauseMusic laat de muziek stoppen
            document.addEventListener('pauseMusic', () => {
                this.pause();
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
            heeftGespeeld: false
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
            pause() {
                this.player.pauseVideo();
                this.hideRecord();
            },
            play(song) {
                this.heeftGespeeld = true;
                this.updatePlayButtons(song);
                document.dispatchEvent(new Event('pauseVideo'));

                if (this.currentSong !== song) {
                    this.currentSong = song;
                    this.player.loadVideoById(song.ytId, song.start);

                    this.timeline.clear();
                    this.hideRecord();
                    this.scrollTo(song);
                    this.showRecord();
                } else {
                    if (this.isPlaying || this.isBuffering) {
                        this.pause();
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
        margin-top: -300px;
    }

    .tracks {
        margin-left: calc(50% - 180px);
        display: flex;
        flex-direction: row;
        position: relative;
    }
</style>
