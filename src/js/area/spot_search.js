/**
 * Created by zeke on 2016/1/11.
 */

//覆盖initialize.js中的init方法
var myPullScroll = null;
var querywithorder = new QueryWithOrder();

function search(content){
    //TODO 搜索查询
    alert(content);
}

function init(){
    //计算滚动区高度
    $("#searchlist").height($(window).height() - $('.navigation').height());

    $("#searchTab li").click(function(){
        var serchType = $(this).attr("data-type");
        //TODO 条件查询 and 排序
        if(serchType == "0"){
            //TODO 筛选功能
            $("#search").show();
            return;
        }
        $("#search").hide();
        querywithorder.changeOrderField(serchType);
        if($(this).hasClass("desc")){
            //如果包含有这个CLASS，那么现在是降序，点击后要升序
            $(this).removeClass("desc");
            querywithorder.changeOrderDesc(false);
        } else {
            //不包含这个CLASS，现在是升序，点击后要降序
            querywithorder.changeOrderDesc(true);
            $(this).addClass("desc");
        }
        update(true);
    });

    $("#searchType li").click(function(){
        //TODO 筛选条件

    });

    $("#btnClear").click(function(){
        //TODO 清空

    });

    $("#btnConfirm").click(function(){
        //TODO 确定

    });
    listCommon();
}
//覆盖search_common.js中的update方法
function update(isRefresh){
    if(isRefresh){
        querywithorder.refreshPage();
        var data = querywithorder.getQuerySting();
        getSpotList(data,false, function(data){
            myPullScroll.scrollToTop();
            $pullDown.html("下拉刷新");
            $(".result-ul").html(template("template", data));
            myPullScroll.refresh();
        });
        //setTimeout(function(){
        //    //加载或者刷新数据
        //    $.getJSON("../testdata/area/spot_search/spot_search.js", querywithorder.getQuerySting(), function(data, status){
        //        if(status == "success"){
        //            myPullScroll.scrollToTop();
        //            $pullDown.html("下拉刷新");
        //            $(".result-ul").html(template("template", data));
        //            myPullScroll.refresh();
        //        }
        //        else {
        //            alert("loading error...");
        //        }
        //    });
        //}, 500);
    }
    else {
        querywithorder.addPage();
        var data = querywithorder.getQuerySting();
        getSpotList(data,false, function(data){
            myPullScroll.scrollToTop();
            $pullUp.html("上拉加载更多");
            $(".result-ul").append(template("template", data));
            myPullScroll.refresh();
        });
        //setTimeout(function(){
        //    //加载或者刷新数据
        //    $.getJSON("testdata/area/spot_search/spot_search.js", querywithorder.getQuerySting(), function(data, status){
        //        if(status == "success"){
        //            $pullUp.html("上拉加载更多");
        //            $(".result-ul").append(template("template", data));
        //            myPullScroll.refresh();
        //        }
        //        else {
        //            alert("loading error...");
        //        }
        //    });
        //}, 500);
    }
}

function loadData(fun){

}

function detailClick(target){
    var url = $(target).attr("data-url") + "?id=" + $(target).attr("data-id");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    var title = "景点列表";
    loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}

