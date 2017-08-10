 function openWindow(url)
 {
    window.location.href=url;
 }
 //安卓方法获取token值
 //var token = getUserInfo().Token;
 var token = 2;
//安卓方法获取要显示的内容
 //var Data = getUserInfo();
 var Data = { Tops: ['1002', '1001', '1003'], Messages: ['2001', '2002', '2003', '2004'], Items: ['3001', '3002', '3003'], Search: ['4001', '4002', '4003']}

 //获取公用的请求地址
 function getUrl(callback) {
     $.getJSON('config.json', function (data) {
       var url = 'http://' + data.RemoteHost + ':' + data.RemotePort;
         callback(url);
     });
 }
 
 //定义获取数据的方法
 function getCgData(url,data,callback) {
     $.ajax({
         url: url,
         type: 'POST',
         dataType: 'json',
         data: data,
         xhrFields:{
             'Access-Control-Allow-Origin': "*"
         },
         beforeSend: function (xhr) {
             // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;text/html;charset=UTF-8');
         },
         success: function (rep) {
             callback(rep);
         }
     });
 }


 //获取url中的参数
 function GetQueryString(name) {
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
 }
