<template>
		<div class="quotation">
				<my-head :text="til"></my-head>
				<div class="con-midd mescroll">
						<div class="wparent">
								<wissuser :wid='wid' :wlistnum='cList'></wissuser>
						</div>
						<!--回复评论-->
						<div class="wpadd" v-if='cList!=0'>
								<div class="wpaddBox">
										<!--1-->
										<div class="wcomment" v-for='(item,index) in wmsg.cList'>
												<p class="wsize12" v-if='item.commentType==1'
													 @click="focusclick(item.id,item.userId,item.userName)">
														<span>{{item.userName}}:</span>
														<span class='hWrap'>{{item.rComment}}</span>
												</p>
												<p class="wsize12" v-if='item.commentType==2'
													 @click="focusclick(item.id,item.userId,item.userName)">
												<span>
														<i>{{item.userName}}</i><i class="wblue">回复</i><i>{{item.reUserName}}:</i>
												</span>
														<span class="hWrap">{{item.rComment}}</span>
												</p>
												<!--<p class="wsize12"><span><i class="wred">吴秀波</i><i class="wblue">回复</i><i>a分隔符：</i></span><span>恩GREE资孤儿股和E资孤儿股和E资孤儿股和资孤儿股和入股</span></p>-->
										</div>
								</div>
						</div>
				</div>
				<!--发表评论组件-->
				<div class="wpublish">
						<div class="whPublish dis2">
								<div class="whSmall dicenter">
										<span class="iconfont icon-face wsize24"></span>
								</div>
								<input type="text" :placeholder="textPlas" v-model="inputContent" v-focus="focusState"/>
								<div class="whGray" @click="commentTap">
										<span :class="{commentClass:inputContent!=''}">评论</span>
								</div>
						</div>
				</div>
		</div>
</template>

