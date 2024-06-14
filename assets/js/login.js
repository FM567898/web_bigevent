$(function(){
    // 点击“去注册账号”的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })


    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            let password = $('.reg-box [name=password]').val()
            if(password != value){
                return '两次密码不一致'
            }
        }
    })

    let data = {
        username:$('#form_reg[name=username]').val(),
        password:$('#form_reg[name=password]').val()
    }
    // 监听注册表单事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post('http://ajax.frontend.itheima.net/api/reguser',
        data,
        function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }         
            layer.msg('注册成功，请登录！')
            $("#link_login").click()
        })
    })



    // 监听登录表单事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:"api/login",
            method:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status != 0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href = '../../index.html'
            }
        })
    })
})