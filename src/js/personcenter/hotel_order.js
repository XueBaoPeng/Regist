
var myPullScroll = null;
var paging = new QueryWithOrder();
var hotelOrderStatus= 0,hotelDateRange=1;
var search = function(){
    //手机查询
    $("#contSearch").toggle("fast");
};

function init(){
	FastClick.attach(document.body);
    initLocalStorage();
    //计算滚动区高度
    $('#screen-result').height($(window).height());
    $("#ulOrderStatus li").click(function(){
        $(this).addClass("order-screen-active").siblings().removeClass("order-screen-active");
        hotelOrderStatus = $(this).find("a").attr("data-value");
    });
    $("#ulDateRange li").click(function(){
        $(this).addClass("order-screen-active").siblings().removeClass("order-screen-active");
        hotelDateRange = $(this).find("a").attr("data-value");
    });
    $("#btnClear").click(function(){
        $("#ulOrderStatus li").removeClass("order-screen-active");
        $("#ulDateRange li").removeClass("order-screen-active");
        hotelOrderStatus = 0;
        hotelDateRange = 1;
    });
    $("#btnConfirm").click(function(){
        $("#contSearch").slideUp("fast");
        update(true);
    });
    loadSupplier();
}
function loadSupplier(){
    var domainName = OperationURL.getDomain();
    var param={
        domain:domainName
    };
    getHotelId(param, false, function(result){
        if(result.code == 0){
            hotel.hotelId = result.data.Id;
            listCommon();
        }
    });
}

function update(isRefresh) {
    var page;  	
    var param ={
        id:hotel.hotelId,
        userId:mobile_var.userId,
        status:hotelOrderStatus,
        cycle:hotelDateRange
    }
    if (isRefresh){
        paging.refreshPage();
        page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getHotelOrder(param, true, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $pullDown.html("下拉刷新");
                $("#my-order").html(template("template",result));
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
        getHotelOrder(param, true, function(result){
            if(result.code == 0){
                $pullUp.html("上拉加载更多");
                $("#my-order").append(template("template",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }
}
var detailClick = function(id){
    var title = "订单详情";
    var url = "hotel_order_detail.html?id="+id+"&hotelId="+hotel.hotelId;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};
var payClick= function(id){
    var title = "订单支付";
    var url = "hotel/pay_info.html?id="+id;
    var new_url = OperationURL.getUrlOrigin() + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};
var ratedClick = function(id){
    var title = "发表评价";
    var url = "hotel/hotel_discuss.html?id="+id+"&roomId="+roomId;
    var new_url = OperationURL.getUrlOrigin() + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};


