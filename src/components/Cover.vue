<template>
    <div class="song" :style="{opacity}" @click="$emit('play')">
        <img :src="cover" :alt="titel"/>
    </div>
</template>

<script>
    export default {
        name: 'Cover',
        props: {
            titel: String,
            beschrijving: String,
            id: String,
            cover: String,
            distance: Number
        },
        computed: {
            opacity() {
                switch (this.distance) {
                    case 0: return 1;
                    case 1: return 0.8;
                    case 2: return 0.5;
                    default: return 0.3;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/vars.scss";

    .song {
        margin: 30px;
        transition: opacity linear 1s;
    }

    .song img {
        width: 300px;
        height: 300px;
        object-fit: cover;
        border: 3px solid $kleur-beige;
    }
</style>
