<template>
  <section>
    <div class="main">
      <div class="search-head">
        <input type="text" class="content" placeholder="请输入教师名称或文章关键字" v-model="searchContent"><i class="search left"></i>
        <button class="btn" @click="search()" ref="btn">搜索</button>
      </div>
      <div class="search-body">
        <!--默认页面-->
        <p class="search-first" v-show="origin">您可以搜索文章标题、内容、作者的关键字</p>

        <!--没有内容-->
        <div class="search-null" v-show="!origin&!results">
          <img src="../../assets/img/ic_blank_search.png" style="width:168px;height:123px;">
          <div>
            <p>没有符合关键字的搜索结果</p>
            <p>请更换输入其他关键字后重试</p>
          </div>
        </div>
        <!--有内容-->
        <div class="search-some" v-show="!origin&results" :style="{'-webkit-overflow-scrolling': scrollMode}">
          <h5 class="some-title">搜索结果</h5>
          <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" :bottomDropText="'加载中...'">
          <!--文章列表-->
            <div>
            <ul class="index-list">
              <li  v-for="item in articleList" @click="getDetails(item.type,item.article_id)">
                <div class="list-head">
                  <img :src="item.img" class="head-image">
                  <span class="head-name">{{item.user_name}}</span>
                  <span class="head-time">{{item.update_time| timestampToMD(item.update_time)}}</span>
                </div>
                <div class="list-content">
                  <span class="content-word">{{item.title}}</span>
                  <div class="content-bottom">
                    <span class="content-comment">{{item.comments | comments(item.comments)}}评论</span>
                    <!--<span class="content-integral" v-if="item.is_charge>0">{{item.points}}积分</span>-->
                    <!--<span class="content-integral" v-else-if="item.buyState<0"><i class="is-buy" style="top:50%;margin-top:-4px;"></i>&nbsp;&nbsp;&nbsp;已购</span>-->
                    <!--<span class="content-integral" v-else-if="item.is_charge==0">免费</span>-->
                  </div>
                  <img :src="item.cover" class="content-image">
                  <img src="../../assets/img/ic_video_play_video.png" class="video-button" v-show="item.type == 3">
                </div>
              </li>
            </ul>
          </div>
          <!--教师列表-->
          </v-loadmore>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { API } from '../../service/api';
  import { Loadmore } from 'mint-ui';
  export default {
    name: "search",
    components:{'v-loadmore':Loadmore},
    filters:{
      timestampToMD:function (timestamp) {
        if(!timestamp){
          timestamp = +new Date()/1000;
        }
        const date = new Date(timestamp * 1000);
        const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        const D = date.getDate() + ' ';
        return M+'/'+D;
      },
      comments:function (num) {
        if(num>=1000){
          return (num/10000).toFixed(1) + '万'
        }else{
          return num
        }
      }
    },
    data(){
      return{
        searchContent:'',
        articleList:[],
        teacherList:[],
        origin: true,
        results: false,
        allLoaded: false, //false可以上拉，true为禁止上拉
        scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        totalPage:0,
        page: 1
    }
    },
    watch:{
      searchContent:function (searchContent) {
        const btn = this.$refs.btn;
        if(searchContent!==''){
          btn.style= 'background-color:#f8e71c;color:#000';
        }else{
          btn.style= 'background-color:#ddd;color:#aaa';
        }
      }
    },
    methods:{
      search(){
        const search = 'quan.searchClick';
        const baseUrl = 'http://quan-dev.xiaoheiban.cn/api/?method=';
        const keyword = this.searchContent;
        API.get(`${baseUrl}${search}&keyword=${keyword}&page=1&token=593d1f70af36444423ebc533`).then((res)=>{
          console.log(res);
          this.origin = false;
          this.totalPage = Math.ceil(res.response.total_num/10);
          this.articleList = res.response.article_list;
          if(res.response.article_list.length<=0){
            this.results = false;
          }else{
            this.results = true;
          }
        },(err)=>{
          console.log(err);
        })
      },
      getDetails(type,id){
//    	console.log(id); return false;
				let arurl = '';
				if(this.useragent == 0){
					switch (type) {
		        case 1:
		          var path = '/article?' + id;
		          this.$router.push({path: path});
		          break;
		        case 2:
		          var path = '/audio?' + id;
		          this.$router.push({path: path});
		          break;
		        default:
		          var path = '/video?' + id;
		          this.$router.push({path: path});
		     	}
				}else{
					switch (type) {
		        case 1:
		          arurl = this.jsPath + `article?${id}`;
//		          JSAction.openUrl(arurl);
				  		window.location.href = arurl;
		          break;
		        case 2:
		          arurl = this.jsPath + `audio?${id}`;
//		          JSAction.openUrl(arurl);
				  		window.location.href = arurl;
		          break;
		        default:
		          arurl = this.jsPath + `video?${id}`;
//		          JSAction.openUrl(arurl);
				  		window.location.href = arurl;
		     	}
				}
	  	},
      loadBottom:function() {
        // 上拉加载
        this.more();// 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadPageList:function (){
          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          // this.isHaveMore(data.result.haveMore);
          // this.pageList = data.result.pageList;
          this.$nextTick(function () {
            this.scrollMode = "touch";
          });

      },
      more:function (){
        // 分页查询
        var haveMore = true;
        if(this.totalPage>this.page){
          this.page++
        }else {
          haveMore = false;
        }
        const search = 'quan.searchClick';
        const baseUrl = 'http://quan-dev.xiaoheiban.cn/api/?method=';
        const keyword = this.searchContent;
        API.get(`${baseUrl}${search}&keyword=${keyword}&page=${this.page}&token=593d1f70af36444423ebc533`).then((res)=>{
          console.log('11111');
          this.origin = false;
          if(haveMore){
            this.articleList = this.articleList.concat(res.response.article_list);
          }
          this.isHaveMore(haveMore);
          if(res.response.article_list.length<=0){
            this.results = false;
          }else{
            this.results = true;
          }
        },(err)=>{
          console.log(err);
        })
      },
      isHaveMore:function(isHaveMore){
        this.allLoaded = true; //true是禁止上拉加载
        if(isHaveMore){
          this.allLoaded = false;
        }
      }
    },
    created() {
    },
    mounted() {
    },
    metaInfo: {
      title: "搜索",
      meta: [{
        name: 'xiaoheiban_disable_share',
        content: 'true'
      }]
    }

  }
