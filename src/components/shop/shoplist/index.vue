<template>
	<el-card>
		<div class="shop-list" v-for="(k, i) in list" :key="i" :style="'background-image:url(http://127.0.0.1:9999/upload/' + k.nameList[0] + ')'">
			<img :src="'http://127.0.0.1:9999/upload/' + k.nameList[0]" />
			<div class="shop-list-title">
				<el-tooltip class="item" effect="dark" :content="k.title" placement="top-start">
					<el-tag type="info" hit>{{ k.name }}</el-tag>
				</el-tooltip>
			</div>
			<div class="shop-list-type">
				<el-tag type="warning" hit>
					类型：
					<span>{{ k.type | type }}</span>
					<span style="font-size: 12px;float: right;color: #5F5F5F;">卖家：{{ k.user }}</span>
				</el-tag>
			</div>
			<div class="shop-list-info">
				<el-tag hit>
					售价：
					<span style="font-size: 16px;">{{ k.jia }}</span>
					<el-tooltip class="item" effect="dark" content="购买商品" placement="top-start">
						<el-button icon="el-icon-edit" circle size="mini" @click="goumai(k)"></el-button>
					</el-tooltip>
				</el-tag>
			</div>
		</div>
		<div>
			<el-tag class="jizai" type="info" hit>{{ list.length ? '已加载全部商品' : '暂无商品' }}</el-tag>
		</div>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			list: []
		};
	},
	methods: {
		async getData() {
			const res = await this.axios.get(`getShop/?shop=${1}`);
			if (this.code(res, false)) {
				this.list = res.data.data;
			}
			this.list.forEach(x => {
				x.nameList = JSON.parse(x.nameList);
			});
		},
		async goumai(data) {
			const type = await this.$confirm(`${this.money}`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).catch(err => err);
			if(type == "cancel"){
				return this.$message.info("取消购买")
			}
			let money = this.setMoney(this.money, data.jia);
			const res = await this.axios.get(`setGoumai/?id=${data.id}&user=${this.token}&money=${money}`);
			if (this.code(res)) {
				this.getData();
			}
		},
		setMoney(money, jia) {
			return money - jia;
		}
	},
	created() {
		this.getData();
	}
};
</script>

<style scoped="scoped">
.el-tag {
	width: 200px;
	margin: 6px 29px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.shop-list {
	width: 258px;
	height: 370px;
	border-radius: 15px;
	border: 1px solid #ccc;
	padding: 10px 0;
	opacity: 0.7;
	background-size: contain;
	background-position: center;
	float: left;
	margin: 15px 25px;
	box-shadow: 0 0 15px #6b6b6b;
}
.shop-list:hover {
	opacity: 1;
	transform: translateY(-10px);
	transition: 0.3s all;
}
.shop-list img {
	width: 200px;
	height: 200px;
	border-radius: 15px;
	box-shadow: 0 0 20px #bbb;
	margin-left: 29px;
}
.shop-list-title .el-tag {
	color: #000;
	font-size: 16px;
}
.shop-list-info .el-tag {
	height: 40px;
	line-height: 40px;
}
.shop-list-info .el-button {
	float: right;
	margin-top: 4px;
}
.jizai {
	width: 100%;
	height: 60px;
	line-height: 60px;
	text-align: center;
	font-size: 30px;
	margin: 20px;
	color: #000;
	text-shadow: 0 0 20px #aaa;
	margin-left: 50%;
	transform: translate(-50%);
}
</style>
