$(function(){
    let layer = layui.layer 
    let form = layui.form
    let laypage = layui.laypage
    initTable()
    initCate()

    template.defaults.imports.dataFormat = function(data){
        const dt = new Date(data)


        let y = dt.getFullYear()
        let m = pddZero(dt.getMonth() + 1)
        let d = pddZero(dt.getDate())


        let hh = pddZero(dt.getHours())
        let mm = pddZero(dt.getMinutes())
        let ss = pddZero(dt.getSeconds())


        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss
    }   

    function pddZero(n){
        return n > 9 ? n : '0' + n
    }


    let q = {
        pagenum:1, // 页码值，默认请求第一页的数据
        pagesize:2, // 每页显示几条数据，默认每页显示两条
        cate_id:'', // 文章分类的id
        state:'' // 文章的发布状态
    }
    
    
    function initTable(){
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取文章列表失败')
                }
                // 使用模板引擎渲染数据
                let htmlstr = template('tpl-table',res)
                $('tbody').html(htmlstr)
                renderPage(res.total)
            }
        })


    }



    function initCate(){
        $.ajax({
            method:"GET",
            url:'/my/article/cates',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("获取分类数据失败")
                }
            let htmlstr = template('tpl-cate',res)
            $('[name=cate_id]').html(htmlstr)
            form.render()

            }

        })
    }

    $('#form-search').on('submit',function(e){
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })


    function renderPage(total){
        laypage.render({
            elem:"pageBox",
            count:total,
            limit:p.pagesize,
            curr:q.pagenum,
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],
            jump:function(obj,first){
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if(!first){
                    initTable()
                }
            }

            
        })
    }




    $('body').on('click','.btn-delete',function(){
        layer.confirm('确认删除?',{icon:3,title:'提示'},function(index){
            let id = $(this).attr('data-id')
            let len = $('.btn-delete').length
            $.ajax({
                method:"GET",
                url:'/my/article/delete/:id' + id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功')
                    if(len === 1){
                        q.pagenum = q.pagenum === 1 ? 1 : p.pagenum - 1
                    }
                }
            })
        })
    })
})