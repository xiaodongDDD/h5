<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
//import { API } from './service/api'
export default {
  name: 'App',
  components:{},
  watch: {  
    $route(to, from) {  
        /*console.log(to);  
        console.log(from); */
    }  
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

<style lang="less">
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
.mint-msgbox{
	color: #FFF;
	background-color: #2B2B2B;
	border: 2px solid #E3C277;
	border-radius: 10px;
	padding-top: 10px;
	
	.mint-msgbox-content{
		border: none;
	}
	.mint-msgbox-message{
		color: #FFFFFF;
		font-size: 17px;
	}
}
.mint-msgbox-title{
	color: #FFF;
	font-size: 20px;
}
.mint-msgbox-btns{
	padding-bottom: 15px;
	
	.mint-msgbox-btn{
		background-color: #2B2B2B;
		color: #F8E71C;
		font-size: 17px;
		border: none;
	}
}
.loadings{
	height: 40px;
	line-height: 40px;
}
.v-main .v-con img{
	max-width: 100%;
}
</style>
