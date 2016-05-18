/**
 * 公共类库、方法
 * Created by zeke on 2016/1/11.
 */

/**
 * 获取浏览器信息
 * */
(function(window, undefined){

    //自定义userAgent格式：{"app":"TongLian","systemVersion":"7.0","systemPlatform":"ios"}

    function BrowseInfo(){
        this.userAgent = window.navigator.userAgent;
        this.isTongLianApp = function(){
            if(this.userAgent.search("TongLian") != -1){
                return true;
            }
            return false;
        }
        this.isWeiXin = function(){
            if(this.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }
            return false;
        }
        this.isWeb = function(){
            if(this.userAgent.indexOf('Safari') == -1){
                return true;
            }
            return false;
        }
        this.isIos = function(){
            if(this.userAgent.indexOf('App_Ios') == -1){
                return true;
            }
            return false;
        }
        this.isAndroid = function(){
            if(this.userAgent.indexOf('App_Android') == -1){
                return true;
            }
            return false;
        }
    }

    /*
     * 获取系统版本
     * */
    BrowseInfo.prototype.getSystemVersion = function(){
        if(this.isTongLianApp()){
            var json = JSON.parse(this.userAgent);
            return json.systemVersion;
        }
        return null;
    }
    /*
     * 获取系统平台
     * */
    BrowseInfo.prototype.getSystemPlatForm = function(){
        if(this.isTongLianApp()){
            var json = JSON.parse(this.userAgent);
            return json.systemPlatform;
        }
        return null;
    }

    BrowseInfo.prototype.isIosApp = function(){
        if(this.isTongLianApp()){
            var json = JSON.parse(this.userAgent);
            return json.systemPlatform=="happytoios"?true:false;
        }
        return false;
    }

    BrowseInfo.prototype.isAndroidApp = function(){
        if(this.isTongLianApp()){
            var json = JSON.parse(this.userAgent);
            return json.systemPlatform=="android"?true:false;
        }
        return false;
    }
    window.browseInfo = new BrowseInfo();

})(window, undefined);


/**
 * 获取URL
 * */
(function(window, undefined){

    function OperationURL(){

    }

    OperationURL.getDomain = function(){
        //TODO 获取域名
        var host = location.host;
        if(host.indexOf("localhost")>0||host.indexOf(":")>0){
            return host;
        }
        return host.split(".")[0];
    };

    OperationURL.getDomainSec = function(){
        //TODO 获取二级域名
        var host = location.host;
        var domain = host.split(".");
        if(domain.length > 0){
            return domain[0];
        }
        return "";
    };

    OperationURL.getUrlParent = function(url){
        var index = url.lastIndexOf("/");
        var new_url = url.substring(0, index + 1);
        return new_url;
    };

    OperationURL.getUrlOrigin = function(){
        var new_url = location.origin+"/";
        return new_url;
    };

    OperationURL.getUrlParam = function(url){
        var index = url.lastIndexOf("?");
        var url_param = url.substring(index + 1, url.length);
        var param_arr = url_param.split("|");
        var paramObj = {};
        for(var i in param_arr){
            var str = param_arr[i];
            var key = str.split("=")[0];
            var value = str.split("=")[1];
            paramObj[key] = value;
        }
        return paramObj;
    };

    OperationURL.getQueryString = function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) return (r[2]);
        return null;
    }

    /*
     * 加载Url
     * @winType:窗口类型
     * @mode:模式
     * @orientation:横屏 or 竖屏
     * @title:标题
     * @url:页面地址
     * */
    OperationURL.loadURL = function(winType, mode, orientation, title, url){
        if(browseInfo.isTongLianApp()){
            webviewInterface.createWindow(winType, mode, orientation, title, url);
        }
        else {
            window.location.href = url;
        }
    };

    window.OperationURL = OperationURL;

})(window, undefined);


/**
 * 排序字段
 * */
(function(window, undefined){
    function OrderField(){

    }

    OrderField.fields = {
        "salesOrder" : "salesOrder",
        "priceOrder" : "priceOrder",
        "goodReputationOrder" : "goodReputationOrder"
    };

    window.OrderField = OrderField;

})(window, undefined);


/**
 * 筛选排序类
 * */
