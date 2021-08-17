<!--
 * @FilePath: /MacOS/src/view/demo/unresize.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-13 21:00:36
 * @LastEditTime: 2021-08-13 21:35:44
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 常驻Dock的App
-->

<template>
    <div class="demo">
        <div class="title">我无法拖动大小,也无法绿灯改变大小,也无法双击改变大小,<br>为我设置修饰 disableResize = true 即可</div>
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