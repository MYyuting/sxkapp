<template>
		<!--修改登录密码-->
		<div class="password">
				<my-head :text="til"></my-head>
				<ul>
						<li>
								<div>手机号</div>
								<!--<span>{{phone}}</span>-->
								<input type="number" placeholder="请输入手机号" v-model="phone" style="text-align: center">
						</li>
						<li>
								<div>验证码</div>
								<div class="yzm1">
										<input type="number" v-model="yzmCode" v-on:input ="inputFunc">
										<button :class="disabled ? 'getcode' : ''"
														:disabled="disabled" @click="getyzm">{{btnyzm}}</button>
								</div>
						</li>
				</ul>
				<div class="Hint">登陆密码由<span>8～16位</span>的<span>数字</span>和<span>字母</span>组成</div>
				<ul>
						<li>
								<div>设置新密码</div>
								<input type="password" placeholder="请设置登录密码" v-model="paswd1" v-on:input ="inputFunc">
						</li>
						<li>
								<div>确认新密码</div>
								<input type="password" placeholder="再次输入以确认" v-model="paswd2" v-on:input ="inputFunc">
						</li>
				</ul>
				<div class="btn">
						<button :class="disabled1 ? 'active1' : '' " @click="mimaOK" :disabled="!disabled1">确认修改</button>
						<p>修改后将退出登陆，请使用新密码重新登陆</p>
				</div>
		</div>
</template>

<script>
		const TIME_COUNT = 60;
		import Head from '@/components/mine/headMe'
		import { Toast } from 'mint-ui';
		export default {
				name: "XGloginMM",
				data(){
						return{
								yzmCode:'',
								btnyzm:'获取验证码',
								phone:'',
								til:["修改登录密码"],
								paswd1:'',
								paswd2:'',
								disabled:false,
								disabled1:false,
								timer:null,
								count:'',
								token:'',
						}
				},
				mounted(){
						this.phone = localStorage.getItem('phone')
						this.token = localStorage.getItem('userName')
				},
				methods:{
						getChange(){
								if (!this.timer) {
										this.count = TIME_COUNT;
										this.timer = setInterval(() => {
												if (this.count > 0 && this.count <= TIME_COUNT) {
														this.count--;
														// console.log(this.count);
														this.btnyzm = this.count+'s'
														this.disabled = true
												} else {
														this.btnyzm = '获取验证码';
														clearInterval(this.timer);
														this.timer = null;
														this.disabled = false
												}
										}, 1000)
								}
						},
						//获取验证码
						getyzm(){
								var reg=11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
								if(this.phone == ''){
										Toast({
												message: '请输入手机号码',
												position: 'middle',
												duration: 1000
										});
										return;
								}else if(!reg.test(this.phone)){
										Toast({
												message: '手机格式不正确',
												position: 'middle',
												duration: 1000
										});
										return;
								}
								this.$axios({
										method:'get',
										url:url+'/api/user/getCode',
										params:{
												clientPhone:this.phone
										}
								}).then((res) => {
										console.log(res.data);
										if(res.data.status == 0){
												this.getChange();
												Toast({
														message: res.data.message,
														position: 'middle',
														duration: 1000
												});
										}else{
												Toast({
														message: res.data.message,
														position: 'middle',
														duration: 1000
												});
										}
								}).catch((err) => {
										console.log(err);
										alert('网络错误')
								})
						},
						//输入
						inputFunc(){
								if(this.paswd1 != '' && this.paswd2 != '' && this.yzmCode != ''){
										this.disabled1 = true
								}
						},
						//确认修改
						mimaOK(){
								console.log(localStorage.getItem('uesrName'));
								let _this = this;
								if(this.yzmCode != ''){
										if(this.paswd1  == this.paswd2){
												let patrn=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
												if(patrn.test(this.paswd1)){
														this.$axios.post(url+'/api/user/changePwd',this.$qs.stringify({
																mobile:_this.phone,
																newPwd:_this.$md5(_this.paswd1),
																validateCode:_this.yzmCode,
																token:_this.token
														}),{
																headers:{'Content-Type':'application/x-www-form-urlencoded'}
														}).then((res) => {
																console.log(res.data);
																switch (res.data.status) {
																		case '0':
																				Toast({
																						message: '修改密码成功',
																						position: 'middle',
																						duration: 1000
																				});
																				_this.$router.push('/signin');
																				localStorage.removeItem('userName')
																				break;
																		case '103':
																				Toast({
																						message: res.data.message,
																						position: 'middle',
																						duration: 1000
																				});
																				break;
																		case '201':
																				Toast({
																						message: res.data.message,
																						position: 'middle',
																						duration: 1000
																				});
																				break;
																		case '105':
																				Toast({
																						message: res.data.message,
																						position: 'middle',
																						duration: 1000
																				});
																				break;
																}
														})
												}else{
														Toast({
																message: '密码格式有误',
																position: 'middle',
																duration: 1000
														});
												}
										}else{
												Toast({
														message: '两次密码不一致',
														position: 'middle',
														duration: 1000
												});
										}
								}else{
										Toast({
												message: '验证码不能为空',
												position: 'middle',
												duration: 2000
										});
								}

						},
				},
				components:{
						"my-head":Head
				}
		}
</script>

<style scoped lang="scss">
		$color:#FF5558;
		.password{
				background: #f6f6f6;
				height: 100%;
		}
		ul{
				border-bottom: 4px solid #f6f6f6;
		}
		ul li{
				background: #fff;
				display:flex ;
				justify-content: space-between;
				align-items: center;
				height: .6rem;
				padding: 0 .15rem;
				border-bottom: 1px solid #eee;
				div:nth-child(2){
						width: 60%;
						text-align: right;
						display: flex;
						input{
								font-size: .14rem;
								flex-grow: 1;
								width: 50%;
								padding-right: 6px;
						}
				}
				input{
						outline: none;
						border: none;
						text-align: right;
						font-size: .14rem;
				}
				>input{
						width: 40%;
				}
				button{
						width: .87rem;
						height: .3rem;
						border: 1px solid $color;
						background: #fff;
						color: $color;
						font-size: .12rem;
						border-radius: 4px;
				}
				.getcode{
						border: 1px solid #aaa;
						color: #aaa;
				}
		}
		.Hint{
				font-size: .12rem;
				line-height: .5rem;
				padding: 0 .15rem;
				span{
						color: $color;
				}
		}
		.btn{
				padding: 0 .15rem;
				text-align: center;
				button{
						width: 100%;
						margin-top: .5rem;
						height: .48rem;
						background: #D6D6D6;
						font-size: .15rem;
						color: #ffffff;
						border: none;
						border-radius: 4px;
						&.active1{
								background: $color;
						}
				}
				p{
						line-height: 3;
						font-size: .12rem;
						color: $color;
				}
		}
</style>