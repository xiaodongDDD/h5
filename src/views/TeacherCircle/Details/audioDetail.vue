<template>
  <section>
    <div class="v-main">
      <!--视频-->
      <div class="v-audio">
        <audio src="../../../assets/img/yinpin.mp3" ref="media"></audio>
        <experienceOver :tips="timeOver" v-show="isTryOver" ></experienceOver>
        <div class="outer" ref="out"><img src="../../../assets/img/ic_video_play_video.png" class="palyload" @click="play"></div>
        <span class="videoTime" v-show="originStatus">{{videoData.duration}}</span>
        <div class="v-control" v-if="!originStatus">
          <div><img src="../../../assets/img/play_fill.svg" @click="play" class="start" v-if="playStatus"></div>
          <div><img src="../../../assets/img/stop.svg" @click="paused" class="stop" v-if="!playStatus"></div>
          <div class="v-progresss">
            <mt-range
              v-model="currentTime"
              :max="maxTime"
              :step="0.01"
              :bar-height="2"
            >
              <div slot="start" class="v-word">{{currentTime}}</div>&nbsp;
              <div slot="end" class="v-word">{{maxTime}}</div>
            </mt-range>
            <span class="hide-line"></span>
            <!--<span class="v-word">{{currentTime}}</span>-->
            <!--<progress :max="maxTime" :value="currentTime" class="processbar"></progress>-->
            <!--<span class="v-word">{{maxTime}}</span>-->
          </div>
        </div>
      </div>
      <div class="is-buy" style="left: 11px;" v-show="isBuy"></div>
      <charge category="音频" action="收听"></charge>
      <!--标题-->
      <div class="v-title">
        <p>免费免费人教版三年级数学期末复习试卷，都是精装考点一张顶十张！</p>
      </div>
      <!--简介-->
      <div class="v-info">
        <img src="../../../assets/img/64089713_p4.jpg" style="width: 28px;height: 29px;border-radius: 93px">
        <span>李太白</span>
        <span>11/25</span>
      </div>
      <!--内容-->
      <div class="v-con">
        <p>
          有人说，Kim Laughton或许是过去十年间，对国内电子音乐界影响最大的视觉艺术家之一。Kim是英国伦敦人，毕业于伦敦布鲁内尔大学多媒体专业，2010 年因为一项和上海世博会有关的工作任务来到上海，没到就此定居至今。
        </p>
        <img src="../../../assets/img/64089713_p1.jpg" class="con-img">
        <p>你可能不知道Kim Laughton，但你有很大的可能见过他的艺术项目“淘宝媒体”。如果你还不知道“淘宝媒体”，而这又与他的“超·现实”的艺术表现相得益彰。</p>
      </div>
      <!--评论-->
      <div class="comment-main">
        <comment></comment>
      </div>
    </div>
  </section>
</template>

<script>
  import Comment from '../../../components/detailComponent/comment'
  import experienceOver from '../../../components/detailComponent/experienceTimeOver.vue'
  import charge from '../../../components/detailComponent/charge.vue'
  export default {
    name: "audio-detail",
    components:{
      comment: Comment,
      experienceOver,
      charge,
    },
    data(){
      return{
        videoData:{
          duration:30.50,
          currentTime: '',
        },
        originStatus: true,
        playStatus:true,
        media:{},
        timeOver: '试看时间结束',
        isTryOver: false,
        maxTime:0,//总时间
        currentTime: 0,//当前时间
        isBuy: false,
      }
    },
    watch: {

    },
    methods:{
      play(){
        this.$refs.media.play();
        this.$refs.out.style = 'display:none;';
        this.originStatus = false;
        this.playStatus = false;
      },
      paused(){
        this.$refs.media.pause();
        this.playStatus = true;
      }
    },
    mounted() {
      let video = document.getElementsByTagName('audio')[0];
      video.oncanplay = () => {
        let videoTotalTime = video.duration;
        this.maxTime = Number(videoTotalTime.toFixed(2));
        this.videoData.duration = `0${parseInt(video.duration/60)}:0${parseInt(video.duration%60)}`;
        video.addEventListener('timeupdate', () => {
          this.currentTime = Number(video.currentTime.toFixed(2));
          if(video.currentTime > videoTotalTime/3) {
            video.pause();
            this.isTryOver = true;
            this.playStatus = true;
          }
        });
        video.addEventListener('ended',()=>{
          this.playStatus = true;
        })
      }
    }
  }
