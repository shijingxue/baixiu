//向服务器请求所有分类列表
function getCategory() {
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function(result) {
            console.log(result);
            var html = template('catetoryTpl', { categories: result });
            $('#categoryBox').html(html);
        }
    })

}
getCategory();

//添加分类表单发生提交行为
// fa - glass
$('#addCategory').on('submit', function() {
    //获取用户输入的内容
    var rel = $(this).serialize();
    $.ajax({
            type: 'post',
            url: '/categories',
            data: rel,
            success: function(result) {
                alert('添加成功');
                console.log(result);
                getCategory();

            }
        })
        //阻止表单的默认事件
    return false;
})

//为编辑按钮添加事件 把点击的分类信息添加到页面
$('#categoryBox').on('click', '.edit', function() {
    //拿到要编辑的id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(result) {
            console.log(result);

            var html = template('editTpl', result);
            $('#editBox').html(html)
        }
    })
})

//分类数据修改提交
$('#editBox').on('submit', '#editCategory', function() {
    //获取模板中的内容
    var text = $(this).serialize();
    //拿到需要修改的id
    var id = $(this).attr('data-id');
    //发送请求
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: text,
        success: function(result) {
            console.log(result);
            location.reload;
        }
    })
})


//删除分类操作
$('#categoryBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    if (confirm('您确定要删除吗')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function(result) {
                // console.log(result);
                alert('删除成功');
                getCategory();
            }
        })

    }
})