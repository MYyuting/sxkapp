<template>
    <div class="starlight">
				<div class="tab">
						<div class="left">
                <span v-for="(item,index) in leftList"
											:class="{bottom:leftIndex == index}"
											@click="leftTab(index)">{{item.text}}</span>
						</div>
						<div class="right">
                <span v-for="(item,index) in rightList"
											:class="{bottom:rightIndex == index}"
											@click="rightTab(index)">{{item.text}}
								</span>
						</div>
				</div>

				<!--list-->
				<div class="PaiList">
						<ul v-show="!arrlistIndex">
								<li v-for="(item,index) in arrlist">
										<span v-show="index != 0 ">{{index+1}}</span>
										<div>
												<img :src="item.userAvatar" :onerror="defaultImg" alt="">
												<div class="txtView">
														<p>{{item.userName}}</p>
												</div>
										</div>
										<p class="ic-shu">
												<img class="ximg" src="../../assets/img/home/star@2x.png" alt="">
												<span class="fudu">{{item.starlightNum}}</span>
										</p>
										<button :class="item.attentionStatus ==1 ? 'active ' : ''" @click="clickBtn(index)">
												{{item.attentionStatus == 1? '取消关注' : '关注'}}
										</button>
								</li>
						</ul>
						<div v-show="arrlistIndex" class="paiwu"></div>
						<div class="tilX">
								<span>排名</span>
								<span>用户</span>
								<span>{{typeTxt}}</span>
						</div>
				</div>
				<!--<my-list v-show="rightIndex == 1"></my-list>-->
		</div>
</template>

<script>
		import List from "@/components/index/PaiList"
		import { Toast } from 'mint-ui';
    export default {
        name: "xingguang",
				data(){
						return{
								defaultImg: 'this.src="' + require('../../assets/img/toux.png') + '"',
								leftIndex:0,
								rightIndex:0,
								btnText:'关注',
								leftList:[
										{
												text:"本周"
										},
										{
												text:"上周"
										},
										{
												text:"总榜"
										}
								],
								rightList:[
										{
												text:"金主消费榜"
										},
										{
												text:"大咖收入榜"
										}
								],
								typeTxt:'消费星光',
								token:'',
								arrlist:[],
								arrlistIndex:false,
						}
				},
				mounted(){
        		this.token = localStorage.getItem('userName');

						this.getAjax()

				},
				methods:{
        		tok(){
								if(!this.token){
										return 0
								}else{
										return localStorage.getItem('userName')
								}
						},
						leftTab(index){
								this.leftIndex = index;
								this.getAjax();
						},
						rightTab(index){
								this.rightIndex = index;
								if(index == 0){
										this.typeTxt = '消费星光'
								}else{
										this.typeTxt = '收入星光'
								}
								this.getAjax();
						},
						getAjax(){
								this.$axios.post(url+'/api/userStarlightDetails/findTInvestorsStarlight',this.$qs.stringify({
										token:this.tok(),
										dateType:this.leftIndex,
										userType:this.rightIndex,
								})).then((res) => {
										console.log(res.data);
										if(res.data.status ==0){
												for(var item of res.data.userTeamList){
														if(!item.userAvatar){
																item.userAvatar = '../../assets/img/toux.png'
														}
												}
												this.arrlist = res.data.userTeamList;
												console.log(this.arrlist);
												if(this.arrlist.length == 0){
														this.arrlistIndex = true;
												}else{
														this.arrlistIndex = false;
												}

										}else{
												Toast({
														message: '暂无数据',
														duration: 1000
												});
												this.arrlistIndex = true;
										}
								}).catch((err) =>{
										console.log(err);
								})
						},
						// 点击关注
						clickBtn(index){
								let userid = this.arrlist[index].userId;
								if(this.arrlist[index].attentionStatus ==0){
										this.$axios.post(url+'/api/userAttention/addUserAttention',this.$qs.stringify({
												token:this.token,
												attentionUserId:userid,  //被关注人的userId
												attentionStatus:1,       //0取消   1关注
										})).then((res) => {
												console.log(res.data);
												if(res.data.status == 0){
														this.arrlist[index].attentionStatus = 1;
														Toast({
																message: '取消关注',
																position: 'bottom',
																duration: 1000
														});
												}else if(res.data.status == 102){
														this.$router.push('/signin')
												}else{
														Toast({
																message: res.data.message,
																position: 'bottom',
																duration: 1000
														});
												}
										}).catch((err) => {
												console.log(err);
										})
								}else{
										this.$axios.post(url+'/api/userAttention/addUserAttention',this.$qs.stringify({
												token:this.token,
												attentionUserId:userid,  //被关注人的userId
												attentionStatus:0,       //0取消   1关注
										})).then((res) => {
												console.log(res.data);
												if(res.data.status == 0){
														this.arrlist[index].attentionStatus = 0;
														Toast({
																message: '关注成功',
																position: 'bottom',
																duration: 1000
														});
												}else if(res.data.status == 102){
														this.$router.push('/signin')
												}else {
														Toast({
																message: res.data.message,
																position: 'bottom',
																duration: 1000
														});
												}
										}).catch((err) => {
												console.log(err);
										})
								}

						},
				},
				components:{
        		"my-list":List
				}
    }
