<template>
		<!--折线图-->
		<div class='fade'>
				<div class="tabTime">
						<span v-for="(item,index) in tabList" :class="[i == index ? 'active' : '']"
									@click="tabClick(index)">{{item.til}}</span>
				</div>
				<div class="confirm">
						<div id="myChart" :style="{width: '2.3rem', height: '2.4rem', border:'1px solid #ccc'}"></div>
						<div class="temp_content_right" >
								<el-tabs v-model="activeName" @tab-click="handleClick">
										<el-tab-pane label="五档" name="first">
												<ul class="sell">
														<li v-for="(item,index) in object.buyFiverList">
																<span>买5</span><span>{{item.price}}</span><span>{{item.num}}</span>
														</li>
														<!--<li><span>卖5</span><span>-</span><span>-</span></li>-->
														<!--<li><span>卖5</span><span>-</span><span>-</span></li>-->
														<!--<li><span>卖5</span><span>-</span><span>-</span></li>-->
														<!--<li><span>卖5</span><span>-</span><span>-</span></li>-->
												</ul>
												<br>
												<ul class="buy">
														<li v-for="(item,index) in object.sellFilverList">
																<span>卖5</span><span>{{item.price}}</span><span>{{item.num}}</span>
														</li>
												</ul>
										</el-tab-pane>
										<el-tab-pane label="明细" name="second">
												<ul class="minxi">
														<li v-for="item in object.buyAndSellerList">
																<span>{{item.time}}</span><span>{{item.price}}</span><span>{{item.num}}</span>
														</li>
														<!--<li><span>买5</span><span>-</span><span>-</span></li>-->
														<!--<li><span>买5</span><span>-</span><span>-</span></li>-->
														<!--<li><span>买5</span><span>-</span><span>-</span></li>-->
														<!--<li><span>买5</span><span>-</span><span>-</span></li>-->
												</ul>
										</el-tab-pane>
								</el-tabs>
						</div>
				</div>
		</div>
</template>

