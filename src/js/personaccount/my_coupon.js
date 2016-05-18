/**
 * Created by hyy on 2016/4/2 0002.
 */
function  init()
{
	FastClick.attach(document.body);
    loadData();   
}
var loadData = function() {
    var data = {
        OwnerId : 183,//mobile_var.userId,
        OwnerType:3
    };
    getMyCoupon(data, true, function (result) {
        $("#container").html(template("template", result));
    });
};