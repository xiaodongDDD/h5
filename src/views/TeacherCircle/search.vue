<template>
  <section>
    <commonHeader title="搜索"></commonHeader>
    <div class="main">
      <div class="search-head">
        <input type="text" class="content"><i class="search left"></i>
      </div>
    </div>
  </section>
</template>

<script>
  import commonHeader from '../../components/CommonHeader'
  export default {
    name: "search",
    components:{
      commonHeader
    }
  }
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  background-color: rgb(247,247,247);
}
.main .search-head{
  width: 100%;
  height: 44px;
  background-color: #fff;
  position: relative;
}
.main .content{
  width: 275px;
  height: 30px;
  border-radius: 2px;
  background-color: #f8f8f8;
  position: absolute;
  left: 20px;
  top:50%;
  margin-top: -15px;
}
.left{
  left: 20px;
  z-index: 10;
  top: 50%;
  margin-top: -15px;
}





</style>
