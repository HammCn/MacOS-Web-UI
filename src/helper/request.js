/*
 * @Author: admin@hamm.cn
 * @Date: 2021-08-02 22:15:37
 * @LastEditTime: 2021-08-03 23:56:18
 * @LastEditors: admin@hamm.cn
 * @FilePath: /el-vue/src/helper/request.js
 * Written by https://hamm.cn
 * @Description: 网络请求封装库
 */
import axios from 'axios'
import tool from "./tool"

/**
 * 高度封装的请求方法
 * 支持参数 url,method,header,data,success,error
 * @param {object} 请求参数对象
 * @param {object} 如需要回调 请原封不动传入
 */
function request(data, object = {}) {
    let that = window.app.config.globalProperties
    const HTTP_STATUS_CODE = that.config.httpStatusCode
    const VERSION = that.config.version

    const DEFAULT_ERROR_MESSAGE = that.config.defaultErrorMessage
    //开始处理请求地址
    const API_BASE_URL = that.config.apiBaseUrl
    if (!data.success && object.success) {
        data.success = object.success
    }
    if (!data.error && object.error) {
        data.error = object.error
    }
    if (!data.login && object.login) {
        data.login = object.login
    }
    if (!data.final && object.final) {
        data.final = object.final
    }
    if (!data.url) {
        if (data.error) {
            let ret = data.error(that.config.requestMissingUrl)
            if (!ret) {
                that.$message.error(that.config.requestMissingUrl)
            }
        } else {
            that.$message.error()
        }
        return
    }
    if (data.url.indexOf("https://") < 0 && data.url.indexOf("http://") < 0) {
        //相对地址 追加API_BASE_URL
        data.url = API_BASE_URL + data.url
    }

    //处理请求方法 默认GET
    if (!data.method) {
        data.method = "get"
    }

    //开始处理请求Headers
    let header = {
        'Content-Type': 'application/json',
    }
    if (data.header) {
        for (let i in data.header) {
            header[i] = data.header[i]
        }
    }
    //如未指定不需要传TOKEN，则默认带上
    let access_token = tool.getAccessToken()
    if (!data.noToken) {
        data.data.access_token = access_token
    }
    data.data.version = VERSION
    data.data.plat = "api"
    data.data.user_device = "user_device"

    //走不同的请求方法
    let result = false;
    switch (data.method.toLowerCase()) {
        case 'post':
            result = axios.post(data.url, data.data, {
                headers: header
            })
            break
        case 'put':
            axios.put(data.url, data.data, {
                headers: header
            })
            break
        case 'delete':
            axios.delete(data.url, {
                headers: header
            })
            break
        default:
            axios.get(data.url, {
                headers: header
            })
    }
    result.then((response) => {
        switch (response.data.code) {
            case HTTP_STATUS_CODE.OK:
                if (data.success) {
                    let hide = data.success(response.data)
                    if (!hide) {
                        that.$message.success(response.data.msg)
                    }
                } else {
                    that.$message.success(response.data.msg)
                }
                break
            case HTTP_STATUS_CODE.UNAUTHORIZED:
                if (data.login) {
                    data.login()
                } else {
                    localStorage.setItem("path", location.pathname)
                    that.$router.push("/login")
                }
                break
            default:
                if (data.error) {
                    let hide = data.error(response.data)
                    if (!hide) {
                        that.$message.error(response.data.msg)
                    }
                } else {
                    that.$message.error(response.data.msg)
                }
                sendRobotMessage(data, response)
        }
        data.final && data.final()
    })
        .catch((error) => {
            that.config.debug && console.log(error)
            if (data.error) {
                let ret = data.error(DEFAULT_ERROR_MESSAGE)
                if (!ret) {
                    that.$message.error(DEFAULT_ERROR_MESSAGE)
                }
            } else {
                that.$message.error(DEFAULT_ERROR_MESSAGE)
            }
            sendRobotMessage(data, error.response)
            data.final && data.final()
        })
}
/**
 * @description: 发送消息到企业微信群
 */
function sendRobotMessage(data, response) {
    let that = window.app.config.globalProperties
    if (that.config.enableErrorReporter) {
        let url = that.config.qiyeWechatWebhook
        let responseData = ""
        try {
            responseData = JSON.stringify(response.data)
        } catch (e) {
            responseData = response.data
        }
        if ([503, 504, 502].indexOf(response.status) >= 0) {
            return
        }
        let markdown =
            `
# 异常接口告警提示 
接口地址：**`+ data.url + `**
请求方法：**`+ data.method.toUpperCase() + `**
返回状态：**` + response.status + `(` + response.statusText + `)` + `**
请求数据：
> \``+ (data.data ? JSON.stringify(data.data) : "No Data") + `\`

响应数据：
> \``+ responseData + `\`
`
        axios.post(url,
            {
                "msgtype": "markdown",
                "markdown": {
                    "content": markdown
                }
            }
        )
    }
}
export default request