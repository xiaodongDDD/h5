<script>
  import headers from '../../../assets/logo.png'
  import Production from '../../../components/production.vue'
  import heartOK from '../../../assets/img/list_follow_ok.png'
  import heartNO from '../../../assets/img/list_follow.png'
  import { Toast } from 'mint-ui';
  import { API } from '../../../service/api'
  export default {
    components: { Production },
    data: () => ({
      teacher: {},
      isFollow: 0,
      isAll: false,
      followImage: heartNO,
      article:false,
      teacherSay:'',
      uid: ''
    }),
    methods: {
      showAll() {
        this.teacherSay = this.teacher.description;
        this.isAll = false
      },
      //关注or取消
      cancelFollow(uid) {
        const follow = 'quan.follow';
        const unfollow = 'quan.unfollow';
        if(this.followImage === heartNO){
          this.followImage = heartOK;
          const url = `http://quan-dev.xiaoheiban.cn/api/?method=${follow}&uid=${uid}&token=593d1f70af36444423ebc533`;
          API.get(url).then(res=>{
            Toast('关注成功,教师圈将会优先推荐他的文章');
            ++this.teacher.followeds;
          },err=>{})
        }else{
          const unurl =`http://quan-dev.xiaoheiban.cn/api/?method=${unfollow}&uid=${uid}&token=593d1f70af36444423ebc533`;
          API.get(unurl).then(res=>{
            this.followImage = heartNO;
            if(this.teacher.followeds>0){
              --this.teacher.followeds
            }
            Toast('取消关注成功');
          },err=>{});
        }
      },
      getUid(){
        this.uid = window.location.href.split('?')[1]
      },
      //获取教师详情
      getData(){
        const teacherDetail = 'quan.teacherDetail';
        const page = 1;
        const url = `http://quan-dev.xiaoheiban.cn/api/?method=${teacherDetail}&uid=${this.uid}&page=${page}&token=593d1f70af36444423ebc533`;
        API.get(url).then((res)=>{
          console.log(res);
          if(res.response.is_follow===1){
            this.followImage = heartOK
          }
          if(res.response.article_list.length>0){
            this.article = true
          }
          this.teacher = Object.assign(res.response.teacher_detail);
          if(this.teacher.description.length >= 67){
            this.teacherSay = this.teacher.description.substring(0, 67) + '...';
            this.isAll = true
          }
        },(err)=>{})
      }
    },
    mounted() {
    	this.getUid();
      this.getData();
    },
    metaInfo: {
      meta: [{
        name: 'xiaoheiban_disable_share',
        content: 'true'
      }]
    }
  }
</script>

<template>
  <div>
    <div class="teacher-detail">
      <div class="teacher-detail-header">
        <img :src="teacher.teacher_img">
        <div class="teacher-message">
          <p class="teacher-name">{{teacher.teacher_name}}</p>
          <ul>
            <li>{{teacher.brief? `${teacher.brief.substring(0, 50)}...`:teacher.brief}}</li>
            <!--<li>市重点多年初三把关老师</li>-->
            <!--<li>新课标教育中心资深教师</li>-->
          </ul>
        </div>
      </div>
      <div class="teacher-say">
        {{ teacherSay }}
        <span class="showAll" @click="showAll" v-show="isAll">显示全部</span>
      </div>
      <div class="detail-bottom">
        <span><img src="../../../assets/img/list_txt.png">
        <span>已发表文章{{ teacher.articles }}篇</span></span>
        <span><span>已有{{ teacher.followeds }}人关注</span>  <img :src="followImage" @click="cancelFollow(teacher.uid)"></span>
      </div>
    </div>
    <Production :teacherId="teacher.uid"></Production>
  </div>
</template>

<style lang="scss" scoped>
   .teacher-detail {
      padding: 4vw;
     background-color: #fff;
   }
   .teacher-detail-header {
     display: flex;
     justify-content: space-between;
     img {
       height: 15vh;
       width: 26.7vw;
       border: 1px solid #ccc;
     }
   }
  .teacher-message {
    .teacher-name {
      font-family: PingFangSC-Regular;
      font-size: 17px;
      height: 3vh;
    }
    ul {
      margin-top: 2vh;
      font-family: PingFangSC-Light;
      font-size: 14px;
      width: 60vw;
      height: 9vh;
      li {
        margin-bottom: 1vh;
      }
    }
  }
   .teacher-say {
     font-size: 14px;
     margin-top: 2vh;
     line-height: 20px;
   }
   .showAll {
     color: #259BDA;
   }
  .detail-bottom {
    font-size: 14px;
    width: 100%;
    border-top: 1px solid #EDEDED;
    margin-top: 2vh;
    padding-top: 2vh;
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    span {
      &:first-of-type {
        img {
          width: 3vw;
          height: 2.3vh;
        }
      }
      &:last-of-type {
        img {
          width: 4vw;
          height: 2vh;
        }
      }
    }
  }

</style>
