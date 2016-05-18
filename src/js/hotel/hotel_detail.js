function init(){
  //TODO 初始化   
   var id = OperationURL.getQueryString("id");
   var param={
      id:id
    };   
  getHotelDetail(param,false, function(result){
    if(result.code==0){
      $("#container").html(template("template", result));
      $("#call-tel").html(template("template2", result));
      $('#spotStar').raty({
	        path:"../src/js/widget/jquery.raty/img",
	        score: function() {
	            return $(this).attr('data-number');
	        }
	    });
    }
  });
};

//酒店详情查看更多
function more(obj){
	$(obj).parent("li").find(".content").addClass("hotel-content").removeClass("content")
}
//点击电话弹出拨打电话
function showTel(tel){
	if(tel==""){
		 $("#call-tel").hide();
	}else{
		$("#call-tel").show();
	}  
}
//拨打电话时调用
function callTel(obj){
	
}
//拨打电话取消
function cancel(obj){
	$(obj).parent().css("display","none")
}