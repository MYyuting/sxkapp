<template>
    <div class="mine">
        <!--头部-->
        <div class="nav">
		        <div class="left" v-bind:class="deng ? '' : 'dis'">
								<div @click="alertShow = true" class="avatarImg" :style="{backgroundImage:'url(' + imageUrl + ')'}">
										<!--<img :src="imageUrl" :onerror="defaultImg" alt="">-->
								</div>
								<span v-show="flag1">{{info.userName}}</span>
								<input v-show="flag2" type="text" class="size14" v-model="info.userName">
								<i class="iconfont icon-editName" v-show="flag1" @click="nameClick"></i>
								<i class="iconfont icon-editName_done" v-show="flag2" @click="nameClick1"></i>
						</div>
            <div class="right" @click="setting"><i class="iconfont icon-setting"></i></div>
        </div>
        <!--中间部分-->
        <div id="mescroll" class="mescroll">
            <!--没有登陆-->
            <div class="head" v-show="!deng">
                <button @click="denglvClick">登录 / 注册</button>
            </div>
            <!--登陆状态-->
						<div class="head1" v-show="deng">
								<!--资产-->
								<div class="Assets">
										<div class="til">
												<span class="iconfont icon-countDetail" @click="minxi(1)"></span>
												<p>总资产</p>
												<label>CNY</label>
										</div>
										<div class="Number" >{{gerenData.generalAssets}}</div>
										<div><span>可用余额：</span> <span>{{gerenData.userPurse}}</span></div>
										<div><span>已购市值：</span> <span>{{gerenData.positionPrice}}</span></div>
										<div><span>冻结金额：</span> <span>{{gerenData.frozenFund}}</span></div>
								</div>
								<!--消费星光-->
								<div class="Assets">
										<div class="til">
												<span class="iconfont icon-countDetail" @click="minxi(2)"></span>
												<p>累计消费星光</p>
												<img src="../../assets/img/news/giveStar@2x.png" alt="">
										</div>
										<div class="Number" >{{xgdata.consumptionNum}}</div>
										<div><span>可用星光：</span> <span>{{xgdata.availableNum}}</span></div>
										<div><span>累计获得：</span> <span>{{xgdata.incomeNum}}</span></div>
								</div>
						</div>
						<div class="tab">
								<div @click="recharge"><span class="iconfont icon-accountIn"></span> 账户充值</div>
								<div @click="forward"><span class="iconfont icon-accountOut"></span> 账户提现</div>
						</div>
						<!--列表-->
						<div class="MineList">
								<div v-for="(item,index) in Arrlist" @click="listClick(index)">
										<div>
												<i :class="item.icon"></i>{{item.til}}
										</div>
										<div class="el-icon-arrow-right"></div>
								</div>
						</div>
				</div>
				<div class="alert" v-show="alertShow" @click="alertShow=false">
						<div>
								<div>
										<el-upload
												class="avatar-uploader"
												:action="'http://xsk.quanxiankaibo.com/api/user/changeAvatar?token='+token"
												:show-file-list="false"
												:on-success="handleAvatarSuccess"
												:before-upload="beforeAvatarUpload">
												<img style="display: none" v-if="imageUrl " :src="imageUrl" class="avatar">
												<p  class=" avatar-uploader-icon">相册</p>
										</el-upload>
								</div>
								<div>取消</div>
						</div>
				</div>
		</div>
</template>

