(function () {
    var center = document.getElementsByClassName('center');

    for (var i = 0; i < center.length; i++) {
        center[i].onmouseenter = function (e) {
            for (var n = 0; n < center.length; n++) {
                var str = center[n].getAttribute('class');
                center[n].setAttribute('class', str.replace('active', ''));
            }
            var classStr = this.getAttribute('class');
            var bl = classStr.indexOf('center');
            this.setAttribute('class', classStr + ' active');
        }
    }

}())