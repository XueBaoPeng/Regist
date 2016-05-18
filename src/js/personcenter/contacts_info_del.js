/**
 * Created by jjjj on 2016/2/23.
 */
function deletePassenger() {
//原生点击删除后调的函数
	$("#notice").show();
}
function init(){
	FastClick.attach(document.body);
 	loadData();
}

var loadData = function(){
	var data={
		id:mobile_var.userId
	};
 	getTopContacts(data,true,function(result){
    if(result.code==0){
      $("#container").html(template("template", result));      
    }
   });
}
function active(targer){
	$(targer).toggleClass("choose");
}

function del(){
	$(".passengerList li").each(function(){
       if($(this).find(".left").hasClass("choose")){
         $(this).hide();
       }
   })
	$("#notice").hide();
}
function cancel(){
	$("#notice").hide();
}

