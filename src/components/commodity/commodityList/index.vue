<template>
	<div>
		<breadcrumb :arr="['商品管理', '商品展示']"></breadcrumb>
		<el-card>
			<el-tabs value="所有商品" @tab-click="tabBar">
				<el-tab-pane :label="k" :name="k" v-for="(k,i) in nameList" :key="i">
					<el-table :data="list" style="width: 100%">
						<el-table-column type="expand">
							<template slot-scope="props">
								<el-card v-if="props.row.nameList || props.row.title">
									<div style="margin-left: 15px;">
										<el-tooltip class="item" effect="dark" :content="props.row.title" placement="top-start">
											<el-tag hit type="info">商品详情：{{ props.row.title }}</el-tag>
										</el-tooltip>
									</div>
									<div v-for="(k, i) in props.row.nameList" :key="i" class="table-img-list"><img :src="'http://127.0.0.1:9999/upload/' + k" lazy /></div>
								</el-card>
							</template>
						</el-table-column>
						<el-table-column label="商品 ID">
							<template slot-scope="props">
								<el-tag type="info">{{ props.row.id }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="商品名称">
							<template slot-scope="props">
								<el-tag>{{ props.row.name }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="商品售价">
							<template slot-scope="props">
								<el-tag type="success">{{ props.row.jia }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="商品类型">
							<template slot-scope="props">
								<el-tag type="warning">{{ props.row.type | type }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="更多操作">
							<template slot-scope="props">
								<el-tooltip class="item" effect="dark" content="删除商品" placement="top-start">
									<el-button type="danger" icon="el-icon-delete" circle @click="remove(props.row)"></el-button>
								</el-tooltip>
								<el-tooltip style="margin-left: 15px;" class="item" effect="dark" :content="props.row.shop == 1 ? '下架商品' : '上架商品'" placement="top-start">
									<el-switch :value="props.row.shop == 1" @change="shopType($event, props.row.id)"></el-switch>
								</el-tooltip>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>

<script>
import breadcrumb from '../../common/breadcrumb/index.vue';
export default {
	data() {
		return {
			list: [],
			nameList:['所有商品','美味零食','日常用品','电子数码','服装美妆','其他商品'],
			tabBarIndex:'0'
		};
	},
	methods: {
		async getData() {
			const res = await this.axios.get(`getCommonity/?user=${this.token}`);
			if (this.code(res, false)) {
				this.list = res.data.data;
				res.data.data.forEach((x, i) => {
					if (x.nameList && x.nameList.length > 30) {
						this.list[i].nameList = JSON.parse(x.nameList);
					} else {
						this.list[i].nameList = null;
					}
				});
				window.sessionStorage.setItem('shopList',JSON.stringify(this.list))
			}
			this.tabBar({"index":this.tabBarIndex})
		},
		async remove(data) {
			const res = await this.axios.get(`removeCommonity/?id=${data.id}&nameList=${JSON.stringify(data.nameList)}`);
			if (this.code(res)) {
				this.getData();
			}
		},
		async shopType(type, id) {
			let shop = 0;
			if (type) {
				shop = 1;
			}
			const res = await this.axios.get(`setShop/?id=${id}&shop=${shop}`);
			this.getData();
			this.code(res);
		},
		tabBar(data) {
			this.tabBarIndex = data.index
			let list = JSON.parse(window.sessionStorage.getItem('shopList'))
			let newList = []
			if(data.index == 0) {
				return this.list = list;
			}
			list.forEach((x) => {
				if(x.type == data.index) {
					newList.push(x)
				}
			})
			this.list = newList
		}
	},
	created() {
		this.getData();
	},
	components: {
		breadcrumb
	}
};
</script>

<style scoped="scoped">
.table-img-list {
	width: 20%;
	height: 200px;
	float: left;
	box-sizing: border-box;
	padding: 15px;
	border-radius: 15px;
}
.table-img-list img {
	width: 100%;
	height: 100%;
	border: 1px solid #ccc;
	box-shadow: 0 0 10px #5f5f5f;
	border-radius: 15px;
}
.nameList-null {
	font-size: 30px;
	text-align: center;
	letter-spacing: 10px;
	color: #b3c0d1;
	text-shadow: 0 0 10px #ccc;
}
</style>
