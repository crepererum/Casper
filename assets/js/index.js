/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        window.renderMathInElement(document.body);
        $('body').smarten();

        emojione.imageType = "svg";
        emojione.imagePathSVG = "/assets/svg/";
        $('body').emojione();
    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };

    // https://gist.github.com/hkfoster/8373236
    jQuery.fn.smarten = (function() {
        function smartenNode(node) {
            if (node.nodeType === 3) {
                node.data = node.data
                    .replace(/(^|[-\u2013\u2014/(\[{"\s])'/g, "$1\u2018")      // Opening singles
                    .replace(/'/g, "\u2019")                                   // Closing singles & apostrophes
                    .replace(/(^|[-\u2013\u2014/(\[{\u2018\s])"/g, "$1\u201c") // Opening doubles
                    .replace(/"/g, "\u201d")                                   // Closing doubles
                    .replace(/---/g, "\u2014")                                 // Em dashes
                    .replace(/--/g, "\u2013")                                  // En dashes
                    .replace(/\.{3}/g, "\u2026");                              // Ellipsis
            } else if (node.nodeType === 1 && ["CODE", "PRE", "TT"].indexOf(node.nodeName) === -1) {
                if (node = node.firstChild) do {
                    smartenNode(node);
                } while (node = node.nextSibling);
            }
        }

        return function() {
            return this.each(function(){
                smartenNode(this);
            });
        };
    }());

    jQuery.fn.emojione = (function() {
        function emojioneNode(node) {
            if (node.nodeType === 3) {
                var content_orig = node.data;
                var content_new = emojione.toImage(content_orig);
                if (content_orig !== content_new) {
                    var fragment = document.createRange().createContextualFragment(content_new);
                    console.log(fragment);
                    node.parentNode.replaceChild(fragment, node);
                }
            } else if (node.nodeType === 1 && ["CODE", "PRE", "TT"].indexOf(node.nodeName) === -1) {
                if (node = node.firstChild) do {
                    emojioneNode(node);
                } while (node = node.nextSibling);
            }
        }

        return function() {
            return this.each(function(){
                emojioneNode(this);
            });
        };
    }());
})(jQuery);
