/**
 * 常用联系人
 * Created by zeke 2016-4-14
 */
var perArr;
function editPerson(){
    //原生点击删除后调的函数
    $("#personList li").each(function(i, ele){
        $(ele).find("div:first").addClass("ico-choose-no");
    });
}
function delPerson(){
    perArr=[];
    $("#personList li").each(function(i, ele){
        $this=$(ele).find("div:first");
        if($this.hasClass("ico-choose-have")){
            perArr.push({id : $(ele).attr("data-id")});
        }
    });
    if(perArr.length>0){
        $("#winDel").show();
    }else{
        alert("请选择删除的联系人");
    }
}
function init(){
    loadPersonInfo();

    $("#btnConfirm").click(function(){
        delContact();
    });

    $("#btnCancel").click(function(){
        $("#winDel").hide();
    });
}

function loadPersonInfo(){
    //TODO 常用联系人
    var id = OperationURL.getQueryString("id");
    var param = {
        id : id
    };
    getTopContacts(param, false, function(result){
        if(result.code == 0){
            $("#personList").html(template("tmplPerson", result));
        }
    });
}

function addContactClick(){
    var id = OperationURL.getQueryString("id");
    var title = "增加常用旅客";
    var url = OperationURL.getUrlParent(window.location.href) + "contacts_add.html?id="+id;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, url);
}

function checkPerson(obj){
    $this=$(obj).find("div:first");
    if($this.hasClass("ico-choose-no")){
        if($this.hasClass("ico-choose-have")){
            $this.removeClass("ico-choose-have");
        } else {
            $this.addClass("ico-choose-have");
        }
    }
}

function delContact(){
    //TODO 删除联系人
    var id = OperationURL.getQueryString("id");
    var param = {
        contacts : perArr
    };
    delContacts(param, false, function(result){
        if(result.code == 0){
            var title = "常用旅客信息";
            var url = "contacts_info.html?id=" + id;
            var new_url = OperationURL.getUrlParent(window.location.href) + url;
            OperationURL.loadURL(webviewInterface.winType.edit, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
        }else{
            alert(result.msg);
        }
    });
}