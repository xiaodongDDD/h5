import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home'
import TeacherCircle from '../views/TeacherCircle/index';
import Favorite from '../views/TeacherCircle/favorite';
import Follow from '../views/TeacherCircle/follow';
import Search from '../views/TeacherCircle/search';
import Article from '../views/TeacherCircle/Details/articleDetail.vue'
import TDetail from '../views/TeacherCircle/Details/teacherDetail.vue'

Vue.use(Router)

export default new Router({
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
          component: TeacherCircle
        }
      ]
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite
    },
    {
      path: '/follow',
      name: 'Follow',
      component: Follow
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/teachers',
      name: 'TDetail',
      component: TDetail
    },
    {
      path: '/articles',
      name: 'Article',
      component: Article
    },
  ]
})
