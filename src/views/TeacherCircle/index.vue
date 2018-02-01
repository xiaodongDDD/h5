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
          <li   @click="getDetails()">
            <div class="list-head">
              <img src="../../assets/img/comment_ic_favorite_ok@2x.png" class="head-image">
              <span class="head-name">李太白</span>
              <span class="head-time">09:11</span>
            </div>
            <div class="list-content">
              <span class="content-word">高中化学教育教学过程的优化策略及提升</span>
              <div class="content-bottom">
                <span class="content-comment">1.2万评论</span>
                <span class="content-integral">30积分</span>
              </div>
              <img src="../../assets/img/62682166_p0.png" class="content-image">
            </div>
          </li>
          <li   @click="getDetails()">
            <div class="list-head">
              <img src="../../assets/img/comment_ic_favorite_ok@2x.png" class="head-image">
              <span class="head-name">李太白</span>
              <span class="head-time">09:11</span>
            </div>
            <div class="list-content">
              <span class="content-word">高中化学教育教学过程的优化策略及提升</span>
              <div class="content-bottom">
                <span class="content-comment">1.2万评论</span>
                <span class="content-integral">30积分</span>
              </div>
              <img src="../../assets/img/62682166_p0.png" class="content-image">
            </div>
          </li>
        </ul>
      </div>

      <!--明师推荐-->
      <div class="recommend-list">
        <h5 class="recommend-title">不可错过的名师推荐</h5>
        <ul class="recommend-content">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

    </div>
  </section>
</template>

<script>
  import swipeImage from '../../assets/img/65000275_p0.jpg'
  import { API } from '../../service/api'
  export default {
    name: "index",
    data(){
          return {
            swipeImage: {
              image1: swipeImage,
              image2: swipeImage,
              image3: swipeImage
            }
      }
    },
    methods:{
      //列表内容点击的详情
      getDetails(){
        console.log('点我了点我了')
      },
      goNext(path) {
         this.$router.push({path: path})
//        let url = `http://quan-test.xiaoheiban.cn/#/${path}`
//        JSAction.openUrl(url)
      }
    },
    mounted() {
      let token = '59a4e43d0179b04b5056178b'
      API.get(`/index?token=${token}`)
        .then(res => {
          console.log(res)
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
}
.recommend-list .recommend-title{
  padding: 15px 0 0 15px;
  font-size: 14px;
}
.recommend-list .recommend-content{

}
</style>
