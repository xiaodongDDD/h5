<template>
  <section>
    <div class="teacherCircle-container">
      <!--轮播图-->
      <mt-swipe :auto="4000" class="swipeContent">
        <mt-swipe-item v-for="item in swipeImage" :key="item.ad_id" :href="item.link"> <img :src="item.ad_img"  alt=""></mt-swipe-item>
      </mt-swipe>
      <!--跳转链接-->
      <div class="top-nav">
        <ul>
          <li>
            <div @click="goNext('search')"  style="display: inline-block;">
              <img src="../../assets/img/ic_search.png" alt="">
              <span>搜索</span>
            </div>
          </li>
          <li>
            <div @click="goNext('follow')" style="display: inline-block;">
              <img src="../../assets/img/ic_follow.png" alt="">
              <span>关注</span>
            </div>
          </li>
          <li>
            <div @click="goNext('favorite')" style="display: inline-block;">
              <img src="../../assets/img/ic_favorite.png" alt="">
              <span>收藏</span>
            </div>
          </li>
          <div class="clearfix"></div>
        </ul>
      </div>

      <!--列表-->
      <div>
        <ul class="index-list">
          <li @click="getDetails(item.type,item.article_id)" v-for="item in indexList">
            <div class="list-head">
              <img :src="item.img" class="head-image">
              <span class="head-name">{{item.user_name}}</span>
              <span class="head-time">{{timestampToTime(item.create_time)}}</span>
            </div>
            <div class="list-content">
              <span class="content-word">{{item.title}}</span>
              <div class="content-bottom">
                <span class="content-comment">{{item.comments}}万评论</span>
                <!--<span class="content-integral" v-if="item.points>0">{{item.points}}积分</span>
                <span class="content-integral" v-else-if="item.points<0"><i class="is-buy" style="top:50%;margin-top:-4px;"></i>&nbsp;&nbsp;&nbsp;已购</span>
                <span class="content-integral" v-else-if="item.points==0">免费</span>-->
              </div>
              <img :src="item.cover" class="content-image">
              <img src="../../assets/img/ic_video_play_video.png" class="video-button" v-show="item.type == 3">
            </div>
          </li>
        </ul>
      </div>

      <!--明师推荐-->
      <div class="recommend-list" v-show="followList.length > 0">
        <h5 class="recommend-title">不可错过的名师推荐</h5>
        <div class="recommend-all">
          <ul class="recommend-content"
              id="teacher-list"
              @scroll="loadTeacher"
              ref="teacher_list">
            <li class="recommend-detail" v-for="(item,index) in followList" :key="item.id" @click="goTeacherDetail(item.uid)">
              <div class="detail-top" @click="toTeacherDetails(item.id)">
                <img :src="item.teacher_img" class="recommend-headImage">
                <h5>{{item.teacher_name}}</h5>
              </div>
              <p>{{item.brief?item.brief.substring(0, 17):''}}</p>
              <div class="recommend-follow" >
                <p>{{item.followeds}}万人关注</p>
                <button @click.stop="follow(item,index)" class="follow-btn" v-if="item.is_follow == 0"><i class="follow-heart"></i><span>关注</span></button>
                <button @click.stop="unFollow(item,index)" class="btn-ok" v-else><i class="follow-ok"></i></button>
              </div>
            </li>
            <li class="teacher_loading" ref="loading" >{{ teacher_loading }}</li>
          </ul>
        </div>
      </div>

      <mt-loadmore
              :bottom-method="loadBottom"
              :bottom-all-loaded="allLoaded"
              :autoFill = false
              ref="loadmore"
      >
        <ul class="index-list">
          <li @click="getDetails(item.type,item.article_id)" v-for="item in bottomList">
            <div class="list-head">
              <img :src="item.img" class="head-image">
              <span class="head-name">{{item.user_name}}</span>
              <span class="head-time">{{timestampToTime(item.create_time)}}</span>
            </div>
            <div class="list-content">
              <span class="content-word">{{item.title}}</span>
              <div class="content-bottom">
                <span class="content-comment">{{item.comments}}万评论</span>
                <!--<span class="content-integral" v-if="item.points>0">{{item.points}}积分</span>
                <span class="content-integral" v-else-if="item.points<0"><i class="is-buy" style="top:50%;margin-top:-4px;"></i>&nbsp;&nbsp;&nbsp;已购</span>
                <span class="content-integral" v-else-if="item.points==0">免费</span>-->
              </div>
              <img :src="item.cover" class="content-image">
            </div>
          </li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
          <span v-show="bottomStatus === 'loading'">加载中...</span>
        </div>
      </mt-loadmore>
    </div>
  </section>
</template>

