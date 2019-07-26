(function () {
    var lbs = document.querySelectorAll(' .lunbotu-box >li');
    var points = document.querySelectorAll(' .point-box >li ');
    var index = 0;

    lbs[0].style.opacity = '1';
    points[0].style.backgroundColor = 'rgb(255,255,255)';

    setInterval(function () {

        // 每次执行重置所有图片背景透明度
        for (var i = 0; i < lbs.length; i++) {
            lbs[i].style.opacity = '0';
            points[i].style.backgroundColor = 'rgba(255,255,255,0.5)';
        }
        if (index == 4) {
            lbs[0].style.opacity = '1';
            points[0].style.backgroundColor = 'rgb(255,255,255)';
            index = 0;
            return;
        }

        // 执行对应编号的元素属性
        lbs[index + 1].style.opacity = '1';
        points[index + 1].style.backgroundColor = 'rgb(255,255,255)';


        index++;


    }, 5000);

    // 鼠标点击事件

    for (var n = 0; n < points.length; n++) {

        points[n].onclick = function (e) {

            console.log(1);
            // 重置
            for (var i = 0; i < lbs.length; i++) {
                lbs[i].style.opacity = '0';
                points[i].style.backgroundColor = 'rgba(255,255,255,0.5)';
            }

            // 执行切换
            for (var i = 0; i < points.length; i++) {
                if (e.target === points[i]) {
                    points[i].style.backgroundColor = 'rgb(255,255,255)';
                    lbs[i].style.opacity = '1';
                }
            }
        }


    }



}())