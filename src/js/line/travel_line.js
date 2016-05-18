/**
 * 线路列表
 * Created by zeke on 2016-4-5
 */

var myPullScroll = null;
var param = new QueryWithOrder();
function init(){
    FastClick.attach(document.body);
    //计算滚动区高度
    $('#lineContent').height($(window).height() - $('#topNav').height());
    $("#cityPage").css('height',$(document).height())
    initLineId();
    $("#btnConfirm").click(function(){
        var travelWay = $("#lineOuting").find(".hyy-colorb").attr("data-value");
        var depCity = $("#txtAddrStart").val();
        var endCity = $("#txtAddrEnd").val();
        var travelDay = $("#iptDays").val().split(',')[0];
        var travelDayEnd = $("#iptDays").val().split(',')[1];
        var traveltDateStar = $("#iptMonths").val().split(',')[0];
        var travelDateEnd = $("#iptMonths").val().split(',')[1];
        var travelTheme = $("#lineTheme").find(".hyy-colorb").text();
        var priceStart = $("#iptPrices").val().split(',')[0];
        var priceEnd = $("#iptPrices").val().split(',')[1];
        var lineType = $("#lineType").find(".hyy-colorb").text();

        param.filterField = {
            travelWay : travelWay,
            depCity : depCity,
            endCityP : endCity,
            travelDay : travelDay,
            travelDayEnd : travelDayEnd,
            traveltDateStar : traveltDateStar,
            travelDateEnd : travelDateEnd,
            travelTheme : travelTheme,
            priceStart : priceStart,
            priceEnd : priceEnd
        };
        update(true);

    });
    $("#topNav").delegate("li", "click", function(){
        $(this).addClass("active").siblings().removeClass("active");
        var serchType = $(this).attr("data-type");
        //TODO 条件查询 and 排序
        if(serchType == "0"){
            //TODO 筛选功能
            loadTheme();
            loadLinesType();
            $("#search").show();
            $("#lineContent").hide();
        } else {
            $("#search").hide();
            $("#lineContent").show();
            param.changeOrderField(serchType);
            if($(this).hasClass("desc")){
                //如果包含有这个CLASS，那么现在是降序，点击后要升序
                $(this).removeClass("desc");
                param.changeOrderDesc(false);
                $(this).children().css("background-position", "-2px 0")
            } else {
                //不包含这个CLASS，现在是升序，点击后要降序
                param.changeOrderDesc(true);
                $(this).addClass("desc");
                $(this).children().css("background-position", "-16px 0")
            }
            update(true);
        }
    });
}

