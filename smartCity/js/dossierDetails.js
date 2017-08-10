/**
 * Created by Tuber on 2017/8/2.
 */
$(function () {
   //微采集事件详情
   getUrl(function (url) {
       url += '/snow6/mobile/eventaction?method=EventInfoReq&token=' + token;
       getCgData(url, {
           ID: GetQueryString('id')
       }, function (rep) {
           console.log(rep);
           var html = template('detail', rep.data[0]);
           $('.content').html(html);
       })
   }) 
});
