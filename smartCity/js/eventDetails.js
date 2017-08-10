/**
 * Created by Tuber on 2017/8/7.
 */
//事件详情逻辑
$(function () {
    //进入页面发送请求获取数据渲染
    getUrl(function (url) {
        url += '/snow6/mobile/gaiquanaction?method=XCGQInfoReq&token=' + token;
        getCgData(url, {
            ID: GetQueryString('id')
        }, function (rep) {
            console.log(rep);
            var html = template('detail', rep.data[0]);
            $('.content').html(html);
           myScroll.refresh();
        })
    })
});