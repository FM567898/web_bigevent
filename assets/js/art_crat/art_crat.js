$(function(){
    let layer = layui.layer
    let form = layui.form
    function initArtCateList(){
        $.ajax({
            url:'/my/article/cates',
            method:'GET',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('请求失败')
                }
                let htmlstr = template('tpl-table',res)
                $('tbody').html(htmlstr)
            },
            error:function(res){
                return layer.msg("请求失败")
            }
        })
    }

    initArtCateList()
    let indexAdd = null
    $('#btnAddCate').click(function(){
        // 该方法返回当前层的唯一索引，以便其他方法对该弹层进行相关操作
        indexAdd = layer.open({
            type: 1, // page 层类型，其他类型详见「基础属性」
            area:['500px','250px'],
            title:"添加文章分类",
            content: $('#dialog-add').html()
        });
    })

    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            url:'/my/article/addcates',
            method:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                layer.close(indexAdd)
            },
            error:function(res){
                layer.msg("发送数据请求失败")
                return layer.close(indexAdd)
            }
        })
    })

    let indexEdit = null
    $('body').on('click','#btn-edit',function(){
        indexEdit = layer.open({
            type:1,
            area:['500px','250px'],
            title:'修改文章分类',
            content:$('#dialog-edit').html()
        })

        let id = $(this).attr('data-id') 
        $.ajax({
            url:'/my/article/cates/' + id,
            method:"GET",
            success:function(res){
                form.val('form-edit',res.data)
            }
        })



    })


    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            url:'/my/article/updatecate',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新分类数据失败')
                }
                layer.msg('更新分类数据成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })



    $('body').on('click','#btn-delet',function(e){
        let id = $(this).arrt('data-id')
        layer.confirm('确认删除',{icon:3,title:'提示'},
        function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletcate/' + id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('删除分离失败')
                    }
                    layer.msg('删除分类成功')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
        
    })
})