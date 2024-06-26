$(function(){
    let layer = layui.layer
    let form = layui.form
    initCate()
    initEditor()
    function initCate(){
        $.ajax({
            method:"GET",
            url:'/my/article/cates',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('初始化文章分类失败')
                }

                let htmlstr = template('tpl-cate',res)
                $('[name=cate_id]').html(htmlstr)
                form.render()
            }
        })
    }

    let $image = $('#image')
    let options = {
        asspectRatio:400 / 200,
        preview:'.img-preview'
    }
    $image.cropper(options)


    $('#btnChooseImage').on('click',function(){
        $('#coverFile').click()
    })


    $('#coverFile').on('change',function(e){
        let files = e.target.files
        if(files.length === 0){
            return
        }
        let newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy')
            .attr('src',newImgURL)
            .cropper(options)
    })

    let art_state = '已发布'
    $('#btnSave2').on('click',function(){
        art_state = "草稿"
    })

    $('#form-pub').on('submit',function(e){
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state'.art_state)
        $image
            .cropper('getCroppedCanvas',{
                width:400,
                height:200
            })
            .toBlob(function(blob){
                fd.append('cover_img',blob)

            })
            
    })


    function publishArticle(){
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data:fd,
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("文章发布失败")
                }
                layer.msg('文章发布成功')
                location.href = '../article/art_list.html'
            }
        })
    }
})