//图片轮播数据添加
//1.管理员选择文件的时候
$('#image').on('change', function() {
    var img = this.files[0];
    //创建formdata对象 上传文件
    var formData = new FormData();
    formData.append('image', img);

    //发送请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉Ajax不要设置请求参数类型
        contentType: false,
        //告诉Ajax不要解析请求参数
        processData: false,
        success: function(result) {
            console.log(result);
            $('#unimage').val(result[0].image);
        }
    })
})

//2.轮播图表单发生提交事件
$('#slidesForm').on('submit', function() {
    var text = $(this).serialize();
    //发送请求
    $.ajax({
            type: 'post',
            url: '/slides',
            data: text,
            success: function(result) {
                console.log('提交', result);
                location.reload();
            }
        })
        //阻止表单的默认提交事件
    return false;
})

//3.显示轮播图列表
$.ajax({
        type: 'get',
        url: '/slides',
        success: function(result) {
            console.log('获取列表', result);
            var html = template('slidesTpl', { data: result });
            $('#slideBox').html(html);
            location.reload;
        }
    })
    //删除轮播图
$('#slideBox').on('click', '.delete', function() {
    //拿到要删除对象的id
    var id = $(this).attr('data-id');
    if (confirm('您确定要删除吗？')) {
        //发送请求
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function(result) {
                console.log('删除的元素', result);
                location.reload();
            }
        })

    }
})