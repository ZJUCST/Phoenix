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
                dataType: 'json',
                data:{tags:$('#tags').val(), description:$('#description').val(),uri:getFileName($('#image_upload').val())},
                success: function (data, status)
                {
                    if(typeof(data.error) != 'undefined')
                    {
                        if(data.error != '')
                        {
                            alert(data.error);
                        }else
                        {
                            alert(data.msg);
                        }
                    }
                },
                error: function (data, status, e)
                {
                    alert(e);
                }
            }
        )

        return false;

    }

