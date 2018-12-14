<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
         viewBox="0 0 3580.8777 3512.5046">
        <defs id="defs4686">
            <clipPath id="vinyl">
                <!-- clip path in de vorm van een lp. -->
                <path d="M 1790.6447,240.95477 A 1515.6484,1515.6484 0 0 0 274.99581,1756.6036 1515.6484,1515.6484 0 0 0 1790.6447,3272.2525 1515.6484,1515.6484 0 0 0 3306.2936,1756.6036 1515.6484,1515.6484 0 0 0 1790.6447,240.95477 Z m 0.9699,1475.18323 a 40.779928,40.779928 0 0 1 40.7789,40.7803 40.779928,40.779928 0 0 1 -40.7789,40.7806 40.779928,40.779928 0 0 1 -40.7807,-40.7806 40.779928,40.779928 0 0 1 40.7807,-40.7803 z"></path>
            </clipPath>
        </defs>
        <image xlink:href="images/vinyl-achtergrond.jpg" clip-path="url(#vinyl)" x="271.29498" y="237.49956" width="3040" height="3038"></image>
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
        width: 350px;
        height: 350px;
        position: relative;
        margin-left: calc(50% - 175px);
    }
</style>