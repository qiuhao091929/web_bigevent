$(function () {
    var form = layui.form

    //定义密码校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        var obj = {
            oldPwd: $('[name=oldPwd]').val(),
            newPwd: $('[name=newPwd]').val(),
        }

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: obj,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})