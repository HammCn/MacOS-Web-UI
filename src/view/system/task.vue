<!--
 * @FilePath: /mac-ui/src/view/system/task.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-02 21:56:04
 * @LastEditTime: 2021-08-18 23:46:35
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: Index
-->
<template>
    <div class="task">
        <div class="task-list">
            <template v-for="item in $store.state.openAppList" :key="item.pid">
                <div class="task-item" :class="app && app.pid == item.pid ? 'active':''" @click="selectApp(item)">
                    <i class="iconfont" :class="item.icon"
                        :style="{backgroundColor:item.iconBgColor,color:item.iconColor}"></i>
                    <span class="task-name">{{item.title}}</span>
                </div>
            </template>
        </div>
        <div class="task-ctrl">
            <el-button size="mini" type="primary" :disabled="!app" @click="closeApp">强制退出</el-button>
        </div>
    </div>
</template>

<style scoped>
    .task {
        display: flex;
        flex-direction: column;
        height: 350px;
        width: 100%;
        color: #333;
        text-shadow: none;
        font-weight: 300;
        overflow: hidden;
    }

    .task-list {
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
    }

    .task-ctrl {
        justify-content: flex-end;
        align-items: center;
        display: flex;
        padding: 0px 10px;
        margin-top: 10px;
    }

    .task-item {
        padding: 8px 16px;
        display: flex;
        margin: 2px 5px;
        flex-direction: row;
        font-size: 14px;
        cursor: pointer;
        border-radius: 5px;
        align-items: center;
    }

    .active {
        background: rgb(75, 158, 251);
        color: white;
    }

    .task {
        margin: 10px 20px;
    }

    .task-item .task-name {
        flex-grow: 1;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }

    .task-item .iconfont {
        background: red;
        color: white;
        border-radius: 10px;
        width: 30px;
        height: 30px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
    }

    .task-item:hover .task-pid {
        color: #fff;
    }

    .task-item:hover {
        background: rgb(75, 158, 251);
        color: white;
    }
</style>
<script>
    export default {
        data() {
            return {
                appList: [],
                app: false,
            }
        },
        created() {
        },
        methods: {
            selectApp(item) {
                this.app = Object.assign({}, item)
            },
            closeApp() {
                if (this.app) {
                    this.$emit("api", {
                        event: "closeApp",
                        pid: this.app.pid,
                    })
                }
            }
        }
    }
</script>