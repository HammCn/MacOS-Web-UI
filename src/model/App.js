/*
 * @FilePath: /MacOS/src/model/App.js
 * @Author: admin@hamm.cn
 * @Date: 2021-08-09 20:51:06
 * @LastEditTime: 2021-08-10 22:27:04
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 
 */

export default {
    getAppByKey(key) {
        let appList = this.getAllAppList();
        for (let app of appList) {
            if (app.key == key) {
                return app
            }
        }
        return false
    },
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
            },
            {
                "key": "app_list",
                "icon": "icon-MIS_chanpinshezhi",
                "title": "应用中心",
                "iconColor": "#fff",
                "iconBgColor": "#db5048",
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