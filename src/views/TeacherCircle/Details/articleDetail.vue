<script>
  import comment from '../../../components/detailComponent/comment.vue'
  import charge from  '../../../components/detailComponent/charge.vue'
  import freePrompt from '../../../components/detailComponent/freeIntegrate.vue'
  import { API } from '../../../service/api'
  import { MessageBox } from 'mint-ui'
  export default {
    components: { comment, charge, freePrompt },
    filters:{
      timestampToMD:function (timestamp) {
        const date = new Date(timestamp * 1000);
        const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        const D = date.getDate() + ' ';
        return M+'/'+D;
      },
      timestampToYMD:function (timestamp) {
        if(!timestamp){
          timestamp = +new Date()/1000;
        }
        const date = new Date(timestamp * 1000);
        const Y = date.getFullYear();
        const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        const D = date.getDate() + ' ';
        return Y+'/'+M+'/'+D;
      }
    },
    data: () => ({
      article: {},
      isFree: false,
      showContent: '',
      isBuy: 0,
      articleId:0,
      buyTime:''
    }),
    beforeMount(){
      this.getArticleId();
    },
    methods: {
      getArticles(){
        const detail = 'quan.articleDetail';
        const page = 1;
        const url = `http://quan-dev.xiaoheiban.cn/api/?method=${detail}&article_id=${this.articleId}&page=${page}&type=1&token=593d1f70af36444423ebc533`;
        this.axios.get(url).then(res => {
//        console.log(res);return false;
					let data = res.data.response;
          if(data.status == 200){
            this.isBuy = data.is_buy;
            this.buyTime = data.buy_time;
            this.article = Object.assign(data.article_detail);
            this.isFree = data.article_detail.is_charge===0?true:false
          }else{
            MessageBox({
						  title: '提示',
						  message: '未找到文章信息',
						  showCancelButton: false
						});
          }
        },err=>{})
      },
      getArticleId(){
        this.articleId = window.location.href.split('?')[1]
      }

    },
    mounted() {
      this.getArticles()
    },


  }
</script>

<template>
  <div style="position: relative">
    <!--<img src="../../../assets/img/ic_buy.png" class="buy-tab" v-show="isBuy>=1">-->
  <div class="article-detail">
    <h2>{{article.title}}</h2>
    <div class="author-bar">
      <img :src="article.teacher_img" alt="头像">
      <span>{{article.teacher_name}}</span>
      <span>{{article.create_time | timestampToMD(article.create_time)}}</span>
    </div>
    <div style="position: relative">
      <div class="article-content" v-html="article.show_content?article.show_content:article.content"></div>
      <!--<div class="attachment">-->
        <!--&lt;!&ndash;<img src="../../../assets/img/triangle_down_fill.svg">&ndash;&gt;-->
      <!--</div>-->
      <div class="have-message" v-show="isBuy===1">
        <span>{{ buyTime | timestampToYMD(buyTime)}}</span>
        <span>已购</span>
      </div>
      <div class="charge-content" v-show = "isBuy<1">
        <img src="../../../assets/img/mask.png" class="charge-hide">
        <!--<charge category="文章" action="阅读" :points="article.user_points" :articlePoint="article.points"></charge>-->
      </div>
    </div>
  </div>
    <comment></comment>
    <!--<free-prompt></free-prompt>-->
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
	        line-height: 30px;
	        color: #AAAAAA;
	      }
	    }
	
	  }
	}
	.article-content{
		line-height: 24px;
	}
</style>
