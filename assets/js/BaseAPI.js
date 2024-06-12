// 在调用JQuery的Ajax,post,get请求的时候
// 会先调用ajaxprefilter这个函数
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net/' + options.url
})