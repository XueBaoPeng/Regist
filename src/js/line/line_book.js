/**
 * Created by hyy on 2016/4/7 0007.
 */
var ticketNum = 0,contactList=[];
var mealCount = {
    adultCount : 0,
    childrenCount : 0,
    singleCount : 0
};
function init(){
    FastClick.attach(document.body);
    //获取用户
    initLocalStorage();
    loadData();
    initUserInfo();
    initTouristInfo();
    $("#tourist").delegate("li", "click", function(){
        $(this).toggleClass("choose");
        var tourName = $(this).find("span").text();
        var tourType = $(this).attr("data-type");
        var tourNo = $(this).attr("data-no");
        if($(this).hasClass("choose")){
            $("#touristList>div").each(function(i,ele){
                if($(ele).find("input[name='tourName']").val()==""){
                    $(ele).find("input[name='tourName']").val(tourName);
                    $(ele).find("input[name='tourType']").text(tourType);
                    $(ele).find("input[name='tourIdCard']").val(tourNo);
                    return false;
                }
            });
        }else{
            $("#touristList>div").each(function(i,ele){
                if($(ele).find("input[name='tourName']").val()==tourName){
                    $(ele).find("input[name='tourName']").val("");
                    $(ele).find("input[name='tourType']").val("1");
                    $(ele).find("input[name='tourIdCard']").val("");
                    return false;
                }
            });
        }
    });
}
var loadData = function(){
    var id = OperationURL.getQueryString("id");
    var week = OperationURL.getQueryString("week");
    $("#labGroupDate").text(week);
    var data = {
        id : id,
        startdate : week,
        AdultCount : mealCount.adultCount,
        ChildrenCount : mealCount.childrenCount,
        SingleCount : mealCount.singleCount
    };
    getTravelLinePkg(data, true, function(result){
        if(result.code == 0){
            $("#roomList").html(template("tmplRoomList", result));
        }
    });
};
var initUserInfo =function(){
    //TODO 当前用户信息
    var param={
        id:mobile_var.userId
    };
    getPersonInfo(param,true,function(result){
        if(result.code==0){
            $("#contact").html(template("tmplContacts", result));
        }
    });
};
var initTouristInfo=function(){
    //TODO 游客信息
    var param={
        id:mobile_var.userId
    };
    getTopContacts(param,true,function(result){
        if(result.code==0){
            contactList = result.data;
            $("#tourist").html(template("tmplTourist",result));
            if(result.data.length>4){
                $("#tourist ul li:gt(3)").hide();
            }
        }
    });
};
var showMore = function(obj){
    //TODO 游客信息 显示更多
    $(obj).toggleClass("icon-exp-up");
    $(obj).prev("ul").children("li:gt(3)").fadeToggle();
    //if($(obj).hasClass("icon-exp-up")){
    //    $(obj).prev("ul").children("li:gt(3)").fadeToggle();
    //}else{
    //    $(obj).prev("ul").children("li:gt(3)").hide();
    //}
}
var add = function(obj){
    //TODO 增加
    var parentName = $(obj).parents("li").attr("id");
    var amount = parseInt($(obj).prev().html());
    if(parentName=="adult"){
        $(obj).prev().html(amount + 1);
        var adultCount = parseInt($("#adult").find(".amount").text());
        if(adultCount%2==0){
            $("#single").find(".add").addClass("disabled");
        }else{
            $("#single").find(".add").removeClass("disabled");
        }
        addTourist();
    }else if(parentName=="child"){
        $(obj).prev().html(amount + 1);
        addTourist()
    }else if(parentName=="single"){
        var adultCount = parseInt($("#adult").find(".amount").text());
        if(adultCount%2!=0&&amount<1){
            $(obj).prev().html(amount + 1);
            addTourist();
        }
    }
    optActive();
    countPrice();
};
var minus = function(obj){
    //TODO 减少
    var parentName = $(obj).parents("li").attr("id");
    var amount = parseInt($(obj).next().html());
    if(parentName=="adult"){
        if(amount != 0){
            $(obj).next().html(amount - 1);
            minusTourist();
        }
        var adultCount = parseInt($("#adult").find(".amount").text());
        if(adultCount%2==0){
            $(obj).addClass("disabled");
        }else{
            $(obj).removeClass("disabled");
        }
    }else if(parentName=="child"){
        if(amount != 0){
            $(obj).next().html(amount - 1);
            minusTourist();
        }
    }else if(parentName=="single"){
        if(amount != 0){
            $(obj).next().html(amount - 1);
            minusTourist()
        }
    }
    optActive();
    countPrice();
};
var countPrice = function(){
    //TODO 计算总金额
    var total = 0;
    $("#groupVersion li").each(function(){
        var amount = parseFloat($(this).find(".amount").text());

        var price = parseFloat($(this).find(".num").text());
        console.log(price);
        total += amount * price;
    });
    $("#total").text(total);
};
var optActive = function(){
    //TODO 操作是否可用
    $(".amount").each(function(){
        if($(this).text() == 0){
            $(this).prev().addClass("disabled");
        }
        if($(this).text() > 0){
            $(this).prev().removeClass("disabled");
        }
    })
};
var addTourist = function(){
    //TODO 增加游客
    var dom = "";
    dom = "<div class='add-show'>" +
        "<div class='tourist-bg clear'></div>" +
        "<div class='tourist-name'>" +
        "<label>姓名</label>" +
        "<input name='tourName' type='text' placeholder='必填' value=''>" +
        "</div>" +
        "<div class='tourist-type'>" +
        "<label>证件类型</label>" +
        "<select name='tourType' class='sel-full'>" +
        "<option data-id='1'>身份证</option>" +
        "<option data-id='2'>护照</option>" +
        "<option data-id='3'>港澳通行证</option>" +
        "<option data-id='4'>台湾通行证</option>" +
        "</select>" +
        "</div>" +
        "<div class='tourist-id'>" +
        "<label>证件号码</label>" +
        "<input name='tourIdCard' type='text' placeholder='请输入证件号码' value=''>" +
        "</div>" +
        "</div>";
    $("#touristList").append(dom);
};
var minusTourist = function(){
    //TODO 删除游客
    $("#touristList>div:last").remove();
};
var getGroup=function(){
    var group =[];
    $("#groupVersion li").each(function(i,ele){
        var num=parseInt($(ele).find(".amount").text());
        var verType=parseInt($(ele).attr("data-id"));
        if(num>0){
            group.push({versionType:verType,num:num});
        }
    });
    return group;
};
var getTourists = function(){
    var tourists=[];
    $("#touristList>div").each(function(i,ele){
        var tourName = $(ele).find("input[name='tourName']").val();
        var tourType = $(ele).find("select[name='tourType']").val();
        var tourNo = $(ele).find("input[name='tourIdCard']").val();
        if(tourName!=""){
            tourists.push({name:tourName,certificateType:tourType,identityCard:tourNo});
        }
    });
    return tourists;
};
var commitClick = function(){
    //TODO 确认提交行程
    $(".tourist-li-right").css("background","#1a87dc")
    var id = OperationURL.getQueryString("id");
    var travelDate = OperationURL.getQueryString("week");
    var contactName = $("#txtName").val();
    var contactPhone = $("#txtPhone").val();
    var platform = 6;
    var plans=getGroup();
    var touristInfos = getTourists();
    if(browseInfo.isIosApp()){
        platform = 7;
    }
    else if(browseInfo.isAndroidApp()){
        platform = 8;
    }
    var param = {
        planId:id,
        ownerId : mobile_var.userId,
        ownerType : 3,
        platform : platform,
        travelDate : travelDate,
        plans : plans,
        contactName : contactName,
        contactPhone : contactPhone,
        touristInfos:touristInfos
    };
    saveTravelLineOrder(param, true, function(result){
        if(result.code == 0){
            var url = "pay_info.html?id=" + result.data.orderId;
            var new_url = OperationURL.getUrlParent(window.location.href) + url;
            OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, "支付", new_url);
        } else {
            $.happytoAlert(result.msg);
        }
        console.log(result)
    });
};

