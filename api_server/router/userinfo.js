//获取用户信息的路由模块

//导入express 模块
const express = require('express')

//创建路由模块
const router = express()

//导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')

//导入需要验证的对象
const {update_userinfo_schema,update_password_schema,update_avatar_schema}=require('../schema/user')

//导入获取用户信息的处理函数
const userinfo_handle = require('../router_handler/userinfo')

//获取用户信息
router.get('/userinfo', userinfo_handle.getUserInfo)
//更新用户信息
router.post('/userinfo', expressJoi(update_userinfo_schema),userinfo_handle.updateUserInfo)
//重置密码
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handle.updatePwd)
//更新头像
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfo_handle.updateAvatar)

//向外共享路由对象
module.exports = router
