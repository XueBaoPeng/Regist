/**
 * Created by zeke on 2016/4/1.
 */
var myPullScroll = null;
var paging = new QueryWithOrder();
var commType = 0;
function init(){
    loadSupplier()
    //计算滚动区高度
    $('#container').height($(window).height()-$("#commentTop").height() );
    listCommon();
    $("#commGrade").delegate("ul>li","click",function(i,ele){

    });
}

function searchClick(obj){
    $(obj).addClass("current").siblings().removeClass("current");
    commType = $(obj).attr("data-value");
    update(true);
}
function loadSupplier(){
    var domainName = OperationURL.getDomain();
    var param={
        domain:domainName
    };
    getTravelId(param, false, function(result){
        if(result.code == 0){
            travel.travelId = result.data.Id;
            loadStatistics();


        }
    });
}

function loadStatistics(){
    //TODO 评论统计
    var id = OperationURL.getQueryString("id");
    var param = {
        supplierId:travel.travelId
    };
    paging.refreshPage();
    var page = paging.getPaging();
    param.pageSize = page.pageSize;
    param.currentPage = page.currentPage;
    getLineCommentStat(param, false, function(result){
        if(result.code == 0){
            $("#commentTop").html(template("tmplBasic",result));
            console.log(result);
            update(true)
            //$(document).on("click",".more",function(){
            //    var url="travel_comments.html?id=7487"+"&id="+result.data.comment.supplierId;
            //    OperationURL.loadURL(webviewInterface.winType.shareAndcollect, webviewInterface.mode.push, webviewInterface.orientation.portrait, "", url);
            //});
        } else {
            console.log(result.msg);
        }
    });
}

function update(isRefresh) {
    var id = OperationURL.getQueryString("id");
    var param ={
        supplierId:travel.travelId,
        type:commType
    };
    if (isRefresh){
        paging.refreshPage();
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getLineComments(param, false, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $pullDown.html("下拉刷新");
                $("#conmmentCon").html(template("tmplComment",result));
                console.log(result);
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
        getLineComments(param, false, function(result){
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

function moreShow(obj) {
    $(this).prev("p").toggle(function () {
        $(this).animate({height: 'toggle', opacity: 'toggle'}, "slow");
    }, function () {
        $(this).animate({height: 'toggle', opacity: 'toggle'}, "slow");
    });
//    function more(obj){
//        $(obj).prev().addClass("more").removeClass("less");
//    }
    //var id = OperationURL.getQueryString("id");
    //var param ={
    //    id:id,
    //    type:commType
    //};
    //getLineComments(param, false, function(result){
    //    $("#conmmentCon").html(template("tmplComment",result));
    //    console.log(result)
    //    var url = "travel_comments.html?id="+id +"&id="+result.data.comment.id;
    //    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    //})
}


$(document).on("click",".grade li",function(){
    $(this).addClass("current").siblings().removeClass("current")
});

$(document).on("click",".top-right",function(){
   //i++;
   // $(this).children("span").text(i)

});

/*显示更多*/
$(document).on("click","#btnMore",function(){
if($(this).prev().attr("class")=="hide"){
    $(this).prev().attr("class","show")
}else{
    $(this).prev().attr("class","hide")
}
});

/*点击有用增加评分 并调用接口*/

function saveEvaluation(flag,commentId){
    if(!flag){
        var param = {
            id:commentId,//评论编号
            userId: mobile_var.userId,//当前用户编号
            isAdd:true
        };
        saveCommonEvaluate(param, false, function(result){
            if(result.code == 0){
                update(true);
            }
        });
    }
}