<script>
		import Head from "@/components/mine/headMe"
		import wissuser from './../public/wissuser'
		import Wpublish from './wpublish'
		import { Toast } from 'mint-ui';
		import Vue from 'vue'

		export default {
				name: "index",
				data() {
						return {
								ci:true,
								til:["动态详情"],
								wid:this.$route.query.wid,
								inputContent:"",
								wmsg:'',
								rid:'',
								userId:'',
								reUserId:'',
								reCommentId:'',
								cList:'',
								commentType:1,
								textPlas:'输入评论',
								focusState:false,
						}
				},
				components:{
						wissuser,
						"my-head":Head,
						"wpublish":Wpublish
				},
				directives: {
						focus: {
								update: function (el, {value}) {
										if (value) {
												el.focus()
										}
								}
						}
				},
				mounted(){
						//调取数据
						this.shuju()
				},
				methods: {
						focusclick (id,usid,name) {
								if(this.ci){
										this.focusState = true;
										this.ci = false;
										this.commentType = 2;
										this.reUserId = usid;
										this.reCommentId = id;
										this.textPlas = '回复'+name
								}else{
										this.focusState = false;
										this.ci = true;
										this.textPlas = '输入评论';
								}
						},
						//数据显示
						shuju(){
								let token=localStorage.getItem("userName");
								this.$axios({
										headers:{'Content-Type':'application/x-www-form-urlencoded'},
										method: "POST",
										url: url+"/sxz/api/findSxzDetails",
										data: this.$qs.stringify({
												token:token,
												id:this.wid
										})
								}).then(res=> {
										console.log(res.data);
										if(res.data.status==0){
												this.wmsg=res.data.data //赋值
												this.rid=res.data.data.id;
												this.cList=this.wmsg.cList.length//赋值评论的长度
										}
								}).catch(err=>{
										console.log(err);
								});
						},
						//点击评论
						commentTap(){
								var token=localStorage.getItem("userName");
								//评论内容为空不可以提交
								if(this.inputContent==''){
										Toast({
												message:'评论内容不能为空',
										});
								}else{
										//有内容 可提交
										if(this.commentType==1){
												//commentType为1的时候、传rid：朋友圈id、rComment：朋友圈评论、commentType：评论类型：  1：对活动评论
												console.log('commentType==1');
												this.$axios({
														headers:{'Content-Type':'application/x-www-form-urlencoded'},
														method: "POST",
														url: url+"/sxzComment/api/saveSxzComment",
														data: this.$qs.stringify({
																token:token,
																rid:this.rid,//动态id
																rComment:this.inputContent,//输入框内容
																createTime:new Date(),//创建时间
																commentType:1,//2
																reUserId:'',
																reCommentId:'',
														})
												}).then(res=> {
														console.log(res.data);
														if(res.data.status==0){
																this.cList+=1
																this.inputContent='';
																//刷新评论
																this.shuju()
														}else{
																var msga=res.data.message
																Toast({
																		message:msga,
																});
														}
												}).catch(err=>{
														console.log(err);
												});
										}else if(this.commentType==2){//2是对用户的评论
												console.log('commentType==2');
												this.$axios({
														headers:{'Content-Type':'application/x-www-form-urlencoded'},
														method: "POST",
														url: url+"/sxzComment/api/saveSxzComment",
														data: this.$qs.stringify({
																token:token,
																rid:this.rid,//回复的rid
																rComment:this.inputContent,//输入框内容
																commentType:this.commentType,//2
																reUserId:this.reUserId,
																reCommentId:this.reCommentId,
														})
												}).then(res=> {
														console.log(res.data)
														if(res.data.status==0){
																this.commentType =1 ;
																this.cList+=1
																this.cList+=1
																this.inputContent='';
																//刷新评论
																this.shuju()
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
								}
						}
				}
		}
</script>

<style scoped lang="scss">
		$wi:100%;
		$b:1px solid blue;
		$f:flex;
		$co:column;
		$ar:space-around;
		$be:space-between;
		$start:flex-start;
		$c:center;
		$w:wrap;
		$r:right;
		$l:left;
		$bai:#fff;
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
		.wstart{
				display: $f;
				justify-content: $start;
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
		/*评论start*/
		.wsize12{
				font-size: .12rem;
		}
		.wpadd{
				padding-right: .2rem;
				margin-bottom:.1rem;
				/*border:.01rem solid red*/
		}
		.wpaddBox{
				padding:.06rem .2rem .1rem .12rem;
				width: 2.75rem;
				background: #F6F6F6;
				box-sizing: border-box;
				margin-left: .8rem;
		}
		.wcomment{
				background: #F6F6F6;
				width: 2.55rem;
				box-sizing: border-box;
				line-height: .22rem;
  	
				span:nth-child(1){
						color: #4A90E2;
				}
				i{
						font-style: normal;
				}
		}
		/*组件padding*/
		.quotation{
				height: 100%;
				display: flex;
				flex-direction: column;
				.wparent{
						.issuser{
								padding-bottom: 0;
						}
				}
				.con-midd{
						flex-grow: 1;
						height: 50%;
				}
		}
		.wblue{
				color: #333;
		}
		.whPublish{
				width: 100%;
				height: .5rem;
				border-top:.01rem solid #E5E5E5;
				padding:0 .15rem  0 .15rem ;
				background: $bai;
				box-sizing: border-box;
				input{
						width: 2.36rem;
						height: .32rem;
						border-radius: .2rem;
						border:1px solid #BCBCBC;
						background: #F6F6F6;
						outline: none;
						text-indent: 1em;
						font-size: .14rem;
				}
				input::-webkit-input-placeholder{ /*WebKit browsers*/
						text-align: left;
						font-size: .14rem;
				}
		}
		.whSmall{
				width: .24rem;
				height: .24rem;
				.wsize24{
						font-size: .5rem;
				}
		}
		.whGray{
				span{
						display: block;
						width: .56rem;
						height: .3rem;
						background:  #D6D6D6;
						border-radius: .1rem;
				}
		}
		.whGray{
				width: .56rem;
				height: .3rem;
				border-radius: .1rem;
				color: $bai;
				text-align: center;
				line-height: .3rem;
		}
		.commentClass{
				background: #FF5558 !important;
		}
		.hWrap{
				word-break:break-all; /* 支持IE和chrome，FF不支持*/
				word-wrap:break-word; /* 以上三个浏览器均支持 */
		}
</style>
