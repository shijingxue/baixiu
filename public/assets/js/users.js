//用户列表
function userReload() {
    $.ajax({
        type: 'get',
        url: '/users',
        success: function(result) {
            console.log(result);

            //将获取的数据拼接到页面
            var html = template('userTpl', { users: result });
            $('#userBox').html(html);
            // location.reload;
        }
    })
}

userReload();

function serializeObj(form) {
    var arr = form.serializeArray();
    var obj = {};
    arr.forEach((item) => {
        obj[item.name] = item.value;
    })
    return obj;
}

$('#userForm').on('submit', function() {
    //把表单中的内容获取
    var obj = serializeObj($(this));
    console.log(obj);
    //新增用户
    //发送请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: obj,
        success: function(result) {
            console.log(result);
            userReload()
            location.reload;
        }
    })


    //阻止表单的默认事件
    return false;
})



//处理头像上传功能
//上传头像
$('#userForm').on('change', '#avatar', function() {
    // 用户选择到的文件
    // this.files[0]
    var formData = new FormData(); //用来上传文件
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function(response) {
            console.log(response)
                // 实现头像预览功能
            $('#preview').attr('src', response[0].avatar);
            $('#inputHidden').val(response[0].avatar);
            userReload();
        }
    });
});


//点击编辑按钮  修改用户信息
$('#userBox').on('click', '.btn-default', function() {
    //拿到要编辑的用户的id
    var id = $(this).attr('data_id');
    //发送请求  把数据传给服务器  并把内容显示到页面
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(result) {
            // console.log(result);
            var html = template('motifyTpl', result);
            $('#motifyBox').html(html);

        }
    })
})

//修改表单提交
$('#motifyBox').on('submit', '#userForm', function() {
    var inn = $(this).serialize();
    //拿到要编辑的用户的id
    var id = $(this).attr('data_id');
    $.ajax({
        type: 'PUT',
        url: '/users/' + id,
        data: inn,
        success: function(result) {
            console.log(result);
            userReload();
            location.reload;
        }
    })
    return false;
})

//删除按钮
$('#userBox').on('click', '.delete', function() {
    var id = $(this).attr('data_id');
    //删除单个用户
    if (confirm('您确定删除该用户？')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function(result) {
                userReload();
            }
        })
    }
})

//全选操作代码
$('#checkedAll').on('change', function() {
    var status = $(this).prop('checked');
    // alert(status)
    //让其他按钮全选
    $('#userBox').find('input:checkbox').prop('checked', status);
    //先把按钮显示出来
    if (status) {
        $('.deleteMany').show();
    } else {
        $('.deleteMany').hide();
    }

})

//复选框事件
var userBox = $('#userBox');
userBox.on('change', 'input', function() {
    var nowCheck = userBox.find('input').filter(':checked').length;
    var totalInput = userBox.find('input').length;
    // console.log(nowCheck);

    if (totalInput == nowCheck) {
        //全选按钮选中
        $('#checkedAll').prop('checked', true);
    } else {

        $('#checkedAll').prop('checked', false);
    }
    //先把按钮显示出来
    if (nowCheck > 0) {
        $('.deleteMany').show();
    } else {
        $('.deleteMany').hide();
    }

})

//批量删除事件
$('.deleteMany').on('click', function() {
    //获取要删除的事件的id
    var id = [];
    //获取选中的用户
    var checked = userBox.find('input').filter(':checked');
    //把用户遍历 得到其id
    checked.each(function(index, element) {
        id.push($(element).attr('data-id'));
    })
    if (confirm('您真的要删除吗？')) {
        //发送请求
        $.ajax({
            type: 'delete',
            url: '/users/' + id.join('-'),
            success: function(result) {
                console.log(result);
                userReload();
            }
        })

    }
})