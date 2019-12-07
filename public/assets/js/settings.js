//当管理员选择logo图片时
$('#logo').on('change', function() {
    var img = this.files[0];
    var formData = new FormData();
    formData.append('logo', img);
    //发送请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        contentType: false,
        processData: false,
        success: function(result) {
            console.log('logo', result);

            //给隐藏域
            $('#set_logo').val(result[0].logo);
            //显示在页面上
            $('#preview').attr('src', result[0].logo)
        }
    })
})

function serializeObj(form) {
    var arr = form.serializeArray();
    var obj = {};
    arr.forEach((item) => {
        obj[item.name] = item.value;
    })
    return obj;
}
//表单提交事件
$('#settingsForm').on('submit', function() {
    var text = serializeObj($(this));


    text.review = !!text.review;
    text.comment = !!text.comment;


    $.ajax({
        type: 'post',
        url: '/settings',
        data: text,
        success: function(result) {
            console.log(result);
            // location.reload();
        },
        error: function(res) {
            console.log(res);

        }
    })
    return false
})