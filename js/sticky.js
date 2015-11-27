(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.Sticky = factory(root);
    }
})(this, function (root) {

    'use strict';

    var util = {
        isSupportSticky: (function(property, value){
            var prop = property + ':',
                el = document.createElement( 'test' ),
                mStyle = el.style;
                mStyle.cssText = prop + [ '-webkit-', '-moz-', '-ms-', '-o-', '' ].join( value + ';' + prop ) + value + ';';
            return mStyle[ property ].indexOf( value ) !== -1;
        })('position', 'sticky'),

        extend: function() {
            var newObj = {};
            for (var i = 0; i < arguments.length; i++) {
                var obj = arguments[i];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        newObj[key] = obj[key];
                    }
                }
            }
            return newObj;
        },

        isString: function(a){ 
            return typeof a === 'string'; 
        }, 

        each: function(arr, fn) {
            Array.prototype.forEach.call(arr, fn);
        },

        throttle: function(fn, delay, mustRunDelay) {
            var timer = null;
            var t_start;
            return function() {
                var context = this, args = arguments, t_curr = +new Date();
                clearTimeout(timer);
                if (!t_start){
                    t_start = t_curr;
                }
                if (t_curr - t_start >= mustRunDelay){
                    fn.apply(context, args);
                    t_start = t_curr;
                } else {
                    timer = setTimeout(function(){
                        fn.apply(context, args);
                    }, delay);
                }   
            };
        }
    }

    function Sticky(options) {

        if (!options.wrap || !options.bar) {
            throw '缺少必要参数';
        }

        this.top = options.top || 0;
        this.wrap = document.querySelectorAll(options.wrap);
        this.bar = document.querySelectorAll(options.bar);
        this.barString = options.bar;
        this.stickyClass = 'sticky-fixed';

        this.init();
    }


    Sticky.prototype = {
        constructor: Sticky,
        init: function() {
            util.isSupportSticky ? this.support() : this.unsupport();
        },
        support: function() {
            var that = this;
            util.each(this.bar, function(e, i) {
                e.style.position = '-webkit-sticky';
                e.style.top = that.top + 'px';
            });
        },
        unsupport: function() {
            var that = this;
            this.insertBarDiv();
            window.addEventListener('scroll', function() {
                util.throttle(that.scroll(), 80, 80);
            }, false);
        },
        insertBarDiv: function() {
            var that = this;
            util.each(this.bar, function(e, i) {
                var div = document.createElement('DIV');
                div.style.cssText += 'padding: 0; margin: 0; float: none; display: none; height: ' + e.offsetHeight + 'px';
                e.parentNode.insertBefore(div, e);
            });
        },
        scroll: function() {
            var that = this;
            var st = document.body.scrollTop + that.top;
            util.each(that.wrap, function(e, i) {
                var currentBox = e.querySelector(that.barString);
                var et = e.offsetTop;
                var eh = e.offsetHeight - currentBox.offsetHeight; 
                
                if (st > et && st < et + eh) {
                    if (!currentBox.classList.contains(that.stickyClass)) {
                        currentBox.previousSibling.style.display = 'block';
                        currentBox.classList.add(that.stickyClass);
                    }
                    currentBox.style.cssText = '';
                } else if (st >= et + eh) {
                    currentBox.previousSibling.style.display = 'block';
                    currentBox.style.cssText += 'position: absolute; marginTop: 0; top:' + (e.offsetHeight - currentBox.offsetHeight) + 'px';
                } else {
                    currentBox.previousSibling.style.display = 'none';
                    currentBox.style.cssText = '';
                    currentBox.classList.remove(that.stickyClass);
                }
            });
        }
    }

    return Sticky;

});