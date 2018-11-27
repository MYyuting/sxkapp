<template>
		<!--修改手机号-->
		<div class="XiuGai">
				<my-head :text="til"></my-head>
				<!--修改手机号-->
				<div class="setPhone">
						<ul>
								<li>
										<div>原手机号</div>
										<span>{{yphone}}</span>
								</li>
								<li>
										<div>原手机号验证码</div>
										<div>
												<input type="number" v-model="ycode">
												<button @click="getCode(1)" :class="disabled ? 'activ' : ''" :disabled="disabled">{{btntext}}</button>
										</div>
								</li>
						</ul>
						<ul>
								<li>
										<div>新手机号</div>
										<input type="text" v-model="nPhone" placeholder="请输入你的手机号">
								</li>
								<li>
										<div>新手机号验证码</div>
										<div>
												<input type="number" v-model="ncode">
												<button @click="getCode(2)" :class="disabled2 ? 'activ' : ''" :disabled="disabled2">{{btntext2}}</button>
										</div>
								</li>
						</ul>
						<div class="btn">
								<button :disabled="!nPhone && !ycode && !ncode"
												:class="nPhone && ycode && ncode ? 'click' : ''"
								@click="submitPhone">确认修改</button>
								<p>更换后，新手机号将作为登录账号</p>
						</div>
				</div>
		</div>
</template>

<script>
		const TIME_COUNT = 60;
		import Head from '@/components/mine/headMe'
		import { Toast } from 'mint-ui'
		export default {
				name: "xiugaiphone",
				data(){
						return{
								til:["修改手机号"],
								token:'',
								yphone:'',
								nPhone:'',
								btntext:'获取验证码',
								btntext2:'获取验证码',
								count:'',
								count2:'',
								disabled:false,
								disabled2:false,
								timer:null,
								timer2:null,
								ycode:'',
								ncode:'',
								params:{}
						}
				},
				mounted(){
						this.token = localStorage.getItem('userName');
						this.yphone = localStorage.getItem('phone')
				},
				methods:{
						getChange1(){
								if (!this.timer) {
										this.count = TIME_COUNT;
										this.timer = setInterval(() => {
												if (this.count > 0 && this.count <= TIME_COUNT) {
														this.count--;
														// console.log(this.count);
														this.btntext = this.count+'s';
														this.disabled = true
												} else {
														this.btntext = '获取验证码';
														clearInterval(this.timer);
														this.timer = null;
														this.disabled = false
												}
										}, 1000)
								}
						},
						getChange2(){
								if (!this.timer2) {
										this.count2 = TIME_COUNT;
										this.timer2 = setInterval(() => {
												if (this.count2 > 0 && this.count2 <= TIME_COUNT) {
														this.count2--;
														// console.log(this.count2);
														this.btntext2 = this.count2+'s';
														this.disabled2 = true
												} else {
														this.btntext2 = '获取验证码';
														clearInterval(this.timer2);
														this.timer2 = null;
														this.disabled2 = false
												}
										}, 1000)
								}
						},
						// 获取验证码按钮
						getCode(num){
								if(num == 1){
										 this.params={
												clientPhone:this.yphone
										}
										this.getCodeJson(num);
								}else{
										//判断新手机号格式
										if(this.nPhone.length == 11){
												//验证新手机号是否存在
												this.$axios.post(url+'/api/user/checkMobile',this.$qs.stringify({
														token:this.token,
														mobile:this.nPhone
												})).then((res) => {
														console.log(res.data);
														if(res.data.status==0){
																this.params={
																		clientPhone:this.nPhone
																};
																this.getCodeJson(num);
														}else{
																Toast({
																		message: res.data.message,
																		position: 'middle',
																		duration: 1000
																});
														}
												});
										}else{
												Toast({
														message: '手机号输入有误',
														position: 'middle',
														duration: 1000
												});
										}
								}
						},
						//获取验证码接口
						getCodeJson(n){
								this.$axios({
										method:'get',
										url:url+'/api/user/getCode',
										params:this.params
								}).then((res) => {
										console.log(res.data);
										if(res.data.status == 0){
												Toast({
														message: res.data.message,
														position: 'middle',
														duration: 1000
												});
												if(n == 1){
														this.getChange1();
												}else{
														this.getChange2();
												}
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
						//提交修改
						submitPhone(){
								this.$axios.post(url+'/api/user/editMobile',this.$qs.stringify({
										token:this.token,
										originalMobile:this.yphone,  //原手机
										changeMobile:this.nPhone,    //新手机
										originalValidateCode:this.ycode,
										changeValidateCode:this.ncode
								})).then((res) => {
										console.log(res);
										switch(res.data.status)
										{
												case 201:
														Toast({
																message: res.data.message,
																position: 'middle',
																duration: 1000
														});
														break;
												case 0:
														Toast({
																message: '修改成功',
																position: 'middle',
																duration: 1000
														});
														this.$router.push('/mine')
														break;
												default:
														Toast({
																message: res.data.message,
																position: 'middle',
																duration: 1000
														});
										}
								}).catch((err) => {
										console.log(err);
										Toast({
												message: '网络异常',
												position: 'middle',
												duration: 1000
										});
								})
						},
				},
				components:{
						"my-head":Head
				}
		}
</script>

<style scoped lang="scss">
		$color:#FF5558;
		.XiuGai{
				background: #f6f6f6;
				height: 100%;
		}
		.setPhone{
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
								width: 50%;
								text-align: right;
						}
				}
				input{
						outline: none;
						width: 40%;
						border: none;
						text-align: right;
						font-size: .145rem;
				}
				input::placeholder{
						text-align: right;
				}
				li button{
						width: .87rem;
						height: .3rem;
						border: 1px solid $color;
						background: #fff;
						color: $color;
						font-size: .12rem;
						border-radius: 4px;
				}
				li button.activ{
						border: 1px solid #aaa;
						color: #aaa;
				}
				.btn{
						padding: 0 .15rem;
						text-align: center;
						button{
								width: 100%;
								margin-top: .5rem;
								height: .48rem;
								font-size: .145rem;
								background: #D6D6D6;
								color: #ffffff;
								border: none;
								border-radius: 4px;
						}
						button.click{
								background: $color;
								color: #ffffff;
						}
						p{
								line-height: 3;
								font-size: .12rem;
								color: $color;
						}
				}
		}

</style>