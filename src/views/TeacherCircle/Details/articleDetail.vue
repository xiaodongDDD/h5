<script>
  export default {
    components: {},
    data: () => ({}),
    methods: {},
    created() {
      document.title = '文章详情'
      const shareFlag = ""||null;
      JSAction.getWebShareElement(shareFlag)
    }
  }
</script>

<template>
  <div>

  </div>
</template>

<style >

</style>
