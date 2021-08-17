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
                "component": "SystemAbout",
                "icon": "icon-question",
                "title": "关于本站",
                "iconColor": "#fff",
                "iconBgColor": "#23282d",
                "width": 400,
                "height": 250,
                "disableResize": true,
                "titleBgColor": "#333",
                "titleColor": "#fff",
                "hideInDesktop": true,
            },
            {
                "key": "demo_demo",
                "component": "Demo",
                "icon": "icon-MIS_chanpinshezhi",
                "title": "DEMO",
                "iconColor": "#fff",
                "iconBgColor": "#db5048",
                "width": 600,
                "height": 400,
                "keepInDock": true,
            },
            {
                "key": "demo_dock",
                "component": "DemoDock",
                "icon": "icon-MIS_bangongOA",
                "title": "常驻Dock应用",
                "iconColor": "#fff",
                "iconBgColor": "#022732",
                "width": 420,
                "height": 350,
                "keepInDock": true,
            },
            {
                "key": "demo_unresize",
                "component": "DemoUnResize",
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
                "component": "DemoUnClose",
                "icon": "icon-wechat-fill",
                "title": "无法彻底关闭",
                "iconColor": "#fff",
                "iconBgColor": "#24dc72",
                "width": 610,
                "height": 430,
                "hideWhenClose": true
            },
            {
                "key": "demo_hidedesktop",
                "component": "DemoHideDesktop",
                "icon": "icon-shezhi",
                "title": "不在桌面显示",
                "iconColor": "#333",
                "iconBgColor": "#d4dbef",
                "width": 500,
                "height": 300,
                "hideInDesktop": true,
                "keepInDock": true,
            },
            {
                "key": "demo_colorfull",
                "component": "DemoColorFull",
                "icon": "icon-changyongtubiao-mianxing-86",
                "title": "花里胡哨",
                "iconColor": "#fff",
                "iconBgColor": "#ff4500",
                "width": 420,
                "height": 310,
                "titleBgColor": "#ff4500",
                "titleColor": "#fff",
            },
            {
                "key": "demo_camera",
                "component": "DemoCamera",
                "icon": "icon-camera1",
                "title": "Photo Booth",
                "iconColor": "#fff",
                "iconBgColor": "#E24637",
                "width": 540,
                "height": 540,
                "disableResize": true,
            },
            {
                "key": "demo_multitask",
                "component": "DemoMultiTask",
                "icon": "icon-app",
                "title": "多任务应用",
                "iconColor": "#fff",
                "iconBgColor": "#333",
                "width": 600,
                "height": 400,
                "multiTask": true,
                "keepInDock": true,
            },
        ]
    }
}