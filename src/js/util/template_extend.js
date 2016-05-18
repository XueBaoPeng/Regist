/**
 * Created by zeke on 2016/3/31.
 */
/**
 * 对日期进行格式化，
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 */
var dateFormat = function(date, format){
    date = new Date(date);
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };

    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
};

template.helper("formatDate", dateFormat);

template.helper('formatPrice', function(price, type) {
    if(price){
        var arrayPrice = price.toString().split(".");
        if(type == 'integer') {
            return arrayPrice[0]?arrayPrice[0]:"0";
        }else if (type =='decimal') {
            return arrayPrice[1]?arrayPrice[1].length == 1?"."+arrayPrice[1]+"0":"."+arrayPrice[1]:".00";
        }
    }else{
        if(type == 'integer') {
            return "0";
        }else if (type =='decimal') {
            return ".00";
        }
    }
});