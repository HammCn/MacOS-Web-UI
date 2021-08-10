<!--
 * @FilePath: /MacOS/src/view/DeskTop.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-02 21:45:20
 * @LastEditTime: 2021-08-10 22:27:42
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 
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
            <el-dropdown-item>
              <div>系统偏好设置</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div>强制退出...</div>
            </el-dropdown-item>
            <el-dropdown-item class="line"></el-dropdown-item>
            <el-dropdown-item>
              <div>锁定屏幕</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div>重新启动...</div>
            </el-dropdown-item>
            <el-dropdown-item class="line"></el-dropdown-item>
            <el-dropdown-item>
              <div>关机...</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div>退出登录 Hamm...</div>
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
        <div class="app-item" v-for="item in deskTopAppList" :key="item.key" @click="openApp(item)">
          <div class="icon" :style="{backgroundColor:item.iconBgColor,color:item.iconColor}"><i class="iconfont"
              :class="item.icon"></i></div>
          <div class="title">{{item.title}}</div>
        </div>
      </div>
      <template v-for="item in openAppList" :key="item.key">
        <transition name="fade-window">
          <AppLoader :app="item" @open="openApp" @close="closeApp"></AppLoader>
        </transition>
      </template>
    </div>
    <div class="footer">
      <div class="space"></div>
      <div class="tabbar">
        <div class="item"><i style="background-color:#939391" class="iconfont icon-shezhi"></i></div>
        <div class="item"><i style="background-color:#257eef" class="iconfont icon-youjian"></i></div>
        <div class="item"><i style="background-color: #27abed;" class="iconfont icon-shangpu"></i></div>
        <div class="item"><i style="background-color: #2197d8;" class="iconfont icon-BugReport"></i></div>
        <div class="item"><i style="background-color: #262626;" class="iconfont icon-naozhong"></i></div>
        <div class="item"><i style="background-color: #d8d8d8;color: #298ae9;" class="iconfont icon-zhinanzhen"></i>
        </div>
        <div class="item"><i style="background-color: #c5202a;color: #fff;" class="iconfont icon-oschina"></i>
        </div>
        <div class="item"><i style="background-color: #24292e;" class="iconfont icon-github"></i></div>
        <div class="item"><i style="background-color: #ffffff;color:#2b9eed ;" class="iconfont icon-vscode"></i>
        </div>
        <div class="item"><i style="background-color: #217bfb;color: white;" class="iconfont icon-alipay"></i>
        </div>
        <div class="item"><i style="background-color: #41a4e8" class="iconfont icon-dingtalk"></i></div>
        <div class="item"><i style="background-color: #db5048" class="iconfont icon-chrome-fill"></i></div>
        <div class="item"><i style="background-color: #126bfb;color: white;" class="iconfont icon-zhihu"></i>
        </div>
        <div class="item"><i style="background-color: #22cd6a" class="iconfont icon-wechat-fill"></i></div>
        <div class="item"><i style="background-color: #000000;" class="iconfont icon-QQ"></i></div>
        <div class="item"><i style="background-color: #2cb256;" class="iconfont icon-icon-oschina-circle"></i>
        </div>
        <div class="item"><i style="background-color: #338ec3" class="iconfont icon-twitter"></i></div>
        <div class="item"><i style="background-color: #d42927;" class="iconfont icon-weibo1"></i></div>
        <div class="item"><i style="background-color: white;color: #fc0d1b;" class="iconfont icon-Youtube-fill"></i>
        </div>
        <div class="item"><i style="background-color: #e85349;color: #fff;" class="iconfont icon-google"></i>
        </div>
      </div>
      <div class="space"></div>
    </div>
  </div>
