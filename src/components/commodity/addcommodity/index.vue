<template>
	<div class="body">
		<Breadcrumb :arr="['商品管理', '添加商品']"></Breadcrumb>
		<el-tabs type="border-card">
			<el-tab-pane>
				<span slot="label">
					<i class="el-icon-date"></i>
					图片
				</span>
				<el-card style="height: 360px;">
					<el-upload action multiple list-type="picture-card" :limit="5" :auto-upload="false" ref="upload">
						<i slot="default" class="el-icon-plus"></i>
					</el-upload>
				</el-card>
			</el-tab-pane>
			<el-tab-pane label="消息中心">
				<span slot="label">
					<i class="el-icon-date"></i>
					信息
				</span>
				<el-card style="height: 360px;">
					<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="商品名称" prop="name"><el-input v-model="addForm.name"></el-input></el-form-item>
						<el-form-item label="商品价格" prop="jia"><el-input v-model="addForm.jia"></el-input></el-form-item>
						<el-form-item label="商品详情" prop="title"><el-input v-model="addForm.title"></el-input></el-form-item>
						<div style="margin: 20px auto">
							<el-radio-group v-model="addForm.type" size="small">
								<el-radio label="1" border>美味零食</el-radio>
								<el-radio label="2" border>日常用品</el-radio>
								<el-radio label="3" border>电子数码</el-radio>
								<el-radio label="4" border>服装美妆</el-radio>
								<el-radio label="5" border>其他商品</el-radio>
							</el-radio-group>
						</div>
						<el-button @click="add" style="width: 650px;">上传</el-button>
					</el-form>
				</el-card>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import Breadcrumb from '../../common/breadcrumb/index.vue';
export default {
	data() {
		return {
			addForm: {
				name: '',
				jia: '',
				title: '',
				type: '1',
				nameList:[]
			},
			addRules: {
				name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
				jia: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
				title: [{ required: true, message: '请输入商品详情', trigger: 'blur' }]
			}
		};
	},
	methods: {
		async add() {
			const form = new FormData()
			this.$refs['upload'].uploadFiles.forEach((x) => {form.append('file',x.raw)})
			this.$refs['addForm'].validate(async type => {
				if (type) {
					const data = await this.axios.post('addCommonity',form)
					if(data.status == 200) {
						this.addForm.nameList = JSON.stringify(data.data.data)
						this.addForm.user = this.token
						const res = await this.axios.post('/addCommonity', this.qs.stringify(this.addForm));
						this.code(res);
						this.$refs['addForm'].resetFields()
						this.$refs['upload'].clearFiles()
					}
				} else {
					return this.$message.error('请完整填写信息');
				}
			});
		}
	},
	components: {
		Breadcrumb
	}
};
</script>

<style scoped="scoped">
.body {
	width: 100%;
	text-align: center;
}
.avatar-uploader-icon {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	font-size: 50px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	margin: auto;
	line-height: 178px;
	text-align: center;
}
</style>
