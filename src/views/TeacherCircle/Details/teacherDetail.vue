<script>
  import headers from '../../../assets/logo.png'
  import Production from '../../../components/production.vue'
  export default {
    components: { Production },
    data: () => ({
      teacher: {
        teacherHeader: headers,
        teacherName: '王春梅',
        teacherMessage: '市重点中学初中数学教研组长市重点多年初三把关老师新课标教育中心资深教师',
        teacherSay: '',
        articleNum: 23,
        followNum: 16
      },
      noBB: '作为一个新媒体艺术家，影片制作人，游戏创作者，我热爱结合一切，打破界限，去创造一种沉自身与环境本身是一个互相影响的系统，好设计全是从我想说的是，自身与环境本身是一个互相影响的系统，好设计全是从好环境里长出来也许我们能遇到很多突然从时光鞋子里杀出来的很特别的人，但是很少。文化是结果，是一个与智慧互相凝结的东西，它生长在人和物互相作用中，而不存在于设计的标榜。',
      isFollow: true,
      isAll: true,
      list: [1,2,3,4,5,6,7,8,9,10]
    }),
    methods: {
      showAll() {
        this.teacher.teacherSay = this.noBB
        this.isAll = false
      },
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 4; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      }
    },
    mounted() {
      this.teacher.teacherSay = this.noBB.substring(0, 67) + '...'
    }
  }
</script>

<template>
  <div>
    <div class="teacher-detail">
      <div class="teacher-detail-header">
        <img :src="teacher.teacherHeader">
        <div class="teacher-message">
          <p class="teacher-name">{{teacher.teacherName}}</p>
          <ul>
            <li>市重点中学初中数学教研组长</li>
            <li>市重点多年初三把关老师</li>
            <li>新课标教育中心资深教师</li>
          </ul>
        </div>
      </div>
      <div class="teacher-say">
        {{ teacher.teacherSay }}
        <span class="showAll" @click="showAll" v-show="isAll">显示全部</span>
      </div>
      <div class="detail-bottom">
        <span><img src="../../../assets/img/list_txt@2x.png">
        <span>已发表文章{{ teacher.articleNum }}篇</span></span>
        <span><span>已有{{ teacher.followNum }}人关注</span>  <img src="../../../assets/img/list_follow_ok@2x.png"></span>
      </div>
    </div>
    <Production></Production>
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
