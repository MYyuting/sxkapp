<template>
    <!--约见规则-->
		<div class="makeCon">
				<headr :text="til"></headr>
				约见规则
		</div>
</template>

<script>
		import headr from '../headMe'
    export default {
        name: "make-rules",
				data(){
        		return {
								til:["约见规则"],
						}
				},
				components:{
        		headr,
				}
    }
</script>

<style scoped>

</style>