<script>
  import header from '../../../assets/img/all.png'
  import comment from '../../../components/detailComponent/comment.vue'
  import charge from  '../../../components/detailComponent/charge.vue'
  import freePrompt from '../../../components/detailComponent/freeIntegrate.vue'
  export default {
    components: { comment, charge, freePrompt },
    data: () => ({
      article: {
        title: '免费免费人教版三年级数学期末复习试卷，都是精装考点一张顶十张！',
        header: header,
        name: '李太白',
        content: '<p style="font-family: PingFangSC-Light;font-size: 17px;letter-spacing: 0;line-height: 25px;margin-bottom: 2vh">'
        +'有人说，Kim Laughton或许是过去十年间，对国内电子音乐界影响最大的视觉艺术家之一。Kim是英国伦敦人，毕业于伦敦布鲁内尔大学多媒体专业，2010'
        + '年因为一项和上海世博会有关的工作任务来到上海，没到就此定居至今。</p> <p>' +
        '</p><p style="font-family: PingFangSC-Light;font-size: 17px;letter-spacing: 0;line-height: 25px;margin-bottom: 2vh">'
        +'他制作3D 虚拟影像，创作线下装置作品，为电子音乐活动设计海报，他通过自己“超·现实”的数码美学，为许多音乐人的作品提供视觉上的诠释和启发。同时，他还拥有一个名为Timefly的服装品牌。</p>'
        +'<img style="width: 100%;" src="https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=2072fbcd5b6034a83defb0d3aa7a2231/4b90f603738da9778045f4e7b751f8198718e390.jpg">'
        +'<p style="font-family: PingFangSC-Light;font-size: 17px;letter-spacing: 0;line-height: 25px;">你可能不知道Kim Laughton，但你有很大的可能见过他的艺术项目“淘宝媒体”。如果你还不知道“淘宝媒体”，不要错过这个一定会让你笑到不能自已的图片集，而这又与他的“超·现实”的艺术表现相得益彰。</p>'
      +'<p style="font-family: PingFangSC-Light;font-size: 17px;letter-spacing: 0;line-height: 25px;">你可能不知道Kim Laughton，但你有很大的可能见过他的艺术项目“淘宝媒体”。如果你还不知道“淘宝媒体”，不要错过这个一定会让你笑到不能自已的图片集，而这又与他的“超·现实”的艺术表现相得益彰。</p>',
      time: '11/25'
      },
      isFree: false,
      showContent: '',
      isBuy: false,
    }),
    methods: {},
    mounted() {
      if(this.isFree || this.isBuy) {
        this.showContent = this.article.content
      } else {
        this.showContent = this.article.content.substring(0, 900)
      }
    },
  }
</script>

<template>
  <div style="position: relative">
    <img src="../../../assets/img/ic_buy@2x.png" class="buy-tab" v-show="isBuy">
  <div class="article-detail">
    <h2>{{article.title}}</h2>
    <div class="author-bar">
      <img :src="article.header" alt="头像">
      <span>{{article.name}}</span>
      <span>{{article.time}}</span>
    </div>
    <div style="position: relative">
      <div v-html="showContent"></div>
      <!--<div class="attachment">-->
        <!--&lt;!&ndash;<img src="../../../assets/img/triangle_down_fill.svg">&ndash;&gt;-->
      <!--</div>-->
      <div class="have-message" v-show="isBuy">
        <span>2018/12/22</span>
        <span>已购</span>
      </div>
      <div class="charge-content" v-show = "!(isFree || isBuy)">
        <img src="../../../assets/img/mask@2x.png" class="charge-hide">
        <charge category="文章" action="阅读"></charge>
      </div>
    </div>
  </div>
    <comment></comment>
    <free-prompt></free-prompt>
  </div>
</template>

<style lang="scss" scoped="">
  .have-message {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #AAA;
    text-align: right;
    margin: 1.5vh 0;
  }
  .charge-content {
    position: absolute;
    bottom: 0;
  }
  .charge-hide {
    width: 100%;
    background-image: linear-gradient(-180deg, rgba(255,255,255,0.00) 0%, #FFFFFF 100%);
  }
  .buy-tab {
    position: fixed;
    width: 2vw;
    height: 1.6vh;
    left: 4vw;
  }
    .article-detail {
      padding: 2vh 4vw;
      background-color: #fff;
      h2 {
        font-family: PingFangSC-Medium;
        font-size: 20px;
        margin-bottom: 2vh;
      }
      .author-bar {
        padding-right: 3vw;
        color: #222;
        margin-bottom: 3vh;
        img {
          width: 8vw;
          height: 4.5vh;
          border-radius: 50%;
        }
        span {
            font-size: 14px;
          &:last-of-type {
            float: right;
          }
        }

      }

    }



</style>
