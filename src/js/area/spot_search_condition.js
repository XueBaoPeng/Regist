/**
 * Created by jjjj on 2016/1/25.
 */
function init() {
  //计算滚动区高度
  $('div[class="screen-result"]').height($(window).height()-$(".hotel-opt-btn").height()-150);

   $(".option-ul li").click(function(){//选项卡
     $(this).addClass("option-li-active").siblings().removeClass("option-li-active");
     var a=$('.option-ul li').index(this);
     $(".detail-ul").removeClass("this");
     $('.detail-ul:eq('+a+')').addClass("this");
     scroll.refresh();
     //appendTxt();
   });

  $(".detail-ul li").click(function(){//右面选项点击后高亮显示
    if($(this).text()=="不限"){
      $(".this li").removeClass('choose');
    }
    else{
      $('.this li:eq(0)').removeClass('choose');
    }
    if($(this).hasClass("choose")){
      $(this).removeClass("choose");
    }
    else{
      $(this).addClass("choose");
    }
    if($(this).text()=="不限"){

    }
    //appendTxt();
  });

  //给上面栏目添加选中的列表
  //function appendTxt(){
  //  $(".already-ul li").remove();//清除栏目
  //  //alert("aa")
  //  $(".this .choose").each(function(){//遍历右边所有被选中的选项
  //    var txt=$(this).text();
  //    var str="<li class='already-li'><span class='choice-a'>"+txt+"</span><span class='choice-close'>x</span></li>";
  //    $(".already-ul").append(str);//把被选中的选项追加到上面的栏目里
  //  })
  //}

  //$(".already-ul").delegate(".choice-close","click",function(){//点击叉号删除所选项
  //  var txt=$(this).prev().text();
  //  $(".this li").each(function(){
  //     if($(this).text()==txt){
  //       $(this).removeClass("choose");
  //     }
  //  });
  //  $(this).parent().remove();
  //});
  $(".hotel-opt-no").click(function(){//清除筛选
    $(".already-ul li").remove();
    $(".this li").removeClass("choose");
  });

new IScroll(".wrapper");
var scroll=new IScroll(".wrapper", {
  mouseWheel: false,
  scrollbars: true,
  interactiveScrollbars: true,
  shrinkScrollbars: 'scale',
  fadeScrollbars: true,
  click:true
})
}
