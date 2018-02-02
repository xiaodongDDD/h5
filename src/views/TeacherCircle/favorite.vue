<template>
  <section>
    <div class="favorite">
      <ul>
        <li v-for="(fm, index) in favoriteMessage">
          <mt-cell-swipe
              :right="[{
         content: '删除收藏',
         style: { background: 'red',
         color: '#fff' },
         handler: cancel
       }]">
        <div class="favorite">
          <div class="favorite-header">
            <img :src="fm.header">
            <span>{{fm.name}}</span>
            <span>{{fm.time}}</span>
          </div>
          <div class="favorite-content">
            <div class="favorite-title">
              <p>{{fm.title}}</p>
              <div>
                <span>{{fm.comments}}评论</span>
                <span v-show="fm.integration!='ok'">{{fm.integration}}积分</span>
                <span class="have" v-show="fm.integration==='ok'"><img src="../../assets/img/ic_buy@2x.png">  已购</span>
              </div>
            </div>
            <div class="favorite-image" >
              <img :src="fm.descriptionImage"/>
            </div>
          </div>
        </div>
      </mt-cell-swipe>
        </li>
      </ul>
      <Prompt :messages="myMessage"></Prompt>
    </div>
  </section>
</template>

<script>
  import header from '../../assets/logo.png'
  import Prompt from '../../components/prompt.vue'

  export default {
    name: "favorite",
    components:{
      Prompt
    },
    data() {
      return{
        title: '收藏',
        favoriteMessage: [{
          header: header,
          title: 'good哈哈哈哈哈哈哈哈你没啊憋BB了赶紧来啊 老妹儿',
          descriptionImage: header,
          name: '李太白',
          time: '09:11',
          comments: 1233,
          integration: 20,
        },
          {
            header: header,
            title: 'good哈哈哈哈哈哈哈哈你没啊憋BB了赶紧来啊 老妹儿',
            descriptionImage: header,
            name: '李太白',
            time: '09:11',
            comments: 1233,
            integration: 'ok',
          }],
        myMessage: {
          isShow: false,
          tips: '要从收藏中删除这篇文章吗?',
          title: '删除收藏',
        }
      }
    },
    methods: {
      cancel() {
         this.myMessage.isShow = true
      },
    },

  }
</script>

<style lang="scss">
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
  .favorite {
    width: 100%;
    ul {
      li {
        margin-bottom: 1vh;
      }
    }
  }
  .favorite-header {
    font-size: 14px;
    color: #aaa;
    img {
      width: 8vw;
      height: 8vw;
      border: 1px solid #ccc;
      border-radius: 50%;
    }
    span {
      &:last-of-type {
        float: right;
      }
    }
  }
  .favorite-content {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5vh;
    img {
      width: 22vw;
      height: 22vw;
      border: 1px solid #ccc;
    }
    .favorite-title {
      margin-right: 5vw;
      display: flex;
      align-content: space-between;
      flex-wrap: wrap;
      p {
          font-size: 17px;
           color: #000;
      }
      div {
        color: #aaa;
        font-size: 14px;
        span {
          margin-right: 5vw;
        }
      }
    }
  }
  .have img {
    width: 2.7vw;
    height: 2vh;
    border: none;
  }

</style>
