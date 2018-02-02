import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home'
import TeacherCircle from '../views/TeacherCircle/index';
import Favorite from '../views/TeacherCircle/favorite';
import Follow from '../views/TeacherCircle/follow';
import Search from '../views/TeacherCircle/search';

import TDetail from '../views/TeacherCircle/Details/teacherDetail.vue'
// >>>>>>> 78ed86580a218cddac3f845c69846a2ca61fd991

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
<<<<<<< HEAD
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
=======
      path: '/teachers',
      name: 'TDetail',
      component: TDetail
    },
>>>>>>> 78ed86580a218cddac3f845c69846a2ca61fd991
  ]
})
