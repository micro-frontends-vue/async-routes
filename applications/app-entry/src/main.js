import Vue from 'vue';
import VueProgressBar from 'vue-progressbar'
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueProgressBar)

// 挂载主项目的 store 和 router 实例
Reflect.defineProperty(Vue, '__share_pool__', {
  value: {
    store,
    router,
  },
});

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount('#app');
