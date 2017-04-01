$(function(){
    var mod = $('.img-slide');
    mod.each(function () {
        var module = $(this).find(".module");
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

        }
    });

    var mod = $('.product-col3');
    mod.each(function () {
        var module = $(this).find(".module");
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
        }
    });

    $(".input-wrap").each(function () {
        var wrap = $(this),
            input = wrap.find("input"),
            del = wrap.find(".delete");
        del.on("click", function () {
            input.val("").focus();
            del.hide();
        });
        input.on("input propertychange", function () {
            if($.trim(this.value) != ""){
                del.show();
            }else{
                del.hide();
            }
        });
    });
});

function imglazyload(){
    $("img.lazyload").css({
        width : "100%",
        height : "100%"
    }).unveil(0, function () {
        var img = $(this);
        img.one("load", function () {
            img.css({
                height : "auto",
                width : "auto"
            });
        });
    });
}

(function(){
    var timer,
        setRootFontSize = function () {
            var winWidth = document.documentElement.getBoundingClientRect().width,
            //var winWidth = app.isWx ? window.innerWidth : document.documentElement.offsetWidth,
                rootFontSize = (winWidth / 320 *20)+"px";
            $("html").css("font-size",rootFontSize);
        };
    window.addEventListener("resize", function() {
        clearTimeout(timer);
        timer = setTimeout(setRootFontSize, 300);
    }, false);
    window.addEventListener("orientationchange", function() {
        clearTimeout(timer);
        timer = setTimeout(setRootFontSize, 300);
    }, false);
    window.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setRootFontSize, 300);
        }
    }, false);
    setRootFontSize();
})();

//以对象方式获取地址中的参数
var getUrlParams = (function () {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
})();


Date.prototype.format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
