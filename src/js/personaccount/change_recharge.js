/**
 * Created by hyy on 2016/4/2 0002.
 */
function  init()
{
    loadData();
    FastClick.attach(document.body);
}
var loadData = function() {
    var data = {
        "id":""
    };
    getChangeRecharge (data, true, function (result) {
        $("#container").html(template("template", result));
    });
};
function change(obj){
    if($(obj).children(".li-right").css("display","none")){
        $(obj).children(".li-right").css("display","inline-block").parent().siblings().children(".li-right").css("display","none")
    }
}
function checkPhone(){
    var money = document.getElementById('money-input').value;
    if(!(/^[1-9]\d*$/.test(money))){
        $(".hide").css("display","inline-block");
        return false;
    }else{
        $(".hide").css("display","none")
    }
}