//获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(result) {
        var html = template('optionsTpl', { option: result });
        $('#category').html(html);
    }
})

//当管理员先择文件的时候  触发事件  上传文件功能
$('#feature').on('change', function() {
    var obj = this.files[0];
    //创建一个formDate对象  用来上传文件
    var formData = new FormData();
    formData.append('cover', obj);
    //发生请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉Ajax不要设置请求参数类型
        contentType: false,
        //告诉ajax不要解析请求参数
        processData: false,
        success: function(result) {
            console.log(result);
            // $('#feature').attr('src', result[0].cover);
            //隐藏域
            $('#thumbnail').val(result[0].cover)
        }
    })
})


//当添加文章表单提交的时候
$('#addForm').on('submit', function() {
    //获取输入的内容
    var text = $(this).serialize();

    //发送请求
    $.ajax({
        type: 'post',
        url: '/posts',
        data: text,
        success: function(result) {
            console.log(result);
            //文章添加成功  跳转到文章列表页面
            location.href = '/admin/posts.html';
        }
    })

    //阻止表单的默认行为
    return false;
});


//从浏览器地址栏获取查询参数
function getUrlParams(name) {
    //拿到？及之后的内容  并分割开
    var query = location.search.slice(1).split('&');
    //默认为-1  没有就是-1
    var value = -1;
    // console.log(query);
    if (query && query.length > 0) {
        query.forEach(item => {
            var tmp = item.split('=');
            if (name === tmp[0]) {
                value = tmp[1];
            }
        })
    }
    return value

}

//获取浏览器地址栏中的id
var id = getUrlParams('id')
    //返回值不为-1则表示是修改操作
if (id != -1) {
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        success: function(response) {
            //根据id获取文章内容
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(result) {
                    response.result = result;
                    console.log(response);
                    var html = template('changeTpl', response);
                    $('#changeForm').html(html);
                }
            })
        }
    })
}



//修改表单发生提交行为
$('#changeForm').on('submit', '#addForm', function() {
    var text = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
            type: 'put',
            url: '/posts/' + id,
            data: text,
            success: function(result) {
                location.href = '/admin/posts.html';
            }
        })
        //阻止默认事件
    return false
})