<template>
		<div class="pageall">
				<div class="apaz"></div>
				<div class="index_contents">
						<router-view></router-view>
				</div>
				<div class="foot_nav">
						<router-link :to="item.url" v-for="(item,index) in arrHome" :key="index">
								<div><span :class="item.icon"></span></div>
								<div class="cpt">{{item.til}}</div>
						</router-link>
				</div>
		</div>
</template>
<script>
		export default {
				name: 'index',
				data() {
						return {
								arrHome:[
										{
												til:"首页",
												icon:"iconfont icon-home_normal",
												url:"/index"
										},
										{
												til:"行情",
												icon:"iconfont icon-market_selected",
												url:"/quotation"
										},
										{
												til:"买卖",
												icon:"iconfont icon-charge_selected",
												url:"/business"
										},
										{
												til:"我的",
												icon:"iconfont icon-my_normal",
												url:"/mine"
										},
								],
								flagHome: true,
								flagQuotation: true,
								flagBusiness: true,
								flagMine: true
						}
				},
				beforeMount(){
						document.addEventListener('plusready', function() {
								var webview = plus.webview.currentWebview();
								plus.key.addEventListener('backbutton', function() {
										webview.canBack(function(e) {
												if(e.canBack) {
														webview.back();
												} else {
														//webview.close(); //hide,quit
														//plus.runtime.quit();
														//首页返回键处理
														//处理逻辑：1秒内，连续两次按返回键，则退出应用；
														var first = null;
														plus.key.addEventListener('backbutton', function() {
																//首次按键，提示‘再按一次退出应用’
																if (!first) {
																		first = new Date().getTime();
																		console.log('再按一次退出应用');
																		setTimeout(function() {
																				first = null;
																		}, 1000);
																} else {
																		if (new Date().getTime() - first < 1500) {
																				plus.runtime.quit();
																		}
																}
														}, false);
												}
										})
								});
						});
				},
				methods: {

				}
		}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
		$color: #ff5558;
		$gray:#333;
		.pageall {
				height: 100%;
				display: flex;
				flex-direction: column;

				.index_contents {
						height:1rem;
						flex-grow: 1;
				}
				.foot_nav {
						width: 100%;
						background: #fff;
						z-index: 9;
						height: .54rem;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						align-items: center;
						/*padding: 0 .2rem;*/
						border-top: 1px solid #eee;
						position: fixed;
						bottom: 0;
						left: 0;
						> a {
								.iconfont{
										font-size: .3rem;
								}
								text-decoration: none;
								color: #BCBCBC;;
								width: 100%;
								height: 100%;
								text-align: center;
								img {
										height: .34rem;
								}
								.cpt{
										font-size: .12rem;
								}
								&.router-link-active{
										color:$color;
								}
						}
				}
		}
</style>
