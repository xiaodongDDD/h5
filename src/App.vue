<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { API } from './service/api'
export default {
  name: 'App',
  components:{

  },
  data(){
    return{
    }
  },
  beforeCreate(){


  }
}
</script>

<style>
  @import "assets/css/reset.css";
  @import "../node_modules/mint-ui/lib/style.css";
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
