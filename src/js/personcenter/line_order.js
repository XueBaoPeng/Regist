

var myPullScroll = null;
var paging = new QueryWithOrder();
var spotOrderStatus= 0,spotDateRange=1;
var search = function(){
    //手机查询
    $("#contSearch").toggle("fast");
};
function init(){
    id = OperationURL.getQueryString("id");
    //计算滚动区高度
    loadSupplier();
	$('#screen-result').height($(window).height());
    initLocalStorage();
    $("#ulOrderStatus li").click(function(){
        $(this).addClass("order-screen-active").siblings().removeClass("order-screen-active");
        spotOrderStatus = $(this).find("a").attr("data-value");
    });
    $("#ulDateRange li").click(function(){
        $(this).addClass("order-screen-active").siblings().removeClass("order-screen-active");
        spotDateRange = $(this).find("a").attr("data-value");
    });

    $("#btnClear").click(function(){
        $("#ulOrderStatus li").removeClass("order-screen-active");
        $("#ulDateRange li").removeClass("order-screen-active");
        spotOrderStatus = 0;
        spotDateRange = 1;
    });
    $("#btnConfirm").click(function(){
        $("#contSearch").slideUp("fast");
        update(true);
    });
}
function loadSupplier(){
    var domainName = OperationURL.getDomain();
    var param={
        domain:domainName
    };
    getTravelId(param, false, function(result){
        if(result.code == 0){
            travel.travelId = result.data.Id;
            listCommon();
    }
    });
}
function update(isRefresh) {
    var page;
    var param ={
        id:travel.travelId ,
        userId:mobile_var.userId,
        status:spotOrderStatus,
        cycle:spotDateRange
    };
    if (isRefresh){
        paging.refreshPage();
        page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getLineOrder(param, true, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $pullDown.html("下拉刷新");
                $("#my-order").html(template("template", result));
                console.log(result);
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }else{
        paging.addPage();
        page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getLineOrder(param, true, function(result){
            if(result.code == 0){
                $pullUp.html("上拉加载更多");
                $("#my-order").append(template("template", result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });        
    }
}

var evaluateClick = function(obj){
    var title = "发表评价";
    var url = "../line/travel_discuss.html?"+"id="+travel.travelId+"&productId="+$(obj).attr("data-line");
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push,webviewInterface.orientation.portrait, title,url);

};
var payClick=function (obj) {
    var title = "订单支付";
    var url = "../line/pay_info.html?"+"id="+$(obj).attr("data-id");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

var nameClick=function (obj) {
    var title = "订单详情";
    var url = "line_order_detail.html?"+"id="+$(obj).attr("data-id");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};
var refundClick = function(obj){
    var title = "申请退票";
    var new_url = OperationURL.getUrlOrigin()+"../line/order_refund.html?orderId="+$(obj).attr("data-id");
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};