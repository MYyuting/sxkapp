<template>
    <!--投票上新详情页-->
		<div class="TouPiao">
				<Head>
						<span class="el-icon-arrow-left" slot="head_left" @click="back"></span>
						<span class="" slot="head_center">{{issuserArr.investorsName}}</span>
						<span class="iconfont icon-paiHangBang_Star" slot="head_right" @click="topR(issuserArr.investorsAvatar)"></span>
				</Head>

				<div id="mescroll" class="mescroll">
						<!--内容上-->
						<div class="con-top">
								<div class="con-top-left">
										<img :src="issuserArr.investorsAvatar" alt="">
										<div class="left-con">
												<p style="font-weight: bold">{{issuserArr.investorsName}}
														<i class="iconfont icon-fans" v-show="issuserArr.isFans == 0"></i>
												</p>
												<p style="margin-top: 7px">
														<img src="../../assets/img/home/star@2x.png" alt="">
														<span> {{issuserArr1.starlightNum}}</span>
												</p>
												<!--<button @click="song">送星光</button>-->
										</div>
								</div>
								<div class="con-top-right" :class="issuserArr1.starlightRanking == 1 ? 'activefirst'  : 'activelast' ">
										<div>投票上新</div>
										<p><span>第</span><b>{{issuserArr1.starlightRanking}}</b> <span>名</span></p>
										<div class="top_img" v-show="issuserArr1.starlightRanking == 1">
												<img src="../../assets/img/home/vote_theFirst@2x.png" alt="">
										</div>
								</div>
						</div>
						<!--内容下-->
						<div class="nav">
								<p v-for="(item,index) in tabList"
									 :class="{active:(currentIndex == index)}"
								@click="tabClick(index)">{{item}}</p>
						</div>
						<!--简介-->
						<div v-show="currentIndex==0">
								<Introduction :investors="issuserArr"></Introduction>
						</div>
						<!--时间商品-->
						<div v-show="currentIndex==1">
								<timeCom ref="timeCom"></timeCom>
						</div>
						<!--动态-->
						<div v-show="currentIndex==2">
								<DongTai v-show="dtShow" :datalist="dongtai1"></DongTai>
								<div class="zanwu" v-show="!dtShow"> 暂无数据</div>
						</div>
						<!--新闻-->
						<div v-show="currentIndex==3">
								<Journalism :text="dataJson"></Journalism>
						</div>
				</div>

				<!--底部-->
				<footer class="footer">
						<ul>
								<li @click="song">
										<img src="../../assets/img/giveStar.svg" alt="">
										<p>送星光</p>
								</li>
						</ul>
				</footer>

				<!--弹框-->
				<div class="el-motai" v-show="alert1">
						<div>
								<div>
										<p>送给  <span class="til-name">{{issuserArr.investorsName}}</span></p>
										<input type="number" v-model="xingNum">
										<div class="img-k">
												<img src="../../assets/img/home/star@2x.png" alt="">
												<span class="shu"> {{user_num}} 可用</span>
										</div>
										<div class="btn-el">
												<button class="quxiao" @click="quxiao">取消</button>
												<button class="queren" @click="queren">确认</button>
										</div>
								</div>
						</div>
				</div>
		</div>
</template>

