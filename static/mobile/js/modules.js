var imgReady = (function () {
    var list = [], intervalId = null,

    // 用来执行队列
        tick = function () {
            var i = 0;
            for (; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]();
            }
            !list.length && stop();
        },

    // 停止所有定时器队列
        stop = function () {
            clearInterval(intervalId);
            intervalId = null;
        };

    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
            img = new Image();

        img.src = url;

        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img);
            load && load.call(img);
            return;
        }

        width = img.width;
        height = img.height;

        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };

        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                    // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
            ) {
                ready.call(img);
                onready.end = true;
            }
        };
        onready();

        // 完全加载完毕的事件
        img.onload = function () {
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            !onready.end && onready();

            load && load.call(img);

            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };

        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        }
    };
})();


//imgtxt-slide
$(function () {
    var mod = $('.J_Module[data-module-name=imgtxt-slide]');
    mod.each(function () {
        var module = $(this).find(".module");
        if(!module[0] || module.data("init")==true) return;

        var slide = module.find(".slide-wrap"),
            picDom = slide.find(".slide-data li"),
            itemPiclist = [];

        if(picDom.length <= 1){
            picDom.parent().show();
        }else{
            picDom.each(function () {
                itemPiclist.push({content:this.innerHTML});
            });

            var S = new iSlider({
                dom: slide[0],
                data: itemPiclist,
                isLooping: 1,
                isAutoplay: 1,
                fixPage : 0,
                animateTime: 600,
                plugins: ["dot"]
            });
            S.on("slideChange", function (index,item) {
                $(item).find("img").each(function () {
                    this.src = this.getAttribute("data-src");
                });
            });
        }

        module.data("init",true);
    });
});

//product-col3
$(function () {
    var mod = $('.J_Module[data-module-name=product-col3]');
    mod.each(function () {
        var module = $(this).find(".module");
        if(!module[0] || module.data("init")==true) return;

        var slide = module.find(".mod-slider");
        if(slide[0]){
            var picDom = slide.find(".slide-data .itemgroup"),
                itemPiclist = [];
            picDom.each(function () {
                itemPiclist.push({content:this.outerHTML});
            });
            var S = new iSlider({
                dom: slide[0],
                data: itemPiclist,
                isLooping: 1,
                isAutoplay: 1,
                fixPage : 0,
                animateTime: 600,
                plugins: ["dot"]
            });
            S.on("slideChange", function (index,item) {
                $(item).find("img").each(function () {
                    this.src = this.getAttribute("data-src");
                });
            });
        }
        module.data("init",true);
    });
});

//auxiliary-search
$(function () {
    var mod = $('.J_Module[data-module-name=auxiliary-search]');
    mod.each(function () {
        var module = $(this).find(".module");
        if(!module[0] || module.data("init")==true) return;

        var searchInput = module.find(".input-search"),
            searchLabel = module.find("label");
        searchLabel.on("click", function () {
            searchInput.trigger("focus");
        });
        searchInput.on("focus", function () {
            module.addClass("focus");
        }).on("blur", function () {
            if($.trim(this.value) == "")
                module.removeClass("focus");
        });

        module.data("init",true);
    });
});

//auxiliary-announcement
$(function () {
    var mod = $('.J_Module[data-module-name=auxiliary-announcement]');
    mod.each(function () {
        var module = $(this).find(".module");
        if(!module[0] || module.data("init")==true) return;

        var step = 0.8,
            marqueeItem = module.find(".m-text span"),
            marqueeWrap = $("<div>").appendTo(module.find(".m-text")),
            direction = module.attr("data-direction"),
            minWidth = marqueeItem.parent().width(),
            itemWidth = marqueeItem.width(),
            initPos = 0,
            pos = 0;

        if(itemWidth < minWidth) itemWidth = minWidth;
        marqueeItem.css("min-width",minWidth);
        marqueeWrap.append(marqueeItem).append(marqueeItem.clone());

        if(direction == "right"){
            initPos = minWidth - itemWidth*2;
            marqueeWrap.css("-webkit-transform","translateX("+initPos+"px)");
        }

        var move = function() {
            if(direction == "right"){
                pos += step;
                if(pos >= minWidth - itemWidth ) pos = initPos;
            }else{
                pos -= step;
                if(pos <= -itemWidth ) pos = initPos;
            }
            marqueeWrap.css("-webkit-transform","translateX("+ pos+"px)");

            requestAnimationFrame(move);
        }
        setTimeout(move,2000);

        module.data("init",true);
    });
});


/*old*/
//tab-itemshow-1
$(function () {
    var mod = $('.J_Module[data-module-name=tab-itemshow-1]');
    if(!mod[0]) return;

    mod.each(function(){
        var $this = $(this);
        var items = $this.find('.mod-list');
        var current = items.eq(0);
        items.not(current).hide();

        var navi = $this.find(".mod-tab-navigator");
        navi.navigator({
            select: function( e, index, li ) {
                current.hide();
                current = items.eq(index);
                current.show();
            }
        });

        $this.find('.arrow').on('click', function(){
            navi.iScroll( 'scrollTo', 100, 0, 400, true );
        });
    });

});


//slides-1
$(function () {
    var mod = $('.J_Module[data-module-name=slides-1]');
    if(!mod[0]) return;

    var slides = mod.find('.module');
    var slidesParam = {
        autoPlay:true,
        arrow:false,
        loop:true,
        viewNum:1,
        imgZoom:false
    };
    slides.slider(slidesParam);
    $(window).on("resize",function(){
        slides.slider("destroy").slider(slidesParam);
    });
});

//carousel-1
$(function () {
    var mod = $('.J_Module[data-module-name=carousel-1]');
    if(!mod[0]) return;

    var slides = mod.find('.mod-slider');
    var slidesParam = {
        loop : true,
        viewNum : 1,
        arrow : false,
        imgZoom:false
    };
    slides.slider(slidesParam);
    $(window).on("resize",function(){
        slides.slider("destroy").slider(slidesParam);
    });
});