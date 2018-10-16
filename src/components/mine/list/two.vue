<template>
    <!--二级邀请-->
		<div class="two">
				<ul>
						<li v-for="item in arrList1">
								<p>{{item.user_tel}}</p>
								<span>{{item.user_register_date}}</span>
						</li>
				</ul>
		</div>
</template>

<script>
		import { Toast } from 'mint-ui';
    export default {
        name: "two",
				data(){
						return {
								arrList1:[],
								token:'',
						}
				},
				mounted(){
						this.token = localStorage.getItem('userName');
						if(this.token){
								this.getlist();
						}
				},
				methods:{
						getlist(){
								this.$axios.post(url+'/api/userInviter/findUserInviterList',this.$qs.stringify({
										token:this.token
								})).then((res) => {
										console.log(res.data);
										if(res.data.status == 0){
												this.arrList1 = res.data.secondUserList;
										}else{
												Toast({
														message: res.data.message,
														position: 'bottom',
												});
										}
								})
						}
				}
    }
</script>

<style scoped lang="scss">
		.two{
				padding: 0 .15rem;
				li{
						height: .5rem;
						display: flex;
						border-bottom: 1px solid #ccc;
						justify-content: space-between;
						align-items: center;
						span{
								color:  #9B9B9B;
						}
				}
		}
</style>