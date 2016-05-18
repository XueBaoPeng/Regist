/**
 * Created by zeke on 2016-4-5.
 */


function init() {
    FastClick.attach(document.body);
    loadData();

}

function loadData(){
    var domainName = OperationURL.getDomain();
    var param={
        domain:domainName
    };
    getTravelId(param,false,function(result){
        if(result.code==0){
            travel.travelId = result.data.Id;
        }
    });
    getTravelInfo(param,false,function(result){
        if(result.code==0){
            $("#travelInfo").html(template("tmplTravel", result));
            console.log(result);
            swipeImg();
            swipeNav();
        }
    });

    getTravelHotLine(param,true,function(result){
        if(result.code==0){
            $("#hotList").html(template("tmplHot", result));
            console.log(result);
            /*控制文字一行或者多行都居中*/
            var H=$(".season-detail-content").height();

            if( H==38){
                $(".season-detail-title").css("margin-top","6px")
            }else if(H==19){
                $(".season-detail-title").css("margin-top","14px")
            }
        }
    });
}

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
};

var swipeNav = function(){
    var swiperNav = new Swiper('.hotel-con .swiper-container', {
        pagination: '.hotel-con .swiper-pagination',
        height:120,
        paginationHide:true,
        slidesPerView: 4,
        slidesPerGroup:4,
        paginationClickable: true,
        spaceBetween: 0
    });

}

function navClick(obj,id){
    var titleL=$(obj).children(".hotel-icon-text").text();
    var title = titleL;
    var url = "travel_line.html?id="+travel.travelId+"&typeId="+id;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait,title,new_url);
}

function hotClick(id,title) {
    var title = "线路详情";
    var url = "line_detail.html?id="+id;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.shareAndcollect,webviewInterface.mode.push,webviewInterface.orientation.portrait,title, new_url);
}
