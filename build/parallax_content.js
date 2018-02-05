/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Version: 1.0.5
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/parallax_content
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
    var ParallaxContent = function ParallaxContent(element, options) {
        _classCallCheck(this, ParallaxContent);

        var self = this;

        self.$element = $(element);

        //extend by function call
        self.settings = $.extend(true, {
            duration: 1.5,
            shift: 10
        }, options);

        //extend by data options
        self.data_options = self.$element.data('parallax-content');
        self.settings = $.extend(true, self.settings, self.data_options);

        var scrollTop = 0,
            windowHeight = 0,
            triggerPosition = 0;

        $(window).on('scroll load', function () {
            scrollTop = $(window).scrollTop();
            windowHeight = $(window).height();

            triggerPosition = scrollTop + windowHeight;
        });

        var thisHeight = self.$element.outerHeight(),
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

                var centerPixelShift = triggerPosition - offset.top - animationLength * 0.5;

                var centerPercentShift = centerPixelShift / (animationLength / 100) * 2;

                var y = animateShift / 100 * centerPercentShift;

                TweenLite.to(self.$element, animateDuration, { y: y + 'px' });
            } else {
                self.$element.removeClass('active');
            }
        });
    };

    $.fn.parallaxContent = function () {
        var $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i = void 0,
            ret = void 0;
        for (i = 0; i < length; i++) {
            if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') $this[i].parallax_content = new ParallaxContent($this[i], opt);else ret = $this[i].parallax_content[opt].apply($this[i].parallax_content, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };
})(jQuery);

/***/ })
/******/ ]);