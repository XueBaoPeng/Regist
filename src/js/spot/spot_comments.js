/**
 * Created by zeke on 2016/4/1.
 */
var myPullScroll = null;
var paging = new QueryWithOrder();
var commType = 0;
function init(){
    //计算滚动区高度
    $('#container').height($(window).height()-$("#commentTop").height() );
    loadStatistics();
    listCommon();
    $("#commGrade").delegate("ul>li","click",function(i,ele){

    });
}

function searchClick(obj){
    $(obj).addClass("current").siblings().removeClass("current");
    commType = $(obj).attr("data-value");
    update(true);
}

function loadStatistics(){
    //TODO 评论统计
    var id = OperationURL.getQueryString("id");
    var param = {
        supplierId:id
    };
    getSpotCommentStat(param, false, function(result){
        if(result.code == 0){
            $("#commentTop").html(template("tmplBasic",result));
        } else {
            console.log(result.msg);
        }
    });
}

function update(isRefresh) {
    var id = OperationURL.getQueryString("id");
    var param ={
        supplierId:id,
        type:commType,
        userId:mobile_var.userId
    };
    if (isRefresh){
        paging.refreshPage();
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getSpotComments(param, false, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $pullDown.html("下拉刷新");
                $("#conmmentCon").html(template("tmplComment",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }else{
        paging.addPage();
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getSpotComments(param, false, function(result){
            if(result.code == 0){
                $pullUp.html("上拉加载更多");
                $("#conmmentCon").append(template("tmplComment",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }
}

function saveEvaluation(id,flag){
    //TODO 评论点赞
    if(!flag){
        var param = {
            id : id,
            userId : mobile_var.userId,
            isAdd : true
        };
        saveCommonEvaluate(param, false, function(result){
            if(result.code == 0){
                update(true);
            }
        });
    }
}

function moreShow(obj){
    //TODO 显示更多
    if($(obj).prev("p").hasClass("show")){
        $(obj).prev("p").removeClass("show").addClass("hide");
    }else {
        $(obj).prev("p").removeClass("hide").addClass("show");
    }
}