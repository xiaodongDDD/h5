<template>
  <section>
    <commonHeader title="收藏"></commonHeader>
    <div class="favorite">
      <ul>
        <li v-for="(fm,index) in favoriteMessage">
          <mt-cell-swipe
              :right="[{
         content: '取消关注',
         style: { background: 'red', color: '#fff' },
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
                <span>{{fm.integration}}积分</span>
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
    </div>
  </section>
</template>

<script>
  import header from '../../assets/logo.png'
  export default {
    name: "favorite",
    components:{
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
        }]
      }
    },
    methods: {
      cancel() {

      },
    },

  }
</script>

<style lang="scss">
  .mint-cell-value {
    width: 100%;
    padding: 1.5vh 0;
  }
  .favorite {
    width: 100%;
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
    margin-top: 1vh;
    img {
      width: 25vw;
      height: 25vw;
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

</style>
