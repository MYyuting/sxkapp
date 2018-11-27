<template>
    <!--时间交易规则-->
		<div class="time-rules">
				<timeHead :text="til"></timeHead>
				<div class="time-con">
						<div class="til">时间交易规则</div>
						<table cellspacing="0">
								<tr>
										<td>商品</td>
										<td>服务所需要的时间</td>
								</tr>
								<tr>
										<td>买卖模式</td>
										<td>灵活</td>
								</tr>
								<tr>
										<td>买卖方向</td>
										<td>单向</td>
								</tr>
								<tr>
										<td>申购量</td>
										<td>申购中的商品最低购买1秒时间</td>
								</tr>
								<tr>
										<td>使用范围</td>
										<td>见名人详情页-时间商品列表</td>
								</tr>
								<tr>
										<td>买卖量</td>
										<td>最小1秒，最大240小时（864000秒）</td>
								</tr>
								<tr>
										<td>涨跌幅</td>
										<td>进入上架日当天涨跌幅不超过40%，次日起涨跌幅不超过10%</td>
								</tr>
								<tr>
										<td>最小振幅</td>
										<td>0.01元</td>
								</tr>
								<tr>
										<td>买卖佣金</td>
										<td>千分之五（双向收费）</td>
								</tr>
								<tr>
										<td>委托时间</td>
										<td>工作日 10：00-22：00</td>
								</tr>
								<tr>
										<td>成交时间</td>
										<td>工作日 10：00-22：00</td>
								</tr>
								<tr>
										<td>委托有效期</td>
										<td>工作日 10：00-22：00</td>
								</tr>
						</table>


						<div class="til">申购规则</div>
						<table cellspacing="0">
								<tr>
										<td>申购时间</td>
										<td>申购期间直至申购结束之前，任意时间段均可申购（期间可撤销）</td>
								</tr>
								<tr>
										<td>申购单位</td>
										<td>1秒或其整数倍</td>
								</tr>
								<tr>
										<td>资源匹配</td>
										<td>最小匹配单位为1秒或其整数倍</td>
								</tr>
								<tr>
										<td>最大申购量</td>
										<td> 最多可申购：864000秒</td>
								</tr>
						</table>

						<div class="til">申购流程</div>
						<p>1.	用户在申购时间内进行申购，输入申购数量提交，系统将冻结相应资金</p>
						<p>2.	申购结束后进行系统资源匹配（一般为24小时内）</p>
						<p>3.	中签用户获得相应时间，未中签用户申购时间的金额退回（一般为24小时内）</p>

						<div class="til">提现</div>
						<table cellspacing="0" >
								<tr>
										<td>手续费</td>
										<td>0.6%</td>
								</tr>
								<tr>
										<td>到账时间</td>
										<td>T+3</td>
								</tr>
								<tr>
										<td>单日限额</td>
										<td>50,000.00元(人民币)</td>
								</tr>
								<tr>
										<td>单笔限额</td>
										<td>1.00 – 50,000.00元(人民币)</td>
								</tr>
						</table>
				</div>
		</div>
</template>

<script>
		import timeHead from '../headMe'
    export default {
        name: "time-rules",
				data(){
        		return {
        				til:["时间交易规则"]
						}
				},
				components:{
        		timeHead
				}
    }
</script>

<style scoped lang="scss">
		.time-con{
				padding: .15rem;
				.til{
						text-align: center;
						font-size: .16rem;
						font-weight: bolder;
						line-height: .4rem;
				}
				table{
						width: 100%;
						line-height: .3rem;
						font-size: .14rem;
						border: 1px solid #333;
						margin-bottom: .3rem;
						tr td:nth-child(1){
								width: 25%;
						}
						td{
								border: 1px solid #666;
						}
				}
		}
</style>