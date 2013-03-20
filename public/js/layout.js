$(document).ready(function() {
    $(".various").fancybox({
        maxWidth	: 800,
        maxHeight	: 600,
        fitToView	: false,
        width		: '70%',
        height		: '70%',
        autoSize	: true,
        closeClick	: false,
        openEffect	: 'none',
        closeEffect	: 'none'
    });
    $("#logout").click(function(){
        $.ajax({
            url:"/logout",
            type:"POST"
        }).done(function( xhr, msg ) {
                location.href = "/";
            });
    })

});
