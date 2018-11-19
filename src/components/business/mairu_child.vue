<template>
    <!--当前订单子组件-->
		<div class="mairu">
				<div v-for="(item,index) in listSrr" v-show="listSrr.length !=0">
						<div class="til" :class="item.type == 1 ? 'red'  :'lu'">
								<span>{{item.type == 1 ? '买入' : ' 卖出' }}&nbsp;&nbsp;{{item.investorsName}}</span>
								<span>{{item.entrustDate | str}} {{item.orderDate}}  &nbsp;
										<span v-show="item.orderStatus == 0 " @click="removeDd(index,item.type,item.orderId)">撤销</span>
								</span>
						</div>
						<ul>
								<li>
										<span>委托价</span>
										<p>{{item.orderPrice}}</p>
								</li>
								<li>
										<span>委托量</span>
										<p>{{item.orderNum}}</p>
								</li>
								<li>
										<span>成交量</span>
										<p>{{item.actualNumber}}</p>
								</li>
						</ul>
				</div>
				<!--无数据显示-->
				<!--<div class="wgray" v-show="listSrr.length == 0">-->
						<!--<img src="../../assets/img/state/order@2x.png" alt="" />-->
						<!--<p>你还没有相关的订单</p>-->
				<!--</div>-->
		</div>
</template>

<script>
		import Vue from 'vue'
		import { MessageBox ,Toast} from 'mint-ui';
    export default {
        name: "mairu_child",
				props:['listSrr'],
				data(){
        		return {
				        token:'',
						}
				},
				beforeCreate(){
						//自定义过滤器
						Vue.filter( 'str' , function(value) {
								return value.replace(/\./g,"-");
						});
				},
				mounted(){
						this.token = localStorage.getItem('userName');
						// this.getwei();
						console.log(this.listSrr)
				},
				methods:{
						removeDd(index,type1,id){
								MessageBox.confirm('确定撤销订单吗?',"").then(action => {
										this.$axios.post(url+ '/miao/updateRevocationStatus.do',this.$qs.stringify({
												token:this.token,
												orderId:id,    //id
												type: type1,       //买卖
												languageType:3,
										})).then((res) => {
												console.log(res.data);
												if(res.data){
														Toast({
																message: "撤销成功",
																duration: 1000
														});
														console.log(this.listSrr)
														this.listSrr.splice(index,1)
												}
										}).catch((err) => {
												Toast({
														message: "网络错误",
														duration: 1000
												});
										})
								}, action => {
										console.log("取消")
								})
						}
				}
    }
</script>

<style scoped lang="scss">
		.mairu{
				padding: 0 .16rem;
				*{
						font-size: .14rem;
				}
		}
		.wgray{
				margin-top: .52rem;
				text-align: center;
				img{
						width: 1.3rem;
						height: 1.3rem;
				}
				p{
						color: #aaa;
				}
		}
		.til{
				line-height: .4rem;
				display: flex;
				justify-content: space-between;
				*{
						font-size: .15rem;
				}
				&.red{
						 color: #FF5558;
				 }
				&.lu{
						 color: #0BA1EE;
				 }
		}
		.mairu ul{
				border-bottom: 1px solid #ddd;
				display: flex;
				justify-content: space-between;
				padding-bottom: .15rem;
				li{
						position: relative;
						width: 34%;
						text-align: center;
						span{
								font-size: .12rem;
								color: rgba(0,0,0,0.4);
								line-height: .2rem;
						}
						p{
								line-height: .3rem;
						}
				}
				li:not(:first-child)::after{
						position: absolute;
						content: '';
						width: 0;
						top: 5px;
						left: 0;
						height: .34rem;
						border: 1px solid #ddd;
				}
		}
</style>