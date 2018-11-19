<template>
		<!--充值。提现成功-->
		<div class="success">
				<div class="tubiao">
						<span class="el-icon-circle-close"></span>
						<p>充值失败</p>
				</div>
				<div class="btn">
						<button @click="czSuccess">确认返回</button>
				</div>
		</div>
</template>

<script>
		export default {
				name: "setPhone",
				data(){
						return {
						}
				},
				mounted(){

				},
				methods:{
						//调用父组件的方法
						czSuccess(){
								this.$router.push('/mine')
						}
				}
		}
</script>

<style scoped lang="scss">
		.display{
				display: flex;
				justify-content: space-around;
				align-items: center;
		}
		@mixin pad($value,$value1) {
				padding: $value;
				height: $value1;
		}
		.success{
				.tubiao{
						text-align: center;
						padding: .5rem 0 .5rem;
						span{
								font-size: 1rem;
								color: #FF5558;
								margin-bottom: .18rem;
						}
						p{
								font-size: .18rem;
						}
				}
				ul{
						@extend .display;
						height: .6rem;
						background: #fff;
						font-size: .16rem;
						padding: 0 .15rem;
						/*border-bottom: 1px solid #eee;*/
				}
				.btn{
						@include pad(1.8rem .15rem 0,.48rem);
						button{
								background: #FF5558;
								color: #ffffff;
								font-size: .15rem;
						}
				}
		}
		.btn{
				@include pad(.4rem .15rem 0,.48rem);
				.colour{
						background: #FF5558;
						color: #ffffff;
				}
				button{
						height: 100%;
						width: 100%;
						color: #ffffff;
						background: #D6D6D6;
						border: none;
				}
		}
</style>