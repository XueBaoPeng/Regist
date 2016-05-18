function init(){
	var data;
	setRemark(data,true,function(result){
		if(result.code==0){
       		$("#container").html(template("template", result));
		}
    });
}
//点击保存时调用此函数
var saveClick = function(obj) {
  var data;
  var name=$("#name").val();
  data={name:name};
  setRemark(data,true,function(result){
	if(result.code==0){
	   	console.log(data);
	   	var title = $(obj).attr("data-title");
		var url = $(obj).attr("data-url");
		var new_url = OperationURL.getUrlParent(window.location.href) + url;
		OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
    }
  });
}

	