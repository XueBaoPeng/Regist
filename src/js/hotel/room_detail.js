
//覆盖initialize.js中的init方法
function  init()
{
    FastClick.attach(document.body);
    loadData();
    $("#wrapper").height($(window).height()-$("#bookBtn").height());     
    
}
var loadData = function() {
	var id = OperationURL.getQueryString("id");
    var sdate = OperationURL.getQueryString("sd");
    var edate = OperationURL.getQueryString("ed");
    var data = {
	    id:id,
	    CheckInDate:sdate,
	    LeaveDate:edate
    };
    getHotelRoomDetail(data, false, function (result) {
      if(result.code==0){
        $("#roomDatail").html(template("template", result));
        $("#booking").html(template("template_1", result));
        $("#imgBox").lightGallery({
	        thumbnail:false,
	        download:false
    	})
      }
    });
};

function bookingClick() {
    var sdate = OperationURL.getQueryString("sd");
    var edate = OperationURL.getQueryString("ed");
    var id = OperationURL.getQueryString("id");
	var title = "预定信息";
	var url = "room_booking.html?id="+id+"&sd="+sdate+"&ed="+edate;
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
