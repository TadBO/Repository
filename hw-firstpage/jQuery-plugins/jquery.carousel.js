/**
 * Created by Tuber on 2017/4/6.
 */
//��װһ���ֲ�ͼ�Ĳ��
/**
 * ��װһ��ֻ���жϺ���������ģ�����Բ����ֲ�ͼ������html������ul>li����ʽ
 * todo ���Ұ�ť���Ƿ��ֲ���ͬʱ��Ҫ��ť��Բ�㣬ͬʱ��Ҫ�ֲ�����ť��ͬʱ��ҪԲ�㣬�ֲ���δ�жϣ�����ֵ���ڼ򵥣���û�������ж�
 * @param str
 */
$.fn.carousel = function (str) {
    //4.�ֲ�ͼ
    //1.������涯̬����һ�ź͵�һ��һ����ͼƬ��ʵ���޷�����

    var ul = this.find("ul");
    var ol = this.find("ol") || 0;
    var olLis = ol.find("li");
    var lis = ul.find("li");
    var li = lis[0].cloneNode(true);
    ul.append(li);
    // ��ʼ���жϣ�����switch case��������
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
            console.log("����Ƿ�ֵ");
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
    //�������Բ��ʱ����ͼƬ�˶�����Ӧ��λ��
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
     * ����һ�������˶��ĺ���
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