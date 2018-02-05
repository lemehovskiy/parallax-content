require("./sass/style.scss");


require ("jquery");

require("../build/parallax_content");



$(document).ready(function () {

    $('.parallax-move').parallaxContent();

    $('.features-list .title').parallaxContent({
        duration: 2,
        shift: 15
    });

    $('.features-list .img-col').parallaxContent({
        duration: 2,
        shift: -15
    });

});