<script>
		import { MessageBox } from 'mint-ui';
		import MeScroll from "../../../static/mescroll/mescroll.min"
		import { Toast } from 'mint-ui';
		export default {
				name: "index",
				data(){
						return{
								deng:true,
								imageUrl: null,
								alertShow:false,
								flag:true,
								token:'',
								flag1:true,
								flag2:false,
								// name:"",
								Arrlist:[
										{
												icon:"iconfont icon-inviteFriend",
												til:"邀请好友",
												url:"/invitation"
										},
										{
												icon:"iconfont icon-myHome",
												til:"个人主页",
												url:"/geren"
										},
										{
												icon:"iconfont icon-consumeTime",
												til:"时间商品订单",
												url:"/xiaofei"
										},{
												icon:"iconfont icon-helpCenter",
												til:"帮助中心",
												url:"/help"
										},{
												icon:"iconfont icon-contactUs",
												til:"联系我们",
												url:"/lianxi"
										}],
								info:{
										userName:'',
								},
								flla:false,
								gerenData:{
										generalAssets:'0.00',
										userPurse:'0.00',
										positionPrice:'0.00'
								},
								xgdata:{
										consumptionNum:'0.00',
										availableNum:'0.00',
										incomeNum:'0.00'
								},
								defaultImg: 'this.src="' + require('../../assets/img/toux.png') + '"',
								avatar:'',
						}
				},
				mounted(){
						// token
						this.token = localStorage.getItem('userName');
						this.getInfo();

				},
				methods:{
						//个人账号信息
						getDate(){
								this.$axios.post(url+'/api/user/getUserInfo',this.$qs.stringify({
										token:this.token,
								})).then((res) =>{
										console.log(res.data.data);
										this.info = res.data.data;
					  				localStorage.setItem('phone',res.data.data.userTel);
										localStorage.setItem('userType',res.data.data.isOfficialService);
										if(!res.data.data.userAvatar){
												this.imageUrl = require('../../assets/img/toux.png');
										}else{
												this.imageUrl = res.data.data.userAvatar
										}
								})
						},
						//获取个人详情数据  总资产
						getInfo(){
								this.$axios.post(url+'/miao/queryTotalWorth.do',this.$qs.stringify({
										token:this.token,
										languageType:3,
								})).then((res) => {
										console.log(res.data);
										if(res.data.STATUS == 3){
												localStorage.removeItem('userName');
												this.deng = false;
												return;
										}
										if(res.data.STATUS == 0){
												this.gerenData = res.data.OBJECT;
												this.deng = true;
												this.getxg();
												this.getDate();
										}else{
												Toast({
														message: res.data.MSG,
														position: 'bottom',
												});
										}
								}).catch((err) => {
										console.log(err);
										Toast({
												message: '网络错误',
												duration: 1000
										});
								})
						},
						//查询星光
						getxg(){
								this.$axios.post(url+'/api/userStarlightDetails/findUserStarlight',this.$qs.stringify({
										token:this.token,
								})).then((res) => {
										console.log(res.data);
										this.xgdata = res.data.data;
								})
						},
						handleAvatarSuccess(res, file) {
								this.imageUrl = URL.createObjectURL(file.raw);
								console.log(res);
								console.log(file);
								Toast({
										message: res.message,
										position: 'middle',
										duration: 500
								});
						},
						beforeAvatarUpload(file) {
								const isJPG = file.type === 'image/jpeg';
								const isLt2M = file.size < 1024*1024;
								console.log(isLt2M);
								if (!isJPG) {
										Toast({
												message: '上传图片只能是JPG格式!',
												position: 'bottom',
										});
								}
								if (!isLt2M) {
										Toast({
												message: '上传图片大小不能超过1MB!',
												position: 'bottom',
										});
								}
								return isJPG && isLt2M;
						},
						//更改名字
						nameClick(){
							this.flag2 = true;
							this.flag1 = false
						},
						//修改名字
						nameClick1(){
							MessageBox.confirm('您确定修改用户名吗?',"").then(action => {
								this.$axios({
										headers:{'Content-Type':'application/x-www-form-urlencoded'},
										method: "POST",
										url:url+'/api/user/changeNikeName',
										data:this.$qs.stringify({
												token:this.token,
												userName:this.info.userName
										})
								}).then(res=> {
												if(res.data.status==0){
														console.log(res);
														this.flag2 = false;
														this.flag1 =true;
														Toast({
																message:'修改成功',
														});
												}else{
														var msga=res.data.message;
														Toast({
																message:msga,
														});
												}
										})
										.catch(err=>{
												console.log(err);
										});
									}, action => {
								console.log("取消")
							})
						},
						recharge(){
								this.$router.push("/recharge")
						},
						forward(){
								this.$router.push("/forward")
						},
						setting(){
								this.$router.push("/setting")
						},
						listClick(index){
								this.$router.push({
									path:this.Arrlist[index].url,
									query: {
								      id:this.info.userId,
											isMy:'false',
								    }
								})
						},
						minxi(num){
								if(num == 1){
										this.$router.push("/mingxi")
								}else{
										this.$router.push("/mingxi2")
								}

						},
						denglvClick(){
								this.$router.push("/signin")
						}

				}
		}
