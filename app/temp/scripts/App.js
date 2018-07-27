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


var _Carousel = __webpack_require__(1);

var _Carousel2 = _interopRequireDefault(_Carousel);

var _Tabs = __webpack_require__(2);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Slideshow = __webpack_require__(3);

var _Slideshow2 = _interopRequireDefault(_Slideshow);

var _Menu = __webpack_require__(4);

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var carouselActions = new _Carousel2.default('carousel--actions');
var carouselNew = new _Carousel2.default('carousel--new');
var carouselFeatured = new _Carousel2.default('carousel--featured');

var carousels = new Array(carouselActions, carouselNew, carouselFeatured);
var tabs = new _Tabs2.default(carousels);
var slideshow = new _Slideshow2.default();
var menu = new _Menu2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import $ from 'jquery';

var Carousel = function () {
    function Carousel(selector) {
        _classCallCheck(this, Carousel);

        this.parent = document.getElementsByClassName(selector)[0];
        this.gallery = this.parent.getElementsByClassName("carousel__gallery")[0];
        this.galleryItems = Array.from(this.gallery.getElementsByClassName("gallery__item"));
        this.prevButton = this.parent.getElementsByClassName("gallery-prev-button")[0];
        this.nextButton = this.parent.getElementsByClassName("gallery-next-button")[0];
        this.isAnimating = false;
        this.viewPortwidth = window.innerWidth;

        this.events();
        this.updateVisibility();
    }

    _createClass(Carousel, [{
        key: "events",
        value: function events() {
            // clicking the gallery navigation
            this.nextButton.onclick = this.showNextItem.bind(this);
            this.prevButton.onclick = this.showPreviousItem.bind(this);

            // resizing the window
            window.onresize = this.updateVisibility.bind(this);
        }
    }, {
        key: "updateVisibility",
        value: function updateVisibility() {
            this.galleryItems.forEach(function (element) {
                var leftOffset = element.getBoundingClientRect().left;
                var width = element.clientWidth;

                if (leftOffset < -width + 40 || leftOffset > this.viewPortwidth /* + (width + 40)*/) {
                    element.classList.add('gallery__item--hidden');
                } else {
                    element.classList.remove('gallery__item--hidden');
                }
            }, this);
        }
    }, {
        key: "showNextItem",
        value: function showNextItem() {
            var _this = this;

            if (!this.isAnimating) {

                //Animate gallery to new position
                this.isAnimating = true;
                this.gallery.classList.add('carousel__gallery--animated');
                this.gallery.style.left = "-240px";

                //Move first item to end of line after finishing animation
                setTimeout(function () {
                    _this.gallery.classList.remove('carousel__gallery--animated');
                    _this.gallery.insertBefore(_this.gallery.firstElementChild, _this.gallery.lastElementChild.nextSibling);
                    _this.gallery.style.left = "0px";
                    _this.isAnimating = false;

                    //Fade in items which has entered viewport
                    _this.updateVisibility();
                }, 200);
            }
            return false;
        }
    }, {
        key: "showPreviousItem",
        value: function showPreviousItem() {
            var _this2 = this;

            if (!this.isAnimating) {

                //Animate gallery to new position
                this.isAnimating = true;
                this.gallery.classList.add('carousel__gallery--animated');
                this.gallery.style.left = "240px";

                //Move last item to start of line after finishing animation
                setTimeout(function () {
                    _this2.gallery.classList.remove('carousel__gallery--animated');
                    _this2.gallery.insertBefore(_this2.gallery.lastElementChild, _this2.gallery.firstElementChild);
                    _this2.gallery.style.left = "0px";
                    _this2.isAnimating = false;

                    //Fade in items which has entered viewport
                    _this2.updateVisibility();
                }, 200);
            }
            return false;
        }
    }]);

    return Carousel;
}();

exports.default = Carousel;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import $ from 'jquery';

var Tabs = function () {
    function Tabs(children) {
        _classCallCheck(this, Tabs);

        this.navigation = document.getElementsByClassName("tabs__navigation")[0];
        this.navigationItems = Array.from(document.getElementsByClassName("tabs__navigation-item"));
        this.contentItems = Array.from(document.getElementsByClassName("tabs__content-item"));
        this.activeTab = Array.from(document.getElementsByClassName("tabs__content-item"))[0];
        this.children = children;

        this.events();
    }

    _createClass(Tabs, [{
        key: "events",
        value: function events() {
            var that = this;
            this.navigationItems.forEach(function (element, index) {
                element.onclick = that.showTab.bind(that, element, index);
            });
        }
    }, {
        key: "showTab",
        value: function showTab(clickedElement, indexClickedElement) {
            var _this = this;

            //Make the clicked tab navigation item active
            this.navigationItems.forEach(function (element, index) {
                if (index === indexClickedElement) {
                    element.classList.add('tabs__navigation-item--active');
                } else {
                    element.classList.remove('tabs__navigation-item--active');
                }
            });

            //Show the content from choosen tab
            this.contentItems.forEach(function (contentItem, index) {
                if (index === indexClickedElement) {
                    //Add small delay to let animation finish
                    setTimeout(function () {
                        contentItem.classList.add('tabs__content-item--active');
                    }, 200);
                } else {
                    contentItem.classList.remove('tabs__content-item--active');
                }

                _this.children[index].updateVisibility();
            });

            return false;
        }
    }]);

    return Tabs;
}();

