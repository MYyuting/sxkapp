<template>
		<!--卖出-->
		<div>
				<div class="mescroll dynamic_temp" id="mescroll">
						<div class="temp_content_top">
								<div class="temp_content_left">
										<div class="div-ipt">
												<input type="text" placeholder="发行人姓名或代码" v-model="input1" v-on:input="change">
												<div class="sousuo" id="ss" v-show="flag">
														<p v-for="(item,index) in arrList" @click="clickLIST(index)">
																<span>{{item.investorsName}}</span>
																<span>{{item.investorsCode}}</span>
														</p>
												</div>
										</div>
										<div class="div-ipt">
												<span class="jian iconfont icon-price_down" @click="jian"></span>
												<input id="price" type="number" step="0.01" v-model="input2" placeholder="价格">
												<span class="ding ding1">￥</span>
												<span class="jia iconfont icon-price_up" @click="jia"></span>
										</div>
										<div class="div-btn">
												<span class="iconfont icon-btn_high" @click="zhang"></span>
												<span class="iconfont icon-btn_low" @click="die"></span>
										</div>
										<div class="div-ipt">
												<input type="number" placeholder="数量" v-model="input3">
												<span class="ding">s</span>
										</div>
										<div class="div-ipt kemai " >可卖 {{sellNum}} 秒</div>
										<div class="div-ipt btnBuy" @click="sellClick">卖出时间</div>

								</div>
								<div class="temp_content_right" >
										<div class="temp-tab">
												<span :class="tabShow ? '':'active'" @click="tabBtn(0)">五档</span>
												<span @click="tabBtn(1)" :class="tabShow ? 'active':''">明细</span>
										</div>
										<div v-show="!tabShow">
												<ul class="sell" >
														<li v-for="(item,index) in sellFiverList" @click="sellmxlist(item.price)">
																<span>卖{{5-index}}</span>
																<span class="sellcolor">{{item.price}}</span>
																<span>{{item.num}}</span>
														</li>
												</ul>
												<br>
												<ul class="buy">
														<li v-for="(item,index) in buyFiverList" @click="sellmxlist(item.price)">
																<span>买 {{index+1}}</span>
																<span class="buycolor">{{item.price}}</span>
																<span>{{item.num}}</span>
														</li>
												</ul>
										</div>
										<!--明细-->
										<div v-show="tabShow">
												<ul class="sellBuy" v-if="buyAndSellerList.length!=0">
														<li  v-for="item in buyAndSellerList">
																<span>{{item.time}}</span><span>{{item.price}}</span><span>{{item.num}}</span>
														</li>
												</ul>
												<div class="wnone" v-if="buyAndSellerList.length==0">
														<p v-show="!mxShow">暂无数据</p>
														<p v-show="mxShow">先选择一个发行人</p>
												</div>
										</div>
								</div>
						</div>
						<div class="temp_content_bottom">
								<tabListToBuy @ievent="ievent2" ref="mychild"></tabListToBuy>
						</div>
				</div>
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
												<router-link class="link" to="/getP">忘记密码？</router-link>
										</div>
								</div>
								<div class="pay-tool-keyboard">
										<!--键盘-->
										<ul>
												<li @click="keyUpHandle($event)" v-for="val in keys">{{ val }}</li>
												<li class="del" @click="delHandle">
														<span class="icon-del"><i class="el-icon-close"></i></span>
												</li>
										</ul>
								</div>
						</div>
				</mt-popup>
		</div>
</template>

