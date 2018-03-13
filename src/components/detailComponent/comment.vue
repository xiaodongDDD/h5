<script>
  import favorite from '../../assets/img/comment_ic_favorite.png'
  import favoriteOK from '../../assets/img/comment_ic_favorite_ok.png'
  import { API } from '../../service/api'
  import { timestampToTime } from '../../service/timestamp'
  import { InfiniteScroll } from 'mint-ui'
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  export default {
    data: () => ({
      isFavorite: true,
      favoriteImage: favoriteOK,
      favoriteImageNo: favorite,
      showCommentBox: false,
      article_comment_list: [],
      commentText: '',
      replyMessage: {
        answer: false,
        author: '',
        comment_id: '',
        article_id: '',
        content: '',
        isReplyOther: false
      },
      total_page: '',
      current_page: 1,
      originLength:0,//控制长度
      is_show: false,
      article_id: '',
      loadList: [],
      allLoaded: false
    }),
    watch:{
      commentText: function (commentText) {
        if(commentText.length>this.originLength){
          this.$refs.publish.style = 'color:#259BDA;'
        }else{
          this.$refs.publish.style = 'color:#aaa;'
        }
      }
    },
    methods: {
      openCommentBox(type,username,commentid) {
      	if(type == 1){
      		this.replyMessage.isReplyOther = true;
      		this.replyMessage.comment_id = commentid;
      		this.commentText = `回复${username}:`;
      		this.replyMessage.author = username;
      	}else{
      		this.replyMessage.isReplyOther = false;
      		this.replyMessage.article_id = this.article_id;
      		this.commentText = '';
      	}
      	this.showCommentBox = true;
      },
      changeText() {
      	console.log(this.commentText.length)
      	if(this.commentText.length>0){
          this.$refs.publish.style = 'color:#259BDA;'
        }else{
          this.$refs.publish.style = 'color:#aaa;'
        }
      },
      hideCommentBox() {
      	this.showCommentBox = false;
      },
      publishComment() {
      	let method = '';
      	let obj = {};
        if(this.replyMessage.isReplyOther){
        	let spliceNum = 3 + this.replyMessage.author.length;
          this.replyMessage.content = this.commentText.substring(spliceNum);
          method = 'quan.commentReply';
        	obj.comment_id = this.replyMessage.comment_id;
        }else{
        	this.replyMessage.content = this.commentText;
        	method = 'quan.comment';
        	obj.article_id = this.replyMessage.article_id;
        }
        obj.content = this.replyMessage.content;
        method = this.basePath + method + this.token;
//      console.log(obj); 
				this.axios.post(method,obj).then( res => {
//					console.log(res);
					let data = res.data.response;
					if(data.status == 200){
						Toast({
		          message: data.msg,
		          position: 'middle',
		          duration: 2000
		        });
		        this.showCommentBox = false; 
					}else{
						MessageBox({
						  title: '提示',
						  message: data.msg,
						  showCancelButton: false
						});
					}
				})
      },
      commentStatus(statusId) {
        switch (statusId) {
          case '0':
            return '删除';
          case '1':
            return '未上架';
          case '2':
            return '已上架';
          case '3':
            return '已下架';
          case '4':
            return '审核不通过';
        }
      },
      getTime(timestamp) {
        return timestampToTime(timestamp)
      },
      loadMore() {
        this.loading = true
        this.current_page++
        console.log('scroll')
        if(this.total_page > 1 && this.current_page <= this.total_page) {
          API.get(`api/?method=quan.commentList&article_id=4&page=${this.current_page}&type=2`)
            .then(res => {
              setTimeout(() => {
                let last = res.response.comment_list;
                for(let i = 0; i < last.length; i ++) {
                  this.article_comment_list.push(last[i])
                }
                this.loading = false;
              }, 2000)
            })
        }
      },
      isUp(comment_id, status,index) {
//    	console.log(this.article_comment_list); return false;
        API.get(`api/?method=quan.commentManage&comment_id=${comment_id}&status=${status}`).then( res => {
//        console.log(res); return false;
					let data = res.response;
					if(data.status == 200){
						if(status == '1'){
							this.article_comment_list[index].status = '2';
						}else if(status == '2'){
							this.article_comment_list[index].status = '3';
						}
						Toast({
		          message: '操作成功',
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
      },
      isFavorited() {
      	let method = '';
      	if(this.isFavorite){
      		method = 'quan.uncollect';
      	}else{
      		method = 'quan.collect';
      	}
				let str = '&article_id=' + this.article_id;
				const fUri = this.basePath + method + str + this.token;
				this.axios.get(fUri)
				.then(res => {
					let data = res.data.response;
					if(data.status == 200){
						Toast({
		          message: data.msg,
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
      	this.isFavorite = !this.isFavorite;
     },
     loadBottom() {
     	console.log(11111)
     }
    },
    mounted () {
    	let article_id = window.location.href.split('?')[1];
    	this.article_id = article_id;
      API.get(`api/?method=quan.commentList&article_id=${article_id}&page=${ this.current_page }&type=2`)
        .then(res => {
          this.article_comment_list = res.response.comment_list
          this.is_show = res.response.is_show
          this.total_page = parseInt(res.response.comment_sum / 10) + 1
        }
      )
    }
  }
</script>

<template>
  <div class="comment-content">
    <h3>评论区</h3>
    <div class="comment-list-container">
      <ul class="comment-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled = "false"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check = true>
	      <li v-for="(item,index) in article_comment_list" class="comment">
	        <label>{{item.from_username}}<span v-show="item.type == 2"><a style="color: #AAAAAA">回复</a><a>{{item.to_username}}</a></span>:</label>
	        <span class="contents">{{item.content}}</span>
	        <div class="comment-bar">
	          <span class="bar-0">{{getTime(item.create_time)}}</span>
	          <span class="bar-1" v-show="is_show === 1" @click="isUp(item.comment_id, item.status,index)"><span v-if='item.status != 1'>{{commentStatus(item.status)}}</span><span v-else class='blcakt'>{{commentStatus(item.status)}}</span></span>
	          <span class="bar-2" @click="openCommentBox(1,item.from_username, item.comment_id)">回复</span>
	        </div>
	      </li>
	    </ul>	    
    </div>
    <div class="comment-bottom">————到底啦————</div>
    <div class="reply-bar"><input placeholder="写评论" @click="openCommentBox(2)" readonly="readonly"><span><img src="../../assets/img/comment_ic.png"><a style="vertical-align: top">{{article_comment_list.length}}</a></span><img
            :src="isFavorite?favoriteImage:favoriteImageNo"
            class="comment-favorite"
            @click="isFavorited"></div>

    <div class="comment-box-container" v-show="showCommentBox" @click="hideCommentBox">
      <div class="comment-box"  @click.stop="showCommentBox = true">
        <!--<h2>发表评论</h2>-->
        <div class="publish"><!--<span @click="showCommentBox = false">取消</span>--><button @click="publishComment()" ref="publish">发送</button></div>
        <div class="areaDiv">
        	<textarea placeholder="请输入评论内容（6-300字）" v-model="commentText" @onchange="changeText"></textarea>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
  .comment-content {
    background-color: #fff;
  }
  h3 {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #AAA;
    padding: 2vh 4vw;
    background-color: #EDEDED;
  }
  .comment-list-container {
    /*height: 530px;*/
    overflow: scroll;
  }
  .comment {
    color: #3A3A3A;
    padding: 1.5vh 4vw;
    font-size: 17px;
  }

  .comment label, .comment span {
    vertical-align: bottom;
    word-break: break-all;
    line-height: 24px;
  }
  .comment .contents{
  	color: #AAAAAA;
  }
   .comment a {
     color: #000;
   }
  .comment-bar {
    margin-top: 1.5vh;
    font-size: 14px;
  }
   .comment-bar .bar-0 {
     color: #AAA;
     display: inline-block;
     width: 20%;
   }
   .comment-bar .bar-1 {
     margin-left: 50%;
     color: #AAAAAA;
   }
   .comment-bar .bar-2 {
     float: right;
     color: #000;
   }
  .comment-bottom {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #AAA;
    text-align: center;
    /*margin: 4vh 0;*/
    padding-bottom: 4vh;
    box-sizing: border-box;
    margin: 20px 0 50px;
  }
  .reply-bar {
    padding: 2vh 4vw;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #EDEDED;
  }
  .reply-bar input {
    background: #F7F7F7;
    border-radius: 2px;
    height: 4vh;
    width: 70%;
    padding-left: 10px;
  }
  .reply-bar span {
    font-size: 12px;
    margin-left: 5%;
  }
  .reply-bar img {
    width: 5vw;
    height: 3vh;
  }
  .comment-favorite {
    float: right;
  }
  .comment-box-container {
    position: fixed;
    top: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
  }
  .comment-box {
    position: inherit;
    bottom: 0;
    width: 100%;
    /*height: 32%;*/
    background-color: #fff;
    padding: 2vh 4vw;
    box-sizing: border-box;
  }
  .comment-box h2 {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #AAA;
  }
  .areaDiv{
  	margin-right: 60px;
  }
  .comment-box textarea {
    /*margin: 1vh 0;*/
    font-size: 14px;
    background: #F7F7F7;
    border-radius: 2px;
    width: 100%;
    /*height: 60%;*/
    height: 30px;
    line-height: 30px;
    outline:none;
    resize:none;
    border: none;
    padding: 3px 5px;
  }
  .publish {
    /*display: flex;
    justify-content: space-between;
    align-items: center;*/
   float: right;
   width: 40px;
  }
  .publish button {
    /*background: #DDD;*/
    border-radius: 2px;
    font-size: 14px;
    width: 40px;
    height: 30px;
    color: #AAA;
    line-height: 38px;
    font-size: 17px;
  }
  .blcakt{
  	color: #000;
  }
</style>