exports.default = Tabs;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slideshow = function () {
    function Slideshow() {
        _classCallCheck(this, Slideshow);

        this.slideshow = document.getElementsByClassName("slideshow")[0];
        this.sliders = Array.from(this.slideshow.getElementsByClassName("slider__slide"));
        this.bulletNavigation = this.slideshow.getElementsByClassName("bullet-navigation")[0];
        this.bullets = Array.from(this.slideshow.getElementsByClassName("bullet-navigation__btn"));
        this.loader = this.slideshow.getElementsByClassName("slideshow__loader")[0];
        this.nextButton = this.slideshow.getElementsByClassName("arrow-navigation--right")[0];
        this.prevButton = this.slideshow.getElementsByClassName("arrow-navigation--left")[0];
        this.animateSlider = true;
        this.animateTimer = null;

        this.events();
        this.startAnimating();
    }

    _createClass(Slideshow, [{
        key: "events",
        value: function events() {
            var that = this;

            //Clicking the bullet navigation
            this.bullets.forEach(function (element, index) {
                element.onclick = that.showSlide.bind(that, index);
            });

            //Clicking the "next" button
            this.nextButton.onclick = this.showNextSlide.bind(this);

            //Clicking the "prev" button
            this.prevButton.onclick = this.showPreviousSlide.bind(this);

            //Hovering over the slideshow
            this.slideshow.addEventListener("mouseenter", function () {
                that.stopAnimating();
            });

            //Stop hovering over the slideshow
            this.slideshow.addEventListener("mouseleave", function () {
                that.startAnimating();
            });

            //Touching the slideshow
            this.slideshow.addEventListener("touchstart", function () {
                that.stopAnimating();
            });

            //Stop touching the slideshow
            this.slideshow.addEventListener("touchend", function () {
                that.startAnimating();
            });
        }
    }, {
        key: "showSlide",
        value: function showSlide(slideNumber) {
            //Show the slide
            this.sliders[slideNumber].classList.add('slider__slide--active');

            //Hide other slides
            this.sliders.forEach(function (slide, index) {
                if (index !== slideNumber) {
                    slide.classList.remove('slider__slide--active');
                }
            });

            //Update bullet navigation
            this.updateBullets();

            return false;
        }
    }, {
        key: "showNextSlide",
        value: function showNextSlide() {
            for (var i = 0; i < this.sliders.length; i++) {
                if (this.sliders[i].classList.contains('slider__slide--active')) {

                    //Hide current slide
                    this.sliders[i].classList.remove('slider__slide--active');

                    //If there is a next item, make active
                    if (i + 1 < this.sliders.length) {
                        this.sliders[i + 1].classList.add('slider__slide--active');

                        //Else make first slide active
                    } else {
                        this.sliders[0].classList.add('slider__slide--active');
                    }
                    //Update bullet navigation
                    this.updateBullets();
                    break;
                }
            }
            return false;
        }
    }, {
        key: "showPreviousSlide",
        value: function showPreviousSlide() {
            for (var i = 0; i < this.sliders.length; i++) {
                if (this.sliders[i].classList.contains('slider__slide--active')) {
                    //Hide current slide
                    this.sliders[i].classList.remove('slider__slide--active');

                    //If there is a previous item, make active
                    if (i - 1 >= 0) {
                        this.sliders[i - 1].classList.add('slider__slide--active');

                        //Else make last slide active
                    } else {
                        this.sliders[this.sliders.length - 1].classList.add('slider__slide--active');
                    }
                    //Update bullet navigation
                    this.updateBullets();
                    break;
                }
            }
            return false;
        }
    }, {
        key: "updateBullets",
        value: function updateBullets() {
            var _this = this;

            this.sliders.forEach(function (slide, index) {
                if (slide.classList.contains('slider__slide--active')) {
                    _this.bullets[index].classList.add('bullet-navigation__btn--active');
                } else {
                    _this.bullets[index].classList.remove('bullet-navigation__btn--active');
                }
            });
        }
    }, {
        key: "startAnimating",
        value: function startAnimating() {
            var _this2 = this;

            this.animateSlider = true;

            this.animateTimer = setInterval(function () {
                if (_this2.animateSlider) {
                    _this2.showNextSlide();
                } else {
                    clearInterval(_this2.animateTimer);
                }
            }, 7500);
        }
    }, {
        key: "stopAnimating",
        value: function stopAnimating() {
            this.animateSlider = false;
            clearInterval(this.animateTimer);
        }
    }]);

    return Slideshow;
}();

exports.default = Slideshow;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
    function Menu() {
        _classCallCheck(this, Menu);

        console.log("const");
        this.navBar = document.getElementsByClassName("nav-bar")[0];
        this.menuIcon = this.navBar.getElementsByClassName("nav-bar__icon")[0];
        this.menu = this.navBar.getElementsByClassName("primary-nav")[0];
        this.events();
    }

    _createClass(Menu, [{
        key: "events",
        value: function events() {
            this.menuIcon.click(this.toggleTheMenu.bind(this));
            console.log(this.menuIcon);
        }
    }, {
        key: "toggleTheMenu",
        value: function toggleTheMenu() {
            console.log("iets");

            this.menu.toggleClass("primary-nav--visible");
            this.menuIcon.classList.toggle("nav-bar__icon--close-x");
        }
    }]);

    return Menu;
}();

exports.default = Menu;

/***/ })
/******/ ]);