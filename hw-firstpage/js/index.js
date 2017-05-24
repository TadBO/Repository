/**
 * Created by Tuber on 2017/4/4.
 */

$(function () {
    //鼠标移入显示更多应用产品信息
    $(".top-left .apply-soft").hover(function () {
        $(this).children(".s-box").addClass("apply-soft apply-soft-show").children(".apply-hide").show();
    }, function () {
        $(this).children(".s-box").removeClass("apply-soft-show").children(".apply-hide").hide();
    })
    
    
    //图片懒加载
    $("img.lazy").lazyload();





    //鼠标移入3d效果

    $(".items-right li").on("mouseenter", function () {
        $(this).addClass("grid-items");
    });
    $(".items-left").on("mouseenter", function () {
        $(this).addClass("grid-items");
    });
    $(".recomment-items li").on("mouseenter", function () {
        $(this).addClass("grid-items");
    });
    $(".home-phone-main li").on("mouseenter", function () {
        $(this).addClass("grid-items");
    });
    $(".home-pc-main li").on("mouseenter", function () {
        $(this).addClass("grid-items");
    });
    $(".menu-center li").on("mouseenter", function () {
        $(this).addClass("grid-items");
    });
    //移出恢复原样
    $(".items-right li").on("mouseleave", function () {
        $(this).removeClass("grid-items");
    });
    $(".items-left ").on("mouseleave", function () {
        $(this).removeClass("grid-items");
    });
    $(".recomment-items li").on("mouseleave", function () {
        $(this).removeClass("grid-items");
    });
    $(".home-phone-main li").on("mouseleave", function () {
        $(this).removeClass("grid-items");
    });
    $(".home-pc-main li").on("mouseleave", function () {
        $(this).removeClass("grid-items");
    });
    $(".menu-center li").on("mouseleave", function () {
        $(this).removeClass("grid-items");
    });



    //鼠标移入显示边框
    $(".naver li").hover(function () {
        $(this).find("i").stop().animate({width: "100%"}, 800).end().find("a").css({color: "#CA141D"});
    }, function () {
        $(this).find("i").stop().animate({width: 0,}, 800).end().find("a").css({color: "#3a3a3a"});
    });
    $(".phone-nav li").hover(function () {
        $(this).find("i").stop().animate({width: "100%",}, 800).end().find("a").css({color: "#CA141D"});
    }, function () {
        $(this).find("i").stop().animate({width: 0,}, 800).end().find("a").css({color: "#A4A4A4"});
    });
    $(".pc-nav li").hover(function () {
        $(this).find("i").stop().animate({width: "100%",}, 800).end().find("a").css({color: "#CA141D"});
    }, function () {
        $(this).find("i").stop().animate({width: 0,}, 800).end().find("a").css({color: "#A4A4A4"});
    });


    //鼠标移入显示tab栏
    $(".classify-left").on("mouseleave", function () {
        $(this).css({backgroundColor: "rgba(0,0,0,0.7)"});
    })
    $(".classify-left ul li").hover(function () {
        $(this).css({backgroundColor : "rgba(255,255,255,0.7)"});
        $(this).find(".h").show();
    }, function () {
        $(this).css({backgroundColor: "rgba(255,255,255,0.07)"})
        $(this).find(".h").hide();
    })

    //呼吸灯效果切换图片
    var timeId = null;
    var index = 0;
    timeId = setInterval(autoPlay, 3000);
    //鼠标移入时停止轮播
    $(".banner").on("mouseenter", function () {
        clearInterval(timeId);
    });
    //鼠标移出重新开启轮播
    $(".banner").on("mouseleave", function () {
        timeId = setInterval(autoPlay, 3000);
    });
    //鼠标移入圆点显示对应的图片
    $(".banner .banner-index span").on("mouseenter", function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(".banner li").eq($(this).index()).stop().animate({
            opacity: 1
        }).siblings().stop().animate({
            opacity: 0
        });
        //同步圆点和图片
        index = $(this).index();
    })
    function  autoPlay(){
        if(index < $(".banner li").length - 1) {
            index++;
        }else {
            index = 0;
        }
        $(".banner li").eq(index - 1).stop().animate({
            opacity: 0
        },2000);
        $(".banner li").eq(index).stop().animate({
            opacity: 1
        },2000);
        $(".banner .banner-index span").eq(index).addClass("current").siblings().removeClass("current");
    }


    //精品推荐的轮播
    //1.鼠标移入的时候显示左右按钮
    $(".recomment-items").on("mouseenter", function () {
        $(this).find(".arrow").show();
    });
    //2.鼠标移出的时候隐藏左右按钮
    $(".recomment-items").on("mouseleave", function () {
        $(this).find(".arrow").hide();
    })
    //3.给左右按钮注册事件
    //右按钮
    var wid = 981;
    $(".recomment-items .arr-right").on("click", function () {
            //点击按钮时，移动的是ul一个屏幕的长度
            $(".recomment-items ul").stop().animate({
                left: -wid
            }, 500);
            $(this).css({cursor: "not-allowed"}).siblings().css({cursor: "pointer"});
    });
    //左按钮
    $(".recomment-items .arr-left").on("click", function () {
        $(".recomment-items ul").stop().animate({
            left: 0
        });
        $(this).css({cursor: "not-allowed"}).siblings().css({cursor: "pointer"});
    });


    //4.轮播图
    //1.在最后面动态生成一张和第一张一样的图片，实现无缝连接
    //var ul = $(".ad-slide").find("ul");
    //var ol = $(".ad-slide").find("ol");
    //var olLis = ol.find("li");
    //var lis = ul.find("li");
    //var li = lis[0].cloneNode(true);
    //ul.append(li);
    //var imgWidth = lis.width();
    //var timeId = null;
    //var circle = 0;
    //timeId = setInterval(playNext,2000);
    //var pic = 0;
    //$(".ad-slide").on("mouseenter", function () {
    //    clearInterval(timeId);
    //});
    //$(".ad-slide").on("mouseleave", function () {
    //    timeId = setInterval(playNext, 2000);
    //});
    ////鼠标移入圆点时，让图片运动到相应的位置
    //olLis.on("mouseenter", function () {
    //    ul.animate({
    //        left: -($(this).index() * imgWidth)
    //    },800,"swing");
    //    $(this).addClass("first").siblings().removeClass("first");
    //    pic = circle =$(this).index();
    //})
    ///**
    // * 定义一个向右运动的函数
    // */
    //function  playNext(){
    //    if(pic == lis.length ) {
    //        pic = 0;
    //        ul.css({
    //            left: 0
    //        });
    //    }
    //    pic++;
    //    ul.stop().animate({
    //        left: -pic * imgWidth
    //    },800, "swing");
    //    if(circle < olLis.length -1) {
    //        circle++;
    //    }else{
    //        circle = 0;
    //    }
    //    olLis.eq(circle).addClass("first").siblings().removeClass("first");
    //}
    $(".ad-slide").carousel("left");
    $(".notice-content").carousel("top");
})