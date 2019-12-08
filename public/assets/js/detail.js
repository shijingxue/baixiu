//从地址栏中获取文章id
var postId = getUrl('id');
//评论是否经过人工审核
var review;

//根据文章id获取文章详细信息
$.ajax({
    type: 'get',
    url: '/posts/' + postId,
    success: function(result) {
        console.log(result);
        var html = template('artTpl', result);
        $('#artBox').html(html)
    }
})

//点赞按钮发生点击事件
$('.article').on('click', '#like', function() {
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + postId,
        success: function() {
            alert('点赞成功，感谢您的支持')
        }
    })
})

//获取网站配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(result) {
        // console.log(result);
        review = result.review;
        var html = template('commentTpl', { data: result });
        $('#comment').html(html);
    }
})

//当评论表单发生提交行为的时候
$('#comment').on('submit', 'form', function() {
    //获取用户输入的评论内容
    var attr = $(this).find('textarea').val();
    // console.log(attr);

    //代表评论状态
    var state;
    if (review) {
        //要经过人工审核
        satte = 0;
    } else {
        //不需要经过人工审核
        state = 1;
    }
    //向服务器发送请求 执行添加评论操作
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            attr: attr,
            post: postId,
            state: state,
        },
        success: function() {
            alert('评论成功');
            location.reload();
        },
        error: function() {
            alert('评论失败');
        }

    })

    //阻止表单默认行为
    return false;
})