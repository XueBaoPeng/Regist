/**
 * Created by zeke on 2016/4/1.
 */

var map;
var coordinate={
    x:0,
    y:0
};
function init(){
    var id = OperationURL.getQueryString("id");
    var param ={
        id:id
    };
    getSpotTraffic(param,false,function(result){
        if(result.code==0){
            $("#traffiLine").html(template("tempTraffic",result));
            $("#ifrMap").attr("src","../map/generalmap.html?x="+result.data.map.Longitude+"&y="+result.data.map.Latitude);
        }
    });
}