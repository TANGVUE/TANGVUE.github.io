(function () {

    window.onresize = change;

    function change() {
        var banner = document.getElementsByClassName('banner')[0];
        var changes = document.getElementsByClassName('changes')[0];
        banner.style.height = window.getComputedStyle(changes).height;
    }

    change();

}())