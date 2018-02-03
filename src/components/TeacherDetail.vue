<template>
  <div>
    <div class="detail-main">
      <div class="detail-top">
        <img src="../assets/img/64089713_p1.jpg" class="head-image">
        <div class="detail-word">
          <h5 class="name">李明平</h5>
        </div>
      </div>
      <div class="detail-bottom">

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
</style>
