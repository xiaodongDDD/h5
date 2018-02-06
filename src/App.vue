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
    API.get('?token=59a4e43d0179b04b5056178b').then((res)=>{
      console.log('登录成功');
    },(err)=>{
      console.log('22222');
    })
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
