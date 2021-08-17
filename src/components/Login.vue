<!--
 * @FilePath: /MacOS/src/view/Login.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-05 20:59:02
 * @LastEditTime: 2021-08-11 22:43:26
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 
-->

<template>
    <div class="login">
        <div class="head" :style="{backgroundImage:'url('+headImage+')'}"></div>
        <div class="message">Login Please</div>
        <div class="form">
            <div class="item">
                <input class="account" placeholder="account here..." type="email" /><i
                    class="iconfont icon-icon_principal" @click="guest"></i>
            </div>
            <div class="item">
                <input class="password" placeholder="password here..." type="password" /><i
                    class="iconfont icon-icon_send" @click="guest"></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .login {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        margin-top: -100px;
        z-index: 99;
        backdrop-filter: blur(20px);
    }

    .head {
        background-size: 40% auto;
        background-position: center center;
        height: 150px;
        width: 150px;
        border-radius: 100%;
        box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
        margin-top: -50px;
    }

    .message {
        margin-top: 20px;
        font-size: 20px;
        text-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
        color: #eee;
        margin-bottom: 50px;
    }

    input {
        color: white;
        outline: none;
        border: none;
        margin: 5px;
        font-size: 16px;
        background-color: rgba(255, 255, 255, 0.3);
        padding: 8px 24px;
        border-radius: 20px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    }

    ::-webkit-input-placeholder {
        color: #fff;
    }

    ::-moz-placeholder {
        color: #fff;
    }

    :-ms-input-placeholder {
        color: #fff;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
    }

    .item {
        vertical-align: middle;
    }

    .item .iconfont {
        vertical-align: middle;
        display: inline-block;
        background-color: rgba(255, 255, 255, 0.3);
        font-size: 18px;
        border-radius: 100%;
        width: 36px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    }

    .item .iconfont:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }
</style>
<script>
    import tool from "@/helper/tool"
    export default {
        data() {
            return {
                headImage: require("@/asset/img/bg.jpg")
            }
        },
        methods: {
            guest() {
                tool.saveAccessToken("guest")
                this.$emit("logined")
            }
        }
    }
</script>