</script>

<style scoped lang="scss">
		.starlight{
				position: relative;
				.tab{
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						box-sizing: border-box;
						display: flex;
						background: rgba(0,0,0,.4);
						color: rgba(255,255,255,.5);
						z-index: 999;
						justify-content: space-between;
						align-items: center;
						height: .4rem;
						padding: 0 .15rem;
						>div{
								width: 50%;
								span{
										padding-bottom: .05rem;
								}
						}
						.left span{
								margin-right: .2rem;
						}
						.left .bottom,.right .bottom{
								border-bottom: 2px solid #fff;
								color: #fff;
						}
						.right{
								display: flex;
								justify-content: space-between;
						}

				}
		}
		.tilX{
				box-sizing: border-box;
				position: absolute;
				top: 1.8rem;
				width: 100%;
				left: 0;
				padding: 0 .15rem;
				line-height: .35rem;
				font-size: .13rem;
				color: #999;
				border-bottom: 1px solid #ddd;
				span:nth-child(1){
						margin-right: .25rem;
				}
				span:nth-child(2){
						margin-right: 35%;
				}
		}
		.PaiList{
				position: relative;
				.paiwu{
						height: 1.8rem;
						background: url("../../assets/img/paiwu.png") no-repeat;
						-webkit-background-size:100% 100% ;
						background-size: 100% 100%;
				}
				li:first-child{
						.ximg{
								width: .13rem;
								height: .13rem;
						}
						overflow: hidden;
						margin-bottom: .35rem;
						height: 1.8rem;
						background: url("../../assets/img/paiHangBang_topImgBg@2x.png") no-repeat;
						background-size: 100% 100%;
						position: relative;
						.ic-shu{
								position: absolute;
								left: 2.45rem;
								top: .96rem;
						}
						>img{
								width: .1rem;
								height: .1rem;
								position: absolute;
								top: .98rem;
								right: 1.33rem;
						}
						>div{
								width: 52%;
								position: absolute;
								display: flex;
								bottom: .45rem;
								right: .25rem;
								>img{
										width: .6rem;
										height: .6rem;
										border-radius: 50%;
										border: 2px solid #fff;
										margin-right: .25rem;
								}
								div p:first-child{
										font-size: .15rem;
										line-height: .24rem;
										white-space:nowrap;
										overflow: hidden;
										width: .98rem;
								}
						}
						p{
								color: #fff;
						}
						button{
								position: absolute;
								right: .6rem;
								bottom: .3rem;
								margin-top: .05rem;
								width: .72rem;
								height: .26rem;
								border: 1px solid #F8e71c;
								border-radius: 4px;
								background: rgba(0,0,0,0);
								font-size: .1rem;
								color: #F8e71c;
								&.active{
										border: 1px solid  #50E3C2;
										color:  #50E3C2;
								}
						}
				}
				.ximg{
						width: .15rem;
						height: .16rem;
						vertical-align: middle;
				}
				li:not(:first-child){
						padding: 0 .15rem;
						display: flex;
						height: .6rem;
						justify-content: space-between;
						align-items: center;
						border-bottom: 1px solid #ddd;
						>div{
								display: flex;
								align-items: center;
								width: 1.4rem;
								>img{
										width: .4rem;
										height: .4rem;
										border-radius: 50%;
										margin-right: .1rem;
								}
								div{
										flex-grow: 1;
										width: 50%;
								}
								div i{
										font-size: .17rem;
										color: #FF5558;
								}
								p{
										width: 1rem;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
								}
						}
						.ic-shu{
								width: .7rem;
								/*border: 1px solid red;*/
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
						}
						.fudu{
								color: #FF5558 ;
								img{
										width: .14rem;
										height: .14rem;
								}
						}
						button{
								width: .72rem;
								height: .26rem;
								border-radius: 3px;
								background: #F5A623 ;
								color: #fff;
								font-size: .1rem;
								border: none;
								&.active{
										background:  #BCBCBC;
								}
						}
				}
		}
</style>
