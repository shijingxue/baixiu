//索要热门推荐数据
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(result) {
        var text = `
        {{each reco}}
        <li>
            <a href="detail.html?id{{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
            </a>
        </li>
        {{/each}}
        `;
        console.log('热门推荐', result);
        // var html = template('hotRecomTpl', { reco: result })
        var html = template.render(text, { reco: result })
        $('#hotRecomBox').html(html);
    }
})