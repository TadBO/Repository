/**
 * Created by Tuber on 2017/7/28.
 */
$(function () {
    //时间过滤器
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
    //下拉刷新
    var pageSize = 5,
        page = 0;
    $('.content').dropload({
        scrollArea : window,
        distance: 10,
        domDown: {
            domClass : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad : '<div class="dropload-load">加载中...</div>',
            domNoData : '<div class="dropload-noData">暂无数据</div>'
        },
        loadDownFn : function(me){
            console.log(123);
            page++;
            getUrl(function (url) {
                url = url + '/snow6/mobile/eventaction?method=EventListReq&token=2';
                $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    data: {
                        PAGE_NUM: page,
                        PAGE_SIZE: pageSize
                    },
                    success: function(data){
                        // 选择需要显示的数据 拼接 DOM
                        console.log(data);

                        var html = template('historyList', data.data[0]);


                        // 为了测试，延迟1秒加载
                        setTimeout(function(){
                            // 加载 插入到原有 DOM 之后
                            $('.lishi').append(html);
                            // 每次数据加载完，必须重置
                            me.resetload();
                        },1000);
                    },
                    // 加载出错
                    error: function(xhr, type){
                        alert('Ajax error!');
                        // 即使加载出错，也得重置
                        me.resetload();
                    }
                });
            });

        }

    });
});
