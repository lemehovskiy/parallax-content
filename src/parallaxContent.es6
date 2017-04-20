(function ($) {


    $.fn.parallaxContent = function (method) {

        var methods = {

            init: function (options) {

                let settings = $.extend({
                    duration: 1.5
                }, options);


                let scrollTop = 0,
                    windowHeight = 0,
                    triggerPosition = 0;


                $(window).on('scroll load', function () {
                    scrollTop = $(window).scrollTop();
                    windowHeight = $(window).height();

                    triggerPosition = scrollTop + windowHeight;
                });


                this.each(function () {


                    let $this = $(this),
                        thisHeight = $this.outerHeight(),
                        animationTriggerStart = 0,
                        animationTriggerEnd = 0,
                        offset = 0,
                        animationLength = 0,
                        animateDuration = $this.data('parallax-shift');



                    $(window).on('load resize', function () {

                        offset = $this.offset();

                        animationTriggerStart = offset.top;

                        animationTriggerEnd = animationTriggerStart + windowHeight;

                        animationLength = animationTriggerEnd - animationTriggerStart;
                    });


                    $(window).on('scroll resize load', function () {

                        if (triggerPosition > animationTriggerStart && triggerPosition < animationTriggerEnd + thisHeight) {

                            $this.addClass('active');

                            let centerPixelShift = triggerPosition - offset.top - (animationLength * 0.5);

                            let centerPercentShift = centerPixelShift / (animationLength / 100) * 2;

                            let y = animateDuration / 100 * centerPercentShift;

                            TweenLite.to($this, settings.duration, {y: y + 'px'});
                            
                        }

                        else {
                            $this.removeClass('active');
                        }

                    })
                    
                });
              
            }
        };


        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('There is no method with the name ' + method + ', for jQuery.parallaxContent');
        }
    };


})(jQuery);
