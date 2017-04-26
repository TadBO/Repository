/**
 *
 * Created by Tuber on 2017/4/21.
 */

window.onload = function () {
    //动态改变header部分颜色
    changeColor();
    //倒计时部分
    downTime();

    //轮播图
    carousel();
};


/**
 * 定义一个动态改变header部分颜色的函数
 */
function  changeColor(){
    var header = document.querySelector(".header-in");
    var banner = document.querySelector(".jd-banner");
    var bannerHeight = banner.offsetHeight;
    window.onscroll = function () {
        var scrollHeight = document.body.scrollTop;
        var opcity = 0;
        opcity = scrollHeight / bannerHeight;
        if(opcity > 0.85) {
            opcity = 0.85;
        }
        header.style.backgroundColor = "rgba(201, 21, 35,"+opcity+")";
    }
}

/**
 * 定义一个输入时间，自动到计时的函数
 */
function  downTime(){
    var allTime = 12 * 60 * 60;
    var timeId = setInterval(function () {
        allTime--;
        var h = Math.floor(allTime / 3600);
        var m = Math.floor(allTime % 3600 / 60);
        var s = Math.floor(allTime % 60);
        var spans = document.querySelectorAll(".time span");
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = Math.floor(h % 10);
        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = Math.floor(m % 10);
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = Math.floor(s % 10);
        if(allTime <= 0) {
            clearInterval(timeId);
        }
    }, 1000);

}

function  carousel(){
    var index = 1;
    var banner = document.querySelector(".jd-banner");
    var w = banner.offsetWidth;
    var ul = banner.querySelector("ul");
    function  addTransition(time){
        ul.style.transition = "all "+time+"s";
        ul.style.webkitTransition = "all "+time+"s";
    }

    function  removeTransition(){
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }

    function setTransform(x) {
        ul.style.transform = "translateX("+ x+"px)";
        ul.style.webkitTransform = "translateX("+ x+"px)";
    }

    var timeId = setInterval(function () {
        index++;
        addTransition(0.5);
        setTransform(-index*w);
        //ul.style.transform = "translateX("+ -index * w+"px)";
    }, 4000)

    ul.addEventListener("transitionend", function () {
        if(index >= 9) {
            index = 1;
            removeTransition();
            //ul.style.transform = "translateX("+ -index * w+"px)";
            setTransform(-index*w);
        }
        if(index <= 0) {
            index = 8;
            removeTransition();
            //ul.style.transform = "translateX("+ -index * w+"px)";
            setTransform(-index*w);
        }
        setPoint(index);
        console.log(index);
    })

    //bindTransitionEnd(ul, function () {
    //        if (index >= 9) {
    //            index = 1;
    //            removeTransition();
    //            //ul.style.transform = "translateX("+ -index * w+"px)";
    //            setTransform(-index * w);
    //        }
    //        if (index <= 0) {
    //            index = 8;
    //            removeTransition();
    //            //ul.style.transform = "translateX("+ -index * w+"px)";
    //            setTransform(-index * w);
    //        }
    //        setPoint(index);
    //    })
    function  bindTransitionEnd(obj, fn){
        if(typeof obj == "object") {
            obj.addEventListener("transitionend", function () {
                fn&&fn();
            })
            obj.addEventListener("webkitTransitionEnd", function () {
                fn&&fn();
            })
        }
    }


    function  setPoint(index){
        var lis = document.querySelectorAll(".jd-banner ol li");
        for(var i = 0; i < lis.length; i++) {
             lis[i].classList.remove("active");
        }
        lis[index-1].classList.add("active");
    }

    var startX = 0;
    var moveX = 0;
    var distenceX = 0;
    banner.addEventListener("touchstart", function (e) {
        clearInterval(timeId);
        startX = e.targetTouches[0].clientX;
    })
    banner.addEventListener("touchmove", function (e) {
        moveX = e.targetTouches[0].clientX;
        distenceX = moveX - startX;
        removeTransition();
        setTransform(-index*w + distenceX);
    })
    banner.addEventListener("touchend", function () {
        if(Math.abs(distenceX) > w/3) {
            if(distenceX > 0) {
                index--;
            } else if(distenceX < 0) {
                index++;
            }
        }
        addTransition(0.5);
        setTransform(-index*w);
        stratX = moveX = distenceX = 0;
        timeId = setInterval(function () {
            index++;
            addTransition(0.5);
            setTransform(-index*w);
        },4000)
    })

}