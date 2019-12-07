//获取文章数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function(result) {
        // console.log(result);

        $('#artical').html('<strong>' + result.postCount + '</strong>篇文章（<strong>' + result.draftCount + '</strong>篇草稿）');
        location.reload;
    }
})

//获取分类数量
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function(result) {
        $('#categroy').html('<strong>' + result.categoryCount + '</strong>个分类')
    }
})

//获取评论数量
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function(result) {
        console.log(result);

        $('#comment').html('<strong>' + result.commentCount + '</strong>条评论（<strong>1</strong>条待审核）')
    }
})