// 在调用JQuery的Ajax,post,get请求的时候
// 会先调用ajaxprefilter这个函数
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    options.complete = function(){
        Complete:function(res){
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败'){
                localStorage.removeItem('token')
                location.href = '../../login.h'
            }
        }
    }
})