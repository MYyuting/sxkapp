<template>
		<!--提现-->
		<div class="PutForward">
				<Head :text="til"></Head>
				<div>
						<gongY v-on:checkboxFlag="checkboxFlag" :data="data"></gongY>
						<div class="czfs">为避免资金损失，请确保输入正确的支付宝账号</div>
						<div class="Account">
								<span>账号：</span><input type="text" placeholder="请输入支付宝账号" v-model="zhangh">
						</div>
						<div class="czfs">提现金额（单笔提现限额1.00 - 50,000.00元）</div>
						<div class="fill">
								<div>￥</div>
								<div>
										<input type="number" v-on:input="chengeIpt" onkeyup="this.value=value.replace(/[^0-9-]+/,'')" v-model="price" placeholder="请输入提现金额">
								</div>
						</div>
						<div class="czfs"><span>可用余额 ¥ {{moneyNum}}</span> <span @click="allFor">全部提现</span></div>
						<div class="btn">
								<button :class="[price != '' ? 'colour' : '']"
												:disabled="!price" @click="wardOk">确定</button>
						</div>
				</div>

				<!--输入密码-->
				<mt-popup
						v-model="popupVisible"
						popup-transition="popup-fade"
						position="bottom">
						<div class="pay-tool">
								<div class="pay-tool-title border-bottom">
										<span class="el-icon-back" @click="backHandle"></span>
										<span>请输入交易密码</span>
										<span class="el-icon-close" @click="backHandle"></span>
								</div>
								<div class="pay-tool-content">
										<div class="pay-tool-inputs">
												<div class="item" v-for="i in items">
														<span class="icon_dot" v-if="password[i]"></span>
												</div>
										</div>
										<div class="pay-tool-link">
												<router-link class="link" to="/gzfmm">忘记密码？</router-link>
										</div>
								</div>
								<div class="pay-tool-keyboard">
										<!--键盘-->
										<ul>
												<li @click="keyUpHandle($event)" v-for="val in keys">{{ val }}</li>
												<li class="del" @click="delHandle"><span class="icon-del"><i class="el-icon-close"></i></span></li>
										</ul>
								</div>
						</div>
				</mt-popup>
		</div>
</template>

<script>
		const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0];
	import Head from "@/components/mine/headMe"
	import gongY from "@/components/mine/gong"
	import { Toast,Popup } from 'mint-ui'
	// import Success from "@/components/mine/success"
	export default {
			name: "forward",
			data(){
					return{
							zhangh:'',
							flag:true,
							token:'',
							price:"",
							til:["提现","明细"],
							data:"提现方式（单日限额5万，到账时间T+3）",
							checkbox:false,
							items: [0, 1, 2, 3, 4, 5],
							keys: keys(),
							password: [],
							popupVisible:false,
							moneyNum:'0',   //可用余额
							isOk:null,      //判断交易密码是否有
					}
			},
			mounted(){
					this.token = localStorage.getItem('userName');
					this.getYong();
					this.requestData();
			},
			methods:{
					checkboxFlag(flag1){
							this.checkbox = flag1;
							console.log(this.checkbox);
					},
					chengeIpt(){
						// 	console.log(this.price)
						// 	if(this.price<1){
						// 			Toast({
						// 					message: '请输入大于1的整数',
						// 			});
						// 			this.price = '';
						// 	}
					},
					requestData(){
							this.$axios.post(url+'/api/user/checkUserPayPwd',this.$qs.stringify({
									token:this.token,
							})).then(res => {
									// console.log(res);
									this.isOk = res.data.isOk
							})
					},
					isDot(num) {
							var result = (num.toString()).indexOf(".");
							if(result != -1) {
									return true;
							} else {
									return false;
							}
					},
					//点击提现按钮
					wardOk(){
							if(!this.checkbox){
									Toast({
											message: '请选择提现方式',
											position: 'bottom',
									});
									return;
							}
							if(!this.zhangh){
									Toast({
											message: '请输入账号',
											position: 'bottom',
									});
									return;
							}
							if(parseInt(this.price) > parseInt(this.moneyNum)){
								  Toast({
									  message: '不能大于可提额度',
								  });
								  return;
							}
							if(this.isDot(this.price)){
									Toast({
											message: '请输入整数',
									});
									return;
							}
							if(this.price < 1){
									Toast({
											message: '请输入大于1的整数',
									});
									this.price =''
							}else{
									if(this.isOk){
											this.popupVisible = true;
									}else{
											Toast({
													message: '请设置交易密码',
											});
									}
							}
					},
					// 点击全部提现
					allFor(){
							this.price = parseInt(this.moneyNum)
					},
					//请求可用余额
					getYong(){
							this.$axios.post(url+'/miao/userWithdrawEnter.do',this.$qs.stringify({
									token:this.token,
									languageType:3,
							})).then(res => {
									console.log(res);
									this.moneyNum = res.data.OBJECT.moneyNum
							})
					},
					backHandle () {
							this.clearPasswordHandle();  // 返回时清除password
							// this.$emit('backFnc') // 返回上级
							this.popupVisible = false
					},
					keyUpHandle (e) {
							// console.log(e.currentTarget.innerText);
							let text = e.currentTarget.innerText;
							let len = this.password.length;
							if (!text || len >= 6) return;
							this.password.push(text);

							if(this.password.length == 6){
									var pass = this.password.join('');
									console.log(typeof pass);
									this.$axios.post(url+'/miao/security/userWithdraw.do',this.$qs.stringify({
											token:this.token,
											languageType:3,
											withdrawAddress:this.zhangh,         //提现账号
											userPayPassword:this.$md5(pass),    //支付密码
											withdrawMoney:this.price,     // 提现金额
									})).then((res) => {
											console.log(res.data);
											this.backHandle();
											if(res.data.STATUS == 0){
													Toast({
															message: '提现成功',
													});
											}else{
													Toast({
															message: res.data.MSG,
													});
											}
									})
							}

					},
					//删除密码
					delHandle () {
							if (this.password.length <= 0) return false;
							this.password.pop();
					},
					clearPasswordHandle: function () {
							this.password = []
					},
			},
			components:{
					"Head":Head,
					"gongY":gongY,
					// Success
			}
	}
