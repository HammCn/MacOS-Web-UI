<!--
 * @FilePath: /MacOS/src/view/demo/unclose.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-13 21:00:36
 * @LastEditTime: 2021-08-13 21:35:07
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 常驻Dock的App
-->

<template>
    <div class="demo">
        <div class="title">我无法被彻底关闭，只会被隐藏，因为我 hideWhenClose = true , 你猜我适合做什么应用？</div>
    </div>
</template>

<style scoped>
    .demo {
        display: flex;
        height: 100%;
        width: 100%;
        color: #333;
        text-shadow: none;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 24px;
        text-align: left;
        margin: 10%;
    }
</style>
<script>
    export default {
        name: "demo_dockapp",
        data() {
            return {
            }
        },
        created() {
        }
    }
</script>