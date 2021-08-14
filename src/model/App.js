/*
 * @FilePath: /MacOS/src/model/App.js
 * @Author: admin@hamm.cn
 * @Date: 2021-08-09 20:51:06
 * @LastEditTime: 2021-08-13 21:37:59
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 
 */

export default {
    /**
     * @description: 获取常驻Dock的App列表
     */
    getDockAppList() {
        let arr = []
        let appList = this.getAllAppList()
        for (let app of appList) {
            if (app.keepInDock) {
                arr.push(app)
            }
        }
        return arr
    },
    /**
     * @description: 获取指定key的App
     */
    getAppByKey(key) {
        let appList = this.getAllAppList()
        for (let app of appList) {
            if (app.key == key) {
                return app
            }
        }
        return false
    },
    /**
     * @description: 所有App列表
     */
    getAllAppList() {
        return [
            {
                "key": "system_about",
                "icon": "icon-question",
                "title": "关于本站",
                "iconColor": "#fff",
                "iconBgColor": "#23282d",
                "width": 400,
                "height": 250,
                "disableResize": true,
                "tabbarBgColor": "#333",
                "tabbarTextColor": "#fff",
                "hideInDesktop": true,
            },
            {
                "key": "demo_demo",
                "icon": "icon-MIS_chanpinshezhi",
                "title": "DEMO",
                "iconColor": "#fff",
                "iconBgColor": "#db5048",
                "width": 800,
                "height": 500,
                "keepInDock": true,
            },
            {
                "key": "demo_dock",
                "icon": "icon-MIS_bangongOA",
                "title": "常驻Dock应用",
                "iconColor": "#fff",
                "iconBgColor": "#022732",
                "width": 400,
                "height": 250,
                "keepInDock": true,
            },
            {
                "key": "demo_unresize",
                "icon": "icon-smallscreen_fill",
                "title": "固定尺寸应用",
                "iconColor": "#fff",
                "iconBgColor": "#1573fa",
                "width": 600,
                "height": 400,
                "disableResize": true,
            },
            {
                "key": "demo_unclose",
                "icon": "icon-wechat-fill",
                "title": "无法彻底关闭",
                "iconColor": "#fff",
                "iconBgColor": "#24dc72",
                "width": 600,
                "height": 400,
                "hideWhenClose": true
            },
            {
                "key": "demo_hidedesktop",
                "icon": "icon-shezhi",
                "title": "不在桌面显示",
                "iconColor": "#333",
                "iconBgColor": "#d4dbef",
                "width": 600,
                "height": 400,
                "hideInDesktop": true,
                "keepInDock": true,
            },
            {
                "key": "demo_colorfull",
                "icon": "icon-changyongtubiao-mianxing-86",
                "title": "花里胡哨",
                "iconColor": "#fff",
                "iconBgColor": "#ff4500",
                "width": 600,
                "height": 400,
                "tabbarBgColor": "#ff4500",
                "tabbarTextColor": "#fff",
            },
            {
                "key": "demo_camera",
                "icon": "icon-camera1",
                "title": "Photo Booth",
                "iconColor": "#fff",
                "iconBgColor": "#E24637",
                "width": 540,
                "height": 540,
                "disableResize": true,
            },
        ]
    }
}