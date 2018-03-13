<script>
  import headers from '../../../assets/logo.png'
  import Production from '../../../components/production.vue'
  import heartOK from '../../../assets/img/list_follow_ok.png'
  import heartNO from '../../../assets/img/list_follow.png'
  import {Toast} from 'mint-ui';
  import {API} from '../../../service/api'

  export default {
    components: {Production},
    data: () => ({
      teacher: {uid: window.location.href.split('?')[1]},
      isFollow: 0,
      isAll: false,
      followImage: heartNO,
      article: false,
      teacherSay: '',
      uid: '',
      articleList: [],
      loading: false,
      loadingNumber: 0,
      totalPage: 1,
      isAll: '加载中...'
    }),
    methods: {
      showAll() {
        this.teacherSay = this.teacher.description;
        this.isAll = false
      },
      //关注or取消
      cancelFollow(uid) {
        let method;
        if (this.followImage === heartNO) {
          method = 'quan.follow';
        } else {
          method = 'quan.unfollow';
        }
        let str = '&uid=' + uid;
        const fUri = this.basePath + method + str + this.token;
        this.axios.get(fUri)
          .then(res => {
            let data = res.data.response;
            if (data.status == 200) {
              if (this.followImage === heartNO) {
                Toast('关注成功,教师圈将会优先推荐他的文章');
                ++this.teacher.followeds;
                this.followImage = heartOK;
              } else {
                Toast('取消关注成功');
                --this.teacher.followeds;
                this.followImage = heartNO;
              }
            } else {
            }
          })

      },
      getUid() {

        console.log(this.uid);
      },
      //获取教师详情
      getData(page) {
        console.log(this.uid);
        let method = 'quan.teacherDetail';
        let str = '&uid=' + this.uid + '&page=' + page;
        const url = this.basePath + method + str + this.token;
        API.get(url).then((res) => {
          console.log(res);
          if (res.response.is_follow === 1) {
            this.followImage = heartOK
          }
          if (res.response.article_list.length > 0) {
            this.article = true
          }
          this.teacher = Object.assign(res.response.teacher_detail);
          if (this.teacher.description.length >= 67) {
            this.teacherSay = this.teacher.description.substring(0, 67) + '...';
            this.isAll = true
          }

          this.articleList = this.articleList.concat(res.response.article_list)
          this.totalPage = Math.ceil(res.response.article_sum/10);
          console.log(this.totalPage)
          if(this.totalPage == 0){
            this.isAll = '暂无文章!'
            this.loading = true;
          }
          console.log(this.totalPage+'pppppp');
        }, (err) => {
        })
      },

      loadMore() {
        console.log();
        this.loading = false;
        this.loadingNumber++;
        if (this.loadingNumber > this.totalPage) {
          this.isAll = '到底啦!'
          this.loading = true;
        }
        if (this.totalPage > 1 && this.loadingNumber <= this.totalPage) {
          this.getData(this.loadingNumber);
        }
      },
      getArticlesData() {

      },
      goArticleDetail(type, id) {
      	let arurl = '';
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
              arurl = this.jsPath + `article?${id}`;
              JSAction.openUrl(arurl);
              break;
            case '2':
              arurl = this.jsPath + `audio?${id}`;
              JSAction.openUrl(auurl);
              break;
            case '3':
              arurl = this.jsPath + `video?${id}`;
              JSAction.openUrl(arurl);
          }
        }
      }

    },
    mounted() {
      this.uid = window.location.href.split('?')[1]
      this.getData(1);
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
        <span><span>已有{{ teacher.followeds }}人关注</span>  <img :src="followImage"
                                                              @click="cancelFollow(teacher.uid)"></span>
      </div>
    </div>
    <!--<Production :teacherId="teacher.uid"></Production>-->

    <div class="products">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li v-for="item in articleList" class="product" @click="goArticleDetail(item.type,item.article_id)">
          <div class="product-content">
            <p>{{item.title}}</p>
            <div class="product-bar">
              <span>{{item.comments}}评论</span>
              <span v-if="item.integration != 'ok'">{{item.points}}积分</span>
              <span class="isHave" v-if="item.integration === 'ok'"><img src="../../../assets/img/ic_buy.png"><a>已购</a></span>
              <span>{{item.time}}</span>
            </div>
          </div>
          <img :src="item.cover">
        </li>
      </ul>
      <div style="text-align: center" class="loadings">{{isAll}}</div>
    </div>
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

  .products {
    margin-top: 2vh;
  }

  .product {
    display: flex;
    justify-content: space-between;
    padding: 2.5vh;
    background-color: #fff;
    margin-bottom: 1vh;
  }

  .product-content {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }

  .product-content p {
    margin-bottom: 2vh;
    font-size: 17px;
  }

  .product img {
    width: 22.3vw;
    height: 12.5vh;
  }

  .product-bar {
    font-size: 14px;
    color: #AAA;
    width: 100%;
  }

  .product-bar span {
    width: 20%;
  }

  .product-bar span:first-of-type {
    margin-right: 5%;
  }

  .product-bar span:last-of-type {
    margin-left: 35%;
  }

  .isHave img {
    width: 3vw;
    height: 2vh;
  }

  .loadings img {
    height: 30px;
    width: 30px;
    animation: loading 1000ms infinite linear;
    margin-right: 10px;
  }

  @keyframes loading {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

</style>
