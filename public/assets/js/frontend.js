
// Cover Page Jquery

//scroll down from top arrow
$("#arrow").click(function() {
    $('html, body').animate({
        scrollTop: $("#feature-1").offset().top
    }, 2000);
})
