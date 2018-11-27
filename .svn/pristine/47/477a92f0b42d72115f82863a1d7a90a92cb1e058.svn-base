<template>
    <!--联系我们-->
		<div class="contact">
				<my-head :text="til"></my-head>
				<div class="main">
						<div class="tubiao">
								<span class="iconfont icon-login_logo"></span>
								<p>{{this.$store.state.version}}</p>
						</div>
						<ul v-for="(item,index) in listArr">
								<li>{{item.title}}</li>
								<li class="clour"
										v-clipboard:copy="listArr[index].con"
										v-clipboard:success="onCopy"
										v-clipboard:error="onError">{{item.con}}</li>
						</ul>
						<ul @click="feedClick">
								<li>举报反馈</li>
								<li class="el-icon-arrow-right"></li>
						</ul>
				</div>
		</div>
</template>

<script>
		import Head from "@/components/mine/headMe"
		import { Toast } from 'mint-ui';
    export default {
        name: "lianxi",
				data(){
        		return{
								copyBtn:null,
        				til:["联系我们"],
								listArr:[
										{
												title:"客服邮箱",
												con:"kefu@xingshukong.cn"
										},
										{
												title:"客服微信",
												con:"xsk_kefu"
										}
								]
						}
				},
				mounted(){

				},
				methods:{
						onCopy(){

								Toast({
										message: '已复制到剪切板',
										position: 'bottom',
										duration: 2000
								});
						},
						onError(){
								Toast({
										message: '复制失败，请手动选择复制！',
										position: 'bottom',
										duration: 2000
								});
						},
						feedClick(){
								this.$router.push("/feedback")
						}
				},
				components:{
        		"my-head":Head
				}
    }
</script>

<style scoped lang="scss">
		.tubiao{
				text-align: center;
				padding: .2rem 0;
				span{
						font-size: 1rem;
						color: #FF5558;
						margin-bottom: .18rem;
				}
				p{
						font-size: .14rem;
						color: #666;
				}
		}
		.display{
				display: flex;
				justify-content: space-between;
				align-items: center;
		}
		ul{
				@extend .display;
				height: .6rem;
				background: #fff;
				padding: 0 .15rem;
				border-bottom: 1px solid #eee;
				li{
						cursor:pointer;
				}
				.el-icon-arrow-right{
						font-size: .17rem;
				}
		}
		.clour{
				color: #FF5558;
		}
</style>
<style  lang="scss">
		.el-message{
				background-color: rgba(0,0,0,.7);
				position: fixed;
				left: 50%;
				min-width: auto;
				padding: 0 .3rem;
				top:50%;
				border:none;
				height: .6rem;
				color: #fff;
		}
</style>