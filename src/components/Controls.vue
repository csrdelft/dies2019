<template>
    <div class="controls">
        <img class="previous" @click="$emit('previous')" src="/images/controls/prev.svg" alt="Vorige">
        <div class="text">
            <div class="titel">{{titel}}</div>
            <div class="beschrijving">{{beschrijving}}</div>
        </div>
        <img class="next" @click="$emit('next')" src="/images/controls/next.svg" alt="Volgende">
    </div>
</template>

<script>
    export default {
        name: "Controls",
        props: {
            titel: String,
            beschrijving: String
        }
    }
</script>

<style scoped>
    .controls {
        display: flex;
        justify-content: center;
    }

    .previous, .text, .next {
        margin: 2em;
    }

    .previous, .next {
        width: 3em;
    }

    .text {
        text-align: center;

        font-size: 1.5rem;
    }

    .titel {
        font-family: Futura, sans-serif;
    }

    .beschrijving {
        font-family: Futura Bk BT, sans-serif;
    }
</style>