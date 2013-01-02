   function ajaxFileUpload()
    {
        $("#loading")
            .ajaxStart(function(){
                $(this).show();
            })
            .ajaxComplete(function(){
                $(this).hide();
            });

        $.ajaxFileUpload
        (
            {
                url:'/post/image',
                secureuri:false,
                fileElementId:'image_upload',
                data:{tags:$('#tags').val(), description:$('#description').val(),uri:getFileName($('#image_upload').val())},
                success: function (data, status)
                {
                    $("#uploadSuccess").show();
                    setTimeout(function(){$.fancybox.close();},3000);
                },
                error: function (data, status, e)
                {
                    alert(e);
                }
            }
        );

        return false;

    }
 $(function(){$("#image_upload").change(function(){$(".detail").show();})});
