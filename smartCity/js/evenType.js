/**
 * Created by Tuber on 2017/7/31.
 */
//事件类型逻辑部分
$(function () {

    //获取事件类型
   getUrl(function (url) {
       url = url + '/snow6/mobile/eventtypeserviceaction?method=EventTypeReq&token=' + token;
       getCgData(url, {}, function (rep) {
           if(rep.data) {
                $('.weui-loadmore').css('display', 'none');
           }
           var html = template('eventType', rep);
           $('.event_large').html(html)
           //事件大类渲染然后，默认第一个位选中状态
           $('.event_large').children()[0].setAttribute('class','active');
           //默认状态下出来的是第一大类的小事件
           var page = template('eventList', rep.data[0]);
           $('.event_small').html(page);
           setTimeout(function () {
               myScroll.refresh();
           }, 0)
           //点击时改变大类的样式，并更改小类的内容
           $('.event_large').on('click', function (e) {
               //点击添加样式，其他去除样式
               $(e.target).addClass('active').siblings().removeClass('active');
               var id = e.target.getAttribute('data-id');
               //通过id查找相应的小类
               rep.data.forEach(function (val, index) {
                   if(val.id == id) {
                       //找到小类，渲染
                       var newPage = template('eventList', val);
                       $('.event_small').html(newPage);
                       myScroll.refresh();
                   }
               })
           })
       })
   });
    //选取事件并缓存本地
    var eventStorage = window.localStorage,
        value,
        name;
    $('#save').on('click', function () {
        value = $('input[name="radio1"]:checked').val();
        name = $('input[name="radio1"]:checked').parent().prev().find('p').text();
        if(value) {
            eventStorage.setItem('eventId', value);
            eventStorage.setItem('eventName', name);
        }
        window.location.href = './'+ GetQueryString('type')+'.html';
    });
});
