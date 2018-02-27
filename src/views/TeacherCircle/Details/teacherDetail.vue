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
      teacher: {
        teacher_img: headers,
        teacherName: '王春梅',
        teacherMessage: '市重点中学初中数学教研组长市重点多年初三把关老师新课标教育中心资深教师',
        teacherSay: '',
        articleNum: 23,
        followNum: 16
      },
      noBB: '作为一个新媒体艺术家，影片制作人，游戏创作者，我热爱结合一切，打破界限，去创造一种沉自身与环境' +
      '本身是一个互相影响的系统，好设计全是从我想说的是，自身与环境本身是一个互相影响的系统，好设计全是从好环' +
      '境里长出来也许我们能遇到很多突然从时光鞋子里杀出来的很特别的人，但是很少。文化是结果，是一个与智慧互相' +
      '凝结的东西，它生长在人和物互相作用中，而不存在于设计的标榜。',
      isFollow: true,
      isAll: false,
      followImage: heartNO,
      article:false
    }),
    methods: {
      showAll() {
        this.teacher.teacherSay = this.noBB;
        this.isAll = false
      },
      //关注or取消关注
      cancelFollow(uid) {
        const follow = 'quan.follow';
        const url = `http://quan-dev.xiaoheiban.cn/api/?method=${follow}&uid=${uid}&token=59a4e43d0179b04b5056178b`;
        if(this.followImage === heartNO) {
          API.get(url).then((res)=>{
            this.followImage = heartOK;
            Toast('关注成功,教师圈将会优先推荐他的文章');
          },(err)=>{
            console.log(err);
          });
        }
        // this.followImage = heartNO;
        // Toast('取消关注成功');
      },
      //获取教师详情
      getData(){
        const teacherDetail = 'quan.teacherDetail';
        const uid = 2;
        const page = 1;
        const url = `http://quan-dev.xiaoheiban.cn/api/?method=${teacherDetail}&uid=${uid}&page=${page}&token=59a4e43d0179b04b5056178b`;
        API.get(url).then((res)=>{
          console.log(res);
          if(res.response.article_list.length>0){
            this.article = true
          }
          this.teacher = Object.assign(res.response.teacher_detail);
          if(this.teacher.description.length >= 67){
            this.isAll = true
          }
        },(err)=>{})
      }
    },
    mounted() {
      this.teacher.teacherSay = this.noBB.substring(0, 67) + '...';
      this.getData()
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
            <li>{{teacher.brief}}</li>
            <!--<li>市重点多年初三把关老师</li>-->
            <!--<li>新课标教育中心资深教师</li>-->
          </ul>
        </div>
      </div>
      <div class="teacher-say">
        {{ teacher.description }}
        <span class="showAll" @click="showAll" v-show="isAll">显示全部</span>
      </div>
      <div class="detail-bottom">
        <span><img src="../../../assets/img/list_txt.png">
        <span>已发表文章{{ teacher.articles }}篇</span></span>
        <span><span>已有{{ teacher.followeds }}人关注</span>  <img :src="followImage" @click="cancelFollow(teacher.uid)"></span>
      </div>
    </div>
    <Production v-show="article"/>
  </div>
</template>

<style lang="scss" scoped="">
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
      margin-top: 2vh;
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
