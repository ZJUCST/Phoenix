/**
 * Created with IntelliJ IDEA.
 * User: Lee
 * Date: 12-12-29
 * Time: 下午6:19
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

$(document).ready(function(){
    $("#input2").blur(function(){
        if((this.value)!=$("#input1").val())$("#double").html("两次密码不相同");
        else $("#double").html("");
    })

    $("#loginsubmit").click(function(){
        $.ajax({
            url: "/login",
            type: "POST",
            data:{username:$("#ti_loginusername").val(),password:$("#ti_loginpassword").val()}

        }).done(function( xhr, msg ) {
                alert(xhr);
                alert( "Data Saved: " + msg );
            })
            .fail(function(xhr) {
               var message=JSON.parse(xhr.responseText).errorCode;
                if(message=="100003")      $("#usernamemessage").html("用户名不存在！");
                else if(message=="100004")           $("#passwordmessage").html("密码错误！");
                })
           });
    $("#create").click(function(){
        $.ajax({
            url: "/login",
            type: "POST",
            data:{username:$("#username").val(),email:$("#email").val()}
           } ) .done(function( xhr, msg ) {
                alert(xhr);
                alert( "Data Saved: " + msg );
            })
            .fail(function(xhr) {
                var message=JSON.parse(xhr.responseText).errorCode;
                if(message=="100006")      $("#lengthmin").html("用户名已存在！");
                else if(message=="100007")         $("#ti_email").html("邮箱已存在！");
            })
    })

});
