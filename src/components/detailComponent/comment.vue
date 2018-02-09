<script>
  import favorite from '../../assets/img/comment_ic_favorite@2x.png'
  import favoriteOK from '../../assets/img/comment_ic_favorite_ok@2x.png'
  export default {
    components: {},
    data: () => ({
      isFavorite: true,
      favoriteImage: favoriteOK,
      favoriteImageNo: favorite,
      showCommentBox: false,
      comments: [{
        isReply: false,
        cName: '薛白',
        cContent: '对妈妈们很有帮助！孩子健康的成长，是一生中骄傲与幸福的事情',
        cTime: '18:30',
        cGrounding: '已上架'
      },
        {
          isReply: true,
          rName: '薛白',
          cName: '白鹏飞',
          cContent: '最让人眼前一亮的就是突破',
          cTime: '18:30',
          cGrounding: '已下架'
        },
        {
          isReply: false,
          cName: '薛白',
          cContent: '第一次宣传出了后你们真把这鞋的调性发掘出来了 超nice的~',
          cTime: '07/18',
          cGrounding: '未上架'
        },
      ],
      commentText: '',
      replyMe: {
        answer: false,
        author: '',
      },
      originLength:0,//控制长度
    }),
    watch:{
      commentText: function (commentText) {
        if(commentText.length>this.originLength){
          this.$refs.publish.style = 'background: #F8E71C;color:#000;'
        }else{
          this.$refs.publish.style = 'background: #DDDDDD;color:#aaa;'
        }
      }
    },
    methods: {
      openCommentBox(name) {
        this.showCommentBox = true;
        if(name) {
          this.commentText = `回复${name}:  `;
          this.replyMe.answer = true;
          this.replyMe.author = name;
          this.originLength = this.commentText.length;
        } else if(name === '') {
          this.commentText = '';
          this.replyMe.answer = false;
          this.replyMe.author = name;
        }
      },
      publishComment() {
        if(this.replyMe.answer) {
          let spliceNum = 3 + this.replyMe.author.length;
          this.commentText = this.commentText.substring(spliceNum);
          console.log(this.commentText)
        }
        let myReply = {
          isReply: this.replyMe.answer,
          cName: '吴克',
          rName: this.replyMe.author,
          cContent: this.commentText,
          cTime: '07/18',
        }
        this.comments.push(myReply);
        this.showCommentBox = false
      }
    },
  }
</script>

<template>
  <div class="comment-content">
    <h3>评论区</h3>
    <ul class="comment-list">
      <li v-for="item in comments" class="comment">
        <label>{{item.cName}}<span v-show="item.isReply"><a style="color: #3A3A3A">回复</a><a>{{item.rName}}</a></span>:</label>
        <span>{{item.cContent}}</span>
        <div class="comment-bar"><span class="bar-0">{{item.cTime}}</span><span class="bar-1">{{item.cGrounding}}</span><span class="bar-2" @click="openCommentBox(item.cName)">回复</span></div>
      </li>
    </ul>
    <div class="comment-bottom">————到底啦————</div>
    <div class="reply-bar"><input placeholder="写评论" @click="openCommentBox('')" readonly="readonly"><span><img src="../../assets/img/comment_ic@2x.png"><a style="vertical-align: top">{{comments.length}}</a></span><img
            :src="isFavorite?favoriteImage:favoriteImageNo"
            class="comment-favorite"
            @click="isFavorite = !isFavorite"></div>

    <div class="comment-box-container" v-show="showCommentBox">
      <div class="comment-box">
        <h2>发表评论</h2>
        <textarea placeholder="请输入评论内容（6-300字）" v-model="commentText"></textarea>
        <div class="publish"><span @click="showCommentBox = false">取消</span><button @click="publishComment()" ref="publish">发表</button></div>
      </div>
    </div>
  </div>
</template>

<style scoped="">
  .comment-content {
    background-color: #fff;
  }
   h3 {
     font-family: PingFangSC-Light;
     font-size: 14px;
     color: #AAAAAA;
     padding: 2vh 4vw;
     background-color: #EDEDED;
   }
  .comment {
    color: #3A3A3A;
    padding: 1vh 4vw;
  }
  .comment label, .comment span {
    vertical-align: bottom;
  }
   .comment a {
     color: #000;
   }
  .comment-bar {
    margin-top: 1vh;
    font-size: 14px;
  }
   .comment-bar .bar-0 {
     color: #AAA;
   }
   .comment-bar .bar-1 {
     margin-left: 60%;
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
    margin: 4vh 0;
  }
  .reply-bar {
    padding: 0 4vw 2vh 4vw;
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
    background: rgba(0,0,0,0.70);
  }
  .comment-box {
    position: inherit;
    bottom: 0;
    width: 100%;
    height: 32%;
    background-color: #fff;
    padding: 2vh 4vw;
    box-sizing: border-box;
  }
  .comment-box h2 {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #AAA;
  }
  .comment-box textarea {
    margin: 1vh 0;
    font-size: 14px;
    background: #F7F7F7;
    border-radius: 2px;
    width: 90%;
    height: 60%;
    outline:none;
    resize:none;
    border: none;
    padding: 1vh 4vw;
  }
  .publish {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .publish button {
    background: #DDDDDD;
    border-radius: 2px;
    font-size: 14px;
    width: 60px;
    height: 30px;
    color: #AAA;
  }
</style>
