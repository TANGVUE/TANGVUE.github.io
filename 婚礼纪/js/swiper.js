(function () {
    var index = 0;
    var lis = document.querySelectorAll('.pic-box .lis');
    var intro = document.querySelectorAll('.pic-box .lis .intro');
    var points = document.querySelectorAll(' .pic-box .point li ');

    setInterval(function () {
        for (var i = 0; i < lis.length; i++) {
            lis[i].setAttribute('class', 'lis');
            intro[i].style.display = 'none';
            points[i].style.backgroundColor = "#cccccc";
        }

        lis[index].setAttribute('class', 'center');
        intro[index].style.display = 'block';
        points[index].style.backgroundColor = "#f83244";

        index++;
        if (index == 7) {
            index = 0;
        }


    }, 3000);


    for (var i = 0; i < points.length; i++) {
        points[i].onclick = function () {
            for (var i = 0; i < points.length; i++) {
                lis[i].setAttribute('class', 'lis');
                intro[i].style.display = 'none';
                points[i].style.backgroundColor = "#cccccc";
            }

            for (var n = 0; n < points.length; n++) {
                if (this === points[n]) {
                    index = n;
                    this.style.backgroundColor = "#f83244";
                    lis[n].setAttribute('class', 'center');
                    intro[n].style.display = 'block';
                }
            }
        }
    }








}())