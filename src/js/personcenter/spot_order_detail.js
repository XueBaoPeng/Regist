function init(){
    FastClick.attach(document.body);
    initSpotId();
    initSpotOrderDetail();
}

var initSpotId=function(){
    var domainName = OperationURL.getDomain();
    var param={
        domain:domainName,
        userId:0,
        userKey:""
    };
    getSpotId(param, false, function(result){
        if(result.code == 0){
            supplier.supplierId = result.data.id;
        }
    });
};

var initSpotOrderDetail=function(){
    var id = OperationURL.getQueryString("id");
    var param = {
        id : id
    };
    getSpotOrderDetail(param, true, function(result){
        if(result.code == 0){
            $("#container").html(template("template", result));
            $("#process .order-open-row:gt(0)").hide();
        }
    });
};

var showOpen=function(){
    $("#process .order-open-row:gt(0)").slideToggle("fast");
};

var refundClick = function(id){
    var orderId = OperationURL.getQueryString("id");
    var title = "申请退票";
    var new_url = OperationURL.getUrlOrigin()+"spot/order_refund.html?id="+id+"&orderId="+orderId;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

var ratedClick = function(proId){
    var title = "发表评价";
    var new_url = OperationURL.getUrlOrigin()+"spot/spot_publish.html?id="+supplier.supplierId+"&proId="+proId;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

var delClick = function(id){
    var param ={
        id:id
    };
    delSpotOrder(param,false,function(result){
       if(result.code==0){
           $.happytoAlert("删除成功");
       }else{
           $.happytoAlert(result.msg);
       }
    });
};

var buyClick = function(id){
    var title = "再次购买";
    var new_url = OperationURL.getUrlOrigin()+"spot/book_detail.html?id="+id;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

