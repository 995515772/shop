<template>
	<el-container>
		<!-- 左侧——导航菜单 -->
		<el-aside width="200px">
			<el-menu :collapse-transition="false" router unique-opened :default-active="activePath">
				<el-menu-item index="/index" @click="saveNavState('/index')">
					<i class="el-icon-menu"></i>
					<span slot="title">首页</span>
				</el-menu-item>
				<el-submenu :index="k.path" v-for="(k, i) in menuList" :key="i">
					<template slot="title">
						<i :class="k.icon"></i>
						<span>{{ k.name }}</span>
					</template>
					<el-menu-item-group v-for="(item, index) in k.children" :key="index">
						<el-menu-item :index="'/' + item.path" @click="saveNavState('/' + item.path)">
							<i :class="item.icon"></i>
							<span slot="title">{{ item.name }}</span>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside>
		<el-container>
			<!-- 头部——标题和退出 -->
			<el-header>
				<div class="header-title"></div>
				<div class="header-btn"><el-button type="danger" plain round size="small" icon="el-icon-switch-button" @click="tuichu">退出登录</el-button></div>
			</el-header>
			<el-main><router-view></router-view></el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	data() {
		return {
			menuList: [
				{
					"id":1,"index":"1","name":"个人中心","path":"user","icon":"el-icon-user",
					"children":[
						{"id":11,"index":"1-1","name":"个人信息","path":"userinfo","icon":"el-icon-goods"},
						{"id":12,"index":"1-2","name":"个人资金","path":"usermoney","icon":"el-icon-s-goods"}
					]
				},
				{
					"id":2,"index":"2","name":"商品管理","path":"commodity","icon":"el-icon-user",
					"children":[
						{"id":21,"index":"2-1","name":"添加商品","path":"addcommodity","icon":"el-icon-goods"},
						{"id":22,"index":"2-2","name":"商品展示","path":"commoditylist","icon":"el-icon-s-goods"},
					]
				},
				{
					"id":3,"index":"3","name":"购物中心","path":"shop","icon":"el-icon-user",
					"children":[
						{"id":31,"index":"3-1","name":"商城","path":"shoplist","icon":"el-icon-goods"},
						{"id":32,"index":"3-2","name":"拍卖","path":"shopauction","icon":"el-icon-s-goods"},
					]
				}
			],
			activePath: ''
		};
	},
	methods: {
		// 获取菜单信息
		async getMenu() {
			// const res = await this.axios.get('menu');
			// if (this.code(res)) {
			// 	console.log(res.data.data.menu);
			// 	this.menuList = res.data.data.menu;
			// }
		},
		// 用户点击退出登录
		tuichu() {
			window.localStorage.clear();
			this.$router.push('/login');
		},
		// 保存链接的激活状态
		saveNavState(activePath) {
			window.sessionStorage.setItem('activePath', activePath);
			this.activePath = activePath;
		}
	},
	created() {
		this.getMenu();
		this.activePath = window.sessionStorage.getItem('activePath');
	}
};
</script>

<style scoped="scoped">
.el-container {
	width: 100%;
	height: 100%;
}
.header-btn {
	float: right;
	margin-right: 20px;
	margin-top: 14.6px;
}
.el-header,
.el-footer {
	background-color: #b3c0d1;
}

.el-aside {
	background-color: #d3dce6;
}

.el-main {
	background-color: #e9eef3;
}
</style>
