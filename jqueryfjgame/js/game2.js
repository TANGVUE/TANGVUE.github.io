// 各类侦听事件
$(".go").click(function() {
    $(".gamePlay").fadeOut(300, function() {
        $(".gameRun").fadeIn();
    });
    $(".bgp").attr("src", "../img/bg.jpg");
    if ($(".mode>span").attr("class") == "key") {
        keyMove();
    } else {
        mouseMove();
    }
    fire();
//     // 调用子弹函数
    createEnemy();
//     // 调用敌人生成函数
})

$(".history").click(function() {
    $(".gamePlay").fadeOut(200, function() {
        $(".gameScore").fadeIn(200);
    });
})

$(".goback").click(function() {
    $(".gameScore").fadeOut(200, function() {
        $(".gamePlay").fadeIn(200);
    });
})

// 等级按键侦听
$(".grade").click(function() {
    $(".gameGrade").toggle(300);
}).blur(function() {
    $(".gameGrade").fadeOut(300);
})

// 困难等级控制
$(".gameGrade").delegate("span", "click", function() {
    var num = $(this).index();
    if (num == 0) {
        $(".grade>span").text("普通");
    } else if (num == 1) {
        $(".grade>span").text("困难");
    } else if (num == 2) {
        $(".grade>span").text("变态");
    }
});

// 音乐开关控制
$(".music").click(function() {
    var musicPlay = document.getElementsByTagName("audio")[0];
    $(".music>span").toggleClass("open close");
    if ($(".music>span").attr("class") == "open") {
        $(".music>span").text("开");
        musicPlay.play();
    } else {
        $(".music>span").text("关");
        musicPlay.pause();
    }
})

$(".gameRun").delegate(".menu", "click", function() {
    clearInterval(timer);
    clearInterval(enemyTimer);
    $(".enemy").remove();
    $(".feiji").css({
        top: 580,
        left: 250
    });
    // 关闭插入子弹的定时器
    $(".bgp").attr("src", "../img/timg.jpg");
    $(".payPanel").fadeOut(300);
    $(".gameRun").fadeOut(0, function() {
        $(".gamePlay").fadeIn(300);
    });
});

$(".gameRun").delegate(".money", "click", function() {
    $(".payPanel").fadeToggle(300);
})

$(".pay").click(function() {
    money += 500;
    $(".payNum").text(money);
    if(money==4000){
        clearInterval(timer);
        $(".feiji>img").attr("src","../img/feiji3.png");
        speed=200;
        fire();
    }else if(money==8000){
        clearInterval(timer);
        $(".feiji>img").attr("src","../img/feiji4.png");
        speed=100;
        str="../img/zidan.png";
        fire();
    }
})

$(".mode").click(function() {
    $(".mode>span").toggleClass("key mouse");
    if ($(".mode>span").attr("class") == "key") {
        $(".mode>span").text("键盘");
    } else {
        $(".mode>span").text("鼠标");
    }
})

var timer, enemyTimer;
var money = 0;
var speed=600;
var str="../img/zidan1.png";
var positionArray = [];
// 位置对象数组

// 设计一个位置对象
function positionObj(top, left) {
    this.top = top;
    this.left = left;
}

//怪物出现的位置，一一存入数组中 
(function() {
    var pos;
    for (var i = 0; i < 6; i++) {
        if (i == 0) {
            pos = new positionObj(-100, 0);
            positionArray.push(pos);
        } else if (i == 1) {
            pos = new positionObj(-100, 100);
            positionArray.push(pos);
        } else if (i == 2) {
            pos = new positionObj(-100, 200);
            positionArray.push(pos);
        } else if (i == 3) {
            pos = new positionObj(-100, 300);
            positionArray.push(pos);
        } else if (i == 4) {
            pos = new positionObj(-100, 400);
            positionArray.push(pos);
        } else if (i == 5) {
            pos = new positionObj(-100, 500);
            positionArray.push(pos);
        }
    }
})();


//键位控制 
function keyMove() {
    $(window).keydown(function(e) {
        var $feiji = $(".feiji");
        var $top = parseInt($feiji.css("top"));
        var $left = parseInt($feiji.css("left"));
        switch (e.keyCode) {
            case 38:
                if ($top >= 0) {
                    $feiji.css({
                        top: $top - 20 + "px"
                    });
                }
                break;
            case 40:
                if ($top <= 600) {
                    $feiji.css({
                        top: $top + 20 + "px"
                    });
                }
                break;
            case 37:
                if ($left >= 0) {
                    $feiji.css({
                        left: $left - 20
                    });
                }
                break;
            case 39:
                if ($left <= 500) {
                    $feiji.css({
                        left: $left + 20
                    });
                };
        }
    });
}


