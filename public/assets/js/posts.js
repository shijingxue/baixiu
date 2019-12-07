//把所有文章渲染到页面
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(result) {
        console.log(result);
        //文章
        var html = template('postsTpl', { posts: result });
        $('#postsBox').html(html)
            //分页
        var html = template('pageTpl', result);
        $('#pageBox').html(html)
    }
})

function changePage(page) {

    $.ajax({
        type: 'get',
        url: '/posts',
        data: { page: page },
        success: function(result) {
            console.log(result);
            //文章
            var html = template('postsTpl', { posts: result });
            $('#postsBox').html(html)
                //分页
            var html = template('pageTpl', result);
            $('#pageBox').html(html)
        }
    })
}


//把分类列表获取
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(result) {
        console.log('categories->', result);
        var html = template('findTpl', { data: result });
        $('#findBox').html(html);
    }
})


//当用户进行文章列表筛选的时候
$('#queryForm').on('submit', function() {
    //获取选项
    var inn = $(this).serialize();
    //发送请求
    $.ajax({
            type: 'get',
            url: '/posts',
            data: inn,
            success: function(result) {
                console.log('123', result);

                var html = template('postsTpl', { posts: result });
                $('#postsBox').html(html)
                    //分页
                var html = template('pageTpl', result);
                $('#pageBox').html(html)
            }
        })
        //阻止表单的默认提交
    return false;
})


//删除按钮被点击
$('#postsBox').on('click', '#delete', function() {
    //拿到要删除的对象的id
    var id = $(this).attr('data-id');
    if (confirm('您确定要删除吗?')) {
        //发送请求
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function(result) {
                console.log(result);

                location.reload();
            }
        })
    }
})