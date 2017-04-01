var loadnum=0, loadm=0, kk=0;
var fadeTime=500;
$(function(){
    time1=new Date().getTime();
    mgs = document.getElementsByTagName("img");
    mss = document.getElementsByClassName("imgbg");
    num = mgs.length + mss.length;
    par = 100 / num;
    if(num>0)imgload(0, num, par);
    for(var t=0;t<$("audio").length;t++){
        $("audio").eq(t)[0].load();
    }
})

function imgload(i, num, par){
    if(i==4){
//		$(".load").addClass('active')
    }
    if (i == (num - 1)) {
        par = 100 - parseInt(par) * (num - 1)
    }
    loadm = loadm + par;
    if (parseInt(loadm) >= 100) {
        loadm = 100
    }
    var ii = 0;
    if (parseInt(loadnum) < loadm) {
        loads()
    }
    var img = new Image();
    if(i>=mgs.length){
        imgs=mss;
        imgi=i-mgs.length;
    }else{
        imgs=mgs;
        imgi=i;
    }

    var dsrc=imgs[imgi].getAttribute("data-src");
    if(dsrc!=null){
        img.src = imgs[imgi].getAttribute("data-src");
        img.onload = function() {
            callback(i, num)
        }
    }else{
        callback(i, num)
    }
}
function loads() {
    if (loadnum < loadm) {
        loadnum++;
        if(loadnum>=100)loadnum=99;
        $(".loadnum").html(loadnum+"%");
        dstart(loadnum);

    }
}
function callback(i, num) {
    m2=Math.ceil(loadm);
    if(m2>100)m2=100;
    loadnum=Math.ceil(m2);
    $("#loadnum").html(loadnum+"%");
    $("#kk").css("width",loadnum+"%");
    var dsrc=imgs[imgi].getAttribute("data-src");
    if(dsrc!=null){
        if(i>=(mgs.length+mss.length)){
            imgs[imgi].src = dsrc;
        }else if(i>=mgs.length){
            imgs[imgi].style.backgroundImage = 'url('+dsrc+')';
        }else{
            imgs[imgi].src = dsrc;
        }
    }
    if (i < num - 1) {
        imgload(i + 1, num, par)
    }
    dstart(loadnum);
}
function dstart(dnum){
    if (dnum >= 100) {
        if(kk==1)return;
        kk=1;
        setTimeout(function(){
            $(".load").fadeOut();
            $(".main").fadeIn();
            $('#yao')[0].play();
            $('#yao')[0].pause();
        },500)
    }
}