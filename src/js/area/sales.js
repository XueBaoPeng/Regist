/**
 * Created by jjjj on 2016/1/25.
 */
function init() {

  var swiper_banner = new Swiper('.top .swiper-container', {
    pagination: '.top .swiper-pagination',
    paginationClickable: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false,
    loop: true
  });
  $(".container").delegate(".tab li"," click",function(){/*显示更多信息*/

    $(".tab li").removeClass("current");
    $(this).addClass("current");
    var tabClassName = $(this).attr('class');
    var className = tabClassName.substring(0, tabClassName.length -11);

    $(".main .item").hide();
    //alert(className);
    $('.' + className).show();
  });

}