//用来存放路由处理函数模块，存放每个路由对应的处理函数

//导入数据库操作模块 db
const db = require('../db/index')

//导入bcryptjs模块 对用户密码进行加密
const bcrypt = require('bcryptjs')

//导入 jwt 模块 生成token字符串
const jwt = require('jsonwebtoken')

 //导入配置文件
 const config=require('../config')

//注册新用户的处理函数
module.exports.regUser = (req, res) => {
    // res.send('reguser ok')

    //判断用户名和密码是否为空
    let { username, password } = req.body
    if (!username || !password) {
        // return res.send({
        //     status: 1,
        //     message: '用户名或密码不合法，请重新输入'
        // })
        return res.cc('用户名或密码不合法，请重新输入')
    
    }
    //如果用户名合法，判断用户名是否被占用

    //定义sql语句
    const sql = `select * from ev_users where username=?`
    //执行sql语句判断
    db.query(sql, username, (err, results) => {
        //执行语句失败
        // if (err) return res.send({ status: 1, message: err.message })
        if (err) return res.cc(err)

        // console.log(results)
        // console.log(results.length)
        //执行语句成功 但是用户名被占用
        if (results.length > 0) {
            // return res.send({
            //     status: 1,
            //     message: '用户名已被占用，请重新输入'
            // })
            return res.cc('用户名已被占用，请重新输入')
        }

        //执行语句成功，且用户名未被占用，就对密码进行加密处理
        password = bcrypt.hashSync(password, 10)

        //密码处理之后，插入新用户
        //定义sql 语句
        const sql = `insert into ev_users set ?`
        //执行sql语句
        db.query(sql, { username, password }, (err, results) => {
            //执行语句失败
            // if (err) return res.send({ status: 1, message: err.message })
            if (err) return res.cc(err)

            //执行语句成功，但是没有注册成功
            if (results.affectedRows !== 1) {
                // return res.send({
                //     status: 1,
                //     message: '注册失败！'
                // })
                return res.cc('注册失败！')
            }

            //注册成功
            // res.send({ status: 0, message: '注册成功' })
            res.cc('注册成功',status=0)
        })


    })
}

//登录的处理函数
module.exports.login = (req, res) => {
    // res.send('login ok')
    let { username, password } = req.body
    
    //定义sql语句
    const sql =`select * from ev_users where username=?`
    //执行sql语句
    db.query(sql, username, (err, results) => {
        //执行语句失败
        if (err) return res.cc(err)
        //执行语句成功，但是登录失败
        if (results.length !== 1) {
            return res.cc('登录失败')
        }
        //登录成功 判断密码是否输入正确
        //比较输入密码和注册密码是否一致
        const comparePwd = bcrypt.compareSync(password,results[0].password)
        if (!comparePwd) {
            return res.cc('登录失败')
        }
        
        //密码正确 即登录成功 要生成token 字符串
        //token字符串里应剔除密码和头像的值
        const user = { ...results[0], password: '', user_pic: '' }
       
        //生成token字符串
        const token = jwt.sign(user, config.secretKey, { expiresIn: '1h' })
        
        //将生成的token字符串响应给客户端
        res.send({
            status: 0,
            message: '登录成功',
            token:`bearer ${token}`
        })

    })

}