//处理日期格式
function time(date) {
    //将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

//从浏览器的地址栏中获取查询参数
function getUrl(name) {
    // location.search(); //获取查询的参数
    // console.log(location.search);

    //以&为分割
    var parasAry = location.search.substr(1).split('&');
    //循环数据
    for (var i = 0; i < parasAry.length; i++) {
        var sta = parasAry[i].split('=');
        if (sta[0] == name) {
            return sta[1];
        }

    }
    //如果没有参数就表示没有参数
    return -1;
}

//索要随机推荐数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(result) {
        // console.log('随机推荐', result);
        var text = `
        {{each randoms}}
        <li>
            <a href="list.html?id='{{$value._id}}'">
                <p class="title">{{$value.title}}</p>
                <p class="reading">{{$value.meta.views}}(819)</p>
                <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                </div>
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(text, { randoms: result });
        $('#randomBox').html(html);

    }
})


//获取最新评论数据
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(result) {
        // console.log(result);

        var htmler = `
        {{each data}}
        <li>
        <a href="javascript:;">
        <div class="avatar">
        <img src="{{$value.author.avatar}}" alt="">
        </div>
        <div class="txt">
        <p>
            <span>{{$value.author.nickName}}</span>{{$imports.time($value.createAt)}}说:
        </p>
        <p>{{$value.content}}</p>
        </div>
        </a>
        </li>
        {{/each}}
        `;
        var html = template.render(htmler, { data: result });
        $('#newBox').html(html)
    }
})


//向服务器发送请求  获取文章分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(result) {
        // console.log("分类列表", result);
        var cata = `
        {{each navs}}
        <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `;
        var html = template.render(cata, { navs: result });
        $('#navBox').html(html);
    }
})


//获取搜索表单  并为其添加表单的提交事件
//获取到搜索表单 并为其添加表单提交事件
$('.search form').on('submit', function() {
    //获取到用户在表单输入的搜索关键字
    var keys = $(this).find('.keys').val();
    //跳转到搜索结果页面
    location.href = '/search.html?key=' + keys;
    //阻止表单的默认提交行为
    return false
})