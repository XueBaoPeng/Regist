/**
 * Created by wangshouyun on 2016/1/11.
 */

//覆盖initialize.js中的init方法

var myPullScroll = null;

function init() {

    FastClick.attach(document.body);

    //计算滚动区高度
    $('div[class="screen-result"]').height($(window).height() - $('.navigation').height()-$('.date').height());

    $pullDown = $(".pullDown");
    $pullUp = $(".pullUp");
    $scroller = $(".scroller");

    myPullScroll = new IscrollPull(".wrapper",$pullDown.height());
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullDown, pullDown);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullDownEnd, pullDownEnd);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullUp, pullUp);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullUpEnd, pullUpEnd);

    $('ul[class="nav-ul"] li').click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        //此处添加方法拉取数据
        $(myPullScroll).trigger(IscrollPull.scrollPullEvent.pullDownEnd);
        //console.log($(this).attr("data-type"));
    });

    //自动触发点击事件
    $('ul[class="nav-ul"] li:eq(0)').trigger("click");
}

function pullDown() {
    $pullDown.html("松手刷新");
}
function pullDownEnd() {
    updateOrLoadData(true);
}
function pullUp() {
    $pullUp.html("松手加载");
}
function pullUpEnd() {
    updateOrLoadData(false);
}

function updateOrLoadData(isRefresh) {

    if (isRefresh) {
        $pullDown.html("正在刷新");
    } else {
        $pullUp.html("正在加载");
    }
    setTimeout(function () {
        //加载或者刷新数据
        $.getJSON("../testdata/area/holiday/holiday.js", function (data, status) {
            if (status == "success") {

                //console.log("loading...");

                if (isRefresh) {
                    myPullScroll.scrollToTop();
                    $pullDown.html("下拉刷新");
                    $(".result-ul").html(template("template", data));
                } else {
                    $pullUp.html("上拉加载更多");
                    $(".result-ul").append(template("template", data));
                }
                myPullScroll.refresh();
            }
            else {
                alert("loading error...");
            }
        });
    }, 500);

}