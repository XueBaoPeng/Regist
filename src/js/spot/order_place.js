/**
 * Created by zeke on 2016/3/29.
 */
var ticketNum= 0,checkIdentity=false;
var conData={},contacts = [],verContact =[];
function init() {
    //获取用户
    initLocalStorage();

    var id = OperationURL.getQueryString("id");
    var date = OperationURL.getQueryString("date");
    $("#appDate").html(date);
    var param ={
        id:id
    };
    getSpotProductDetail(param,false,function(result){
        if(result.code==0){
            $("#content").html(template("tempversion", result));
            checkIdentity = result.data.rules.buyRule.IsCheckIdentity;
            loadTicket(result.data.rules.buyRule.IsCheckIdentity);
            minusActive();
            //判断购买规则
            if(result.data.rules&&result.data.rules.buyRule.IsCheckIdentity){
                //需要验证身份
                loadTravelPerson();
            }
        }else{
            console.log(result.msg);
        }
    });
}

function loadContact() {
    //TODO 根据初始票数添加出行人信息
    var dom="";
    var total = ticketNum;

    dom = "<div class='passage'>"
    +"<div class='proversion'>东北虎灵</div>"
    +"<div class='peopleName'>"
    +"<span class='name' onclick='selectPerson(this)' data-id=''>小妹</span>"
    +"<p class='peopleMore'><a class='more'>更多</a><span class='jiantou'></span></p>"
    +"</div>"
    +"<div class='travelPeople'>"
    +"<div class='people'>"
        +"<div><span>出行人</span><input class='peopName'></div>"
        +"<div><span>证件类型</span><select class='sel-full peopType'><option value='1'>身份证</option></select></div>"
        +"<div><span>证件号码</span><input class='peopIdCard'></div></div>"
    +"</div>"
    +"<div class='bankgap'></div>"
    +"</div>";

    for (var i = 0; i < total; i++) {
        dom = "<div id='people"+(i+1)+"' class='people'>"
            +"<div><span>出行人"+(i+1)+"</span><input class='peopName'></div>"
            +"<div><span>证件类型</span><select class='sel-full peopType'><option value='1'>身份证</option></select></div>"
            +"<div><span>证件号码</span><input class='peopIdCard'></div></div>";
        $("#travelPeople").append(dom);
    }
}

function initContact() {
    //TODO 显示出行人信息
    conData.verContact = verContact;
    $("#travInfo").html(template("tmplContact",conData));
}
function minusContact(verId) {
    //TODO 减少出行人信息
    //var $dom = $("#travelPeople").find("#people"+(ticketNum+1));
    //$dom.remove();

    $.each(verContact,function(i,item){
        if(verId==item.verId){
            verContact.splice(i,1);
            initContact();
            return false
        }
    });
}

var add = function(obj){
    //TODO 增加
    var amount=parseInt($(obj).prev().html());
    var verId = $(obj).parents("li").attr("data-id");
    var verName = $(obj).parents("li").attr("data-vname");
    $(obj).prev().html(amount+1);
    minusActive();
    countPrice();
    if(checkIdentity){
        verContact.push({verId : verId, verName : verName, contacts : contacts});
        initContact();
    }
};
var minus = function(obj){
    //TODO 减少
    var amount=parseInt($(obj).next().html());
    var verId = $(obj).parents("li").attr("data-id");
    if(amount!=0){
        $(obj).next().html(amount-1);
    }
    minusActive();
    countPrice();
    if(checkIdentity){
        minusContact(verId);
    }
};

function minusActive() {
    //判断当数字为0的时候，设置减速按钮不可再点击
    $(".amount").each(function () {
        if (parseInt($(this).text()) > 0){
            $(this).prev().removeClass("stopDown");
        }else{
            $(this).prev().addClass("stopDown");
        }
    })
}

