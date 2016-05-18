/**
 * 热门城市
 * Created by hyy on 2016/1/11.
 */
function init(){
    FastClick.attach(document.body);
    //webviewInterface.localStorage("getCity",webviewInterface.keyType.cityName,null);
    loadData();

    $("#cityList").delegate("li","click",function(){
        $(this).addClass("current").siblings().removeClass("current");
        var type = OperationURL.getQueryString("type");
        if(type==1){
            webviewInterface.backParam("setStartCity", $(this).text());
        }else{
            webviewInterface.backParam("setEndCity", $(this).text());
        }
    });
}
var loadData = function(){
    var id = OperationURL.getQueryString("id");
    var type = OperationURL.getQueryString("type");
    var param = {
        id : id,
        type : type
    };
    getTravelLineCity(param, true, function(result){
        if(result.code == 0){
            $("#cityList").html(template("tmplCity", result));
        }
    })
};


