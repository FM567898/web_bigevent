$(function(){
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [/^[^\s]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        samePwd:function(value){
            if (value === $('[name=oldPwd]').val())
            {
                return '新旧密码不能相同'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val())
            {
                return '两次密码输入不一致'
            }
        }
    })

    $('.layui-form').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url:"/my/updatepwd",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('请求错误或失败')
                }
                layui.layer.msg("更新密码成功")
                $('.layui-form')[0].reset()
            },
            error:function(res){
                return console.log("请求失败");
            }
        })
    })



})