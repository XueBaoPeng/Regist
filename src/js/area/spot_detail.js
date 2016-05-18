/**
 * Created by wangshouyun on 2016/1/11.
 */

//覆盖initialize.js中的init方法

function init() {
  $.getJSON("../testdata/area/spot_detail/spot_detail.js", function (data, status) {

    if (status == "success") {
      //调用接口成功才执行下面的逻辑
      $(".topInfo").html(template("template", data));
      $(".ticketInfo").html(template("template1", data));
      minusActive();
      $(".add").click(function(){//添加按钮
        var amount=parseInt($(this).prev().html());
        $(this).prev().html(amount+1);
        minusActive();
        countPrice();
      });
      $(".minus").click(function(){//减按钮
        var amount=parseInt($(this).next().html());
        if(amount!=0){
          $(this).next().html(amount-1);
        }
        minusActive();
        countPrice();
      });
      function minusActive(){
        $(".amount").each(function(){
          if($(this).text()==0){
            $(this).prev().addClass("stopDown");
          }
          if($(this).text()>0){
            $(this).prev().removeClass("stopDown");
          }
        })
      }
      function countPrice(){
        var total=0;
        $(".dateTicket ul li").each(function () {
          var amount=parseFloat($(this).find(".amount").text());
          var price=parseFloat($(this).find(".cash").text());
          total+=amount*price;
        });
        $(".total").html(total);
      }
    }
  });
}
function detailClick(target) {
  var ticket="";
  //var param = OperationURL.getUrlParam(location.href);
  $(".dateTicket ul li").each(function () {
    var amount=$(this).find(".amount").text();
    var id=$(this).attr("data-id");
    ticket+= id+":"+amount + ","
  });
  var date=$("#appDate").val();
  var url = $(target).attr("data-url")+"?id="+"5"+"|"+"date="+date+"|"+"ticket="+ticket;
  //var url = $(target).attr("data-url");
  console.log(url);
  var new_url = OperationURL.getUrlParent(window.location.href) + url;
  console.log(new_url);
  loadURL(webviewInterface.winType.normal, webviewInterface.mode.push,webviewInterface.orientation.portrait, "门票预订", new_url);
}
function loadURL(winType, mode, orientation, title, url) {
  if (browseInfo.isTongLianApp()) {
    webviewInterface.createWindow(winType, mode, orientation, title, encodeURI(url));
  }
  else {
    window.location.href = url;
  }
}