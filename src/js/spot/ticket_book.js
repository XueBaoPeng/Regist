/**
 * Created by zeke on 2016/3/25.
 */
var myPullScroll = null;
var paging = new QueryWithOrder();
function init() {
    //计算滚动区高度
    $('#container').height($(window).height() );
    listCommon();

    $("#product").delegate("#more","click",function(e){
        e.stopPropagation();
        e.preventDefault();
        if($(this).hasClass("pack")){
            $(this).find("a").html("展开");
            $(this).removeClass("pack").prev().find('#version li:gt(1)').hide();
        }
        else{
            $(this).find("a").html("收起");
            $(this).addClass("pack").prev().find("#version li:gt(1)").show();
        }

    })
}
//覆盖search_common.js中的update方法
function update(isRefresh) {
    var id = OperationURL.getQueryString("id");
    if (isRefresh){
        paging.refreshPage();
        var param = paging.getPaging();
        param.id = id;
        getSpotProduct(param, false, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                //$pullDown.html("下拉刷新");
                $("#product").html(template("template", result));
                myPullScroll.refresh();
            } else {
                $("#product").html(template("template", []));
                console.log(result.msg);
            }
        });
    }else{
        paging.addPage();
        var param = paging.getPaging();
        param.id = id;
        getSpotProduct(param, false, function(result){
            if(result.code == 0){
                //$pullUp.html("上拉加载更多");
                $("#product").append(template("template", result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }
}
function detailClick(obj) {
    var title="门票详情";
    var url = $(obj).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.shareAndcollect, webviewInterface.mode.push,webviewInterface.orientation.portrait, title, new_url);
}