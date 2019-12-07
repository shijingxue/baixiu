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
        var html = template('pageTpl', { page: result });
        $('#pageBox').html(html)
    }
})