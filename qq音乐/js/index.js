$(".btn>i").eq(0).css({
    backgroundPosition: "-60px -20px"
});
$(".btn>i").eq(1).css({
    backgroundPosition: "-20px -20px"
});
$(".btn>i").eq(2).css({
    backgroundPosition: "-40px -240px"
});
$(".btn>i").eq(3).css({
    backgroundPosition: "-100px -20px"
});
$(".btn>i").eq(4).css({
    backgroundPosition: "-40px -300px"
});

// singInfo中的事件控制
$(".singList").delegate(".check", "click", function() {
    $(this).toggleClass("select");
    if ($(this).index(".check") == 0 && $(this).attr("class") == "check select") {
        $(".check").addClass("select");
    } else if ($(this).index(".check") == 0 && $(this).attr("class") == "check") {
        $(".check").removeClass("select");
    }
});

$(".singList").delegate(".singInfo", "mouseenter", function() {
    $(this).css("opacity", "1").find(".singName-in").show();
})

$(".singList").delegate(".singInfo", "mouseleave", function() {
    if($(this).get(0).index==player.index && $(this).find(".singKey").attr("class")=="singKey play"){
        $(this).find(".singName-in").hide();
    }else{
        $(this).css("opacity", "0.5").find(".singName-in").hide();
    }
})

$(".singList").delegate(".singKey", "click", function() {
    if ($(this).attr("class") == "singKey stop") {
        player.index = $(this).parents(".singInfo").get(0).index;
        num=player.index;
        // 获取当前歌曲的索引
        player.playMusic(musicJson[num].url,1);
        // plaer对象的播放方法
        $(".play").attr("class", "singKey stop");
        $(this).attr("class","singKey play");
        $(".musicKey").attr("class","musicKey start");
        $(this).parents(".singInfo").css("opacity","1");
        $(this).parents(".singInfo").siblings().css("opacity","0.5");
        $(".bg").css({
            backgroundImage: "url(" + musicJson[num].jpgurl + ")"
        });
        $(".musicPicture>.picture").attr("src", musicJson[num].jpgurl);
        $(".musicName>span").text(musicJson[num].name);
        $(".musicSinger>span").text(musicJson[num].author);
        $(".musicZhuanji>span").text(musicJson[num].zhuanji);
        $(".info-name").text(musicJson[num].name);
        $(".info-author").text(musicJson[num].author);
        $(".time").text("/"+musicJson[num].time);
    } else {
        player.playMusic("",0);
        $(this).attr("class","singKey stop");
        $(".musicKey").attr("class","musicKey close");
    }
})

// 删除事件
$(".singList").delegate(".delete", "click", function() {
    $(this).parents(".singInfo").remove();
});

// 底部控制条的 暂停播放
$(".musicKey").click(function() {
    if($(this).attr("class")=="musicKey close"){
       $audio.get(0).play();
       // 找到跟播放歌曲相同索引的singInfo 将它的stop置为play
       $.each($(".singInfo").get(),function (index,element) {
       	if(element.index==player.index){
            $(".singInfo").eq(index).find(".singKey").attr("class","singKey play");
            $(".singInfo").eq(index).css("opacity","1");
            return false;
            // each函数 是通过false and true来判断迭代的终止和继续
        }
       })
    }else{
       $audio.get(0).pause();
        $.each($(".singInfo").get(),function (index,element) {
       	if(element.index==player.index){
            $(".singInfo").eq(index).find(".singKey").attr("class","singKey stop");
            return false;
            // each函数 是通过false and true来判断迭代的终止和继续
        }
       })
    }
    $(this).toggleClass("close start");
})

//进度的事件
$(".musicBar").click(function(e) {
    var value;
    if (e.target !== $(".timePoint").get(0)) {
        $(".timeBar-in").css({
            width: e.offsetX
        });
        $(".timePoint").css({
            left: e.offsetX
        });
        // 每次点击计算进度条和整体位置比例，计算进度时间，并进行设置
        value=$audio.get(0).duration*(e.offsetX/parseInt($(".timeBar").css("width")));
        $audio.get(0).currentTime=parseFloat(value);
    }
})

$(".timePoint").mousedown(function() {
    var value;
    player.update=true;
    $(".musicBar").mousemove(function(e) {
        var $left = $(this).offset().left;
        $(".timeBar-in").css("width", e.pageX - $left);
        $(".timePoint").css("left", e.pageX - $left);
        value=$audio.get(0).duration*(parseFloat($(".timePoint").css("left"))/parseFloat($(".timeBar").css("width")));
    })
    $(".musicBar").mouseup(function() {
        player.update=false;
        $audio.get(0).currentTime=parseFloat(value);
        $(".musicBar").off("mousemove");
    })
});


//音量条的事件

