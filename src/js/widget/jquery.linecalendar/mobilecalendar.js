(function ($) {
    var publicSettings,res;
    //TODO 是否为闰年
    var is_leap = function(year) {
        return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
    };
    Date.prototype.format = function(format){
        var o =
        {
            "M+" : this.getMonth() + 1, //month
            "d+" : this.getDate(),    //day
            "h+" : this.getHours(),   //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth() + 3) / 3),  //quarter
            "S" : this.getMilliseconds() //millisecond
        };
        if(/(y+)/.test(format))
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };
    var DailyPriceCalendar = function (options) {
        this.settings = {
            source: null,   //调用源
            startdate: null,//开始日期
            enddate: null,  //结束日期
            weekend: null,  //定义周末，为空则没有
            pageIndex:1,    //定义当前页
            pageSize:3,      //定义每页显示月份数量
            calPrices:null, //定义日历价格，格式：[calendar:'',price:'',stock:'',isTail:false]
            datetdCellClick:null    //自定义日期点击事件，在样式变换后执行
        }
        this.cheader = "<table class='pCalendar'><tr class='cheader'><td class='theader'>周日</td><td class='theader'>周一</td><td class='theader'>周二</td><td class='theader'>周三</td><td class='theader'>周四</td><td class='theader'>周五</td><td class='theader'>周六</td></tr>";

        this.settings = $.extend(this.settings, options);
        publicSettings = this.settings;
        this.Init();
    }
    DailyPriceCalendar.prototype = {
        Init: function () {
            this.ctoday = new Date(); //当天
            this.cyear = this.ctoday.getFullYear(); //年份 
            this.daysNumPerMonth = new Array(31, 28 + is_leap(this.cyear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //各月份的总天数
            this.cmonth = this.ctoday.getMonth(); //月份 
            this.tempMonth = this.cmonth;

            $(this.settings.source).html("");
            for(var i=(this.settings.pageIndex-1);i<this.settings.pageSize;i++){
                this.drawCalendar(this.tempMonth++);
            }
            this.bindEvent();
        },
        BindPrice: function () {

        },
        addMonth: function () {
            //TODO 增加一个月
            this.drawCalendar(this.tempMonth++);
            this.bindEvent();
        },
        PrevMonth: function () {
            //TODO 前一个月
            this.cmonth--;
            if (this.cmonth == 0) {
                this.cmonth = 12;
                this.cyear--;
            }
        },
        nextPage:function(arr,pageIndex,pageSize){
            this.settings.calPrices = arr;
            for(var i=(pageIndex-1)*pageSize;i< pageIndex*pageSize;i++){
                this.drawCalendar(this.tempMonth++);
            }
            this.bindEvent();
        },
        setPrice:function(arr){
            //TODO 设置日历价格
            this.settings.calPrices = arr;
            this.Init();
        },
        getPrice : function(currDate,arr){
            //TODO 获取价格
            var price="";
            if(currDate=="") return price;
            $.each(arr,function(i,item){
                if(item.calendar==currDate){
                    price = item.price;
                    return false;
                }
            });
            return price;
        },
        drawCalendar: function (m) {
            //绘制日历
            var y = this.cyear;
            if (m > 11) {
                y += Math.floor(m / 12);
                m = m % 12;
            }
            var sdate = null;
            var edate = null;
            if (this.settings.startdate != null)
                sdate = new Date(this.settings.startdate.replace(/-/g, '/'));
            if (this.settings.enddate != null)
                edate = new Date(this.settings.enddate.replace(/-/g, '/'));
            //如果下个月1日超过截止日期，则返回
            if (edate != null && new Date(y + "/" + (m + 1) + "/01") > edate)
                return;
            //今日日期
            var dnow = this.ctoday.getDate();
            //当月第一天Date资讯
            var n1str = new Date(y, m, 1);
            //当月第一天星期几
            var firstday = n1str.getDay();
            var cMonthDays = this.daysNumPerMonth[m];
            //表格所需要行数
            var tr_str = Math.ceil((cMonthDays + firstday) / 7);

            var strcontent = "";
            var idx,date_str,currPrice="";
            //表格的行
            for (var i = 0; i < tr_str; i++) {
                strcontent += "<tr>";
                //表格每行的单元格
                for (var k = 0; k < 7; k++) {
                    idx = i * 7 + k; //单元格自然序列号 
                    date_str = idx - firstday + 1; //计算日期
                    //过滤无效日期（小于等于零的、大于月总天数的）
                    (date_str <= 0 || date_str > cMonthDays) ? date_str = "" : date_str = idx - firstday + 1;
                    var dtvalue = "";
                    var dclass = "";
                    if (date_str != "") {
                        dtvalue = y + "-" + (m + 1) + "-" + date_str;
                        dclass = "datetdCell ";
                        var tempdate = new Date(dtvalue.replace(/-/g, '/'));
                        if ((sdate != null && tempdate < sdate) || (edate != null && tempdate > edate) || (this.settings.weekend != null && this.settings.weekend.indexOf(k) >= 0))
                            dclass += "disabledtd ";
                    }
                    else {
                        dclass = "emptyCell ";
                    }
                    //打印日期：判断是否为当天
                    dtvalue = dtvalue==""?"":new Date(dtvalue.replace(/-/g, '/')).format("yyyy-MM-dd");
                    if(this.settings.calPrices!=null&&this.settings.calPrices.length>0){
                        var price = this.getPrice(dtvalue, this.settings.calPrices);
                        currPrice = price==""?"":"&yen;"+price;
                        if(price=="") dclass = "disabledtd";
                    }
                    if ((date_str == dnow) && (m == this.cmonth) && (y == this.cyear))
                        strcontent += "<td align='center' data-value='" + dtvalue + "' class='ctoday " + dclass + "'><div class='days'>" + date_str + "</div><div class='price'>"+currPrice+"</div></td>";
                    else {
                        strcontent += "<td align='center' data-value='" + dtvalue + "' class='" + dclass + "'><div class='days'>" + date_str + "</div><div class='price'>"+currPrice+"</div></td>";
                    }
                }
                //表格的行结束
                strcontent += "</tr>";
            }
            //表格结束
            strcontent += "</table>";
            var monthTitle = "<div class='Time-Div'>" + y + "年" + (m + 1) + "月</div>"
            //document.getElementById('calendar').innerHTML=strcontent;
            $(this.settings.source).append(monthTitle + this.cheader + strcontent);
        },
        bindEvent: function () {
            $(this.settings.source).find("td").unbind("click").click(function () {
                var $this = $(this);
                var curclass = $this.attr('class');
                if (curclass.indexOf('theader') >= 0 || $this.attr("data-value") == "" || curclass.indexOf("disabledtd") >= 0)
                    return;
                $(".selected").removeClass("selected");
                $this.addClass("selected");
                if (publicSettings.datetdCellClick != null)
                    publicSettings.datetdCellClick();
            });
            $("#pmonth").click(function () {
                this.PrevMonth();
            });
            $("#nmonth").click(function () {
                this.NextMonth();
            });
        },
        getSelectValue: function () {
            return $(this.settings.source).find(".selected").attr("data-value");
        },
        setStartDate: function (sdate) {
            this.settings.startdate = sdate;
            this.Init();
        },
        setEndDate: function (edate) {
            this.settings.enddate = edate;
            this.Init();
        },
        setDaysOfWeekDisabled: function (weekend) {
            this.settings.weekend = weekend;
            this.Init();
        }
    }
    $.fn.extend({
        InitDailyPriceCalendar: function (options) {
            if (!options)
                options = {};
            options.source = $(this);
            var dpc = new DailyPriceCalendar(options);

            return dpc;
        }
    });

})(jQuery);
