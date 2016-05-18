/**
 * Created by hyy on 2016/4/6 0006.
 */
function  init(){
    FastClick.attach(document.body);
    loadData();
    initEvent();
    $("#all-box").css('height',$(document).height())
}

var loadData = function() {
    //TODO 初始化数据
    var id = OperationURL.getQueryString("id");

    var data = {
        id:id
    };
    getTravelLineDetail(data, true, function (result) {
        if(result.code==0) {
            $("#roomList").html(template("tmplRoomList", result));
            initSwipe();
            $('#spotStar').raty({
                path : "../src/js/widget/jquery.raty/img",
                readOnly: true,
                score : function(){
                    return $(this).attr('data-number');
                }
            });
            //默认选中第一个套餐
            $("#lineMeal").find("[name='checkMeal']").eq(0).attr("checked","checked");
        }
        /*监听滚动条，设置当滚到屏幕上方时，定位不动*/
        var tabPosition=$(".tab").offset().top;
        $(window).scroll(function(event){
            var distance=tabPosition-$(window).scrollTop();
            if(distance<=0){
                $(".tab").addClass("location");
              $(".goodDetail .content").css('margin-top','65px');
              //alert(distance)
          }
         else{
               $(".tab").removeClass("location");
               $(".goodDetail .content").css('margin-top','0');
            }
        });

    });
};


$(document).ready(function() {
    $(".goodDetail").delegate(".tab li", " click", function () {/*显示更多信息*/

        initSwipe();
    })
})
var initSwipe = function () {
    //TODO 轮播图
    var swiper = new Swiper('.swiper-container', {//banner轮播图
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        loop: true
    });
};
        var initEvent = function () {
            $(".goodDetail").delegate(".tab li", " click", function () {
                /*显示更多信息*/

                $(".tab li").removeClass("current");
                $(this).addClass("current");
                var tabClassName = $(this).attr('class');
                var className = tabClassName.substring(0, tabClassName.length - 11);

                $(".content .item").hide();
                //alert(className);
                $('.' + className).show();
            });
            $(".goodDetail").delegate(".bottom .call", "click", function () {/*显示更多信息*/
                $(".bottomBox").show();
            });
            $(".goodDetail").delegate(".cancel", "click", function () {/*显示更多信息*/
                $(".bottomBox").hide();
            });
        };
        var detailClick = function () {
            $(".buy").css("background-color","#1a87dc");
            var id = $("#lineMeal").find("input[type='checkbox']:checked").val();
            var title = "线路详情";
            var url = "line_calendar.html?id=" + id;
            var new_url = OperationURL.getUrlParent(window.location.href) + url;
            OperationURL.loadURL(webviewInterface.winType.shareAndcollect, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
        };
        var moreClick = function (obj) {
            //TODO 展开收缩
            $(obj).parent().next().toggle("normal", "linear");
        };
        var mealCheck = function (obj) {
            //TODO 复选框选择事件
            $(obj).parents("#lineMeal").find("[name='checkMeal']").prop('checked', "");
            if ($(obj).is(':checked')) {
                $(obj).prop('checked', "checked");
            } else {
                $(obj).siblings(".input-bg").css("background","url('../src/images/line/ok@.png') no-repeat").parent().parent().siblings().children().children(".input-bg").css("background","url('../src/images/line/moren@.png') no-repeat");

                //$(obj).siblings(".input-bg").css("background","url('../src/images/line/ok@.png') no-repeat");
                $(obj).prop('checked', "checked");
            }
        };
//var inputBg=function(obj){
//    if($(obj).css("background","('../src/images/line/moren@.png')")){
//        $(obj).css("background","url('../src/images/line/ok@.png')")
//    }else{
//        $(obj).css("background","url('../src/images/line/moren@.png')")
//    }
//}

function more(obj){
    //TODO 点击下拉客房
    if($(obj).siblings().css("display") == "none"){
        $(obj).children().children(".meal-triangle").prop({"src":"../src/images/line/down@.png","width":10,"height":6});
        $(obj).siblings().show();
    } else {
        $(obj).children().children(".meal-triangle").prop({"src":"../src/images/line/right@.png","width":6,"height":10});
        $(obj).siblings().hide();
    }
}
function bg(obj){
    $(obj).css("background","url('../src/images/line/ok@.png')").parent().parent(".meal-all").siblings().children(".")
}
