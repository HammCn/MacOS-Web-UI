<!--
 * @FilePath: /mac-ui/src/MacOS.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-02 21:45:20
 * @LastEditTime: 2021-08-18 23:46:45
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 
-->
<template>
  <div class="mac-os" @mousedown.self="boot">
    <transition name="fade">
      <Bg v-if="isBg"></Bg>
    </transition>
    <transition name="fade">
      <Loading v-if="isLoading" @loaded="loaded"></Loading>
    </transition>
    <transition name="fade">
      <Login v-if="isLogin" @logined="logined"></Login>
    </transition>
    <transition name="fade">
      <DeskTop v-if="isDeskTop" @lockScreen="lockScreen" @shutdown="shutdown" @logout="logout"></DeskTop>
    </transition>
  </div>
</template>

<style scoped>
  .mac-os {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
<script>
  import Bg from "@/components/Bg"
  import Loading from "@/components/Loading"
  import Login from "@/components/Login"
  import DeskTop from "@/components/DeskTop"
  export default {
    components: {
      Bg,
      Loading,
      Login,
      DeskTop
    },
    data() {
      return {
        isBg: false,
        isLoading: false,
        isLogin: false,
        isDeskTop: false,
      }
    },
    created() {
      this.boot()
      // this.logined()
    },
    methods: {
      boot() {
        this.isLoading = true
      },
      loaded() {
        this.isLoading = false
        this.isBg = true
        this.isLogin = true
      },
      logined() {
        console.log("login success")
        this.isLogin = false
        this.isDeskTop = true
      },
      lockScreen() {
        this.isLogin = true
      },
      logout() {
        localStorage.removeItem("user_name")
        this.isDeskTop = false
        this.isLogin = true
      },
      shutdown() {
        localStorage.removeItem("user_name")
        this.isDeskTop = false
        this.isLogin = false
        this.isLoading = false
        this.isBg = false
      }
    }
  }
</script>