$(".volumeBox").click(function(e) {
    var value;
    if (e.target !== $(".volumePoint")[0]) {
        $(".volume-in").css({
            width: e.offsetX
        });
        $(".volumePoint").css({
            left: e.offsetX
        });
        value=e.offsetX/parseInt($(".volumeBar").css("width"));
        $audio.get(0).volume=value.toFixed(1);
    }
})

$(".volumePoint").mousedown(function() {
    var value;
    $(".volumeBox").mousemove(function(e) {
        var $left = $(this).offset().left;
        $(".volume-in").css("width", e.pageX - $left);
        $(".volumePoint").css("left", e.pageX - $left);
        value=(e.pageX-$left)/parseInt($(".volumeBar").css("width"));
        $audio.get(0).volume=value.toFixed(1);
    }).mouseup(function() {
        $audio.get(0).volume=value.toFixed(1);
        $(this).off("mousemove");
    })
})

$(".playLove").click(function() {
    $(this).toggleClass("love");
})
$(".playModeToggle").click(function() {
    $(this).toggleClass("open");
})
$(".playVolume").click(function() {
    $(this).toggleClass("mute");
    if($(this).attr("class")=="playVolume mute"){
        $audio.get(0).volume=0;
    }else{
        var value;
        value=parseFloat($(".volume-in").css("width"))/parseInt($(".volumeBar").css("width"));
        $audio.get(0).volume=value.toFixed(1);
    }
})

$(".previous").click(function(){
	
})

// 下一首歌曲
$(".next").click(function(){
    player.index+=1;
	if(player.index>=musicJson.length){
        player.index=0;
    }
    var num=player.index;
    $.each($(".singInfo").get(),function(index ,element){
        if(element.index==player.index){
            $(".singInfo").eq(index).css("opacity","1");
            $(".singInfo").eq(index).siblings().css("opacity","0.5");
        }
    });
    $audio.attr("src",musicJson[num].url);
    $(".bg").css({
        backgroundImage: "url(" + musicJson[num].jpgurl + ")"
    });
    $(".musicPicture>.picture").attr("src", musicJson[num].jpgurl);
    $(".musicName>span").text(musicJson[num].name);
    $(".musicSinger>span").text(musicJson[num].author);
    $(".musicZhuanji>span").text(musicJson[num].zhuanji);
    $(".info-name").text(musicJson[num].name);
    $(".info-author").text(musicJson[num].author);
    $(".time").text("00:00"+"/"+musicJson[num].time);
    if($(".musicKey").attr("class")=="musicKey start"){
        $audio.get(0).play();
    }
})

var musicJson = [];
// 获取json数据 动态创建歌曲元素

var $audio = $("audio");
var player = new Player($audio);
// 创建一个播放的功能函数
var timer;
var min=0,second=0,minStr,secondStr;

player.timeBarUpdate();

$.ajax({
    url: "../music/musicData.json",
    dataType: 'json', //服务器返回json格式数据
    success: function(data) {
        // 关于data数据的获取
        $(".bg").css({
            backgroundImage: "url(" + data[0].jpgurl + ")",
        });
        player.index=0;
        $(".musicPicture>.picture").attr("src", data[0].jpgurl);
        $(".musicName>span").text(data[0].name);
        $(".musicSinger>span").text(data[0].author);
        $(".musicZhuanji>span").text(data[0].zhuanji);
        $(".info-name").text(data[0].name);
        $(".info-author").text(data[0].author);
        $(".time").text("00:00"+"/"+data[0].time);
        $audio.attr("src",data[0].url);
        // 第一次打开播放器  将第一首歌全部信息展示。
        $.each(data, function(index, music) {
            musicJson.push(music);
            // 暂时用用全局数组 储存这个json
            var $singInfo = createMusic(index, music);
            var $singList = $(".singList");
            $singList.append($singInfo);
        })
    },
    error: function(e) {
        console.log(e);
    },
    
});



function createMusic(index, music) {
    var $music = $("<li class=\"singInfo\">" +
        "<div class=\"check\">" + "</div>" +
        "<div class=\"singName\">" +
        "<span class=\"num\">" + (index + 1) + "</span>" +
        "<span class=\"name\">" + music.name + "</span>" +
        "<div class=\"singName-in\">" +
        "<a href=\"#\" class=\"delete\"></a><a href=\"#\" class=\"share\"><a href=\"#\" class=\"addMusci\"></a><a href=\"#\" class=\"singKey stop\"></a>" +
        "</div>" +
        "</div>" +
        "<div class=\"singAuthor\">" + music.author + "</div>" +
        "<div class=\"singTime\">" + music.time + "</div>" +
        "</li>");
        // 疑惑点
    $music.get(0).index=index;
    // 给dom元素对象添加一个歌曲的索引
    $music.get(0).music=music;
    // 添加一个歌曲的所以信息
    return $music;
}
