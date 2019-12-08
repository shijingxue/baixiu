//获取地址栏中的categoryId
var categoryId = getUrl('categoryId');
//根据分类获取文章列表
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function(result) {
        // console.log(result);
        var html = template('listTpl', { data: result });
        $('#listBox').html(html);
    }
})


//根据分类id获取分类信息
$.ajax({
    type: 'get',
    url: '/categories/' + categoryId,
    success: function(result) {
        // console.log(result);
        $('#categoryTitle').html(result.title)
    }
})