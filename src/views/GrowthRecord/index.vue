<template>
  <div class="sel">
    <ul class="sel-main">
      <li class="sel-left"><router-link to="/class">全部班级</router-link><i class="down"></i></li>
      <li class="sel-right"><router-link to="/origin">全部来源</router-link><i class="down"></i></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>
  .sel{
    width: 100%;
    height: 37px;
    background: #363636;
    line-height: 37px;
  }
  .sel .sel-main li{
    float: left;
    width: 50%;
    text-align: center;
    position: relative;
  }
  .sel .sel-main li a{
    color: #aaa;
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 17px;
  }
  .sel .sel-main li i{
    right: 47px;
    top: 17px;
  }
  .sel-left::after{
    content: '';
    display: inline-block;
    height: 17px;
    width: 1px;
    background-color: #2a2a2a;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -9px;
  }
</style>
