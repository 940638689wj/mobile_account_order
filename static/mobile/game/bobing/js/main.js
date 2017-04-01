document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('touchend', function (e) { e.preventDefault(); }, false);
var keyao=0, k=0;
$(function(){
    main();
    bobing();
})

$(window).resize(function(){
    main();
})

function main(){
    var W = $(window).width(),
        H = $(window).height();
    $(".div").css({"width":W, "height":H})
    $(".kuang").width(W*.88);
}

//摇一摇触发
function bobing(){
    var SHAKE_THRESHOLD = 2000;
    var last_update = 0;
    var x = y = z = last_x = last_y = last_z = 0;
    var flag=1;
    if(window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    }
    function deviceMotionHandler(eventData) {
        if(keyao==1){
            return false;
        }
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if((curTime - last_update) > 100) {
            var diffTime = curTime - last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 30000;
            if(speed > SHAKE_THRESHOLD) {
                if (keyao==0){
                    keyao = 1;
                    processResponse();
                }
            }
            last_x = x;
            last_y = y;
            last_z = z;
        };
    };
}
//筛子
function processResponse(){
    var dice=$(".dice"), result=new Array();
    for(i=0;i<dice.length;i++){
        dice.eq(i).addClass("active");
    }
    $('#yao')[0].play();
    var sj=Math.round(Math.random());
    switch (sj){
        case 0:
            result[0]=1;
            result[1]=2;
            result[2]=1;
            result[3]=3;
            result[4]=1;
            result[5]=2;
            break;
        case 1:
            result[0]=1;
            result[1]=4;
            result[2]=2;
            result[3]=3;
            result[4]=1;
            result[5]=5;
            break;
    }
    setTimeout(function(){
        $(".dice").removeClass("active");
    },1500);
    for(i=0;i<dice.length;i++){
        dice.eq(i).find("img").attr("src", "images/d"+result[i]+".png");
    }
    setTimeout(function(){
        if(sj==0){
            alert("没有中奖");
            keyao=0;
        }else{
            alert("中奖");
            keyao=0;
        }
    },2000);
}