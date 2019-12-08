//需求一：向服务器发送请求 索要轮播图数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(result) {
        // console.log(result);
        var html = template('bannerTpl', { data: result });
        $('#bannerBox').html(html);
        //把轮播图的js剪切到success
        //
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function(index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function() {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        });

    }

})

//获取最新发布数据
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function(result) {
        console.log(result);
        var html = template('newArticTpl', { news: result });
        $("#newArticBox").html(html);

    }
})