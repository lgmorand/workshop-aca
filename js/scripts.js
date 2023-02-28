function isScrolledIntoView(node) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(node).offset().top;
    var elemBottom = elemTop + $(node).height();

    return elemTop < docViewBottom && elemBottom > docViewTop;
}

$(function () {
    // Smooth scroll on items nav click
    $('#nav a[href^="#"]').click(function (e) {
        e.preventDefault();
        var targetId = $(this).attr("href");
        var top = $(targetId).offset().top;
        $("html, body").stop().animate({ scrollTop: top }, 750);
    });

    // Standout the view to sections on the screen
    $(document).on("scroll", function () {
        $('.content [id]').each(function () {
            var id = $(this).attr("id");
            var target = $('#nav [href="#' + id + '"]').parent("li");

            if (isScrolledIntoView(this)) {
                target.addClass("active");
            } else {
                target.removeClass("active");
            }
        });
    });

    // Open every external links to a new tab
    $('a[href^="http"]').attr("target", "_blank");

    // Toogle blocks dynamic
    $(".toggle").click(function () {
        $(".overview").toggleClass("open");
    });

    // Toogle blocks dynamic
    $(".toggle-collapsible").click(function () {
        $(this).toggleClass("active");
        $(this).next().toggle();
    });
});
