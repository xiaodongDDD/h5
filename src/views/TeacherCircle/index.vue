<template>
  <section>
    <div class="teacherCircle-container">
      <!--轮播图-->
      <mt-swipe :auto="4000" class="swipeContent">
        <mt-swipe-item> <img :src="swipeImage.image1" alt=""></mt-swipe-item>
        <mt-swipe-item> <img :src="swipeImage.image2" alt=""></mt-swipe-item>
        <mt-swipe-item> <img :src="swipeImage.image3" alt=""></mt-swipe-item>
      </mt-swipe>
      <!--跳转链接-->
      <div class="top-nav">
        <ul>
          <li>
            <div @click="goNext('search')"  style="display: inline-block;">
              <img src="../../assets/img/ic_search@2x.png" alt="">
              <span>搜索</span>
            </div>
          </li>
          <li>
            <div @click="goNext('follow')" style="display: inline-block;">
              <img src="../../assets/img/ic_follow@2x.png" alt="">
              <span>关注</span>
            </div>
          </li>
          <li>
            <div @click="goNext('favorite')" style="display: inline-block;">
              <img src="../../assets/img/ic_favorite@2x.png" alt="">
              <span>收藏</span>
            </div>
          </li>
          <div class="clearfix"></div>
        </ul>
      </div>

      <!--列表-->
      <div>
        <ul class="index-list">
          <li @click="getDetails()" v-for="item in indexList">
            <div class="list-head">
              <img :src="item.headImage" class="head-image">
              <span class="head-name">{{item.name}}</span>
              <span class="head-time">{{item.time}}</span>
            </div>
            <div class="list-content">
              <span class="content-word">{{item.title}}</span>
              <div class="content-bottom">
                <span class="content-comment">{{item.commentPepole}}万评论</span>
                <span class="content-integral" v-if="item.buyState>0">{{item.buyState}}积分</span>
                <span class="content-integral" v-else-if="item.buyState<0"><i class="is-buy" style="top:50%;margin-top:-4px;"></i>&nbsp;&nbsp;&nbsp;已购</span>
                <span class="content-integral" v-else-if="item.buyState==0">免费</span>
              </div>
              <img src="../../assets/img/62682166_p0.png" class="content-image">
            </div>
          </li>
        </ul>
      </div>

      <!--明师推荐-->
      <div class="recommend-list">
        <h5 class="recommend-title">不可错过的名师推荐</h5>
        <div class="recommend-all">
          <ul class="recommend-content">
            <li class="recommend-detail" v-for="item in followList" :key="item.id">
              <div class="detail-top" @click="toTeacherDetails(item.id)">
                <img src="../../assets/img/63209486_p0.jpg" class="recommend-headImage">
                <h5>曹清越</h5>
              </div>
              <p>一起聊艺术</p>
              <div class="recommend-follow" >
                <p>{{item.followNumber}}万人关注</p>
                <button @click="follow(item)" class="follow-btn" v-if="item.followStatus"><i class="follow-heart"></i><span>关注</span></button>
                <button @click="follow(item)" class="btn-ok" v-else="item.followStatus"><i class="follow-ok"></i></button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
        <ul class="index-list">
          <li @click="getDetails()" v-for="item in bottomList">
            <div class="list-head">
              <img :src="item.headImage" class="head-image">
              <span class="head-name">{{item.name}}</span>
              <span class="head-time">{{item.time}}</span>
            </div>
            <div class="list-content">
              <span class="content-word">{{item.title}}</span>
              <div class="content-bottom">
                <span class="content-comment">{{item.commentPepole}}万评论</span>
                <span class="content-integral" v-if="item.buyState>0">{{item.buyState}}积分</span>
                <span class="content-integral" v-else-if="item.buyState<0"><i class="is-buy" style="top:50%;margin-top:-4px;"></i>&nbsp;&nbsp;&nbsp;已购</span>
                <span class="content-integral" v-else-if="item.buyState==0">免费</span>
              </div>
              <img src="../../assets/img/62682166_p0.png" class="content-image">
            </div>
          </li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
          <span v-show="bottomStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>

    </div>
  </section>
</template>

