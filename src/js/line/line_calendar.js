/**
 * Created by hyy on 2016/4/14 0014.
 */
var dpc,calPrice=[];
var datePage={
    pageIndex:1,
    pageSize:3,
    pageCount:0
};
function  init()
{
    FastClick.attach(document.body);
    updateData(false);

    dpc = $("#calendar").InitDailyPriceCalendar({
        startdate: todayDate(),
        enddate: "",
        weekend: "",
        calPrices:calPrice,
        datetdCellClick: clickOnDateCell
    });

    $(document).on("scrollstop", function (e) {
        if ((document.body.scrollHeight - (window.pageYOffset + document.documentElement.clientHeight)) < 400) {
            if(datePage.pageIndex<datePage.pageCount){
                datePage.pageIndex++;
                updateData(true);
            }else{
                $.happytoAlert("没有团期数据了");
            }
        }
    });

    $("#selDate").bind("pageshow", function () {

    });

    $("#selDate").bind("pagehide", function () {
        $(document).unbind("scrollstop");
    });

    $("#btnNext").click(function(){
        $(this).css("background-color","#1a87dc");
        var id = OperationURL.getQueryString("id");
        var title="填写订单";
        var url = "line_book.html?id="+id+"&week="+$("#appDate").val();
        var new_url = OperationURL.getUrlParent(window.location.href) + url;
        OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push,webviewInterface.orientation.portrait, title, new_url);
    });
}
var updateData = function(flag) {
    var id = OperationURL.getQueryString("id");
    var param = {
        id:id,
        currentPage:datePage.pageIndex,
        pagesize:datePage.pageSize
    };
    if(!flag){
        getLineCaledar(param, false, function(result){
            if(result.code == 0){
                datePage.pageCount = result.data.PageCount;
                dpc.setPrice(result.data.list);
            }
        });
    }else{
        getLineCaledar(param, false, function(result){
            if(result.code == 0){
                datePage.pageCount = result.data.PageCount;
                dpc.nextPage(result.data.list, datePage.pageIndex, datePage.pageSize);
            }
        });
    }
};

var clickOnDateCell = function () {
    //TODO 日期选择事件
    var v = dpc.getSelectValue();
    if (v != null && v != undefined) {
        $("#appDate").val(v);
    }
};

function detailClick(obj) {

}

$(document).on("click",".datetdCell",function(){
    var day= $(this).children().text();
    var week= $(this).parent().parent().parent().prev(".Time-Div").text();
    var date=week+day;
var dateWeek=date.replace(/年|月/g,"-");
    $("#btn").attr("week",dateWeek);
});