(function(window, undefined){

    function QueryWithOrder(orderField){
        this.pageSize = 10;
        this.currentPage = 1;
        this.orderField = orderField;
        this.orderDesc = true;
        this.filterField = {};
    }

    //添加页
    QueryWithOrder.prototype.addPage = function(){
        this.currentPage += 1;
    }

    //刷新页面
    QueryWithOrder.prototype.refreshPage = function(){
        this.currentPage = 1;
    }

    //改变排序字段
    QueryWithOrder.prototype.changeOrderField = function(orderField){
        this.orderField = orderField;
    }
    //切换升序降序
    QueryWithOrder.prototype.changeOrderDesc = function(isDesc){
        this.orderDesc = isDesc;
    }

    //添加筛选字段
    QueryWithOrder.prototype.addFilterField = function(key, value){
        if(key!=undefined){
            this.filterField[key] = value;
        }
    }

    //移除筛选字段
    QueryWithOrder.prototype.removeFilterField = function(key){
        for(var _key in this.filterField){
            if(_key === key){
                delete this.filterField[_key];
            }
        }
    }

    //获取最终筛选参数对象
    QueryWithOrder.prototype.getQuerySting = function(){
        var obj = new Object();
        obj["pageSize"] = this.pageSize;
        obj["currentPage"] = this.currentPage;
        obj["orderField"] = this.orderField;
        obj["filterField"] = this.filterField;
        return obj;
    }

    QueryWithOrder.prototype.getPaging = function(){
        var obj = new Object();
        obj["pageSize"] = this.pageSize;
        obj["currentPage"] = this.currentPage;
        return obj;
    }

    window.QueryWithOrder = QueryWithOrder;

})(window, undefined);

/*
* 文件上传
* */
(function(){
    $.fn.fileUpload = function(options){
        var defaults = {
            url : "",
            success : null
        };
        var opts = $.extend({}, defaults, options);
        var obj = $(this);
        obj.fileupload({
            url : opts.url,
            type : "POST",
            dataType : "json",
            autoUpload : true,
            acceptFileTypes : /(\.|\/)(jpe?g|png)$/i,
            maxChunkSize : 8400000,
            formData : {model : 1},
            done : function(e, data){
                opts.success(e, data);
            },
            fail : function(e, data){
                console.log("上传失败：" + data.errorThrown);
            }
        });
    }
})(jQuery);
(function(){
    $.fn.fileUploadCross = function(options){
        var defaults = {
            url : "",
            success : null
        };
        var opts = $.extend({}, defaults, options);
        var obj = $(this);
        obj.fileupload({
            url : opts.url,
            type : "POST",
            dataType : "json",
            autoUpload : true,
            acceptFileTypes : /(\.|\/)(jpe?g|png)$/i,
            maxChunkSize : 8400000,
            formData : {model : 1},
            forceIframeTransport : true,
            redirectParamName : "callUrl",
            redirect : "http://" + window.location.host + "/app/callupload.html?",
            done : function(e, data){
                opts.success(e, data);
            },
            fail : function(e, data){
                console.log("上传失败：" + data.errorThrown);
            }
        });
    }
})(jQuery);

/*
* 信息提示
* */
(function(){
    $.extend({
        happytoAlert:function(msg){
            layer.open({
                shade:false,
                time:2,
                content:msg
            });
        }
    });
})(jQuery);


/**
 * JQUERY 银行帐号输入
 * @Author zeke
 **/
