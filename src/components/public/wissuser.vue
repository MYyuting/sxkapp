<template>
		<div class="wbtm">
				<div class="issuser">
						<div class="left_img">
								<img :src="wmsg.avatar" alt="">
						</div>
						<div class="right_content">
								<div class="right_title">
										<span class="right_title_name">{{wmsg.userName}}<img src="./../../assets/img/tip/fans@2x.png" alt=""></span>
										<span class="right_time">{{wmsg.grTime}}</span>
								</div>
								<router-link to="/wdynamic" tag="div" class="right_matter" @click="dynamic()" >
										<div class="right_matter_content">
												{{wmsg.grText}}
										</div>
										<div class="right_matter_img">
												<div class="img" v-for="(item1,indexa) in wmsg.imgPaths" :style="{'background-image': 'url(' + item1 + ')'}" @click.stop="imgClickShow(item1)">
														<!--<img :src="'http://xsk.quanxiankaibo.com'+item1.path" alt=""-->
														<!--v-for="(item1,indexa) in wmsg.aList" @click="imgClickShow(item1.path)">-->
												</div>
										</div>
								</router-link>
								<div class="right_bottom">
										<!--心-->
										<div v-show="wmsg.isOfficialService !=3" class="right_start1" @click="giveLikeTap">
												<img v-if="wmsg.isFlag == 'true'" src="./../../assets/img/news/like_selected@2x.png" alt="">
												<img v-if="wmsg.isFlag == 'false'"  src="./../../assets/img/news/like_normal@2x.png" alt="">
												<span>{{pListNum}}</span>
										</div>
										<!--星-->
										<div v-show="wmsg.isOfficialService == 3" class="right_start" @click="songBtn">
												<img src="./../../assets/img/home/star@2x.png" alt="">
												<span>{{wmsg.starlightNum}}
														<i>({{wmsg.sendstarlightNum}})</i>
												</span>
										</div>
										<div class="right_message">
												<img src="./../../assets/img/news/comment@2x.png" alt="">
												<span>{{wlistnum}}</span>
										</div>
										<div v-show="wmsg.isBen != 'false'" class="lerse" @click="wdel()">
												<img src="./../../assets/img/news/deleteNews@2x.png" alt="">
										</div>
								</div>
						</div>
				</div>

				<!--图片查看-->
				<div id="imgShow" v-show="imgShow" @click="motai">
						<div>
								<img :src="imgUrlShow" alt="">
						</div>
				</div>

				<!--弹框-->
				<div class="el-motai" v-show="alertS" @touchmove.prevent>
						<div>
								<div>
										<p>送给  <span class="til-name">{{wmsg.userName}}</span></p>
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
		import {Toast, MessageBox } from 'mint-ui';
		import { Indicator } from 'mint-ui';
		export default {
				name: "wissuser",
				props:['wid','wlistnum'],
				data(){
						return{
								wmsg:'',
								imgUrlShow:'',
								imgShow:false,
								isType:0,    //  判断是不是发行人 3是 其他不是
								pListNum:0,
								alertS:false,
								user_num:0,
								xingNum:'',
								token:'',
						}
				},
				mounted(){
						this.token = localStorage.getItem('userName');
						var that=this
						setTimeout(function(){
								console.log('fuzhhhhhhhh')
								console.log(that.wlistnum)
						},200)
						console.log(that.wlistnum)
					
						Indicator.open({
								text: 'Loading...',
								spinnerType: 'fading-circle'
						});
						this.$axios({
								headers:{'Content-Type':'application/x-www-form-urlencoded'},
								method: "POST",
								url: url+"/sxz/api/findSxzDetails",
								data: this.$qs.stringify({
										token:this.token,
										id:this.wid
								})
						}).then(res=> {
								console.log("详情");
								console.log(res.data);
								if(res.data.status==0){
										Indicator.close();//关闭loding
										this.wmsg=res.data.data //赋值
										if(this.wmsg.pList.length >0){
												this.pListNum = this.wmsg.pList.length;
										}
										this.isType = res.data.userType;
										console.log('节时间');
										// 截取所需时间
										var wtime=this.wmsg.grTime;
										var jiequ=wtime.slice(10,16);
										this.wmsg.grTime=jiequ;
//						      	 this.cList=this.wmsg.cList.length
								}else if(res.data.status == '101'){
										this.$router.push('/signin')
								}else{
										setTimeout(function(){
											Indicator.close();//关闭loding
										},1000)
								}
						}).catch(err=>{
								console.log(err);
						});
				},
				methods:{
						//送星光弹出
						songBtn(){
								this.alertS = true;
								// this.id = this.product[index].id;
								this.$axios.post(url+'/api/user/getUserInfo',this.$qs.stringify({
										token:this.token
								})).then((res) => {
										console.log(res.data);
										this.user_num = res.data.data.starlight_num; //可用星光
								})
						},
						//取消投票
						quxiao(){
								this.alertS = false;
								this.xingNum = '';
						},
						//确认投票
						queren(){
								this.$axios.post(url+'/api/user/updateStarlightNum',this.$qs.stringify({
										token:this.token,
										starlightNum:this.xingNum,// 星光数
										tInvestorsId:this.wmsg.tInvestorsId,//发行人id
										recordId:this.wmsg.id,
										voteNewId:'',  //只有0传
										operatingType:'2',//0:投票赠送、1申购赠送、2发行人动态赠送、
								})).then((res) => {
										console.log(res.data);
										switch (res.data.status)
										{
												case '0':
														this.product[this.index].starlightNum += parseInt(this.xingNum);
														Toast({
																message: '赠送成功',
																duration: 1000
														});
														break;
												default:
														Toast({
																message: res.data.message,
																duration: 1000
														});
										}
										this.alertS = false;
										this.xingNum = '';
								}).catch((err) => {
										console.log(err);
								})
						},
						//删除
						wdel(){
								MessageBox.confirm('确定删除这条动态吗?',"").then(action => {
										console.log("确定")
										var token=localStorage.getItem("userName");
										this.$axios({
												headers:{'Content-Type':'application/x-www-form-urlencoded'},
												method: "POST",
												url: url+"/sxz/api/delRecord",
												data: this.$qs.stringify({
														token:token,
														id:this.wid
												})
										}).then(res=> {
												console.log(res);
												if(res.data.status==0){
														this.$router.back(-1)
												}else{
														//否则提示
														var msga=res.data.message;
														Toast({
																message:msga,
														});
												}
										}).catch(err=>{
												console.log(err);
										});
								}, action => {
										console.log("取消")
								})
						},

						//		点击图片
						imgClickShow(path){
								// console.log(path);
								this.imgShow = true;
								this.imgUrlShow = path;
						},
						//		模态图片框
						motai(){
								this.imgShow = false;
						},
						//点赞
						giveLikeTap(){
								//根据后台给的是否点赞判断
								var isFlag=this.wmsg.isFlag
								var pList=this.wmsg.pList
								var token=localStorage.getItem("userName");
								//isFlag=='false' 未点赞 发送isLove=1 要点赞
								if(isFlag=='false'){
										//数据
										this.$axios({
												headers:{'Content-Type':'application/x-www-form-urlencoded'},
												method: "POST",
												url: url+"/sxz/api/savePraise",
												data: this.$qs.stringify({
														token:token,
														rid:this.wmsg.id,
														isLove:1
												})
										}).then(res=> {
												if(res.data.status==0){
														console.log("点赞111")
														this.wmsg.isFlag='true'
														this.pListNum = this.pListNum +1
														console.log(this.wmsg)
												}else{
														var msga=res.data.message
														Toast({
																message:msga,
														});
												}
										}).catch(err=>{
												console.log(err);
										});
										//isFlag=='true' 点赞 发送isLove=0 取消点赞
								}else if(isFlag=='true'){
										//数据
										this.$axios({
												headers:{'Content-Type':'application/x-www-form-urlencoded'},
												method: "POST",
												url: url+"/sxz/api/savePraise",
												data: this.$qs.stringify({
														token:token,
														rid:this.wmsg.id,
														isLove:0
												})
										}).then(res=> {
												console.log(res)
												if(res.data.status==0){
														console.log("取消点赞22")
														this.wmsg.isFlag='false'
														this.pListNum = this.pListNum - 1;
														console.log(this.wmsg)
												}else{
														var msga=res.data.message;
														Toast({
																message:msga,
														});
												}
										}).catch(err=>{
												console.log(err);
										});

								}
						},
				},
		}
