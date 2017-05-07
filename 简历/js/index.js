$(function () {
    //ȫ���л�
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

    //�ֲ�ͼ
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

    //�Զ�����
    timeId = setInterval(function () {
        playNext();
    }, 2000);

    /**
     * ����һ�����ҹ����ĺ���
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

    //������������ʱ��
    $('.progrem ul').mouseenter(function(){
        clearInterval(timeId);
    });
    //����Ƴ����¿�����ʱ��
    $(".progrem ul").mouseleave(function () {
      timeId = setInterval(function () {
            playNext();
        }, 2000);
    })
});