</script>

<style>
  .v-main{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .v-main .v-audio{
    width: 100%;
    height: 160px;
    position: relative;
    background: url("../../../assets/img/bg.png") center center no-repeat;
  }
  .v-main .v-audio .v-control{
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    width: 100%;
    height: 14px;
    padding: 0 15px 14px 15px;
    line-height: 14px;
  }
  .start{
    width: 22px;
    height: 23px;
    position: absolute;
    top: 30%;
    margin-top: -6px;
    z-index: 9;
  }
  .stop{
    width: 22px;
    height: 23px;
    position: absolute;
    top: 30%;
    margin-top: -6px;
  }
  .v-main .outer{
    background-color: rgba(0,0,0,.5);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .v-main .v-audio .palyload{
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -20px;
  }
  .v-main .videoTime{
    position: absolute;
    width: 42px;
    height: 19px;
    border-radius: 25px;
    background-color: rgba(0,0,0,.71);
    font-family: PingFangSC-Light;
    font-size: 10px;
    color: #FFFFFF;
    letter-spacing: -0.3px;
    line-height: 19px;
    text-align: center;
    bottom: 10px;
    right: 10px;
  }
  .v-main .v-title{
    padding: 20px 15px 15px 15px;
  }
  .v-main .v-title p{
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #000000;
    letter-spacing: -0.48px;
    line-height: 24px;
  }
  .v-main .v-info{
    height: 28px;
    padding: 0 15px;
    line-height: 28px;
  }
  .v-main .v-info  span:first-child{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #222222;
    letter-spacing: -0.34px;
    line-height: 14px;
  }
  .v-main .v-info  span:last-child{
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #AAAAAA;
    letter-spacing: -0.34px;
    line-height: 14px;
    float: right;
    margin-top: 4px;
  }
  .v-main .v-con{
    padding: 20px 15px 15px 15px;
    font-family: PingFangSC-Light;
    font-size: 17px;
    color: #000000;
    letter-spacing: 0px;
    line-height: 25px;
  }
  .v-main .v-con .con-img{
    margin: 15px 0;
    width: 100%;
    height: 194px;
  }
  .v-progresss{
    padding-left: 7%;
    width: 83%;
    /*position: absolute;*/
    /*height: 14px;*/
    /*margin-top: -14px;*/
    /*top: 50%;*/
  }
  .processbar{
    height: 2px;
    width: 70%;
    border-radius: 8px;
    background-color: rgba(255,255,255,.3);
    color: #fff;
  }
  .v-word{
    /*padding-top: 2px;*/
    display: inline-block;
    vertical-align: center;
    font-family: PingFangSC-Light;
    font-size: 10px;
    color: #FFFFFF;
    letter-spacing: -0.24px;
    line-height: 14px;
    padding-top: 8px;
  }

  progress::-webkit-progress-bar {
    background-color: rgba(255,255,255,.3);
  }

  progress::-webkit-progress-value {
    background-color: #fff;
  }

  progress::-moz-progress-bar {
    background-color: rgba(255,255,255,.3);
  }
  .mt-range .mt-range-content .mt-range-runway{
    margin: 0 20px;
    /*border-top-width: 0 !important;*/
  }
  .mt-range .mt-range-content .mt-range-thumb{
    width: 10px !important;
    height: 10px !important;
    top: 50%;
    margin-top: -5px;
  }
  .mt-range-content{
    margin-left: 4px;
    margin-right:  16px !important;
  }
  .hide-line{
    width: 12px;
    height: 8px;
    background-color: rgba(200,0,0,.5);
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10000;
  }
</style>
