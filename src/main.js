// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
// import Vuex from 'vuex';
import router from './router'
import qs from 'qs'
import md5 from 'js-md5'
import axios from 'axios'
import Es6Promise from 'es6-promise'
// require('es6-promise').polyfill();
Es6Promise.polyfill();
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueClipboard from 'vue-clipboard2'
// 引入echarts
import echarts from 'echarts'
//mint-ui
import MintUI from 'mint-ui'
import Mui from 'vue-awesome-mui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
Vue.use(VueClipboard);
Vue.use(Mui);
Vue.use(VueAwesomeSwiper);
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$md5 = md5;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	axios,
	router,
	components: { App },
	template: '<App/>'
});



// 全局路由守卫
router.beforeEach((to, from, next) => {

	// to: Route: 即将要进入的目标 路由对象
	// from: Route: 当前导航正要离开的路由
	// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    // console.log(to);
	const nextRoute = [ '','dynamic','upnew','mingxi','forward','recharge','geren','xiaofei','feedback','invitation'];
	let isLogin = localStorage.getItem('userName');

	// // 未登录状态；当路由到nextRoute指定页时，跳转至login
	if (nextRoute.indexOf(to.name) >= 0) {
		if (!isLogin) {
			next({
				path: '/signin',
				query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}else{
			next();
		}
	}
	// 已登录状态；当路由到login时，跳转至home
	if (to.name === 'signin') {
		if (isLogin) {
			router.push({ name: 'mine' });
		}
	}
	next();
});
export default router;