<script>
		export default {
				name: 'xiantu',
				props:['object'],
				data(){
						return {
								activeName: 'first',
								i:0,
								tabList:[
										{
												til:"1分"
										},
										{
												til:"5分"
										},
										{
												til:"15分"
										},
										{
												til:"30分"
										},
										{
												til:"60分"
										},
										{
												til:"日线"
										}
								],
								data:[
										[
												"2007-05-22",
												13540.84,
												13525.65,
												13476.72,
												13632.03,
												201290000
										],
										[
												"2007-05-23",
												13540.84,
												13525.65,
												13476.72,
												13648.69,
												208260000
										],
										[
												"2007-05-24",
												13540.84,
												13525.65,
												13391.56,
												13645.52,
												240810000
										],
								],
								minitData:[],  //分时
								tInvestData:[],  //日时
						}
				},
				mounted(){
						console.log(this.object);
						this.minitData = this.object.minitePriceList;
						this.tInvestData = this.object.tInvestHisList;
						this.drawLine();

						//------------------------------------------------------
						let rawData = this.tInvestData;
						var categoryData = [];
						var values = [];
						var val = [];
						var volumes = [];
						for (var i = 0; i < rawData.length; i++) {
								categoryData.push(rawData[i].investorsDate);
								for(var variable  in rawData[i]){   //variable 为属性名
										values.push(variable.investorsLowestPrice);
										values.push(variable.investorsClosePrice);
										values.push(variable.investorsOpenPrice);
										values.push(variable.investorsHighestPrice);
										values.push(variable.investorsAllNum);
										val.push(values);
										values=[];
								}
								volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
						}
						// console.log(categoryData);
						console.log(val);
						console.log(volumes)
				},
				methods:{
						handleClick(tab, event) {
								// console.log(tab, event);
						},
						tabClick(index){
								this.i =index
						},
						splitData(rawData) {
								var categoryData = [];
								var values = [];
								var volumes = [];
								for (var i = 0; i < rawData.length; i++) {
										categoryData.push(rawData[i].splice(0, 1)[0]);
										values.push(rawData[i]);
										volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
								}
								// console.log(categoryData)
								console.log(values)
								// console.log(volumes)
								return {
										categoryData: categoryData,
										values: values,
										volumes: volumes
								};
						},
						drawLine(){
								let upColor = '#00da3c';
								let downColor = '#ec0000';
								let data = this.splitData(this.data);
								// 基于准备好的dom，初始化echarts实例
								let myChart = this.$echarts.init(document.getElementById('myChart'))
								// 绘制图表
								myChart.setOption({
										backgroundColor: '#fff',
										animation: true,
										tooltip: {
												trigger: 'none',
												axisPointer: {
														type: 'cross'
												},
												backgroundColor: 'rgba(245, 245, 245, 0.8)',
												borderWidth: 1,
												borderColor: '#ccc',
												padding: 10,
												textStyle: {
														color: '#000'
												},
												position: function (pos, params, el, elRect, size) {
														var obj = {top: 10};
														obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
														return obj;
												}
												// extraCssText: 'width: 170px'
										},
										axisPointer: {
												link: {xAxisIndex: 'all'},
												label: {
														backgroundColor: '#777'
												}
										},
										//工具栏
										toolbox: {
												show:false,
										},
										visualMap: {
												min: 0,
												max: 10,
												// 两个手柄对应的数值是 4 和 15
												range: [4, 12],
												show: false,
												seriesIndex: 5,
												dimension: 2,
												pieces: [{
														value: 1,
														color: downColor
												}, {
														value: -1,
														color: upColor
												}]
										},
										grid: [
												// 上方k线图表
												{
														top: 0,
														left: 0,
														right: 0,
														height: 180,
														zlevel: 999,
														borderColor:'#ccc',
														// borderWidth:1
												},
												// 下方柱状图表
												{
														left: 0,
														right: 0,
														height: 40,
														// top: 180,
														bottom:0,
														zlevel: 999,
														borderColor:'#ccc',
														// borderWidth:1
												}
										],
										xAxis: [
												//上方图表x轴设置
												{
														// name: '时间轴',
														type: 'category',
														position: 'bottom',
														griIndex: 0,
														scale: true,
														boundaryGap: true,
														splitLine: {
																show: true,
																interval: 3,
																lineStyle: {
																		color: ['#ccc']
																}
														},
														axisLine: {
																show: true,
																lineStyle: {
																		color: "#b5b7c2",
																		width: 1
																}
														},
														axisLabel: {
																show: false
														},
														axisTick: {
																show: false,
																alignWithLabel: true
														},
														axisPointer: {
																label: {
																		show: false
																}
														}
												},//xia方图表x轴设置
												{
														type: 'category',
														gridIndex: 1,
														position: 'bottom',
														data: data.categoryData,
														scale: true,
														boundaryGap : true,
														axisLine: {onZero: true},
														axisTick: {show: false},
														splitLine: {
																show: true,
																interval: 3,
																lineStyle: {
																		color: ['#ccc']
																}
														},
														axisLabel: {show: false},
														splitNumber: 30,
														min: 'dataMin',
														max: 'dataMax'
												}
										],
										yAxis: [
												// 上方图表y轴设置
												{
														// name: '报价',
														scale: true,
														position: "right",
														type: 'value',
														gridIndex: 0,
														splitNumber: 5,
														boundaryGap: true,
														splitLine: {
																show: true,
																interval: 3,
																lineStyle: {
																		color: ['#ccc']
																}
														},
														axisTick: {
																show: true,
																alignWithLabel: true
														},
														axisLine: {
																show: true,
																lineStyle: {
																		color: '#ccc'
																}
														}
												},
												{
														scale: true,
														gridIndex: 1,
														splitNumber: 1,
														axisLabel: {show: false},
														axisLine: {show: false},
														axisTick: {show: false},
														splitLine: {show: false}
												}
										],
										// 缩放组件，用的inside模式，即动作在表本身发生会导致缩放触发，不会有额外的缩放条
										dataZoom: [
												{
														type: 'inside',
														xAxisIndex: [0, 1],
														start: 23,
														end: 67,
														minSpan:20,
														maxSpan:60
												},
												{
														show: false,
														xAxisIndex: [0, 1],
														type: 'slider',
														top: '70%',
														start: 23,
														end: 67
												}
										],
										// 走势图数据
										series: [
												// 上方图表数据（k线）
												{
														name: 'Dow-Jones index',
														type: 'candlestick',
														data: data.values,
														itemStyle: {
																normal: {
																		color: upColor,
																		color0: downColor,
																		borderColor: null,
																		borderColor0: null
																}
														},
														// tooltip: {
														// 		formatter(param) {
														// 				param = param[0];
														// 				return [
														// 						'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
														// 						'Open: ' + param.data[0] + '<br/>',
														// 						'Close: ' + param.data[1] + '<br/>',
														// 						'Lowest: ' + param.data[2] + '<br/>',
														// 						'Highest: ' + param.data[3] + '<br/>'
														// 				].join('');
														// 		}
														// }
												},
												{
														name: 'MA5',
														type: 'line',
														data: this.calculateMA(5, data),
														smooth: true,
														lineStyle: {
																normal: {opacity: 0.5}
														}
												},
												{
														name: 'MA10',
														type: 'line',
														data: this.calculateMA(10, data),
														smooth: true,
														lineStyle: {
																normal: {opacity: 0.5}
														}
												},
												{
														name: 'MA20',
														type: 'line',
														data: this.calculateMA(20, data),
														smooth: true,
														lineStyle: {
																normal: {opacity: 0.5}
														}
												},
												{
														name: 'MA30',
														type: 'line',
														data: this.calculateMA(30, data),
														smooth: true,
														lineStyle: {
																normal: {opacity: 0.5}
														}
												},
												{
														name: 'Volume',
														type: 'bar',
														xAxisIndex: 1,
														yAxisIndex: 1,
														data: data.volumes
												}
										]
								}, true);


								myChart.dispatchAction({
										type: 'brush',
										areas: [
												{
														brushType: 'lineX',
														coordRange: ['2016-06-02', '2016-06-20'],
														xAxisIndex: 0
												}
										]
								});
						},

						calculateMA(dayCount, data) {
								var result = [];
								for (var i = 0, len = data.values.length; i < len; i++) {
										if (i < dayCount) {
												result.push('-');
												continue;
										}
										var sum = 0;
										for (var j = 0; j < dayCount; j++) {
												sum += data.values[i - j][1];
										}
										result.push(+(sum / dayCount).toFixed(3));
								}
								return result;
						},
				}
		};