<script>
		import Head from '@/components/public/headNav'
		import DongTai from '@/components/public/issuser'
		import timeCom from '@/components/public/timeCom'
		import Introduction from '@/components/public/introduction'
		import Journalism from '@/components/index/Xlist'
		import { Toast } from 'mint-ui';
    export default {
        name: "toupiao",
				data(){
        		return {
								tabList:['简介', '时间商品', '动态', '新闻'],
								currentIndex:0,
								listIndex:null,
								code:'',
								token:'',
								issuserArr:{},
								issuserArr1:{},
								alert1:false,
								xingNum:'',
								user_num:0,
								investorsId:'',
								dongtai1:{},
								dtShow:true,
								dataJson:[],   //新闻列表
						}
				},
				created(){
						//本ye数据
        		this.token = localStorage.getItem('userName');
						localStorage.setItem('code',this.$route.query.code);
        		if(this.token){
								console.log(this.$route.query.voteNewId);
								this.code = this.$route.query.code;
								this.$axios.post(url+'/api/investors/findInvestors',this.$qs.stringify({
										token:this.token,
										investorsCode:this.code,
								})).then((res) => {
										console.log(res.data);
										if(res.data.status == 0){
												this.issuserArr = res.data.issuerDatabase;
												this.issuserArr1 = res.data.issuerDatabase.userTeam;
												this.investorsId = res.data.issuerDatabase.investorsId
										}else{

										}
								})
						}else{
								// this.$router.push('/signin')
						}
				},
				mounted(){
						// this.token = localStorage.getItem('userName');
				},
				methods:{


						back(){
								this.$router.go(-1)
						},
						//星光排行
						topR(imgUrl){
								// this.$router.push('');
								this.$router.push({
										path: '/xgph',
										name: 'xgph',
										query: {
												imgUrl:imgUrl,
												id:this.investorsId,
										}
								})
						},
						tabClick(index){
								this.currentIndex =index;
								if(index == 2){
										this.dongtai()
								}else if(index == 3){
										this.getJsonData();
								}else if(index ==1){
										// 父调子方法
										console.log(this.$refs.timeCom)
										this.$refs.timeCom.yuyueJson();
								}
						},
						//送星光
						song(){
								this.alert1 = true;
								console.log(this.token);
								this.$axios.post(url+'/api/user/getUserInfo',this.$qs.stringify({
										token:this.token
								})).then((res) => {
										console.log(res.data);
										this.user_num = res.data.data.starlight_num;
								})
						},
						quxiao(){
								this.alert1 = false
						},
						queren(){
								//送星光接口
								this.$axios.post(url+'/api/user/updateStarlightNum',this.$qs.stringify({
										token:this.token,
										operatingType:'0',
										starlightNum:this.xingNum,
										tInvestorsId:this.investorsId,
										recordId:this.$route.query.voteNewId,
										voteNewId:this.$route.query.voteNewId,
								})).then((res) => {
										console.log(res.data);
										switch (res.data.status)
										{
												case '0':
														this.issuserArr1.starlightNum += parseInt(this.xingNum);
														Toast({
																message: '赠送成功',
																position: 'bottom',
																duration: 1000
														});
														break;
												default:
														Toast({
																message: res.data.message,
																position: 'bottom',
																duration: 1000
														});
										}
										this.alert1 = false;
										this.xingNum = '';
								})
						},
						//动态接口
						dongtai(){
								this.$axios.post(url+'/sxz/api/findSxzRecordPageList',this.$qs.stringify({
										token:this.token,
										userId:this.issuserArr1.userId,
								})).then((res) => {
										console.log(res.data);
										if(res.data.status == 0){
												this.dongtai1 = res.data.data.list;
												this.dtShow = true ;
										}else{
												Toast({
														message: '暂无动态信息',
														duration: 1000
												});
												this.dtShow = false ;
										}
								})
						},
						//新闻list
						getJsonData(){
								this.$axios.post(url+'/api/investors/findInvestorsNewsInformation',this.$qs.stringify({
										token:this.token,
										investorsCode: this.code  ,  //  发行人代码
								})).then((res) => {
										console.log(res.data);
										if(res.data.status == 0){
												this.dataJson = res.data.data;
												if(res.data.data.length <= 0){
														Toast({
																message: '暂无星讯信息',
																duration: 1000
														});
												}
										}

								}).catch((err) => {
										console.log(err);
								})
						}

				},
				components:{
        		Head,
						DongTai,
						Introduction,
						timeCom,
						Journalism,
				}
    }
</script>

