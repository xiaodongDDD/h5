<template>
  <div>
    <div class="detail-main">
      <div class="detail-top">
        <img src="../assets/img/64089713_p1.jpg" class="head-image">
        <div class="detail-word">
          <h5 class="name">李明平</h5>
          <ul class="word">
            <li>市重点中学初中数学教研组长</li>
            <li>市重点太多年初三把关老师</li>
            <li>新课标教育中心资深教师</li>
          </ul>
        </div>
      </div>
      <div class="detail-bottom">
        <i class="follow-heart-gray left"></i><span class="follow-number">16</span>
        <i class="article center"></i><span class="article-number">156</span>
        <span class="right">最近更新: 2017/11/22</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "teacher-detail"
  }
</script>

<style scoped>
.detail-main{
  margin-top: 5px;
  width: 100%;
  height: 159px;
  background-color: #fff;
  border-radius: 2px;
}
.detail-main .detail-top{
  padding: 15px;
  height: 100px;
}
.detail-main .detail-top .head-image{
  width: 100px;
  height: 100px;
  margin-right: 15px;
}
.detail-main .detail-top .detail-word{
  display: inline-block;

}
.detail-word .name{
  font-size: 17px;
  font-family: PingFangSC-Regular;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
}
.detail-word .word{
  font-family: PingFangSC-Light;
  font-size: 14px;
  color: #000000;
  line-height: 22px;
}
.detail-main .detail-bottom{
  font-family: PingFangSC-Light;
  color: #aaa;
  font-size: 14px;
  padding-left: 23px;
  padding-right: 15px;
  position: relative;
}
.detail-bottom .left{
  top: 50%;
  margin-top: -6px;
}
.detail-bottom .follow-number{
  margin-left: 18px;
}
.detail-bottom .center{
  top: 50%;
  margin-top: -6px;
  left: 80px;
}
.detail-bottom .article-number{
  margin-left: 35px;
}
.right{
  float: right;
}
</style>
