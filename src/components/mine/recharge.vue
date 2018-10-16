<template>
		<!--充值-->
		<div class="recharge">
				<Head :text="til"></Head>
				<div v-show="flag">
						<gongY v-on:checkboxFlag="checkboxFlag" :data="data" ></gongY>
						<div>
								<div class="czfs">充值金额（至少充值1.00元）</div>
								<div class="fill">
										<div>￥</div>
										<div>
												<input type="number" v-on:input="change" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="price" placeholder="请输入充值金额">
										</div>
								</div>
								<ul class="Tablist">
										<li @click="listClick" v-for="(item,index) in dataPrice" :class="{'colour':listIndex === index}" :data-index="index">{{item}}</li>
								</ul>
								<div class="btn">
										<button :class="[price != '' ? 'colour' : '']"
														:disabled="!price" @click="rechargeClick">确定</button>
								</div>
						</div>
				</div>
				<!--<div v-show="!flag" >-->
						<!--<Success @refreshList="czSuccess" :content="arr"></Success>-->
				<!--</div>-->
		</div>
</template>

<script>
  import Head from "@/components/mine/headMe"
  import gongY from "@/components/mine/gong"
  // import Success from "@/components/mine/success"
	import { Toast } from 'mint-ui';
	export default {
			name: "recharge",
			data(){
					return{
							checkbox:false,
							flag:true,
							til:["充值","明细"],
							data:"充值方式",
			        listIndex:"",
							token:'',
							price:"",
							dataPrice:[
									"1000元",
								  "3000元",
								  "4000元",
								  "10000元",
								  "30000元",
								  "50000元",
							]
					}
			},
			mounted(){
					this.token = localStorage.getItem('userName');

			},
			methods:{
					checkboxFlag(flag1){
							this.checkbox = flag1;
							console.log(this.checkbox);
					},
					change() {
							console.log(this.price)
					},
					//	充值btn按钮
					rechargeClick(){
							if(this.checkbox){
									if(this.price >= 1){
											this.$axios.post(url+'/miao/security/AliRecharge.do',this.$qs.stringify({
													rechargeMoney:this.price,
													token:this.token,
											})).then((res) => {
													console.log(res);
													if(res.status == 200){
															window.location.href = url+'/miao/security/AliRecharge.do?rechargeMoney='+this.price+'&token='+this.token;
													}else if(res.STATUS == 3){
															Toast({
																	message: '请登录',
															});
													}
													// this.flag = false;
											})

									}else{
											Toast({
													message: '充值金额必须大于1',
											});
									}
							}else{
									Toast({
											message: '请选择充值方式',
											position: 'bottom',
											duration: 1000
									});
							}
					},
				//	充值成功
				// 	czSuccess(){
				// 			this.flag = true
				// 	},
				//	点击选择价格
					listClick(e){
						// 	console.log(e.target.nodeName.toLowerCase())
			        let index = parseInt(e.target.dataset.index);
			        this.listIndex =index;
							var str =this.dataPrice[index];
							this.price = str.substring(0,str.length-1);
							// this.arr.price =str.substring(0,str.length-1);
					}
			},
			components:{
				  "Head":Head,
				  "gongY":gongY,
					// Success
			}

	}
</script>

<style scoped lang="scss">

		.colour{
				background: #FF5558;
				color: #ffffff;
		}
		.display{
				display: flex;
				justify-content: space-between;
				align-items: center;
		}
		@mixin pad($value,$value1) {
				padding: $value;
				height: $value1;
		}
		.recharge{
				width: 100%;
				box-sizing: border-box;
				background:#F6F6F6 ;
		}
		.czfs,.zhifubao,.fill,.Tablist{
				background: #fff;
		}
		.czfs{
				line-height: .4rem;
				color: #9B9B9B;
				font-size: .12rem;
				@include pad(0 .15rem,.4rem);
				border: 1px solid #eee;
		}
		.fill{
				@extend .display;
				height: 1rem;
				font-size: .3rem;
				>div:nth-child(1){
						width: 15%;
						text-align: center;
				}
				>div:nth-child(2){
						flex-grow: 1;
				}
				input{
						width: 100%;
						height: 1rem;
						border: none;
						font-size: .2rem;
						outline: none;
				}
		}
		.Tablist{
				@extend .display;
				flex-wrap: wrap;
				color:#999;
				@include pad(0 .15rem,1.32rem);
				li{
						width: 25%;
						height: .36rem;
						line-height: .36rem;
						text-align: center ;
						border-radius: 4px;
						border: 1px solid #999;
				}
				@extend .colour;
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
						color: #ffffff;
						background: #D6D6D6;
						border: none;
				}
		}

</style>