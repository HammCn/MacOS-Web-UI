/*
 * @Author: admin@hamm.cn
 * @Date: 2021-08-03 21:38:43
 * @LastEditTime: 2021-08-10 20:33:41
 * @LastEditors: admin@hamm.cn
 * @FilePath: /MacOS/src/helper/tool.js
 * Written by https://hamm.cn
 * @Description: 通用方法封装库
 */
import AppModel from "@/model/App"
export default {
    /**
     * @description: 从localstorage中获取access_token
     */
    getAccessToken() {
        return localStorage.getItem('AcessToken') || ""
    },
    saveAccessToken(access_token) {
        localStorage.setItem('AcessToken', access_token)
    },
    getTabApp() {
        let json = localStorage.getItem('tab_app') || '[]'
        let arr = JSON.parse(json)
        if (arr.length == 0) {
            return AppModel.getAllAppList()
        }
        return arr
    },
    getDeskTopApp() {
        let json = localStorage.getItem('desktop_app') || '[]'
        let arr = JSON.parse(json)
        if (arr.length == 0) {
            return AppModel.getAllAppList()
        }
        return arr
    },
    formatTime(date, format) {
        if (!date) return;
        if (!format) format = "yyyy-MM-dd";
        switch (typeof date) {
            case "string":
                date = new Date(date.replace(/-/, "/"));
                break;
            case "number":
                date = new Date(date);
                break;
            default:
        }
        var dict = {
            "yyyy": date.getFullYear(),
            "M": date.getMonth() + 1,
            "d": date.getDate(),
            "H": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds(),
            "MM": ("" + (date.getMonth() + 101)).substr(1),
            "dd": ("" + (date.getDate() + 100)).substr(1),
            "HH": ("" + (date.getHours() + 100)).substr(1),
            "mm": ("" + (date.getMinutes() + 100)).substr(1),
            "ss": ("" + (date.getSeconds() + 100)).substr(1)
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
            return dict[arguments[0]];
        });
    }
}