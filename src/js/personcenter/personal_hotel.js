function init(){	
	var domainName = OperationURL.getDomain();
    var param={
        domain:domainName,
        id:mobile_var.userId
    };
    getHotelId(param,false,function(result){
        if(result.code==0){
            hotel.hotelId = result.data.Id;
        }
    });	
    getPersonalCenter(param, true, function(result){
      if(result.code == 0){
        $("#container").html(template("template", result));		
      }
    });	
}

function personalMsg(){
	var title = "个人资料";
	var url = "personal_msg.html";
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function myOrder(){
	var title = "我的订单";
	var url = "hotel_order.html?id="+hotel.hotelId;
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function myProperty(){
	var title = "我的资产";
	var url = "../personaccount/index.html";
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}

function myCollect(){	
//	var title = "我的收藏";
//	var url = "";
//	var new_url = OperationURL.getUrlParent(window.location.href) + url;
//	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function myTraveller(){
	var title = "常用旅客信息";
	var url = "contacts_info.html?id="+mobile_var.userId;
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}

function myTuYou(){	
	var title = "我的兔友";
	var url ="friends.html?id="+mobile_var.userId;
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function mySet(){	
//	var title = "";
//	var url ="";
//	var new_url = OperationURL.getUrlParent(window.location.href) + url;
//	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}