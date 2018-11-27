<template>
		<!--消息详情-->
    <div class="details1">
				<Head>
						<span class="el-icon-arrow-left" slot="head_left" @click="back"></span>
						<span slot="head_center">消息详情</span>
						<span slot="head_right"></span>
				</Head>
				<div style="height: .5rem;"></div>
				<div class="content">
						<p class="title">{{data1.title}}</p>
						<div class="txt">
								{{data1.content}}
						</div>
				</div>
    </div>
</template>

<script>
		import Head from '@/components/public/headNav'
    export default {
        name: "details1",
				data(){
        		return {
        				data1:{},
								token:''
						}
				},
				mounted(){
        		this.token = localStorage.getItem('userName');
        		this.$axios.post(url+'/api/notification/findEmailDetails',this.$qs.stringify({
								id:this.$route.query.id,
								token:this.token
						})).then((res) => {
								console.log(res.data);
								if(res.data.status == 0){
										this.data1 = res.data.data
								}
						}).catch((err) => {
								console.log(err)
						})
				},
				methods:{
						back(){
								this.$router.go(-1)
						},
				},
				components:{
        		Head
				}
    }
</script>

<style scoped lang="scss">
		.details1{
				height: 100%;
				display: flex;
				padding: 0 .15rem;
				flex-direction: column;
				.title{
						font-size: .17rem;
						padding: .1rem 0;
				}
				.content{
						flex-grow: 1;
						height: 60%;
						overflow-y: auto;
						padding-bottom: .2rem;
				}
				.txt{
						text-indent: 2em;
						color: rgba(0,0,0,0.6)
				}
		}
</style>