function update(isRefresh){
    var id = OperationURL.getQueryString("id");
    var navType = OperationURL.getQueryString("typeId");
    var orderField=$(".active").attr("data-type");
    param.id = travel.travelId;
    param.filterField.navType = navType;
    param.orderField=orderField;
    if(isRefresh){
        param.refreshPage();
        var page = param.getPaging();
        param.currentPage = page.currentPage;
        param.pageSize = page.pageSize;
        getTravelLineList(param, false, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                //$pullDown.html("下拉刷新");
                $("#lineList").html(template("tmplLines",result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    } else {
        param.addPage();
        var page = param.getPaging();
        param.currentPage = page.currentPage;
        param.pageSize = page.pageSize;
        getTravelLineList(param, false, function(result){
            if(result.code == 0){
                //$pullUp.html("上拉加载更多");
                $("#lineList").append(template("tmplLines", result));
                myPullScroll.refresh();
            } else {
                console.log(result.msg);
            }
        });
    }
}
function lineDetailClick(id){
    var title = "线路详情";
    var url = "line_detail.html?id=" + id;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.shareAndcollect, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
var initLineId=function(){
    var domainName = OperationURL.getDomain();
    var param={
        domain:domainName
    };
    getTravelId(param,false,function(result){
        if(result.code==0){
            travel.travelId = result.data.Id;
            listCommon();
            initEvent();
        }
    });
};
var initEvent = function(){
    //TODO 初始化加载
    $("#lineOuting").delegate("div", "click", function(){
        $(this).addClass("hyy-colorb").siblings().removeClass("hyy-colorb");
    });
    $("#lineTheme").delegate("div", "click", function(){
        $(this).addClass("hyy-colorb").siblings().removeClass("hyy-colorb");
    });
    $("#lineType").delegate("div", "click", function(){
        $(this).addClass("hyy-colorb").siblings().removeClass("hyy-colorb");
    });

    //$("#linkAddrStr").click(function(){
    //    //var id = OperationURL.getQueryString("id");
    //    var title="出发地";
    //    var url = "choose_city.html?id="+travel.travelId+"&type=1";
    //    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    //    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push,webviewInterface.orientation.portrait, title, new_url);
    //});
    //$("#linkAddrEnd").click(function(){
    //    //var id = OperationURL.getQueryString("id");
    //    var title="目的地";
    //    var url = "choose_city.html?id="+travel.travelId+"&type=2";
    //    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    //    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push,webviewInterface.orientation.portrait, title, new_url);
    //});

    $("#search ul li").each(function(){
        $(this).find(".top-title").click(function(){
            $(this).parent("li").find(".menu").toggle("fast", "linear");
        });
    });

    var dataRange=getMonthRange();
    $('#iptDays').jRange({
        from : 1,
        to : 6,
        step : 1,
        scale : [1, 2, 3, 4, 5,6],
        format : '%s',
        width : 280,
        showLabels : false,
        showScale:true,
        isRange : true
    });

    $('#iptMonths').jRange({
        from : dataRange[0],
        to : dataRange[4],
        step : 1,
        scale : dataRange,
        format : '%s',
        width : 280,
        showLabels : false,
        showScale:true,
        isRange : true
    });

    $('#iptPrices').jRange({
        from : 0,
        to :10000,
        step : 500,
        scale : [0, 500, 1000, 2000, 5000,10000],
        format : '%s',
        width : 280,
        showLabels : false,
        showScale:true,
        isRange : true
    });
    var initDt=dataRange[1]+","+dataRange[3];
    $('#iptDays').jRange('setValue','2,5' );
    $('#iptMonths').jRange('setValue', initDt);
    $('#iptPrices').jRange('setValue', '0,2000');
};
var loadTheme = function(){
    //TODO 游玩主题
    var param = {
        id : hotel.hotelId
    };
    getTravelLineTheme(param, true, function(result){
        if(result.code == 0){
            $("#lineTheme").html(template("tmplTheme", result));
        }
    });
};
var loadLinesType = function(){
    //TODO 线路分类
    var id = OperationURL.getQueryString("id");
    var param = {
        id : id
    };
    getTravelClassify(param, true, function(result){
        if(result.code == 0){
            $("#lineType").html(template("tmplLinesType", result));
        }
    });
};

var getMonthRange = function(){
    var months=[];
    for(var i= 0;i<5;i++){
        var currMonth = new Date();
        months.push((currMonth.addMonth(i).getMonth()+1));
    }
    return months;
};

//var loadCity = function(){
//    //TODO 加载城市
//    var type = $(".place input").attr("type");
//    var param = {
//        id :travel.travelId,
//        type :type
//    };
//    getTravelLineCity(param, true, function(result){
//        if(result.code == 0){
//            $("#cityList").html(template("tmplCity", result));
//            console.log(result)
//        }
//    })
//};

function setStartCity(val){
    alert("wangdan");
    $("#txtAddrStart").val(val);
}

//var setStartCity = function(val){
//    alert("wangdan");
//    $("#txtAddrStart").val(val);
//};
var setEndCity = function(val){
    $("#linkAddrEnd").val(val);
};

/*点选城市列表*/
var starCity=function(obj,num){
    $("#cityPage").css("display", "block");
    var type = $(obj).attr("data-type");
    var param = {
        id :travel.travelId,
        type :type
    };
    getTravelLineCity(param, true, function(result){
        if(result.code == 0){
            $("#cityList").html(template("tmplCity", result));
            console.log(result);
            $(document).on("click", "#cityList li", function () {
                $(this).addClass("current").siblings().removeClass("current");
                var name = $(this).text();
                if (num==1){
                $("#txtAddrStart").val(name);
                }
               else
                {
                    $("#txtAddrEnd").val(name);
                }
                $("#cityPage").css("display", "none");
                num=0;
               // $("#cityList li").empty(result);
            })
        }
    });
};














