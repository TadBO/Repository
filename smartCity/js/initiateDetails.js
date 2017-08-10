/**
 * Created by Tuber on 2017/8/2.
 */
$(function () {
   //协同请求部分详情部分
    getUrl(function (url) {
        url += '/snow6/mobile/xietongaction?method=XTQQInfoReq&token=' + token;
        getCgData(url, {
            id: GetQueryString('id')
        }, function (rep) {
            console.log(rep);
            var html = template('detail', rep.data[0]);
            $('.content').html(html);
            myScroll.refresh();
        })
    })
});
