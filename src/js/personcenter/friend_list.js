
var myPullScroll = null;
var paging = new QueryWithOrder();
function init(){
	FastClick.attach(document.body);
    //计算滚动区高度
    $('#screen-result').height($(window).height() - $('#friendList-top').height());
    listCommon();
    
    $("#searchBtn").click(function(){
		 var text=$(".searchInput").val();
		 console.log(text)
	    $(".list li").each(function(){//拿到要搜索的内容后，遍历列表，不是此内容的隐藏
	      $(".title").hide();
	      $(".code").hide();
	      if($(this).find(".name").text()!=text){{
	        $(this).hide();
	      }}
	    })
    });    
    $('#searchInput').bind('input onchange', function() {
	    $(".list li").show();
	    $(".title").show();
	    $(".code").show();
	});
}
function update(isRefresh) {
    var id = OperationURL.getQueryString("id");
    if (isRefresh){
        paging.refreshPage();
        var param = paging.getPaging();
        param.id = id;
        getFriendList(param, true, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $("#list").html(template("template",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }else{
        paging.addPage();
        var param = paging.getPaging();
        param.id = id;
        getFriendList(param, true, function(result){
            if(result.code == 0){
                $("#list").append(template("template",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }
}
var detailClick = function(obj){
    var title = "好友详情";
    var url = "contacts_detail.html?id="+$(obj).attr("data-id")+ "&code="+$(obj).attr("data-code");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};