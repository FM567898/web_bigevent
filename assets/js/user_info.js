$(function(){
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '昵称长度必须在1 ~ 6 个字符之间'
            }
        }
    })

    initUserInfo()


    function initUserInfo(){
        $.ajax({
            url:'/my/userinfo',
            method:"GET",
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('请求失败')
                }
                form.val('fornUserInfo',res.data)
            },
            error:function(res){
                return console.log('请求失败');
            }
        })
    }


    $('#btnReset').click(function(e){
        e.preventDefault()
        initUserInfo()
    })


    $('.layui-form').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/my/userinfo',
            method:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('请求失败')
                }
                window.parent.getUserInfo()
            },
            error:function(res){
                return console.log('请求失败');
            }
        })
    })
})