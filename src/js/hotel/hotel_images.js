var myPullScroll = null;
var paging = new QueryWithOrder();
function init(){
    //计算滚动区高度
    $('#container').height($(window).height());
    listCommon();
}

function update(isRefresh) {
    var id = OperationURL.getQueryString("id");
    if (isRefresh){
        paging.refreshPage();
        var param = paging.getPaging();
        param.id = id;
        getHotelImages(param, false, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $pullDown.html("下拉刷新");
                $("#albumList").html(template("tmplAlbums",result));
                myPullScroll.refresh();
                 loadImg();
            } else {
                console.log(result.msg);
            }
        });
    }else{
        paging.addPage();
        var param = paging.getPaging();
        param.id = id;
        getHotelImages(param, false, function(result){
            if(result.code == 0){
                $pullUp.html("上拉加载更多");
                $("#albumList").append(template("tmplAlbums",result));
                myPullScroll.refresh();
                 loadImg();
            } else {
                console.log(result.msg);
            }
        });
    }
}
function loadImg(){
    $("#albumList").lightGallery({
        thumbnail:false,
        download:false
    });
};
