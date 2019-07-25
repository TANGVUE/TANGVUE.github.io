(function () {
    var center = document.getElementsByClassName('center');
    var toggle = document.getElementsByClassName('toggle');
    var panel = document.getElementsByClassName('panel1');
    var li1 = document.querySelectorAll('.nav >li');
    var ul2 = document.querySelectorAll('.ul2');
    var li2 = document.querySelectorAll('.ul2>li');

    console.log(ul2[0]);

    for (var i = 0; i < center.length; i++) {
        center[i].onmouseenter = function (e) {
            for (var n = 0; n < center.length; n++) {
                var str = center[n].getAttribute('class');
                center[n].setAttribute('class', str.replace('active', ''));
            }
            var classStr = this.getAttribute('class');
            this.setAttribute('class', classStr + ' active');
        }
    }

    for (var n = 0; n < toggle.length; n++) {
        toggle[n].onclick = function (e) {
            for (var i = 0; i < toggle.length; i++) {
                if (e.target === toggle[i]) {
                    panel[i].style.opacity = '1';
                } else {
                    panel[i].style.opacity = '0';
                }
            }
        }
    }

    li1[3].onmouseenter = function () {
        ul2[0].style.display = 'block';

    }

    li1[3].onmouseleave = function () {
        ul2[0].style.display = 'none';

    }

    li1[4].onmouseenter = function () {
        ul2[1].style.display = 'block';
    }

    li1[4].onmouseleave = function () {
        ul2[1].style.display = 'none';
    }

    li2[0].onmouseenter = function () {
        document.querySelectorAll('.ul3')[0].style.display = 'block';
    }

    li2[0].onmouseleave = function () {
        document.querySelectorAll('.ul3')[0].style.display = 'none';
    }

    li2[2].onmouseenter = function () {
        document.querySelectorAll('.ul3')[1].style.display = 'block';
    }

    li2[2].onmouseleave = function () {
        document.querySelectorAll('.ul3')[1].style.display = 'none';
    }


    console.log(li2[2]);




}())