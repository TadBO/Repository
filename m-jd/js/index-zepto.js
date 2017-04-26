$(function () {

    var index = 1;
    var w = $(".jd-banner").width();
    function  setAnimate(index, w){
        $(".jd-banner ul").animate({
            "translateX": -index * w + "px"
        }, 300, function () {
            if(index >= 9) {
                index = 1;
            }
            if(index <= 0) {
                index = 8;
            }
            $(".jd-banner ul").css({
                "transform": "translateX("+-index * w+"px)"
            });
            $(".jd-banner ol li").eq(index - 1).addClass("active").siblings().removeClass("active");
        })
    }
    var timeId = setInterval(function () {
        index++;
       setAnimate(index,w);
    }, 4000)
    document.querySelector(".jd-banner").addEventListener("touchmove", function (e) {
        e.preventDefault();
    });
    $(".jd-banner").swipeLeft(function () {
        index++;
        setAnimate(index, w);
    })
    $(".jd-banner").swipeRight(function () {
        index--;
        setAnimate(index, w);
    })

});
