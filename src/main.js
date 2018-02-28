// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import { Navbar, TabItem } from 'mint-ui';
// import Vue from 'vue'
import MetaInfo from 'vue-meta-info'
import axios from 'axios'

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.use(MintUI);
Vue.use(MetaInfo);


Vue.config.productionTip = false;
Vue.prototype.$http = axios;

/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
