<script>

  export default {
    components: {},
    data: () => ({
    }),
    props: {
      tips: '',
    },
    methods: {},
  }
</script>

<template>
  <div>
    <p><img src="../../assets/img/ic_regret.png">{{tips}}</p>
    <button>请积分购买后收听完整音频</button>

  </div>
</template>

<style scoped="">
  div {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    background: rgba(0,0,0,0.70);
    height: 210px;
    color: #fff;
    box-sizing: border-box;
    z-index: 999;
  }
  div p {
    margin-top: 20%;
    font-family: PingFangSC-Regular;
    font-size: 17px;
  }
  p img {
    width: 5vw;
    height: 3vh;
  }
  div button {
    color: #fff;
    font-family: PingFangSC-Light;
    font-size: 14px;
    background: rgba(0,0,0,0.70);
    border-radius: 25px;
    width: 60%;
    height: 5vh;
    margin-top: 5%;
  }

</style>
