/**
 * Created by wangshouyun on 2016/1/11.
 */

//覆盖initialize.js中的init方法

var myPullScroll = null;

function init() {

    //计算滚动区高度
    $('div[class="screen-result"]').height($(window).height() - $('.navigation').height());
   listCommon()
}

function search(content){
    //TODO 搜索查询
    alert(content);
}

//覆盖search_common.js中的update方法
function update(isRefresh) {
    setTimeout(function () {
        //加载或者刷新数据
        $.getJSON("../testdata/area/guide_search/guide_search.js", function (data, status) {
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