(function($){
    // 输入框格式化
    $.fn.bankInput = function(options){
        var defaults = {
            min : 10, // 最少输入字数
            max : 25, // 最多输入字数
            deimiter : ' ', // 账号分隔符
            onlyNumber : true, // 只能输入数字
            copy : true // 允许复制
        };
        var opts = $.extend({}, defaults, options);
        var obj = $(this);
        obj.css({
            imeMode : 'Disabled',
            borderWidth : '1px',
            color : '#000',
            fontFamly : 'Times New Roman'
        }).attr('maxlength', opts.max);
        if(obj.val() != '') obj.val(obj.val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
        obj.bind('keyup', function(event){
            if(opts.onlyNumber){
                if(!(event.keyCode >= 48 && event.keyCode <= 57)){
                    this.value = this.value.replace(/\D/g, '');
                }
            }
            this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
        }).bind('dragenter', function(){
            return false;
        }).bind('onpaste', function(){
            return !clipboardData.getData('text').match(/\D/);
        }).bind('blur', function(){
            this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
            if(this.value.length < opts.min){
                alert('最少输入' + opts.min + '位账号信息！');
                obj.focus();
            }
        })
    }
    // 列表显示格式化
    $.fn.bankList = function(options){
        var defaults = {
            deimiter : ' ' // 分隔符
        };
        var opts = $.extend({}, defaults, options);
        return this.each(function(){
            $(this).text($(this).text().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
        })
    }
})(jQuery);

/***
 * JQuery 格式化字符串扩展
 * add by zeke
 * add date 2015-2-26
 * var a = "我要{0}，也要{1}";
 * alert(String.format(a, "苹果","香蕉"));
 ***/
String.format = function(){
    if(arguments.length == 0)
        return null;
    var str = arguments[0];
    for(var i = 1; i < arguments.length; i++){
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

/**
 *限制金额输入、兼容浏览器、屏蔽粘贴拖拽等
 *参数：bl（数值）
 */
$.fn.numeral = function(bl){
    $(this).keypress(function(e){
        var keyCode = e.keyCode ? e.keyCode : e.which;
        if(bl){
            if((this.value.length == 0 || this.value.indexOf(".") != -1) && keyCode == 46) return false;
            return keyCode >= 48 && keyCode <= 57 || keyCode == 46 || keyCode == 8;
        } else {
            return keyCode >= 48 && keyCode <= 57 || keyCode == 8;
        }
    });
    $(this).bind("copy cut paste", function(e){
        if(window.clipboardData)/*clipboardData.setData('text', clipboardData.getData('text').replace(/\D/g, ''));*/
            return !clipboardData.getData('text').match(/\D/);
        else
            event.preventDefault();
    });
    $(this).bind("dragenter", function(){ return false; });
    $(this).css("ime-mode", "disabled");
    $(this).bind("focus", function(){
        if(this.value.lastIndexOf(".") == (this.value.length - 1)){
            this.value = this.value.substr(0, this.value.length - 1);
        } else if(isNaN(this.value)){
            this.value = "";
        }
    });
};

$.format = function(source, params){
    if(arguments.length == 1)
        return function(){
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply(this, args);
        };
    if(arguments.length > 2 && params.constructor != Array){
        params = $.makeArray(arguments).slice(1);
    }
    if(params.constructor != Array){
        params = [params];
    }
    $.each(params, function(i, n){
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
};

/**
 * 日期格式化
 * */
Date.prototype.format = function(format){
    var o =
    {
        "M+" : this.getMonth() + 1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};
Date.prototype.addDay = function(num){
    this.setDate(this.getDate() + num);
    return this;
};
Date.prototype.addMonth = function(num){
    var tempDate = this.getDate();
    this.setMonth(this.getMonth() + num);
    if(tempDate != this.getDate()) this.setDate(0);
    return this;
};
Date.prototype.addYear = function(num){
    var tempDate = this.getDate();
    this.setYear(this.getYear() + num);
    if(tempDate != this.getDate()) this.setDate(0);
    return this;
};


/**
 * 判断是否为空或空字符
 * $.trim(string);
 * */
String.prototype.NotNullOrEmpty = function(){
    if(this.length == 0 || this == 'undefined')
        return false;
    else
        return true;
};

/**
 * 最大值
 * @returns {number}
 */
Array.prototype.max = function(){
    return Math.max.apply({}, this);
};
/**
 * 最小值
 * @returns {number}
 */
Array.prototype.min = function(){
    return Math.min.apply({}, this);
};

/**
 * APP执行页面跳转
 * */
var loadURL = function(winType, mode, orientation, title, url){
    if(browseInfo.isTongLianApp()){
        webviewInterface.createWindow(winType, mode, orientation, title, url);
    }
    else {
        window.location.href = url;
    }
};

/**
 *获取今日日期
 *格式：YYYY-MM-DD
 */
var todayDate = function(){
    var myDate = new Date();

    var year = myDate.getFullYear();       //年
    var month = myDate.getMonth() + 1;     //月
    var day = myDate.getDate();            //日
    var week = myDate.getDay();            //星期

    //var hh = myDate.getHours();            //时
    //var mm = myDate.getMinutes();          //分

    var clock = year + "-";
    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day;

    //if (hh < 10)
    //    clock += "0";

    //clock += hh + ":";
    //if (mm < 10) clock += '0';
    //clock += mm;
    return (clock);
};

/**
 * 获取明日日期
 * */
var tomorrowDate = function(){
    var myDate = new Date().addDay(1);

    var year = myDate.getFullYear();       //年
    var month = myDate.getMonth() + 1;     //月
    var day = myDate.getDate();            //日
    var week = myDate.getDay();            //星期

    //var hh = myDate.getHours();            //时
    //var mm = myDate.getMinutes();          //分

    var clock = year + "-";
    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day;
    return (clock);
};

/**
 *获取昨天日期
 * */
var yesterday = function(){
    var myDate = new Date().addDay(-1);
    myDate = formatDate(myDate);
    return (myDate);
};

/**
 * 页面初始化入口
 * Created by zeke on 2016/1/11.
 */
$(document).ready(function(){
    init();
});

function init(){
    //此为主函数入口，需要在各页面对应的js中覆盖此方法
}