(function () {

    var nav = document.querySelectorAll(' .nav1>li ');
    var panel = document.querySelectorAll(' .list-panel ');
    var lis = document.querySelectorAll('.main .title li');
    var items = document.querySelectorAll(' .main .lists .item');



    for (var i = 0; i < nav.length; i++) {
        nav[i].onmouseenter = function (e) {
            for (var i = 0; i < nav.length; i++) {
                if (e.target === nav[i]) {
                    nav[i].style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                    panel[i].style.opacity = '1';
                } else {
                    nav[i].style.backgroundColor = "rgba(0, 0, 0, 0.4)";
                    panel[i].style.opacity = '0';
                }
            }

        }

        nav[i].onmouseleave = function (e) {
            for (var i = 0; i < nav.length; i++) {
                if (e.target === nav[i]) {
                    nav[i].style.backgroundColor = "rgba(0, 0, 0, 0.4)";
                    panel[i].style.opacity = '0';
                }
            }
        }
    }

    // 添加事件
    for (var n = 0; n < lis.length; n++) {
        lis[n].onmouseenter = function (e) {
            console.log(11);
            // 重置
            for (var n = 0; n < items.length; n++) {
                items[n].style.display = 'none';
            }

            for (var i = 0; i < lis.length; i++) {
                // 经过第几个按钮，就让显示几个
                if (e.target === lis[i]) {
                    switch (i) {
                        case 0:
                            items[0].style.display = 'block';
                        case 1:
                            items[1].style.display = 'block';
                        case 2:
                            items[2].style.display = 'block';
                        case 3:
                            items[2].style.display = 'block';
                            items[3].style.display = 'block';
                        case 4:
                            items[0].style.display = 'block';
                            items[4].style.display = 'block';
                        case 5:
                            items[4].style.display = 'block';
                            items[5].style.display = 'block';
                        case 6:
                            items[3].style.display = 'block';
                            items[5].style.display = 'block';
                        case 7:
                            items[5].style.display = 'block';
                    }

                }
            }
        }

    }
}())