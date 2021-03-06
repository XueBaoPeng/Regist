/**
 * 区域接口方法
 * Created by zeke on 2016/3/16.
 */

/*
 * 全局变量
 * */
var supplier = {
    supplierId : ""
};
var travel ={
    travelId:""
};
var hotel = {
    hotelId : ""
};
/*===================区域======================*/
/*
 * 获取首页推荐
 * index.html
 * */
var getAreaRecommend = function(param,async,succfun){
    var url=config.getUrl() + "testdata/area/index/index-data.js";
    var useurl="";
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 热门搜索
 * hot_search.html
 * */
var getHotList = function(param,async,succfun){
    var url=config.getUrl() + "testdata/area/hot_search/hot_search.json";
    var useurl="";
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区列表
 * spot_search.html
 * */
var getSpotList = function(param,async,succfun){
    var url=config.getUrl() + "testdata/area/spot_search/spot_search.js";
    var useurl="";
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*===================景区======================*/
/*
 * 景区编号
 *
 * */
var getSpotId = function(param,async,succfun){
    var testurl = "testdata/spot/index/index.json";
    var useurl = "Supplier/GetScenicId";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};


/*
 * 景区信息
 * spot/index.html
 * */
var getSpotInfo = function(param,async,succfun){
    var testurl = "testdata/spot/index/index.json";
    var useurl="Supplier/GetScenicInfo";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区促销门票或活动
 * spot/index.html
 * */
var getSpotPromotion = function(param,async,succfun){
    var testurl = "testdata/spot/index/index_promation.json";
    var useurl="Product/GetSenceDiscountProd";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区相关线路、周边景区和周边酒店
 * spot/index.html
 * */
var getSpotAround = function(param,async,succfun){
    var testurl = "testdata/spot/index/index_around.json";
    var useurl="Supplier/GetScenicAround";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 产品-门票列表信息
 * spot/ticket_book.html
 * */
var getSpotProduct = function(param,async,succfun){
    var testurl = "testdata/spot/ticket_book/ticket_book.json";
    var useurl="Product/GetSaleTicketList";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 产品-门票详情信息
 * spot/book_detail.html
 * */
var getSpotProductDetail = function(param,async,succfun){
    var testurl = "testdata/spot/book_detail/book_detail.json";
    var useurl = "Product/GetSaleTicketInfo";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 产品-购买下单
 * spot/order_place.html
 * */
var saveSpotOrder = function(param,async,succfun){
    var testurl = "testdata/spot/order_place/order_place.json";
    var useurl = "Order/CreateScenicOrder";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 产品-确认支付
 * spot/pay_info.html
 * */
var saveSpotOrderPay = function(param,async,succfun){
    var testurl = "testdata/spot/pay_info/pay_info.json";
    var useurl = "Order/ScenicOrderPay";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 根据订单编号，查询产品和订单信息
 * spot/pay_info.html
 * */
var getSpotProductAndOrder = function(param,async,succfun){
    var testurl = "testdata/spot/pay_info/pay_info.json";
    var useurl = "Order/FindScenicOrderAndProductByOrderId";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 查询景区景点信息
 * spot/spot_info.html
 * */
var getSpotSites = function(param,async,succfun){
    var testurl = "testdata/spot/spot_info/spot_info.json";
    var useurl="Supplier/GetScenicSpots";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};


/*
 * 查询景点详情
 * spot/spot_detail.html
 * */
var getSpotSitesDetail = function(param,async,succfun){
    var testurl = "testdata/spot/spot_detail/spot_detail.json";
    var useurl="Supplier/GetScenicSpotsDetail";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-查询交通信息
 * spot/spot_traffic.html
 * */
var getSpotTraffic = function(param,async,succfun){
    var testurl = "testdata/spot/spot_traffic/spot_traffic.json";
    var useurl="Supplier/GetScenicTraffic";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-相册信息
 * spot/spot_pic.html
 * */
var getSpotAlbum = function(param,async,succfun){
    var testurl = "testdata/spot/spot_pic/spot_pic.json";
    var useurl="Supplier/GetScenicPhoto";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-查询常见问题
 * spot/spot_problems.html
 * */
var getSpotProblems = function(param,async,succfun){
    var testurl = "testdata/spot/spot_problems/spot_problems.json";
    var useurl="";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-查询用户点评统计
 * spot/spot_comments.html
 * */
var getSpotCommentStat = function(param,async,succfun){
    var testurl = "testdata/spot/spot_comments/spot_comments.json";
    var useurl="Supplier/GetScenicEvaluate";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-查询用户点评
 * spot/spot_comments.html
 * */
var getSpotComments = function(param,async,succfun){
    var testurl = "testdata/spot/spot_comments/spot_comments.json";
    var useurl="Supplier/GetScenicEvaluatePaged";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-发表用户评价
 * spot/spot_publish.html
 * */
var saveSpotPublish = function(param,async,succfun){
    var testurl = "testdata/spot/spot_publish/spot_publish.json";
    var useurl = "Supplier/ScenicEvaluate";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-查询新闻公告
 * spot/news.html
 * */
var getSpotNews = function(param,async,succfun){
    var testurl = "testdata/spot/news/news.json";
    var useurl="";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-查询新闻公告详情
 * spot/news_detail.html
 * */
var getSpotNewsDetail = function(param,async,succfun){
    var testurl = "testdata/spot/news_detail/news_detail.json";
    var useurl="";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*=================酒店===============================*/
/*
 * 酒店编号
 *
 * */
var getHotelId = function(param,async,succfun){
    var testurl = "testdata/hotel/index/index.json";
    var useurl = "Supplier/GetHotalId";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店-查询酒店信息
 * hotel/index.html
 * */
var getHotelInfo = function(param,async,succfun){
    var testurl = "testdata/hotel/index/index.json";
    var useurl = "Supplier/GetHotalInfo";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店-查询热门线路
 * hotel/index.html
 * */
var getHotelHotLine = function(param,async,succfun){
    var testurl = "testdata/hotel/index/hot_line.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店-查询酒店图片
 * hotel/hotel_images.html
 * */
var getHotelImages = function(param,async,succfun){
    var testurl = "testdata/hotel/hotel_images/hotel_images.json";
    var useurl = "Supplier/GetHotalImages";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店-查询酒店设施
 * hotel/hotel_detail.html
 * */
var getHotelDetail = function(param,async,succfun){
    var testurl = "testdata/hotel/hotel_detail/hotel_detail.json";
    var useurl = "Supplier/GetHotalFacility";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店-查询房型列表
 * hotel/roomlist.html
 * */
var getHotelRoomList = function(param,async,succfun){
    var testurl = "testdata/hotel/roomlist/roomlist.json";
    var useurl = "Product/GetSaleRoomList";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店-查询客房详情
 * hotel/room_detail.html
 * */
var getHotelRoomDetail = function(param,async,succfun){
    var testurl = "testdata/hotel/room_detail/room_detail.json";
    var useurl = "Product/GetRoomInfo";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店-选择客房下单
 * hotel/room_booking.html
 * */
var saveHotelOrder = function(param,async,succfun){
    var testurl = "testdata/hotel/room_booking/room_booking.json";
    var url=config.getUrl() + testurl;
    console.log(url);
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店-根据订单编号，查询客房和订单信息
 * hotel/pay_info.html
 * */
var saveHotelOrder1 = function(param,async,succfun){
    var testurl = "testdata/hotel/pay_info/pay_info.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店-查询酒店点评信息
 * hotel/hotel_comment.html
 * */
var getHotelComment = function(param,async,succfun){
    var testurl = "testdata/hotel/hotel_comment/hotel_comment.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
//-------------酒店特色服务模块----------------
/*
 * 酒店前台
 *hotel_reception.html
 * */
var hotelReception = function(param,async,succfun){
    var testurl = "testdata/hotel/special_service/hotel_reception.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店餐饮
 *hotel_catering.html
 * */
var hotelCatering = function(param,async,succfun){
    var testurl = "testdata/hotel/special_service/hotel_catering.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 酒店礼宾
 * hotel_protocol.html
 * */
var hotelProtocol = function(param,async,succfun){
    var testurl = "testdata/hotel/special_service/hotel_protocol.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店客房服务
 * hotel_room.html
 * */
var hotelRoom = function(param,async,succfun){
    var testurl = "testdata/hotel/special_service/hotel_room.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店场地租赁
 * hotel_sitelease.html
 * */
var hotelSitelease = function(param,async,succfun){
    var testurl = "testdata/hotel/special_service/hotel_sitelease.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店商务中心
 * hotel_business.html
 * */
var hotelBusiness = function(param,async,succfun){
    var testurl = "testdata/hotel/special_service/hotel_business.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店-发表评价
 * hotel/hotel_discuss.html
 * */
var saveHotelDiscuss = function(param,async,succfun){
    var testurl = "testdata/hotel/hotel_discuss/hotel_discuss.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};



/*=================旅行社（线路）===============================*/
/*
 * 旅行社编号
 *
 * */
var getTravelId = function(param,async,succfun){
    var testurl = "testdata/line/index/travel_id.json";
    var useurl = "Supplier/GetTravelId";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};


/*
 * 旅行社-获取旅行社信息
 * line/index.html
 * */
var getTravelInfo = function(param,async,succfun){
    var testurl = "testdata/line/index/index.json";
    var useurl = "Supplier/GetTravelInfo";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 旅行社-获取热销路线信息
 * line/index.html
 * */
var getTravelHotLine = function(param,async,succfun){
    var testurl = "testdata/line/index/hot_line.json";
    var useurl="Product/GetRouteRecommend";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 旅行社-获取线路分类
 * line/travel_classify.html
 * */
var getTravelClassify = function(param,async,succfun){
    var testurl = "testdata/line/travel_classify/travel_classify.json";
    var useurl = "Product/GetRouteCategory";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 旅行社搜索
 * line/search.html
 * */
var getSearch = function(param,async,succfun){
    var tesurl="testdata/line/search/search.json";
    var useurl="Product/GetSupplerRouteList";
    var url= config.getUrl() +tesurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 旅行社-获取线路列表
 * line/travel_line.html
 * */
var getTravelLineList = function(param,async,succfun){
    var testurl = "testdata/line/travel_line/travel_line.json";
    var useurl = "Product/GetSupplerRouteList";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 旅行社-获取线路列表
 * line/travel_line.html 筛选的接口
 * */
var getTravelLine = function(param,async,succfun){
    var testurl = "testdata/line/travel_line/travel_screen.json";
    var useurl = "Product/GetSupplerRouteList";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 旅行社-评论
 * line/travel_comments.html
 * */
var getTravelDiscuss = function(param,async,succfun){
    var testurl = "testdata/line/travel_discuss/travel_discuss.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 旅行社-获取线路详情
 * line/line_detail.html
 * */
var getTravelLineDetail = function(param,async,succfun){
    var testurl = "testdata/line/line_detail/line_detail.json";
    var useurl = "Product/GetRouteInfo";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 旅行社-获取线路套餐
 * line/line_book.html
 * */
var getTravelLinePkg = function(param,async,succfun){
    var testurl = "testdata/line/line_book/line_book_pkg.json";
    var useurl = "Product/GetRouteMealInfo";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 旅行社-线路下单
 * line/line_book.html
 * */
var saveTravelLineOrder = function(param,async,succfun){
    var testurl = "testdata/line/line_book/save_line_book.json";
    var useurl = "Order/CreateTravelOrder";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 旅行社-确认支付
 * line/pay_info.html
 * */
var saveTravelLinePay = function(param,async,succfun){
    var testurl = "testdata/line/pay_info/pay_info.json";
    var useurl = "Order/TravelOrderPay";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 旅行社-根据订单编号，查询订单信息
 * line/pay_info.html
 * */
var getTravelLinePay = function(param,async,succfun){
    var testurl = "testdata/line/pay_info/pay_info.json";
    var useurl = "Order/FindTravelOrderAndProductByOrderId";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};


/*
 * 旅行社-查询线路城市
 *
 * */
var getTravelLineCity = function(param,async,succfun){
    var testurl = "testdata/line/line_city/lin_city.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 旅行社-搜索城市
 *lin-choose_city.html
 * */
var getTravelCooseCity = function(param,async,succfun){
    var testurl = "testdata/line/choose_city/choose_city.json";
    var useurl="Product/GetRouteCityList"
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 旅行社-查询线路主题
 *
 * */
var getTravelLineTheme = function(param,async,succfun){
    var testurl = "testdata/line/line_city/line_theme.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};





/*=================导游===============================*/










/*=================个人中心===============================*/

/*
 *新增常用联系人
 *  personcenter/add_contacts.html
 */
var addContacts = function(param,async,succfun){
    var testurl = "testdata/personcenter/add_contacts/add_contacts.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 获取个人信息
 * personcenter/personal_msg.html
 * */
var getPersonInfo = function(param,async,succfun){
    var testurl = "testdata/personcenter/personal_msg/personal_msg.json";
    var useurl = "";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/* *
 * 常用旅客信息(删除)
 * personcenter/contacts_info_del.html
 * */
var contactsInfoDel = function(param,async,succfun){
    var testurl = "testdata/personcenter/contacts_info_del/contacts_info_del.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 推荐码(二维码)
 * personcenter/recommond.html
 * */
var recommond = function(param,async,succfun){
    var testurl = "testdata/personcenter/recommond/recommond.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 我的订单
 * personcenter/area_order.html
 *
 * */
var myOrder = function(param,async,succfun){
    var testurl = "testdata/personcenter/my_order/my_order.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 联系人详情
 * personcenter/contacts_detail.html
 * */
var contactsDetail = function(param,async,succfun){
    var testurl = "testdata/personcenter/contacts_detail/contacts_detail.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};



/*
 * 我的兔友
 * personcenter/friend_list.html
 * */
var friendList = function(param,async,succfun){
    var testurl = "testdata/personcenter/friend_list/friend_list.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 我的兔友
 * personcenter/my_friends.html
 * */
var myFriends = function(param,async,succfun){
    var testurl = "testdata/personcenter/my_friends/my_friends.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * set_remark.html
 * 设置备注名
 *
 * */
var setRemark = function(param,async,succfun){
    var testurl = "testdata/personcenter/set_remark/set_remark.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 周边热门景点
 * personcenter/hotel_order_detail.html
 * */
var aroundHotSpot = function(param,async,succfun){
    var testurl = "testdata/personcenter/around-hot-spot/around-hot-spot.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-查询订单列表
 * personcenter/spot_order.html
 * */
var getSpotOrder = function(param,async,succfun){
    var testurl = "testdata/personcenter/spot_order/spot_order.json";
    var useurl = "Order/FindScenicOrderList";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-查询订单详情
 * personcenter/spot_order_detail.html
 * */
var getSpotOrderDetail = function(param,async,succfun){
    var testurl = "testdata/personcenter/spot_order_detail/spot_order_detail.json";
    var useurl = "Order/FindScenicOrder";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-删除订单
 * personcenter/spot_order_detail.html
 * */
var delSpotOrder = function(param,async,succfun){
    var testurl = "testdata/personcenter/spot_order_detail/spot_order_detail.json";
    var useurl = "Order/CancelOrder";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-订单-产品退票信息
 * spot/order_refund.html
 * */
var getSpotProductRefund = function(param,async,succfun){
    var testurl = "testdata/personcenter/spot_order_detail/spot_order_detail.json";
    var useurl = "Order/FindOrderWithDraw";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-订单-产品退票原因
 * spot/order_refund.html
 * */
var getSpotRefundReason = function(param,async,succfun){
    var testurl = "testdata/personcenter/spot_order_detail/spot_order_detail.json";
    var useurl = "Order/FindTravelWithDrawReason";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 景区-订单-提交申请退票
 * spot/order_refund.html
 * */
var saveSpotOrderRefund = function(param,async,succfun){
    var testurl = "testdata/personcenter/spot_order_detail/spot_order_detail.json";
    var useurl = "Order/ScenicOrderWithDrawApply";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店订单列表
 * personcenter/hotel_order.html
 * */
var getHotelOrder = function(param,async,succfun){
    var testurl = "testdata/personcenter/hotel_order_list/hotel_order_list.json";
    var useurl = "Order/FindHotelOrderList";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 酒店订单详情
 * personcenter/hotel_order_detail.html
 * */
var getHotelOrderDetail = function(param,async,succfun){
    var testurl = "testdata/personcenter/hotel_order_detail/hotel_order_detail.json";
    var useurl = "Order/FindHotelOrder";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 线路订单
 * line_order.html
 * */
var getLineOrder = function(param,async,succfun){
    var testurl = "testdata/personcenter/line_order_list/line_order_list.json";
    var useurl = "Order/FindTravelOrderList";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 线路-订单-产品退票信息
 * line/order_refund.html
 * */
var getLineProductRefund = function(param,async,succfun){
    var testurl = "testdata/personcenter/spot_order_detail/spot_order_detail.json";
    var useurl = "Order/FindTravelOrderWithDraw";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 线路-订单-产品退票原因
 * line/order_refund.html
 * */
var getLineRefundReason = function(param,async,succfun){
    var testurl = "testdata/personcenter/spot_order_detail/spot_order_detail.json";
    var useurl = "Order/FindTravelWithDrawReason";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * line-订单-提交申请退票
 * line/order_refund.html
 * */
var saveLineOrderRefund = function(param,async,succfun){
    var testurl = "testdata/personcenter/spot_order_detail/spot_order_detail.json";
    var useurl = "Order/OrderWithDrawApply";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 线路订单详情
 * line_order_detail.html
 * */
var getLineOrderDetail = function(param,async,succfun){
    var testurl = "testdata/personcenter/line_order_detail/line_order_detail.json";
    var useurl = "Order/FindTravelOrder";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};


/*
 * 个人中心-查询常用联系人
 * spot/order_place.html
 * */
var getTopContacts = function(param,async,succfun){
    var testurl = "testdata/personcenter/top_contacts/top_contacts.json";
    var useurl = "Member/GetFavoriteContact";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};


/*=================个人账户===============================*/
/*
 * 账户-查询个人账户
 * spot/pay_info.html
 * */
var getAccount = function(param,async,succfun){
    var testurl = "testdata/personaccount/account/account.json";
    var useurl="Account/GetAccount";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*
 * 账户-查询个人绑定银行
 * spot/pay_info.html
 * */
var getBanksList = function(param,async,succfun){
    var testurl = "testdata/personaccount/bankinfo/bank_info.json";
    var useurl = "Account/FindPayAccountList";
    var url=config.getUrl() + useurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};

/*=================app html5 个人账户中心===============================*/
/*
 * 个人账户-承兑通交易记录
 * personaccount/transaction_record.html
 * */
var getTrade = function(param,async,succfun){
    var testurl = "testdata/personaccount/transaction_record/transaction_record.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 个人账户-承兑通交易记录
 * personaccount/recharge_record.html
 * */
var getRecharge = function(param,async,succfun){
    var testurl = "testdata/personaccount/recharge_record/recharge_record.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 个人账户-承兑通充值成功
 * personaccount/recharge_success.html
 * */
var getSuccess = function(param,async,succfun){
    var testurl = "testdata/personaccount/recharge_success/recharge_success.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 个人账户-承兑通充值失败
 * personaccount/recharge_fail.html
 * */
var getFail = function(param,async,succfun){
    var testurl = "testdata/personaccount/recharge_fail/recharge_fail.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 个人账户-承兑通提现成功
 * personaccount/cash_success.html
 * */
var getCashSuccess = function(param,async,succfun){
    var testurl = "testdata/personaccount/cash_success/cash_success.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 个人账户-承兑通提现记录
 * personaccount/cash_record.html
 * */
var getCashRecord = function(param,async,succfun){
    var testurl = "testdata/personaccount/cash_record/cash_record.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 个人账户-诚兑通转账-成功
 * personaccount/success.html
 * */
var getSuccessca = function(param,async,succfun){
    var testurl = "testdata/personaccount/success/success.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 个人账户-兔贝交易记录
 * personaccount/tubei.html
 * */
var getTubeiRecord = function(param,async,succfun){
    var testurl = "testdata/personaccount/tubei_record/tubei_record.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 个人账户-购买兔贝成功
 * personaccount/buy_fail.html
 * */
var getBuySuccess = function(param,async,succfun){
    var testurl = "testdata/personaccount/buy_success/buy_success.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 个人账户-改充值
 * personaccount/change_recharge.html
 * */
var getChangeRecharge = function(param,async,succfun){
    var testurl = "testdata/personaccount/change_recharge/change_recharge.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 个人账户-我的优惠券
 * personaccount/my_coupon.html
 * */
var getMyCoupon = function(param,async,succfun){
    var testurl = "testdata/personaccount/my_coupon/my_coupon.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 个人账户-选择银行
 * personaccount/add_choose_bank.html
 * */
var getAddBank = function(param,async,succfun){
    var testurl = "testdata/personaccount/add_choose_bank/add_choose_bank.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
/*
 * 日历
 * line/line_caledar.html
 * */
var getCaledar = function(param,async,succfun){
    var testurl = "testdata/personaccount/add_choose_bank/add_choose_bank.json";
    var url=config.getUrl() + testurl;
    $.ajax({
        type:config.getType(),
        url:url,
        dataType:config.getDataType(),
        data:param,
        async:async,
        success:function(data, status){
            succfun(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Error "+ textStatus);
        }
    });
};
