/**
 * 配置说明
 * Created by zeke on 2016/3/14.
 */
(function(window){
    //图片服务器
    var imgServer="http://123.56.129.234:9000/";
    //服务接口
    var url = "";
    var type = "POST",datatype = "JSONP";
    //test:本地测试 local:本地发布 debug:测试调试 publish:生产发布
    var model = "local";  //debug
    if(model=="local"){
        url = "http://127.0.0.1:8020/"
    }else if(model=="debug"){
        url = "http://172.16.1.67:8095/";
    }else if(model=="publish"){
        url = "http://api.h5.happyto.com/";
    }else{
        url="http://"+location.host+"/RegionApp/";
    }
    function config() {
        var getType = function(){
            return type
        };
        var getUrl = function () {
            return url;
        };
        var getDataType = function () {
            return datatype;
        };
        var getUpload = function () {
            return imgServer+"21/upload";
        };
        var getImgServer = function () {
            return imgServer;
        };
        return {
            getUrl: getUrl,
            getType:getType,
            getDataType: getDataType,
            getUpload:getUpload,
            getImgServer:getImgServer
        }
    }
    window.config = new config();
})(window);