<script>
  import swipeImage from '../../assets/img/65000275_p0.jpg'
  import headImage from '../../assets/img/64451924_p3.jpg'
  import mainContent from '../../assets/img/62682166_p0.png'
  import { API } from '../../service/api'
  import { Toast } from 'mint-ui';
  export default {
    name: "index",
    data(){
          return {
            swipeImage: {
              image1: swipeImage,
              image2: swipeImage,
              image3: swipeImage
            },
            followList:[
              {id:1,followStatus:true,followNumber:'1.2'},
              {id:2,followStatus:false,followNumber:'12'},
              {id:3,followStatus:false,followNumber:'1'},
              {id:4,followStatus:true,followNumber:'12'},
              // {id:5,followStatus:true,followNumber:'12'},
            ],
            indexList:[
              {headImage:headImage,name:'李白',time:'11：00',commentPepole:1.2,buyState:30,mainContent:mainContent,title:'高中化学教育教学过程的优化策略及提升'},
              {headImage:headImage,name:'李白',time:'11：00',commentPepole:1.3,buyState:-1,mainContent:mainContent,title:'高中化学教育教学过程的优化策略及提升'}
            ],
            bottomList:[
              {headImage:headImage,name:'李白',time:'11：00',commentPepole:1.2,buyState:30,mainContent:mainContent,title:'高中化学教育教学过程的优化策略及提升'},
              {headImage:headImage,name:'李白',time:'11：00',commentPepole:1.3,buyState:0,mainContent:mainContent,title:'高中化学教育教学过程的优化策略及提升'},
              {headImage:headImage,name:'李白',time:'11：00',commentPepole:1.3,buyState:-1,mainContent:mainContent,title:'高中化学教育教学过程的优化策略及提升'},
              {headImage:headImage,name:'李白',time:'11：00',commentPepole:1.2,buyState:30,mainContent:mainContent,title:'高中化学教育教学过程的优化策略及提升'},
              {headImage:headImage,name:'李白',time:'11：00',commentPepole:1.3,buyState:0,mainContent:mainContent,title:'高中化学教育教学过程的优化策略及提升'},
              {headImage:headImage,name:'李白',time:'11：00',commentPepole:1.3,buyState:-1,mainContent:mainContent,title:'高中化学教育教学过程的优化策略及提升'}
            ],
            bottomStatus: 'loading',
            allLoaded: false
      }
    },
    methods:{
      //列表内容点击的详情
      getDetails(){
        console.log('点我了点我了')
        this.$router.push('/detail');

        // let url = `http://quan-test.xiaoheiban.cn/#/detail`;
        // const shareFlag = '';
        // JSAction.openUrl(url);
        // JSAction.getWebShareElement(shareFlag)

      },
      goNext(path) {
         this.$router.push({path: path})
        // let url = `http://quan-test.xiaoheiban.cn/#/${path}`
        // if(path === 'follow') {
        //   console.log('aaa')
        //   const shareFlag = 'share';
        //   JSAction.getWebShareElement(shareFlag)
        // }
        // JSAction.openUrl(url)
      },
      toTeacherDetails(){
       // console.log('教师详情');
      },
      follow(item){
        // console.log(item)
        Toast({
          message: '关注成功',
          position: 'middle',
          duration: 2000
        });
      },
      loadBottom(id) {
        alert('11111111')
        // this.allLoaded = true;// 若数据已全部获取完毕
        this.$broadcast('onBottomLoaded', id);
        setTimeout(()=>{
          this.bottomStatus = 'load'
        },2000)
      },
    },
    mounted() {
      let token = '59a4e43d0179b04b5056178b'
      API.get(`/index?token=${token}`)
        .then(res => {
          //console.log(res)
        })
    },
  }
</script>

<style scoped>
  .swipeContent {
    width: 100%;
    height: 19vh;
  }
  .swipeContent img {
    height: 19vh;
    width: 100%;
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
.recommend-list{
  width: 100%;
  height: 249px;
  background-color: #fff;
  margin-top: 5px;
  color: #aaa;
  /*overflow-y: hidden;*/
}
.recommend-list .recommend-title{
  padding: 15px 0 0 15px;
  font-size: 14px;
}
.recommend-list .recommend-all{
  box-sizing: border-box;
  height: 200px;
  overflow-y: hidden;
  /*border-bottom: 4px #fff solid;*/
}
.recommend-list .recommend-content{
  width: 100%;
  /*height: 185px;*/
  display: -webkit-box;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.recommend-list .recommend-content .recommend-detail{
  width: 138px;
  height: 185px;
  margin-top: 20px;
  text-align: center;
  position: relative;
  margin-bottom: 2px;
}
  .recommend-list .recommend-content .recommend-detail::after{
    content: "";
    width: 3px;
    height: 149px;
    background-color: #EDEDED;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
  }
  .recommend-content .recommend-detail .recommend-headImage{
    width: 60px;
    height: 60px;
    border-radius: 93px;
  }
  .recommend-content .recommend-detail h5{
    color: #000;
    font-size: 17px;
    margin-top: 5px;
  }
  .recommend-content .recommend-detail p{
    font-size: 12px;
    color: #888;
    padding-top: 6px;
  }
  .recommend-content .recommend-follow{
    margin-top: 30px;
    position: relative;
  }
  .recommend-content .recommend-follow p{
    font-size: 14px;
    color: #aaa;
    padding: 0;
  }
  .recommend-content .recommend-follow .follow-btn{
    margin-top: 5px;
    background-color: #F8E71C;
    border-radius: 30px;
    width: 65px;
    height: 28px;
    font-size: 14px;
    color: #000;
    position: relative;
    margin-bottom: 5px;
  }
  .recommend-content .recommend-follow .follow-btn i{
    left: 10px;
    top: 50%;
    margin-top: -6px;
  }
  .recommend-content .recommend-follow .follow-btn span{
    margin-left: 15px;
  }
  .btn-ok{
    border: 1px #F8E71C solid;
    background-color: #fff;
    margin-top: 5px;
    border-radius: 30px;
    width: 65px;
    height: 28px;
    position: relative;
  }
  .recommend-content .recommend-follow .btn-ok i{
    left: 50%;
    margin-left: -8px;
    top: 50%;
    margin-top: -6px;
  }
</style>
