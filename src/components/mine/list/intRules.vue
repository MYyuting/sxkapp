<template>
    <!--邀请规则-->
		<div class="int-rules">
				<headNav :text="til"></headNav>
				<div class="con-view">
						<p>活动时间：长期有效。</p>
						<p>如何邀请：任何已注册用户均可通过邀请码邀请好友。</p>
						<p>获得奖励：邀请人将永久获得被邀请者以及被邀请者邀请的用户交易金额的0.1%，（邀请人数无上限，获得消费奖励无上限）。</p>
						<p>最终解释权归星时空App所有</p>
				</div>
		</div>
</template>

<script>
		import headNav from '../headMe'
    export default {
        name: "int-rules",
				data(){
        		return {
        				til:['邀请规则']
						}
				},
				mounted(){
        		this.$axios.post(url+'/api/userHelp/findRules',this.$qs.stringify({
								ruleType:'8'
						})).then((res)=>{
								console.log(res.data)
						})
				},
				methods:{

				},
				components:{
        		headNav
				}
    }
</script>

<style scoped>
		.int-rules{
				padding: 0 .15rem;
		}
		.con-view p{
				line-height: .3rem;
		}
</style>