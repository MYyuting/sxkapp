<template>
    <div class="home_page">
        <My-head></My-head>
				<div id="mescroll" class="mescroll">
						<!--轮播banner-->
						<div class="banner">
								<swiper v-if="arrImg.length>0"  :options="swiperOption" id="baner" ref="mySwiper">
										<swiper-slide v-for="(item,index) in arrImg" :key="index">
												<a  @click="clickLink(item.adv_adder)"><img :src="item.adv_Info" alt=""></a>
										</swiper-slide>
										<div class="swiper-pagination" slot="pagination"></div>
								</swiper>
						</div>
						<!--通知-->
						<div  class="list">
								<!--<swiper class="list">-->
										<div v-for="(item,index) in noticeList" :key="index">
												<img src="../../assets/img/home/notice@2x.png" alt="">
												<marquee class="list-font">
														<span style="font-weight: bold">{{item.notice_type}}</span>
														<a :href="item.go_url">{{item.notice_msg}}</a>
												</marquee>
										</div>
								<!--</swiper>-->
						</div>

						<div class="content">
								<div>
										<Home-s :buyList="shenGouList" v-if="flag" v-show="!shenGouListShow"></Home-s>
								</div>
								<!--投票上新-->
								<div v-show="votePeopleList.length>0" class="tpView">
										<div class="tilt tilt1">
												<span>投票上新</span>
												<div class="tilt_time">
														<p to="/upnew" @click="tpqb">全部</p><i class="el-icon-arrow-right"></i>
												</div>
										</div>
										<Tou-new :text="votePeopleList"></Tou-new>
								</div>
								<!--星讯-->
								<div class="xinxun">
										<div class="tilt tilt1">
												<span>星讯</span>
										</div>
										<x-list :text="newsInformationList"></x-list>
								</div>
						</div>
				</div>
		</div>
</template>

<script>
		import HeadNav from "@/components/public/hadeNav"
		import HomeS from "@/components/public/homeS"
		import Tpsx from "@/components/index/tpsx"
		import Xlist from "@/components/index/Xlist"
		import MeScroll from 'mescroll.js'
		import { swiper, swiperSlide } from 'vue-awesome-swiper'
		import { Toast,MessageBox} from 'mint-ui';
		export default {
        name: "index",
        data(){
						return{
								mescroll:null,
								flag:false,
								swiperOption:{
										loop:true,
										loopAdditionalSlides:1,
										autoplay: {
												disableOnInteraction: false,
												delay: 3000,//1秒切换一次
										},
										observer:true,
										observeParents:true,
										pagination: {
												el: '.swiper-pagination',
										},
								},
								arrImg:[],      //轮播
								noticeList:[],  // 消息滚动
								newsInformationList:[],   //星讯
								votePeopleList:[],     //投票
								shenGouList:[],     //申购
								shenGouListShow:false,
								token:'',
						}
				},
				beforeMount(){
						var u = navigator.userAgent;
						console.log(this.$store.state.version);
						if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
								var PhoneType = 'ios'
						}else if(u.indexOf('Android') > -1){
								var PhoneType = 'Android'
						}
						//获取版本信息
						this.$axios.post(url+'/miao/userCheckVersion.do',this.$qs.stringify({
								osType:PhoneType,
								clientVersion:this.$store.state.version,
								uuid:''
						})).then(res =>{
								console.log(res.data);
								if(res.data.OBJECT.version != this.$store.state.version){
										MessageBox({
												title: '版本升级',
												message: '确认升级新版本吗?',
												showCancelButton: true,
												closeOnClickModal:false,
												confirmButtonText:'更新',
												cancelButtonText:'退出应用'
										}).then(action => {
												console.log(action);
										    if(action == 'confirm'){
										    		console.log('更新');
														window.location.href= res.data.OBJECT.redirectlocation ;
												}else{
														plus.runtime.quit();
												}
										});
								}
						})
				},
				mounted (){
						//这边就可以使用swiper这个对象去使用swiper官网中的那些方法
						// this.swiper.slideTo(0, 0, false);
						this.token=localStorage.getItem("userName");

						var self = this;
						self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
								down: {
										callback: this.downCallback, //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
										hardwareClass:'mescroll-hardware'
								},
								up:{
										use:false,
								}
						});
				},
				methods:{
        		//点击投票全部
						tpqb(){
								if(this.token){
										this.$router.push('/upnew');
								}else{
										this.$router.push('/signin');
								}
						},
        		//点击跳转外部链接
						clickLink(src){
								this.$router.push({
										path:'/webview',
										query:{
												url:src
										}
								})
						},
        		//下拉刷新
						downCallback(){
								//首页数据
								this.$axios.get(url+'/api/main/index',this.$qs.stringify({
										token:this.token,
								})).then((res) => {
										console.log(res.data);
										if(res.data.status == 0){
												this.arrImg = res.data.advertList;   //banner
												this.noticeList = res.data.noticeList;  // 消息滚动
												this.newsInformationList=res.data.newsInformationList;  //星讯
												this.votePeopleList = res.data.votePeopleList;   //投票
												console.log(this.votePeopleList);
												//申购
												if(res.data.buyList.length > 0){
														this.shenGouList = res.data.buyList;   //申购
														console.log(this.shenGouList);
														this.flag = true;
														this.shenGouListShow = false;
												}else{
														this.shenGouListShow = true
												}
												setTimeout(() => {
														this.mescroll.endSuccess();
												},1000);
										}else {
												this.mescroll.endSuccess();
										}
								}).catch((err) => {
										console.log(err);
										this.mescroll.endErr();
								});
						},
						//上啦加载
						upCallback(){

						}
				},
				components:{
						"My-head":HeadNav,
						"Home-s":HomeS,
						"Tou-new":Tpsx,
						"x-list":Xlist,
						swiper,
						swiperSlide
				}
		}
