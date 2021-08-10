<!--
 * @FilePath: /MacOS/src/view/AppLoader.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-06 21:34:04
 * @LastEditTime: 2021-08-10 23:08:19
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 
-->


<template>
    <div class="moveBg" @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave.stop="mouseLeave"
        :style="{pointerEvents:isBoxResizing||isBoxMoving?'auto':'none'}">
        <div class="box"
            :style="{left:nowRect.left+'px',top:nowRect.top+'px',bottom:nowRect.bottom+'px',right:nowRect.right+'px'}"
            :class="getExtBoxClasses()">
            <div class="box-top">
                <div class="box-top-left" @mousedown="resizeMouseDown"></div>
                <div class="box-top-center" @mousedown="resizeMouseDown"></div>
                <div class="box-top-right" @mousedown="resizeMouseDown"></div>
            </div>
            <div class="box-center">
                <div class="box-center-left" @mousedown="resizeMouseDown"></div>
                <div class="box-center-center loader" @click="showThisApp">
                    <div class="app-bar" :style="{backgroundColor:app.tabbarBgColor}" @mousedown.stop="positionMouseDown"
                        v-on:dblclick="appBarDoubleClicked">
                        <div class="controll">
                            <div class="close" @click.stop="close"></div>
                            <div class="min" @click.stop="close"></div>
                            <div class="full" :class="app.disableResize?'full-disabled':''" @click="switchFullScreen">
                            </div>
                        </div>
                        <div class="title" :style="{color:app.tabbarTextColor}">{{appData.title||app.title}}</div>
                    </div>
                    <div class="app-body">
                        <template v-if="app.key=='system_about'">
                            <SystemAbout @api="appEvent"></SystemAbout>
                        </template>
                    </div>
                </div>
                <div class="box-center-right" @mousedown="resizeMouseDown"></div>
            </div>
            <div class="box-bottom">
                <div class="box-bottom-left" @mousedown="resizeMouseDown"></div>
                <div class="box-bottom-center" @mousedown="resizeMouseDown"></div>
                <div class="box-bottom-right" @mousedown="resizeMouseDown"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import AppModel from "@/model/App"
    import { defineAsyncComponent } from 'vue'
    export default {
        components: {
            SystemAbout: defineAsyncComponent(() => import('@/view/system/about'))
        },
        props: {
            app: Object,
        },
        data() {
            return {
                appData: {
                    title: ""
                },
                appList: AppModel.getAllAppList(),
                defaultIndex: 10,
                activeIndex: 20,
                isBoxMoving: false,
                startPosition: { x: 0, y: 0 },
                nowRect: {
                    left: 100, right: 100,
                    top: 100, bottom: 100
                },
                startRect: {
                    left: 0, right: 0, top: 0, bottom: 0
                },
                isBoxResizing: false,
                moveDirection: false,
                isMaxShowing: false,
                isFullScreen: false,
            }
        },
        created() {
            console.log(this.app)
            if (this.app.width) {
                this.nowRect.left = this.nowRect.right = (document.body.clientWidth - this.app.width) / 2
            }
            if (this.app.height) {
                this.nowRect.bottom = (document.body.clientHeight - this.app.height) / 2 + 100
                this.nowRect.top = (document.body.clientHeight - this.app.height) / 2 - 100
            }
        },
        methods: {
            appEvent(e) {
                console.log(e)
            },
            close() {
                this.$emit('close', this.app)
            },
            showThisApp() {
                this.$emit('open', this.app)
            },
            switchFullScreen() {
                if (this.app.disableResize) {
                    return
                }
                this.isFullScreen = !this.isFullScreen;
                if (this.isFullScreen) {
                    this.isMaxShowing = true
                } else {
                    this.isMaxShowing = false
                }
            },
            getExtBoxClasses() {
                let str = "";
                if (!this.isBoxResizing && !this.isBoxMoving) {
                    str += "box-animation "
                }
                if (this.isMaxShowing) {
                    str += "isMaxShowing "
                }
                if (this.isFullScreen) {
                    str += "isFullScreen "
                }
                return str
            },
            appBarDoubleClicked() {
                if (this.app.disableResize) {
                    return
                }
                this.isMaxShowing = !this.isMaxShowing
                if (!this.isMaxShowing) {
                    this.isFullScreen = false
                }
            },
            positionMouseDown(e) {
                this.showThisApp()
                if (this.isFullScreen || this.isMaxShowing) {
                    return
                }
                this.startRect = {
                    left: this.nowRect.left,
                    right: this.nowRect.right,
                    top: this.nowRect.top,
                    bottom: this.nowRect.bottom,
                };
                this.startPosition.x = e.clientX
                this.startPosition.y = e.clientY
                this.isBoxMoving = true
            },
            mouseUp() {
                this.isBoxMoving = false
                this.isBoxResizing = false
                this.moveDirection = false
            },
            mouseLeave() {
                this.isBoxMoving = false
                this.isBoxResizing = false
                this.moveDirection = false
            },
            mouseMove(e) {
                if (this.isBoxResizing) {
                    this.isFullScreen = false
                    this.isMaxShowing = false
                    switch (this.moveDirection) {
                        case 'box-top-left':
                            this.nowRect.top = this.startRect.top + (e.clientY - this.startPosition.y)
                            this.nowRect.left = this.startRect.left + (e.clientX - this.startPosition.x)
                            break
                        case 'box-top-center':
                            this.nowRect.top = this.startRect.top + (e.clientY - this.startPosition.y)
                            break
                        case 'box-top-right':
                            this.nowRect.top = this.startRect.top + (e.clientY - this.startPosition.y)
                            this.nowRect.right = this.startRect.right - (e.clientX - this.startPosition.x)
                            break
                        case 'box-center-left':
                            this.nowRect.left = this.startRect.left + (e.clientX - this.startPosition.x)
                            break
                        case 'box-bottom-left':
                            this.nowRect.left = this.startRect.left + (e.clientX - this.startPosition.x)
                            this.nowRect.bottom = this.startRect.bottom - (e.clientY - this.startPosition.y)
                            break
                        case 'box-bottom-center':
                            this.nowRect.bottom = this.startRect.bottom - (e.clientY - this.startPosition.y)
                            break
                        case 'box-center-right':
                            this.nowRect.right = this.startRect.right - (e.clientX - this.startPosition.x)
                            break
                        case 'box-bottom-right':
                            this.nowRect.right = this.startRect.right - (e.clientX - this.startPosition.x)
                            this.nowRect.bottom = this.startRect.bottom - (e.clientY - this.startPosition.y)
                            break
                        default:
                    }
                    return;
                }
                if (this.isBoxMoving) {
                    this.isFullScreen = false
                    this.isMaxShowing = false
                    this.nowRect.left = this.startRect.left + (e.clientX - this.startPosition.x)
                    this.nowRect.right = this.startRect.right - (e.clientX - this.startPosition.x)
                    this.nowRect.top = this.startRect.top + (e.clientY - this.startPosition.y)
                    this.nowRect.bottom = this.startRect.bottom - (e.clientY - this.startPosition.y)
                    return
                }
            },
            resizeMouseDown(e) {
                if (this.app.disableResize) {
                    return
                }
                this.showThisApp()
                if (this.isFullScreen || this.isMaxShowing) {
                    return
                }
                this.startRect = {
                    left: this.nowRect.left,
                    top: this.nowRect.top,
                    right: this.nowRect.right,
                    bottom: this.nowRect.bottom,
                };
                this.startPosition.x = e.clientX
                this.startPosition.y = e.clientY
                this.isBoxResizing = true
                this.moveDirection = e.target.className
            },
        }
    }
