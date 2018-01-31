<template>
  <section>
    <commonHeader title="选择要查看记录的来源"></commonHeader>
    <div>
      <ul>
        <li>
          <input type="radio" id="check"><label for="check"></label>
          <span>全部</span>
        </li>
        <li>仅看自己</li>
        <li>仅看教师</li>
      </ul>
    </div>
  </section>
</template>

<script>
  import commonHeader from '../../components/CommonHeader'
  export default {
    name: "origin",
    components:{
      commonHeader
    }
  }
</script>

<style scoped>
  input[type="radio"]{
    position: absolute;
    clip: rect(0, 0, 0, 0);
    left: 20px;
  }
  input[type="radio"] + label::before {
    content: "\a0"; /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    left: 20px;
    top: 50%;
    margin-top: -6px;
    z-index: 10;
  }

  input[type="radio"]:checked + label::before {
    background-color: #F8E71C;
    background-clip: content-box;
  }

</style>
