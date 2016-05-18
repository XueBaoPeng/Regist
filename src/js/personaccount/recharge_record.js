/**
 * 充值记录
 * Created by hyy on 2016/4/2 0002.
 */
var myPullScroll = null;
var paging = new QueryWithOrder();
function  init(){
    $("#container").height($(window).height());
    initLocalStorage();
    listCommon();
}
function update(isRefresh) {
    var param = {
        userId:mobile_var.userId
    };
    if (isRefresh){
        paging.refreshPage();
        var page = paging.getPaging();
        param.pageSize = 3;
        param.currentPage = page.currentPage;
        getRecharge(param, false, function(result){
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
        getRecharge(param, false, function(result){
            if(result.code == 0){
                $("#content").append(template("tmplContent",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }

}