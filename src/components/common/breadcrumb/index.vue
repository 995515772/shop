<template>
	<el-breadcrumb style="margin-bottom: 15px;" separator-class="el-icon-arrow-right">
		<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item v-for="(item,index) in arr" :key="index">{{item}}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
	export default {
		props:{
			arr:Array
		}
	}
</script>

<style>
</style>
