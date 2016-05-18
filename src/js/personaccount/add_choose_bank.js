/**
 * Created by hyy on 2016/4/2 0002.
 */
function  init()
{
    loadData();
    FastClick.attach(document.body);
}
var loadData = function() {
    var data = {
        "id":""
    };
    getAddBank (data, true, function (result) {
        $("#container").html(template("template", result));
    });
};