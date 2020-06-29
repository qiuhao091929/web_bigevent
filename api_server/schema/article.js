//验证表单数据的验证规则

//导入 定义验证规则的模块
const joi = require('@hapi/joi')


//定义 标题，分类id，内容，发布状态的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

//发布文章的验证规则对象
module.exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}