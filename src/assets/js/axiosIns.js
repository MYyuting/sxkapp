import axios from 'axios'
import qs from 'qs'
import util from './util'
import {Toast} from 'vue-ydui/dist/lib.rem/dialog'

let axiosIns = axios.create({});

axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.responseType = 'json';
// axiosIns.defaults.transformRequest = [function (data) {
//     //数据序列化
// 	//if(Object)
// 	console.log(data);
//     //return qs.stringify(data);
// 	return JSON.parse(data)
// }
// ];
axiosIns.interceptors.request.use(function (config) {
    //配置config
    config.headers.Accept = '*/*'
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    //config.headers.System = 'vue';
	//登录设置token
	let token = util.getCookie('access_token') || ''
	if(token){
        config.headers['access_token'] = token
	}else{
		// if(! location.hash.indexOf('#/login')){
		// 	location.href = '/#/login'
		// }else{
		// 	location.href = '/#/login'
		// }
	}
    return config;
});
axiosIns.interceptors.response.use(function (response) {
    let data = response.data;
    let status = response.status;
    if (status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
});

export default axiosIns;
