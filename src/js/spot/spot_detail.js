/**
 * Created by zeke on 2016/4/1.
 */
function init(){
    var id = OperationURL.getQueryString("id");
    var param ={
        id:id
    };
    getSpotSitesDetail(param,false,function(result){
        if(result.code==0){
            $("#content").html(template("tmplDetail",result));
        }
    });
}