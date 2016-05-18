/**
 * Created by jjjj on 2016/1/15.
 */
//覆盖initialize.js中的init方法
function init() {
  $.getJSON("../testdata/line/info_write/info_write.js", [], function (data, status) {
    //console.log(status);

    if (status == "success") {
      $(".container").html(template("template", data));


      $(".add").click(function(){//添加按钮
         var amount=parseInt($(this).prev().html());
        $(this).prev().html(amount+1);
          countPrice();
          minusActive();
      });
      $(".minus").click(function(){//减按钮
        var amount=parseInt($(this).next().html());
        if(amount!=0){
          $(this).next().html(amount-1);
            countPrice();
            minusActive();
        }
      });
        function countPrice() {
            var total = 0;
            $(".option li").each(function () {
                var amount = parseFloat($(this).find(".amount").text());

                var price = parseFloat($(this).find(".num ").text());

                total += amount * price;

            });
            $("#total").text(total);


        };
        function minusActive(){
            $(".amount").each(function(){
                if($(this).text()==0){
                    $(this).prev().addClass("hyy");
                }
                if($(this).text()>0){
                    $(this).prev().removeClass("hyy");
                }
            })
        }
    }
  });
  $(".container").delegate(".commit","click",function(){/*点击确认按钮，提交信息*/
      var req = {};
       req.adult=$(".adult .amount").text();
       req.child=$(".child .amount").text();
       req.single=$(".single .amount").text();

    $.post("data/info-write/price.txt", req, function (data, status) {
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
/*
 * 点击下一步时的验证
 * */
function checkPhone(){
    var phone = document.getElementById('phone').value;
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
        $(".hide").css("display","inline-block");
        return false;
    }else{
        $(".hide").css("display","none")
    }
}
function name(){
    var name = document.getElementById('name').value;
    if(!(/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/.test(name))){
        $(".hide").css("display","inline-block");
        return false;
    }else{
        $(".hide").css("display","none")
    }

}