/*myshop_menu_1*/
$(function () {
    var gbm = $(".gbm-wechat");
    if(gbm[0]){
        var currentSub,
            subOffset = 52;

        gbm.on("click",".nav-item", function (e) {
            e.stopPropagation();
            var navItem = $(this);
            if(currentSub){
                hideSub($(currentSub));
            }

            var itemSub = navItem.find(".gbm-wechat-sub");
            if(itemSub[0]){
                currentSub = itemSub[0];
                if(itemSub.css('display') == 'none'){
                    var nwidth = navItem.width(),
                        xdiff = 90 - nwidth;
                    if(xdiff > 0){
                        if(navItem.position().left + nwidth > window.innerWidth){
                            itemSub.find("ul").css("margin-left",-xdiff/2-5);
                        }
                    }

                    showSub(itemSub);
                }else{
                    hideSub(itemSub);
                }
            }
        }).on("click",".nav-item > a", function (e) {
            var itemSub = $(this).parent().find(".gbm-wechat-sub");
            if(itemSub[0]){
                e.preventDefault();
            }
        });

        $('body').on("click", function () {
            if(currentSub){
                hideSub($(currentSub));
            }
        });

        function showSub(itemSub){
            itemSub.css({
                'display':'block',
                '-webkit-transform':'translateY(0)'
            }).animate({
                translateY : '-'+(itemSub.height() + subOffset)+'px'
            },{
                duration : 100,
                easing : 'ease-in-out',
                complete : function () {
                }
            });
        }
        function hideSub(itemSub){
            itemSub.animate({
                translateY : 0
            },{
                duration : 100,
                easing : 'ease-in-out',
                complete : function(){
                    itemSub.css('display','none');
                }
            });
            currentSub = null;
        }
    }
})