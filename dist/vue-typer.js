/*!
 * vue-typer v1.0.4
 * Copyright 2016-2017 Chris Nguyen
 * Released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueTyper"] = factory();
	else
		root["VueTyper"] = factory();
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(29)
  , hide      = __webpack_require__(33)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(35)
  , defined = __webpack_require__(6);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(58)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(57)

var Component = __webpack_require__(10)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(55),
  /* scopeId */
  "data-v-c41bac74",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VueTyper = undefined;

var _VueTyper = __webpack_require__(12);

var _VueTyper2 = _interopRequireDefault(_VueTyper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VueTyper = exports.VueTyper = _VueTyper2.default;

exports.default = {
  install: function install(Vue) {
    Vue.component('vue-typer', _VueTyper2.default);
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFinite = __webpack_require__(19);

var _isFinite2 = _interopRequireDefault(_isFinite);

var _isNan = __webpack_require__(20);

var _isNan2 = _interopRequireDefault(_isNan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validNumber(val) {
  return typeof val === 'number' && !(0, _isNan2.default)(val) && (0, _isFinite2.default)(val);
}

function validRange(lower, upper) {
  return validNumber(lower) && validNumber(upper) && lower <= upper;
}

exports.default = function (min, max) {
  if (!validRange(min, max)) {
    return -1;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (a1, a2) {
  if (!Array.isArray(a1) || !Array.isArray(a2)) {
    return false;
  }

  if (a1.length !== a2.length) {
    return false;
  }

  for (var i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }

  return true;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _randomInt = __webpack_require__(14);

var _randomInt2 = _interopRequireDefault(_randomInt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function swap(a, i, j) {
  if (i === j) {
    return;
  }
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

exports.default = function (list) {
  if (!(list instanceof Array)) {
    return;
  }

  for (var i = list.length - 1; i > 0; i--) {
    var randomIndex = (0, _randomInt2.default)(0, i);
    swap(list, i, randomIndex);
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var ANIMATION_CLASS_PREFIX = 'vue-typer-caret-';

exports.default = {
  props: {
    animation: {
      type: String,
      default: 'blink',
      validator: function validator(value) {
        return (/^solid$|^blink$|^smooth$|^phase$|^expand$/.test(value)
        );
      }
    }
  },
  computed: {
    animationClass: function animationClass() {
      return ANIMATION_CLASS_PREFIX + this.animation;
    }
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(21);

var _keys2 = _interopRequireDefault(_keys);

var _Caret = __webpack_require__(53);

var _Caret2 = _interopRequireDefault(_Caret);

var _shallowEquals = __webpack_require__(15);

var _shallowEquals2 = _interopRequireDefault(_shallowEquals);

var _shuffle = __webpack_require__(16);

var _shuffle2 = _interopRequireDefault(_shuffle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATE = {
  IDLE: 'idle',
  TYPING: 'typing',
  ERASING: 'erasing',
  COMPLETE: 'complete'
};

var ERASE_STYLE = {
  BACKSPACE: 'backspace',
  SELECT_BACK: 'select-back',
  SELECT_ALL: 'select-all',
  CLEAR: 'clear'
};

exports.default = {
  name: 'VueTyper',
  components: {
    Caret: _Caret2.default
  },
  props: {
    text: {
      type: [String, Array],
      required: true,
      validator: function validator(value) {
        if (typeof value === 'string') {
          return value.length > 0;
        }
        return value.every(function (item) {
          return typeof item === 'string' && item.length > 0;
        });
      }
    },

    repeat: {
      type: Number,
      default: Infinity,
      validator: function validator(value) {
        return value >= 0;
      }
    },

    shuffle: {
      type: Boolean,
      default: false
    },

    initialAction: {
      type: String,
      default: STATE.TYPING,
      validator: function validator(value) {
        return !!value.match('^' + STATE.TYPING + '|' + STATE.ERASING + '$');
      }
    },

    preTypeDelay: {
      type: Number,
      default: 70,
      validator: function validator(value) {
        return value >= 0;
      }
    },

    typeDelay: {
      type: Number,
      default: 70,
      validator: function validator(value) {
        return value >= 0;
      }
    },

    preEraseDelay: {
      type: Number,
      default: 2000,
      validator: function validator(value) {
        return value >= 0;
      }
    },

    eraseDelay: {
      type: Number,
      default: 250,
      validator: function validator(value) {
        return value >= 0;
      }
    },

    eraseStyle: {
      type: String,
      default: ERASE_STYLE.SELECT_ALL,
      validator: function validator(value) {
        return (0, _keys2.default)(ERASE_STYLE).some(function (item) {
          return ERASE_STYLE[item] === value;
        });
      }
    },

    eraseOnComplete: {
      type: Boolean,
      default: false
    },

    caretAnimation: String
  },
  data: function data() {
    return {
      state: STATE.IDLE,
      repeatCounter: 0,
      actionTimeout: 0,
      actionInterval: 0,

      spool: [],
      spoolIndex: -1,
      previousTextIndex: -1,
      currentTextIndex: -1
    };
  },

  computed: {
    caretClasses: function caretClasses() {
      return {
        idle: this.state === STATE.IDLE,
        typing: this.state === STATE.TYPING,
        selecting: this.state === STATE.ERASING && this.isSelectionBasedEraseStyle,
        erasing: this.state === STATE.ERASING && !this.isSelectionBasedEraseStyle,
        complete: this.state === STATE.COMPLETE
      };
    },
    rightCharClasses: function rightCharClasses() {
      return {
        selected: this.state === STATE.ERASING && this.isSelectionBasedEraseStyle,
        erased: this.state !== STATE.ERASING || this.state === STATE.ERASING && !this.isSelectionBasedEraseStyle
      };
    },
    isSelectionBasedEraseStyle: function isSelectionBasedEraseStyle() {
      return !!this.eraseStyle.match('^' + ERASE_STYLE.SELECT_BACK + '|' + ERASE_STYLE.SELECT_ALL + '$');
    },
    isEraseAllStyle: function isEraseAllStyle() {
      return !!this.eraseStyle.match('^' + ERASE_STYLE.CLEAR + '|' + ERASE_STYLE.SELECT_ALL + '$');
    },
    isDoneTyping: function isDoneTyping() {
      return this.currentTextIndex >= this.currentText.length;
    },
    isDoneErasing: function isDoneErasing() {
      if (this.isSelectionBasedEraseStyle) {
        return this.currentTextIndex <= 0 && this.previousTextIndex <= 0;
      }
      return this.currentTextIndex <= 0;
    },
    onLastWord: function onLastWord() {
      return this.spoolIndex === this.spool.length - 1;
    },
    shouldRepeat: function shouldRepeat() {
      return this.repeatCounter < this.repeat;
    },
    currentText: function currentText() {
      if (this.spoolIndex >= 0 && this.spoolIndex < this.spool.length) {
        return this.spool[this.spoolIndex];
      }
      return '';
    },
    currentTextArray: function currentTextArray() {
      return this.currentText.split('');
    },
    numLeftChars: function numLeftChars() {
      return this.currentTextIndex < 0 ? 0 : this.currentTextIndex;
    },
    numRightChars: function numRightChars() {
      return this.currentText.length - this.numLeftChars;
    }
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.cancelCurrentAction();
  },

  methods: {
    init: function init() {
      if (typeof this.text === 'string') {
        this.spool = [this.text];
      } else {
        var textCopy = this.text.slice();
        textCopy = textCopy.filter(function (textToType) {
          return textToType.length;
        });
        this.spool = textCopy;
      }

      this.repeatCounter = 0;
      this.resetSpool();

      if (this.initialAction === STATE.TYPING) {
        this.startTyping();
      } else if (this.initialAction === STATE.ERASING) {
        this.moveCaretToEnd();
        this.onTyped();
      }
    },
    reset: function reset() {
      this.cancelCurrentAction();
      this.init();
    },
    resetSpool: function resetSpool() {
      this.spoolIndex = 0;
      if (this.shuffle && this.spool.length > 1) {
        (0, _shuffle2.default)(this.spool);
      }
    },
    cancelCurrentAction: function cancelCurrentAction() {
      if (this.actionInterval) {
        clearInterval(this.actionInterval);
        this.actionInterval = 0;
      }
      if (this.actionTimeout) {
        clearTimeout(this.actionTimeout);
        this.actionTimeout = 0;
      }
    },
    shiftCaret: function shiftCaret(delta) {
      this.previousTextIndex = this.currentTextIndex;
      var newCaretIndex = this.currentTextIndex + delta;
      this.currentTextIndex = Math.min(Math.max(newCaretIndex, 0), this.currentText.length);
    },
    moveCaretToStart: function moveCaretToStart() {
      this.previousTextIndex = this.currentTextIndex;
      this.currentTextIndex = 0;
    },
    moveCaretToEnd: function moveCaretToEnd() {
      this.previousTextIndex = this.currentTextIndex;
      this.currentTextIndex = this.currentText.length;
    },
    typeStep: function typeStep() {
      if (!this.isDoneTyping) {
        this.shiftCaret(1);
      }

      if (this.isDoneTyping) {
        this.cancelCurrentAction();

        this.$nextTick(this.onTyped);
      }
    },
    eraseStep: function eraseStep() {
      if (!this.isDoneErasing) {
        if (this.isEraseAllStyle) {
          this.moveCaretToStart();
        } else {
          this.shiftCaret(-1);
        }
      }

      if (this.isDoneErasing) {
        this.cancelCurrentAction();

        this.$nextTick(this.onErased);
      }
    },
    startTyping: function startTyping() {
      var _this = this;

      if (this.actionTimeout || this.actionInterval) {
        return;
      }

      this.moveCaretToStart();

      this.state = STATE.IDLE;
      this.actionTimeout = setTimeout(function () {
        _this.state = STATE.TYPING;
        _this.typeStep();
        if (!_this.isDoneTyping) {
          _this.actionInterval = setInterval(_this.typeStep, _this.typeDelay);
        }
      }, this.preTypeDelay);
    },
    startErasing: function startErasing() {
      var _this2 = this;

      if (this.actionTimeout || this.actionInterval) {
        return;
      }

      this.moveCaretToEnd();

      this.state = STATE.IDLE;
      this.actionTimeout = setTimeout(function () {
        _this2.state = STATE.ERASING;
        _this2.eraseStep();
        if (!_this2.isDoneErasing) {
          _this2.actionInterval = setInterval(_this2.eraseStep, _this2.eraseDelay);
        }
      }, this.preEraseDelay);
    },
    onTyped: function onTyped() {
      this.$emit('typed', this.currentText);

      if (this.onLastWord) {
        if (this.eraseOnComplete || this.shouldRepeat) {
          this.startErasing();
        } else {
          this.onComplete();
        }
      } else {
        this.startErasing();
      }
    },
    onErased: function onErased() {
      this.$emit('erased', this.currentText);

      if (this.onLastWord) {
        if (this.shouldRepeat) {
          this.repeatCounter++;
          this.resetSpool();
          this.startTyping();
        } else {
          this.onComplete();
        }
      } else {
        this.spoolIndex++;
        this.startTyping();
      }
    },
    onComplete: function onComplete() {
      this.state = STATE.COMPLETE;
      this.$emit('completed');
    }
  },
  watch: {
    text: function text(newText, oldText) {
      if (newText === oldText || (0, _shallowEquals2.default)(newText, oldText)) {
        return;
      }
      this.reset();
    },
    repeat: function repeat() {
      this.reset();
    },
    shuffle: function shuffle() {
      this.reset();
    }
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(23), __esModule: true };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(24), __esModule: true };

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48);
module.exports = __webpack_require__(0).Number.isFinite;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
module.exports = __webpack_require__(0).Number.isNaN;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8)
  , toLength  = __webpack_require__(44)
  , toIndex   = __webpack_require__(43);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(25);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5)
  , document = __webpack_require__(1).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 32 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(36)
  , createDesc = __webpack_require__(40);
module.exports = __webpack_require__(2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(4)(function(){
  return Object.defineProperty(__webpack_require__(30)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(28);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(26)
  , IE8_DOM_DEFINE = __webpack_require__(34)
  , toPrimitive    = __webpack_require__(46)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(32)
  , toIObject    = __webpack_require__(8)
  , arrayIndexOf = __webpack_require__(27)(false)
  , IE_PROTO     = __webpack_require__(41)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(37)
  , enumBugKeys = __webpack_require__(31);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(4);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(42)('keys')
  , uid    = __webpack_require__(47);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(7)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(7)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(6);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(3)
  , _isFinite = __webpack_require__(1).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(3);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(45)
  , $keys    = __webpack_require__(38);

__webpack_require__(39)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, "@keyframes vue-typer-caret-blink{50%{opacity:0}to{opacity:1}}@keyframes vue-typer-caret-smooth{0%,20%{opacity:1}60%,to{opacity:0}}@keyframes vue-typer-caret-phase{0%,20%{opacity:1}90%,to{opacity:0}}@keyframes vue-typer-caret-expand{0%,20%{transform:scaleY(1)}80%,to{transform:scaleY(0)}}.vue-typer-caret-blink[data-v-a16e0f02]{animation:vue-typer-caret-blink 1s step-start 0s infinite}.vue-typer-caret-smooth[data-v-a16e0f02]{animation:vue-typer-caret-smooth .5s ease-in-out 0s infinite alternate}.vue-typer-caret-phase[data-v-a16e0f02]{animation:vue-typer-caret-phase .5s ease-in-out 0s infinite alternate}.vue-typer-caret-expand[data-v-a16e0f02]{animation:vue-typer-caret-expand .5s ease-in-out 0s infinite alternate}span.caret[data-v-a16e0f02]:empty:before{content:\"\\200B\"}span[data-v-a16e0f02]{display:inline-block;width:1px}.idle[data-v-a16e0f02],.typing[data-v-a16e0f02]{background-color:#000}.selecting[data-v-a16e0f02]{display:none;background-color:#000}.erasing[data-v-a16e0f02]{background-color:#000}.complete[data-v-a16e0f02]{display:none;background-color:#000}", ""]);

// exports


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, "span.vue-typer[data-v-c41bac74]{cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;word-break:break-all}span.vue-typer span.char[data-v-c41bac74]{white-space:pre-wrap}span.vue-typer span.left[data-v-c41bac74],span.vue-typer span.right[data-v-c41bac74]{display:inline}span[data-v-c41bac74]{display:inline-block}.typed[data-v-c41bac74]{color:#000;background-color:transparent}.selected[data-v-c41bac74]{color:#000;background-color:#accef7}.erased[data-v-c41bac74]{display:none}", ""]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(56)

var Component = __webpack_require__(10)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(54),
  /* scopeId */
  "data-v-a16e0f02",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "caret custom",
    class: _vm.animationClass
  })
},staticRenderFns: []}

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "vue-typer"
  }, [_c('span', {
    staticClass: "left"
  }, _vm._l((_vm.numLeftChars), function(l) {
    return _c('span', {
      staticClass: "char custom typed"
    }, [_vm._v(_vm._s(_vm.currentTextArray[l - 1]))])
  })), _c('caret', {
    class: _vm.caretClasses,
    attrs: {
      "animation": _vm.caretAnimation
    }
  }), _c('span', {
    staticClass: "right"
  }, _vm._l((_vm.numRightChars), function(r) {
    return _c('span', {
      staticClass: "char custom",
      class: _vm.rightCharClasses
    }, [_vm._v(_vm._s(_vm.currentTextArray[_vm.numLeftChars + r - 1]))])
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(51);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(11)("0dba035c", content, true);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(11)("0f4cea8e", content, true);

/***/ }),
/* 58 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});