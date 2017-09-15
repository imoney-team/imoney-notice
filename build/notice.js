(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Notice"] = factory();
	else
		root["Notice"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.confirm = exports.force = exports.alert = exports.hideAlerts = exports.setOptions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(2);

var options = {
    alertTime: 3,
    overlayClickDismiss: true,
    overlayOpacity: 0.75,
    transitionCurve: 'ease',
    transitionDuration: 0.3,
    transitionSelector: 'all',
    classes: {
        container: 'ui-notice-container',
        textbox: 'ui-notice-textbox',
        textboxInner: 'ui-notice-textbox-inner',

        button: 'ui-notice-button',
        element: 'ui-notice-element',
        elementHalf: 'ui-notice-element-half',
        elementThird: 'ui-notice-element-third',

        overlay: 'ui-notice-overlay',
        backgroundSuccess: 'ui-notice-success',
        backgroundWarning: 'ui-notice-warning',
        backgroundError: 'ui-notice-error',
        backgroundInfo: 'ui-notice-info',
        backgroundNeutral: 'ui-notice-neutral',
        backgroundOverlay: 'ui-notice-overlay',

        alert: 'ui-notice-alert'
    },
    ids: {
        overlay: 'ui-notice-overlay'
    }
};

var setOptions = exports.setOptions = function setOptions(newOptions) {
    options = _extends({}, options, newOptions, {
        classes: _extends({}, options.classes, newOptions.classes),
        ids: _extends({}, options.ids, newOptions.ids),
        positions: _extends({}, options.positions, newOptions.positions)
    });
};

// ====================
// helpers
// ====================

var tick = function tick() {
    return new Promise(function (resolve) {
        return setTimeout(resolve, 0);
    });
};
var wait = function wait(time) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, time * 1000);
    });
};

var blur = function blur() {
    document.activeElement && document.activeElement.blur();
};

var generateRandomId = function generateRandomId() {
    // RFC4122 version 4 compliant UUID
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
    return 'ui-notice-' + id;
};

var typeToClassLookup = {
    1: options.classes.backgroundSuccess,
    success: options.classes.backgroundSuccess,
    2: options.classes.backgroundWarning,
    warning: options.classes.backgroundWarning,
    3: options.classes.backgroundError,
    error: options.classes.backgroundError,
    4: options.classes.backgroundInfo,
    info: options.classes.backgroundInfo,
    5: options.classes.backgroundNeutral,
    neutral: options.classes.backgroundNeutral
};

var getTransition = function getTransition() {
    return options.transitionSelector + ' ' + options.transitionDuration + 's ' + options.transitionCurve;
};

var enterClicked = function enterClicked(event) {
    return event.keyCode === 13;
};
var escapeClicked = function escapeClicked(event) {
    return event.keyCode === 27;
};

var addToDocument = function addToDocument(element) {
    element.classList.add(options.classes.container);
    document.body.appendChild(element);

    if (element.listener) window.addEventListener('keydown', element.listener);

    tick().then(function () {
        element.style.transition = getTransition();
    });
};

var removeFromDocument = function removeFromDocument(id) {
    var element = document.getElementById(id);
    if (!element) return;

    if (element.listener) window.removeEventListener('keydown', element.listener);

    wait(options.transitionDuration).then(function () {
        if (element.parentNode) element.parentNode.removeChild(element);
    });
};

var addOverlayToDocument = function addOverlayToDocument(owner) {
    var element = document.createElement('div');
    element.id = options.ids.overlay;
    element.classList.add(options.classes.overlay);
    element.classList.add(options.classes.backgroundOverlay);
    element.style.opacity = 0;
    if (owner && options.overlayClickDismiss) {
        element.onclick = function () {
            removeFromDocument(owner.id);
            removeOverlayFromDocument();
        };
    }

    document.body.appendChild(element);

    tick().then(function () {
        element.style.transition = getTransition();
        element.style.opacity = options.overlayOpacity;
    });
};

var removeOverlayFromDocument = function removeOverlayFromDocument() {
    var element = document.getElementById(options.ids.overlay);
    element.style.opacity = 0;
    wait(options.transitionDuration).then(function () {
        if (element.parentNode) element.parentNode.removeChild(element);
    });
};

var hideAlerts = exports.hideAlerts = function hideAlerts(callback) {
    var alertsShowing = document.getElementsByClassName(options.classes.alert);
    if (alertsShowing.length) {
        for (var i = 0; i < alertsShowing.length; i++) {
            var _alert = alertsShowing[i];
            removeFromDocument(_alert.id, _alert.position);
        }
        if (callback) wait(options.transitionDuration).then(function () {
            return callback();
        });
    }
};

// ====================
// exports
// ====================

