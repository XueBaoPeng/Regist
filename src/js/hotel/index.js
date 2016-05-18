/*
* 酒店首页
* add by zeke 2016-4-11
* */
var jingdu,weidu;
function  init(){
	FastClick.attach(document.body);
	loadData();	
}

var loadData = function(){
    var domainName = OperationURL.getDomain();
    var param={
        domain:domainName
    };
    getHotelId(param, false, function(result){
      if(result.code == 0){
        hotel.hotelId = result.data.Id;
      }
    });
  	getHotelInfo(param,true, function(result){
		if(result.code==0){
		    $("#Top").html(template("template", result));		
		    swipeImg();
		    $('#spotStar').raty({
	            path:"../src/js/widget/jquery.raty/img",
				readOnly: true,
	            score: function() {
	                return $(this).attr('data-number');
	            }
	       });
	       jingdu=result.data.hotelJingDu;
	       weidu=result.data.hotelWeiDu;	       
	    }
	});	
	getHotelHotLine(param,true, function(result){
		if(result.code==0){
		    $("#Bottom").html(template("template2", result));	 
	    }
	});
}
function moreClick(obj){	
	if($(obj).prev().hasClass("review-new-content")){
		$(obj).prev().addClass("more").removeClass("review-new-content");	
	}else if($(obj).prev().hasClass("more")){
		$(obj).prev().addClass("review-new-content").removeClass("more");	
	}
}

function bookClick() {
	var title = "房型列表";
	var url = "roomlist.html?id="+$("#hidHotelId").val();
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}

function hotelDetail(){
	var title = "酒店详情";
	var url = "hotel_detail.html?id="+$("#hidHotelId").val();
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function  mapClick(){	
	var title = "酒店地图";	
	var url = "hotel_map.html?id="+$("#hidHotelId").val()+"&jingdu="+jingdu+"&weidu="+weidu;
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function hotelImages(){
	var title = "酒店图片";
	var url = "hotel_images.html?id="+$("#hidHotelId").val();
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function commentClick(){
	var title = "评价";
	var url = "hotel_comment.html?id="+$("#hidHotelId").val();
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function aboutLine(obj){
	var title = "相关线路";
	var url = "../line/line_detail.html?id="+$(obj).attr("data-id");
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}

function  detailClick(obj){	
	var title = $(obj).attr("data-title");
	var url = $(obj).attr("data-url");
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
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
