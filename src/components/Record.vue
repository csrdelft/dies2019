<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
         viewBox="0 0 300 307">
        <defs>
            <clipPath id="vinyl-record">
                <!-- clip path in de vorm van een lp. -->
                <path d="M 150 1.5 A 149 152 0 0 0 1 153.5 A 149 152 0 0 0 150 305.5 A 149 152 0 0 0 299 153.5 A 149 152 0 0 0 150 1.5 z M 145 150 A 4 4 0 0 1 149 154 A 4 4 0 0 1 145 158 A 4 4 0 0 1 141 154 A 4 4 0 0 1 145 150 z"></path>
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