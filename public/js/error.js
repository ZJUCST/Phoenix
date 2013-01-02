/**
 * Created with IntelliJ IDEA.
 * User: zhaoruihui
 * Date: 13-1-2
 * Time: 下午1:36
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    var redirectUrl=$("#redirectUrl").val();
    setTimeout(function(){if(redirectUrl!="undefined")window.location.href=redirectUrl;else window.location.href='/';}, 3000);
});
