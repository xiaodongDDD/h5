<script>
  import header from '../../../assets/img/all.png'
  export default {
    components: {},
    data: () => ({
      article: {
        title: '免费免费人教版三年级数学期末复习试卷，都是精装考点一张顶十张！',
        header: header,
        name: '李太白',
        content: '<p style="font-family: PingFangSC-Light;font-size: 17px;letter-spacing: 0;line-height: 25px;">'
        +'有人说，Kim Laughton或许是过去十年间，对国内电子音乐界影响最大的视觉艺术家之一。Kim是英国伦敦人，毕业于伦敦布鲁内尔大学多媒体专业，2010'
        + '年因为一项和上海世博会有关的工作任务来到上海，没到就此定居至今。</p> <p>' +
        '</p>' ,
        time: '11/25'
      }
    }),
    methods: {},

  }
</script>

<template>
  <div class="article-detail">
    <h2>{{article.title}}</h2>
    <div class="author-bar">
      <img :src="article.header" alt="头像">
      <span>{{article.name}}</span>
      <span>{{article.time}}</span>
    </div>
    <div v-html="article.content"></div>
  </div>
</template>

<style lang="scss" scoped="">
    .article-detail {
      padding: 2vh 4vw;
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
