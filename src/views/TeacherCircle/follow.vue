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
         handler: () => cancelFo(tm.uid,index)
       }]">
          <div class="follower">
            <div class="basic-message">
              <img :src="tm.teacher_img"  class="follow-teacher"/>
              <div class="teacher-message">
                <h2>{{tm.teacher_name}}</h2>
                <ul>
                  <!--<li>{{tm.description?`${tm.description.substring(0, 60)}...`:''}}</li>-->
                  <li v-html="tm.description"> </li>
                </ul>
              </div>
            </div>
            <div class="txt-content" v-show="tm.brief">
              <img src="../../assets/img/ic_txt.png"/>
              <!--<span>{{tm.brief?`${tm.brief.substring(0, 15)}...`:' '}}</span>-->
              <span>{{tm.brief}}</span>
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
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  export default {
    name: "follow",
    data() {
      return {
        teacherMessages :[],
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
        if(this.useragent == 0){
      		var path = '/teachers?' + id;
		      this.$router.push({path: path});
      	}else{
      		let teacherUrl = this.jsPath + `teachers?${id}`;
//    		let teacherUrl = 'http://quan-test.xiaoheiban.cn/h5/index.html#/' + `teachers?${id}`;
//      	JSAction.openUrl(teacherUrl);
					window.location.href = teacherUrl;
      	}
      },

      isDel(data) {
        if(data) {
          API.get(`api/?method=quan.unfollow&uid=${this.realDeleteIndex}`).then(res => {
            console.log(res)
            this.teacherMessages.splice(this.fakeDeleteIndex, 1)
          })
        }
      },
      cancelFo(id,index){
      	MessageBox.confirm('不再关注这位老师了吗？','确定取消关注吗').then(action => {
      		let method = 'quan.unfollow';
					let str = '&uid=' + id;
					const fUri = this.basePath + method + str + this.token;
					this.axios.get(fUri)
					.then(res => {
						let data = res.data.response;
						if(data.status == 200){
							this.teacherMessages.splice(index,1);
							Toast({
			          message: '取消关注成功',
			          position: 'middle',
			          duration: 2000
			        });
						}else{
							MessageBox({
							  title: '提示',
							  message: data.msg,
							  showCancelButton: false
							});
						}
					})
      	});
      	
      },
      loadMore() {
        this.loading = true
        this.loading_number++
        if(this.loading_number > this.total_page) {
          this.isAll = '到底啦!'
        }
        if(this.total_page > 1 && this.loading_number <= this.total_page) {
        	let furl = this.basePath + 'quan.followClick' + `&page=${this.loading_number}` + this.token;
        	this.axios.get(furl).then( res => {
        		setTimeout(() => {
                let last = res.data.response.teacher_list
                for(let i = 0; i < last.length; i ++) {
                  this.teacherMessages.push(last[i])
                }
                this.loading = false
              }, 500)
        	})
        }

      },
    },
    mounted() {
//  	let url = `api/?method=quan.followClick&page=${this.loading_number}` + this.token;
			let url = this.basePath + `quan.followClick&page=${this.loading_number}` + this.token;
      this.axios.get(url).then(res => {
        res = res.data.response
        this.teacherMessages = res.teacher_list
        this.total_page = Math.ceil(res.follow_sum / 10);
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
   overflow: hidden;
  }
  .txt-content img {
      width: 2.7vw;
      height: 2.2vh;
    }
  .txt-content span {
      font-size: 14px;
      display: inline-block;
      width: 90%;
      overflow: hidden;
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
  .loadings{
  	height: 40px;
  	line-height: 40px;
  }
</style>
