/**
 * Created by wangshouyun on 2016/1/11.
 */

//覆盖initialize.js中的init方法
function  init()
{
    $.getJSON("../testdata/area/line/line.js", function (data, status) {
      if (status == "success") {
        //调用接口成功才执行下面的逻辑
        var starArray = [];
        for (var i = 0; i < 5; i++) {
          var star = {};
          if (i < data.starAmount) {
            star.isYellow = true;
          }
          starArray.push(star);
        }
        data.starArray = starArray; //把starArray放入data对象，因为下面template是用的data对象
        $(".goodDetail").html(template("template", data));
      }
      if(status == "success"){
        $(".container").html(template("template",data));

        var swiper = new Swiper('.swiper-container', {//banner轮播图
          pagination: '.swiper-pagination',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false,
          loop: true
        });
        //监听滚动条，设置当滚到屏幕上方时，定位不动
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


      }
      
    });
}
$(document).ready(function(){
  $(".goodDetail").delegate(".tab li"," click",function(){/*显示更多信息*/
    var tabClassName = $(this).attr('class');
    var className = tabClassName.substring(0, tabClassName.length - 3);
    $(".tab li").removeClass("current");
    $(this).addClass("current");
    $(".content .item").hide();
    $('.' + className).show();
  });
  $(".goodDetail").delegate(".bottom .call","click",function(){/*显示更多信息*/
    $(".bottomBox").show();
  });
  $(".goodDetail").delegate(".cancel","click",function(){/*显示更多信息*/
    $(".bottomBox").hide();
  });
});
function detailClick(target) {
  var url = $(target).attr("data-url");
  var new_url = OperationURL.getUrlParent(window.location.href) + url;
  console.log(new_url);
  loadURL(webviewInterface.winType.normal, webviewInterface.mode.push,webviewInterface.orientation.portrait, "产品购买", new_url);
}
function loadURL(winType, mode, orientation, title, url) {
  if (browseInfo.isTongLianApp()) {
    webviewInterface.createWindow(winType, mode, orientation, title, encodeURI(url));
  }
  else {
    window.location.href = url;
  }
}