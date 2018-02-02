<template>
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
          <img src="../assets/img/62682166_p0.png" class="content-image">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import headImage from '../assets/img/64451924_p3.jpg'
  import mainContent from '../assets/img/62682166_p0.png'
  export default {
    name: "teacher-list",
    data(){
      return{
        indexList:[
          {headImage:headImage,name:'李白',time:'11：00',commentPepole:1.2,buyState:30,mainContent:mainContent,title:'高中化学教育教学过程的优化策略及提升'},
          {headImage:headImage,name:'李白',time:'11：00',commentPepole:1.3,buyState:-1,mainContent:mainContent,title:'高中化学教育教学过程的优化策略及提升'}
        ],
      }
    },
    methods:{
      getDetails(){
        console.log('点我了，进入详情了！');
      }
    }
  }
</script>

<style scoped>

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
</style>
