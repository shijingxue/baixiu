$('#logout').on('click', function(e) {
    //二次确认是否退出
    var isConfirm = confirm('您确定要退出吗?');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(result) {
                location.href = 'login.html';

            }
        })
    }
})