/**
 * Created by wangshouyun on 2016/1/11.
 */

//覆盖initialize.js中的init方法

function init() {
  $.getJSON("../testdata/area/spot_order-noSpread/spot_order-noSpread.js", function (data, status) {
    var dom="";
    if (status == "success") {
      //调用接口成功才执行下面的逻辑
      $(".topBox").html(template("template", data));//添加数据到模板
      var totalTicket = 0;
      var param = OperationURL.getUrlParam(location.href);//拿到上一页传过来的数据
      $(".order-date input").val(param.date);
      //$(".date").html(param.date);
      var ticket = param.ticket+"";
      if(ticket.endsWith(",")) { //如果以逗号结尾，去掉尾部的逗号
        ticket = ticket.substring(0, param.ticket.length - 1);
      }
      var strs = ticket.split(",");//按逗号分割成数组
      for (var i = 0; i < strs.length; i++) {//遍历数组，继续按冒号分割，从而取到每种票型票数的值
        var ticketItem = strs[i].split(":");
        //选择data-id 为ticketItem[0] 的li
        $(".dateTicket ul li[data-id="+ticketItem[0]+"]").find(".amount").text(ticketItem[1]);//把每种票型的值赋给相应的票
        totalTicket += parseInt(ticketItem[1]);
      }
      //countTicket(totalTicket);
      countPrice();//调用计算总价钱函数
      minusActive();//调用判断减按钮是否可用函数

      setTimeout(function () {
        countTicket(totalTicket);
      }, 100);

        $(".add").click(function () {//添加按钮
        var amount = parseInt($(this).prev().html());
        $(this).prev().html(amount + 1);
        minusActive();
        countPrice();
          var total=$(".people").length;
          console.log(total);
          dom = "<div class='people'><li><span>出行人"+(total+1)+"</span><input class='user'></li><li><span>证件类型</span><input class='paperType'></li><li><span>证件号码</span><input class='paperId'></li></div>";
        $(".passage ul").append(dom);//票数增加一张，下面出行人信息相应增加一个
      });
        $(".minus").click(function () {//减按钮
        var amount = parseInt($(this).next().html());
        if (amount != 0) {
          $(this).next().html(amount - 1);
          $(".passage ul .people:last").remove();//票数减少一张，下面出行人信息相应减少一个
        }
        minusActive();
        countPrice();
      });
    }
  });
  $.getJSON("../testdata/area/spot_order-noSpread/spot_order-noSpread.js", function (data, status) {
    if (status == "success") {

      $(".info").html(template("template1", data));

      $(".peopleMore").click(function () {//查看更多 /收起
        if ($(this).hasClass("pack")) {
          $(this).removeClass("pack");
          $(this).find(".more").html("展开");
          $(this).parent().find('.name:gt(3)').css('display', 'none');
        }
        else {
          $(this).addClass("pack");
          $(this).find(".more").html("收起");
          $(this).parent().find(".name").show();
        }
      });
      $(".name").click(function () {
        //$(this).toggleClass("active");
        if(!$(this).hasClass("active")){//判断此人是否有选，如果没有选，就把他的信息填到最近的空列表里
          $(this).addClass("active");
          var username=$(this).text();
          var certificateType=$(this).attr("data-certificateType");
          var identityCard=$(this).attr("data-identityCard");
            $(".people").each(function(){//遍历信息列表，找到最近的空，把所选人的信息填入
               if(!$(this).hasClass("filled")){
                  $(this).find(".user").val(username);
                  $(this).find(".paperType").val(certificateType);
                  $(this).find(".paperId").val(identityCard);
                  $(this).addClass("filled");
                  return false;
               }
            });
        }
        else{//判断此人是否有选，如果有选，遍历信息列表，把他的信息清空
          $(this).removeClass("active");
          var username=$(this).text();
          $(".people").each(function(){
            if($(this).find(".user").val()==username){
              $(this).find(".user").val("");
              $(this).find(".paperType").val("");
              $(this).find(".paperId").val("");
              $(this).removeClass("filled");
            }
          });
        }
      });
    }
    else {
      alert("loading error...");
    }
  });


  function countTicket(total) {//计算一共的票数，从而添加下面相应的出行人信息
    //console.log(total);
    for (var i = 0; i < total; i++) {
      dom = "<div class='people'><li><span>出行人"+(i+1)+"</span><input class='user'></li><li><span>证件类型</span><input class='paperType'></li><li><span>证件号码</span><input class='paperId'></li></div>";
      $(".passage ul").append(dom);
    }
  }
  function minusActive() {//判断当数字为0的时候，设置减速按钮不可再点击
    $(".amount").each(function () {
      if ($(this).text() == 0) {
        $(this).prev().addClass("stopDown");
      }
      if ($(this).text() > 0) {
        $(this).prev().removeClass("stopDown");
      }
    })
  }

  function countPrice() {//计算一共要支付的价格
    var total = 0;
    $(".dateTicket ul li").each(function () {
      var amount = parseFloat($(this).find(".amount").text());
      var price = parseFloat($(this).find(".cash").text());
      total += amount * price;
    });
    $(".total").html(total);
  }
}

function pay(target) {
  var req = {};
  var ticket="";
  var people="";
  $(".dateTicket ul li").each(function () {//遍历票列表，取到票ID，票数量
    var amount=$(this).find(".amount").text();
    var id=$(this).attr("data-id");
    ticket+= id+":"+amount + ","
  });
  $(".people").each(function () {//遍历出行人列表，取到姓名，证件，证件号
    var name= $(this).find(".user").val();
    var paperType=$(this).find(".paperType").val();
    var paperId=$(this).find(".paperId").val();

    ticket+= name+","+paperType + ","+paperId+";"
  });
  req.ticket=ticket;
  req.people=people;
  $.post("../testdata/area/spot_order-noSpread/ceshi.txt", req, function (data, status) {
    data = JSON.parse(data);
    if (status=="success") {
      if(data.retCode==0){
        alert("成功");
      }
      else{
        alert("失败");
      }
    }
  });
  var url = $(target).attr("data-url");
  var new_url = OperationURL.getUrlParent(window.location.href) + url;
  console.log(new_url);
  loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, "支付", new_url);
}
function loadURL(winType, mode, orientation, title, url) {
  if (browseInfo.isTongLianApp()) {
    webviewInterface.createWindow(winType, mode, orientation, title, encodeURI(url));
  }
  else {
    window.location.href = url;
  }
}