<script>
		const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0];
		import tabListToBuy from './tabListToBuy'
		import { Toast,Popup } from 'mint-ui'
		import MeScroll from 'mescroll.js'
		export default {
				name: "sell_temp",
				data() {
						return {
								sellNum:'-',
								tabShow:false,
								flag:false,
								input1: '',
								input2: '',
								input3: '',
								token:'',
								items: [0, 1, 2, 3, 4, 5],
								keys: keys(),
								password: [],
								activeName: 'first',
								popupVisible:false,
								investorsCode:'',    //发行人代码
								arrList:[],
								   //卖买五集合
								sellFiverList:[
										{
												price:'-',
												num:'-'
										},
										{
												price:'-',
												num:'-'
										},
										{
												price:'-',
												num:'-'
										},
										{
												price:'-',
												num:'-'
										},
										{
												price:'-',
												num:'-'
										}
								],
								buyFiverList:[
										{
												price:'-',
												num:'-'
										},
										{
												price:'-',
												num:'-'
										},
										{
												price:'-',
												num:'-'
										},
										{
												price:'-',
												num:'-'
										},
										{
												price:'-',
												num:'-'
										}
								],
								buyAndSellerList:[],//买卖明细
								mescroll:null,
								mxShow:true,        // 明细状态
								limitDownPrice:'',      //跌价
								limitUpPrice:'',      //涨价
						}
				},
				mounted(){
						this.token = localStorage.getItem('userName');
							if(this.$route.query.code){
									this.input1 = this.$route.query.name+' '+ this.$route.query.code;
									this.investorsCode = this.$route.query.code;
									this.getJson();
									this.chaJson();
							}
						var self = this;
						self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
								down: {
										callback: this.getJson //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
								},
						});
				},
				watch:{
						//监听价格变化
						'input2': function(newVal,oldVal){
								// console.log(newVal,oldVal)
								this.chaJson();
						}
				},
				methods: {
						zhang(){
								this.input2 = this.limitUpPrice
						},
						die(){
								this.input2 = this.limitDownPrice
						},
						//点击买卖5价格更新
						sellmxlist(price){
								this.input2 = price;
						},
						//点击加
						jia(){
								if(this.input2 == ''){
										this.input2 = 0.01
								}else{
										if(this.input2 >= this.limitUpPrice){
												Toast({
														message: '不能大于涨幅价',
														duration: 1000
												});
												return;
										}
										let num = parseFloat(this.input2) + 0.01;
										this.input2 = Math.ceil( num * 100) / 100
								}
						},
						//点击减
						jian(){
								if(this.input2 <= this.limitDownPrice){
										Toast({
												message: '不能小于跌幅价',
												duration: 1000
										});
										return;
								}
								let num = this.input2 - 0.01;
								this.input2 = Math.floor( num * 100) / 100

						},
						//查询可卖
						chaJson(){
								this.$axios.post(url+'/miao/queryProductSeconds.do',this.$qs.stringify({
										investorsCode:this.investorsCode,
										token:this.token,
										languageType:3,
								})).then((res) => {
										console.log(res.data);
										this.sellNum = res.data.OBJECT.seconds;
								}).catch((err) => {
										Toast({
										message: '网络错误',
										position: 'middle',
										duration: 2000
										});
								})
						},
						//切换
						tabBtn(i){
								if(i>0){
										this.tabShow = true;
								}else{
										this.tabShow = false;
								}
						},
						// 父组件调用子组件持仓
						childGet() {
								this.$refs.mychild.getChiC();
						},
						//子组件调用父组件
						ievent2(data){
								console.log(data);
								this.input1=data.investorsCode;
								this.input2=data.newOrderPrice;
								this.sellNum=data.buyerOrderNum;  //可卖数量
						},
						backHandle () {
								this.clearPasswordHandle();  // 返回时清除password
								// this.$emit('backFnc') // 返回上级
								this.popupVisible = false
						},
						keyUpHandle (e) {
								console.log(e.currentTarget.innerText);
								let text = e.currentTarget.innerText;
								let len = this.password.length;
								if (!text || len >= 6) return;
								this.password.push(text);
								this.getSell();
						},
						//搜索框
						change(){
								if(this.input1){
										this.flag = true;
										// console.log(1)
								}else{
										this.flag = false;
								}
								this.$axios.post(url+'/miao/productSearch.do',this.$qs.stringify({
										param:this.input1,
										token:this.token
								})).then((res) => {
										console.log(res.data);
										this.arrList = res.data.LIST
								}).catch((err)=>{
										Toast({
										message: '网络错误',
										position: 'middle',
										duration: 2000
										});
								})
						},
						//删除密码
						delHandle () {
								if (this.password.length <= 0) return false;
								this.password.pop();
						},
						clearPasswordHandle: function () {
								this.password = []
						},
						//点击搜索
						clickLIST(index){
								console.log(this.arrList[index]);
								this.input1 = this.arrList[index].investorsName+' '+ this.arrList[index].investorsCode;
								this.flag = false;
								this.investorsCode = this.arrList[index].investorsCode;
								this.getJson();
								this.chaJson();
						},
						// 卖出btn
						sellClick(){
								console.log(this.token)
								if(!this.token){
									  this.$router.push('/signin');
									  return;
								}
								if(this.input1 =='' ){
										Toast({
										message: '发行人不能为空',
										position: 'middle',
										duration: 2000
										});
										return;
								}
								if(this.input2 == ''){
										Toast({
												message: '价格不能为空',
												position: 'middle',
												duration: 2000
										});
										return;
								}
								if(this.input2 < 0.01){
										Toast({
												message: '不能低于0.01',
												position: 'middle',
												duration: 2000
										});
										return;
								}
								if(this.input3 == ''){
										Toast({
												message: '数量不能为空',
												position: 'middle',
												duration: 2000
										});
										return;
								}
								if(this.input3 <= 0){
									Toast({
										message: '数量不能为0',
										position: 'middle',
										duration: 2000
									});
									return;
								}
								if(this.sellNum < this.input3 ){
											Toast({
												message: '不能大于可卖数量',
												position: 'middle',
												duration: 1000
											});
								}else{
										this.popupVisible = true;
								}
						},
						// 卖出接口
						getSell(){
								if (this.password.length >= 6) {
										var waps = this.password.join('').replace(/\s/g, '');
										console.log(waps);
										this.$axios.post(url+'/miao/sellOrder.do',this.$qs.stringify({
												token:this.token,
												investorsCode:this.investorsCode,
												sellOrderPrice:this.input2,
												sellOrderNum:this.input3,
												userPayWord: this.$md5(waps), //支付密码（md5加密）
												languageType:3
										}),{
												headers:{'Content-Type':'application/x-www-form-urlencoded'}
										}).then((res) => {
												console.log(res);
												this.backHandle();
												if(res.data.STATUS == 0){
														Toast({
																message:'卖出成功' ,
																position: 'middle',
																duration: 2000
														});
														this.getJson();
														this.chaJson();
														this.childGet();
												}else{
														Toast({
																message:res.data.MSG ,
																position: 'middle',
																duration: 2000
														});
												}
										}).catch((err) => {
												Toast({
													message: '网络错误',
													position: 'middle',
													duration: 2000
												});
										})
								}
						},
						// 右边买卖5
						getJson(){
								// var ss = setInterval( () => {
										this.$axios.post(url+'/miao/queryProductByCode.do',this.$qs.stringify({
												token:this.token,
												investorsCode:this.investorsCode,
												languageType:3,
										}),{
												headers:{'Content-Type':'application/x-www-form-urlencoded'}
										}).then((res) => {
												console.log("卖出5");
												console.log(res.data);
												this.input2 = res.data.OBJECT.newOrderPrice;
												if(res.data.OBJECT.buyAndSellerList.length == 0){
													this.mxShow = false
												}else{
													this.mxShow = true
												}
												this.limitUpPrice = res.data.OBJECT.limitUpPrice  // 涨价
												this.limitDownPrice = res.data.OBJECT.limitDownPrice  // 涨价
												this.buyAndSellerList = res.data.OBJECT.buyAndSellerList;   // 明细
												// 卖五
												var sellList = res.data.OBJECT.sellFiverList;
												var sellFilverListNew = [];
												for (var i = 0; i < 5; i++) {
														if ((4 - i) < sellList.length) {
																sellFilverListNew[i] = sellList[4 - i];
																// sellFilverListNew[i].color1 = getColor(sellFilverListNew[i].price, closePrice);
																// sellFilverListNew[i].color2 = green;
														} else {
																sellFilverListNew[i] = { price: '-', num: '-'};
														}
												}
												// 买五
												var buyList = res.data.OBJECT.buyFiverList;
												var buyFiverListNew = [];
												for (var i = 0; i < 5; i++) {
														if (i < buyList.length) {
																buyFiverListNew[i] = buyList[i];
																// buyFiverListNew[i].color1 = getColor(buyFiverListNew[i].price, closePrice);
																// buyFiverListNew[i].color2 = red;
														} else {
																buyFiverListNew[i] = { price: '-', num: '-'};
														}
												}
												this.sellFiverList = sellFilverListNew;
												this.buyFiverList = buyFiverListNew;
												// console.log(sellFilverListNew)
												// console.log(buyFiverListNew)
												setTimeout(() => {
														this.mescroll.endSuccess();
												},1000)
										}).catch((err) => {
												console.log(err);
												setTimeout(() => {
														this.mescroll.endErr();
												},1000)
										})
								// },1000);
						},
				},
				components:{
						tabListToBuy,
						Popup:Popup.name
				}
		}
