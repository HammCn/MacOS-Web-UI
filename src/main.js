/*
 * @FilePath: /MacOS/src/main.js
 * @Author: admin@hamm.cn
 * @Date: 2021-08-02 21:45:20
 * @LastEditTime: 2021-08-10 20:53:40
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 入口文件
 */
import { createApp } from 'vue'

import App from './App'
let app = createApp(App)


import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
app.use(ElementPlus)

import "@/asset/css/app.css"
import "@/asset/css/animation.css"

import config from './config'
app.config.globalProperties.config = config

import api from './helper/api'
app.config.globalProperties.api = api

window.app = app
app.mount('#app')