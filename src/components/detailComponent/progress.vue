<template>
  <div class="v-progresss">
    <span class="v-word">{{currentTime}}</span>
    <progress :max="maxTime" :value="currentTime" class="processbar"></progress>
    <span class="v-word">{{maxTime}}</span>
  </div>
</template>

<script>
  export default {
    name: "progress",
    data(){
      return{
        maxTime:0,//总时间
        currentTime: 0,//当前时间
      }
    },
  }
</script>

<style scoped>

</style>