</script>
<style>

</style>
<style scoped lang="scss">
		/*mescroll滚动的区域*/
		.mescroll {
				position: fixed;
				top: .49rem;
				bottom: .49rem;
				height: auto;
		}
		.wnone{
			font-size: .12rem;
			text-align: center;
			height: 100%;
			line-height: .28rem;
			margin-top: .54rem;
		}
		#ss{
				height: 1.72rem;
				overflow: auto;
		}
		#ss{
				p{
						line-height: .33rem;
				}
		}
		/*.buycolor{*/
				/*color: red;*/
		/*}*/
		.sellcolor{
				/*color: #38f321;*/
		}
		.sousuo{
				position: absolute;
				width: 100%;
				top: .46rem;
				z-index: 222;
				background: #fff;
				border: 1px solid #f5f5f5;
				padding: 0 .13rem;
				box-sizing: border-box;
				p{
						display: flex;
						justify-content: space-between;
						border-bottom: 1px solid #ddd;
				}
		}
		.dynamic_temp {
				height: 100%;
				box-sizing: border-box;
				padding-bottom: .5rem;
				.temp_content_top {
						display: flex;
						flex-wrap: wrap;
						box-sizing: border-box;
				}
				.temp_content_left {
						position: relative;
						width: 55%;
						padding: .1rem .1rem 0;
						box-sizing:border-box;
						.div-ipt{
								width: 100%;
								/*border: 1px solid red;*/
								/*overflow: hidden;*/
								height: .42rem;
								text-align: center;
								position: relative;
								input{
										width: 100%;
										height: .42rem;
										background: #F5F5F5;
										border: none;
										padding: 0;
										font-size: .14rem;
										text-align: center;
								}
								input::placeholder{color: #ccc}
								.ding{
										color: #ccc;
										position: absolute;
										display: inline-block;
										line-height: .42rem;
										right: .1rem;
										top: 0;
										font-size: .14rem;
								}
								.ding1{
										right: .3rem;
								}
								.jian,.jia{
										display: inline-block;
										position: absolute;
										width: .3rem;
										line-height: .42rem;
										top: 0;
										font-size: .3rem;
										color: #ff5558;
										z-index: 1;
								}
								.jian{
										left: 0;
								}
								.jia{
										right: 0;
								}
						}
						>div:nth-child(1){
								padding-top: .07rem;
								padding-bottom: .1rem;
						}
						/*>div:nth-child(2){*/
								/*padding-bottom: .1rem;*/
						/*}*/
						>div:nth-child(3){
								padding: .07rem 0;
								span:nth-child(1){
										color: #ff5558;
										margin-right: .1rem;
								}
								span:nth-child(2){
										color: #38f321;
								}
						}
						.kemai{
								line-height: .4rem;
								height: .4rem;
								font-size: .12rem;
						}
						.btnBuy{
								line-height: .42rem;
								background: #0BA1EE;
								color: #fff;
								font-size: .14rem;
						}
				}
				.temp_content_right {
						width: 44%;
						flex-grow: 1;
						box-sizing:border-box;
						padding: .1rem .1rem 0;
						overflow:auto;
						.temp-tab{
								display: flex;
								justify-content: center;
								padding-bottom: .07rem;
								span{
										padding: .05rem 0;
										margin: 0 .15rem;
								}
								.active{
										border-bottom: 3px solid #ff5558;
										color: #ff5558;
								}
						}
						.buy,.sell,.sellBuy{
								li{
										display: flex;
										justify-content: space-between;
										align-items: center;
										line-height: .2rem;
										span{
												font-size:.12rem;
												text-align: right;
										}
										span:nth-child(2){
												width: 30%;
												display: inline-block;
										}
										span:nth-child(3){
												display: inline-block;
												width: 37%;
										}
								}
						}
				}
				.temp_content_bottom {
						width: 100%;
				}
		}

		.mint-popup-bottom{
				width: 100%;
		}
		.pay-tool {
				position: relative;
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
