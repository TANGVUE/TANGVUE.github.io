(function () {
    var toggle = document.querySelectorAll('.header a')[0];
    var nav = document.querySelectorAll(' .nav ')[0];
    var key1 = 0;

    toggle.onclick = function () {
        if (!key1) {
            nav.style.height = "235px";
            key1 = 1;
        } else {
            nav.style.height = "0px";
            key1 = 0;
        }
    }
}())