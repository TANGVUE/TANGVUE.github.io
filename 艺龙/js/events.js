(function () {

    var navLi = document.querySelectorAll('.br-nav li');
    var panel = document.querySelectorAll('.banner-panel .panel');
    var item = document.querySelectorAll('.gexing .item');
    var mudiLi1 = document.querySelectorAll('.mudi .m1 li');
    var mudiLi2 = document.querySelectorAll('.mudi .m2 li');
    var nav1 = document.querySelectorAll(' .zhinan .left-nav li ');
    var images = document.querySelectorAll(' .zhinan .panel img ')[0];

    for (let i = 0; i < navLi.length; i++) {
        navLi[i].onclick = function () {
            for (var i = 0; i < navLi.length; i++) {
                navLi[i].setAttribute('class', '');
                panel[i].style.display = 'none';

                if (navLi[i] === this) {
                    navLi[i].setAttribute('class', 'active');
                    panel[i].style.display = 'block';
                }
            }

        }
    }


    for (let i = 0; i < item.length; i++) {
        item[i].onmouseenter = function () {
            for (var i = 0; i < item.length; i++) {
                item[i].setAttribute('class', 'item');

                if (this === item[i]) {
                    item[i].setAttribute('class', 'item active');
                }
            }
        }
    }


    for (let i = 0; i < mudiLi1.length; i++) {
        mudiLi1[i].onclick = function () {
            for (var i = 0; i < mudiLi1.length; i++) {
                mudiLi1[i].setAttribute('class', '');
                if (this === mudiLi1[i]) {
                    this.setAttribute('class', 'active');
                }
            }
        }
        mudiLi2[i].onclick = function () {
            for (var i = 0; i < mudiLi1.length; i++) {
                mudiLi2[i].setAttribute('class', '');
                if (this === mudiLi2[i]) {
                    this.setAttribute('class', 'active');
                }
            }
        }


        mudiLi1[i].onmouseenter = function () {
            var classStr = this.getAttribute('class') || '';
            if (classStr.indexOf('active') === 0) return;
            this.setAttribute('class', 'hover');

        }

        mudiLi1[i].onmouseleave = function () {
            var classStr = this.getAttribute('class') || '';
            if (classStr.indexOf('active') === 0) return;
            this.setAttribute('class', '');
        }


        mudiLi2[i].onmouseenter = function () {
            var classStr = this.getAttribute('class') || '';
            if (classStr.indexOf('active') === 0) return;
            this.setAttribute('class', 'hover');

        }

        mudiLi2[i].onmouseleave = function () {
            var classStr = this.getAttribute('class') || '';
            if (classStr.indexOf('active') === 0) return;
            this.setAttribute('class', '');
        }
    }

    nav1[0].onmouseenter = function () {
        images.setAttribute('src', '../images/termini_it1_jzd.jpg');
    }

    nav1[1].onmouseenter = function () {
        images.setAttribute('src', '../images/termini_it1_ld.jpg');
    }
    nav1[2].onmouseenter = function () {
        images.setAttribute('src', '../images/termini_it1_lm.jpg');
    }
    nav1[3].onmouseenter = function () {
        images.setAttribute('src', '../images/termini_it1_qm.jpg');
    }

}())