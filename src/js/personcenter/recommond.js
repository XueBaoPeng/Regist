/**
 * 二维码
 * Created by zeke on 2016-4-14
 */
function  init(){
	var id = OperationURL.getQueryString("id");
	var param={
		id:id
	};
	getRecommond(param,false, function(result){
		if(result.code==0){
			result.data.codeImg = config.getUrl() + result.data.codeImg
		    $("#container").html(template("template", result));	 
	    }
	});
}


