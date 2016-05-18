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
        getSpotProblems(param, false, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $pullDown.html("下拉刷新");
                $("#problemList").html(template("tmplProblem",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }else{
        paging.addPage();
        var param = paging.getPaging();
        param.id = id;
        getSpotProblems(param, false, function(result){
            if(result.code == 0){
                $pullUp.html("上拉加载更多");
                $("#problemList").append(template("tmplProblem",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }
}