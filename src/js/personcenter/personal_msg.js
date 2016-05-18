function init(){
    initLocalStorage();
    initPersonInfo();
//  birthdayDate();

    $("#ulType li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
    $("#finish").click(function(){
        $("#ulType li").each(function(i, ele){
            if($(ele).hasClass("active")){
                $("#sex").attr("data-id", $(ele).attr("data-id"));
                $("#sex").html($(ele).text());
                return false;
            }
        });
        $("#winSex").hide().fadeOut();
        saveSex($("#sex").attr("data-id"));
    });

    $("#btnExit").click(function(){
        exit();
    });

    $("#btnModifyPwd").click(function(){
        modifyPwd();
    });
}

function initPersonInfo(){
    //TODO 个人基本信息
    var param = {
        id : mobile_var.userId
    };
    getPersonInfo(param, false, function(result){
        if(result.code == 0){
            $("#personInfo").html(template("tmplPersonal", result));
            initEvent();
            $('#fileupload').fileUpload({
                url : config.getUpload(),
                success : function(e, data){
                    if(data.result != undefined && data.result.code == 200){
                        $.each(data.result.data, function(index, file){
                            var imgSrc = config.getImgServer() + file.url;
                            $("#headImg").attr("src", imgSrc);
                            saveHead(file.url);
                        });
                    } else {
                        alert(data.result.msg);
                    }
                }
            });
        } else {
            console.log(result.msg);
        }
    });
}

function birthdayDate(){
    var currYear = (new Date()).getFullYear();
    $("#appDateTime").mobiscroll({
        preset : 'date',
        theme : 'android-ics light',
        display : 'bottom',
        mode : 'scroller',
        lang : 'zh',
        startYear : currYear - 60,
        endYear : currYear + 5,
        headerText : function(valueText){
            var array = valueText.split('-');
            return array[0] + "年" + array[1] + "月" + array[2] + "日";
        }
    });
}

function initEvent(){
    $("#perNick").click(function(){
        var title="设置昵称";
        var url = "personal_edit.html?id="+mobile_var.userId;
        var new_url = OperationURL.getUrlParent(window.location.href) + url;
        OperationURL.loadURL(webviewInterface.winType.save, webviewInterface.mode.push,webviewInterface.orientation.portrait, title, new_url);
    });

    $("#perSex").click(function(){
        $("#winSex").show().fadeIn();
    });
}

function saveHead(img){
    //TODO 保存头像
    var param = {
        id : mobile_var.userId,
        userImg : img
    };
    savePersonInfo(param, false, function(result){
        if(result.code == 0){
            $.happytoAlert("头像保存成功");
        } else {
            $.happytoAlert(result.msg);
        }
    });
}

function saveSex(sex){
    //TODO 保存性别
    var param = {
        id : mobile_var.userId,
        sex : sex
    };
    savePersonInfo(param, false, function(result){
        if(result.code == 0){
            $.happytoAlert("性别保存成功");
        } else {
            $.happytoAlert(result.msg);
        }
    });
}

function exit(){
    webviewInterface.exitUser();
}

function modifyPwd(){
    webviewInterface.pwdChange();
}

var detailClick = function(obj){
    var data;
    var useName = $("#useName").text();
    var nickname = $("#nickname").text();
    var sex = $("#sex").text();
    var birthday = $("#appDateTime").val();
    var tel = $("#tel").text();
    data = {useName : useName, nickname : nickname, sex : sex, birthday : birthday, tel : tel};
    personalMsg(data, true, function(result){
        if(result.code == 0){
            console.log(data);
            var title = "个人资料";
            var url = $(obj).attr("data-url");
            var new_url = OperationURL.getUrlParent(window.location.href) + url;
            OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
        }
    });
};


