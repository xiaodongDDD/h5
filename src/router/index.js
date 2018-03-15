import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home'
import TeacherCircle from '../views/TeacherCircle/index';
import Favorite from '../views/TeacherCircle/favorite';
import Follow from '../views/TeacherCircle/follow';
import Search from '../views/TeacherCircle/search';
import Article from '../views/TeacherCircle/Details/articleDetail.vue';
import TDetail from '../views/TeacherCircle/Details/teacherDetail.vue';
import Blank from '../views/blank';
import VDetail from '../views/TeacherCircle/Details/videoDetail';
import Audio from '../views/TeacherCircle/Details/audioDetail';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/teacherCircle',
      children: [
        {
          path: '/teacherCircle',
          name: 'TeacherCircle',
          component: TeacherCircle,
          meta: {
            title:"教师圈"
          }
        }
      ]
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite,
      meta: {
//      title:"收藏"
      }
    },
    {
      path: '/follow',
      name: 'Follow',
      component: Follow,
      meta: {
//      title:"关注"
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
//      title:"搜索"
      }
    },
    {
      path: '/teachers',
      name: 'TDetail',
      component: TDetail,
      meta: {
//      title:"教师详情"
      }
    },
    {
      path: '/article',
      name: 'Article',
      component: Article,
      meta: {
//      title: "文章详情"
      }
    },
    {
      path: '/video',
      name: 'VDetail',
      component: VDetail,
      meta: {
//      title: "视频详情"
      }
    },
    {
      path: '/audio',
      name: 'Audio',
      component: Audio,
      meta: {
//      title: "音频详情"
      }
    },
    {
      path: '/blank',
      name: 'Blank',
      component: Blank,
    },
  ]
})
