/**
 * Created by wangshouyun on 2016/2/17.
 */


var left_scroll = null;
var right_scroll = null;
var left_key = null;

function init() {

    $(".condition_wrapper").height($(window).height() - $(".condition-opt-btn").outerHeight());

    left_scroll = new ZHJIscroll('div[class="wrapper condition-left"]');
    right_scroll = new ZHJIscroll('div[class="wrapper condition-right"]');

    $('div[class="wrapper condition-left"]').on("click", "li", function (e) {

        //页面效果切换
        $(this).addClass("condition-left-ul-li-active").siblings().removeClass("condition-left-ul-li-active");

        //判断是否已经创建过此KEY对应的ul,如果没有创建则创建，否则直接显示
        left_key = $(this).attr("data-key");
        $right_ul = $('div[class="wrapper condition-right"]').find('ul[data-key="' + left_key + '"]');
        $('div[class="wrapper condition-right"] ul').hide();
        console.log($right_ul.length);
        if ($right_ul.length == 1) {
            $right_ul.show();
            right_scroll.refresh();
        }
        else {
            getRightData();
        }
    });

    $('div[class="wrapper condition-right"]').on("click", "li", function (e) {
        if ($(this).hasClass("condition-right-ul-li-active")) {
            $(this).removeClass("condition-right-ul-li-active");
            $(this).trigger("itemSelect");
        } else {
            $(this).addClass("condition-right-ul-li-active");
            $(this).trigger("itemCancel");
        }
    });

    getLeftData();
}

function getLeftData() {
    $.getJSON("data/filter_search/left.js", function (data, state) {
        $('div[class="wrapper condition-left"] .scroller').html(template("condition-left-tmpl", data));
        left_scroll.refresh();
        $(".condition-left-ul-li").eq(0).trigger("click");
    });
}

function getRightData() {
    $.getJSON("data/filter_search/right.js", function (data, state) {
        $('div[class="wrapper condition-right"] .scroller').append(template("condition-right-tmpl", data));
        right_scroll.refresh();
    });
}

template.helper('setULKey', function () {
    return left_key;
});




/*
 function init(){

 $(".condition_wrapper").height($(window).height() - $(".condition-opt-btn").outerHeight());

 var search = new ConditionFilterSearch('div[class="wrapper condition-left"]','div[class="wrapper condition-right"]');
 search.setLeft("condition-left-ul-li-active");

 //加载数据
 search.getLeftData("data/filter_search/left.js",null,"left_li_template",".condition-left-ul");
 }

 (function (window, $, IScroll, template) {

 function ConditionFilterSearch(leftContainer, rightContainer) {
 this.leftContainer = leftContainer;
 this.rightContainer = rightContainer;
 this.left_scroll = new ZHJIscroll(leftContainer);
 this.right_scroll = new ZHJIscroll(rightContainer);
 this.left_key = null;
 }

 ConditionFilterSearch.prototype.setLeft = function (activeClass) {
 $(this.leftContainer).on("click", "li", function (e) {
 //页面效果切换
 $(this).addClass(activeClass).siblings().removeClass(activeClass);
 //判断是否已经创建过此KEY对应的ul,如果没有创建则创建，否则直接显示
 left_key = $(this).attr("data-key");
 });
 }

 ConditionFilterSearch.prototype.setRight = function (activeClass) {
 $(this.rightContainer).on("click", "li", function (e) {
 if ($(this).hasClass(activeClass)) {
 $(this).removeClass(activeClass);
 $(this).trigger(this.customEventType.selectCancelEvent);
 } else {
 $(this).addClass(activeClass);
 $(this).trigger(this.customEventType.selectEvent);
 }
 });
 }

 ConditionFilterSearch.prototype.getLeftData = function (url, param, templateName, leftUl) {

 var self = this;

 $.getJSON(url, param, function (data, state) {
 $(leftUl).html(template(templateName, data));
 self.left_scroll.refresh();
 $(leftUl).find("li").eq(0).trigger("click");
 });
 }

 ConditionFilterSearch.prototype.getRightData = function (url, param, templateName) {

 }

 ConditionFilterSearch.prototype.action = function (cancelBtn, sureBtn) {
 $(cancelBtn).click = function () {
 $(this).trigger(this.customEventType.cancelEvent);
 }
 $(sureBtn).click = function () {
 $(this).trigger(this.customEventType.sureEvent);
 }
 }

 ConditionFilterSearch.prototype.customEventType = {
 "selectEvent": "select",
 "selectCancelEvent": "cancelSelect",
 "sureEvent": "sure",
 "cancelEvent": "cancel"
 }

 window.ConditionFilterSearch = ConditionFilterSearch;

 })(window, jQuery, IScroll, template);

 */