</script>
<style scoped lang="scss">
		$color:#ff5558;
		#imgShow{
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: #333;
				z-index: 2222;
				div{
						overflow-y: auto;
						height: 100%;
						display: flex;
						align-items: center;
						img{
								width: 100%;
						}
				}
		}
		.issuser{
				display: flex;
				justify-content:center;
				align-items: flex-start;
				padding:.15rem .2rem .15rem .1rem;
				.left_img{
						width:.5rem;
						height:.5rem;
						border-radius:50%;
						margin-right: .16rem;
						overflow: hidden;
						img{
								max-width: 100%;
								min-height: 100%;

						}
				}
				.right_content{
						/*padding-left: .1rem;*/
						width: 2.6rem;
						flex-grow: 1;
						.right_title{
								.right_title_name{
										font-size:.16rem;
										color:$color;
										font-weight:bold;
										img{
												width:.2rem;
										}
								}
								.right_time{
										float:right;
										font-size:.14rem;
										color:#999;
								}
						}
						.right_matter{
								.right_matter_content{
										padding:.1rem 0;
										line-height:1.4;
								}
								.right_matter_img{
										width: 2.6rem;
										display: flex;
										flex-wrap: wrap;
										.img{
												width: .84rem;
												height: .84rem;
												margin:0 1px;
												margin-bottom: .02rem;
												background-size: cover;
												background-repeat: no-repeat;
												background-position: center;
												overflow: hidden;
												img{
														max-width: 100%;
														min-height: 100%;
												}
										}
								}
						}
						.right_bottom{
								height:.5rem;
								line-height:.5rem;
								>div{
										display: inline-block;
								}
								.right_start{
										img{width:.16rem;vertical-align: middle;}
										span{
												color:#9013FE;
										}
								}
								.right_start1{
										img{width:.24rem;height: .24rem;}
								}
								.right_message{
										margin-left:.2rem;
										img{width:.24rem;}
										span{
												color:#999;
										}
								}
								.lerse{
										float:right;
										img{
												height:.3rem;
										}
								}
						}
				}
		}
		.el-motai{
				position: fixed;
				z-index: 9999;
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
<style>
		.mint-msgbox-confirm{
				color:#FF5558
		}
		.mint-msgbox-cancel{
				color:#AAAAAA
		
		}
		.mint-msgbox-message {
				color: #333;
		}
</style>