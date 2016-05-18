/**
 * 移动APP定义和约定
 * Created by zeke on 2016-4-7.
 */
(function(window, undefined){

    function WebviewInterface(preHref){
        this.preHref = preHref;
        this.winType = {
            "normal" : "normal",
            "search" : "search",
            "localPlay" : "localPlay",
            "searchWithLocation" : "searchWithLocation",
            "shareAndcollect" : "shareAndcollect",
            "shareAndDownload" : "shareAndDownload",
            "orderSuccess" : "orderSuccess",
            "save" : "save",
            "edit":"edit",
            "delete" : "delete",
            "browse" : "browse"
        };
        this.keyType = {
            "userId" : "userId",
            "cityName" : "cityName"
        };
        this.mode = {"push" : "push", "pop" : "pop"};
        this.orientation = {"portrait" : "portrait", "landscape" : "landscape"};
    }

    //创建webview新窗口并传递相应参数
    WebviewInterface.prototype.createWindow = function(winType, mode, orientation, title, url){

        var url = this.preHref + "createWindow?"
            + "winType=" + winType + "&"
            + "mode=" + mode + "&"
            + "orientation=" + orientation + "&"
            + "title=" + title + "&"
            + "url=" + url;
        window.location.href = encodeURI(url);
    }

    //导航到指定窗口
    WebviewInterface.prototype.navigationWindow = function(name, title, url){
        var url = this.preHref + "navigationWindow?"
            + "name=" + name + "&"
            + "title=" + title + "&"
            + "url=" + url;

        window.location.href = encodeURI(url);
    }

    //退出账户
    WebviewInterface.prototype.exitUser = function(){
        var url = this.preHref + "exitUser";
        window.location.href = encodeURI(url);
    }
    //返回个人中心
    WebviewInterface.prototype.backToPerson = function(){
        var url = this.preHref + "backToPerson";
        window.location.href = encodeURI(url);
    }
    //返回到首页
    WebviewInterface.prototype.backToHome = function(){
        var url = this.preHref + "backToHome";
        window.location.href = encodeURI(url);
    }
    //返回继续充值
    WebviewInterface.prototype.backToCharge = function(){
        var url = this.preHref + "backToCharge";
        window.location.href = encodeURI(url);
    }
    //返回我的账户
    WebviewInterface.prototype.backToAccount = function(){
        var url = this.preHref + "backToAccount";
        window.location.href = encodeURI(url);
    }
    WebviewInterface.prototype.pwdChange = function(){
        //TODO 修改密码
        var url = this.preHref + "pwdChange";
        window.location.href = encodeURI(url);
    }
    WebviewInterface.prototype.backParam = function(callback,param){
        //TODO 返回传参
        var url = this.preHref + "backParam?callback="+callback+"&param="+param;
        window.location.href = encodeURI(url);
    }
    //手机页面跳转
    WebviewInterface.prototype.mobileRedirect = function(page){
        var url = this.preHref + "mobileRedirect";
        url = page != "" ? (url + "?page=" + page) : url;
        window.location.href = encodeURI(url);
    }

    //微信支付
    WebviewInterface.prototype.weixinToPay = function(param){
        var url = this.preHref + "weixinToPay?param=" + param;
        window.location.href = encodeURI(url);
    }

    //支付宝支付
    WebviewInterface.prototype.alipayToPay = function(param){
        var url = this.preHref + "alipayToPay?param=" + param;
        window.location.href = encodeURI(url);
    }
    //支付宝充值
    WebviewInterface.prototype.alipayToCharge = function(param){
        var url = this.preHref + "alipayToCharge?param=" + param;
        window.location.href = encodeURI(url);
    }

    //获取地理位置
    WebviewInterface.prototype.nativeLocation = function(callBack){
        var url = this.preHref + "nativeLocation?"
            + "callBack=" + callBack;

        window.location.href = encodeURI(url);
    }

    //全屏浏览图片
    WebviewInterface.prototype.brwoseImages = function(imgList, currentIndex){
        var url = this.preHref + "brwoseImages?"
            + "imgList=" + imgList + "&"
            + "currentIndex=" + currentIndex;

        window.location.href = encodeURI(url);
    }

    /*
     * 本地存储
     * @callBack：getId 用户Id，getCity 获取市
     * */
    WebviewInterface.prototype.localStorage = function(callBack, key, value){
        var url = this.preHref + "localStorage?"
            + "callBack=" + callBack + "&"
            + "key=" + key + "&"
            + "value=" + value;

        window.location.href = encodeURI(url);
    }
    /*
    * 手机方法
    * @action:方法名 @param:参数
    * */
    WebviewInterface.prototype.executeApp = function(action,param){
        //TODO 执行手机APP方法
        if(browseInfo.isTongLianApp()){
            //获取用户
            if(happytoios&&happytoios!=null){
                happytoios.execute('{"action":"'+action+'","params":"'+param+'"}');
            }else{
                alert("Mobile not has happytoios UserAgent.");
            }
        }else{
            console.log("This is'nt open in APP.");
        }
    }
    window.webviewInterface = new WebviewInterface("tonglian://");

})(window, undefined);

function initLocalStorage(){
    //TODO 从手机APP获取用户信息
    if(browseInfo.isTongLianApp()){
        //获取用户
        if(happytoios&&happytoios!=null){
            mobile_var.userId = happytoios.execute('{"action":"getId","params":{}}');
            //alert(mobile_var.userId);
        }else{
            alert("Mobile not has happytoios UserAgent.");
        }
        //webviewInterface.localStorage("getId",webviewInterface.keyType.userId,null);
    }else{
        console.log("This is'nt open in APP.");
    }
}

