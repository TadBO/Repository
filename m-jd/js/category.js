/**
 * Created by Tuber on 2017/4/23.
 */

window.onload = function () {
    //获取操作对象
    var leftBox = document.querySelector(".body-left");
    var ul = leftBox.querySelector("ul");
    var lis = ul.querySelectorAll("li");
    var rightBox = document.querySelector(".body-right");
    var rightIn = rightBox.querySelector(".right-in");



    //手指移动时事件
    //左侧
    swipeLeft();
    function  swipeLeft(){
        var currentY = 0;
        //获取临界值
        //定位临界值
        var maxTop = 0;
        var minTop = leftBox.offsetHeight - ul.offsetHeight;
        //滑动临界值
        var maxSwipe = maxTop + 120;
        var minSwipe = minTop - 120;

        //注册事件
        /**
         * 1.点击事件
         * 需求：
         * 1.点击让当前li改变样式
         * 2.让li移动到最顶部（就是ul移动）
         * 3.ul移动不能超过临界值
         */
        itcast.tap(leftBox, function (e) {
            for(var i = 0; i < lis.length; i++) {
                lis[i].classList.remove("current");
                lis[i].index = i;
            }
            e.target.parentNode.classList.add("current");
            var target = e.target.parentNode;
            var y = -target.index * 50;
            if(y > maxTop) {
                y = maxTop;
            }
            if(y < minTop) {
                y = minTop;
            }
            ul.style.transition = "transform .2s";
            ul.style.transform = "translateY("+y+"px)";
            currentY = y;
        });
        var startY = 0;
        var moveY = 0;
        var distence = 0;
        leftBox.addEventListener("touchstart", function (e) {
            startY = e.targetTouches[0].clientY;
        });
        leftBox.addEventListener("touchmove", function (e) {
            moveY = e.targetTouches[0].clientY;
            distence = moveY - startY;
            var y = distence + currentY;
            if(y > maxSwipe) {
                y = maxSwipe;
            }
            if(y < minSwipe) {
                y = minSwipe;
            }
            ul.style.transition = "none";
            ul.style.transform = "translateY("+y+"px)";
        });
        leftBox.addEventListener("touchend", function (e) {
            currentY =  distence + currentY;
            if(currentY > maxTop) {
                currentY = maxTop;
                ul.style.transition = "transform .2s";
                ul.style.transform = "translateY("+currentY+"px)";
            }
            if(currentY < minTop) {
                currentY = minTop;
                ul.style.transition = "transform .2s";
                ul.style.transform = "translateY("+currentY+"px)";
            }
            //数据重置
            startY = moveY = distence = 0;
        });

    }
    //右侧
    swipeRight(rightBox,rightIn);
    function  swipeRight(leftBox, ul){
        var maxTop = 0;
        var minTop = leftBox.offsetHeight - ul.offsetHeight;
        var maxSwipe = maxTop + 120;
        var minSwipe = minTop - 120;
        var startY = 0;
        var moveY = 0;
        var distence;
        leftBox.addEventListener("touchstart", function (e) {
            startY = e.targetTouches[0].clientY;
        });
        leftBox.addEventListener("touchmove", function (e) {
            moveY = e.targetTouches[0].clientY;
            distence = moveY - startY;
            var y = distence + currentY;
            if(y > maxSwipe) {
                y = maxSwipe;
            }
            if(y < minSwipe) {
                y = minSwipe;
            }
            ul.style.transition = "none";
            ul.style.transform = "translateY("+y+"px)";
        });
        leftBox.addEventListener("touchend", function () {
            currentY =  distence + currentY;
            if(currentY > maxTop) {
                currentY = maxTop;
                ul.style.transition = "transform .2s";
                ul.style.transform = "translateY("+currentY+"px)";
            }
            if(currentY < minTop) {
                currentY = minTop;
                ul.style.transition = "transform .2s";
                ul.style.transform = "translateY("+currentY+"px)";
            }
            //数据重置
            startY = moveY = distence = 0;
        });
    }

}