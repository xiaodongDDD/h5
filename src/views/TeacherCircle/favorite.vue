<template>
  <section>
    <commonHeader title="收藏"></commonHeader>
    这个是收藏页面
  </section>
</template>

<script>
  import commonHeader from '../../components/CommonHeader'
  export default {
    name: "favorite",
    components:{
      commonHeader
    },
    data() {
      return{
        title: '收藏'
      }
    }

  }
</script>

<style scoped>

</style>
