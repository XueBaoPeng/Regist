/**
 * Created by zeke on 2016/3/31.
 */
var myPullScroll = null;
var paging = new QueryWithOrder();
function init(){
    //计算滚动区高度
    $('#container').height($(window).height());
    listCommon();
}

function update(isRefresh) {
    var id = OperationURL.getQueryString("id");
    var param={
        id:id
    };
    if (isRefresh){
        paging.refreshPage();
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getSpotAlbum(param, false, function(result){
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
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getSpotAlbum(param, false, function(result){
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
var loadImg=function(){
    $("#albumList").lightGallery({
        thumbnail:false,
        download:false
    });
};

function showPic(obj){
    var imgsrc = $(obj).find("img").attr("src");
    var idx = $(obj).find("img").index();
    var html = $("#showFull").html();
    layer.open({
        content: '您好',
        time: 2 //2秒后自动关闭
    });
    //var pageii = layer.open({
    //    type: 1,
    //    content: html,
    //    style: 'position:fixed; left:0; top:0; width:100%; height:100%; border:none;'
    //});
}