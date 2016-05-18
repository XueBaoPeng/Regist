/**
 * Created by zeke on 2016/4/28.
 */
function init(){

    $("#btnClear").bind({
        click : function(){
            $("#txtLoginName").val("");
        }
    });

    $("#btnEye").click(function(){
        if($("#txtPwd").attr("type")=="text"){
            $("#txtPwd").attr("type", "password");
            $(this).removeClass("close-eye");
        }else{
            $("#txtPwd").attr("type", "text");
            $(this).addClass("close-eye");
        }
    });

    $("#txtPwd").bind("keyup",function(){
        var name=$("#txtLoginName").val();
        var pwd = $("#txtPwd").val();
        if(name!=""&&pwd!=""){
            $("#btnLogin").addClass("active");
            $("#btnLogin").attr("disabled",false);
        }else{
            $("#btnLogin").removeClass("active");
            $("#btnLogin").attr("disabled",true);
        }
    });

    $("#btnLogin").click(function(){
        loginClick();
    });
}

var loginClick = function(){
    //TODO 登录

    var param={
        phone:"",
        password:""
    };
    getLogin(param,false,function(result){
        if(result.code==0){

        }
    });
};