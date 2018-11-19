import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
//首页
import HomePage from '@/components/index/index'
import PaiHang from '@/components/index/paihangb'
import HangQB from '@/components/index/hangqing'
import XingGB from '@/components/index/xingguang'
import UpNew from '@/components/index/upNew'
import TouPiao from '@/components/index/toupiao'
import shenGXQ from '@/components/index/shenGXQ'

//买卖
import Business from '@/components/business/index'
import DynamicTemp  from '@/components/public/dynamic_temp'//买入
import Sell_temp  from '@/components/public/sell_temp'//卖出
import Position_temp  from '@/components/public/position_temp'//持仓
import Atorder from '@/components/business/atorder'//持仓
import Purchase from '@/components/business/purchase'

//行情
import Quotation from '@/components/quotation/index'
import Quotat from '@/components/quotation/quotat'
import Dynamic from '@/components/quotation/dynamic'
import Addynamic from '@/components/quotation/addynamic'
import wdynamic from '@/components/quotation/wdynamic'
import wTimeShop from '@/components/quotation/wtimeshop'
import wUserMsg from '@/components/quotation/wusermsg'
//我的
import Mine from '@/components/mine/index'
import Recharge from '@/components/mine/recharge'
import Forward from '@/components/mine/forward'
import MingXi from '@/components/mine/mingxi'
import MingXi2 from '@/components/mine/mingxi2'
import Apply from '@/components/mine/applyText'
//登录注册
import segnIn from '@/components/mine/SignIn'
import Register from '@/components/mine/register'
import GetYzm from '@/components/mine/getYzm'
//我的设置
import SetTing from '@/components/mine/settings'
import XiuGaiPhone from '@/components/mine/xiugaiphone'
import XiuGaiMM from '@/components/mine/XGloginMM'
import XiuGaizf from '@/components/mine/XGzfmm'
//消息
import News from '@/components/public/news'
//个人主页
import Geren from '@/components/public/gerendt'
import faxing from '@/components/index/faxingXq'
import Webview from '@/components/index/webView'
//邀请好友
import Invitation from '@/components/mine/list/Invitation'
import One from '@/components/mine/list/one'
import Two from '@/components/mine/list/two'
// 联系我们
import Lianxi from '@/components/mine/list/lianxi'
import Feedback from '@/components/mine/list/feedback'
//帮助中心
import Help from '@/components/mine/list/help'
import tradingRules from '@/components/mine/list/tradingRules'
import makeRules from '@/components/mine/list/makeRules'
import Time from '@/components/mine/list/timeDD'
//充值、提现成功
import Success from '@/components/mine/success'
import Fail from '@/components/mine/fail'

//星光排行
import xgph from '@/components/public/xgpaihang'
//线图
import xianTu from '@/components/public/xiantu'
import Dtails from '@/components/public/details'

//实名认证
import Authentic from '@/components/mine/authentication'

Vue.use(Router);

export default new Router({
	// mode: 'history',
	routes: [
		{
			path:"/",
			redirect:"/index"
		},
		{
			path:"/addynamic",
			name:"addynamic",
			component:Addynamic
		},
		{
			path: '/',
			name: '',
			component: Index,
			children:[
				{
					path:"/index",
					name:"星时空",
					component:HomePage,
				},
				{
					path:"/business",
					name:"business",
					component:Business,
					children:[
						{
							path:"/business",
							redirect:"/business/wbuy"
						},
						{
							path:"/business/wbuy",
							name:'wbuy',
							component:DynamicTemp
						},{
							path:"/business/wmai",
							name:'wmai',
							component:Sell_temp
						},
						{
							path:"/business/chic",
							name:'chic',
							component:Position_temp
						},
						{
							path:"/business/wqorder",
							name:'wqorder',
							component:Atorder
						}
					]
				},
				{
					path:"/quotation",
					name:"行情",
					component:Quotation,
					children:[
						{
							path:"/quotation",
							redirect:"/quotation/quotat"
						},
						{
							path:"/quotation/quotat",
							name:'quotat',
							component:Quotat
						},
						{
							path:"/quotation/dynamic",
							name:'dynamic',
							component:Dynamic
						}
					]
				},
				{
					path:"/mine",
					name:"mine",
					component:Mine
				}
			]
		},
		{
			path:"/paihangb",
			name:"排行榜",
			component:PaiHang,
			children:[
				{
					path:"/paihangb",
					redirect:"/paihangb/hangqing"
				},
				{
					path:"/paihangb/hangqing",
					name:"hangqing",
					component:HangQB
				},
				{
					path:"/paihangb/xingguang",
					name:"xingguang",
					component:XingGB
				}
			]
		},
		{
			path:"/recharge",
			name:"recharge",
			component:Recharge
		},
		{
			path:"/forward",
			name:"forward",
			component:Forward
		},
		{
			path:"/mingxi",
			name:"mingxi",
			component:MingXi
		},
		{
			path:"/mingxi2",
			name:"mingxi2",
			component:MingXi2
		},
		{
			path:"/setting",
			name:"设置",
			component:SetTing
		},
		{
			path:"/gphone",
			name:"修改手机号",
			component:XiuGaiPhone
		},
		{
			path:"/gmima",
			name:"修改登录密码",
			component:XiuGaiMM
		},
		{
			path:"/gzfmm",
			name:"修改支付密码",
			component:XiuGaizf
		},
		{
			path:"/signin",
			name:"signin",
			component:segnIn
		},
		{
			path:"/register",
			name:"注册",
			component:Register
		},
		{
			path:"/getYzm",
			name:"GetYzm",
			component:GetYzm
		},
		{
			path:"/authen",
			name:"实名认证",
			component:Authentic
		},
		{
			path:"/invitation",
			name:"invitation",
			component:Invitation,
		},
		{
			path:"/news",
			name:"消息",
			component:News
		},
		{
			path:"/Details",
			name:"Details",
			component:Dtails
		},
		{
			path:"/xiaofei",
			name:"xiaofei",
			component:Time
		},
		{
			path:"/lianxi",
			name:"联系我们",
			component:Lianxi
		},
		{
			path:"/feedback",
			name:"feedback",
			component:Feedback
		},
		{
			path:"/help",
			name:"帮助中心",
			component:Help
		},
		{
			path:"/upnew",
			name:"投票上新",
			component:UpNew
		},
		{
			path:"/toupiao",
			name:"tpxq",
			component:TouPiao
		},
		{
			path:"/xiantu",
			name:"线图",
			component:xianTu
		},
		{
			path:"/wdynamic",
			name:"动态详情",
			component:wdynamic
		},
		{
			path:"/wtimeshop",
			name:"发布时间商品",
			component:wTimeShop
		},
		{
			path:"/wusermsg",
			name:"商品详情",
			component:wUserMsg
		},
		{
			path:"/shengou",
			name:"shengou",
			component:shenGXQ
		},
		{
			path:"/geren",
			name:"geren",
			component:Geren
		},
		{
			path:"/faxing",
			name:'faxing',
			component:faxing
		},
		{
			path:"/xgph",
			name:'xgph',
			component:xgph
		},
		{
			path:"/success",
			name:'success',
			component:Success
		},
		{
			path:"/fail",
			name:'fail',
			component:Fail
		},
		{
			path:"/webview",
			name:'webview',
			component:Webview
		},
		{
			path:"/apply",
			name:'applyText',
			component:Apply
		},
		{
			path:"/pau",
			name:'pau',
			component:Purchase
		},
		{
			path:"/trading",
			name:'trading',
			component:tradingRules
		},
		{
			path:"/make",
			name:'make',
			component:makeRules
		}
	]
})
