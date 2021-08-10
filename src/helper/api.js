/*
 * @FilePath: /MacOS/src/helper/api.js
 * @Author: admin@hamm.cn
 * @Date: 2021-08-10 20:53:07
 * @LastEditTime: 2021-08-10 20:55:22
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: API
 */
export default {
    closeWindow() {
        this.callApi('closeWindow')
    },
    callApi(action) {
        this.$emit('api', action)
    }
}