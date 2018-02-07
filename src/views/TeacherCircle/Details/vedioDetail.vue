<template>
  <section>
    <div class="video-content">
      <video controls="controls" ref="video" height="190" width="100%">
        <source src="../../../assets/img/test.mp4" type="video/mp4"/>
      </video>
      <experienceOver :tips="timeOver"></experienceOver>
    </div>
  </section>
</template>

<script>
  import experienceOver from '../../../components/detailComponent/experienceTimeOver.vue'
  export default {
    name: "video-detail",
    components: { experienceOver },
    data:() => ({
        currentTime: '',
        timeOver: '试看时间结束',
  }),
    methods: {

    },
    mounted() {
      let video = document.getElementsByTagName('video')[0]
      video.oncanplay = () => {
        let videoTotalTime = video.duration
        video.addEventListener('timeupdate', () => {
          if(video.currentTime > videoTotalTime/3) {
            video.currentTime = 0
            video.pause()
          }
        })
      }
    }


  }
</script>

<style scoped>
  .video-content video {
  }

</style>
