<template>
    <div class="media">
        <div class="cover">
            <img :src="cover" :alt="titel"/>
            <div class="play-pause" @click="$emit('play')">
                <img v-if="isPlaying" class="pause" src="../assets/images/controls/pause-light.svg" alt="Pauzeren"/>
                <img v-else-if="isBuffering" class="loading" src="../assets/images/controls/loading-light.svg"
                     alt="Laden"/>
                <img v-else class="play" src="../assets/images/controls/play-light.svg" alt="Spelen"/>
            </div>
        </div>
        <div class="media-body">
            <div class="titel">{{titel}}</div>
            <div class="controls">
                <img class="previous" @click="$emit('previous')" src="../assets/images/controls/prev.svg" alt="Vorige"/>
                <img class="next" @click="$emit('next')" src="../assets/images/controls/next.svg" alt="Volgende"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MiniPlayer",
        props: {
            isPlaying: Boolean,
            isBuffering: Boolean,
            titel: String,
            cover: String
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/vars';

    .media {
        z-index: 13;
        position: fixed;
        width: 100px;
        max-width: 100%;
        height: 100px;
        bottom: 0;
        right: 0;
        margin: 10px;
        padding: 5px;
        background: $kleur-blauw;
        flex-direction: row-reverse;

        overflow: hidden;
        transition: width ease-in-out 0.5s;

        &:hover {
            width: 400px;
        }

        .cover {
            height: 100%;

            & > img {
                height: 90px;
                width: 90px;
                object-fit: cover;
            }

            .play-pause {
                position: relative;
                top: -100%;

                padding: 1em;
            }
        }

        .media-body {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding: 0.5em;
            min-width: 300px;


            .titel {
                font-family: $font-header;
            }

            .controls {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 200px;

                img {
                    height: 30px;
                }
            }
        }
    }
</style>