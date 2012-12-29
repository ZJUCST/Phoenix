/**
 * Created with IntelliJ IDEA.
 * User: Lee
 * Date: 12-12-27
 * Time: 下午3:57
 * To change this template use File | Settings | File Templates.
 */
$(function(){$("#username").blur(function(){
    var lengthmin = 5;
    var lengthmax=12;
    if(this.value.length<lengthmin)$("#lengthmin").html("长度需大于5个字符");
    else if(this.value.length>lengthmax)$("#lengthmin").html("长度需小于12个字符");
    else $("#lengthmin").html("");

})
})

$(function(){$("#input2").blur(function(){
    if((this.value)!=$("#input1").val())$("#double").html("两次密码不相同");
    else $("#double").html("");

})
});

