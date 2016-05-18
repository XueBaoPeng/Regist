/**
 * Created by zeke on 2016-3-23
 */


function getSupplierId(){
    //获取景区编号
    return supplier.supplierId;
}
function init(){
    //MyJSTest.testWithFuncParam(function(data){
    //    alert(browseInfo.getSystemPlatForm());
    //});
    FastClick.attach(document.body);
    loadData();
}

var loadData = function(){
    var domainName = OperationURL.getDomain();
    var param={
        domain:domainName,
        userId:0,
        userKey:""
    };
    getSpotId(param, false, function(result){
        if(result.code == 0){
            supplier.supplierId = result.data.id;
        }
    });
    getSpotInfo(param, true, function(result){
        if(result.code == 0){
            $("#content").html(template("tmplContent", result));
            swipeImg();
            $('#spotStar').raty({
                path : "../src/js/widget/jquery.raty/img",
                readOnly: true,
                score : function(){
                    return $(this).attr('data-number');
                }
            });
        }
    });

    getSpotPromotion(param, true, function(result){
        if(result.code==0){
            $("#promotion").html(template("tmplScenic", result));
        }
    });

    getSpotAround(param, true, function(result){
        if(result.code==0){
            $("#surround").html(template("tmplSurround", result));
        }
    });
};

/*
 * 轮播图
 * */
var swipeImg = function(){
    var swiper_banner = new Swiper('.banner .swiper-container', {
        pagination : '.banner .swiper-pagination',
        paginationClickable : false,
        spaceBetween : 0,
        centeredSlides : true,
        autoplay : 2500,
        autoplayDisableOnInteraction : false,
        loop : true
    });
}

var commentClick = function(obj){
    var title = $(obj).attr("data-title");
    var url = $(obj).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

var mapClick = function(obj){
    var title = $(obj).attr("data-title");
    var url = $(obj).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

var spotFunClick = function(obj){
    var title = $(obj).attr("data-title");
    var url = $(obj).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

var promotionClick = function(obj){
    var title = $(obj).attr("data-title");
    var url = $(obj).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

var spotInfoClick = function(id){
    var title = "景区信息";
    var url = "spot_info.html?id="+id;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.shareAndcollect, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};


