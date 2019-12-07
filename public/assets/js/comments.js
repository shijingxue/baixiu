//获取评论列表
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(result) {
        console.log(result);
        var html = template('commentsTpl', result);
        $('#commentsBox').html(html)
    }
})

//评论的审核功能
//获取评论状态
//获取请求 更改评论状态
$('#commentsBox').on('click', '.status', function() {
    var id = $(this).attr('data-id');
    //获取文章的状态
    var status = $(this).attr('data-status');
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0,
        },
        success: function(result) {
            location.reload();
        }
    })
})