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



function time(date) {
    //将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

//索要用户登录信息

$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {
        console.log(response);
        $('.avatar').attr('src', response.avatar);
        $('.profile .name').html(response.nickName)
    }
})