
function init() {
	var data;
  	contactsDetail(data,true, function(result){
		if(result.code==0){
		    $("#container").html(template("template", result));	 
	    }
	});
}
var detailClick = function(obj){	
    var title = $(obj).attr("data-title");
    var url = $(obj).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};