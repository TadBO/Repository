/**
 * Created by Tuber on 2017/8/3.
 */
//签到签退历史部分逻辑
$(function () {
   //进入页面获取历史数据
   //年月日过滤器
    template.helper('dateFormat', function (val,res) {
        val = parseInt(val);
        var date = new Date(val),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        res = year + '-' + month + '-' + day;
        return res;
    });
    //时分过滤器
    template.helper('timeFormat', function (val, res) {
        val = parseInt(val);
        var date = new Date(val),
            hours = date.getHours(),
            mins = date.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        mins = mins < 10 ? '0' + mins : mins;
        res = hours + ':' + mins;
        return res;
    })
    getUrl(function (url) {
        url += '/snow6/mobile/dakaaction?method=LSDKListReq&token=' + token;
        getCgData(url, {PAGE_NUM: 1, PAGE_SIZE: 10}, function (rep) {
            console.log(rep);
            var html = template('checkoutList', rep.data[0]);
            $('.lists').html(html);
        })
    })
});