function countPrice(){
    //TODO 计算总价格
    var total=0;
    ticketNum = 0;
    $("#versions li").each(function () {
        var amount=parseFloat($(this).find(".amount").text());
        var price=parseFloat($(this).find(".cash").text());
        total+=amount*price;
        ticketNum +=amount;
    });
    $("#total").html(total);
}

function loadTicket(flag){
    //TODO 加载之前票数
    var ticket = OperationURL.getQueryString("ticket");
    var versions = JSON.parse(decodeURIComponent(ticket));
    $("#versions li").each(function(){
        var verId=$(this).attr("data-id");
        var verName = $(this).attr("data-vname");
        var $num = $(this).find(".amount");
        $.each(versions,function(i,item){
            if(verId == item.id){
                $num.text(item.num);
                if(flag){
                    for(var i = 0; i < item.num; i++){
                        verContact.push({verId : verId, verName : verName, contacts : null});
                    }
                }
            }
        });
    });
    countPrice();
}

function loadTravelPerson(){
    //TODO 加载常用联系人信息
    var param={
        id:mobile_var.userId
    }
    getTopContacts(param,false,function(result){
        if(result.code==0){
            $.each(verContact,function(i,item){
                item.contacts = result.data;
            });
            initContact();
        }
    });
}

var initUserInfo = function(){
    //TODO 当前用户信息
    var param = {
        id : mobile_var.userId
    };
    getPersonInfo(param, true, function(result){
        if(result.code == 0){
            //$("#contact").html(template("tmplContacts", result));
            $("#contact").val(result.data.userName);
            $("#contactTel").val(result.data.phone+111);
        }
    });
};

function selectPerson(obj){
    //TODO 选择出行人
    $this = $(obj);
    var peoName = $this.text();
    var peoId = $this.attr("data-id");
    $this.addClass("active").siblings().removeClass("active");
    var people = $(obj).attr("data-id");
    $this.parent().next(".travelPeople").attr("data-id", peoId);
    $this.parent().next(".travelPeople").find(".peopName").val(peoName);
}

function showMore(obj){
    //TODO 显示更多
    if($(obj).find("a").text()=="更多"){
        $(obj).find("a").text("收起");
        $(obj).parent().find(".name:gt(3)").show();
    }else{
        $(obj).find("a").text("更多")
        $(obj).parent().find(".name:gt(3)").hide();
    }
}

function orderBook(obj) {
    //TODO 确定下单
    var id = OperationURL.getQueryString("id");
    var ticketType=[];
    var platform = 6;
    if(browseInfo.isIosApp()){
        platform = 7;
    }
    else if(browseInfo.isAndroidApp()){
        platform = 8;
    }
    $("#versions li").each(function () {
        var certificate=[];
        var verId=$(this).attr("data-id");
        var verNum=$(this).find(".amount").text();
        if(verNum>0){
            $("#travInfo>div").each(function () {
                var curId=$(this).attr("data-id");
                var peopName= $(this).find(".peopName").val();
                var peopType=$(this).find(".peopType").val();
                var peopIdCard=$(this).find(".peopIdCard").val();
                if(verId == curId){
                    if(peopName != "" || peopIdCard != ""){
                        certificate.push({name : peopName, certificateType : peopType, identityCard : peopIdCard});
                    }
                }
            });
            ticketType.push({versionId : verId, num : verNum,CertificateStr:certificate});
        }
    });

    if(ticketType.length<1){
        $.happytoAlert("请选择门票");
        return;
    }
    var param = {
        id:id,
        platform:platform,
        ownerType:3,
        ownerId:mobile_var.userId,
        ticketType:ticketType,
        travelDate:$("#appDate").text(),
        phone:$("#relPhone").val()
    };

    saveSpotOrder(param,false,function(result){
        if(result.code==0){
            var url = $(obj).attr("data-url")+"?id="+result.data.orderId;
            var new_url = OperationURL.getUrlParent(window.location.href) + url;
            OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, "支付", new_url);
        }else{
            $.happytoAlert(result.msg);
        }
    });
}
