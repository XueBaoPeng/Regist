/**
 * Created by zeke on 2016/1/14.
 */

/*
 * iscroll pull封装
 * 此模块依赖 jquery和iscroll-probe
 * */
(function(window, $, IScroll){
    function IscrollPull(wrapper, topValue){
        var self = this;
        self.topValue = -topValue;
        self.pullDownFlag = 0;
        self.pullUpFlag = 0;
        self.iscroll = new IScroll(wrapper, {
            probeType : 3,
            mouseWheel : false,
            scrollbars : true,
            interactiveScrollbars : true,
            shrinkScrollbars : 'scale',
            fadeScrollbars : true,
            click : false,
            startY : topValue
        });
        self.iscroll.on("scroll", function(){
            if(this.y<=10){
                $(".pullDown").html("下拉刷新");
            }else if(this.y > 40){
                //判断下拉
                $(self).trigger(IscrollPull.scrollPullEvent.pullDown);
                self.pullDownFlag = 1;
            } else if(this.y < (this.maxScrollY - 40)){
                //判断上拉
                $(self).trigger(IscrollPull.scrollPullEvent.pullUp);
                self.pullUpFlag = 1;
            }else if(this.y < (this.maxScrollY+40)){
                $(".pullUp").html("上拉加载更多");
            }
        });
        self.iscroll.on("scrollEnd", function(){
            if(self.pullDownFlag == 1){
                $(self).trigger(IscrollPull.scrollPullEvent.pullDownEnd);
                self.pullDownFlag = 0;
            } else if(self.pullUpFlag == 1){
                $(self).trigger(IscrollPull.scrollPullEvent.pullUpEnd);
                self.pullUpFlag = 0;
            }
        });
    }

    IscrollPull.scrollPullEvent = {
        "pullDown" : "pullDown",
        "pullDownEnd" : "pullDownEnd",
        "pullUp" : "pullUp",
        "pullUpEnd" : "pullUpEnd"
    };
    IscrollPull.prototype.refresh = function(){
        var self = this;
        self.iscroll.refresh();
    };
    IscrollPull.prototype.scrollToTop = function(){
        var self = this;
        self.iscroll.scrollTo(0, self.topValue, 500);
    };
    IscrollPull.prototype.scrollToElement = function(element){
        var self = this;
        self.iscroll.scrollToElement(element);
    };
    window.IscrollPull = IscrollPull;
})(window, jQuery, IScroll);

/*
 * 下拉加载iscroll5
 * */
(function(window, IScroll){

    function ZHJIscroll(wrapper){
        this.iscroll = new IScroll(wrapper, {
            mouseWheel : false,
            scrollbars : true,
            interactiveScrollbars : true,
            shrinkScrollbars : 'scale',
            fadeScrollbars : true,
            click : true
        })
    }

    ZHJIscroll.prototype.refresh = function(){
        this.iscroll.refresh();
    };
    ZHJIscroll.prototype.scrollToElement = function(element){
        this.iscroll.scrollToElement(element);
    }

    window.ZHJIscroll = ZHJIscroll;

})(window, IScroll);


var myPullScroll = null;
function listCommon(){
    FastClick.attach(document.body);

    $pullDown = $(".pullDown");
    $pullUp = $(".pullUp");
    $scroller = $(".scroller");

    myPullScroll = new IscrollPull(".wrapper", $pullDown.height());
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullDown, pullDown);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullDownEnd, pullDownEnd);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullUp, pullUp);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullUpEnd, pullUpEnd);

    //判断滚动容器和窗口大小
    if($(document).height()<$(window).height()){
        $pullDown.text("");
        $pullUp.text("");
    }

    var tabObj = $('ul[class="nav-ul"] li');
    if(tabObj){
        $(myPullScroll).trigger(IscrollPull.scrollPullEvent.pullDownEnd);
    } else {
        $(tabObj).click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            //此处添加方法拉取数据
            $(myPullScroll).trigger(IscrollPull.scrollPullEvent.pullDownEnd);
        });
        //自动触发点击事件
        $(tabObj).eq(0).trigger("click");
    }
}

function pullDown(){
    $pullDown.html("松手刷新");
}
function pullDownEnd(){
    updateOrLoadData(true);
}
function pullUp(){
    $pullUp.html("松手加载");
}
function pullUpEnd(){
    updateOrLoadData(false);
}

function updateOrLoadData(isRefresh){

    if(isRefresh){
        $pullDown.html("正在刷新");
    } else {
        $pullUp.html("正在加载");
    }
    update(isRefresh);
}
function update(isRefresh){
    //TODO 更新
}