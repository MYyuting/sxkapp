<template>
		<!--订单-->
		<div class="watorder mescroll" id="mescroll">
				<!--顶部路由-->
				<div class="wordertop dicenter">
						<div class="tab-item" v-for="(item,index) in tabList"
								 v-bind:class="{active:(currentIndex == index)}" @click="onItemClick(index)">
								{{item}}
						</div>
				</div>
				<div>
						<!--当前订单-->
						<div v-show="currentIndex==0">
								<div id="dataList0">
										<orderChild :listSrr="listSrr"></orderChild>
								</div>
						</div>
						<div v-show="currentIndex==1">
								<div id="dataList2">
										<orderChild :listSrr="listSrr1"></orderChild>
								</div>
						</div>
						<div v-show="currentIndex==2">
								<div id="dataList1">
										<orderChild :listSrr="listSrr2"></orderChild>
								</div>
						</div>
				</div>
		</div>
</template>

<script>
import orderChild from './mairu_child'
import MeScroll from 'mescroll.js'
export default {
		name: "orderchild",
		components:{
				orderChild,
		},
		data(){
				return {
						tabList:['当前订单','历史成交','历史订单'],
						currentIndex: 0,
						orderHide:false,
						mescroll:null,
						listSrr:[],
						listSrr1:[],
						listSrr2:[],
						token:'',
				}
		},
		mounted(){
				this.token = localStorage.getItem('userName');
				var self = this;
				self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
						down: {
								callback: this.downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
						},
				});
		},
		methods: {
				onItemClick(index) {
						if (this.currentIndex != index) {
								this.currentIndex = index;
						}
						this.downCallback();
				},
				mounted(){
						this.orderHide1=!this.orderHide
				},

				downCallback(){
						//当前订单
						if(this.currentIndex == 0){
								this.$axios.post(url+'/miao/queryEntrustedProduct.do',this.$qs.stringify({
										token:this.token,
										languageType:3,
										// pageSize:'5',
										// currentPage:'2'
								})).then((res) => {
										console.log(res.data);
										if(res.data.STATUS == 0){
												this.listSrr= res.data.LIST
										}
										setTimeout(() => {
												this.mescroll.endSuccess();
										},1000)
								}).catch((err) => {
										console.log(err);
										setTimeout(() => {
												this.mescroll.endErr();
										},1000)
								})
						}else if(this.currentIndex == 1){
								//历史成交
								this.$axios.post(url+'/miao/querySuccessTransaction.do',this.$qs.stringify({
										token:this.token,
										languageType:3,
										// pageSize:'5',
										// currentPage:'2'
								})).then((res) => {
										console.log(res.data);
										if(res.data.STATUS == 0){
												this.listSrr1= res.data.LIST
										}
										setTimeout(() => {
												this.mescroll.endSuccess();
										},1000)
								}).catch((err) => {
										console.log(err);
										setTimeout(() => {
												this.mescroll.endErr();
										},1000)
								})
						}else{
								//历史订单
								this.$axios.post(url+'/miao/getAllStock.do',this.$qs.stringify({
										token:this.token,
										languageType:3,
										// pageSize:'5',
										// currentPage:'2'
								})).then((res) => {
										console.log(res.data);
										if(res.data.STATUS == 0){
												this.listSrr2= res.data.LIST
										}
										setTimeout(() => {
												this.mescroll.endSuccess();
										},1000)
								}).catch((err) => {
										console.log(err);
										setTimeout(() => {
												this.mescroll.endErr();
										},1000)
								})
						}
				},
		}
}
</script>

<style scoped lang="scss">
		@charset "utf-8";
		$wi:100%;
		$b:1px solid blue;
		$f:flex;
		$co:column;
		$ar:space-around;
		$be:space-between;
		$c:center;
		$w:wrap;
		$r:right;
		$l:left;
		$bai:#fff;
		/*mescroll滚动的区域*/
		.mescroll {
				position: fixed;
				top: .49rem;
				bottom: .49rem;
				height: auto;
		}
		.colm{
				flex-direction: $co;
				display: $f;
				justify-content: $ar;
				align-items: $c;
		}
		.dis{
				display: $f;
				justify-content: $ar;
				align-items: $c;
		}
		.dicenter{
				display: $f;
				justify-content: $c;
				align-items: $c;
		}
		.dis2{
				display: $f;
				justify-content: $be;
				align-items: $c;
		}
		.dis1{
				display: $f;
				justify-content: $ar;
				align-items: $c;
				flex-wrap:$w;
		}

		.wordertop{
				padding:.2rem;
				text-align: center;
				border-bottom:.04rem solid #f5f5f5;
	
				div{
						width: 1.12rem;
						height: .4rem;
						line-height: .4rem;
						border: .01rem solid #CCCCCC;
						font-size: .14rem;
						color: #999999;


				}
				div:nth-child(1){
						border-radius:.05rem 0 0  .05rem;
				}
				div:nth-child(2){
						border-right:0;
						border-left:0;
				}
				div:nth-child(3){
						border-radius:0 .05rem .05rem 0;
		
				}
		}
		.wgray{
				margin-top: .52rem;
				img{
						width: 1.4rem;
						height: 1.4rem;
				}
		}
		.active{
				background: #FF5558;
				border:.01rem solid #FF5558 !important;
				color: #fff !important;
		}
</style>