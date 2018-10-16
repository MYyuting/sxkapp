<template>
  <div class="wuserMsg">
  	<my-head :text="til"></my-head>
   <!--详情-->
   详情
  </div>
</template>

<script>
	import Head from "@/components/quotation/wuserHead"
	
  export default {
    name: "wusermsg",
    data() {
      return {
        til:["发布时间商品"],
      }
    },
    components:{
    "my-head":Head,
    },
		mounted(){
      
		},
    methods: {
      
    }
  }
</script>

<style scoped lang="scss">
@charset "utf-8";
$wi:100%;
$b:1px solid blue;
$f:flex;
$co:column;
$ar:space-around;
$be:space-between;
$c:center;
$w:wrap;
$r:right;
$l:left;
$bai:#fff;
.colm{
    flex-direction: $co;
    display: $f;
    justify-content: $ar;
    align-items: $c;
}
.dis{
    display: $f;
    justify-content: $ar;
    align-items: $c;
}
.dis2{
    display: $f;
    justify-content: $be;
    align-items: $c;
}
.dis1{
    display: $f;
    justify-content: $ar;
    align-items: $c;
    flex-wrap:$w;
}
.dicenter{
    display: $f;
    justify-content: $c;
    align-items: $c;
}
  
</style>
