$(function(){

    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)


    $("#btnChooseImage").click(function(){
        $("#file").click()
    })



    $('#file').change(function(e){
        let filelist = e.target.files
        if(filelist.length === 0){
            return layer.msg('请选择照片！')
        }

        let file = e.target.files[0]
        let imgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            .attr('src',imgURL)
            .cropper(options)
    })


    $('#btnUpload').click(function(){
        let dataURL = $image
            .cropper('getCroppedCanvas',{
                width:100,
                height:100
            })
            .toDataURL('image/png')
        $.ajax({
            method:"POST",
            url:'/my/updata/avatar',
            data:{
                avatar:dataURL
            },
            success:function(res){
                if(res.satus !== 0){
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')
                window.parent.getUserInfo()
            },
            error:function(res){
                return layer.msg("更换头像失败");
            }

        })
    })
})