</script>

<style scoped>
  .video-button {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 43px;
    top: 85px;
  }
.main{
  width: 100%;
  height: 100%;
  background-color: rgb(247,247,247);
  font-family: PingFangSC-Light;
}
.main .search-head{
  width: 100%;
  height: 44px;
  background-color: #fff;
  position: relative;
}
input::placeholder{
  font-size: 14px;
  color: #aaa;
  font-family: PingFangSC-Light;
}
.main .content{
  width: 242px;
  height: 30px;
  border-radius: 2px;
  background-color: #f8f8f8;
  position: absolute;
  left: 20px;
  top:50%;
  margin-top: -15px;
  padding-left: 33px;
  font-size: 14px;
}
.left{
  left: 26px;
  z-index: 10;
  top: 50%;
  margin-top: -10px;
}
.btn{
  width: 60px;
  height: 30px;
  border-radius: 2px;
  background-color: #ddd;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #AAAAAA;
  line-height: 30px;
  position: absolute;
  right: 15px;
  top: 50%;
  margin-top: -15px;
}

.search-body{
  /*text-align: center;*/
}
.search-first{
  color: #aaa;
  font-size: 14px;
  padding-top: 30px;
  text-align: center;
}
.search-null{
  margin-top: 50px;
  text-align: center;
}
.search-null div{
  padding-top: 25px;
}
.search-null p{
  display: block;
  font-family: PingFangSC-Light;
  font-size: 17px;
  line-height: 21px;
  color: #aaa;
}
.search-some .some-title{
  height: 14px;
  padding-top: 10px;
  padding-left: 15px;
  font-size: 14px;
  width: 100%;
  color: #aaa;
  background-color: #f8f8f8;

}
.index-list li{
  width: 100%;
  height: 154px;
  background-color: #fff;
  margin-top: 6px;
  position: relative;
}
.index-list .list-head{
  position: relative;
  top: 14px;
  color: #aaa;
  font-size: 14px;
  padding-left: 15px;
  height: 28px;
  line-height: 28px;
  width: 100%;
}
.index-list .list-head .head-image{
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.index-list .list-head .head-name{
  margin-left: 5px;
}
.index-list .list-head .head-time{
  position: absolute;
  right: 30px;
  top: 2px;
}
.index-list .list-content .content-word{
  width: 244px;
  height: 42px;
  font-size: 17px;
  position: absolute;
  left: 15px;
  top: 53px;
}
.index-list .list-content .content-bottom{
  color: #aaa;
  font-size: 14px;
  position: absolute;
  left: 15px;
  bottom: 16px;
}
.index-list .list-content .content-bottom .content-comment{
  margin-right: 20px;
}
.index-list .list-content .content-image{
  width: 86px;
  height: 86px;
  position: absolute;
  right: 15px;
  top: 53px;
}
.detail-main{
  margin-top: 5px;
  width: 100%;
  height: 159px;
  background-color: #fff;
  border-radius: 2px;
}
.detail-main .detail-top{
  padding: 15px;
  height: 100px;
}
.detail-main .detail-top .head-image{
  width: 100px;
  height: 100px;
  margin-right: 15px;
}
.detail-main .detail-top .detail-word{
  display: inline-block;

}
.detail-word .name{
  font-size: 17px;
  font-family: PingFangSC-Regular;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
}
.detail-word .word{
  font-family: PingFangSC-Light;
  font-size: 14px;
  color: #000000;
  line-height: 22px;
}
.detail-main .detail-bottom{
  font-family: PingFangSC-Light;
  color: #aaa;
  font-size: 14px;
  padding-left: 23px;
  padding-right: 15px;
  position: relative;
}
.detail-bottom .left{
  top: 50%;
  margin-top: -6px;
}
.detail-bottom .follow-number{
  margin-left: 18px;
}
.detail-bottom .center{
  top: 50%;
  margin-top: -6px;
  left: 80px;
}
.detail-bottom .article-number{
  margin-left: 35px;
}
.right{
  float: right;
}


</style>
