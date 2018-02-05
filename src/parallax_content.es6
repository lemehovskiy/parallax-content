/*
 Version: 1.0.5
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/parallax_content
 */

'use strict';

(function ($) {

    class ParallaxContent {

        constructor(element, options) {

            let self = this;

            self.$element = $(element);

            //extend by function call
            self.settings = $.extend(true, {
                duration: 1.5,
                shift: 10
            }, options);

            //extend by data options
            self.data_options = self.$element.data('parallax-content');
            self.settings = $.extend(true, self.settings, self.data_options);



            let scrollTop = 0,
                windowHeight = 0,
                triggerPosition = 0;


            $(window).on('scroll load', function () {
                scrollTop = $(window).scrollTop();
                windowHeight = $(window).height();

                triggerPosition = scrollTop + windowHeight;
            });


            let thisHeight = self.$element.outerHeight(),
                animationTriggerStart = 0,
                animationTriggerEnd = 0,
                offset = 0,
                animationLength = 0,

                animateDuration = self.settings.duration,
                animateShift = self.settings.shift;


            $(window).on('load resize', function () {

                offset = self.$element.offset();

                animationTriggerStart = offset.top;

                animationTriggerEnd = animationTriggerStart + windowHeight;

                animationLength = animationTriggerEnd - animationTriggerStart;
            });


            $(window).on('scroll resize load', function () {

                if (triggerPosition > animationTriggerStart && triggerPosition < animationTriggerEnd + thisHeight) {

                    self.$element.addClass('active');

                    let centerPixelShift = triggerPosition - offset.top - (animationLength * 0.5);

                    let centerPercentShift = centerPixelShift / (animationLength / 100) * 2;

                    let y = animateShift / 100 * centerPercentShift;

                    TweenLite.to(self.$element, animateDuration, {y: y + 'px'});

                }

                else {
                    self.$element.removeClass('active');
                }

            })

        }
    }


    $.fn.parallaxContent = function () {
        let $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i,
            ret;
        for (i = 0; i < length; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                $this[i].parallax_content = new ParallaxContent($this[i], opt);
            else
                ret = $this[i].parallax_content[opt].apply($this[i].parallax_content, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };

})(jQuery);