<style scoped lang="scss">
		$color:#ff5558;
		.display{
				display: flex;
				justify-content: space-between;
				align-items: center;
		}
		.zanwu{
				text-align: center;
				line-height: .8rem;
				color: #999;
		}
		.con-top{
				@extend .display;
				border-bottom: 1px solid #eee;
				height: 1.1rem;
				padding: 0 .15rem;
				.con-top-left{
						@extend .display;
						>img{
								width: .7rem;
								height: .7rem;
								border-radius: 50%;
								margin-right: .1rem;
						}
						.left-con{
								.iconfont{
										font-size: .2rem;
								}
								.icon-fans{
										color: $color;
								}
								.icon-touPiao{
										color: #F5A623;
								}
								img{
										width: .12rem;
										height: .12rem;
								}
								p{
										font-size: .16rem;
										color: $color;
										line-height: .2rem;
										span{
												font-size: .12rem;
												color: #9013FE;
												line-height: .14rem;
										}
								}
						}
				}
				.con-top-right{
						box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);
						border-radius: 3px;
						width: 1.4rem;
						height: .7rem;
						line-height: .32rem;
						text-align: center;
						color: #fff;
						background: #ff5558;
						position: relative;
						p{
								@extend .display;
								justify-content: center;
								b{
										margin: 0 .1rem;
										font-size: .24rem;
								}
						}
						.top_img{
								width: .45rem;
								height: .45rem;
								position: absolute;
								top: 0;
								left: 0;
								background: url("../../assets/img/home/vote_corner@2x.png") no-repeat;
								-webkit-background-size: 100% 100%;
								background-size: 100% 100%;
								img{
										width: .32rem;
										height: .32rem;
										position: absolute;
										top: -6px;
										left: 2px;
										z-index: 99;
								}
						}
				}
				.activefirst{
						color: #333333;
						background: -webkit-linear-gradient(0deg, #F4DE85 0%, rgba(244,222,133,0.60) 100%); /* Safari 5.1 - 6.0 */
						background: -o-linear-gradient(0deg, #F4DE85 0%, rgba(244,222,133,0.60) 100%); /* Opera 11.1 - 12.0 */
						background: -moz-linear-gradient(0deg, #F4DE85 0%, rgba(244,222,133,0.60) 100%); /* Firefox 3.6 - 15 */
						background: linear-gradient(0deg, #F4DE85 0%, rgba(244,222,133,0.60) 100%); /* 标准的语法 */
						p{color: #ff5558}
				}
				.activelast{
						color: #fff;
						background: #ff5558;
				}

		}
		/*菜单*/
		.nav{
				text-align: center;
				border-bottom: 1px solid #ddd;
				@extend .display;
				justify-content: space-around;
				height: .36rem;
				p{
						display: block;
						padding: 8px 0;
						&.active{
								border-bottom: 2px solid $color;
								color: $color;
						}
				}
		}
		.mescroll{
				position: fixed;
				top: .5rem;
				bottom: .5rem;
				height: auto;
		}
		.footer{
				position: fixed;
				z-index: 1;
				background: #fff;
				border-top: 1px solid #ccc;
				bottom: 0;
				height: .5rem;
				width: 100%;
				li{
						margin: auto;
						text-align: center;
						width: 35%;
						color: $color;
						img{
								width: .29rem;
						}
						p{
								font-size: .11rem;
						}
				}
		}
		.el-motai{
				position: fixed;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background: rgba(0,0,0,.4);
				>div{
						width: 100%;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						>div{
								border-radius: 5px;
								width: 60%;
								overflow: hidden;
								background: #fff;
								text-align: center;
						}
						p{
								line-height: 3;
						}
						.til-name{
								color: #FF5558;
						}
				}
				.img-k{
						height: .35rem;
						display: flex;
						justify-content: center;
						align-items: center;
						img{
								width: .15rem;
								margin-right: 5px;
						}
						color: #9013FE;
				}
				input{
						height: .25rem;
						border-radius: 4px;
						border: 1px solid #aaa;
				}
				input::placeholder{
						text-align: center;
				}
				.btn-el{
						display: flex;
						button{
								width: 50%;
								height: .35rem;
								background: #fff;
								border: 1px solid #ccc;
						}
				}
		}
</style>