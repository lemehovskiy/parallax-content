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
                shift: 10,
                events: ['gyro'],
                gyro_animation: 'tilt'
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

            self.state = {
                isOnScreen: false
            }

            self.init();
        }

        init() {
            let self = this;

            self.update_trigger();

            $(window).on('scroll resize', function () {
                self.update_trigger();
            })

            self.settings.events.forEach(function (event) {
                if (event == 'scroll') {
                    self.subscribe_scroll_event();
                }
                else if (event == 'gyro') {
                    self.subscribe_gyro_event();
                }
            })
        }

        refresh() {
            let self = this;

            self.animate(self.get_element_animate_position());
        }

        update_trigger() {
            let self = this;

            self.scrollTop = $(window).scrollTop();
            self.windowHeight = $(window).height();
            self.triggerPosition = self.scrollTop + self.windowHeight;
            self.offset_top = self.$element.offset().top;
            self.animationTriggerStart = self.offset_top;
            self.animationTriggerEnd = self.animationTriggerStart + self.windowHeight;
            self.animationLength = self.animationTriggerEnd - self.animationTriggerStart;

            if (self.triggerPosition > self.animationTriggerStart && self.triggerPosition < self.animationTriggerEnd + self.thisHeight) {
                self.$element.addClass('active');
                self.state.isOnScreen = true;
            }

            else {
                self.$element.removeClass('active');
                self.state.isOnScreen = false;
            }
        }

        subscribe_gyro_event() {
            let self = this,
                last_gamma = 0,
                last_beta = 0,
                current_timestamp = null,
                last_timestamp = Date.now();

            window.addEventListener("deviceorientation", function (e) {
                if (!self.state.isOnScreen) return;

                current_timestamp = Date.now();
                let distance_time = current_timestamp - last_timestamp;
                let distance_beta = e.beta - last_beta;
                let speed_beta = Math.round(distance_beta / distance_time * 100);


                console.log(speed_beta);
                self.animate(speed_beta)

                last_beta = e.beta;
                last_timestamp = current_timestamp;

            }, true);
        }

        subscribe_scroll_event() {
            let self = this;

            $(window).on('scroll resize', function () {
                if (!self.state.isOnScreen) return;

                self.animate(self.get_element_animate_position());
            })
        }

        get_element_animate_position(){
            let centerPixelShift = this.triggerPosition - this.offset_top - (this.animationLength * 0.5),
                centerPercentShift = centerPixelShift / (this.animationLength / 100) * 2;

            return this.settings.shift / 100 * centerPercentShift;
        }

        animate(y){
            TweenLite.to(this.$element, this.settings.duration, {y: y + 'px'});
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