import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home'
import TeacherCircle from '../views/TeacherCircle/index';
import GrowthRecord from '../views/GrowthRecord/index';
import Favorite from '../views/TeacherCircle/favorite';
import Follow from '../views/TeacherCircle/follow';
import Search from '../views/TeacherCircle/search';
import Class from '../views/GrowthRecord/class'
import Origin from '../views/GrowthRecord/origin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/growthRecord',
      children: [
        {
          path: '/growthRecord',
          name: 'GrowthRecord',
          component: GrowthRecord,
        },
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
      path: '/class',
      name: 'Class',
      component: Class
    },
    {
      path: '/origin',
      name: 'Origin',
      component: Origin
    }
  ]
})
