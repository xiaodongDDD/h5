<script>

  export default {
    components: {},
    data: () => ({
      texts: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      showText: [],
      scrolled: 0,

    }),
    methods: {
      handleScroll() {
        this.showText = this.texts.slice(9, 18)

      }
    },
    mounted() {
      let listMove = document.getElementById('details')
      this.showText = this.texts.slice(0, 8)
      let _this = this
      listMove.addEventListener('scroll', () => {
        console.log(listMove.scrollTop)
        this.scrolled = listMove.scrollTop
        if(listMove.scrollTop > 100) {
          setTimeout(_this.handleScroll,1000)
        }
      })

    }
  }
</script>

<template>
  <div>
    <ul class="detail-list" id="details" >
      <li v-for="text in showText">{{text}}</li>
    </ul>
    <div class="load-more" v-show="">正在加载</div>
  </div>
</template>

<style scoped="">
  .detail-list {
    overflow:auto;
    height: 700px;
  }
  .detail-list li {
    height: 100px;
    background-color: #4caf50;
    margin-bottom: 10px;
  }
  .load-more {
    margin-top: 700px;
  }


</style>
