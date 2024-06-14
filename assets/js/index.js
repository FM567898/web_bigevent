$(function(){
    getUserinfo()
    let layer = layui.layer
    $('#btnLogout').click(function(){     
        layer.confirm('确定退出登录？', {
            btn: ['确定', '取消']
        },function(index){
            localStorage.removeItem('token')
            location.href = '../../index.html'
            layer.close(index)
        });
    })
})



function getUserinfo(){
    $.ajax({
        url:'/my/userinfo',
        method:"GET",
        // headers就是请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status != 0){
                return layui.layer.msg("请求失败")
            }
            renderAvatar(res.data)
        },
        error: function(res){
            return console.log('请求失败');
        },
        // Complete:function(res){
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败'){
        //         localStorage.removeItem('token')
        //         location.href = '../../login.h'
        //     }
        // }
    })
}

// 用户头像的渲染
function renderAvatar(user){
    // 获取用户的名称
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
    }else{
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
    }
}