
var myPullScroll = null;
var paging = new QueryWithOrder();
var commType = 0;
var num;
function init(){
    //计算滚动区高度
    $('#container').height($(window).height()-$("#commentTop").height() );
    loadStatistics();
    listCommon();
    $("#commGrade").delegate("ul>li","click",function(i,ele){

    });
}

function searchClick(obj){
    $(obj).addClass("current").siblings().removeClass("current");
    commType = $(obj).attr("data-value");
    update(true);
}

function loadStatistics(){
    //TODO 评论统计
    var id = OperationURL.getQueryString("id");
    var param = {
        supplierId:id
    };
    getHotelComment(param, false, function(result){
        if(result.code == 0){
            $("#commentTop").html(template("template_top",result));
        } else {
            console.log(result.msg);
        }
    });
}

function update(isRefresh) {
    var id = OperationURL.getQueryString("id");
    var param ={
    	userId:mobile_var.userId,
        supplierId:id,
        type:commType
    };
    if (isRefresh){
        paging.refreshPage();
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getHotelCommentList(param, false, function(result){
            if(result.code == 0){
                myPullScroll.scrollToTop();
                $pullDown.html("下拉刷新");
                $("#commentList").html(template("template_list",result));
                myPullScroll.refresh();
                $("#pcicture-list").lightGallery({
			        thumbnail:false,
			        download:false
			    });
            } else {
                console.log(result.msg);
            }
        });
    }else{
        paging.addPage();
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.currentPage = page.currentPage;
        getHotelCommentList(param, false, function(result){
            if(result.code == 0){
                $pullUp.html("上拉加载更多");
                $("#commentList").html(template("template_list",result));
                myPullScroll.refresh();
                $("#pcicture-list").lightGallery({
			        thumbnail:false,
			        download:false
			    });
            } else {
                console.log(result.msg);
            }
        });
    }
}


//评论查看更多
function more(obj){
	if($(obj).prev().hasClass("less")){
		$(obj).prev().addClass("more").removeClass("less");		
	}else if($(obj).prev().hasClass("more")){
		$(obj).prev().addClass("less").removeClass("more");	
	}
}

//点击有用增加评分 并调用接口
function addScoreClick(flag,commentId){
	if(flag==false){		
		var param = {
	       	id:commentId,//评论编号
			userId: mobile_var.userId,//当前用户编号
			isAdd:true
	    };
	    saveCommonEvaluate(param, false, function(result){
	        if(result.code == 0){	    	        	
    		    update(true); 	      		
	        }
	    });
	}
}

