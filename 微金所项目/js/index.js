/**
 * Created by Tuber on 2017/4/17.
 */

window.onload = function () {
    banner();
    setWidth();
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $(".modal .wjs-login").modal('hide');
})

function  banner(){
    var startX=0;
    var moveX=0;
    var distenceX=0;
    var carousel = document.querySelector(".carousel")
    carousel.addEventListener("touchstart", function (e) {
        startX = e.targetTouches[0].clientX;
    });
    carousel.addEventListener("touchmove", function (e) {
        moveX = e.targetTouches[0].clientX;
        distenceX =moveX - startX;
    });
    carousel.addEventListener("touchend", function () {
        if(distenceX > 0) {
            $(".carousel").carousel('prev');
        }else if( distenceX < 0) {
            $(".carousel").carousel('next');
        }
        startX = 0;
        moveX = 0;
        distenceX = 0;
    })
}


function  setWidth(){
    var w = 0;
    $(".wjs-tabs li").each(function (index, e) {
        w += $(e).innerWidth();
    })
    $(".wjs-tabs").width(w);
}

