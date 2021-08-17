<!--
 * @FilePath: /mac-ui/src/components/Loading.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-05 21:00:27
 * @LastEditTime: 2021-08-17 23:14:24
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 开机进度条页面
-->


<template>
    <div class="loading" @click="fullScreen">
        <div class="logo"><i class="iconfont icon-apple-fill"></i></div>
        <div class="progress" :style="{width:showProgress?'300px':0}">
            <div :style="{width:progress+'%'}"></div>
        </div>
    </div>
</template>

<style scoped>
    .loading {
        background-color: #000;
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
        z-index: 99999;
    }

    .logo .iconfont {
        font-size: 120px;
    }

    .progress {
        margin-top: 50px;
        width: 200px;
        background-color: rgba(255, 255, 255, .1);
        height: 6px;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
    }

    .progress div {
        width: 20%;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, .2);
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
    }
</style>
<script>
    export default {
        data() {
            return {
                progress: 0,
                showProgress: false,
            }
        },
        created() {
            setTimeout(() => {
                this.showProgress = true;
                this.updateProgress()
            }, 1000)
        },
        methods: {
            fullScreen() {
                var docElm = document.documentElement;
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                }
                else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                }
                else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                }
                else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                }
            },
            updateProgress() {
                this.progress += parseInt(Math.random() * 10)
                if (this.progress >= 100) {
                    this.progress = 100
                    this.showProgress = false
                    setTimeout(() => this.$emit('loaded'), 1000)
                } else {
                    setTimeout(() => this.updateProgress(), 100)
                }
            }
        }
    }
</script>