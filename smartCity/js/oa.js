$(function () {

    var itemIndex = 0;

    var tabLoadEndArray = [false, false, false];
    var tabLenghtArray = [28, 15, 47];
    var tabScroolTopArray = [0, 0, 0];
    
    // dropload
    var dropload = $('.khfxWarp').dropload({
        scrollArea: window,
        domDown: {
            domClass: 'dropload-down',
            domRefresh: '<div class="dropload-refresh">上拉加载更多</div>',
            domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData: '<div class="dropload-noData">已无数据</div>'
        },
        loadDownFn: function (me) {
            setTimeout(function () {
                if (tabLoadEndArray[itemIndex]) {
                    me.resetload();
                    me.lock();
                    me.noData();
                    me.resetload();
                    return;
                }
                var result = '';
                for (var index = 0; index < 10; index++) {
                    if (tabLenghtArray[itemIndex] > 0) {
                        tabLenghtArray[itemIndex]--;
                    } else {
                        tabLoadEndArray[itemIndex] = true;
                        break;
                    }
                    if (itemIndex == 0) {
                        result
                        += ''
						+' <hgroup class="list">'
                            +'<a href="./timeoutReminde.html">'
                            +'	   <div class="top">'
                            +'		  <div class="title">无照经营商游</div>'
                            +'        <div class="details">超市</div>'
                            +'		  <div class="time">剩余06:23</div>'
                            +'	   </div>'
                            +'	   <div class="info">'
                            +'		  <div class="date">2017-7-12 6:30</div>'
                            +'	   </div>'
                            +'</a>'
						+'</hgroup>'
					 
                    } else if (itemIndex == 1) {
                        result
                         += ''
						+' <hgroup class="list">'  
						+'	   <div class="top">'
						+'		  <div class="title">无照经营商游</div>'
						+'        <div class="details">超市</div>'
						+'		  <div class="time">剩余06:23</div>'
						+'	   </div>'
						+'	   <div class="info">'
						+'		  <div class="date">2017-7-12 6:30</div>'
						+'	   </div>'
						+'</hgroup>'
					 
                    } else if (itemIndex == 2) {
                        result
                       += ''
						+' <hgroup class="list">'  
						+'	   <div class="top">'
						+'		  <div class="title">无照经营商游</div>'
						+'        <div class="details">超市</div>'
						+'		  <div class="time">剩余06:23</div>'
						+'	   </div>'
						+'	   <div class="info">'
						+'		  <div class="date">2017-7-12 6:30</div>'
						+'	   </div>'
						+'</hgroup>'
					 
                    }
                }
                $('.khfxPane').eq(itemIndex).append(result);
                me.resetload();
				//myScroll.refresh();
            }, 500);
        }
    });


    $('.tabHead span').on('click', function () {

        tabScroolTopArray[itemIndex] = $(window).scrollTop();
        var $this = $(this);
        itemIndex = $this.index();
        $(window).scrollTop(tabScroolTopArray[itemIndex]);
        
        $(this).addClass('active').siblings('.tabHead span').removeClass('active');
        $('.tabHead .border').css('left', $(this).offset().left + 'px');
        $('.khfxPane').eq(itemIndex).show().siblings('.khfxPane').hide();

        if (!tabLoadEndArray[itemIndex]) {
            dropload.unlock();
            dropload.noData(false);
        } else {
            dropload.lock('down');
            dropload.noData();
        }
        dropload.resetload();
    });
});