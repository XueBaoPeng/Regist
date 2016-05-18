
function init(){     
    getOrderInfo();
    getSpot()
}
function getOrderInfo(){
	 var id = OperationURL.getQueryString("id"); 	 
	 var param={       
        id : id
    };  
    getHotelOrderDetail(param, true, function(result){
       if(result.code==0){
       		$("#top").html(template("template1", result));
       		$("#process .order-open-row:gt(0)").hide();
		}
    });   
}
function getSpot(){
	var hotelId= OperationURL.getQueryString("hotelId"); 
	//周边景点
    var param={      
        id : hotelId
    };
    aroundHotSpot(param,true,function(result){
		if(result.code==0){
       		$("#bottom").html(template("template2", result));
		}
    });
}

function showOpen(){
    $("#process .order-open-row:gt(0)").slideToggle("fast");
};
function delClick (id){	
    var param ={
        OrderId:id
    };
    getHotelCancelOrder(param,false,function(result){
       if(result.code==0){
           $.happytoAlert("删除成功");
       }else{
           $.happytoAlert(result.msg);
       }
    });
};
function commentClick(obj){
    var id = OperationURL.getQueryString("id");
    var hotelId = OperationURL.getQueryString("hotelId");
 	var title = "评价";
    var url = "../hotel/hotel_discuss.html?id="+id+"&roomId="+$(obj).attr("data-roomId")+"&hotelId="+hotelId;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
var spotDetail = function(id){
    var title = "";
    var url = "../spot/book_detail.html?id="+id;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};


