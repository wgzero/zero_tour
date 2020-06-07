import Vue from 'vue';
import router from './router';
import store from './store';
// import './static/css/common.css'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
import App from './App.vue'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');