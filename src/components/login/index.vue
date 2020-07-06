<template>
	<div class="login">
		<el-form :model="loginForm" :rules="loginRules" ref="login" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="user"><el-input v-model="loginForm.user"></el-input></el-form-item>
			<el-form-item label="密码" prop="pass"><el-input v-model="loginForm.pass" type="password"></el-input></el-form-item>
			<div class="login-btn">
				<el-button @click="submitForm" :icon="isDeng?'el-icon-bangzhu':'el-icon-loading'">{{isDeng?'登录':'登录中'}}</el-button>
				<el-button @click="resetForm" icon="el-icon-close">重置</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
export default {
	methods: {
		// 用户点击登录
		submitForm() {
			this.$refs['login'].validate(async data => {
				if(!data) {
					return this.$message.error('请完整填写信息')
				}else{
					const res = await this.axios.post('login',this.qs.stringify(this.loginForm))
					if(this.code(res,1300)){
						this.isDeng = !this.isDeng
						setTimeout(() => {
							window.sessionStorage.setItem('token',this.loginForm.user)
							window.sessionStorage.setItem('money',res.data.data[0].money)
							this.$router.push('/index');
						},1500)
					}
				}
			})
			
		},
		// 用户点击重置
		resetForm(){
			this.$refs['login'].resetFields()
		}
	},
	data() {
		return {
			isDeng:true,
			loginForm: {
				user: '',
				pass: ''
			},
			loginRules: {
				user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				pass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
		};
	}
};
</script>

<style scoped="scoped">
.login {
	width: 400px;
	height: 300px;
	margin: 50px auto;
}
.login-btn {
	text-align: center;
	margin: auto;
}
</style>
