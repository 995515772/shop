import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入的路由组件
import Home from '../components/Home.vue';
import Login from '../components/login/index.vue';
import User from '../components/index.vue';
import AddCommodity from '../components/commodity/addcommodity/index.vue';
import CommodityList from '../components/commodity/commodityList/index.vue';
import index from '../components/index.vue';
import UserInfo from '../components/user/userinfo/index.vue';
import UserMoney from '../components/user/usermoney/index.vue';
import ShopAuction from '../components/shop/shopauction/idnex.vue';
import ShopList from '../components/shop/shoplist/index.vue';

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{path: '/user',name: 'User',component: User},
			{path: '/addcommodity',name: 'AddCommodity',component: AddCommodity},
			{path: '/index',name: 'index',component: index},
			{path: '/commoditylist',name: 'CommodityList',component: CommodityList},
			{path: '/userinfo',name: 'UserInfo',component: UserInfo},
			{path: '/usermoney',name: 'UserMoney',component: UserMoney},
			{path: '/shopauction',name: 'ShopAuction',component: ShopAuction},
			{path: '/shoplist',name: 'ShopList',component: ShopList},
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	}
]

const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
