(function ($) {
    var publicSettings,res;
    //是否为闰年
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
            startdate: null,    //开始日期
            enddate: null,  //结束日期
            weekend: null,  //定义周末，为空则没有
            mouthPage:4,    //定义显示月份数量
            datetdCellClick:null    //自定义日期点击事件，在样式变换后执行
        };
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
            for(var i=0;i<this.settings.mouthPage;i++){
                this.drawCalendar(this.tempMonth+i);
            }
            this.bindEvent(this.settings.datetdCellClick);
        },
        BindPrice: function () {

        },
        addMonth: function () {
            this.drawCalendar(++this.tempMonth);
            this.bindEvent(this.settings.datetdCellClick);
        },
        PrevMonth: function () {
            this.cmonth--;
            if (this.cmonth == 0) {
                this.cmonth = 12;
                this.cyear--;
            }
        },
        drawCalendar: function (m) {
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
            if (edate != null && new Date(y + "/" + (m + 1) + "/01") > edate)//如果下个月1日超过截止日期，则返回
                return;
            var dnow = this.ctoday.getDate(); //今日日期 
            var n1str = new Date(y, m, 1); //当月第一天Date资讯 

            var firstday = n1str.getDay(); //当月第一天星期几 
            var cMonthDays = this.daysNumPerMonth[m];
            var tr_str = Math.ceil((cMonthDays + firstday) / 7); //表格所需要行数 

            var strcontent = "";
            var idx;
            var date_str;

            for (var i = 0; i < tr_str; i++) { //表格的行
                strcontent += "<tr>";
                for (var k = 0; k < 7; k++) { //表格每行的单元格
                    idx = i * 7 + k; //单元格自然序列号 
                    date_str = idx - firstday + 1; //计算日期 
                    (date_str <= 0 || date_str > cMonthDays) ? date_str = "" : date_str = idx - firstday + 1; //过滤无效日期（小于等于零的、大于月总天数的） 
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
                    dtvalue = new Date(dtvalue.replace(/-/g, '/')).format("yyyy-MM-dd");
                    if ((date_str == dnow) && (m == this.cmonth) && (y == this.cyear))
                        strcontent += "<td align='center' data-value='" + dtvalue + "' class='ctoday " + dclass + "'><div>" + date_str + "</div></td>";
                    else {
                        strcontent += "<td align='center' data-value='" + dtvalue + "' class='" + dclass + "'><div>" + date_str + "</div></td>";
                    }
                }
                strcontent += "</tr>"; //表格的行结束 
            }

            strcontent += "</table>"; //表格结束 
            var monthTitle = "<div class='Time-Div'>" + y + "年" + (m + 1) + "月</div>"
            //document.getElementById('calendar').innerHTML=strcontent;
            $(this.settings.source).append(monthTitle + this.cheader + strcontent);
        },
        bindEvent: function (dateClickCallback) {
            $(this.settings.source).find("td").unbind("click").click(function () {
                var $this = $(this);
                var curclass = $this.attr('class');
                if (curclass.indexOf('theader') >= 0 || $this.attr("data-value") == "" || curclass.indexOf("disabledtd") >= 0)
                    return;
                $(".selected").removeClass("selected");
                $this.addClass("selected");
                if (dateClickCallback != null)
                    dateClickCallback();
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
