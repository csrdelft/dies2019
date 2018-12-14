<template>
    <div :class="className"
         @click="$emit('play')"
         @mouseover="active = true"
         @mouseleave="active = false">
        <img :src="cover" alt=""/>
    </div>
</template>

<script>
    export default {
        name: 'Song',
        props: {
            titel: String,
            beschrijving: String,
            id: String,
            cover: String,
            distance: Number
        },
        computed: {
            className() {
                return 'song distance-' + Math.min(this.distance, 3);
            }
        }
    }
</script>

<style scoped>
    .song {
        margin: 30px;
        transition: opacity linear 1s;
    }

    .song img {
        width: 300px;
        border: 3px solid white;
    }

    .distance-0 {
        opacity: 1;
    }

    .distance-1 {
        opacity: 0.8;
    }

    .distance-2 {
        opacity: 0.5;
    }

    .distance-3 {
        opacity: 0.3;
    }
</style>
