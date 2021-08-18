/*
 * @FilePath: /mac-ui/src/store/App.js
 * @Author: admin@hamm.cn
 * @Date: 2021-08-10 20:53:07
 * @LastEditTime: 2021-08-19 00:40:52
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: API
 */
import AppModel from "@/model/App"
import tool from "@/helper/tool"
export default {
    state() {
        return {
            nowApp: false,
            openAppList: [],
            dockAppList: [],
        }
    },
    mutations: {
        /**
         * @description: 打开上一次的应用
         */
        openTheLastApp(state) {
            let flag = false
            for (let i = state.openAppList.length - 1; i >= 0; i--) {
                if (!state.openAppList[i].hide && !flag) {
                    state.openAppList[i].isTop = true
                    state.nowApp = Object.assign({}, state.openAppList[i])
                    flag = true
                }
            }
        },
        /**
         * @description: 最小化应用
         */
        hideApp(state, app) {
            for (let i in state.openAppList) {
                if (state.openAppList[i].pid == app.pid) {
                    state.openAppList[i].hide = true
                    break
                }
            }
            this.commit('openTheLastApp')
        },
        /**
         * @description: 根据PID关闭应用
         */
        closeWithPid(state, pid) {
            for (let i in state.openAppList) {
                if (state.openAppList[i].pid == pid) {
                    state.openAppList.splice(i, 1)
                    break
                }
            }
        },
        /**
         * @description: 关闭应用
         */
        closeApp(state, app) {
            if (app.hideWhenClose) {
                this.commit('hideApp', app)
            } else {
                for (let i in state.openAppList) {
                    if (app.pid) {
                        if (state.openAppList[i].pid == app.pid) {
                            state.openAppList.splice(i, 1)
                            break
                        }
                    } else {
                        if (state.openAppList[i].key == app.key) {
                            state.openAppList.splice(i, 1)
                            break
                        }
                    }
                }
                this.commit('openTheLastApp')
            }
        },
        /**
         * @description: 打开应用
         */
        openApp(state, app) {
            if (app.outLink) {
                app.url && window.open(app.url)
                return
            }
            state.nowApp = Object.assign({}, app)
            if (app.multiTask) {
                for (let i in state.openAppList) {
                    state.openAppList[i].isTop = false
                }
                app.isTop = true
                app.pid = new Date().valueOf() + "." + parseInt(Math.random() * 99999999)
                state.openAppList.push(Object.assign({}, app))
            } else {
                let isExist = false
                for (let i in state.openAppList) {
                    state.openAppList[i].isTop = false
                    if (state.openAppList[i].key == app.key) {
                        state.openAppList[i].hide = false
                        state.openAppList[i].isTop = true
                        isExist = true
                    }
                }
                if (!isExist) {
                    app.isTop = true
                    app.pid = new Date().valueOf() + "." + parseInt(Math.random() * 99999999)
                    state.openAppList.push(Object.assign({}, app))
                }
            }
        },
        /**
         * @description: 显示并置顶APP
         */
        showApp(state, app) {
            state.nowApp = app
            for (let i in state.openAppList) {
                state.openAppList[i].isTop = false
                if (state.openAppList[i].pid == app.pid) {
                    state.openAppList[i].hide = false
                    state.openAppList[i].isTop = true
                }
            }
        },
        /**
         * @description: 根据key打开APP
         */
        openAppByKey(state, key) {
            let app = tool.getAppByKey(key)
            if (app) {
                this.commit('openApp', app)
            }
        },
        /**
         * @description: 带参数打开App
         */
        openWithData(state, data) {
            data.app.data = data.data
            this.commit('openApp', data.app)
        },
        /**
         * @description: 获取常驻Dock的App列表
         */
        getDockAppList(state) {
            let arr = []
            let appList = AppModel.allAppList
            for (let app of appList) {
                if (app.keepInDock) {
                    arr.push(app)
                }
            }
            state.dockAppList = arr
        },
    }
}