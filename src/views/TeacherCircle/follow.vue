<template>
  <section>
    <ul class="follow-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled = "false"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check = true>
      <li v-for="(tm, index) in teacherMessages" class="follow" @touchmove="getIndex(index)">
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
                  <li>{{tm.description}}</li>
                </ul>
              </div>
            </div>
            <div class="txt-content" v-show="tm.brief">
              <img src="../../assets/img/ic_txt@2x.png"/>
              <span>{{tm.brief}}</span>
            </div>
            <div class="bottom-bar">
              <label><img src="../../assets/img/list_follow@2x.png" class="favorite"/><span>{{tm.followeds}}</span></label>
              <label class="txt"><img src="../../assets/img/list_txt@2x.png"/><span>{{tm.articles}}</span></label>
              <span class="last-update">最近更新: {{tm.article_last_time}}</span>
            </div>
          </div>
        </mt-cell-swipe>
      </li>
    </ul>
    <Prompt :messages="myMessage" v-on:ensure="isDel"></Prompt>
  </section>
</template>

<script>
  import commonHeader from '../../components/CommonHeader'
  import header from '../../assets/logo.png'
  import Prompt from '../../components/prompt.vue'
  import { API } from '../../service/api'
  import { InfiniteScroll } from 'mint-ui';
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
            article_last_time: ''
          },
          { teacher_img: '',
            teacher_name: '',
            description: '',
            brief: '',
            followeds: '',
            articles: '',
            article_last_time: ''
          },
          { teacher_img: '',
            teacher_name: '',
            description: '',
            brief: '',
            followeds: '',
            articles: '',
            article_last_time: ''
          },
          { teacher_img: '',
            teacher_name: '',
            description: '',
            brief: '',
            followeds: '',
            articles: '',
            article_last_time: ''
          },
          { teacher_img: '',
            teacher_name: '',
            description: '',
            brief: '',
            followeds: '',
            articles: '',
            article_last_time: ''
          },
          { teacher_img: '',
            teacher_name: '',
            description: '',
            brief: '',
            followeds: '',
            articles: '',
            article_last_time: ''
          },
          { teacher_img: '',
            teacher_name: '',
            description: '',
            brief: '',
            followeds: '',
            articles: '',
            article_last_time: ''
          }],
        loading_number: 1,
        deleteIndex : 0,
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
      getIndex(index) {
        this.deleteIndex = index
      },
      isDel(data) {
        if(data) {
          this.teacherMessages.splice(this.deleteIndex, 1)
          //console.log(this.teacherMessages)
        }
      },
      loadMore() {
        this.loading = true;
        let token = '59a4e43d0179b04b5056178b'
        this.loading_number++
        console.log(this.loading_number)
        API.get(`/api/?method=quan.followClick&page=${this.loading_number}&token=${token}`).then(res => {
          console.log(res)
          setTimeout(() => {
            let last = res.response.teacher_list;
            this.teacherMessages.concat(last)
            this.loading = false;
          }, 2000);
        })
      },
    },
    mounted() {
      let token = '59a4e43d0179b04b5056178b'
      API.get(`/api/?method=quan.followClick&page=${this.loading_number}&token=${token}`).then(res => {
        res = res.response
        console.log(res)
        this.teacherMessages = res.teacher_list
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
  }
  .teacher-message {
    padding-top: 2vh;
    width: 65%;
  }
  .txt-content {
    margin-top: 1vh;
    background-color: #f7f7f7;
    padding: 0.5vh 3vw;
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
    margin-left: 30%;
  }
  .mint-cell-swipe-button {
    line-height: 22px;
    font-size: 20px;
    width: 20vw;
    padding: 0 3vw;
    box-sizing: border-box;
    text-align: center;
    margin-top: 50%;
  }
</style>
