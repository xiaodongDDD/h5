<template>
  <section>
    <ul class="follow-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled = "false"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check = true>
      <li v-for="(tm, index) in teacherMessages"
          class="follow"
          @touchstart="getIndex(tm.uid, index)"
           @click="goDetail(tm.uid)">
        <mt-cell-swipe
                :right="[{
         content: '取消关注',
         style: { background: 'red', color: '#fff' },
         handler: cancel
       }]">
          <div class="follower">
            <div class="basic-message">
              <img :src="tm.teacher_img"  class="follow-teacher"/>
              <div class="teacher-message">
                <h2>{{tm.teacher_name}}</h2>
                <ul>
                  <li>{{tm.description?`${tm.description.substring(0, 60)}...`:''}}</li>
                </ul>
              </div>
            </div>
            <div class="txt-content" v-show="tm.brief">
              <img src="../../assets/img/ic_txt.png"/>
              <span>{{tm.brief?`${tm.brief.substring(0, 15)}...`:' '}}</span>
            </div>
            <div class="bottom-bar">

              <label><img src="../../assets/img/list_follow.png" class="favorite"/><span>{{tm.followeds}}</span></label>
              <label class="txt"><img src="../../assets/img/list_txt.png"/><span>{{tm.articles}}</span></label>

              <span class="last-update">最近更新: {{getTimestamp(tm.article_last_time)}}</span>
            </div>
          </div>
        </mt-cell-swipe>
      </li>
    </ul>
    <div style="text-align: center" class="loadings">{{isAll}}</div>
    <Prompt :messages="myMessage" v-on:ensure="isDel"></Prompt>
  </section>
</template>

<script>
  import commonHeader from '../../components/CommonHeader'
  import header from '../../assets/logo.png'
  import Prompt from '../../components/prompt.vue'
  import { API } from '../../service/api'
  import { InfiniteScroll } from 'mint-ui'
  import { timestampToTime } from '../../service/timestamp'
  import MtSwipeItem from '../../../node_modules/mint-ui/packages/swipe/src/swipe-item'
  import MtCellSwipe from '../../../node_modules/mint-ui/packages/cell-swipe/src/cell-swipe'
  export default {
    name: "follow",
    data() {
      return {
        teacherMessages :[
          { teacher_img: '',
            teacher_name: '',
            description: '',
            brief: '',
            followeds: '',
            articles: '',
            article_last_time: '',
            uid: ''
          }],
        loading_number: 1,
        total_page: 0,
        realDeleteIndex : 0,
        fakeDeleteIndex: 0,
        isAll: '加载中...',
        myMessage: {
          isShow: false,
          tips: '不再关注这位了吗?',
          title: '确定取消关注吗?',
        }
      }
    },
    components:{
      MtCellSwipe,
      MtSwipeItem,
      commonHeader,
      Prompt
    },
    created(){
      // const shareFlag = "caonima";
      // JSAction.getWebShareElement(shareFlag)
    },
    methods :{
      cancel() {
         this.myMessage.isShow = true
      },
      getIndex(uid, index) {
        this.realDeleteIndex = uid
        this.fakeDeleteIndex = index

       // console.log(this.realDeleteIndex)
      },
      getTimestamp(timestamp) {
        return timestampToTime(timestamp)
      },

      goDetail(id) {
        const teacherUrl = `http://quan-test.xiaoheiban.cn/#/teachers?${id}`;
        JSAction.openUrl(teacherUrl);
      },

      isDel(data) {
        if(data) {
          API.get(`api/?method=quan.unfollow&uid=${this.realDeleteIndex}`).then(res => {
            console.log(res)
            this.teacherMessages.splice(this.fakeDeleteIndex, 1)
          })
          //console.log(this.teacherMessages)
        }
      },
      loadMore() {
        this.loading = true
        this.loading_number++
        console.log(111)
        if(this.loading_number > this.total_page) {
          this.isAll = '到底啦!'
        }
        if(this.total_page > 1 && this.loading_number <= this.total_page) {
          API.get(`api/?method=quan.followClick&page=${this.loading_number}`)
            .then(res => {
              setTimeout(() => {
                let last = res.response.teacher_list
                for(let i = 0; i < last.length; i ++) {
                  this.teacherMessages.push(last[i])
                }
                this.loading = false
              }, 2000)
            })
        }

      },
    },
    mounted() {
      API.get(`api/?method=quan.followClick&page=${this.loading_number}`).then(res => {
        res = res.response
        console.log(res)
        this.teacherMessages = res.teacher_list
        this.total_page = parseInt(res.follow_sum / 10) + 1
      })

    },
    metaInfo: {
      title: "关注",
      meta: [{
        name: 'xiaoheiban_disable_share',
        content: 'true'
      }]
    }
  }
</script>

<style>
  .mint-cell-wrapper {
    padding: 0;
  }
  .mint-cell-right {
    background-color: red;
  }
  .mint-cell-value {
    width: 100%;
    padding: 1vh 3vw;
    background-color: #fff;
  }
  .follow {
    margin-bottom: 1vh;
  }
  .follower {
    width: 100%;
    color: #000;
  }
  .basic-message {
    display: flex;
    justify-content: space-between;
  }
  .basic-message img{
    width: 26.8vw;
    height: 26.8vw;
    border: 1px solid #ccc;
  }
  .basic-message h2 {
    font-size: 17px;
    margin-bottom: 1.3vh;
    font-family: PingFangSC-Regular;
  }
  .basic-message ul {
    font-size: 14px;
  }
  .basic-message ul li {
    margin-bottom: 1vh;
    font-family: PingFangSC-Light;
    line-height: 19px;
    height: 56px;
    overflow: hidden;
  }
  .teacher-message {
    padding-top: 2vh;
    width: 65%;
  }
  .txt-content {
    margin-top: 1vh;
    background-color: #f7f7f7;
    /*padding: 0.5vh 3vw;*/
   height: 28px;
   line-height: 28px;
   padding-left: 10px;
  }
  .txt-content img {
      width: 2.7vw;
      height: 2.2vh;
    }
  .txt-content span {
      font-size: 14px;
    }
  .bottom-bar {
    font-size: 14px;
    padding: 1vh 3vw;
    line-height: 14px;
  }
  .favorite {
    width: 3.1vw;
    height: 1.9vh;
    margin-right: 3vw;
  }
  .txt img {
    width: 2.6vw;
    height: 1.9vh;
    margin-right: 3vw;
    margin-left: 3vw;
  }
  .last-update {
    display: inline-block;
    /*margin-left: 20%;*/
    /*width: 50%;*/
    text-align: right;
    float: right;
  }
  .mint-cell-swipe-button {
    line-height: 22px;
    font-size: 20px;
    width: 20vw;
    padding: 0 3vw;
    box-sizing: border-box;
    text-align: center;
    /*margin-top: 50%;*/
   margin-top: 59px;
  }
  .bottom-bar{
  	color: #aaa;
  	padding-right: 0;
  }
</style>
