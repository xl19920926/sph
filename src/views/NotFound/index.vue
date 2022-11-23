<script setup>
import { onMounted } from "vue";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
onMounted(() => {
    nprogress.start();
    nprogress.done();
});
</script>
<template>
    <h1>Page is not found!</h1>
</template>
<script>
// import {onMounted} from "vue";
// import nprogress from "nprogress";
// import "nprogress/nprogress.css";
export default {
    name: "NotFound",
    // setup() {
    //     onMounted(() => {
    //         nprogress.start();
    //         nprogress.done();
    //     })
    // }
};
</script>