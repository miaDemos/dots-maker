/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-07-23 11:38:27
 * @LastEditors: 王敏
 * @LastEditTime: 2021-07-29 19:33:32
 */
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/init.less'

import App from './App.vue';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
