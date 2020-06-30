//用来规范 用户信息验证规则的 模块

//导入 @hapi/joi 模块 为表单中携带的每个数据项定义验证规则
const joi = require('@hapi/joi')

//用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()

//密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//定义id,nickname,email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

//定义user_pic的验证规则
const avatar = joi.string().dataUri().required()

//注册和登录表单的验证规则对象
module.exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

//id,nickname,email的验证规则对象
module.exports.update_userinfo_schema = {
    body: {
        id,
        username,
        nickname,
        email
    }
}

//重置密码的验证规则对象
module.exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

//更换头像的验证规则对象
module.exports.update_avatar_schema = {
    body: {
        avatar
    }
}