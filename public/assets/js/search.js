// //获取浏览器搜索栏中的搜索关键字
// var key = getUrl('key');
// //根据搜索关键字调用搜索接口
// $.ajax({
//     type: 'get',
//     url: '/posts/search/' + key,
//     success: function(result) {
//         console.log(result);
//         var html = template('searchTpl', { data: result });
//         $('#searchBox').html(html);
//     }
// })