<!--
 * @FilePath: /MacOS/src/view/system/about.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-02 21:56:04
 * @LastEditTime: 2021-08-11 22:04:37
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: Index
-->
<template>
    <div class="about">
        <div class="top">
            <i class="iconfont icon-apple1"></i>
            <div class="info">
                <div class="title">{{about.title}}</div>
                <div class="version">{{about.version}}</div>
            </div>
        </div>
        <div class="copyright">{{about.copyright}}</div>
    </div>
</template>

<style scoped>
    .about {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        color: #333;
        text-shadow: none;
        font-weight: 300;
    }

    .info {
        flex-grow: 1;
    }

    .top {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        padding: 20px 40px;
    }

    .title {
        font-size: 24px;
    }

    .iconfont {
        font-size: 48px;
        margin-right: 20px;
    }

    .version {
        font-size: 14px;
        color: #999;
    }

    .copyright {
        font-size: 12px;
        color: #999;
        padding: 20px;
        text-align: center;
    }
</style>
<script>
    export default {
        data() {
            return {
                about: {
                    title: "MacOS WebUI",
                    version: "v0.0.1 2021-08-10 22:22",
                    copyright: "本项目所用MacOS图标版权为Apple.Inc所有,向MacOS致敬!"
                },
            }
        },
        created() {
        }
    }
</script>