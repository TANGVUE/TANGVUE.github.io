(function () {

    var main = document.querySelectorAll('.main')[0];
    var search = document.querySelectorAll('.search')[0];
    var h1 = document.querySelectorAll('h1')[0];
    var sousuo = document.querySelectorAll('.header >.icon-sousuo')[0];
    main.onscroll = function () {
        if (main.scrollTop > 30) {
            var classStr1 = search.getAttribute('class');
            var classStr2 = sousuo.getAttribute('class');
            var classStr3 = h1.getAttribute('class');
            h1.setAttribute('class', classStr3.replace('show', ' faed'));
            search.setAttribute('class', classStr1.replace('faed', ' show'));
            sousuo.setAttribute('class', classStr2.replace('show', ' faed'));
        } else {
            var classStr1 = search.getAttribute('class');
            var classStr2 = sousuo.getAttribute('class');
            var classStr3 = h1.getAttribute('class');
            h1.setAttribute('class', classStr3.replace('faed', ' show'));
            search.setAttribute('class', classStr1.replace('show', ' faed'));
            sousuo.setAttribute('class', classStr2.replace('faed', ' show'));
        }
    }

}())