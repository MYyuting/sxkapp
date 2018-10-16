<template>
    <!--一级邀请-->
    <div class="one">
				<ul v-show="dataList.length != 0">
						<li v-for="item in dataList">
								<p>{{item.user_tel}}</p>
								<span>{{item.user_register_date}}</span>
						</li>
				</ul>
				<p v-show="dataList.length == 0" class="wuz">暂无数据</p>
		</div>
</template>

<script>
		import { Toast } from 'mint-ui';
    export default {
        name: "one",
				props:['dataList'],
				data(){
        		return {

						}
				},
				mounted(){

				},
				methods:{

				}
    }
</script>

<style scoped lang="scss">
		.one{
				padding: 0 .15rem;
				height: 2.6rem;
				overflow: auto;
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
		.wuz{
				line-height: 1rem;
				text-align: center;
				color: #aaaaaa;
		}
</style>