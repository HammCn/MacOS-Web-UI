<!--
 * @FilePath: /mac-ui/src/view/demo/web.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-13 21:00:36
 * @LastEditTime: 2021-08-19 00:35:14
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 常驻Dock的App
-->

<template>
    <div class="demo">
        <iframe :src="app.url"></iframe>
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

    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>
<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            app: Object
        },
        created() {
        }
    }
</script>