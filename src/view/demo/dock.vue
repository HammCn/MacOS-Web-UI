<!--
 * @FilePath: /MacOS/src/view/demo/dock.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-13 21:00:36
 * @LastEditTime: 2021-08-13 21:33:50
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 常驻Dock的App
-->

<template>
    <div class="demo">
        <div class="title">我是一个常驻Dock上的App，<br>关闭后也一直在Dock上，<br>你可以通过配置 keepInDock 来修饰我</div>
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
        font-size: 16px;
        text-align: left;
        margin: 10%;
    }
</style>
<script>
    export default {
        data() {
            return {
            }
        },
        created() {
        }
    }
</script>