</script>
<style>
		#baner .swiper-pagination-bullet{
				background: #fff !important;
				opacity: 1 !important;
		}
		#baner .swiper-pagination-bullet-active{
				background: #ff5558 !important;
		}
</style>
<style scoped lang="scss">


		/*mescroll滚动的区域*/
		.mescroll {
				position: fixed;
				top: .5rem;
				bottom: .5rem;
				height: auto;
		}
		.home_page{
				display: flex;
				flex-direction: column;
		}
		.banner{height: 1.81rem;}
		.banner img{
				width: 100%;
				height:1.8rem;
				display: block;
		}
		.content{
				>div+div{
						padding: 0 .1rem;
						border-bottom: 4px solid #f2f2f2;
				}
				.xinxun{
						padding-bottom: .1rem;
				}
		}
		.list{
				height: .35rem;
				border-bottom: 5px solid #f2f2f2;
		}
		.list div{
				display: flex;
				height: 100%;
				align-items: center;
				padding: 0 .1rem;
				box-sizing: border-box;
		}
		.list img{
				width: .12rem ;
				height: .12rem;
				margin-right: .08rem;
		}
		.list-font{
				font-size: .14rem;
				letter-spacing: 0;
				width: 100%;
				box-sizing: border-box;
				span{position: relative;display: inline-block;margin-right: 8px;height: .2rem;}
				span::after{
						content: '';
						position: absolute;
						top: 4px;
						right: -7px;
						height: .13rem;
						border-left: 2px solid #444;
				}
				a{
						text-decoration: none;
						color: #333;
				}
		}
		.tilt{
				display: flex;
				justify-content: space-between;
				align-items: center;
				>span{
						border-left: 2px solid #FF5558;
						padding-left: .1rem;
				}
		}
		.tilt1{
				padding: .12rem 0 .18rem;
				.tilt_time{
						display: flex;
						align-items: center;
				}
				p{
						font-size: .12rem;
						color: #999;
						text-decoration: none;
				}
		}

</style>
