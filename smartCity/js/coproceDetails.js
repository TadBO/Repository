/**
 * Created by Tuber on 2017/8/4.
 */
//协同处置详情部分逻辑
$(function () {
    template.helper('dateFormat', function (val) {
        val = parseInt(val);
        var date = new Date(val),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hours = date.getHours(),
            mins = date.getMinutes();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hours = hours < 10 ? '0' + hours : hours;
        mins = mins < 10 ? '0' + mins : mins;
        return year + '-' + month + '-' + day + ' ' + hours + ':' + mins;
    })
   getUrl(function (url) {
       url += '/snow6/mobile/xietongaction?method=XTCZInfoReq&token=' + token;
       getCgData(url, {id: GetQueryString('id')}, function (rep) {
           console.log(rep);
           var html = template('detail', rep.data[0]);
           $('.content').html(html);
       })
   });
    //点击按钮，接收任务
    $('.content').on('click', function (e) {
        if($(e.target).hasClass('accept')) {
            getUrl(function (url) {
                url += '/snow6/mobile/xietongaction?method=JSQQReq&token=' + token;
                getCgData(url, {
                    ID: GetQueryString('id')
                }, function (rep) {
                    console.log(rep);
                    if(rep.success == 'true') {
                        alert(rep.message);
                    }
                })
            })
        }
    })
});
