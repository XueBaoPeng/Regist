/**
 * Created by hyy
 * on 2016/4/2 0002.
 */
var myPullScroll = null;
var paging = new QueryWithOrder();
var tradeType = 0;
var search = function(){
    //手机查询
    $("#contSearch").toggle("fast");
};


function  init(){
    $("#container").height($(window).height());
    initLocalStorage();
    listCommon();
    $("#btnSearch li").click(function(){
        $("#contSearch").slideUp("fast");
        tradeType=$(this).attr("data-val");
        update(false);
    });

    $("#linkBack").click(function(){
        $("#contSearch").toggle("fast");
    });
}

function update(isRefresh) {
    var param = {
        userId:mobile_var.userId,
        tradeType:tradeType
    };
    if (isRefresh){
        paging.refreshPage();
        var page = paging.getPaging();
        param.pageSize = 3;
        param.currentPage = page.currentPage;
        getTransRecord(param, false, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $("#content").html(template("tmplContent",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }else{
        paging.addPage();
        var page = paging.getPaging();
        param.pageSize = 3;
        param.currentPage = page.currentPage;
        getTransRecord(param, false, function(result){
            if(result.code == 0){
                $("#content").append(template("tmplContent",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }
}