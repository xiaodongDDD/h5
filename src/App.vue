<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
//import { API } from './service/api'
export default {
  name: 'App',
  components:{

  },
  data(){
    return{
    }
  },
//  mounted () {
//    this.$http.get('http://quan-dev.xiaoheiban.cn?token=59a4e43d0179b04b5056178b').then(res => {
//      console.log(document.cookie)
//    })
//  },
//beforeCreate(){
//	API.get('http://quan-dev.xiaoheiban.cn?token=59a4e43d0179b04b5056178b').then(res=>{
//  },err=>{})
//   this.$router.push({path:'http://quan-dev.xiaoheiban.cn?token=59a4e43d0179b04b5056178b'})
//}
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
