<!--
 * @FilePath: /mac-ui/src/components/Bg.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-05 20:59:02
 * @LastEditTime: 2021-08-18 23:40:52
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 背景
-->



<template>
    <div class="bg" :style="{backgroundImage:'url('+bgImage+')'}">
    </div>
</template>

<style scoped>
    .bg {
        background-color: #000;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 0;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
<script>
    export default {
        data() {
            return {
                bgImage: require("@/asset/img/bg.jpg")
            }
        }
    }
</script>