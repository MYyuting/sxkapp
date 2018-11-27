<template>
    <!--卖者自负承诺函-->
		<div class="letter">
				<head-til :text="til"></head-til>
				<div class="let-con">
						<div>本用户郑重承诺如下：</div><br>
						<p>
								1、本用户为具有完全民事行为能力的自然人，且年龄满18周岁且不满60周岁。不存在任何法律、行政法规、星时空App颁布的规范性文件及买卖规则禁止或限制在星时空App参与时间买卖的情形。
						</p>
						<p>
								2、本用户提供的所有证件、资料均真实、全面、有效、合法，并且保证资金来源合法。
						</p>
						<p>
								3、本用户承诺自觉遵守与星时空App有关的法律、法规、规章制度及规范性文件，星时空App买卖规则和由星时空App委托处理相关业务公司的各项业务规定。
						</p>
						<p>
								4、本用户承诺在进行时间买卖之前已经对时间买卖规则、时间买卖惯例、时间买卖知识、所买卖的时间产品有了一定的了解；并完全知悉所买卖时间商品最终用途是用于个人生活消费，时间买卖过程中可能蕴含的亏损风险与盈利机会。
						</p>
						<p>
								5	本用户承诺已充分理解“买者自负”的含义，本用户确认：本用户进行的所有时间买卖既存在盈利的可能，同时也存在亏损的可能，无论时间买卖的结果是盈利或亏损均由本用户自行承担。
						</p>
						<p>
								本人已认真阅读、理解并接受买者自负承诺函的全部内容，充分知晓时间买卖服务中存在的风险，愿意承担时间买卖服务的风险和损失。
						</p>
						<br>
						<div>用户签署:</div>
				</div>
		</div>
</template>

<script>
		import headTil from '../headMe'
    export default {
        name: "lette-rules",
				data(){
						return {
								til:['买者自负承诺函']
						}
				},
				components:{
						headTil,
				}
    }
</script>

<style scoped lang="scss">
		.let-con{
				padding: .15rem;
				div{
						text-indent: 2em;
				}
				p{
						text-indent: 2em;
						line-height: .26rem;
						color: #666;
				}
		}
</style>