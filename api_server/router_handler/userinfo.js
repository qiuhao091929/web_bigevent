//用来存放个人中心的路由处理函数

//导入数据库操作模块
const db = require('../db/index')

//导入 bcryptjs 模块
const bcrypt = require('bcryptjs')

//获取用户信息的处理函数
module.exports.getUserInfo = (req, res) => {
    // res.send('ok')

    //定义sql语句
    const sql = `select id,username,nickname,email,user_pic from ev_users where id=?`
    //执行sql语句
    db.query(sql, req.user.id, (err, results) => {
        //执行语句失败
        if (err) return res.cc(err)

        //执行语句成功，但是查询数据条数不等于1
        if (results.length !== 1) {
            return res.cc('获取用户信息失败')
        }

        //获取信息成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })

}

//更新用户信息的处理函数
module.exports.updateUserInfo = (req, res) => {
    // res.send('ok')
    console.log(req.body)
    //定义sql语句
    const sql = `update ev_users set ? where id=?`
    //执行sql语句
    db.query(sql, [req.body, req.user.id], (err, results) => {
        //执行语句失败
        if (err) return res.cc(err)
        //执行语句成功，但是影响行为不等于1
        if (results.affectedRows !== 1) {
            return res.cc('更新失败')
        }
        //修改成功
        return res.cc('更新成功', status = 0)
    })
}

//重置密码的处理函数
module.exports.updatePwd = (req, res) => {
    // res.send('ok')

    //定义sql语句
    const sql = `select * from ev_users where id=?`
    //执行sql语句
    db.query(sql, req.user.id, (err, results) => {
        //执行语句失败
        if (err) return res.cc(err)
        //执行语句成功，但是用户不存在
        if (results.length !== 1) {
            return res.cc('用户不存在')
        }
        //用户存在 判断提交的密码是否正确
        const comparePwd = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!comparePwd) return res.cc('密码错误')

        //密码正确后，对新密码加密后更新到数据库
        const sql = `update ev_users set password=? where id=?`
        //对新密码加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        //执行sql语句
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            //执行语句失败
            if (err) return res.cc(err)
            //执行语句成功，但影响行数不等于1
            if (results.affectedRows !== 1) return res.cc('更新密码失败')
            //更新密码成功
            res.cc('更新密码成功', status = 0)
        })
    })
}

//更新头像的处理函数
module.exports.updateAvatar = (req, res) => {
    // res.send('ok')

    //定义sql语句
    const sql = `update ev_users set user_pic=? where id=?`
    //执行sql语句
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        //执行语句错误
        if (err) return res.cc(err)
        //执行语句成功，但是影响行数不等于1
        if (results.affectedRows !== 1) return res.cc('更新头像失败')
        //更新成功
        return res.cc('更新成功', status = 0)
    })
}