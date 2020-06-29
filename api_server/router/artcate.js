//获取文章的路由模块

//导入express模块
const express = require('express')
//创建路由对象
const router = express.Router()
//导入文章分类的路由处理函数
const artcate_handle=require('../router_handler/artcate')
//导入定义验证规则的模块
const expressJoi = require('@escook/express-joi')
//导入文章分类,删除分类,根据id获取分类,根据id更新分类的验证模块
const { add_cate_schema,delete_cate_schema,get_cate_schema,update_cate_schema} = require('../schema/artcate')

//获取文章分类的列表数据
router.get('/cates',artcate_handle.getArticleCates)

//新增文章分类
router.post('/addcates',expressJoi(add_cate_schema),artcate_handle.addArticleCates)

//删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handle.deleteCateById)

//根据id获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handle.getArticleById)

//根据id更新文章分类
router.post('/updatecate',expressJoi(update_cate_schema),artcate_handle.updateCateById)

//向外共享路由
module.exports = router