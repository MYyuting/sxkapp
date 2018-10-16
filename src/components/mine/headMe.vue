<template>
	<div>
		<div class="nav">
				<div class="text1" @click="back"><i class="el-icon-arrow-left"></i></div>
				<div class="til">{{text[0]}}</div>
				<div class="text " @click="mingxi">{{text[1]}}</div>
		</div>
		<div class="wheight">
			
		</div>
	</div>
</template>

<script>
	export default {
			props:["text"],
			name: "headred",
			methods:{
					back(){
							this.$router.back(-1)
					},
					mingxi(e){
							console.log(e);
							if(e.target.innerHTML =="规则"){
									this.$router.push("/rule")
							}else if(e.path[2].className == "recharge"){
									//充值
									this.$router.push("/mingxi")
							}else{
									//提现
									this.$router.push("/mingxi")
							}
					}
			}
	}
</script>

<style scoped lang="scss">
		.nav{
				height: .5rem;
				display: flex;
				background: #ff5558;
				justify-content: space-between;
				padding: 0 .1rem;
				box-sizing: border-box;
				align-items: center;
				color: #fff;
				font-size: 0.14rem;
				position: fixed;
				width: 100%;
				left: 0;
				z-index: 999;
				top: 0;
				.text1{
						font-size: .18rem;
						i{
							font-size: .24rem;
						}
				}
				.til{
						font-size: .16rem;
				}
		}
		.wheight{
			height: .5rem;
		}
</style>