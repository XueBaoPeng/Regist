/**
 * Created by jjjj on 2016/1/15.
 */
//覆盖initialize.js中的init方法
function init() {
  $.getJSON("../testdata/area/info-write/info-write.js", [], function (data, status) {
    console.log(status);

    if (status == "success") {
      $(".container").html(template("template", data));


      $(".add").click(function(){//添加按钮
         var amount=parseInt($(this).prev().html());
        $(this).prev().html(amount+1);
      });
      $(".minus").click(function(){//减按钮
        var amount=parseInt($(this).next().html());
        if(amount!=0){
          $(this).next().html(amount-1);
        }
      });
    }
  });
  $(".container").delegate(".commit","click",function(){
      /*点击确认按钮，提交信息*/
      var req = {};
       req.adult=$(".adult .amount").text();
       req.child=$(".child .amount").text();
       req.single=$(".single .amount").text();

    $.post("../testdata/area/info-write/ceshi.txt", req, function (data, status) {
      if (status=="success") {
        if("retCode"==-1){
          alert("成功");
        }
         else{
          alert("失败");
        }
        }
    });
  });
  $(".container").delegate(".tourist-opt li","click",function(){
     $(this).toggleClass("choose");
  })
}