<template>
  <section>
    <div class="main">
      <div class="search-head">
        <input type="text" class="content" placeholder="请输入教师名称或文章关键字" v-model="searchContent"><i class="search left"></i>
        <button class="btn" @click="search()" ref="btn">搜索</button>
      </div>
      <div class="search-body">
        <!--默认页面-->
        <p class="search-first" v-show="origin">您可以搜索文章标题、内容、作者的关键字</p>

        <!--没有内容-->
        <div class="search-null" v-show="!origin&!results">
          <img src="../../assets/img/ic_blank_search.png" style="width:168px;height:123px;">
          <div>
            <p>没有符合关键字的搜索结果</p>
            <p>请更换输入其他关键字后重试</p>
          </div>
        </div>

        <!--有内容-->
        <div class="search-some" v-show="!origin&results">
          <h5 class="some-title">搜索结果</h5>
          <TeacherList></TeacherList>
          <TeacherDetail></TeacherDetail>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import TeacherList from '../../components/TeacherList'
  import TeacherDetail from '../../components/TeacherDetail'
  import { API } from '../../service/api';
  export default {
    name: "search",
    components:{
      TeacherList,
      TeacherDetail
    },
    data(){
      return{
        searchContent:'',
        searchList:[],
        origin: true,
        results: false
      }
    },
    watch:{
      searchContent:function (searchContent) {
        const btn = this.$refs.btn;
        if(searchContent!==''){
          btn.style= 'background-color:#f8e71c;color:#000';
        }else{
          btn.style= 'background-color:#ddd;color:#aaa';
        }
      }
    },
    methods:{
      search(){
        console.log('2333');
        const search = 'quan.searchClick';
        const baseUrl = 'http://quan-dev.xiaoheiban.cn/api/?method=';
        const keyword = this.searchContent;
        console.log(keyword);
        API.get(`${baseUrl}${search}&keyword=${keyword}&page=1&token=59a4e43d0179b04b5056178b`).then((res)=>{
          console.log(res);
          console.log(res.response.article_list.length);
          this.origin = false;
          if(res.response.article_list.length<=0){
            this.results = false;
          }else{
            this.results = true;
          }
        },(err)=>{
          console.log(err);
        })
      }
    },
    created() {
    },
    mounted() {
    },
    metaInfo: {
      title: "搜索",
      meta: [{
        name: 'xiaoheiban_disable_share',
        content: 'true'
      }]
    }


  }
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  background-color: rgb(247,247,247);
  font-family: PingFangSC-Light;
}
.main .search-head{
  width: 100%;
  height: 44px;
  background-color: #fff;
  position: relative;
}
input::placeholder{
  font-size: 14px;
  color: #aaa;
  font-family: PingFangSC-Light;
}
.main .content{
  width: 242px;
  height: 30px;
  border-radius: 2px;
  background-color: #f8f8f8;
  position: absolute;
  left: 20px;
  top:50%;
  margin-top: -15px;
  padding-left: 33px;
  font-size: 14px;
}
.left{
  left: 26px;
  z-index: 10;
  top: 50%;
  margin-top: -10px;
}
.btn{
  width: 60px;
  height: 30px;
  border-radius: 2px;
  background-color: #ddd;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #AAAAAA;
  line-height: 30px;
  position: absolute;
  right: 15px;
  top: 50%;
  margin-top: -15px;
}

.search-body{
  /*text-align: center;*/
}
.search-first{
  color: #aaa;
  font-size: 14px;
  padding-top: 30px;
  text-align: center;
}
.search-null{
  margin-top: 50px;
  text-align: center;
}
.search-null div{
  padding-top: 25px;
}
.search-null p{
  display: block;
  font-family: PingFangSC-Light;
  font-size: 17px;
  line-height: 21px;
  color: #aaa;
}
.search-some .some-title{
  height: 14px;
  padding-top: 10px;
  padding-left: 15px;
  font-size: 14px;
  width: 100%;
  color: #aaa;
  background-color: #f8f8f8;

}



</style>
