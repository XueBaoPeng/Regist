/**
 * Created by zeke 2016-3-14
 */
function init(){
    FastClick.attach(document.body);
    webviewInterface.localStorage("getCity",webviewInterface.keyType.cityName,null);
    var data = {
      name:""
    };
    getAreaRecommend(data,false, function(data){
        $(".container").html(template("template", data));
        //启动轮播图
        swipeImg();
    });
}

/*
 * 轮播图点击事件
 * */
function bannerImgClick(target){
    var title = $(target).attr("data-title");
    var url = $(target).attr("data-url");
    console.log(title);
    loadURL(webviewInterface.winType.browse, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, url);
}
/*
 * 四大主题事件
 * */
function fourTypeClick(target){
    var title = $(target).attr("data-title");
    //console.log(title);
    var url = $(target).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    //console.log(new_url);
    loadURL(webviewInterface.winType.search, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function miniBannerClick(target){
    var title = $(target).attr("data-title");
    var url = $(target).attr("data-url");
    loadURL(webviewInterface.winType.browse, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, url);
}
function threeTypeClick(target){
    var title = $(target).attr("data-title");
    var url = $(target).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function playLocalMore(target){
    var title = $(target).attr("data-title");

    var url = $(target).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function playLocalClick(target){
    var title = $(target).attr("data-title");
    var url = null;
    var type = $(target).attr("data-type");
    switch(type){
        case "line":
            url = "area/line_detail.html";
            break;
        case "hotel":
            url = "area/hotel_detail.html";
            break;
        case "spot":
            url = "area/spot_detail.html";
            break;
    }
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    loadURL(webviewInterface.winType.shareAndcollect, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}


/*
 * 轮播图
 * */
function swipeImg(){
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