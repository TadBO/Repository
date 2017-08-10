/**
 * Created by Tuber on 2017/8/3.
 */
//签到签退部分逻辑
$(function () {
    //进入页面，从登陆获取消息并填充用户照片
    //var src = getUserInfo().Avatar;
    //测试
    var src = '';
    if(src != '') {
        //如果不为空就显示照片
        $('.touxiang img').attr('src', src);
    }

    //点击图像更换


    //进入界面获取签到签退状态
    getUrl(function (url) {
        url += '/snow6/mobile/dakaaction?method=PDDKReq&token=' + token;
        getCgData(url, {}, function (rep) {
            //根据状态判断签到情况
            if(rep.data[0].qd_state == 0) {

                    $('#sign').addClass('sign').on('click', function () {
                        //未签到进行签到
                        //判断是否可签到
                        if($('#sign').hasClass('checkout')) {
                            return false;
                        }
                        getUrl(function (url) {
                            url += '/snow6/mobile/dakaaction?method=QDaoReq&token=' + token;
                            getCgData(url, {}, function (rep) {
                                console.log(rep);
                                if(rep.success == 'true') {
                                    alert('签到成功');
                                    //签到成功后，颜色变灰
                                    $('#sign').addClass('checkout');
                                }
                            })
                        })
                    })
            }else if(rep.data[0].qd_state == 1) {
                $('#sign').addClass('checkout');
            }
            //根据状态判断签退状态
            if(rep.data[0].qt_state == 0) {

                    $('#checkout').addClass('sign').on('click', function () {
                        //未签退时签退
                        //判断是否可签退
                        if($('#checkout').hasClass('checkout')) {
                            return false;
                        }
                        getUrl(function (url) {
                            url += '/snow6/mobile/dakaaction?method=QTuiReq&token=' + token;
                            getCgData(url, {}, function (rep) {
                                console.log(rep);
                                if(rep.success == 'true') {
                                    alert('签退成功');
                                    //签到成功后，颜色变灰
                                    $('#checkout').addClass('checkout');
                                }
                            })
                        })
                    })
            }else if(rep.data[0].qt_state == 1) {
                $('#checkout').addClass('checkout');
            }
        });
    });
});
