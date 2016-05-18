/**
 * Created by hyy on 2016/4/6.
 */

//覆盖initialize.js中的init方法
function init() {

    loadData();
    FastClick.attach(document.body);
    $(".container-search").delegate(".search-btn","click",function(){
        var id = OperationURL.getQueryString("id");
        var travelDay=$("#iptDays").val().substring(0,1);
        var travelDayEnd=$("#iptDays").val().substring(2);
        var traveltDateStar=$("#iptMonths").val().substring(0,1);
        var travelDateEnd=$("#iptMonths").val().substring(2);
        var priceStart=$("#iptPrices").val().substring(0,1);
        var priceEnd=$("#iptPrices").val().substring(2);
        var depCity=$(".place-start input").val();
        var endCity=$(".place-stop input").val();
        var travelTheme=$(".hyy-colorb").text();
        var data={
            id:id,
            filterField:{
                travelDay:travelDay,
                travelDayEnd:travelDayEnd,
                traveltDateStar:traveltDateStar,
                travelDateEnd:travelDateEnd,
                priceStart:priceStart,
                priceEnd:priceEnd,
                depCity:depCity,
                endCity:endCity,
                travelTheme:travelTheme
                /* lineType线路分类未做
                 */
            }
        }
        getSearch(data, true, function (result) {

        })
    })
}

var loadData = function() {
    var data = {
        id:4
        };
    getTravelLineTheme(data, true, function (result) {
        $("#roomList").html(template("tmplRoomList", result));
        console.log(result)
        $(".subject ul").find("li:first-child").addClass("hyy-colorb");
        /**
         * 点击筛选里面的按钮之后选有选中样式，并且显示选中的内容
         */
        $(document).on("click",".subject ul li",function(){
            $(this).addClass("hyy-colorb").siblings().removeClass("hyy-colorb");

        });

        $('#iptDays').jRange({
            from: 0,
            to: 100,
            step: 1,
            scale: [0,25,50,75,100],
            format: '%s',
            width: 280,
            showLabels: true,
            isRange : true
        });


        $('#iptMonths').jRange({
            from: 0,
            to: 100,
            step: 1,
            scale: [0,25,50,75,100],
            format: '%s',
            width: 280,
            showLabels: true,
            isRange : true
        });

        $('#iptPrices').jRange({
            from: 0,
            to: 100,
            step: 1,
            scale: [0,25,50,75,100],
            format: '%s',
            width: 280,
            showLabels: true,
            isRange : true
        });

    })
};


