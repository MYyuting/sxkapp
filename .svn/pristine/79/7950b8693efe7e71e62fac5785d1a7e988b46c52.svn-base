<template>
		<div class=" dynamic_temp ">
				<div class="con-box">
						<ul class="temp_content_top">
								<li>
										<div>持仓成本</div>
										<div>{{arrZ.positionTotalEarnings}}</div>
								</li>
								<li>
										<div>持仓收益</div>
										<div>{{arrZ.positionTotalCost}}</div>
								</li>
								<li>
										<div>持仓市值</div>
										<div>{{arrZ.positionPrice}}</div>
								</li>
						</ul>
						<div class="temp_content_bottom">
								<tabListToBuy></tabListToBuy>
						</div>
				</div>
		</div>
</template>

<script>
		import tabListToBuy from './tabListToBuy'
		import { MessageBox,Toast } from 'mint-ui';
		import MeScroll from 'mescroll.js'
		export default {
				name: "position_temp",
				data() {
						return {
								input1: '',
								input2: '',
								input3: '',
								arrZ:{
										positionTotalEarnings:'0.00',
										positionPrice:'0.00',
										positionTotalCost:'0.00',
								},
								token:'',
								mescroll:null,
						}
				},
				mounted(){
						this.token= localStorage.getItem("userName");
						this.getDa();
				},
				methods: {

						getDa(){
								this.$axios.post(url+'/miao/queryAllPositionProduct.do',this.$qs.stringify({
										token:this.token,
								})).then((res) => {

										console.log(res.data);
										if(res.data.STATUS == 0){
												this.arrZ = res.data.OBJECT;
										}else if(res.data.STATUS == 3){
												Toast({
														message: '请登录',
														position: 'middle',
														duration: 1000
												});
										}
								}).catch((err) => {
										console.log(err);
										Toast({
												message: '网络错误',
												duration: 1000
										});
								})
						}
				},
				components:{
						tabListToBuy,
				}
		}
</script>

<style scoped lang="scss">
		/*mescroll滚动的区域*/

		.dynamic_temp {
				.con-box{
						display: flex;
						flex-direction: column;
						height: 100%;
				}
				width: 100%;
				position: fixed;
				top: .49rem;
				bottom: .49rem;
				height: auto;
				.temp_content_top {
						display: flex;
						box-sizing: border-box;
						justify-content: space-between;
						align-items: center;
						height:.8rem;
						li:not(:nth-of-type(1)){
								position:relative;
								&:before{
										position:absolute;
										left:0;
										top:.2rem;
										width:1px;
										height:60%;
										background:#ccc;
										content:'';
								}
						}
						>li{
								flex:1;
								height:100%;
								text-align: center;
								>div:nth-of-type(1){
										color:#999;
										font-size: .13rem;
										margin-top: .1rem;
										line-height: .4rem;
								}
								>div:nth-of-type(2){
										font-size:.15rem;
										font-weight: bold;
								}
						}
				}
				.temp_content_bottom {
						width: 100%;
						border-top: 4px solid #eee;
						flex-grow: 1;
						height: 70%;
				}
		}
</style>
