/*
 * @FilePath: /MacOS/src/model/App.js
 * @Author: admin@hamm.cn
 * @Date: 2021-08-09 20:51:06
 * @LastEditTime: 2021-08-11 22:19:23
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
                "hideWhenClose": true
            },
            {
                "key": "app_list",
                "icon": "icon-MIS_chanpinshezhi",
                "title": "应用中心",
                "iconColor": "#fff",
                "iconBgColor": "#db5048",
                "keepInDock": true,
            },
            {
                "key": "system_setting",
                "icon": "icon-shezhi",
                "title": "系统设置",
                "iconColor": "#fff",
                "iconBgColor": "#23282d",
                "width": 600,
                "height": 400,
                "disableResize": true,
                "tabbarBgColor": "#333",
                "tabbarTextColor": "#fff",
                "hideInDesktop": true,
                "keepInDock": true,
            },
            {
                "key": "user_list",
                "icon": "icon-MIS_CRMguanli",
                "title": "用户列表",
                "iconColor": "#fff",
                "iconBgColor": "#398fc1"
            },
            {
                "key": "note_add",
                "icon": "icon-MIS_bangongbiji",
                "title": "写日记",
                "iconColor": "#fff",
                "iconBgColor": "#2fc66b"
            }
        ]
    }
}