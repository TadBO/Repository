/**
 * Created by Tuber on 2017/4/6.
 */
//封装一个轮播图的插件
/**
 * 封装一个只是判断横向还是纵向的，有无圆点的轮播图，并且html必须是ul>li的形式
 * todo 左右按钮，是否轮播，同时不要按钮，圆点，同时不要轮播，按钮，同时不要圆点，轮播等未判断，传入值过于简单，并没有深入判断
 * @param str
 */
$.fn.carousel = function (str) {
    //4.轮播图
    //1.在最后面动态生成一张和第一张一样的图片，实现无缝连接

    var ul = this.find("ul");
    var ol = this.find("ol") || 0;
    var olLis = ol.find("li");
    var lis = ul.find("li");
    var li = lis[0].cloneNode(true);
    ul.append(li);
    // 开始的判断，后用switch case进行完善
    //if(str=="left") {
    //    var imgWidth = lis.width();
    //}else if(str == "top") {
    //    var imgHeight = lis.height();
    //}
    switch(str) {
        case  "left":  var imgWidth = lis.width();
            break;
        case "top": var imgHeight = lis.height();
            break;
        default:
            console.log("传入非法值");
            return;
    }
    console.log(lis.height());
    var timeId = null;
    var circle = 0;
    timeId = setInterval(playNext,2000);
    var pic = 0;
    this.on("mouseenter", function () {
        clearInterval(timeId);
    });
   this.on("mouseleave", function () {
        timeId = setInterval(playNext, 2000);
    });
    //鼠标移入圆点时，让图片运动到相应的位置
    if(ol!=0){
        olLis.on("mouseenter", function () {
            ul.animate({
                left: -($(this).index() * imgWidth)
            },800,"swing");
            $(this).addClass("first").siblings().removeClass("first");
            pic = circle =$(this).index();
        })
    }

    /**
     * 定义一个向右运动的函数
     */
    function  playNext(){
        if(pic == lis.length ) {
            pic = 0;
            if(str == "left") {
                ul.css({
                    left: 0
                });
            }else if(str == "top") {
                ul.css({
                    top: 0
                });
            }
        }
        pic++;
        if(str=="left") {
            ul.stop().animate({
                left: -pic * imgWidth
            },800, "swing");
        }else if(str=="top") {
            ul.stop().animate({
                top: -pic * imgHeight
            },800, "swing");
        }
        if(ol != 0) {
            if(circle < olLis.length -1) {
                circle++;
            }else{
                circle = 0;
            }
            olLis.eq(circle).addClass("first").siblings().removeClass("first");
        }

    }
}