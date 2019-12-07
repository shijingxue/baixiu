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

//格式化时间 
// template.defaults.imports.dateFormate
function time(date) {
    //将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}