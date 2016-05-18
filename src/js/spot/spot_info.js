/**
 * Created by zeke on 2016/3/31.
 */
function init(){
    loadSpotInfo();
    loadSpotSites();
}

function loadSpotInfo(){
    var domainName =  OperationURL.getDomain();
    var param={
        domain:domainName
    };
    getSpotInfo(param,false,function(result){
        if(result.code==0){
            result.data.level=changeStar(result.data.level);
            $("#content").html(template("tmplContent", result));
        }
    });
}

function loadSpotSites(){
    var id = OperationURL.getQueryString("id");
    var param={
        id:id
    };
    getSpotSites(param,true,function(result){
        if(result.code==0){
            $("#spotsList").html(template("tmplSpotSite", result));
        }
    });
}

function changeStar(level){
    //TODO 转换等级
    var str="";
    switch(level){
        case "1":
            str = "A";
            break;
        case "2":
            str = "AA";
            break;
        case "3":
            str = "AAA";
            break;
        case "4":
            str = "AAAA";
            break;
        case "5":
            str = "AAAAA";
            break;
        default:
            break;
    }
    return str;
}

function supplierNameClick(obj){
    var title="景区";
    var url = $(obj).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.shareAndcollect, webviewInterface.mode.push,webviewInterface.orientation.portrait, title, new_url);
}

function detailClick(obj){
    var title=$(obj).attr("data-title");
    var url = $(obj).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.shareAndcollect, webviewInterface.mode.push,webviewInterface.orientation.portrait, title, new_url);
}