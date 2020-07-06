import Vue from 'vue';
import App from './App.vue';


//内置组件
import router from './router';
import store from './store';


// 外置组件
import './plugins/element.js';
import axios from 'axios';
import qs from 'qs'
// 使用外置组件
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
axios.defaults.baseURL = 'http://localhost:9999/';


// css文件
import './static/css/reset.css';
import './static/css/common.css';

// 封装的组件
import code from './components/common/code/index.js'
// 使用封装的组件
Vue.prototype.code = code;
if(window.sessionStorage.getItem('token')){
	Vue.prototype.token = window.sessionStorage.getItem('token')
	getMoney()
}
Vue.prototype.getMoney = getMoney
async function getMoney (){
	const res = await axios.get(`setMoney/?user=${window.sessionStorage.getItem('token')}`)
	window.sessionStorage.setItem('money',res.data.data[0].money)
}




Vue.filter('type',function(type){
	const typeList = ['美味零食', '日常用品', '电子数码', '服装美妆', '其他商品'];
	return typeList[type - 1];
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