</script>
<style scoped>
    .moveBg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .box {
        --resize: 5px;
        --resize-bg: transparent;
        --resize-main: transparent;
        --resize-bg-main: transparent;
    }

    .box {
        display: flex;
        flex-direction: column;
        position: absolute;
        pointer-events: auto;
    }

    .box-top {
        display: flex;
        flex-direction: row;
    }

    .box-top-left {
        width: var(--resize);
        height: var(--resize);
        background: var(--resize-bg);
        cursor: nw-resize;
    }

    .box-top-center {
        height: var(--resize);
        background: var(--resize-bg-main);
        cursor: n-resize;
        flex-grow: 1;
    }

    .box-top-right {
        width: var(--resize);
        height: var(--resize);
        background: var(--resize-bg);
        cursor: ne-resize;
    }

    .box-center {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
    }

    .box-center-left {
        width: var(--resize);
        height: 100%;
        background: var(--resize-bg-main);
        cursor: w-resize;
    }

    .box-center-center {
        height: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        overflow: hidden;
    }

    .box-animation {
        transition: width 0.1s, height 0.1s, left 0.1s, right 0.1s, top 0.1s, bottom 0.1s;
    }

    .isMaxShowing {
        left: -5px !important;
        right: -5px !important;
        top: -5px !important;
        bottom: 60px !important;
    }

    .isFullScreen {
        position: fixed !important;
        z-index: 99999;
        bottom: -5px !important;
    }

    .isMaxShowing .box-center-center,
    .isFullScreen .box-center-center {
        border-radius: 0px !important;
    }

    .box-center-right {
        width: var(--resize);
        height: 100%;
        background: var(--resize-bg-main);
        cursor: e-resize;
    }

    .box-bottom {
        display: flex;
        flex-direction: row;
    }

    .box-bottom-left {
        width: var(--resize);
        height: var(--resize);
        background: var(--resize-bg);
        cursor: sw-resize;
    }

    .box-bottom-center {
        height: var(--resize);
        background: var(--resize-bg-main);
        cursor: s-resize;
        flex-grow: 1;
    }

    .box-bottom-right {
        width: var(--resize);
        height: var(--resize);
        background: var(--resize-bg);
        cursor: se-resize;
    }


    .loader {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }

    .app-bar {
        height: 40px;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(20px);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .app-bar .controll {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 15px;
    }

    .app-bar .controll div {
        border-radius: 100%;
        height: 11px;
        width: 11px;
        margin-right: 8px;
        cursor: pointer;
    }

    .app-bar .title {
        flex-grow: 1;
        color: #333;
        text-align: center;
        margin-right: 80px;
        font-weight: 500;
        text-shadow: none;
        font-size: 13px;
        cursor: move;
    }

    .controll .close {
        background: #fc605c;
        border: 1px solid #fc635d;
    }

    .controll .min {
        background: #fcbb40;
        border: 1px solid #f8b438;
    }

    .controll .full {
        background: #34c648;
        border: 1px solid #2bc03f;
    }

    .full-disabled {
        background: #ccc !important;
        border: 1px solid #ccc !important;
    }

    .app-body {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>