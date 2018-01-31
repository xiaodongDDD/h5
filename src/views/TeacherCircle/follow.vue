<template>
  <section>
    <commonHeader title="关注"></commonHeader>
    <ul class="follow-list">
      <li v-for="tm in teacherMessages" class="follow">
        <mt-cell-swipe
                :right="[{
         content: '取消关注',
         style: { background: 'red', color: '#fff' },
         handler: cancel
       }]">
          <div class="follower">
            <div class="basic-message">
              <img :src="tm.header"  class="follow-teacher"/>
              <div class="teacher-message">
                <h2>{{tm.name}}</h2>
                <ul>
                  <li v-for="d in tm.detail">{{d}}</li>
                </ul>
              </div>
            </div>
            <div class="txt-content">
              <img src="../../assets/img/ic_txt@2x.png"/>
              <span>{{tm.txtTitle}}</span>
            </div>
            <div>
              <label><img src="../../assets/img/list_follow@2x.png"/>{{tm.favorite}}</label>
              <label><img src="../../assets/img/list_txt@2x.png"/>{{tm.comment}}</label>
              <span>最近更新: {{tm.lastUpdate}}</span>
            </div>
          </div>
        </mt-cell-swipe>
      </li>
    </ul>
  </section>
</template>

<script>
  import commonHeader from '../../components/CommonHeader'
  import header from '../../assets/logo.png'
  import { API } from '../../service/api'
  import MtSwipeItem from '../../../node_modules/mint-ui/packages/swipe/src/swipe-item'
  import MtCellSwipe from '../../../node_modules/mint-ui/packages/cell-swipe/src/cell-swipe'
  export default {
    name: "follow",
    data() {
      return {
        teacherMessages :[
          { header: header, name: '王好美',
            detail: ['市重点中学初中数学教研组长',
              '市重点多年初三把关老师',
              '新课标教育中心资深教师'],
            txtTitle: '开掀起开年音乐大秀',
            favorite: 10,
            comment: 123,
            lastUpdate: '0822'
          },
        ]
      }
    },
    components:{
      MtCellSwipe,
      MtSwipeItem,
      commonHeader
    },
    methods :{
      cancel() {

      }
    },
    mounted() {
      let token =  '59a4e43d0179b04b5056178b'
      API.get(`http://quan-test.xiaoheiban.cn/api/Quan/followClick?token=${token}`).then(res => {
        this.teacherMessages = res.teacher_list
      })
    }
  }
</script>

<style>
  .mint-cell-right {
    background-color: red;
  }
  .mint-cell-value {
    width: 100%;
    padding: 1vh 2vw;
  }
  .follower {
    width: 100%;
    color: #000;
  }
  .basic-message {
    display: flex;
    justify-content: space-between;
  }
  .basic-message img{
    width: 26.8vw;
    height: 26.8vw;
    border: 1px solid #ccc;
  }
  .basic-message h2 {
    font-size: 17px;
    margin-bottom: 1.3vh;
    font-family: PingFangSC-Regular;
  }
  .basic-message ul {
    font-size: 14px;
  }
  .basic-message ul li {
    margin-bottom: 1vh;
    font-family: PingFangSC-Light;
  }
  .teacher-message {
    padding-top: 2vh;
    width: 65%;
  }
  .txt-content {
    margin-top: 1vh;
    background-color: #f7f7f7;
    padding: 0.5vh 3vw;
  }
  .txt-content img{
    width: 2.7vw;
    height: 2.2vh;
  }
  .txt-content span {
    font-size: 14px;
  }

</style>
