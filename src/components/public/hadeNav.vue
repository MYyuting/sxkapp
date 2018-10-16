<template>
    <div class="nav">
        <div class="img" @click="Rankings"><img src="../../assets/img/topBar/paiHangBang@2x.png" alt=""></div>
        <div class="img1"><img src="../../assets/img/home/title@2x.png" alt=""></div>
        <div class="img" @click="xiaoXi">
          <img src="../../assets/img/topBar/icon_message@2x.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "hadeNav",
        methods:{
            Rankings(){
              this.$router.push("/paihangb")
            },
						xiaoXi(){
            		this.$router.push("/news")
						}
        }
    }
</script>

<style scoped>
  .nav{
    height: .5rem;
    background: #ff5558;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .1rem;
  }
  .img img{
    width: .24rem;
    height: .24rem;
  }
  .img1{
    text-align: center;
  }
  .img1 img{
    height: .44rem;
  }
</style>
