/**
 * Created by Tuber on 2017/8/9.
 */
//沿街历史
$(function () {
    //时间解析
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
    //进入页面获取数据
    getUrl(function (url) {
        url += '/snow6/mobile/selleraction?method=SellerListReq&token=' + token;
        getCgData(url, {
            PAGE_NUM: 1,
            PAGE_SIZE: 5
        }, function (rep) {
            console.log(rep);
            var html = template('historyList', rep.data[0]);
            $('.lishi').html(html);
        })
    })
});
