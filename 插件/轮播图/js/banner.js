(function () {
    var wrap = document.getElementsByClassName('wrap')[0];
    var siwerp = document.getElementsByClassName('siwerp');
    var length = siwerp.length;
    var index = 0;
    var pageWidth = document.documentElement.clientWidth;
    siwerp[1].style.transform = 'translate(' + pageWidth + 'px,0)';


    wrap.ontouchstart = function (e) {
        var startX = e.targetTouches[0].clientX;
        var moveX;
        this.ontouchmove = check;

        function check(e) {
            moveX = e.changedTouches[0].clientX;
        }

        this.ontouchend = function () {
            if (startX > moveX) {
                // 左

                if (index != length - 1 && index != 0) {

                } else if (index == 0) {
                    moveLeft(siwerp[0]);
                    moveLeft(siwerp[1]);


                } else if (index == length) {

                }
                // index++;
                console.log('zuo');

            } else {
                // 右
                console.log('you');
            }
            this.removeEventListener('touchmove', check);
        }
    }

    function getTransformX(elm) {
        var transStr = window.getComputedStyle(elm).transform;
        var transArr = transStr.split(',');
        return parseFloat(transArr[transArr.length - 2]);
    }

    function moveLeft(elm) {
        var transX = getTransformX(elm);
        var timer;
        var x = transX;
        timer = setInterval(function () {
            x -= (pageWidth / 400) * 10;
            elm.style.transform = 'translate(' + x + 'px,0)';
            if (x <= transX - pageWidth) {

                clearInterval(timer);
            }
        }, 10)
    }

    function moveRight() {
        var transX = getTransformX(elm);
        elm.style.transform = 'translate(' + (transX + pageWidth) + 'px,0)';
    }

}())