<template>
  <div class="whPublish dis2">
   <div class="whSmall dicenter">
   	<span class="iconfont icon-face wsize24"></span>
   </div>
   <div class="wPut">
   	<input type="text" placeholder="输入评论" v-model="inputContent" value="inputContent" name="inputContent" />
   </div>
   <div class="whGray" @click="commentTap">
   	<span :class="{commentClass:inputContent!=''}">评论</span>
   </div>
  </div>
</template>
<script>
	import { Toast } from 'mint-ui';
  export default {
    name: "index",
		props:['wid'],
    data() {
      return {
        inputContent:"",
        wmsg:'',
        id:'',
        rid:'',
        wtime:'',
        userId:'',
        reUserId:'',
        reCommentId:'',
        creator:'',
        remark:'',
        isDelete:''
      }
    },
    components:{
    
    },
		mounted(){
      console.log('props1')
      console.log(this.wid)
      var token=localStorage.getItem("userName");
			      		this.$axios({
							  headers:{'Content-Type':'application/x-www-form-urlencoded'},
						      method: "POST",
						      url: url+"/sxz/api/findSxzDetails",
						      data: this.$qs.stringify({
											token:token,
											id:this.wid
						      })
						    })
						     .then(res=> {
						     	console.log("详情222")
						       console.log(res);
						      if(res.data.status==0){
						       	 this.wmsg=res.data.data //赋值
						       	 console.log('赋值222222222')
						       	 console.log(this.wmsg)
						       	 for(var item of this.wmsg.cList){
						       	 	this.rid=item.rid
						       	 	this.id=item.id
						       	 	this.userId=item.userId
						       	 	this.reUserId=item.reUserId
						       	 	this.reCommentId=item.reCommentId
						       	 	this.creator=item.creator
						       	 	this.remark=item.remark
						       	 	this.isDelete=item.isDelete
						       	 }
						       	 this.wtime=this.wmsg.grTime
						       	 console.log('canshu')
						       	 console.log(this.rid)
						       	 console.log(this.id)
						       	 console.log(this.userId)
						       	 console.log(this.reUserId)
						       	 console.log(this.reCommentId)
						       	 console.log(this.creator)
						       	 console.log(this.remark)
						       	 console.log(this.isDelete)
						       }
						     })
						     .catch(err=>{
						       console.log(err);
							});
      
		},
    methods: {
    	//`id` varchar(32) NOT NULL COMMENT '主键id',
//	`rid` varchar(32) DEFAULT NULL COMMENT '朋友圈id',
//	`userId` varchar(32) DEFAULT NULL COMMENT '用户id',
//	`rComment` text DEFAULT NULL COMMENT '朋友圈评论',
//	`reUserId` varchar(50) DEFAULT NULL COMMENT '评论回复用户id',
//	`reCommentId` varchar(32) DEFAULT NULL COMMENT '回复的评论id',
//	`commentType` int(1) DEFAULT NULL COMMENT '评论类型：  1：对活动评论 2：对用户的评论',
//	`creator` varchar(50) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '创建人',
//	`creatorId` varchar(50) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '创建人id',
//	`createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
//	`remark` varchar(1000) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '描述',
//	`isDelete` int(1) DEFAULT 0 COMMENT '删除标识 0：未删除  1：已删除',
		
		//点击评论
      commentTap(){
      	console.log(this.inputContent);
      	var token=localStorage.getItem("userName");
      		this.$axios({
						  headers:{'Content-Type':'application/x-www-form-urlencoded'},
					      method: "POST",
					      url: url+"/sxzComment/api/saveSxzComment",
					      data: this.$qs.stringify({
										token:token,
										rid:this.rid,//回复的rid
										rComment:this.inputContent,//输入框内容
										createTime:this.wtime,//创建时间
										id:this.id,
										commentType:2,
									  reUserId:this.reUserId,
										userId:this.userId,
										reCommentId:this.reCommentId,
										creator:this.creator,
										creatorId:this.creatorId,
										remark:this.remark,
										isDelete:this.isDelete,
					      })
					    })
					     .then(res=> {
					     	console.log('shuju')
										console.log(res)
									if(res.data.status==0){
										console.log(res.data)
									}else{
										var msga=res.data.message
										Toast({
						          message:msga,
						        });
									}
					     })
					     .catch(err=>{
					       console.log(err);
					     });
      }
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
  .whPublish{
  	width: 100%;
  	height: .5rem;
  	border-top:.01rem solid #E5E5E5;
  	position: fixed;
  	left: 0;
  	bottom: 0;
  	padding:0 .15rem  0 .15rem ;
  	background: $bai;
  	box-sizing: border-box;
  }
  .wsize24{
  	font-size: .5rem;
  }
  .wPut{
  	input{
  		width: 2.36rem;
	  	height: .34rem;
	  	border-radius: .2rem;
			border:.01rem solid #BCBCBC;
			background: #F6F6F6;
			outline: none;
			text-indent: 1em;
			font-size: .14rem;
  	}
  	input::-webkit-input-placeholder{ /*WebKit browsers*/
			text-indent: 1em;
			text-align: left;
			line-height: .34rem;
			font-size: .14rem;
		}
  }
  .whSmall{
  	width: .24rem;
  	height: .24rem;
  }
  .whGray{
  	span{
  		display: block;
  		width: .56rem;
  		height: .3rem;
  		background:  #D6D6D6;
  	  border-radius: .1rem;
  	}
  }
  .whGray{
  	width: .56rem;
  	height: .3rem;
  	border-radius: .1rem;
		color: $bai;
		text-align: center;
		line-height: .3rem;
  }
  .commentClass{
  	background: #FF5558 !important;
  }
</style>
