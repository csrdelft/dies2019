<template>
    <div class="controls-container">
        <div v-if="!isMoving" class="playback" @click="$emit('play')">
            <img v-if="isBuffering" src="../assets/images/controls/loading-light.svg" alt="Laden"/>
            <img v-else-if="isPlaying" src="../assets/images/controls/pause-light.svg" alt="Pauzeren"/>
            <img v-else src="../assets/images/controls/play-light.svg" alt="Afspelen" />
        </div>
        <div class="controls">
            <img class="previous" @click="$emit('previous')" src="../assets/images/controls/prev.svg" alt="Vorige">
            <div class="text">
                <div class="titel">{{titel}}</div>
                <div class="beschrijving">{{beschrijving}}</div>
            </div>
            <img class="next" @click="$emit('next')" src="../assets/images/controls/next.svg" alt="Volgende">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Controls",
        props: {
            titel: String,
            beschrijving: String,
            isPlaying: Boolean,
            isBuffering: Boolean,
            isMoving: Boolean,
        }
    }
</script>

<style lang="scss" scoped>
    .controls-container {
        position: relative;
    }

    .controls {
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .previous, .text, .next {
        margin: 2em;
    }

    .previous, .next {
        width: 3em;
    }

    .playback {
        position: absolute;
        width: 300px;
        height: 300px;
        margin-left: -150px;
        left: 50%;
        padding: 100px;
        top: -335px;

        opacity: 0;

        &:hover {
            opacity: 1;
        }
    }

    .text {
        margin-top: 1.25em;
        width: 16em;
        height: 5em;
        text-align: center;
    }

    .titel, .beschrijving {
        font-size: 1.5rem;
    }

    .titel {
        font-family: Futura, sans-serif;
    }

    .beschrijving {
        font-family: Futura Bk BT, sans-serif;
    }
</style>