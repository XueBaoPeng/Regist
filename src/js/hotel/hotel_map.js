
$(function () {
//	获取当前屏幕的高度
	var  s = window.screen.height;  
    $("#allmap").height(s-64);   
    var jingdu= OperationURL.getQueryString("jingdu");
	var weidu= OperationURL.getQueryString("weidu");
//	var jingdu="113.54143";
//	var weidu="22.274386";
    //地图
    ShowMap(jingdu,weidu,"20")
})

function ShowMap(jingdu,weidu,zoom) {
	var jingdu;
	var weidu;
    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(jingdu, weidu), zoom);
    map.addControl(new BMap.NavigationControl());
    var marker = new BMap.Marker(new BMap.Point(jingdu, weidu));
    map.addOverlay(marker);
}