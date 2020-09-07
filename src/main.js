import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard2'
import messageBox from "./utils/messageBox";
import globalData from "./config/common";
import VueAnime from './utils/anime';
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://39.107.229.211:9800/ws',
}))

Vue.config.productionTip = false;
Vue.prototype.globalData = globalData.development;
Vue.use(ElementUI);
Vue.use(messageBox);
Vue.use(VueClipboard);
Vue.use(VueAnime);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
