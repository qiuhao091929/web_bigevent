//导入db数据库
const db = require('../db/index')

//获取文章分类列表数据的处理函数
module.exports.getArticleCates = (req, res) => {
    //定义sql语句
    const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
    //执行sql语句
    db.query(sql, (err, results) => {
        //执行语句失败
        if (err) return res.cc(err)

        //执行语句成功
        res.send({
            status: 0,
            message: '获取文章分类列表成功',
            data: results
        })
    })
}

//新增文章分类的处理函数
module.exports.addArticleCates = (req, res) => {
    //定义查重sql语句
    const sql = `select * from ev_article_cate where name=? or alias=?`
    //执行sql语句
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        //执行语句失败
        if (err) return res.cc(err)
        //判断 分类别名 和分类名称 是否被占用
        if (results.length === 2) return res.cc('分类名称或分类别名已被占用，请更换后重试')
        //分别判断 分类别名和分类名称是否被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称已被占用，请更换')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名已被占用，请更换')
        //没有被占用后，定义新增文章分类的sql语句
        const sql = `insert into ev_article_cate set?`
        db.query(sql, req.body, (err, results) => {
            //执行语句失败
            if (err) return res.cc(err)
            //执行语句成功，但是影响行数不等于1
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
            //新增成功
            res.cc('新增文章分类成功', status = 0)

        })
    })
}

//删除文章分类的处理函数
module.exports.deleteCateById = (req, res) => {
    //定义删除文章分类的sql语句
    const sql = `update ev_article_cate set is_delete=1 where id=?`
    //执行sql语句
    db.query(sql, req.params.id, (err, results) => {
        //执行语句失败
        if (err) return res.cc(err)
        //执行语句成功，但是影响行数不等于1
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败')
        //删除成功
        res.cc('删除文章分类成功', status = 0)

    })
}

//根据id获取文章分类的处理函数
module.exports.getArticleById = (req, res) => {
    //定义sql语句
    const sql = `select * from ev_article_cate where id=?`
    //执行sql语句
    db.query(sql, req.params.id, (err, results) => {
        //执行语句失败
        if (err) return res.cc(err)
        //执行语句成功，但是没有查到数据
        if (results.length !== 1) return res.cc('获取文章分类失败')
        //执行成功，返回数据给客户端
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data:results[0]
        })
    })
}

//根据id更新文章分类的处理函数
module.exports.updateCateById = (req, res) => {
    //定义 查重 sql语句
    const sql = `select * from ev_article_cate where id<>? and (name=? or alias=?)`
    //执行sql语句
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        //执行语句失败
        if (err) return res.cc(err)
        //判断分类名称 和分类别名是否被占用
        if (results.length === 2) return res.cc('分类名称与别名已被占用，请更换后重试')
        //分别判断 分类名称 和 分类别名 是否被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称已被占用，请更换后重试')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名已被占用，请更换后重试')
        //没有被占用后，更新文章分类
        //定义更新文章分类的sql语句
        const sql = `update ev_article_cate set? where id=?`
        //执行sql语句
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            //执行语句失败
            if (err) return res.cc(err)
            //执行语句成功，但是影响行数不等于1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败')
            //更新成功
            res.cc('更新文章分类成功', status = 0)
            
        })
        
    })
}