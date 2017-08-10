/**
 * Created by Tuber on 2017/7/26.
 */
$(function () {
    var base64,
        value;
    /**
     * 定义一个获取页面输入的数据
     * @returns {{}}
     */
    function getData() {
        //获取表单中填写的数据
        var data='';
        data = $('form').serialize();
        //获取经纬度
        //经度
        data.LONGITUDE = queryGsyInfomation().split(",")[0];
        //测试
        //data += '&LONGITUDE=120.199231';
        //纬度
        data.LATITUDE = queryGsyInfomation().split(",")[1];
        console.log("测试-----" +queryGsyInfomation().split(",")[0]+queryGsyInfomation().split(",")[1])

        //测试
        //data += '&LATITUDE=30.23581';
        //获取事件小类
        data += '&EVEN_FENLS='+ value;
        //获取图片的base64编码
        //data += '&ECLF=' + base64.join(';');
        var d = getBase64();
         d = d.replace(/\+/g, "%2B");
         d = d.replace(/\&/g, "%26");
        data += '&ECLF=' + d;
        return data;
    }

    //进入页面通过经纬度获取地址并填充
    getUrl(function (url) {
        url = url + '/snow6/mobile/mapserviceaction?method=AddressReq&token=' + token;
        getCgData(url, {JD: queryGsyInfomation().split(",")[0], WD: queryGsyInfomation().split(",")[1]}, function (rep) {
            $('.weui-cells .adress').val(rep.data.ADDRESS);
        });
    });

    //进入页面获取事件类型并渲染
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

    //点击发送请求,保存微采集数据
    $('#upload').on('click', function () {
        base64 = getBase64();
        console.log(getData());
        var data = getData();
        // data = data.replace(/\+/g, "%2B");
        // data = data.replace(/\&/g, "%26");


            getUrl(function (url) {
            url = url + '/snow6/mobile/eventaction?method=EventSaveReq&token=' + token;
            getCgData(url, data, function (rep) {
                clearImageArry();
                alert(rep.message);
                window.location.href = './weicaijiHistory.html';
            })
        });
    });



    //点击减号删除图片
    $('.weui-uploader__bd').on('click', function (e) {
        var cls = e.target.getAttribute('class');
        if(cls == 'weui-uploader__file') {
            e.target.style.display = 'none';
            console.log(e.target.firstElementChild);
            var src = e.target.firstElementChild.getAttribute('src');
            base64.splice(base64.indexOf(src), 1);
        }
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