</script>
<style>
		.avatar-uploader .el-upload {
				cursor: pointer;
				width: 100%;
		}
		.avatar-uploader-icon {
				color: #333;
				text-align: center;
		}
</style>
<style scoped lang="scss">
		$color:#ff5558;
		.dis{
				opacity: 0;
		}
		.size14{
			font-size: .14rem;
			padding: 0;
			margin: 0;
				border-bottom: 1px solid #ccc;
		}
		.iconfont{
				font-size: .23rem;
		}
		.mine{
				height: 100%;
		}
		/*mescroll滚动的区域*/
		.mescroll {
				position: fixed;
				top: .49rem;
				bottom: .49rem;
				height: auto;
		}
		.nav{
				height: .5rem;
				background: $color;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #fff;
				padding: 0 .1rem;
				.left div{
						display: inline-block;
						width: .3rem;
						height: .3rem;
						background-size: cover;
						background-position: 100% 40%;
						margin-right: .1rem;
						border-radius: 50%;
						border: 1px solid #eee;
				}
				.left{
						position: relative;
						display: flex;
						input{
								width: 1rem;
								height: .25rem;
								left: .45rem;
								top: .08rem;
								border: none;
								border-bottom: 1px solid #fff;
								background: $color;
								color: #fff;
								outline: none;
						}
						span{
								display: inline-block;
								font-size: .14rem;
								line-height: .33rem;
						}
				}
				.left i{
						font-size: .3rem;
						vertical-align: middle;
				}
		}
		.head{
				background: $color;
				padding: .6rem 0;
				text-align: center;
				button{
						color: $color;
						background: #fff;
						padding: .1rem .3rem;
						border: none;
						font-size: .14rem;
				}
		}
		.tab{
				display: flex;
				text-align: center;
				align-items: center;
				border-bottom: 5px solid #eee;
				padding: .16rem 0;
				div{
						display: flex;
						justify-content: center;
						align-items: center;
						width: 50%;
						font-size: .15rem;
						span{
								padding-right: 5px;
								color: #999;
						}
				}
				div:nth-child(1){
						border-right: 1px solid #aaa;
				}
		}
		.MineList{
				>div{
						display: flex;
						padding: .15rem;
						font-size: .15rem;
						justify-content: space-between;
						border-bottom: 1px solid #eee;
						align-items: center;
						i{
								margin-right: .1rem;
								font-size: .24rem;
								vertical-align: middle;
								color: #999;
						}
				}
				>div:nth-child(2){
						i{
								font-size: .19rem;
						}
				}
		}

		.head1{
				padding: .1rem .3rem;
				background: $color;
				.Assets{
						background-image: linear-gradient(-135deg, #FFFFFF 0%, #88DEFF 100%);
						border-radius: 5px;
						margin-bottom: .2rem;
						padding: .1rem .2rem;
						>div{
								line-height: 2;
								display: flex;
								font-size: .15rem;
								justify-content: space-between;
								align-items: center;
						}
						.til{
								height: .3rem;
								font-size: .15rem;
								span{
										color: #009fe8;
										font-size: .26rem;
								}
								p{
										font-weight: bold;
										font-size: .16rem;
								}
								img{
										width: .3rem;
										height: .3rem;
								}
						}
						.Number{
								display: block;
								text-align: center;
								font-size: .2rem;
								font-weight: 600;
								line-height: .4rem;
								height: .4rem;
						}
				}
		}
		.alert{
				position: fixed;
				z-index: 888;
				text-align: center;
				top: 0;
				background: rgba(0,0,0,.4);
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column-reverse;
				>div{
						z-index: 889;
						background: #fff;
						width: 100%;
						div{
								border-bottom: 1px solid #ccc;
						}
						div,p{
								height: .6rem;
								line-height: .6rem;
								font-size: .16rem;
						}
				}
		}
</style>
