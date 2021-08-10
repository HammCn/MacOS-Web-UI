<!--
 * @FilePath: /MacOS/src/App.vue
 * @Author: admin@hamm.cn
 * @Date: 2021-08-02 21:45:20
 * @LastEditTime: 2021-08-10 22:37:26
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
  import Bg from "@/view/Bg"
  import Loading from "@/view/Loading"
  import Login from "@/view/Login"
  import DeskTop from "@/view/DeskTop"
  export default {
    components: {
      Bg,
      Loading,
      Login,
      DeskTop
    },
    data() {
      return {
        isLoading: true,
        isLogin: false,
        isDeskTop: false,
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