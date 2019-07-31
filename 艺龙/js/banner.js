(function () {

    var lunbotu = document.querySelectorAll('.lunbotu li');

    var lis = document.querySelectorAll('.points li');

    var index = 0;


    setInterval(function () {
        for (var i = 0; i < lunbotu.length; i++) {
            lis[i].style.backgroundColor = '';
            lunbotu[i].style.opacity = '0';
        }
        if (index == 7) {
            lis[0].style.backgroundColor = 'rgb(255,255,255)';
            lunbotu[0].style.opacity = '1';
            index = 0;

            return;
        }

        lis[index + 1].style.backgroundColor = 'rgb(255,255,255)';
        lunbotu[index + 1].style.opacity = '1';
        index++;
        if (index == 8) {
            lis[0].style.backgroundColor = 'rgb(255,255,255)';
            lunbotu[0].style.opacity = '1';
            index = 0;
        }
    }, 4000);


    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            for (var i = 0; i < lunbotu.length; i++) {
                lis[i].style.backgroundColor = '';
                lunbotu[i].style.opacity = '0';
            }

            for (var n = 0; n < lis.length; n++) {
                if (lis[n] === this) {
                    lis[n].style.backgroundColor = 'rgb(255,255,255)';
                    lunbotu[n].style.opacity = '1';
                }
            }
        }
    }


}())