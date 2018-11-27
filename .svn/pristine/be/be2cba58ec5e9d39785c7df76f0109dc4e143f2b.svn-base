<template>
		<!--订单-->
		<div class="watorder" >
				<!--顶部路由-->
				<div class="wordertop dicenter">
						<div class="tab-item" v-for="(item,index) in tabList"
								 v-bind:class="{active:(currentIndex == index)}" @click="onItemClick(index)">
								{{item}}
						</div>
				</div>
				<div class="flex-box">
						<!--当前订单-->
						<div id="mescroll0" class="mescroll" v-show="currentIndex==0">
								<div id="dataList0">
										<orderChild :listSrr="listSrr"></orderChild>
								</div>
						</div>
						<div id="mescroll1" class="mescroll" v-show="currentIndex==1">
								<div id="dataList1">
										<atorderChild :listSrr="listSrr1"></atorderChild>
								</div>
						</div>
						<div id="mescroll2" class="mescroll" v-show="currentIndex==2">
								<div id="dataList2">
										<orderChild :listSrr="listSrr2"></orderChild>
								</div>
						</div>
				</div>
		</div>
</template>

<script>
import orderChild from './mairu_child'
import atorderChild from './atorder_child'
import MeScroll from 'mescroll.js'
export default {
		name: "orderchild",
		components:{
				orderChild,
				atorderChild
		},
		data(){
				return {
						tabList:['当前订单','历史成交','历史订单'],
						currentIndex: 0,
						mescrollArr: new Array(3),
						orderHide:false,
						mescroll:'',
						listSrr:[],
						listSrr1:[],
						listSrr2:[],
						token:'',
						img2:require('../../assets/img/state/order@2x.png')
				}
		},
		mounted(){
				this.token = localStorage.getItem('userName');
				this.mescrollArr[0] = this.initMescroll("mescroll0", "dataList0");
		},
		methods: {
				onItemClick(index) {
						if (this.currentIndex != index) {
								this.currentIndex = index;
								if (this.mescrollArr[index] == null) {
										this.mescrollArr[index] = this.initMescroll("mescroll" + index, "dataList" + index);
								}
						}
				},

				initMescroll(mescrollId, clearEmptyId) {
						//创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;
						// console.log('--------'+clearEmptyId)
						var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
						let mescroll = new MeScroll(mescrollId, {
								//上拉加载的配置项
								up: {
										use:true,
										callback: this.getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
										isBounce: true, //是否允许ios的bounce回弹;默认true,允许回弹; 此处配置为false,可解决微信,QQ,Safari等等iOS浏览器列表顶部下拉和底部上拉露出浏览器灰色背景和卡顿2秒的问题
										offset:100,
										page: {
												num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
												size:8, //每页数据条数
												time: null //加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
										},
										noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
										empty: {
												warpId: clearEmptyId,
												icon: this.img2, //图标,默认null
												tip: "你还没有相关的订单", //提示
												supportTap:true,
										},
										// clearEmptyId: clearEmptyId, //相当于同时设置了clearId和empty.warpId; 简化写法;默认null
										htmlNodata: '<p class="upwarp-nodata">-- 没有更多数据 --</p>', //无数据的布局
								},
								down: {
//        	callback:,
										isLock: false,
								},
						});
						return mescroll;
				},
				getListData(page) {
						//联网加载数据
						var self = this;
						var dataIndex = this.currentIndex; //记录当前联网的nav下标,防止快速切换时,联网回来curNavIndex已经改变的情况;
						this.getListDataFromNet(dataIndex, page.num, page.size, function (pageData) {
								// console.log("dataIndex=" + dataIndex + ", curNavIndex=" + self.currentIndex + ", page.num=" + page.num + ", page.size=" + page.size + ", pageData.length=" + pageData.length);

								console.log(pageData);
								self.setListData(pageData, dataIndex, page);

								self.mescrollArr[dataIndex].endSuccess(pageData.length);
						}, function () {
								//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
								self.mescrollArr[dataIndex].endErr();
						});
				},
				setListData(pageData, dataIndex, page) {
						//更新列表数据
						switch (dataIndex) {
								case 0:
										if (page.num == 1) this.listSrr = [];
										this.listSrr = this.listSrr.concat(pageData);
										console.log(this.listSrr);
										break;
								case 1:
										if (page.num == 1) this.listSrr1 = [];
										this.listSrr1 = this.listSrr1.concat(pageData);
										break;
								case 2:
										if (page.num == 1) this.listSrr2 = [];
										this.listSrr2 = this.listSrr2.concat(pageData);
										break;
						}
				},
				/*联网加载列表数据*/
				getListDataFromNet(curNavIndex, pageNum, pageSize, successCallback, errorCallback) {
						// debugger;
						//延时一秒,模拟联网
						let that = this;
						setTimeout(() => {
								console.log(curNavIndex);
								var url1='';
								switch (curNavIndex) {
										case 0:
												url1=url+'/miao/queryEntrustedProduct.do';
												break;
										case 1:
												url1=url+'/miao/querySuccessTransaction.do';
												break;
										case 2:
												url1=url+'/miao/getAllStock.do';
												break;
								}
								var token=localStorage.getItem("userName");
								this.$axios({
										headers:{'Content-Type':'application/x-www-form-urlencoded'},
										method: "POST",
										url: url1,
										data: this.$qs.stringify({
												token:token,
												currentPage:pageNum,
												pageSize:pageSize,
												languageType:3,
										})
								}).then(res=> {
										if(res.data.STATUS==0){
												console.log(res.data);
												successCallback && successCallback(res.data.LIST);
										}else{
												successCallback && successCallback('');
										}
								}).catch(err=>{
										console.log(err);
										errorCallback&&errorCallback()//失败回调
								});
						}, 1500)
				},
				mounted(){
						this.orderHide1=!this.orderHide
				}
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
		.watorder{
				position: fixed;
				top: .5rem;
				bottom: .5rem;
				width: 100%;
				display: flex;
				flex-direction: column;
				.flex-box{
						flex-grow: 1;
						height: 50%;
				}
		}
		/*mescroll滚动的区域*/
		.mescroll {
				height: 100%;
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