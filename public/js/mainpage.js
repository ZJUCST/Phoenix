/**
 * Created with IntelliJ IDEA.
 * User: Lee
 * Date: 12-12-30
 * Time: 下午3:22
 * To change this template use File | Settings | File Templates.
 */

$(function(){

    function item_callback(){

        $('.item').mouseover(function(){
            $(this).css('box-shadow', '0 1px 5px rgba(35,25,25,0.5)');

        }).mouseout(function(){
                $(this).css('box-shadow', '0 1px 3px rgba(34,25,25,0.2)');

            });
    }

    item_callback();

    $('.item').fadeIn();
    var $container = $('.item_list');
    $container.imagesLoaded(function(){
        $container.masonry({
            itemSelector : '.item',
            columnWidth : 240
        });
    });
});

