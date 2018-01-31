<template>
  <section class="chooseClass">
    <commonHeader title="选择要查看记录的班级"></commonHeader>
    <div class="choosed">
      <ul>
        <li>
          <input type="radio" id="check"><label for="check"></label>
          <img src="../../assets/img/all.png"class="choose-img">
          <span>全部班级</span>
        </li>
      </ul>
    </div>
    <div class="myClass">
      <span class="create-title">我创建的班级</span>
      <ul class="class-list" v-if="classList.length">
        <li v-for=" i in classList" :key="i.id">
          <input type="radio" id="i.id"><label for="i.id"></label>
          <img src="i.img"class="choose-img">
          <span style="marginLeft: 102px;">{{i.className}}</span>
        </li>
      </ul>
      <div class="more" @click="getMore()">
        <span>显示全部4个班级</span>
      </div>
    </div>
  </section>
</template>

<script>
  import commonHeader from '../../components/CommonHeader'
  export default {
    name: "class",
    components:{
      commonHeader
    },
    data(){
      return{
        classList:[
          {img:'../../assets/img/class1.png',className:'what??!',id:1},
          {img:'../../assets/img/class1.png',className:'what??!',id:2},
          {img:'../../assets/img/class1.png',className:'what??!',id:3},
          {img:'../../assets/img/class1.png',className:'what??!',id:3}
        ]
      }
    },
    methods:{
      getMore(){
        console.log('lalallala');
      }
    }
  }
</script>

<style scoped>
.chooseClass{
  width: 100%;
  height: 100%;
  background-color: #2b2b2b;
}
.chooseClass .choosed{
  width: 100%;
  height: 70px;
  background-color: #363636;
  color: #fff;
  font-size: 17px;
  line-height: 70px;
}
.chooseClass .choosed ul{
  width: 100%;
  height: 100%;
  position: relative;
}
.chooseClass .choosed ul li{
  width: 100%;
  height: 100%;
}
.chooseClass .choosed ul li span{
  position: absolute;
  left: 102px;
}
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
.chooseClass .choose-img{
  position: absolute;
  left: 42px;
  top: 50%;
  margin-top: -25px;
  width: 50px;
  height: 50px;
  vertical-align: center;
  border-radius: 2px;
}
input[type="radio"]:checked + label::before {
  background-color: #F8E71C;
  background-clip: content-box;
}
.chooseClass .myClass{
  background-color: #2b2b2b;
  width: 100%;
}
.chooseClass .myClass .create-title{
  display: block;
  margin: 20px 0 10px 10px;
  font-size: 14px;
  color: #aaa;
  width: 100%;
}
.class-list{
  width: 100%;
  padding: 0 20px;
  background-color: #363636;
}
.class-list li{
  height: 70px;
  line-height: 70px;
  border-bottom: #2a2a2a 1px solid;
  width: 100%;
  font-size: 17px;
  color: #fff;
  position: relative;
}
.myClass .more{
  color: #aaa;
  font-size: 14px;
  text-align: center;
  height: 48px;
  line-height: 48px;
}



</style>
