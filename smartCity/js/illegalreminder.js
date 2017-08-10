/**
 * Created by Tuber on 2017/8/10.
 */
//违章提醒部分
$(function () {
    //进入页面获取数据
    getUrl(function (url) {
        url += '/snow6/mobile/parkingaction?method=ParkingListReq&token=' + token;
        getCgData(url, {
            PAGE_NUM: 1,
            PAGE_SIZE: 6
        }, function (rep) {
            console.log(rep);
        })
    })
});
