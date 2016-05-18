/**
 * 房间下单
 * Created by zeke on 2016/3/31 0031.
 */

function init(){
    FastClick.attach(document.body);
    initLocalStorage();
    loadData();
}
function loadData(){
    var id = OperationURL.getQueryString("id");
    var sdate = OperationURL.getQueryString("sd");
    var edate = OperationURL.getQueryString("ed");
    var param = {
        id : id,
        CheckInDate : sdate,
        LeaveDate : edate
    };
    getRoomBooking(param, true, function(result){
        if(result.code == 0){
            $("#roomBooking").html(template("template", result));
            $("#total").text(result.data.price);
            $("#startTime").text(sdate);
            $("#endTime").text(edate);
            $("#startWeek").text(" (周" + getWeek(sdate) + ")");
            $("#endWeek").text(" (周" + getWeek(edate) + ")");
            $("#specialList").delegate("div", "click", function(){
                $(this).toggleClass("current");
            });
            initUserInfo();
            initTouristInfo();
        }
    });
};
var getTourists = function(){
    var tourists = [];
    $("#Box>div").each(function(i, ele){
        var tourName = $(ele).find("input[name='checkName']").val();
        var tourNo = $(ele).find("input[name='checkNo']").val();
        if(tourName != ""){
            tourists.push({name : tourName, certificateType : 1, identityCard : tourNo});
        }
    });
    return tourists;
};
var getSpecials = function(){
    //TODO 特殊要求
    var special = [];
    $("#specialList div").each(function(){
        if($(this).hasClass("current")){
            special.push($(this).text());
        }
    });
    return special;
};
function commitClick(){
    //TODO 确认提交订单
    var id = OperationURL.getQueryString("id");
    var sdate = OperationURL.getQueryString("sd");
    var edate = OperationURL.getQueryString("ed");
    var platform = 6;
    var touristInfos = getTourists();
    var specials = getSpecials();
    if(browseInfo.isIosApp()){
        platform = 7;
    }
    else if(browseInfo.isAndroidApp()){
        platform = 8;
    }
    var param = {
        platform : platform,
        ownerId : mobile_var.userId,
        ownerType : 3,
        beds : {
            roomId : $("#roomId").val(),
            roomVerId : id,
            roomtQuantity : $("#num").text(),
            TripDate : sdate,
            EndTripDate : edate
        },
        customers : touristInfos,
        specials : specials,
        name : $("#contact").val(),
        phone : $("#contactTel").val(),
        remark : $("#remark").val()
    };

    saveHotelOrder(param, false, function(result){
        if(result.code == 0){
            var url = "pay_info.html?id=" + result.data.orderId;
            var new_url = OperationURL.getUrlParent(window.location.href) + url;
            OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, "支付", new_url);
        } else {
            $.happytoAlert(result.msg);
        }
    });
};

function getWeek(dt){
    //TODO 获取星期
    var week = new Date(dt).getDay();
    switch(week){
        case 0:
            week = "日";
            break;
        case 1:
            week = "一";
            break;
        case 2:
            week = "二";
            break;
        case 3:
            week = "三";
            break;
        case 4:
            week = "四";
            break;
        case 5:
            week = "五";
            break;
        case 6:
            week = "六";
            break;
    }
    return week;
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
            $("#contactTel").val(result.data.phone);
        }
    });
};
var initTouristInfo = function(){
    //TODO 游客信息
    var param = {
        id : mobile_var.userId
    };
    getTopContacts(param, true, function(result){
        if(result.code == 0){
            $.each(result.data, function(i, item){
                var peop = '<span class="name" onclick="selectPerson(this)" data-id="' + item.contactId + '" data-no="' + item.number + '">' + item.contactName + '</span>';
                $(peop).insertBefore($("#labMore"));
            });
            if(result.data.length > 4){
                $("#peopList>span:gt(3)").hide();
            }
        }
    });
};
var showMore = function(obj){
    //TODO 显示更多
    if($(obj).find("a").text() == "更多"){
        $(obj).find("a").text("收起");
        $(obj).find("span").addClass("up");
        $(obj).parent().find(".name:gt(3)").show();
    } else {
        $(obj).find("a").text("更多")
        $(obj).find("span").removeClass("up");
        $(obj).parent().find(".name:gt(3)").hide();
    }
};
var add = function(obj){
    //TODO 增加
    var amount = parseInt($(obj).prev().html());
    $(obj).prev().html(amount + 1);
    addTourist();
    optActive();
    countPrice();
};
var minus = function(obj){
    //TODO 减少
    var amount = parseInt($(obj).next().html());
    if(amount > 1){
        $(obj).next().html(amount - 1);
        minusTourist();
        optActive();
        countPrice();
    } else {
        return false;
    }
};
var countPrice = function(){
    //TODO 计算总金额
    var total = 0;
    var amount = parseInt($("#num").text());
    var price = parseFloat($("#onePrice").text());
    total = amount * price;
    $("#total").text(total);
};
var optActive = function(){
    //TODO 操作是否可用
    if($("#num").text() == 1){
        $("#num").prev().addClass("disabled");
    }
    if($("#num").text() > 1){
        $("#num").prev().removeClass("disabled");
    }
};
var addTourist = function(){
    //TODO 增加客人
    //var dom="";
    //dom+='<div class="people passage">'
    //+'<div class="bar_hbr">房间</div>'
    //+	'<div class="peopleName">'
    //+		'<span class="name" onclick="selectPerson(this)" data-id="11">ddd</span>'
    //+		'<p class="peopleMore" onclick="showMore(this);"><a class="more">更多</a><span class="jiantou"></span></p>'
    //+	'</div>'
    //+'	<ul class="userList ">'
    //+'		<li>'
    //+'			<p><span class="about-check-user"> 入住人姓名</span><input class="about-check-info" value=""></p>'
    //+'			<p><span class="about-check-user"> 身份证号码</span><input class="about-check-info" value=""></p>'
    //+'		</li>'
    //+'	</ul>'
    //+'</div>';
    //$("#Box").append(dom);
    $("#commonPeop").clone().appendTo($("#Box"));
};
var minusTourist = function(){
    //TODO 删除游客
    $("#Box>div:last").remove();
};
var selectPerson = function(obj){
    $(obj).addClass("active").siblings().removeClass("active");
    $(obj).parent().next().find("input[name='checkName']").val($(obj).text());
    $(obj).parent().next().find("input[name='checkNo']").val($(obj).attr("data-no"));
};
