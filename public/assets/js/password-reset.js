//为修改密码添加点击事件
$('#passwordForm').on('submit', function() {
    //获取输入的密码  收集表单数据
    var inn = $(this).serialize();
    //todo 加上密码长度的校验
    //发请求
    $.ajax({
            type: 'put',
            url: '/users/password',
            data: inn,
            success: function(result) {
                alert('修改成功，请重新登录');

                location.href = '/admin/login.html';
            }
        })
        //阻止默认行为
    return false;
})