/**
 * Created by zeke on 2016/4/1.
 */
var myPullScroll = null;
var paging = new QueryWithOrder();
function init(){
    //计算滚动区高度
    $('#container').height($(window).height() );
    listCommon();
}

function update(isRefresh) {
    var id = OperationURL.getQueryString("id");
    if (isRefresh){
        paging.refreshPage();
        var param = paging.getPaging();
        param.id = id;
        getSpotNews(param, false, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $("#newsList").html(template("tmplNews",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }else{
        paging.addPage();
        var param = paging.getPaging();
        param.id = id;
        getSpotNews(param, false, function(result){
            if(result.code == 0){
                $pullUp.html("上拉加载更多");
                $("#newsList").append(template("tmplNews",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }
}

function newDetailClick(obj){
    var title=$(obj).attr("data-title");
    var url = $(obj).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.shareAndcollect, webviewInterface.mode.push,webviewInterface.orientation.portrait, title, new_url);
}