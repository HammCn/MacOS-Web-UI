<!--
 * @FilePath: /MacOS/src/App.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-02 21:45:20
 * @LastEditTime: 2021-08-13 23:08:29
 * @LastEditors: admin@hamm.cn
 * Written by https://hamm.cn
 * @Description: 
-->
<template>
  <div class="app">
    <transition name="fade">
      <Bg></Bg>
    </transition>
    <transition name="fade">
      <Loading v-if="isLoading" @loaded="loaded"></Loading>
    </transition>
    <transition name="fade">
      <Login v-if="isLogin" @logined="logined"></Login>
    </transition>
    <transition name="fade">
      <DeskTop v-if="isDeskTop"></DeskTop>
    </transition>
  </div>
</template>

<style scoped>

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
        isLoading: false,
        isLogin: false,
        isDeskTop: true,
      }
    },
    created() { },
    methods: {
      loaded() {
        this.isLoading = false
        this.isLogin = true
      },
      logined() {
        console.log("login success")
        this.isLogin = false
        this.isDeskTop = true
      }
    }
  }
</script>