<script>
  import { API } from '../../service/api'
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  export default {
    name: "index",
    data(){
          return {
            swipeImage: [],
            followList:[],
            indexList:[],
            bottomList:[],
            current_page: 1,
            bottomStatus: 'loading',
            allLoaded: true,
            current_teacher_page: 1,
            total_teacher_page: 1,
            teacher_loading: '加载中',
            isFollow: false,
            teacherPage: '',
      }
    },
    methods:{
      //列表内容点击的详情
      loadTeacher() {
        let scroll_distance = document.documentElement.clientWidth
        let document_distance = this.$refs.loading.getBoundingClientRect().left

        if(this.current_teacher_page >= this.teacherPage) {
          this.teacher_loading = '没有啦!'
        }
        if(scroll_distance - document_distance === 80 && this.current_teacher_page < this.teacherPage) {
          setTimeout(() => {
            this.current_teacher_page++
            API.get(`api/?method=quan.unfollowTeachersList&page=${this.current_teacher_page}&type=2`).then(res => {
              this.followList = this.followList.concat(res.response.teacher_list)
            })
          }, 500)
        }
      },
      goTeacherDetail(id) {
      	if(this.useragent == 0){
      		var path = '/teachers?' + id;
		      this.$router.push({path: path});
      	}else{
      		const teacherUrl = `http://quan-test.xiaoheiban.cn/#/teachers?uid=${id}`
        	JSAction.openUrl(teacherUrl)
      	}
      },
      getDetails(type,id){
      	console.log(type);
				if(this.useragent == 0){
					switch (type) {
		        case '1':
		          let path = '/article?' + id;
		          this.$router.push({path: path});
		          break;
		        case '2':
		          let path1 = '/audio?' + id;
		          this.$router.push({path: path1});
		          break;
		        case '3':
		          let path2 = '/video?' + id;
		          this.$router.push({path: path2});
		     	}
				}else{
					switch (type) {
		        case '1':
		          const arurl = `http://quan-test.xiaoheiban.cn/#/article?${id}`;
		          JSAction.openUrl(arurl);
		          break;
		        case '2':
		          const auurl = `http://quan-test.xiaoheiban.cn/#/audio?${id}`;
		          JSAction.openUrl(auurl);
		          break;
		        case '3':
		          const viurl = `http://quan-test.xiaoheiban.cn/#/video?${id}`;
		          JSAction.openUrl(viurl);
		     	}
				}
      },
      goNext(path) {
				if(this.useragent == 0){
					this.$router.push({path: path});
				}else{
					let url = `http://quan-test.xiaoheiban.cn/#/${path}`;
         	JSAction.openUrl(url)
				}
      },
      toTeacherDetails(){
       // console.log('教师详情');
      },
      follow(item,index){
				let method = 'quan.follow';
				let str = '&uid=' + item.uid;
				const fUri = this.basePath + method + str + this.token;
				this.axios.get(fUri)
				.then(res => {
					console.log(res);
					let data = res.data.response;
					if(data.status == 200){
						this.followList[index].is_follow = 1;
						Toast({
		          message: '关注成功',
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
      unFollow(item,index) {
      	let method = 'quan.unfollow';
				let str = '&uid=' + item.uid;
				const fUri = this.basePath + method + str + this.token;
				this.axios.get(fUri)
				.then(res => {
					console.log(res);
					let data = res.data.response;
					if(data.status == 200){
						this.followList[index].is_follow = 0;
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
      },
      loadBottom() {
        this.more();
//      this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onTopLoaded();
      },
      more() {
        this.current_page++;
        API.get(`api/?method=quan.articleList&page=${this.current_page}&type=2`)
          .then(res => {
            if(this.current_page >= parseInt(res.response.article_sum/10)+1) {
              this.allLoaded = false
              }
            for(let i = 0; i<res.response.article_list.length; i++) {
              this.bottomList.push( res.response.article_list[i] )
            }
          })
      },
      timestampToTime(timestamp) {
        let date = new Date(timestamp * 1000);
        let sysDate = new Date();
        let Y = date.getFullYear;
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let D = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        if(Y == sysDate.getFullYear() && M == sysDate.getMonth() && D == sysDate.getDay()) {
          return h +':'+ m
        } else if(
          Y == sysDate.getFullYear){
          return `${M}/${D}`
        } else {
          return `${Y}/${M}/${D}`
        }
      },
    },
    mounted() {
      let method = 'quan.index';
			const url = this.basePath + method;
//			this.axios.
      API.get(url).then(res => {
        res = res.response;
        this.swipeImage = res.ad_list;
        this.indexList = res.article_list.slice(0, 2);
        this.followList = res.teacher_list;
        this.teacherPage = Math.ceil(res.teacher_sum / 10);
        this.bottomList = res.article_list.slice(2,res.article_list.length);
      })
    },
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
  .swipeContent {
    width: 100%;
    height: 19vh;
  }

  .swipeContent img {
    height: 19vh;
    width: 100%;
  }

  .index-list li {
    width: 100%;
    height: 154px;
    background-color: #fff;
    margin-top: 6px;
    position: relative;
  }

  .index-list .list-head {
    position: relative;
    top: 14px;
    color: #aaa;
    font-size: 14px;
    padding-left: 15px;
    height: 28px;
    line-height: 28px;
  }

  .index-list .list-head .head-image {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }

  .index-list .list-head .head-name {
    margin-left: 5px;
  }

  .index-list .list-head .head-time {
    position: absolute;
    right: 30px;
    top: 2px;
  }

  .index-list .list-content .content-word {
    width: 244px;
    height: 42px;
    font-size: 17px;
    position: absolute;
    left: 15px;
    top: 53px;
    line-height: 22px;
  }
  .index-list .list-content .content-bottom {
    color: #aaa;
    font-size: 14px;
    position: absolute;
    left: 15px;
    bottom: 16px;
  }

  .index-list .list-content .content-bottom .content-comment {
    margin-right: 20px;
  }

  .index-list .list-content .content-image {
    width: 86px;
    height: 86px;
    position: absolute;
    right: 15px;
    top: 53px;
  }

  .recommend-list {
    width: 100%;
    height: 249px;
    background-color: #fff;
    margin-top: 5px;
    color: #aaa;
    /*overflow-y: hidden;*/
  }

  .recommend-list .recommend-title {
    padding: 15px 0 0 15px;
    font-size: 14px;
  }

  .recommend-list .recommend-all {
    box-sizing: border-box;
    height: 200px;
    overflow-y: hidden;
    /*border-bottom: 4px #fff solid;*/
  }

  .recommend-list .recommend-content {
    width: 100%;
    /*height: 185px;*/
    display: -webkit-box;
    /*overflow-x: auto;*/
    -webkit-overflow-scrolling: touch;
  }

  .recommend-list .recommend-content .recommend-detail {
    width: 138px;
    height: 185px;
    margin-top: 20px;
    text-align: center;
    position: relative;
    margin-bottom: 2px;
  }

  /*.recommend-list .recommend-content .recommend-detail::after {}*/
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
  overflow-y: hidden;
}
.recommend-list .recommend-title{
  padding: 15px 0 0 15px;
  font-size: 14px;
}
.recommend-list .recommend-all{
  box-sizing: border-box;
  height: 200px;
  /*overflow-y: hidden;*/
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

  .recommend-content .recommend-detail .recommend-headImage {
    width: 60px;
    height: 60px;
    border-radius: 93px;
  }

  .recommend-content .recommend-detail h5 {
    color: #000;
    font-size: 17px;
    margin-top: 5px;
  }

  .recommend-content .recommend-detail p {
    font-size: 12px;
    color: #888;
    height: 26px;
    padding: 6px 6px 0;
    line-height: 16px;
  }

  .recommend-content .recommend-follow {
    position: relative;
    margin-top: 7px;
  }

  .recommend-content .recommend-follow p {
    font-size: 14px;
    color: #aaa;
    padding: 0;
  }
  .recommend-content .recommend-detail .recommend-follow p{
  	height: 20px;
  	line-height: 20px;
  	margin-top: 13px;
  }

  .recommend-content .recommend-follow .follow-btn {
    margin-top: 5px;
    background-color: #F8E71C;
    border-radius: 30px;
    width: 65px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    color: #000;
    position: relative;
    margin-bottom: 5px;
  }

  .recommend-content .recommend-follow .follow-btn i {
    left: 10px;
    top: 50%;
    margin-top: -5px;
  }

  .recommend-content .recommend-follow .follow-btn span {
    margin-left: 15px;
  }

  .btn-ok {
    border: 1px #F8E71C solid;
    background-color: #fff;
    margin-top: 5px;
    border-radius: 30px;
    width: 65px;
    height: 28px;
    position: relative;
  }

  .recommend-content .recommend-follow .btn-ok i {
    left: 50%;
    margin-left: -8px;
    top: 50%;
    margin-top: -6px;
  }

  .teacher_loading {
    width: 80px;
    padding-top: 20%;
    text-align: center;
    font-size: 14px;
  }
  .mint-swipe-indicator{
  	opacity: 0.7;
  }
  .mint-swipe-indicator.is-active{
  	/*width: 10px;*/
  }
  .hidden{
  	display: none!important;
  }
</style>
