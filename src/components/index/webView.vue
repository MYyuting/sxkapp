<template>
    <div class="web-view">
				<Head>
						<span class="el-icon-arrow-left" slot="head_left" @click="$router.back(-1)"></span>
						<span class="" slot="head_center"></span>
						<span  slot="head_right" ></span>
				</Head>
				<div class="box_iframe">
						<div class="con-view">
								<iframe :src="srcUrl" width="100%" height="100%"   name="ifd"
												noresize="noresize" frameborder="0" id="topFrame"></iframe>
						</div>
				</div>
		</div>
</template>

<script>

		import Head from '@/components/public/headNav'
    export default {
        name: "web-view",
				data(){
        		return{
        				til:[''],
								srcUrl:this.$route.query.url
						}
				},
				mounted(){
						// window.onload = function(){
								var height = document.documentElement.clientHeight;
								var iframe = document.getElementById("topFrame");
								iframe.height = height;
								console.log(iframe);
						// }
				},
				methods:{

				},
				components:{
        		Head
				}
    }
</script>

<style>
		.web-view{
				height: 100%;
		}
		.box_iframe{
				height:100%;
				overflow: hidden;
		}
		.con-view{
				position: fixed;
				top: 0;
				padding-top: .51rem;
				left: 0;
				width: 100%;
				overflow:scroll
		}
		.con-view::-webkit-scrollbar {display: none;}
		#topFrame::-webkit-scrollbar {display: none;}
		.con-view {
				-ms-overflow-style:none;/*隐藏滚动条，当IE下溢出，仍然可以滚动*/
				overflow:-moz-scrollbars-none; /*火狐下隐藏滚动条*/
		}
		.con-view::-webkit-scrollbar{width:0px}/*Chrome下隐藏滚动条，溢出可以透明滚动*/
</style>