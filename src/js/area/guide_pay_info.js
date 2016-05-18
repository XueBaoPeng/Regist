/**
 * Created by jjjj on 2016/1/16.
 */
//覆盖initialize.js中的init方法
function init() {
  var orderId;
  var cash;
  var tubei;
  $.getJSON("../testdata/area/guide_pay-info/pay-info.js", [], function (data, status) {
    console.log(status);

    if (status == "success") {
      $(".container").html(template("template", data));

    }
    $(".pay").click(function(){
        $(this).toggleClass("choose");
    });
    $(".ul-bot li").click(function(){
      $(".ul-bot li").removeClass("chooseThis");
      $(this).toggleClass("chooseThis");
    });
    //data.pay
    var payMent;//还需要支付金额
    cash=data.cash;//保存帐户余额
    tubei=data.tubei;//保存兔贝
    orderId=data.orderId;//保存定单号
     $(".cashPay").click(function(){//选择现金支付按钮，则调用countCash计算还需支付的金额
       countCash();

       $(".payment").html(payMent);
     });
    $(".tubeiPay").click(function(){//选择兔贝支付按钮，则调用countCash计算还需支付的金额
      countCash();
      $(".payment").html(payMent);
    });
    function countCash(){//计算还需要支付的金额
        var allAmount=0;
      if($(".cashPay").hasClass("choose")){
        allAmount=allAmount+data.cash;
      }
      if($(".tubeiPay").hasClass("choose")){
        allAmount=allAmount+data.tubei;
      }
      if(allAmount>=data.pay){//如果余额够用，则隐藏银行列表
        $(".ul-bot").hide();
        payMent=0;
      }
      else{//否则要显示列表
        $(".ul-bot").show();
        payMent=data.pay-allAmount;
      }
    }
    var timeStr="";
    var time=data.second;//获取后台传来的总秒数

    countTime();
    countdown();
    //$(".countdown").html(timeStr);
    function countdown(){//时间减1秒，递归直至为0
      countTime();
      time=time-1;
      if(time<=0){
        return;
      }
      setTimeout(countdown,1000);//隔一秒调用一次直至时间小于0秒
    }
    function countTime(){//计算时间串，显示时分秒
      var hour=Math.floor((time/60)/60);
      var minute=Math.floor((time-hour*60*60)/60);
      var second=Math.floor((time-hour*60*60-minute*60));
      timeStr=hour+":"+minute+":"+second;//时分秒字符串
      //alert(timeStr);
      $(".countdown").html(timeStr);
    }


  });
  $(".container").delegate(".pay-confirm","click",function(){/*点击确认按钮，提交信息*/
    var req = {};
    if($(".cashPay").hasClass("choose")){
      req.cash=cash;//如果选择现金余额支付，则原额提交
    }
    else{
      req.cash=0;//没选的话，提交值为0
    }
    if($(".tubeiPay").hasClass("choose")){
      req.tubei=tubei;//如果选择兔贝支付，则原额提交
    }
    else{
      req.tubei=0;//没选的话，提交值为0
    }
    req.orderId= orderId;
    req.payWay=$(".chooseThis .tip-top").text();//提交用户选择的银行（支付方式），默认为微信
   //alert(orderId);

    $.post("data/pay-info/price.txt", req, function (data, status) {
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
  });
}
function detailClick(target) {
  var url = $(target).attr("data-url");
  var new_url = OperationURL.getUrlParent(window.location.href) + url;
  console.log(new_url);
  loadURL(webviewInterface.winType.orderSuccess, webviewInterface.mode.push,webviewInterface.orientation.portrait, "null", new_url);
}
function loadURL(winType, mode, orientation, title, url) {
  if (browseInfo.isTongLianApp()) {
    webviewInterface.createWindow(winType, mode, orientation, title, encodeURI(url));
  }
  else {
    window.location.href = url;
  }
}