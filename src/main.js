/*
 * @FilePath: /mac-ui/src/main.js
 * @Author: admin@hamm.cn
 * @Date: 2021-08-02 21:45:20
 * @LastEditTime: 2021-08-18 23:44:51
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 入口文件
 */
import { createApp } from 'vue'
import { createStore } from 'vuex'

import MacOS from './MacOS'
let macOS = createApp(MacOS)


import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
macOS.use(ElementPlus)

import "@/asset/css/app.css"
import "@/asset/css/animation.css"

import config from './config'
macOS.config.globalProperties.config = config

import tool from './helper/tool'
macOS.config.globalProperties.tool = tool

import AppStore from './store/App'
const store = createStore(AppStore)
macOS.use(store)

window.macOS = macOS
macOS.mount('#app')