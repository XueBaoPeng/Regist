/**
 * Created by zeke on 2016/4/1.
 */
var spotFiles = [];
function init(){
    //FastClick.attach(document.body);
    initLocalStorage();
    $('#chkScenery').raty({
        path : "../src/js/widget/jquery.raty/img",
        hints:[1,2,3,4,5],
        target: '#hidScenery',
        targetKeep : true
    });
    $('#chkService').raty({
        path : "../src/js/widget/jquery.raty/img",
        hints:[1,2,3,4,5],
        target: '#hidService',
        targetKeep : true
    });
    $('#chkTraffic').raty({
        path : "../src/js/widget/jquery.raty/img",
        hints:[1,2,3,4,5],
        target: '#hidTraffic',
        targetKeep : true
    });
    $('#chkFacilities').raty({
        path : "../src/js/widget/jquery.raty/img",
        hints:[1,2,3,4,5],
        target: '#hidFacilities',
        targetKeep : true
    });

    $('#fileupload').fileUpload({
        url: config.getUpload(),
        success: function (e, data) {
            if(spotFiles.length<5) {
                if(data.result!=undefined&&data.result.code==200) {
                    $.each(data.result.data, function (index, file) {
                        var imgSrc = config.getImgServer()+file.url;
                        $("#upImages").append("<li data-id='"+file.url+"'><img src='"+imgSrc+"' alt=''></li>")
                        spotFiles.push({md5: file.md5, file_path: file.url});
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
}

function savePublish(){
    //TODO 发表评价
    var id = OperationURL.getQueryString("id");
    var proId = OperationURL.getQueryString("proId");
    var imgs =getImages();
    var param = {
        supplierId : id,
        productId:proId,
        content : $("#txtContent").val(),
        images : imgs,
        scenery : $("#hidScenery").text(),
        service : $("#hidScenery").text(),
        traffic : $("#hidScenery").text(),
        facilities : $("#hidScenery").text(),
        userId:mobile_var.userId
    };
    saveSpotPublish(param,false,function(result){
        if(result.code==0){
            var new_url = OperationURL.getUrlParent(window.location.href) + "spot_comments.html?id="+id;
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