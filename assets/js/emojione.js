/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {
        emojione.imageType = "svg";
        emojione.imagePathSVG = "/assets/svg/";
        $('body').emojione();
    });

    jQuery.fn.emojione = (function() {
        function emojioneNode(node) {
            if (node.nodeType === 3) {
                var content_orig = node.data;
                var content_new = emojione.toImage(content_orig);
                if (content_orig !== content_new) {
                    var fragment = document.createRange().createContextualFragment(content_new);
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
