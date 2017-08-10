(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root['start'] = factory());
    });
  } 
  else if (typeof exports === 'object') { 
    module.exports = factory();
  } 
  else {
    root['start'] = factory();
  }
}(this, function () {

var clamp = function (min, max) {
   
    if (typeof max === 'undefined') {
        max = min;
        min = 0;
    }
 
    if (min > max) {
        var tmp = min;
        min = max;
        max = tmp;
    }

    return function (value) {
        return Math.min(Math.max(value, min), max);
    };
};

 
var mergeOptions = function (opts, defaultOptions) {
    var options = {};

    Object.keys(defaultOptions).map(function (key) {
        if (opts && opts.hasOwnProperty(key)) {
            options[key] = opts[key];
        } else {
            options[key] = defaultOptions[key];
        }
    });

    return options;
};

var start = function (slider, opts) {
    var position;
    var slidesWidth;
    var frameWidth;
    var slides;

    var index   = 0;
    var options = {};

    var transitionEndCallback;

  
    if (typeof jQuery !== 'undefined' && slider instanceof jQuery) {
        slider = slider[0];
    }

 
    var frame          = slider.querySelector('.js_frame');
    var slideContainer = frame.querySelector('.js_slides');
    var prevCtrl       = slider.querySelector('.js_prev');
    var nextCtrl       = slider.querySelector('.js_next');

    var defaults = {
        slidesToScroll: 1,
        slideSpeed: 300,
        rewindSpeed: 600,
        snapBackSpeed: 200,
        ease: 'ease',
        rewind: false,
        infinite: false,
        beforeInit: function () {
            return true;
        },
        afterInit: function () {
            return true;
        },
        beforePrev: function () {
            return true;
        },
        beforeNext: function () {
            return true;
        },
        beforeMove: function () {
            return true;
        },
        beforeResize: function () {
            return true;
        }
    };

    var setupInfinite = function (slideArray) {
        var front = slideArray.slice(0, options.infinite);
        var back  = slideArray.slice(slideArray.length - options.infinite, slideArray.length);

        front.forEach(function (element) {
            var cloned = element.cloneNode(true);
            slideContainer.appendChild(cloned);
        });

        back.reverse().forEach(function (element) {
            var cloned = element.cloneNode(true);
            slideContainer.insertBefore(cloned, slideContainer.firstChild);
        });

        slideContainer.addEventListener('webkitTransitionEnd', onTransitionEnd);
        slideContainer.addEventListener('msTransitionEnd', onTransitionEnd);
        slideContainer.addEventListener('oTransitionEnd', onTransitionEnd);
        slideContainer.addEventListener('otransitionend', onTransitionEnd);
        slideContainer.addEventListener('transitionend', onTransitionEnd);

        return Array.prototype.slice.call(slideContainer.children);
    };

    var setup = function () {
        options = mergeOptions(opts, defaults);
        options.beforeInit();

        position = {
            x: slideContainer.offsetLeft,
            y: slideContainer.offsetTop
        };

        if (options.infinite) {
            slides = setupInfinite(Array.prototype.slice.call(slideContainer.children));
        } else {
            slides = Array.prototype.slice.call(slideContainer.children);
        }

        resetSlider();

        if (prevCtrl && nextCtrl) {
            prevCtrl.addEventListener('click', prev);
            nextCtrl.addEventListener('click', next);
        }

        slideContainer.addEventListener('touchstart', onTouchstart);

        window.addEventListener('resize', onResize);
        options.afterInit();
    };


    var resetSlider = function () {
        slidesWidth = slideContainer.getBoundingClientRect().width || slideContainer.offsetWidth;
        frameWidth  = frame.getBoundingClientRect().width || frame.offsetWidth;

        index = 0;

        if (options.infinite) {
            translate(slides[index + options.infinite].offsetLeft * -1, 0, null);

            index      = index + options.infinite;
            position.x = slides[index].offsetLeft * -1;
        } else {
            translate(0, options.rewindSpeed, options.ease);
        }
    };

    var prev = function () {
        options.beforePrev();
		options.slidesToScroll=1;
        slide(false, false);
    };

 
    var next = function () {
        options.beforeNext();
		options.slidesToScroll=1;
        slide(false, true);
    };

 
    var translate = function (to, duration, ease) {
        var style = slideContainer && slideContainer.style;

        if (!style) {
            return;
        }

        style.webkitTransitionTimingFunction =
        style.MozTransitionTimingFunction    =
        style.msTransitionTimingFunction     =
        style.OTransitionTimingFunction      =
        style.transitionTimingFunction       = ease;

        style.webkitTransitionDuration =
        style.MozTransitionDuration    =
        style.msTransitionDuration     =
        style.OTransitionDuration      =
        style.transitionDuration       = duration + 'ms';

        style.webkitTransform = 'translate3d(' + to + 'px, 0, 0)';

        style.msTransform  =
        style.MozTransform =
        style.OTransform   = 'translateX(' + to + 'px)';
    };

 
    var slide = function (nextIndex, direction) {
        var maxOffset   = (slidesWidth - frameWidth);
        var limitIndex  = clamp(0, slides.length - 1);
        var limitOffset = clamp(maxOffset * -1, 0);
        var duration    = options.slideSpeed;

        if (!nextIndex) {
            if (direction) {
                nextIndex = index + options.slidesToScroll;
            } else {
                nextIndex = index - options.slidesToScroll;
            }
        }

        nextIndex = limitIndex(nextIndex);

        var nextOffset = limitOffset(slides[nextIndex].offsetLeft * -1);

        if (options.rewind && Math.abs(position.x) === maxOffset && direction) {
            nextOffset = 0;
            nextIndex  = 0;
            duration   = options.rewindSpeed;
        }

        translate(nextOffset, duration, options.ease);

        position.x = nextOffset;

        if (slides[nextIndex].offsetLeft <= maxOffset) {
            index = nextIndex;
        }

        if (options.infinite && Math.abs(nextOffset) === maxOffset && direction) {
            index      = options.infinite;
            position.x = slides[index].offsetLeft * -1;

            transitionEndCallback = function () {
                translate(slides[index].offsetLeft * -1, 0, null);
            };
        }

        if (options.infinite && Math.abs(nextOffset) === 0 && !direction) {
            index      = slides.length - (options.infinite * 2);
            position.x = slides[index].offsetLeft * -1;

            transitionEndCallback = function () {
                translate(slides[index].offsetLeft * -1, 0, null);
            };
        }
    };

    var touchOffset;
    var delta;
    var isScrolling;

    var onTransitionEnd = function () {
        if (transitionEndCallback) {
            transitionEndCallback();
            transitionEndCallback = undefined;
        }
    };

    var onTouchstart = function (event) {
        options.beforeMove();

        var touches = event.touches[0];

        touchOffset = {
            x: touches.pageX,
            y: touches.pageY,

            time: Date.now()
        };

        isScrolling = undefined;

        delta = {};

        slideContainer.addEventListener('touchmove', onTouchmove);
        slideContainer.addEventListener('touchend', onTouchend);
    };

    var onTouchmove = function (event) {
        var touches = event.touches[0];

        delta = {
            x: touches.pageX - touchOffset.x,
            y: touches.pageY - touchOffset.y
        };
       
		 
        if (typeof isScrolling === 'undefined') {
            isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
        }

        if (!isScrolling) {
            translate(position.x + delta.x, 0, null);
        }
    };

    var onTouchend = function () {
        var duration = Date.now() - touchOffset.time;
 
        var isValid = Number(duration) < 300 &&
            Math.abs(delta.x) > 25 ||
            Math.abs(delta.x) > frameWidth / 3;

        options.slidesToScroll=6;
        var isOutOfBounds = !index && delta.x > 0 ||
            index === slides.length - 1 && delta.x < 0;

        var direction = delta.x < 0;

        if (!isScrolling) {
            if (isValid && !isOutOfBounds) {
                slide(false, direction);
            } else {
                translate(position.x, options.snapBackSpeed);
            }
        }

 
        frame.removeEventListener('touchmove');
        frame.removeEventListener('touchend');
    };

    var onResize = function () {
        options.beforeResize();
        resetSlider();
    };

    // trigger initial setup
    setup();

    return {
        setup: function () {
            setup();
        },

        reset: function () {
            resetSlider();
        },

        slideTo: function (index) {
            slide(index);
        },

        prev: prev,

        next: next
    };
};

return start;

}));
