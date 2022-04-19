<template>
  <div
    class="mac-os"
    @mousedown.self="boot"
    @contextmenu.prevent="onContextShow()"
  >
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
      <DeskTop
        v-if="isDeskTop"
        @lockScreen="lockScreen"
        @shutdown="shutdown"
        @logout="logout"
        @launchpad="launchpad"
      ></DeskTop>
    </transition>
    <transition name="fade">
      <LaunchPad v-if="isLaunchPad"></LaunchPad>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.mac-os {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
<script>
import Bg from "@/components/Bg";
import LaunchPad from "@/components/LaunchPad";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import DeskTop from "@/components/DeskTop";
export default {
  components: {
    Bg,
    Loading,
    Login,
    DeskTop,
    LaunchPad,
  },
  data() {
    return {
      isBg: true,
      isLoading: false,
      isLogin: false,
      isDeskTop: false,
      isLaunchPad: false,
    };
  },
  created() {
    let user_name = localStorage.getItem("user_name");
    if (user_name) {
      this.logined();
    } else {
      this.boot();
    }
  },
  methods: {
    onContextShow() {
      console.log("onContextShow");
    },
    boot() {
      this.isLoading = true;
    },
    loaded() {
      this.isLoading = false;
      this.isBg = true;
      this.isLogin = true;
    },
    logined() {
      this.isLogin = false;
      this.isDeskTop = true;
    },
    launchpad(show) {
      this.isLaunchPad = show;
    },
    lockScreen() {
      this.isLogin = true;
    },
    logout() {
      localStorage.removeItem("user_name");
      this.isDeskTop = false;
      this.isLogin = true;
    },
    shutdown() {
      localStorage.removeItem("user_name");
      this.isDeskTop = false;
      this.isLogin = false;
      this.isLoading = false;
      this.isBg = false;
    },
  },
};
</script>
