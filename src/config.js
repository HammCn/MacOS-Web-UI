/*
 * @FilePath: /el-vue/src/config.js
 * @Author: admin@hamm.cn
 * @Date: 2021-08-02 22:06:29
 * @LastEditTime: 2021-08-03 22:14:56
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 
 */

export default {
    debug: true,
    apiBaseUrl: "https://api.bbbug.com/api/",
    qiyeWechatWebhook: '',
    enableErrorReporter: false,
    httpStatusCode: {
        OK: 200,
        MOVED_PERMANENTLY: 301,
        FOUND: 302,
        NOT_MODIFIED: 304,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405,
        INTERNAL_SERVER_ERROR: 500,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504,
    },
    version: 10000,
    defaultErrorMessage: "请求服务器失败,请稍后再试",
    requestMissingUrl: "请求缺少url，请检查！"
}