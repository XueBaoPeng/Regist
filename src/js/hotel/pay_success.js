
function  init(){		
	FastClick.attach(document.body);  	 
    var refound = OperationURL.getQueryString("refound");  
    if(refound=="null"){
    	 $("#remark").text();
    }else{
    	 $("#remark").text(decodeURI(refound) );
    }   
    getSpotInfo();
}
function getSpotInfo(){
	var hotelId = OperationURL.getQueryString("hotelId");   
	var data={
		id:hotelId
	};
    aroundHotSpot(data,false,function(result){
		if(result.code==0){
       		$("#bottom").html(template("template", result));
		}
    });
}
var detailClick = function(obj){
	var id = OperationURL.getQueryString("id");
    var title = "订单详情";
    var hotelId = OperationURL.getQueryString("hotelId");
    var url = "../personcenter/hotel_order_detail.html?id="+id+"&hotelId="+hotelId;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};
function  backHome(){
	var title = "";
	var url = "index.html";
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
   OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}

var spotDetail = function(id){
    var title = "";
    var hotelId = OperationURL.getQueryString("hotelId");
    var url = "../spot/book_detail.html?id="+id+"&hotelId="+hotelId;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};
