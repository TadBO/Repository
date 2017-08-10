/**
 * Created by Tuber on 2017/8/7.
 */
//现场改劝部分逻辑
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

var myScroll,pullDownEl, pullDownOffset,pullUpEl, pullUpOffset,generatedCount = 0,
    i = 1;

function loaded() {
    //动画部分
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;
    myScroll = new iScroll('content', {
        useTransition: true,
        momentum: false,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
            }
        },
        onScrollMove: function () {
            if (this.y < (this.maxScrollY - 50) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放刷新';
                this.maxScrollY = this.maxScrollY;
            }
        },
        onScrollEnd: function () {
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中';
                pullUpAction();	// Execute custom function (ajax call?)
            }
        }
    });

    loadAction();
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);//阻止冒泡
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 0); }, false);

//初始状态，加载数据
function loadAction(){
    //获取url
    getUrl(function (url) {
        url += '/snow6/mobile/gaiquanaction?method=XCGQListReq&token=' + token;
        //获取数据
        getCgData(url, {
            PAGE_NUM: i,
            PAGE_SIZE: 5,
            SHJ_TYPE: GetQueryString('type')
        }, function (rep) {
            if(rep.data) {
                $('.weui-loadmore').css('display', 'none');
            }
            console.log(rep.data[0]);
            var html = template('historyList', rep.data[0]);
            $('.lishi').html(html);
            myScroll.refresh();
        })
    });
}


//上拉加载更多数据
function pullUpAction () {
    i++;
    setTimeout(function () {
        getUrl(function (url) {
            url += '/snow6/mobile/gaiquanaction?method=XCGQListReq&token=' + token;
            getCgData(url, {
                PAGE_NUM: i,
                PAGE_SIZE: 5
            }, function (rep) {
                console.log(rep);
                if(i > rep.data[0].page_count) {
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '没有跟多的数据了';
                    return false;
                }
                var html = template('historyList', rep.data[0]);
                $('.lishi').append(html);
                myScroll.refresh();
            });
        });
    }, 400);
}