function mouseMove() {
    var downX, downY, moveX, moveY;
    $(".feiji").mousedown(function(e) {
        downX = e.offsetX;
        downY = e.offsetY;
        e.preventDefault();
        $(".gameRun").mousemove(function(e) {
            var boxLeft = parseInt($(".gameBox").css("marginLeft"));
            moveX = e.pageX - boxLeft - downX;
            moveY = e.pageY - 100 - downY;
            $(".feiji").css({
                top: moveY,
                left: moveX
            });
        });
    })
    $(".gameRun").mouseup(function() {
        $(".gameRun").off("mousemove");
    })
}

//子弹发射函数
function fire() {
    timer = setInterval(function() {
        var checkTimer;
        var $zidan = $("<div class=\"zidan\">" +
            "<img src="+str+" >" +
            "<img src="+str+">" +
            "</div>");
        var $top = parseInt($(".feiji").css("top"));
        var $left = parseInt($(".feiji").css("left"));
        $zidan.css({
            top: $top,
            left: $left
        });
        // 获取飞机的位置，立马给子弹位置赋值
        $(".gameRun").prepend($zidan);
        // 每颗子弹400毫秒完成动画后消失
        $zidan.animate({
            top: -100
        }, 400, function() {
            $(this).remove();
            clearInterval(checkTimer);
        })
        // 每30毫秒检测一次
        // 碰撞检测
        checkTimer = setInterval(function() {
            var $enemys = $(".gameRun").children(".enemy");
            $enemys.each(function() {
                // 敌人的四边的位置
                var eTop = parseInt($(this).css("top")),
                    eBottom = parseInt($(this).css("top")) + parseInt($(this).css("height")),
                    eLeft = parseInt($(this).css("left")),
                    eRight = parseInt($(this).css("left")) + parseInt($(this).css("width"));
                // 获取子弹的四边距离
                var top = parseInt($zidan.css("top")),
                    bottom = parseInt($zidan.css("top")) + parseInt($zidan.css("height")),
                    left = parseInt($zidan.css("left")),
                    right = parseInt($zidan.css("left")) + parseInt($zidan.css("width"));
                if (top >= eTop && top <= eBottom) {
                    if (left >= eLeft && left <= eRight || right >= eLeft && right <= eRight) {
                        $zidan.remove();
                        var hit=parseInt($(this).attr("hit"))+1;
                        // 获取hit属性，视为撞击是加一
                        if(hit>=5){
                            $(this).remove();
                        }else{
                            $(this).attr("hit",hit);
                        }
                    }
                } else if (bottom >= eTop && bottom <= eBottom) {
                    if (left >= eLeft && left <= eRight || right >= eLeft && right <= eRight) {
                        $zidan.remove();
                        var hit=parseInt($(this).attr("hit"))+1;
                        // 获取hit属性，视为撞击是加一
                        if(hit=>5){
                            $(this).remove();
                        }else{
                            $(this).attr("hit",hit);
                        }
                    }
                }
            });
        }, 30);
    }, speed);
}

// 随机生成怪物
function createEnemy() {
    enemyTimer = setInterval(function() {
        var random = (Math.random()) * 10;
        var num;
        var $enemy = $("<div class=\"enemy\">" +
            "<img src=\"../img/feiji2.png\"/>" +
            "</div>");
        if (random <= 1.67) {
            num = 0;
        } else if (random <= 3.34 && random > 1.67) {
            num = 1;
        } else if (random <= 5.01 && random > 3.34) {
            num = 2;
        } else if (random <= 6.68 && random > 5.01) {
            num = 3
        } else if (random <= 8.35 && random > 6.68) {
            num = 4;
        } else if (random <= 10.02 && random > 8.35) {
            num = 5;
        }
        $enemy.css({
            top: positionArray[num].top,
            left: positionArray[num].left
        });
        $enemy.attr("hit","0");
        $(".gameRun").prepend($enemy);
        $enemy.animate({
            top: 800
        }, 10000, function() {
            $(this).remove();
        })
    }, 800);
}
