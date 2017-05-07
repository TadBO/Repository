$(function () {
    //全屏切换
    $('#fullpage').fullpage({
        verticalCentered: false,
        menu: true,
        anchors: ["page1", "page2","page3", "page4","page5"],
        afterLoad: function (anchorLink, index) {
            $(".section").removeClass("current");
            setTimeout(function () {
                $(".section").eq(index - 1).addClass("current");
            }, 100);
        }
    });

    //轮播图
    var index = 0;
    var isEnd = true;
    var timeId = null;
    $(".right").click(function () {
        playNext();
    });

    $(".left").click(function () {
        if(isEnd) {
            index--;
            var r = -index * 90;
            isEnd = false;
            $(".progrem ul li").css({
                transform: "rotateX("+r+"deg)",
                transition: "transform .5s"
            }).each(function (index,ele) {
                $(ele).css({
                    "transition-delay": index * 0.2 + "s"
                });
            });
        }
    });

    $(".progrem li").eq(4).on("transitionend", function () {
        isEnd = true;
    });

    //自动播放
    timeId = setInterval(function () {
        playNext();
    }, 2000);

    /**
     * 定义一个向右滚动的函数
     */
    function  playNext(){
        if(isEnd) {
            index++;
            var r = -index * 90;
            isEnd = false;
            $(".progrem ul li").css({
                transform: "rotateX("+r+"deg)",
                transition: "transform .5s"
            }).each(function (index,ele) {
                $(ele).css({
                    "transition-delay": (index * 0.2 + 3) + "s"
                });
            });
        }
    }

    //鼠标移入清除定时器
    $('.progrem ul').mouseenter(function(){
        clearInterval(timeId);
    });
    //鼠标移出重新开启定时器
    $(".progrem ul").mouseleave(function () {
      timeId = setInterval(function () {
            playNext();
        }, 2000);
    })
});