/*
 * @FilePath: /el-vue/src/model/User.js
 * @Author: admin@hamm.cn
 * @Date: 2021-08-03 22:18:32
 * @LastEditTime: 2021-08-03 23:44:54
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 
 */

import request from '@/helper/request'
export default {
    login(object) {
        request({
            url: "user/login",
            method: "POST",
            data: object.data
        }, object)
    }
};