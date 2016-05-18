/**
 * Created by zeke on 2016/4/1.
 */
function init(){
    var id = OperationURL.getQueryString("id");
    var param ={
        id:id
    };
    getSpotNewsDetail(param,false,function(result){
        if(result.code==0){
            $("#container").html(template("tmplNewDetail",result));
        }
    });
}