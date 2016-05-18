var dpc, dpd;
var myPullScroll = null;
var paging = new QueryWithOrder();
function init(){
    FastClick.attach(document.body);
    $('#container').height($(window).height() - $('#topDate').height());
    var todDate = todayDate();
    var tomDate = tomorrowDate();

    dpc = $("#calendarStart").InitDailyPriceCalendar({
        startdate : todDate,
        enddate : "",
        weekend : "",
        datetdCellClick : startDateFun
    });
    dpd = $("#calendarEnd").InitDailyPriceCalendar({
        startdate : todDate,
        enddate : "",
        weekend : "",
        datetdCellClick : endDateFun
    });

    $("#startDate").attr("data-value", todDate);
    $("#startDate").text(todDate.substr(5));
    $("#endDate").attr("data-value", tomDate);
    $("#endDate").text(tomDate.substr(5));

    listCommon();
}

function startDateFun(){
    var v = dpc.getSelectValue();
    if(v != null && v != undefined){
        $("#startDate").attr("data-value", v);
        $("#startDate").html(v.substr(5));
    }
    $("#linkClose1").click();
};
function endDateFun(){
    var v = dpd.getSelectValue();
    if(v != null && v != undefined){
        $("#endDate").attr("data-value", v);
        $("#endDate").html(v.substr(5));
    }
    $("#linkClose2").click();
};

function update(isRefresh){
    var id = OperationURL.getQueryString("id");
    var param = {
        id : id,
        startDate : $("#startDate").attr("data-value"),
        endDate : $("#endDate").attr("data-value"),
    };
    if(isRefresh){
        paging.refreshPage();
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getHotelRoomList(param, false, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                //$pullDown.html("下拉刷新");
                $("#roomList").html(template("tmplRoomList", result));
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
        getHotelRoomList(param, false, function(result){
            if(result.code == 0){
                //$pullUp.html("上拉加载更多");
                $("#roomList").append(template("tmplRoomList", result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }
}


function detailClick(obj){
    //TODO 点击预订客房
    var sdate=$("#startDate").attr("data-value");
    var edate=$("#endDate").attr("data-value");
    var id = $(obj).attr("data-id");
    var title = "客房信息";
    var url = "room_detail.html?id=" + id+"&sd="+sdate+"&ed="+edate;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}


function more(obj){
    //TODO 点击下拉客房    
    if($(obj).siblings().css("display") == "none"){
        $(obj).find("#Btn").prop("src","../src/images/hotel/top_03.png") 
        $(obj).siblings().show();
    } else {
        $(obj).find("#Btn").prop("src","../src/images/hotel/bottom_03.png") 
        $(obj).siblings().hide();
    }
}
//选中是否可取消退房
function active(obj){
    $(obj).toggleClass("active");
}