
var myPullScroll = null;
var paging = new QueryWithOrder();
function init(){
    //计算滚动区高度
	$('#screen-result').height($(window).height() - $('#order-list-tab').height());
    listCommon();   
    $(".order-list-ul li").click(function(){
	     $(this).find("a").addClass("order-active").parent("li").siblings().find("a").removeClass("order-active");
	     if($(this).index()==0){
	        $("#lastOrder").show();
	        $("#allOrder").hide();
	     }else{
	       $("#lastOrder").hide();
	       $("#allOrder").show();
	     }
	});
}
function update(isRefresh) {
    var id = OperationURL.getQueryString("id");
    if (isRefresh){
        paging.refreshPage();
        var param = paging.getPaging();
        param.id = id;       
        myOrder(param, true, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $pullDown.html("下拉刷新");
                $("#tem").html(template("template", result));	 
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }else{
        paging.addPage();
        var param = paging.getPaging();
        param.id = id;       
        myOrder(param, true, function(result){
            if(result.code == 0){
                $pullUp.html("上拉加载更多");
                $("#tem").append(template("template", result));	 
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });        
    }
}
function detailClick(obj) {
	var title = "我的订单";
	var url = $(obj).attr("data-url");
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
