<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
         viewBox="0 0 300 307">
        <defs>
            <clipPath id="vinyl-record">
                <!-- clip path in de vorm van een lp. -->
                <ellipse cx="151" cy="154" ry="152" rx="148"></ellipse>
            </clipPath>
        </defs>
        <image xlink:href="images/vinyl-record.jpg" clip-path="url(#vinyl-record)" x="0" y="0" width="300" height="307"></image>
    </svg>
</template>

<script>
    export default {
        name: "Record",
    }
</script>

<style scoped>
    svg {
        top: 350px;
        opacity: 0;
        width: 300px;
        height: 307px;
        position: relative;
        margin: 30px 30px 30px calc(50% - 150px);
    }
</style>