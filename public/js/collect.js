/**
 * Created with IntelliJ IDEA.
 * User: zhaoruihui
 * Date: 12-12-29
 * Time: 下午12:31
 * To change this template use File | Settings | File Templates.
 */
$(function(){$("#submitBtn").click(function(){
    jQuery.post("/collect/image"
        ,{tags:$("#tags").val(),description:$("#description").val(),uri:$("#uri").val(),from:$("#from").val()}
        , function(data){$("#successBtn").show();setTimeout(function(){window.close();}, 3000);}
    );
});
});