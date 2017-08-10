/**
 * Created by Tuber on 2017/8/9.
 */
//沿街商铺部分逻辑
$(function () {
    //点击按钮发送数据
    $('#send').on('click', function () {
        //获取所有的数据并发送
        var data = $('form').serialize();
        //经纬度
        //经度
        data += '&LON=120.199231';
        data += '&LAT=30.23581';
        getUrl(function (url) {
            url += '/snow6/mobile/selleraction?method=SellerSaveReq&token=' + token;
            getCgData(url, data, function (rep) {
                console.log(rep);
                if(rep.success == 'true') {
                    alert(rep.message);
                    location.href = './storesalongthewayhistory.html';
                }
            })
        })
    })
});
