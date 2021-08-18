<!--
 * @FilePath: /mac-ui/src/components/DeskTop.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-02 21:45:20
 * @LastEditTime: 2021-08-19 00:59:15
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 桌面
-->

<template>
  <div class="desktop">
    <div class="top">
      <el-dropdown trigger="click">
        <div class="logo"><i class="iconfont icon-apple1"></i></div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="openAppByKey('system_about')">
              <div>关于本站</div>
            </el-dropdown-item>
            <el-dropdown-item class="line"></el-dropdown-item>
            <el-dropdown-item @click="openAppByKey('system_setting')">
              <div>系统偏好设置</div>
            </el-dropdown-item>
            <el-dropdown-item @click="openAppByKey('system_task')">
              <div>强制退出...</div>
            </el-dropdown-item>
            <el-dropdown-item @click="lockScreen">
              <div>锁定屏幕</div>
            </el-dropdown-item>
            <el-dropdown-item class="line"></el-dropdown-item>
            <el-dropdown-item @click="shutdown">
              <div>关机...</div>
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <div>退出登录 {{userName}}...</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="menu" v-for="item in menu" :key="item.value">
        <el-dropdown trigger="click" placement="bottom-start">
          <div class="item">{{item.title}}</div>
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="subItem in item.sub" :key="subItem.value">
                <el-dropdown-item class="line" v-if="subItem.isLine"></el-dropdown-item>
                <el-dropdown-item v-else>
                  <div>{{subItem.title}}</div>
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="space"></div>
      <div class="status">
        <div class="audio"><i class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-39"></i></div>
        <div class="datetime">{{timeString}}</div>
        <div class="notification"><i class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-25"></i></div>
      </div>
    </div>
    <div class="body">
      <div class="desktop-app">
        <template v-for="item in deskTopAppList" :key="item.key">
          <div class="app-item" v-on:dblclick="$store.commit('openApp',item)" v-if="!item.hideInDesktop">
            <div class="icon"><i :style="{backgroundColor:item.iconBgColor,color:item.iconColor}" class="iconfont"
                :class="item.icon"></i></div>
            <div class="title">{{item.title}}</div>
          </div>
        </template>
      </div>
      <transition-group name="fade-window">
        <template v-for="item in $store.state.openAppList" :key="item.pid">
          <App v-if="!item.outLink" v-show="!item.hide" :app="item" :key="item.pid"></App>
        </template>
      </transition-group>
    </div>
    <Dock></Dock>
  </div>
</template>
<script>
  import App from "@/components/App"
  import Dock from "@/components/Dock"
  export default {
    components: {
      App, Dock
    },
    data() {
      return {
        userName: "",
        menu: [],
        timeString: "",
        deskTopAppList: [],
        deskTopMenu: [
          // {
          //   key: "desktop",
          //   title: "桌面",
          //   sub: [
          //     {
          //       key: "big_icon",
          //       title: "大图标",
          //     },
          //     {
          //       key: "big_icon",
          //       title: "小图标",
          //     },
          //     {
          //       isLine: true
          //     },
          //     {
          //       key: "align_left",
          //       title: "左侧排列",
          //     },
          //     {
          //       key: "align_right",
          //       title: "右侧排列",
          //     },
          //     {
          //       isLine: true
          //     },
          //     {
          //       key: "wall",
          //       title: "更换壁纸...",
          //     }
          //   ]
          // }
        ]
      }
    },
    created() {
      this.menu = this.deskTopMenu
      this.userName = localStorage.getItem('user_name') || ''
      this.deskTopAppList = this.tool.getDeskTopApp()
      this.startTimer()
      this.$store.commit('getDockAppList')
    },
    methods: {
      startTimer() {
        setInterval(() => {
          this.timeString = this.tool.formatTime(new Date(), 'MM-dd HH:mm')
        }, 1000)
      },
      /**
       * @description: 打开指定key的应用
       */
      openAppByKey(key) {
        this.$store.commit('openAppByKey', key)
      },
      /**
       * @description: 锁定屏幕
       */
      lockScreen() {
        this.$emit('lockScreen')
      },
      /**
       * @description: 关机
       */
      shutdown() {
        this.$emit('shutdown')
      },
      /**
       * @description: 注销登录
       */
      logout() {
        this.$emit('logout')
      },
    }
  }
</script>
<style>
  .top .el-dropdown {
    color: white !important;
    height: 100% !important;
  }
</style>
<style scoped>
  .desktop {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    color: white;
    overflow: hidden;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  }

  .top {
    height: 28px;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: row;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    padding: 0px 5px;
    z-index: 100;
  }

  .space {
    flex-grow: 1;
  }

  .logo {
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 0px 15px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo .el-select {
    position: absolute;
    opacity: 0;
  }

  .logo:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .logo .iconfont {
    font-size: 16px;
    margin-top: -3px;
  }

  .menu {
    display: flex;
    flex-direction: row;
    font-size: 13px;
    height: 100%;
    font-weight: 500;
  }

  .menu .item {
    font-size: 13px;
    padding: 0px 15px;
    display: inline-block;
    flex-grow: 1;
    cursor: pointer;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .jump {
    animation: jumpAnimation 0.8s ease 1;
  }


  .menu .item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .dock .title {
    display: none;
  }


  .dock .item:hover .title {
    position: absolute;
    display: inherit;
    word-break: keep-all;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 12px;
    animation: dockTitleAnimation 0.5s ease 1 forwards;
  }

  .status {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .audio .iconfont,
  .notification .iconfont {
    font-size: 20px;
  }

  .datetime,
  .audio,
  .notification {
    cursor: pointer;
    padding: 0px 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .datetime:hover,
  .audio:hover,
  .notification:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .body {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .footer {
    position: fixed;
    left: 5px;
    right: 5px;
    bottom: 5px;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    z-index: 100;
  }

  .footer .dock {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
    border-radius: 10px;
    flex-direction: row;
    display: flex;
    padding: 2px;
  }

  .dock .item {
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .dock .dot {
    width: 3px;
    height: 3px;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 0px;
    border-radius: 5px;
    display: inline-block;
    font-size: 0;
  }

  .dock .item .iconfont {
    cursor: pointer;
    border-radius: 20px;
    padding: 2px;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    height: 30px;
    width: 30px;
    text-align: center;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform .3s, margin .3s;
  }

  .dock .item:hover .iconfont {
    transform: scale(2) translateY(-10px);
    margin: 0px 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  .dock .nearby .iconfont {
    transform: scale(1.6) translateY(-8px);
    margin: 0px 12px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  .dock .nearby1 .iconfont {
    transform: scale(1.2) translateY(-6px);
    margin: 0px 9px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  .dock .nearby2 .iconfont {
    transform: scale(1.1) translateY(-5px);
    margin: 0px 7px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  .desktop-app {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 20px;
    flex-wrap: wrap-reverse;
  }

  .app-item {
    padding: 10px 0px;
    flex-direction: column;
    text-align: center;
    text-shadow: 0px 0px 2px rgb(0 0 0 / 50%);
    cursor: pointer;
    border-radius: 10px;
    border: 2px solid transparent;
    justify-content: center;
    align-items: center;
    width: 80px;
  }

  .app-item .icon {
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .app-item .iconfont {
    font-size: 28px;
    border-radius: 10px;
    padding: 8px;
  }

  .app-item .title {
    font-size: 12px;
    margin-top: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .app-item:hover {
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
</style>