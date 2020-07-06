const express = require('express')
const mysql = require('mysql')
const app = express()
const bodyParser = require('body-parser')
const pool = mysql.createPool({'host':'192.168.1.13','user':'root','password':'123456','database':'quanxian',"multipleStatements": true})
const multer = require('multer')
const fs = require('fs')
const path = require('path')

// post解析
app.use(bodyParser.urlencoded({extended: false}))
// 跨域
app.use("*", function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "content-type");
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	next();
})

// 获取菜单信息
app.get('/menu',(req,res) => {
	const datas = {
		"menu":[
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
		]
	}
	res.send({status:200,msg:"获取菜单列表成功",data:datas})
})
// 登录接口
app.post('/login',(req,res) => {
	pool.getConnection((err,con) => {
		if(err){
			res.send({status:500,msg:'调用数据库接口失败'})
		}else {
			con.query(`select * from user where user='${req.body.user}' and pass='${req.body.pass}'`,(err,data) => {
				if(err){
					res.send({status:401,msg:'连接数据库失败'})
				}else {
					if(data.length == 0){
						res.send({status:404,msg:'账户或密码错误'})
					}else{
						res.send({status:200,msg:'登录成功',data:data})
					}
				}
			})
			con.end()
		}
	})
})

// 获取商品接口
app.get('/getCommonity',(req,res) => {
	pool.getConnection((err,con) => {
		if(err) {
			res.send({status:500,msg:'调用数据库接口失败'})
		}else {
			con.query(`select * from common where user='${req.query.user}'`,(err,data) => {
				if(err) {
					res.send({status:401,msg:'连接数据库失败'})
				}else {
					res.send({status:200,msg:'获取商品信息成功',data:data})
				}
			})
			con.end()
		}
	})
})

// 获取上架的商品
app.get('/getShop',(req,res) => {
	pool.getConnection((err,con) => {
		if(err){
			res.send({status:500,msg:'调用数据库接口失败'})
		}else {
			con.query(`select * from common where shop='${req.query.shop}' and user!='${req.query.user}'`,(err,data) => {
				if(err) {
					res.send({status:401,msg:'连接数据库失败'})
				}else {
					res.send({status:200,msg:'获取商品信息成功',data:data})
				}
			})
			con.end()
		}
	})
})

//添加商品接口
app.post('/addCommonity', multer({dest: 'upload'}).any(), (req, res) => {
	if(req.files){
		let arrName = []
		let name = ''
		req.files.forEach((x) => {
			name = x.filename+ path.parse(x.originalname).ext
			fs.rename(x.path, './upload/'+name, (err) => {})
			arrName.push(name)
		})
		res.send({data:arrName})
	}else{
		pool.getConnection((err,con) => {
			if(err) {
				res.send({status:500,msg:'调用数据库接口失败'})
			}else {
				con.query(`INSERT INTO common (name,jia,title,type,nameList,shop,user) values ('${req.body.name}','${req.body.jia}','${req.body.title}','${req.body.type}','${req.body.nameList}','${0}','${req.body.user}');`,(err,data) => {
					if (err) {
						res.send({status:401,msg:'连接数据库失败'})
					}else {
						res.send({status:200,msg:'添加商品成功'})
					}
				})
				con.end()
			}
		})
	}
})

// 删除商品接口
app.get('/removeCommonity',(req,res) => {
	if(req.query.nameList != 'null'){
		JSON.parse(req.query.nameList).forEach((x) => {
			fs.unlink('./upload/'+x, function(err) {})
		})
	}
	pool.getConnection((err,con) => {
		if(err) {
			res.send({status:500,msg:'调用数据库接口失败'})
		}else {
			con.query(`DELETE FROM common where id='${req.query.id}'`,(err,data) => {
				if(err) {
					res.send({status:401,msg:'连接数据库失败'})
				}else {
					res.send({status:200,msg:'删除商品成功',data:data})
				}
			})
			con.end()
		}
	})
})

// 修改商品上下架状态
app.get('/setShop',(req,res) => {
	pool.getConnection((err,con) => {
		if(err) {
			res.send({status:500,msg:'调用数据库接口失败'})
		}else {
			con.query(`UPDATE common SET shop='${req.query.shop}' where id=${req.query.id}`,(err,data) => {
				if(err) {
					res.send({status:401,msg:'连接数据库失败'})
				}else {
					res.send({status:200,msg:'修改商品状态成功',data:data})
				}
			})
			con.end()
		}
	})
})

// 购买商品接口
app.post('/setGoumai',(req,res) => {
	pool.getConnection((err,con) => {
		if(err) {
			res.send({status:500,msg:'调用数据库接口失败'})
		}else {
			con.query(`select * from user where user='${req.body.users}'`,(err,data) => {
				if(err) {
					res.send({status:401,msg:'连接数据库失败1'})
				}else {
					let moneys = parseInt(data[0].money) + parseInt(req.body.jia)
					con.query(`UPDATE common SET shop='${0}',user='${req.body.user}' where id=${req.body.id};
					UPDATE user SET money='${req.body.money}' where user='${req.body.user}';
					UPDATE user SET money='${moneys}' where user='${req.body.users}';
					`,(err,data) => {
						if(err) {
							res.send({status:401,msg:'连接数据库失败'})
						}else {
							res.send({status:200,msg:'购买商品成功',data:data})
						}
					})
				}
				
			})
			con.end()
		}
	})
})


app.get('/setMoney',(req,res) => {
	pool.getConnection((err,con) => {
		if(err) {
			res.send({status:500,msg:'调用数据库接口失败'})
		}else {
			con.query(`select * from user where user='${req.query.user}'`,(err,data) => {
				if(err) {
					res.send({status:401,msg:'连接数据库失败'})
				}else {
					res.send({status:200,msg:'获取价格信息成功',data:data})
				}
			})
			con.end()
		}
	})
})

app.use(express.static('./'))
// 设置端口号
app.listen(9999,() => {
	console.log('9999号服务器开启成功');
})