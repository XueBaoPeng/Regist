/**
 * Created by zeke on 2016/4/14.
 */
function init(){
    var id = OperationURL.getQueryString("id");
    var param={
        id:id
    };
    getBanksList(param,false, function(result){
        if(result.code==0){
            $("#myBank").html(template("tmplBank", result));
        }
    });
}