</script>

<style lang="scss">
		.el-tabs{
				height: 100%;
		}
		.el-tabs__content{
				height: 76%;
				overflow: auto;
		}
		.fade{
				padding: 0 .15rem;
				border-bottom: 1px solid #ddd;

				.el-tabs__header{
						margin: 0 0 .15rem;
				}
				.el-tabs__item{
						padding: 0 .2rem;
						height: auto;
						line-height: .3rem;
				}
		.tabTime{
				border-bottom: 1px solid #ddd;
				border-top: 1px solid #ddd;
				height: .36rem;
				line-height: .36rem;
				display: flex;
				justify-content: space-between;
				.active{
						padding-bottom: 2px;
						border-bottom: 1px solid #FF5558;
						color: #FF5558;
				}
		}
		.confirm{
				height: 2.5rem;
				margin-top: .1rem;
				display: flex;
				justify-content: space-between;
		}
		.temp_content_right{
				.minxi{
						li{
								font-size: .10rem;
								display: flex;
								justify-content: space-around;
						}
				}
				.sell{
						height: .8rem;
				}
				.buy li ,.sell li{
						font-size: .10rem;
						display: flex;
						justify-content: space-between;
						span:not(:nth-child(1)){
								width: 33%;
								font-size: .10rem;
						}
						span:nth-child(3){
								text-align: right;
						}
				}
				flex-grow: 1;
				padding: 0 0rem 0 .1rem;
		}
		.el-tabs__item:hover{
				color: #ff5558;
		}
		.el-tabs__active-bar{
				background-color: #ff5558;
		}
		}
</style>