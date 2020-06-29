//存放路由模块，只存放客户端的请求与处理函数之间的映射关系

//创建路由对象
const express = require('express')
const router = express.Router()

//导入路由处理函数模块
const userHandle = require('../router_handler/user')

//导入验证表单数据的中间件
const expressJOI=require('@escook/express-joi')
//导入需要验证的对象
const reg_login_schema = require('../schema/user')


//注册新用户
router.post('/reguser', expressJOI(reg_login_schema),userHandle.regUser)

//登录
router.post('/login', expressJOI(reg_login_schema),userHandle.login)

//将路由对象共享出去
module.exports = router