(function () {

    var siwerp = document.querySelectorAll(' .siwerp')[0];

    var item = document.querySelectorAll(' .siwerp li');

    var wrap = document.getElementById('wrap');

    var points = document.querySelectorAll(' .points li');

    var width = parseFloat(window.getComputedStyle(wrap, null).width);

    // 当前轮播图的索引
    var index = 0;

    var startX = 0;


    // setInterval(function () {

    // }, 4000);


    siwerp.ontouchstart = function (e) {
        startX = e.targetTouches[0].clientX;
    }

    siwerp.ontouchend = function (e) {


        var endX = e.changedTouches[0].clientX;


        if (index !== 0 && index !== item.length - 1) {
            // 其他元素移动方案

            if (startX > endX) {
                console.log(index);
                allMove(0, width);
                index++;
            } else {
                console.log(index);
                allMove(1, width);
                index--;
            }

        } else if (index == 0) {
            // 头部元素移动方案

            if (startX > endX) {
                console.log(index);
                allMove(0, width);
                index = 1;
            } else {
                // ********头部右移动特殊情况***********
                /*
                1.先将尾部移动至头部之前  
                 */
            }

        } else if (index == item.length - 1) {
            // 尾部元素移动方案

            if (startX > endX) {
                // ********尾部左移动特殊情况***********
            } else {
                console.log(index);
                allMove(1, width);
                index = item.length - 2;
            }

        }
    }


    function allMove(deriction, width) {

        if (!deriction) {
            width = width * -1;
        }

        for (var i = 0; i < item.length; i++) {
            // 获取当前位置
            var transform = window.getComputedStyle(item[i], null).transform;
            var transArr = transform.split(',');
            var transXNum = parseFloat(transArr[transArr.length - 2]);
            // 改变位置
            item[i].style.transform = 'translateX(' + (transXNum + width) + 'px)';
        }
    }




}())