/**
 * Created by zeke on 2016/1/11.
 */

var myPullScroll = null;
function listCommon(){

    FastClick.attach(document.body);

    $pullDown = $(".pullDown");
    $pullUp = $(".pullUp");
    $scroller = $(".scroller");

    myPullScroll = new IscrollPull(".wrapper", $pullDown.height());
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullDown, pullDown);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullDownEnd, pullDownEnd);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullUp, pullUp);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullUpEnd, pullUpEnd);

    var tabObj = $('ul[class="nav-ul"] li');
    if(tabObj&&tabObj.length>0){
        $(tabObj).click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            //此处添加方法拉取数据
            $(myPullScroll).trigger(IscrollPull.scrollPullEvent.pullDownEnd);
        });
        //自动触发点击事件
        $(tabObj).eq(0).trigger("click");
    }else {
        $(myPullScroll).trigger(IscrollPull.scrollPullEvent.pullDownEnd);
    }
}


function pullDown(){
    $pullDown.html("松手刷新");
}
function pullDownEnd(){
    updateOrLoadData(true);
}
function pullUp(){
    $pullUp.html("松手加载");
}
function pullUpEnd(){
    updateOrLoadData(false);
}

function updateOrLoadData(isRefresh){

    if(isRefresh){
        $pullDown.html("正在刷新");
    } else {
        $pullUp.html("正在加载");
    }
    update(isRefresh);
}
function update(isRefresh){

}

//排序字段
(function(window, undefined){
    function OrderField(){

    }

    OrderField.fields = {
        "salesOrder" : "salesOrder",
        "priceOrder" : "priceOrder",
        "goodReputationOrder" : "goodReputationOrder"
    };

    window.OrderField = OrderField;

})(window, undefined);


//筛选排序类
(function(window, undefined){

    function QueryWithOrder(orderField){
        this.pageSize = 10;
        this.currentPage = 1;
        this.orderField = orderField;
        this.orderDesc = true;
        this.filterField = {};
    }

    //添加页
    QueryWithOrder.prototype.addPage = function(){
        this.currentPage += 1;
    }

    //刷新页面
    QueryWithOrder.prototype.refreshPage = function(){
        this.currentPage = 1;
    }

    //改变排序字段
    QueryWithOrder.prototype.changeOrderField = function(orderField){
        this.orderField = orderField;
    }
    //切换升序降序
    QueryWithOrder.prototype.changeOrderDesc = function(isDesc){
        this.orderDesc = isDesc;
    }

    //添加筛选字段
    QueryWithOrder.prototype.addFilterField = function(key, value){
        this.filterField[key] = value;
    }

    //移除筛选字段
    QueryWithOrder.prototype.removeFilterField = function(key){
        for(var _key in this.filterField){
            if(_key === key){
                delete this.filterField[_key];
            }
        }
    }

    //获取最终筛选参数对象
    QueryWithOrder.prototype.getQuerySting = function(){
        var obj = new Object();
        obj["pageSize"] = this.pageSize;
        obj["currentPage"] = this.currentPage;
        obj["orderField"] = this.orderField;
        obj["fieldDesc"] = this.orderDesc;
        obj["filterField"] = this.filterField;
        return obj;
    }

    window.QueryWithOrder = QueryWithOrder;

})(window, undefined);
