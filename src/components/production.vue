<script>
  import { InfiniteScroll } from 'mint-ui';
  import articleImage from '../assets/img/all.png'
  export default {
    components: {},
    data: () => ({
      articleList:[{
        headers: articleImage,
        title: '高中化学教育教学过程的优化策略太实用了',
        comment: 1234,
        integration: 30,
        time: '9:40'
      },
        {
          headers: articleImage,
          title: '高中化学教育教学过程的优化策略太实用了',
          comment: 1234,
          integration: 30,
          time: '9:40'
        },
        {
          headers: articleImage,
          title: '高中化学教育教学过程的优化策略太实用了',
          comment: 1234,
          integration: 30,
          time: '9:40'
        },
        {
          headers: articleImage,
          title: '高中化学教育教学过程的优化策略太实用了',
          comment: 1234,
          integration: 30,
          time: '9:40'
        },
        {
          headers: articleImage,
          title: '高中化学教育教学过程的优化策略太实用了',
          comment: 1234,
          integration: 30,
          time: '9:40'
        },
        {
          headers: articleImage,
          title: '高中化学教育教学过程的优化策略太实用了',
          comment: 1234,
          integration: 30,
          time: '9:40'
        },
        {
          headers: articleImage,
          title: '高中化学教育教学过程的优化策略太实用了',
          comment: 1234,
          integration: 30,
          time: '9:40'
        },
        {
          headers: articleImage,
          title: '高中化学教育教学过程的优化策略太实用了',
          comment: 1234,
          integration: 30,
          time: '9:40'
        },
        {
          headers: articleImage,
          title: '高中化学教育教学过程的优化策略太实用了',
          comment: 1234,
          integration: 30,
          time: '9:40'
        },
        {
          headers: articleImage,
          title: '高中化学教育教学过程的优化策略太实用了',
          comment: 1234,
          integration: 30,
          time: '9:40'
        }],
      loading: false,
    }),
    methods: {
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.articleList[this.articleList.length - 1];
          for (let i = 1; i <= 5; i++) {
            this.articleList.push(last + i);
          }
          this.loading = false;
        }, 2500);
      },
    },
  }
</script>

<template>
  <div class="products">
    <ul v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
      <li v-for="item in articleList" class="product">
          <div class="product-content">
            <p>{{item.title}}</p>
            <div class="product-bar">
              <span>{{item.comment}}评论</span>
              <span>{{item.integration}}积分</span>
              <span>{{item.time}}</span>
            </div>
          </div>
          <img :src="item.headers">
      </li>
    </ul>
  </div>
</template>

<style scoped>
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
</style>
