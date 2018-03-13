<template>
	<section>
		<div class="favorite-container">
			<ul v-infinite-scroll="loadMore"
	          infinite-scroll-disabled = "false"
	          infinite-scroll-distance="10"
	          infinite-scroll-immediate-check = true>
          		<li v-for="(fm, index) in collect_list" @touchstart="getIndex(fm.article_id, index)" @click="getDetails(fm.type,fm.article_id)">
          			<mt-cell-swipe
		              :right="[{
				          content: '删除收藏',
				          style: { background: 'red', color: '#fff' },
				          handler: () => cancelFa(fm.article_id,index),
		       		}]">
			       		<div class="favorites">
			       			<div class="favorite-header">
			       				<img :src="fm.img">
					            <span>{{fm.user_name}}</span>
					            <span>{{getTimestamp(fm.create_time)}}</span>
			       			</div>
			       			<div class="favorite-content">
					            <div class="favorite-image" >
					              <img :src="fm.cover"/>
					            </div>
			       				<div class="favorite-title">
					              <p>{{fm.title}}</p>
					              <div class="favorite-comments">
					                <span>{{fm.comments}}评论</span>
					                <!--<span v-show="fm.integration!='ok'">{{fm.is_charge != 0 ? `${fm.points}积分`:'免费'}}</span>
					                <span class="have" v-show="fm.integration==='ok'"><img src="../../assets/img/ic_buy.png">  已购</span>-->
					              </div>
					            </div>
			       			</div>
			       		</div>
		       		</mt-cell-swipe>
          		</li>
			</ul>
			<div style="text-align: center" class="loadings">{{isAll}}</div>
      		<Prompt :messages="myMessage" v-on:ensure="isDel"></Prompt>
		</div>
	</section>
</template>

<script>
  import Prompt from '../../components/prompt.vue'
  import { API } from '../../service/api'
  import { InfiniteScroll } from 'mint-ui'
  import { timestampToTime } from '../../service/timestamp'
  import { MessageBox } from 'mint-ui'
//import { goTODetails } from '../../service/jsAction'
  export default {
    name: "favorite",
    components:{
      Prompt
    },
    data() {
      return{
        title: '收藏',
        collect_list: [],
        isAll: '',
        myMessage: {
          isShow: false,
          tips: '要从收藏中删除这篇文章吗?',
          title: '删除收藏',
        },
        loading_number: 1,
        total_page: '',
        realDeleteId: '',
        fakeDeleteId: ''
      }
    },
    methods: {
      cancel() {
         this.myMessage.isShow = true
      },
      getTimestamp(timestamp) {
        return timestampToTime(timestamp)
      },
      getIndex(article_id, index) {
         this.realDeleteId = article_id
        this.fakeDeleteId = index
      },
      isDel(data) {
        if(data) {
          API.get(`api/?method=quan.uncollect&article_id=${this.realDeleteId}`).then(res => {
            console.log(res)
            this.collect_list.splice(this.fakeDeleteId, 1)
          })
          //console.log(this.teacherMessages)
        }
      },
      loadMore() {
        this.loading = true;
        this.loading_number++;
        if(this.loading_number >= this.total_page) {
          this.isAll = '到底啦!'
        }
        if(this.total_page > 1 && this.loading_number <= this.total_page) {
          API.get(`api/?method=quan.collectClick&page=${this.loading_number}`)
            .then(res => {
              setTimeout(() => {
                let last = res.response.collect_list;
                for(let i = 0; i < last.length; i ++) {
                  this.collect_list.push(last[i])
                }
                this.loading = false;
              }, 1000)
            })
        }
      },
      getDetails(type,id){
//    	console.log(id); return false;
				let arurl = '';
				if(this.useragent == 0){
					switch (type) {
		        case 1:
		          var path = '/article?' + id;
		          this.$router.push({path: path});
		          break;
		        case 2:
		          var path = '/audio?' + id;
		          this.$router.push({path: path});
		          break;
		        default:
		          var path = '/video?' + id;
		          this.$router.push({path: path});
		     	}
				}else{
					switch (type) {
		        case 1:
		          arurl = this.jsPath + `article?${id}`;
//		          console.log(arurl); return false;
		          JSAction.openUrl(arurl);
		          break;
		        case 2:
		          arurl = this.jsPath + `audio?${id}`;
//		          console.log(arurl); return false;
		          JSAction.openUrl(auurl);
		          break;
		        default:
		          arurl = this.jsPath + `video?${id}`;
//		          console.log(arurl); return false;
		          JSAction.openUrl(arurl);
		     	}
				}
	  	},
	  	cancelFa(id,index) {
				let method = 'quan.uncollect';
				let str = '&article_id=' + id;
				const fUri = this.basePath + method + str + this.token;
				this.axios.get(fUri)
				.then(res => {
					let data = res.data.response;
					if(data.status == 200){
						this.collect_list.splice(index,1);
						Toast({
		          message: '取消收藏成功',
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
	  	}
    },
    mounted() {
//  	let aUrl = `/api/?method=quan.collectClick&page=${this.loading_number}` + this.token;
			let aUrl = this.basePath + `quan.collectClick&page=${this.loading_number}` + this.token;
      this.axios.get(aUrl).then(res => {
        res = res.data.response;
        this.collect_list = res.collect_list;
        this.total_page = Math.ceil(res.collect_sum / 10);
        this.total_page <= 1 ? this.isAll = '':this.isAll = '加载中...'
      })
    },
    metaInfo: {
      title: "我的收藏",
      meta: [{
        name: 'xiaoheiban_disable_share',
        content: 'true'
      }]
    }

  }
</script>

<style lang="less" type="text/less">
	.mint-cell-wrapper {
    padding: 0;
  }
  .mint-cell-value {
    width: 100%;
    padding: 2vh 3vw;
    background-color: #fff;
  }
  .mint-cell-swipe-button {
    width: 20vw;
    padding: 55% 4vw;
    box-sizing: border-box;
    line-height: 22px;
    font-size: 20px;
  }
	.favorite-container{
		.favorites{
			width: 100%;
		}
		li{
			margin-bottom: 5px;
		}
		.favorite-header{
			width:100%;
			
			img{
				width: 28px;
				height: 28px;
				border-radius: 50%;
			}
			
			span:last-child{
				float: right;
				line-height: 28px;
				display: inline-block;
			}
		}
		.favorite-content{
	    margin-top: 10px;
			img{
				width: 86px;
				height: 86px;
			}
			
			.favorite-title{
			    margin-right: 90px;
				line-height: 21px;
				height: 86px;
				position: relative;
				
				p{
					font-size: 17px;
					color: #000000;
					height: 63px;
					overflow: hidden;
				}
				.favorite-comments{
					position: absolute;
					bottom: 0;
				}
			}
			.favorite-image{
				float: right;
			}
		}
	}
	.loadings{
		height: 40px;
		line-height: 40px;
	}
</style>