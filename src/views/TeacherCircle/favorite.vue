<template>
  <section>
    <div class="favorite">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled = "false"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check = true>
        <li v-for="(fm, index) in collect_list" @touchstart="getIndex(fm.article_id, index)" @click="getDetails(fm.type,fm.article_id)">
          <mt-cell-swipe
              :right="[{
         content: '删除收藏',
         style: { background: 'red',
         color: '#fff' },
         handler: () => cancelFa(fm.article_id,index),
       }]">
        <div class="favorite">
          <div class="favorite-header">
            <img :src="fm.img">
            <span>{{fm.user_name}}</span>
            <span>{{getTimestamp(fm.create_time)}}</span>
          </div>
          <div class="favorite-content">
            <div class="favorite-title">
              <p>{{fm.title}}</p>
              <div>
                <span>{{fm.comments}}评论</span>
                <!--<span v-show="fm.integration!='ok'">{{fm.is_charge != 0 ? `${fm.points}积分`:'免费'}}</span>
                <span class="have" v-show="fm.integration==='ok'"><img src="../../assets/img/ic_buy.png">  已购</span>-->
              </div>
            </div>
            <div class="favorite-image" >
              <img :src="fm.cover"/>
            </div>
          </div>
        </div>
      </mt-cell-swipe>
        </li>
      </ul>
      <div style="text-align: center" class="loadings">{{isAll}}</div>
      <Prompt :messages="myMessage" v-on:ensure="isDel"></Prompt>
    </div>
  </section>
</template>

<script>
  import Prompt from '../../components/prompt.vue'
  import { API } from '../../service/api'
  import { InfiniteScroll } from 'mint-ui'
  import { timestampToTime } from '../../service/timestamp'
//import { goTODetails } from '../../service/jsAction'
  export default {
    name: "favorite",
    components:{
      Prompt
    },
    data() {
      return{
        title: '收藏',
        collect_list: [{
          "uid": 3,
          "user_name": '李白',
          "img": 'http://img.jj59.com/upload/userup/109827/1510Z3641-c47.jpg',
          "article_id": 12,
          "title": "文章标题",
          "cover": "http://img.jj59.com/upload/userup/109827/1510Z3641-c47.jpg",  // 文章封面图
          "media": "http://video.jj59.com/upload/media/109827/12412-ct7.mp4",     // 媒体文件地址
          "is_charge": 0,               // 文章 是否收费(0免费  1收费)
          "points": 12,                 // 文章 所需积分(免费的文章 所需积分为0)
          "create_time": "1517332304",  // 文章创建时间
          "update_time": "1517332917",  // 文章修改时间
          "type": 1,                     // 文章类型， 1是图文， 2是语音  3是视屏
          "comments": 2390              // 文章的评论数
        }],
        isAll: '',
        myMessage: {
          isShow: false,
          tips: '要从收藏中删除这篇文章吗?',
          title: '删除收藏',
        },
        loading_number: 1,
        total_page: '',
        realDeleteId: '',
        fakeDeleteId: ''
      }
    },
    methods: {
      cancel() {
         this.myMessage.isShow = true
      },
      getTimestamp(timestamp) {
        return timestampToTime(timestamp)
      },
      getIndex(article_id, index) {
         this.realDeleteId = article_id
        this.fakeDeleteId = index
      },
      isDel(data) {
        if(data) {
          API.get(`api/?method=quan.uncollect&article_id=${this.realDeleteId}`).then(res => {
            console.log(res)
            this.collect_list.splice(this.fakeDeleteId, 1)
          })
          //console.log(this.teacherMessages)
        }
      },
      loadMore() {
        this.loading = true;
        this.loading_number++;
        if(this.loading_number > this.total_page) {
          this.isAll = '到底啦!'
        }
        if(this.total_page > 1 && this.loading_number <= this.total_page) {
          API.get(`api/?method=quan.collectClick&page=${this.loading_number}`)
            .then(res => {
              setTimeout(() => {
                let last = res.response.collect_list;
                for(let i = 0; i < last.length; i ++) {
                  this.collect_list.push(last[i])
                }
                this.loading = false;
              }, 2000)
            })
        }
      },
      getDetails(type,id){
//    	console.log(id); return false;
				if(this.useragent == 0){
					switch (type) {
		        case 1:
		          const arurl = `http://quan-test.xiaoheiban.cn/#/article?${id}`;
		          var path = '/article?' + id;
		          this.$router.push({path: path});
		          break;
		        case 2:
		          const auurl = `http://quan-test.xiaoheiban.cn/#/audio?${id}`;
		          var path = '/audio?' + id;
		          this.$router.push({path: path});
		          break;
		        default:
		          const viurl = `http://quan-test.xiaoheiban.cn/#/video?${id}`;
		          var path = '/video?' + id;
		          this.$router.push({path: path});
		     	}
				}else{
					switch (type) {
		        case 1:
		          const arurl = `http://quan-test.xiaoheiban.cn/#/article?${id}`;
		          JSAction.openUrl(arurl);
		          break;
		        case 2:
		          const auurl = `http://quan-test.xiaoheiban.cn/#/audio?${id}`;
		          JSAction.openUrl(auurl);
		          break;
		        default:
		          const viurl = `http://quan-test.xiaoheiban.cn/#/video?${id}`;
		          JSAction.openUrl(viurl);
		     	}
				}
	  	},
	  	cancelFa(id,index) {
				let method = 'quan.uncollect';
				let str = '&article_id=' + id;
				const fUri = this.basePath + method + str + this.token;
				this.axios.get(fUri)
				.then(res => {
					let data = res.data.response;
					if(data.status == 200){
						this.collect_list.splice(index,1);
						Toast({
		          message: '取消收藏成功',
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
	  	}
    },
    mounted() {
      API.get(`/api/?method=quan.collectClick&page=${this.loading_number}`).then(res => {
        res = res.response
//      console.log(res);
        this.collect_list = res.collect_list
        this.total_page = parseInt(res.collect_sum / 10) + 1
        this.total_page <= 1 ? this.isAll = '':this.isAll = '加载中...'
      })
    },
    metaInfo: {
      title: "我的收藏",
      meta: [{
        name: 'xiaoheiban_disable_share',
        content: 'true'
      }]
    }

  }
</script>

<style lang="scss">
  .mint-cell-wrapper {
    padding: 0;
  }
  .mint-cell-value {
    width: 100%;
    padding: 2vh 3vw;
    background-color: #fff;
  }
  .mint-cell-swipe-button {
    width: 20vw;
    padding: 55% 4vw;
    box-sizing: border-box;
    line-height: 22px;
    font-size: 20px;
  }
  .favorite {
    width: 100%;
    ul {
      li {
        margin-bottom: 1vh;
      }
    }
  }
  .favorite-header {
    font-size: 14px;
    color: #aaa;
    img {
      width: 8vw;
      height: 8vw;
      border: 1px solid #ccc;
      border-radius: 50%;
    }
    span {
      &:last-of-type {
        float: right;
      }
    }
  }
  .favorite-content {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5vh;
    img {
      width: 22vw;
      height: 22vw;
      border: 1px solid #ccc;
    }
    .favorite-title {
      margin-right: 5vw;
      display: flex;
      align-content: space-between;
      flex-wrap: wrap;
      p {
          font-size: 17px;
           color: #000;
           width: 90%;
      }
      div {
        color: #aaa;
        font-size: 14px;
        span {
          margin-right: 5vw;
        }
      }
    }
  }
  .have img {
    width: 2.7vw;
    height: 2vh;
    border: none;
  }

</style>
