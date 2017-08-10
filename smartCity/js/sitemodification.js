/**
 * Created by Tuber on 2017/8/7.
 */
//现场改动部分逻辑
$(function () {
    //进入页面判断是否为改劝页面，保留警告
    if(GetQueryString('type') == 1) {
        $('.warn').css('display', 'block');
        $('.header .h1').html('简易流程');
    }


    var base64,
        value;
    function getData() {
        var data = '';
        data = $('form').serialize();
        //获取经纬度
        //经度
        //data.LONGITUDE = queryGsyInfomation()[0];
        //测试
        data += '&LONGITUDE=120.199231';
        //纬度
        //data.LATITUDE = queryGsyInfomation()[1];
        //测试
        data += '&LATITUDE=30.23581';
        //获取事件小类
        data += '&EVEN_FENLS='+ value;
        //获取部门，安卓给过来
        //测试
        data += '&DEPARTMENT=27';
        //获取处理前后的图片
        data += '&ECLF=' + '';
        data += '&ECLL=' + '';
        //事件种类
        data += '&SHJ_TYPE=' + GetQueryString('type');
        return data;
    }

    //进入界面获取地理位置
    getUrl(function (url) {
        url = url + '/snow6/mobile/mapserviceaction?method=AddressReq&token=' + token;
        getCgData(url, {JD: 120.199231, WD: 30.23581}, function (rep) {
            $('.weui-cells .adress').val(rep.data.ADDRESS);
        });
    });

    //进入页面，获取事件类型并渲染
    getUrl(function (url) {
        url = url + '/snow6/mobile/eventtypeserviceaction?method=EventTypeReq&token=' + token;
        getCgData(url, {}, function (rep) {
            var html = template('eventType', rep);
            $('.event_large').html(html)
            //事件大类渲染然后，默认第一个位选中状态
            $('.event_large').children()[0].setAttribute('class','active');
            //默认状态下出来的是第一大类的小事件
            var page = template('eventList', rep.data[0]);
            $('.event_small').html(page);
            setTimeout(function () {
                myScroll.refresh();
            }, 0)
            //点击时改变大类的样式，并更改小类的内容
            $('.event_large').on('click', function (e) {
                //点击添加样式，其他去除样式
                $(e.target).addClass('active').siblings().removeClass('active');
                var id = e.target.getAttribute('data-id');
                //通过id查找相应的小类
                rep.data.forEach(function (val, index) {
                    if(val.id == id) {
                        //找到小类，渲染
                        var newPage = template('eventList', val);
                        $('.event_small').html(newPage);
                        myScroll.refresh();
                    }
                })
            })
        })
    });




    //点击发送保存
    $('#upData').on('click', function () {
        console.log(getData());
        //发送请求保存数据并跳转
        getUrl(function (url) {
            url += '/snow6/mobile/gaiquanaction?method=XCGQSaveReq&token=' + token;
            getCgData(url, getData(), function (rep) {
                if(rep.success == 'true') {
                    alert(rep.message);
                    window.location.href = './shangbaohistory.html?type='+ GetQueryString('type');
                }
            })
        })
    });

    //点击事件类型按钮弹出事件类型
    $('#event_type').on('click', function () {
        $('.event').css('display', 'block');
    });
    //选择相应的事件后隐藏弹出层
    $('.event').on('change', function () {
        value = $('input[name="radio1"]:checked').val();
        var name = $('input[name="radio1"]:checked').parent().prev().find('p').text();
        if(value) {
            $('.content .event_type').text(name);
            $('.event').css('display', 'none');
        }
    });
    //点击遮罩层退出弹出
    $('.top').on('click', function () {
        $('.event').css('display', 'none');
    });
});
