<template>
  <div class="bg" :style="{ backgroundImage: 'url(' + bgImage + ')' }"></div>
</template>

<style scoped lang="scss">
.bg {
  background-color: #000;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
<script>
export default {
  data() {
    return {
      bgImage: require("@/asset/img/bg.jpg"),
    };
  },
};
</script>