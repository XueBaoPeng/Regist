/**
 * Created by hyy on 2016/4/1 0001.
 */
$inp=$("#phone").val();
/*
* 点击X清空inpue的val
* */function colseClick() {
        document.getElementById("phone").value = "";
        $(".hide").css("display", "none");
}
/*
* 点击下一步时的验证
* */
function checkPhone(){
    var phone = document.getElementById('phone').value;
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
        $(".hide").css("display","inline-block");
        return false;
    }else{
        $(".hide").css("display","none")
    }
}
