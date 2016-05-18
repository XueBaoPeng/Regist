
var hotelFiles = [];
function init(){
    $('#hotelPosition').raty({
        path : "../src/js/widget/jquery.raty/img",
        hints:[1,2,3,4,5],
        target: '#hidPosition',
        targetKeep : true
    });
    $('#hotelInstitution').raty({
        path : "../src/js/widget/jquery.raty/img",
        hints:[1,2,3,4,5],
        target: '#hidInstitution',
        targetKeep : true
    });
    $('#hotelClean').raty({
        path : "../src/js/widget/jquery.raty/img",
        hints:[1,2,3,4,5],
        target: '#hidClean',
        targetKeep : true
    });
    $('#hotelService').raty({
        path : "../src/js/widget/jquery.raty/img",
        hints:[1,2,3,4,5],
        target: '#hidService',
        targetKeep : true
    });
    $('#hotelComfort').raty({
        path : "../src/js/widget/jquery.raty/img",
        hints:[1,2,3,4,5],
        target: '#hidComfort',
        targetKeep : true
    });
    $('#hotelPerformance').raty({
        path : "../src/js/widget/jquery.raty/img",
        hints:[1,2,3,4,5],
        target: '#hidPerformance',
        targetKeep : true
    });


  $('#fileupload').fileUpload({
        url: config.getUpload(),
        success: function (e, data) {
            if(hotelFiles.length<5) {
                if(data.result!=undefined&&data.result.code==200) {
                    $.each(data.result.data, function (index, file) {
                        var imgSrc = config.getImgServer()+file.url;
                        $("#upImages").append("<li data-id='"+file.url+"'><img src='"+imgSrc+"' alt=''></li>")
                        hotelFiles.push({md5: file.md5, file_path: file.url});
                    });
                }else{
                    alert(data.result.msg);
                }
            }
            else{
                alert("最多允许上传5张图片");
            }
        }
    });

    $("#btnSave").click(function(){
        savePublish();
    });
//  $(".about-hotel-type span").click(function(){
//			$(this).toggleClass("active").siblings().removeClass("active")
//	});
//  $(".about-hotel-purpose span").click(function(){
//			$(this).toggleClass("active").siblings().removeClass("active")
//	});
}

function savePublish(){
    //TODO 发表评价
    var id = OperationURL.getQueryString("hotelId");
    var roomId = OperationURL.getQueryString("roomId");
    var imgs =getImages();
    var param = {
    	supplierId:id,
    	productId:roomId,
        content : $("#txtContent").val(),
        images : imgs,
        position : $("#hidPosition").text(),
        facilities : $("#hidInstitution").text(),
        clearing  : $("#hidClean").text(),
        service : $("#hidService").text(),
        feeling : $("#hidComfort").text(),
        costeffective : $("#hidPerformance").text(),
        userId: mobile_var.userId
//      type:$(".about-hotel-type").find(".active").text(),
//      purpose:$(".about-hotel-purpose").find(".active").text()
    };
    
    saveHotelDiscuss(param,false,function(result){
        if(result.code==0){
        	var hotelId = OperationURL.getQueryString("hotelId");
            var new_url = OperationURL.getUrlParent(window.location.href) + "hotel_comment.html?id="+hotelId;
            OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, "用户点评", new_url);
        }else{
            $.happytoAlert(result.msg);
        }
    });
}
function getImages(){
    var imageList=[];
    $("#upImages li").each(function(i,item){
        imageList.push($(this).attr("data-id"));
    })
    return imageList;
}
