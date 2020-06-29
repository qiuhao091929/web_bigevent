//整个项目的入口文件

//导入express模块
const express = require('express')

//创建express服务器实例
const app = express()

//配置cors跨域
const cors = require('cors')
app.use(cors())

// 导入 @hapi/joi 模块 为表单中携带的每个数据项定义验证规则
const joi = require('@hapi/joi')

//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

//配置解析token的中间件（）在导入路由之前
const expressJWT = require('express-jwt')
const config = require('./config')


//在所有路由之前，声明一个全局中间件，为res挂载一个res.cc()函数
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            //判断err是否和Error 一个类型
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

app.use(expressJWT({ secret: config.secretKey }).unless({ path: [/^\/api\//] }))


//


//导入注册和登录的路由模块
const router = require('./router/user')
app.use('/api', router)

//导入个人中心的路由模块
const routerInfo = require('./router/userinfo')
app.use('/my', routerInfo)

//导入文章的路由模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)

//导入发布文章的路由模块
const articleRouter = require('./router/article')
app.use('/my/article', artCateRouter)

//定义全局错误级别中间件
app.use((err, req, res, next) => {
    //验证数据失败的错误
    if (err instanceof joi.ValidationError) return res.cc(err)

    //捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份验证失败')

    //未知错误
    res.cc('未知错误')
})




//创建服务器端口并启动
app.listen(80, function () {
    console.log('http://127.0.0.1');

})