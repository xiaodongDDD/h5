<template>
  <div>
    <div class="detail-main">
      <div class="detail-top">
        <img src="../assets/img/64089713_p1.jpg" class="head-image">
        <div class="detail-word">
          <h5 class="name">李明平</h5>
          <ul>
            <li>市重点中学初中数学教研组长</li>
            <li>市重点太多年初三把关老师</li>
            <li>新课标教育中心资深教师</li>
          </ul>
        </div>
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
