/**
 * Created by Tuber on 2017/8/1.
 */
//协同请求界面逻辑
$(function () {

    //进入页面通过经纬度获取地址
    var adress,xtId;
    getUrl(function (url) {
        url = url + '/snow6/mobile/mapserviceaction?method=AddressReq&token=' + token;
        getCgData(url, {JD: 120.199231, WD: 30.23581}, function (rep) {
            adress = rep.data.ADDRESS;
        });
    });

    //进入页面获取部门人员
    getUrl(function (url) {
        url += '/snow6/mobile/userdptaction?method=UserDepartenmtReq&token=' + token;
        getCgData(url, {
            department: 27
        }, function (rep) {
            console.log(rep);
            xtId = rep.data[0].xtr_id;
            console.log(rep.data[0].xtr_name);
            $('.xt_name').html(rep.data[0].xtr_name);
            $('.xt_dptname').html(rep.data[0].xtr_dptname);
        })
    })
   //获取数据的方法
    function getData() {
        //获取表单中填写的数据
        var data='';
        data = $('form').serialize();
        //请求地址
        data += '&EVEN_ADDR=' + adress;
        //请求经纬度
        //测试
        data += '&LONGITUDE=120.199231';
        data += '&LATITUDE=30.23581';
        //协同人id
        data += '&USER_XTR=' + xtId;
        //请求人部门id
        data += '&QQDPT=27';
        //处理前照片
        data += '&ECLF=';
        //协助人部门id
        data += '&XTDPT=27';
        return data;
    }
    //点击按钮保存数据
   $('#sure').on('click', function () {
       getUrl(function (url) {
           url += '/snow6/mobile/xietongaction?method=XTQQSaveReq&token=' + token;
           getCgData(url, getData(), function (rep) {
                   console.log(rep);
                   console.log(getData());
                   if(rep.success == 'true') {
                       alert('保存成功');
                   }
               }
           )
       })
   });
    //删除图片
    $('.weui-uploader__bd').on('click', function (e) {
        var cls = e.target.getAttribute('class');
        if(cls == 'weui-uploader__file') {
            e.target.style.display = 'none';
            console.log(e.target.firstElementChild);
            var src = e.target.firstElementChild.getAttribute('src'),
                base64 = getBase64();
            base64.splice(base64.indexOf(src), 1);
            console.log(base64);
        }
    });
});