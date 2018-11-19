<template>
		<!--上市发行人list-->
		<div class="tablist" >
				<div class="table">
						<div class="tr" v-for="(item,index) in datalist" @click="Publisher(item.investorsCode)">
								<div>
										<figure>
												<div class="imgt"><img :src="item.investorsAvatar" alt=""></div>
												<figcaption>
														<div>{{item.investorsName}}<i v-show="item.isFans != 0" class="iconfont icon-fans"></i></div>
														<small>{{item.investorsCode}}</small>
												</figcaption>
												<!--<figcaption v-else :class="[index==0 ? 'red' : '']">  isFans  0 不是  1 是-->
														<!--<div>{{item.investorsName}} <button class="fen" v-if="">粉</button></div>-->
												<!--</figcaption>-->
										</figure>
								</div>
								<div>
										<!--<div v-if="flag">-->
												<!--<span :class="[index==0 ? 'red' : '']">23542</span>-->
												<!--<img src="../../assets/img/home/star@2x.png" alt="">-->
										<!--</div>-->
										<!--<div >0.5元/秒</div>-->
										<div  class="fontbold" :class="[item.uplowPrice > 0 ? 'red' : 'green']">
												{{item.price}}
										</div>
								</div>
								<div>
										<!--<div v-if="flag" :class="[index==0 ? 'red' : '']">{{index+1}}</div>-->
										<button  :class="[item.uplowPrice > 0 ? 'bgred' : 'bggreen']">{{item.uplowPrice}}%</button>
								</div>
						</div>

				</div>
		</div>
</template>

<script>
    export default {
				name: "tab-list",
				data(){
						return {

						}
				},
				props:['datalist','flag'],
				mounted(){
						// console.log(this.datalist)
				},
				methods:{
						Publisher(code){
								this.$router.push({
										path: '/faxing',
										query: {
												code:code,
										}
								})
						}
				}
		}
</script>

<style scoped lang="scss">
  $red: #ff5558;
  $green:#4BCE7C;
    .tablist{

      .table{
					/*border-bottom:4px solid #f5f5f5;*/
        width:100%;
        .tr{
          display: flex;
          >div:nth-of-type(1){
            height:.6rem;
            width:44%;
            figure{
              height:inherit;
              display: flex;
              align-items: center;
		            .imgt{
				            width:.4rem;
				            height: .4rem;
				            border-radius: 50%;
				            overflow: hidden;
				            img{
						            max-width: 100%;
				            }
		            }

              figcaption{
                height:.4rem;
                margin-left:.1rem;
                display: flex;
                justify-content: center;
                flex-direction: column;
                small{
                  margin-top:.03rem;
										height: .16rem;
                }
									div{
											height: .2rem;
											display: flex;
											align-items: center;
											i{
													color: #ff5558;
													font-size: .18rem;
											}
									}
              }
            }
          }
          >div:nth-of-type(2){
            text-align: center;
            font-size:.18rem;
            line-height:.6rem;
            width:40%;
            img{height:.16rem;vertical-align: middle}
          }
          >div:nth-of-type(3){
            text-align: center;
            font-size:.2rem;
            font-weight:bold;
            width:24%;
            line-height:.6rem;
            button{
              width:.8rem;
              height:.32rem;
              line-height:.32rem;
              text-align: center;
              font-size:.145rem;
              color:#fff;
              border:0;
            }
            .bgred{
              background:$red;
            }
            .bggreen{
              background:$green
            }
          }
        }
        .tr{
          border-bottom:1px solid #f5f5f5;
          padding:0 .1rem;
        }
      }
    }
</style>
