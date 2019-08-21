(function () {
    var home = document.getElementsByClassName('home')[0];
    var map = document.getElementsByClassName('map')[0];
    var enemy = document.getElementsByClassName('enemy1')[0];
    var startBtn = document.getElementsByClassName('start-btn')[0];
    var continueBtn = document.getElementsByClassName('continue-btn')[0];
    var back = document.getElementsByClassName('back')[0];
    var airplane = document.getElementsByClassName('airplane')[0];
    var fire = document.getElementsByClassName('fire1')[0];
    var airWidth = parseFloat(window.getComputedStyle(airplane).width),
        airHeight = parseFloat(window.getComputedStyle(airplane).height);
    var timer1, timer2, timer3;
    var fireWidth = getStyle(fire, 'width'),
        fireHeight = getStyle(fire, 'height');
    var mapWidth = document.body.clientWidth,
        mapHeight = document.body.clientHeight;
    var enemyWidth = getStyle(enemy, 'width'),
        enemyHeight = getStyle(enemy, 'height');
    var score = document.getElementsByClassName('score')[0];
    var num = 0;







    // 点击开始，关闭主页，进入地图
    startBtn.addEventListener('touchstart', function (e) {
        home.style.display = 'none';
        map.style.display = 'block';
        checkMap();
        createEnemy();
        createFire();
    });

    // 回到主页
    back.addEventListener('touchstart', function (e) {
        home.style.display = 'block';
        map.style.display = 'none';
        clearInterval(timer1);
        clearInterval(timer2);
    });

    // 操作事件
    airplane.addEventListener('touchstart', function () {
        map.addEventListener('touchmove', checkMove);
        this.addEventListener('touchend', function () {
            this.removeEventListener('touchmove', checkMove);
        });
    });

    // 飞机移动
    function checkMove(e) {
        var move = {
            x: e.changedTouches[0].pageX - airWidth / 2,
            y: e.changedTouches[0].pageY - airHeight / 2
        }

        airplane.style.left = move.x + 'px';
        airplane.style.top = move.y + 'px';

    }


    // 生成敌人
    function createEnemy() {
        timer1 = setInterval(function () {
            var randomLeft = (Math.random() * mapWidth - 2 * enemyWidth) + enemyWidth;
            var enemy = document.createElement('div');
            enemy.setAttribute('class', 'enemy');
            // 设置能被打击的次数
            enemy.count = 5;
            enemy.style.top = enemyHeight * -1 + 'px';
            enemy.style.left = randomLeft + 'px';
            map.appendChild(enemy);
            var tkey = setInterval(function () {
                enemy.style.top = (getStyle(enemy, 'top') + 1) + 'px';
                if (getStyle(enemy, 'top') >= mapHeight + enemyHeight) {
                    clearInterval(tkey);
                    map.removeChild(enemy);
                }
            }, 10);
        }, 2000);
    }

    // 子弹生成
    function createFire() {
        console.log('开始射击');
        timer2 = setInterval(function () {
            var zidan = document.createElement('div');
            zidan.setAttribute('class', 'fire');
            zidan.style.top = (getStyle(airplane, 'top') - fireHeight) + 'px';
            zidan.style.left = (getStyle(airplane, 'left') + airWidth / 2 - fireWidth / 2) + 'px';
            map.appendChild(zidan);
            var tkey = setInterval(function () {
                zidan.style.top = (getStyle(zidan, 'top') - 10) + 'px';
                if (getStyle(zidan, 'top') <= 0 - fireHeight) {
                    clearInterval(tkey);
                    map.removeChild(zidan);
                }
            }, 10)
        }, 150)
    }


    // 碰撞检测
    function checkCollision(z, e) {
        if (!(z instanceof HTMLElement) || !(e instanceof HTMLElement)) {
            console.log(z, e);
            return;
        }
        var zidan = {
            x: getStyle(z, 'left'),
            y: getStyle(z, 'top')
        }
        var enemy = {
            x: getStyle(e, 'left'),
            y: getStyle(e, 'top')
        }

        // 检测边界碰撞范围
        if (zidan.x >= enemy.x && zidan.x <= (enemy.x + enemyWidth)) {
            if (zidan.y >= enemy.y && zidan.y <= (enemy.y + enemyWidth)) {
                // 满足碰撞条件 子弹清除
                map.removeChild(z);
                e.count = e.count - 1;
                console.log(e.count);
                if (e.count <= 0) {
                    // 敌机被打击数耗尽，清除
                    console.log('del');
                    map.removeChild(e);
                    num += 1;
                    score.innerHTML = num;
                }
            }
        }
    }

    //地图扫描
    function checkMap() {
        timer3 = setInterval(function () {
            var zidans = document.getElementsByClassName('fire');
            var enemys = document.getElementsByClassName('enemy');
            Array.prototype.forEach.call(zidans, function (item1) {
                Array.prototype.forEach.call(enemys, function (item2) {
                    checkCollision(item1, item2);
                });
            });
        }, 10)
    }

    //计算style

    function getStyle(dom, prop) {
        return parseFloat(window.getComputedStyle(dom)[prop]);
    }


}())