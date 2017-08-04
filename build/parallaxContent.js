'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function ($) {

    $.fn.parallaxContent = function (method) {

        var methods = {

            init: function init(options) {

                var settings = $.extend({
                    duration: 1.5,
                    shift: 10
                }, options);

                var scrollTop = 0,
                    windowHeight = 0,
                    triggerPosition = 0;

                $(window).on('scroll load', function () {
                    scrollTop = $(window).scrollTop();
                    windowHeight = $(window).height();

                    triggerPosition = scrollTop + windowHeight;
                });

                this.each(function () {

                    var $this = $(this),
                        thisHeight = $this.outerHeight(),
                        animationTriggerStart = 0,
                        animationTriggerEnd = 0,
                        offset = 0,
                        animationLength = 0,
                        dataOptions = $this.data('parallax-content'),
                        animateDuration = settings.duration,
                        animateShift = settings.shift;

                    if (dataOptions != undefined) {
                        if (dataOptions.hasOwnProperty('duration')) {
                            animateDuration = dataOptions.duration;
                        }

                        if (dataOptions.hasOwnProperty('shift')) {
                            animateShift = dataOptions.shift;
                        }
                    }

                    $(window).on('load resize', function () {

                        offset = $this.offset();

                        animationTriggerStart = offset.top;

                        animationTriggerEnd = animationTriggerStart + windowHeight;

                        animationLength = animationTriggerEnd - animationTriggerStart;
                    });

                    $(window).on('scroll resize load', function () {

                        if (triggerPosition > animationTriggerStart && triggerPosition < animationTriggerEnd + thisHeight) {

                            $this.addClass('active');

                            var centerPixelShift = triggerPosition - offset.top - animationLength * 0.5;

                            var centerPercentShift = centerPixelShift / (animationLength / 100) * 2;

                            var y = animateShift / 100 * centerPercentShift;

                            TweenLite.to($this, animateDuration, { y: y + 'px' });
                        } else {
                            $this.removeClass('active');
                        }
                    });
                });
            }
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if ((typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('There is no method with the name ' + method + ', for jQuery.parallaxContent');
        }
    };
})(jQuery);