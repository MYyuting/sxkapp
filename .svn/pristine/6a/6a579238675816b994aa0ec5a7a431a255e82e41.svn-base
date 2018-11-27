<template>
    <div class="paihangb">
        <div class="nav">
            <div class="text" @click="back"><i class="el-icon-arrow-left"></i></div>
            <div class="paihangb_tab">
                <div :class="[classFlag ? 'select_class' : 'other_class']" @click="classClick">行情榜</div>
                <div :class="[classFlag ? 'other_class' : 'select_class']" @click="classClicked">星光榜</div>
            </div>
            <div class="text">Top10</div>
        </div>
        <div class="paihangb_con">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "paihangb",
        data() {
            return {
                classFlag: false
            }
        },
        methods: {
            back(){
				        this.$router.go(-1)
		        },
            classClick() {
                this.classFlag = false;
                this.$router.replace("/paihangb/hangqing")
            },
            classClicked() {
                this.classFlag = true;
                this.$router.replace("/paihangb/xingguang")
            }
        }
    }
</script>

<style scoped lang="scss">
  $color: #ff5558;
  .paihangb {
    height: 100%;
    display: flex;
    flex-direction: column;
    .nav {
        height: .5rem;
        background: $color;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .1rem;
      .text{
        color: #fff;
        font-size: .15rem;
					i{
							font-size: .23rem;
					}
      }

    }
    .paihangb_tab {
      width: 1.64rem;
      height: .3rem;
      display: flex;
      overflow: hidden;
      border-radius: 5px;
      > div {
        height: 100%;
        flex-grow: 1;
        text-align: center;
        line-height: .3rem;
        font-size: .14rem;
        color: $color;
      }
      .select_class {
        background: rgba(255, 55, 58, .8);
        color: #fff;
      }
      .other_class {
        background: #fff;
        color: $color;
      }
    }
  }
		.paihangb_con{
				height: 50%;
				flex-grow: 1;
		}
</style>