</template>
<script>
  import AppModel from "@/model/App"
  import AppLoader from "@/view/AppLoader"
  import tool from "@/helper/tool"
  export default {
    components: {
      AppLoader,
    },
    data() {
      return {
        menu: [],
        timeString: "",
        openAppList: [],
        deskTopAppList: [],
        tabAppList: [],
        deskTopMenu: [
          {
            key: "desktop",
            title: "桌面",
            sub: [
              {
                key: "big_icon",
                title: "大图标",
              },
              {
                key: "big_icon",
                title: "小图标",
              },
              {
                isLine: true
              },
              {
                key: "align_left",
                title: "左侧排列",
              },
              {
                key: "align_right",
                title: "右侧排列",
              },
              {
                isLine: true
              },
              {
                key: "wall",
                title: "更换壁纸...",
              }
            ]
          }
        ]
      }
    },
    created() {
      this.menu = this.deskTopMenu
      this.loadApp()
      this.startTimer()
    },
    methods: {
      startTimer() {
        setInterval(() => {
          this.timeString = tool.formatTime(new Date(), 'MM-dd HH:mm')
        }, 1000)
      },
      closeApp(app) {
        for (let i in this.openAppList) {
          if (this.openAppList[i].key == app.key) {
            this.openAppList.splice(i, 1);
          }
        }
      },
      openApp(app) {
        for (let i in this.openAppList) {
          if (this.openAppList[i].key == app.key) {
            this.openAppList.splice(i, 1);
          }
        }
        this.openAppList.push(app);
      },
      openAppByKey(key) {
        let app = AppModel.getAppByKey(key)
        if (app) {
          this.openApp(app)
        }
      },
      loadApp() {
        this.tabAppList = tool.getTabApp()
        this.deskTopAppList = tool.getDeskTopApp()
        this.$nextTick(() => {
          let children = document.querySelector(".tabbar").children
          for (let i = 0; i < children.length; i++) {
            children[i].addEventListener("mouseover", () => {
              try {
                children[i].previousSibling.className = "item nearby"
                children[i].nextSibling.className = "item nearby"
                children[i].previousSibling.previousSibling.className = "item nearby1"
                children[i].nextSibling.nextSibling.className = "item nearby1"
                children[i].previousSibling.previousSibling.previousSibling.className = "item nearby2"
                children[i].nextSibling.nextSibling.nextSibling.className = "item nearby2"
              } catch (e) {
                //DOM不存在 捕获
              }
            })
            children[i].addEventListener("mouseout", () => {
              try {
                children[i].previousSibling.className = "item"
                children[i].nextSibling.className = "item"
                children[i].previousSibling.previousSibling.className = "item"
                children[i].nextSibling.nextSibling.className = "item"
                children[i].previousSibling.previousSibling.previousSibling.className = "item"
                children[i].nextSibling.nextSibling.nextSibling.className = "item"
              } catch (e) {
                //DOM不存在 捕获
              }
            })
          }
        })
      }
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
    z-index: 9999;
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

  .menu .item:hover {
    background-color: rgba(255, 255, 255, 0.1);
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
    z-index: 9999;
  }

  .footer .tabbar {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
    border-radius: 10px;
    flex-direction: row;
    display: flex;
    padding: 2px;
  }

  .tabbar .item {
    padding: 3px;
  }

  .tabbar .item .iconfont {
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

  .tabbar .item:hover .iconfont {
    transform: scale(2) translateY(-10px);
    margin: 0px 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  .tabbar .nearby .iconfont {
    transform: scale(1.6) translateY(-8px);
    margin: 0px 12px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  .tabbar .nearby1 .iconfont {
    transform: scale(1.2) translateY(-6px);
    margin: 0px 9px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  .tabbar .nearby2 .iconfont {
    transform: scale(1.1) translateY(-5px);
    margin: 0px 7px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  .desktop-app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 20px;
  }

  .app-item {
    margin: 5px;
    padding: 5px;
    flex-direction: column;
    text-align: center;
    text-shadow: 0px 0px 2px rgb(0 0 0 / 50%);
    cursor: pointer;
    border-radius: 10px;
    border: 2px solid transparent;
  }

  .app-item .icon {
    border-radius: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .app-item .iconfont {
    font-size: 36px;
  }

  .app-item .title {
    font-size: 12px;
    width: 50px;
    margin-top: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .app-item:hover {
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
</style>