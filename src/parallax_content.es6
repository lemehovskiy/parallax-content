/*
 Version: 1.0.7
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
                events: ['scroll', 'gyro'],
                gyroSensitivity: 30
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
            self.offsetTop = 0;
            self.animationLength = 0;

            self.state = {
                isOnScreen: false
            }

            self.init();
        }

        init() {
            let self = this;

            self.updateTrigger();

            $(window).on('scroll resize', function () {
                self.updateTrigger();
            })

            self.settings.events.forEach(function (event) {
                if (event == 'scroll') {
                    self.subscribeScrollEvent();
                }
                else if (event == 'gyro') {
                    self.subscribeGyroEvent();
                }
            })
        }

        refresh() {
            let self = this;

            self.animate(self.getElementAnimatePosition());
        }

        updateTrigger() {
            let self = this;

            self.scrollTop = $(window).scrollTop();
            self.windowHeight = $(window).height();
            self.triggerPosition = self.scrollTop + self.windowHeight;
            self.offsetTop = self.$element.offset().top;
            self.animationTriggerStart = self.offsetTop;
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

        subscribeGyroEvent() {
            let self = this,
                lastBeta = 0,
                currentTimestamp = null,
                lastTimestamp = Date.now();

            window.addEventListener("deviceorientation", function (e) {
                if (!self.state.isOnScreen) return;

                currentTimestamp = Date.now();
                let distanceTime = currentTimestamp - lastTimestamp,
                    distanceBeta = e.beta - lastBeta,
                    speed_beta = Math.round(distanceBeta / distanceTime * 100),
                    y = speed_beta / self.settings.gyroSensitivity * self.settings.shift;

                self.animate(y);

                lastBeta = e.beta;
                lastTimestamp = currentTimestamp;

            }, true);
        }

        subscribeScrollEvent() {
            let self = this;

            $(window).on('scroll resize', function () {
                if (!self.state.isOnScreen) return;

                self.animate(self.getElementAnimatePosition());
            })
        }

        getElementAnimatePosition(){
            let centerPixelShift = this.triggerPosition - this.offsetTop - (this.animationLength * 0.5),
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