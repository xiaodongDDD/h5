<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components:{

  },
  data(){
    return{
      selected: 1
    }
  }
}
</script>

<style>
  @import "assets/css/reset.css";
  @import "assets/css/common.css";
  @import "assets/css/style.css";
  @import "assets/css/swiper.min.css";
#app {
  width: 100%;
  position: relative;
  height: 100%;
  font-family: PingFangSC-Light;
}

</style>
