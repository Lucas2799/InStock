// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(function () {

    $('[data-toggle="tooltip"]').tooltip();

    //previne auto-fill dos inputs

    if (navigator.userAgent.indexOf("Edg") != -1) { //edge
        $('input').attr("autocomplete", "new-password");
    } else if (navigator.userAgent.indexOf("Chrome") != -1) { //edge
        $('input').attr("autocomplete", "off");
    } else if (navigator.userAgent.indexOf("Safari") != -1) { //edge
        $('input').attr("autocomplete", "new-password");
    } else {
        $('input').attr("autocomplete", "off");
    }

    var autofocus = $("[autofocus]");

    autofocus
        .putCursorAtEnd() // should be chainable
        .on("focus", function () { // could be on any event
            autofocus.putCursorAtEnd()
        });

    $(".alert-success").fadeOut(5000, function () {
        $(this).remove();
    });

    $("input[name^='Image']").change((e) => {

        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            $("[imagechange]").attr("src", reader.result)
        }
        reader.readAsDataURL(file);
    });

});

jQuery.fn.putCursorAtEnd = function () {

    return this.each(function () {

        // Cache references
        var $el = $(this),
            el = this;

        // Only focus if input isn't already
        if (!$el.is(":focus")) {
            $el.focus();
        }

        // If this function exists... (IE 9+)
        if (el.setSelectionRange) {

            // Double the length because Opera is inconsistent about whether a carriage return is one character or two.
            var len = $el.val().length * 2;

            // Timeout seems to be required for Blink
            setTimeout(function () {
                el.setSelectionRange(len, len);
            }, 1);

        } else {

            // As a fallback, replace the contents with itself
            // Doesn't work in Chrome, but Chrome supports setSelectionRange
            $el.val($el.val());

        }

        // Scroll to the bottom, in case we're in a tall textarea
        // (Necessary for Firefox and Chrome)
        this.scrollTop = 999999;

    });

};