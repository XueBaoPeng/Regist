/**
 * Created by zeke on 2016/3/25.
 */
var myPullScroll = null;
var paging = new QueryWithOrder();
var dpc;
function init(){
    $('#containEva').height($(window).height()-$("#content").height() );
    initLocalStorage();
    var id = OperationURL.getQueryString("id");
    var param = {
        id : id
    };
    getSpotProductDetail(param, false, function(result){
        if(result.code == 0){
            supplier.supplierId = result.data.OwnerId;
            $("#product").html(template("template", result));
            minusActive();
            loadDate(result.data.ServiceFrom, result.data.ServiceTo);
            listCommon();
        } else {
            console.log(result.msg);
        }
    });

    //选择出行日期
    $("#selDate").bind("pageshow", function(){
        $(document).on("scrollstop", function(e){
            if((document.body.scrollHeight - (window.pageYOffset + document.documentElement.clientHeight)) < 400){
                dpc.addMonth();
            }
        });

    });

    $("#selDate").bind("pagehide", function(){
        $(document).unbind("scrollstop");
    });

}

function update(isRefresh){
    var supId = supplier.supplierId;
    var id = OperationURL.getQueryString("id");
    var param = {
        supplierId : supId,
        productId : id,
        type : 0,
        userId : mobile_var.userId
    };
    if(isRefresh){
        paging.refreshPage();
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getSpotComments(param, false, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $("#evaluate").html(template("tmplEvaluate", result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    } else {
        paging.addPage();
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getSpotComments(param, false, function(result){
            if(result.code == 0){
                $pullUp.html("上拉加载更多");
                $("#evaluate").append(template("tmplEvaluate", result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }
}

var loadDate = function(serStartDate, serEndStartDate){
    var wkd = [];
    //运营周期 延迟生效 实际开始
    var serviceStartDate, serviceEndStartDate;
    serviceStartDate = new Date(serStartDate).format("yyyy-MM-dd");
    serviceEndStartDate = new Date(serEndStartDate).format("yyyy-MM-dd");
    dpc = $("#calendar").InitDailyPriceCalendar({
        startdate : serviceStartDate,
        enddate : serviceEndStartDate,
        weekend : wkd,
        datetdCellClick : clickOnDateCell
    });
};

var clickOnDateCell = function(){
    var v = dpc.getSelectValue();
    if(v != null && v != undefined){
        $("#appDate").attr("data-value", v);
        $("#appDate").html(v);
    }
    $("#linkBack").click();
};


var add = function(obj){
    //TODO 增加
    var amount = parseInt($(obj).prev().html());
    $(obj).prev().html(amount + 1);
    minusActive();
    countPrice();
};

var minus = function(obj){
    //TODO 减少
    var amount = parseInt($(obj).next().html());
    if(amount != 0){
        $(obj).next().html(amount - 1);
    }
    minusActive();
    countPrice();
};

function minusActive(){
    //TODO 控制样式
    $(".amount").each(function(){
        if(parseInt($(this).text()) > 0){
            $(this).prev().removeClass("stopDown");
        }
        else {
            $(this).prev().addClass("stopDown");
        }
    })
}
function countPrice(){
    //TODO 计算总价格
    var total = 0;
    $("#versions li").each(function(){
        var amount = parseFloat($(this).find(".amount").text());
        var price = parseFloat($(this).find(".cash").text());
        total += amount * price;
    });
    $("#total").html(total);
}

function bookingClick(){
    var ticket = [];
    var id = OperationURL.getQueryString("id");
    var proName = $("#productName").text();
    var date = $("#appDate").attr("data-value");
    $("#versions li").each(function(){
        var amount = $(this).find(".amount").text();
        var id = $(this).attr("data-id");
        if(amount > 0){
            ticket.push({id : id, num : amount});
        }
    });
    if(date == ""){
        $.happytoAlert("请选择日期");
        return;
    }
    if(ticket.length < 1){
        $.happytoAlert("请添加数量");
        return;
    }
    var url = "order_place.html?id=" + id + "&date=" + date + "&ticket=" + JSON.stringify(ticket);
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, "门票预订", new_url);
}

function saveEvaluation(id, flag){
    //TODO 评论点赞
    if(!flag){
        var param = {
            id : id,
            userId : mobile_var.userId,
            isAdd : true
        };
        saveCommonEvaluate(param, false, function(result){
            if(result.code == 0){
                update(true);
            }
        });
    }
}

function moreShow(obj){
    //TODO 显示更多
    if($(obj).parent().prev("p").hasClass("show")){
        $(obj).parent().prev("p").removeClass("show").addClass("hide");
    }else {
        $(obj).parent().prev("p").removeClass("hide").addClass("show");
    }
}