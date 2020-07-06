function code(res,type=true,time=2000) {
	if (res.data.status == 200) {
		if(type){
			this.$message.success({
				showClose: true,
				message: res.data.msg,
				duration:time
			})
		}
		return true
	}
	if (res.data.status == 404) {
		this.$message.error({
			showClose: true,
			message: res.data.msg,
			duration:time
		})
		return false
	}
	if (res.data.status == 401) {
		this.$message.error({
			showClose: true,
			message:'连接数据库失败',
			duration:time
		})
		return false
	}
	if (res.data.status == 500) {
		this.$message.error({
			showClose: true,
			message:'调用数据库接口失败',
			duration:time
		})
		return false
	}
}
export default code;
