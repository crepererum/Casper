/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {
        $('body').smarten();
    });

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
})(jQuery);
