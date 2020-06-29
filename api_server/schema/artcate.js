//文章分类数据验证模块

//导入定义验证规则的模块
const joi = require('@hapi/joi')

//定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

//定义 分类ID 的校验规则
const id = joi.number().integer().min(1).required()



//添加分类的校验规则对象
module.exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

//删除分类的校验规则对象
module.exports.delete_cate_schema = {
    params: {
        id
    }
}

//根据id获取分类的校验规则对象
module.exports.get_cate_schema = {
    params: {
        id
    }
}

//根据id更新分类的校验规则对象
module.exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}