var alert = exports.alert = function alert(_ref) {
    var _ref$type = _ref.type,
        type = _ref$type === undefined ? 4 : _ref$type,
        text = _ref.text,
        _ref$time = _ref.time,
        time = _ref$time === undefined ? options.alertTime : _ref$time,
        _ref$stay = _ref.stay,
        stay = _ref$stay === undefined ? false : _ref$stay;

    blur();
    hideAlerts();

    var element = document.createElement('div');
    var id = generateRandomId();
    element.id = id;
    element.classList.add(options.classes.textbox);
    element.classList.add(typeToClassLookup[type]);
    element.classList.add(options.classes.alert);
    element.innerHTML = '<div class="' + options.classes.textboxInner + '">' + text + '</div>';
    element.onclick = function () {
        return removeFromDocument(id);
    };

    element.listener = function (event) {
        if (enterClicked(event) || escapeClicked(event)) hideAlerts();
    };

    addToDocument(element);
    if (time && time < 1) time = 1;
    if (!stay && time) wait(time).then(function () {
        return removeFromDocument(id);
    });
};

var force = exports.force = function force(_ref2, callbackArg) {
    var _ref2$type = _ref2.type,
        type = _ref2$type === undefined ? 5 : _ref2$type,
        text = _ref2.text,
        _ref2$buttonText = _ref2.buttonText,
        buttonText = _ref2$buttonText === undefined ? 'OK' : _ref2$buttonText,
        callback = _ref2.callback;

    blur();
    hideAlerts();

    var element = document.createElement('div');
    var id = generateRandomId();
    element.id = id;

    var elementText = document.createElement('div');
    elementText.classList.add(options.classes.textbox);
    elementText.classList.add(options.classes.backgroundInfo);
    elementText.innerHTML = '<div class="' + options.classes.textboxInner + '">' + text + '</div>';

    var elementButton = document.createElement('div');
    elementButton.classList.add(options.classes.button);
    elementButton.classList.add(typeToClassLookup[type]);
    elementButton.innerHTML = buttonText;
    elementButton.onclick = function () {
        removeFromDocument(id);
        removeOverlayFromDocument();
        if (callback) callback();else if (callbackArg) callbackArg();
    };

    element.appendChild(elementText);
    element.appendChild(elementButton);

    element.listener = function (event) {
        if (enterClicked(event)) elementButton.click();
    };

    addToDocument(element);

    addOverlayToDocument();
};

var confirm = exports.confirm = function confirm(_ref3, submitCallbackArg, cancelCallbackArg) {
    var text = _ref3.text,
        _ref3$submitText = _ref3.submitText,
        submitText = _ref3$submitText === undefined ? 'Yes' : _ref3$submitText,
        _ref3$cancelText = _ref3.cancelText,
        cancelText = _ref3$cancelText === undefined ? 'Cancel' : _ref3$cancelText,
        submitCallback = _ref3.submitCallback,
        cancelCallback = _ref3.cancelCallback;

    blur();
    hideAlerts();

    var element = document.createElement('div');
    var id = generateRandomId();
    element.id = id;

    var elementText = document.createElement('div');
    elementText.classList.add(options.classes.textbox);
    elementText.classList.add(options.classes.backgroundInfo);
    elementText.innerHTML = '<div class="' + options.classes.textboxInner + '">' + text + '</div>';

    var elementButtonLeft = document.createElement('div');
    elementButtonLeft.classList.add(options.classes.button);
    elementButtonLeft.classList.add(options.classes.elementHalf);
    elementButtonLeft.classList.add(options.classes.backgroundSuccess);
    elementButtonLeft.innerHTML = submitText;
    elementButtonLeft.onclick = function () {
        removeFromDocument(id);
        removeOverlayFromDocument();
        if (submitCallback) submitCallback();else if (submitCallbackArg) submitCallbackArg();
    };

    var elementButtonRight = document.createElement('div');
    elementButtonRight.classList.add(options.classes.button);
    elementButtonRight.classList.add(options.classes.elementHalf);
    elementButtonRight.classList.add(options.classes.backgroundError);
    elementButtonRight.innerHTML = cancelText;
    elementButtonRight.onclick = function () {
        removeFromDocument(id);
        removeOverlayFromDocument();
        if (cancelCallback) cancelCallback();else if (cancelCallbackArg) cancelCallbackArg();
    };

    element.appendChild(elementText);
    element.appendChild(elementButtonLeft);
    element.appendChild(elementButtonRight);

    element.listener = function (event) {
        if (enterClicked(event)) elementButtonLeft.click();else if (escapeClicked(event)) elementButtonRight.click();
    };

    addToDocument(element);

    addOverlayToDocument(element);
};

exports.default = {
    alert: alert,
    force: force,
    confirm: confirm,
    setOptions: setOptions,
    hideAlerts: hideAlerts
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});