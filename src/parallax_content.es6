/*
 Version: 1.0.6
 Author: lemehovskiy
 Website: https://lemehovskiy.github.io/parallax-content
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

            self.scrollTop = 0;
            self.windowHeight = 0;
            self.triggerPosition = 0;

            self.thisHeight = self.$element.outerHeight();
            self.animationTriggerStart = 0;
            self.animationTriggerEnd = 0;
            self.offset_top = 0;
            self.animationLength = 0;

            self.init();
        }

        init(){
            let self = this;

            self.update_trigger();
            self.animate_element();
            
            $(window).on('scroll resize', function () {
                self.update_trigger();
                self.animate_element();
            })
        }

        refresh(){
            let self = this;

            self.update_trigger();
            self.animate_element();
        }

        update_trigger(){
            let self = this;

            self.scrollTop = $(window).scrollTop();

            self.windowHeight = $(window).height();

            self.triggerPosition = self.scrollTop + self.windowHeight;

            self.offset_top = self.$element.offset().top;

            self.animationTriggerStart = self.offset_top;

            self.animationTriggerEnd = self.animationTriggerStart + self.windowHeight;

            self.animationLength = self.animationTriggerEnd - self.animationTriggerStart;
        }

        animate_element() {
            let self = this;

            if (self.triggerPosition > self.animationTriggerStart && self.triggerPosition < self.animationTriggerEnd + self.thisHeight) {

                self.$element.addClass('active');

                let centerPixelShift = self.triggerPosition - self.offset_top - (self.animationLength * 0.5);

                let centerPercentShift = centerPixelShift / (self.animationLength / 100) * 2;

                let y = self.settings.shift / 100 * centerPercentShift;

                TweenLite.to(self.$element, self.settings.duration, {y: y + 'px'});

            }

            else {
                self.$element.removeClass('active');
            }
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