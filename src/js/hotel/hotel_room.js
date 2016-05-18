
function  init()
{	
	FastClick.attach(document.body);
//  webviewInterface.localStorage("getCity",webviewInterface.keyType.cityName,null);
	var data;
  	hotelRoom(data,false, function(result){
		if(result.code==0){
		    $("#container").html(template("template", result));			   
	    }
	});		
	$("#photoList").lightGallery({
        thumbnail:false,
        download:false
    });
}