</script>

<style scoped lang="scss">
		.display{
				display: flex;
				justify-content: space-between;
				align-items: center;
		}
		.PutForward{
				width: 100%;
				background: #F6F6F6;
				box-sizing: border-box;
		}
		.czfs,.zhifubao,.Account,.fill{
				background: #fff;
		}
		@mixin pad($value,$value1) {
				padding: $value;
				height: $value1;
		}
		.czfs{
				@extend .display;
				line-height: .4rem;
				color: #9B9B9B;
				font-size: .10rem;
				@include pad(0 .15rem,.4rem);
				border-bottom: 1px solid #eee;
				span:nth-child(2){
						color: #FF5558;
						padding-left: .1rem;
				}
		}
		.Account{
				@include pad(0 .15rem,.6rem);
				display: flex;
				align-items: center;
				font-size: .14rem;
				border-bottom: 4px solid #f3f3f3;
				span{
						line-height: .32rem;
						font-size: .16rem;
						color: #000;
				}
				input{
						height: .3rem;
						border: none;
						flex-grow: 1;
						outline: none;
						font-size: .16rem;
				}
				input::placeholder{text-align: left;}
		}
		.fill{
				@extend .display;
				height: 1rem;
				font-size: .3rem;
				padding: 0 .15rem;
				>div:nth-child(1){
						width: .47rem;
				}
				>div:nth-child(2){
						flex-grow: 1;
				}
				input{
						width: 100%;
						height: 100%;
						border: none;
						font-size: .2rem;
						outline: none;
				}
				input::placeholder{text-align: left;}
		}
		.btn{
				@include pad(.4rem .15rem 0,.48rem);
				.colour{
						background: #FF5558;
						color: #ffffff;
				}
				button{
						height: 100%;
						width: 100%;
						font-size: .15rem;
						color: #ffffff;
						background: #D6D6D6;
						border: none;
				}
		}
		.mint-popup-bottom{
				width: 100%;
		}
		.pay-tool {
				/*position: relative;*/
				height: 3.8rem;
				background-color: #fff;
				overflow: hidden;
				box-sizing: border-box;
				&-title {
						font-size: .16rem;
						padding: 0 .15rem;
						height: .6rem;
						display: flex;
						justify-content: space-between;
						align-items: center;
				}
				&-content {
						padding: 0 .15rem;
						.pay-tool-inputs {
								width: 100%;
								height: .52rem;
								margin: .1rem auto 0;
								border: 1px solid #b9b9b9;
								box-shadow: 0 0 1px #e6e6e6;
								display: flex;
								.item {
										width: 16.66666666%;
										height: .52rem;
										border-right: 1px solid #b9b9b9;
										line-height: .52rem;
										text-align: center;
										&:last-child {
												border-right: none;
										}
										.icon_dot {
												display: inline-block;
												width: 0.2rem;
												height: 0.16rem;
												background: url("../../assets/img/home/password@2x.png") no-repeat;
												background-size: cover;
										}
								}
						}
						.pay-tool-link {
								height: .35rem;
								padding: .15rem 0 0;
								text-align: right;
								.link {
										color: #FF5558;
								}
						}
				}
				.pay-tool-keyboard {
						/*position: absolute;*/
						/*left: 0;*/
						/*bottom: 0;*/
						width: 100%;
						/*height: 2.35rem;*/
						ul {
								width: 100%;
								display: flex;
								flex-wrap: wrap;
								li {
										width: 33%;
										height: .5rem;
										line-height: .5rem;
										text-align: center;
										border-right: 1px solid #aeaeae;
										border-bottom: 1px solid #aeaeae;
										font-size: 0.2rem;
										font-weight: bold;
										&:nth-child(1), &:nth-child(2), &:nth-child(3) {
												border-top: 1px solid #eee;
										}
										&:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
												border-right: none;
										}
										&:nth-child(10), &:nth-child(11), &:nth-child(12) {
												border-bottom: none;
										}
										&:nth-child(10), &:nth-child(12), &:active {
												background-color: #d1d4dd;
										}
										&:nth-child(12):active {
												background-color: #fff;
										}
								}
						}
				}
		}
</style>

<style lang="scss">
		.PutForward .zhifubao{
				border-bottom: 1px solid #f6f6f6;
		}
</style>