function init(){
	
}
function nextClick(){
//	$("#name").val()
	var title = "诚兑通转账";
	var url = "transfer_person.html";
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
