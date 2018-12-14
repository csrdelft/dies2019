<template>
    <div class="controls-container">
        <div v-if="!isMoving" class="playback" @click="$emit('play')">
            <div v-if="isBuffering">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                     preserveAspectRatio="xMidYMid" class="lds-rolling">
                    <circle cx="50" cy="50" fill="none"
                            stroke="#F2EBC7" stroke-width="10" r="35"
                            stroke-dasharray="164.93361431346415 56.97787143782138">
                        <animateTransform attributeName="transform" type="rotate" calcMode="linear"
                                          values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s"
                                          repeatCount="indefinite"></animateTransform>
                    </circle>
                </svg>
            </div>
            <div v-else-if="isPlaying">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-4 -4 38 38">
                    <g>
                        <path class="cls" d="M 4,0 4,30 Z" style="fill: none; stroke: #F2EBC7; stroke-width: 8;"></path>
                        <path class="cls" d="M 26,0 26,30 Z" style="fill: none; stroke: #F2EBC7; stroke-width: 8;"></path>
                    </g>
                </svg>
            </div>
            <div v-else>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-4 -4 38 38">
                    <g>
                        <path d="M 0,0 30,15 0,30 Z" style="fill:none;stroke:#F2EBC7;stroke-width:4;"></path>
                    </g>
                </svg>
            </div>
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
        margin-left: -155px;
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