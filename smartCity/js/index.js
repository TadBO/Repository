/**
 * Created by Tuber on 2017/7/31.
 */
//根据不同的用户信息返回不同界面
$(function () {
  $.getJSON('config.json', function (data) {
      //根据不同的id显示不同的界面
      function changeDate(data, Data) {
          data.forEach(function (v, i) {
              if(Data.indexOf(v.resid) == -1) {
                  data.splice(i, 1);
              }
          })
      }
      //顶部的显示数据
      changeDate(data.Menu.Tops, Data.Tops);
      // data.Menu.Tops.forEach(function (v, i) {
      //     if(Data.Tops.indexOf(parseInt(v.resid)) == -1) {
      //         console.log(i);
      //         data.Menu.Tops.splice(i, 1);
      //     }
      // })
      //信息上报部分的界面
      changeDate(data.Menu.Messages, Data.Messages);
      // data.Menu.Messages.forEach(function (v, i) {
      //     if(Data.Messages.indexOf(parseInt(v.resid)) == -1) {
      //         data.Menu.Messages.splice(i, 1);
      //     }
      // })
      //任务接收部分
      changeDate(data.Menu.Items, Data.Items);
      // data.Menu.Items.forEach(function (v, i) {
      //     if(Data.Items.indexOf(parseInt(v.res)))
      // })
      //信息查询部分
      changeDate(data.Menu.Search, Data.Search);
      var htmlNav = template('nav', data),
          htmlTask = template('task', data),
          htmlMessage = template('message', data),
          htmlSearch =template('search', data);
      $('.content .box').html(htmlNav);
      $('.content .two').html(htmlTask);
      $('.content .one').html(htmlMessage);
      $('.content .three').html(htmlSearch);
      myScroll.refresh();
  })
});
