(function () {
    var body = document.getElementsByTagName('body')[0];
    var box = document.getElementsByClassName('box')[0];
    var veiw = document.getElementsByClassName('veiw')[0];
    var rotateX = -0.9, rotateY = 66.2, translateZ = 760;

    body.addEventListener('mousedown', function (e) {
        var prevX = e.pageX,
            prevY = e.pageY;
        e.preventDefault();
        body.addEventListener('mousemove', moveCheck);
        body.addEventListener('mouseup', function (e) {
            body.removeEventListener('mousemove', moveCheck);
        })

        function moveCheck(e) {
            // 计算每次移动要移动的值
            var moveX = e.pageX - prevX,
                moveY = e.pageY - prevY;

            // 保留每次移动的位置，便于下次移动计算
            prevX = e.pageX;
            prevY = e.pageY;

            rotateX -= moveY / 10;
            rotateY += moveX / 10;
            box.style.transform = 'rotateX(' + rotateX + 'deg)' + ' rotateY(' + rotateY + 'deg)';

            veiw.style.transform = ' translateZ(' + translateZ + 'px)';
        }

    });

    body.onmousewheel = function (e) {
        translateZ += e.wheelDelta;
        veiw.style.transform = ' translateZ(' + translateZ + 'px)';
    }
}())