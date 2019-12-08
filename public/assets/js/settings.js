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
        //请求的额超时时间
        timeout: 5000,
        success: function(result) {
            console.log(result);
            location.reload();
        },
        error: function(res) {
            console.log(res);

        }
    })
    return false
})

//回显用户设置
//向网站发送数据  索要网站配置数据
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(result) {
        console.log(result);

        //将各项信息显示在页面
        //存在隐藏域中
        $('#site_logo').val(result.logo)
            //把logo显示出来
        $('#preview').attr('src', result.logo);
        //站点名称
        $('input[name="title"]').val(result.title);
        //站点描述
        $('#site_description').val(result.description);
        //站点关键词
        $('input[name="keywords"]').val(result.keywords);
        //开启评论功能
        $('input[name="comment"]').prop('checked', result.comment);
        //人工批准
        $('input[name="review"]').prop('checked', result.review);
    }
})