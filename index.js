import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
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
var _export = $export;

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared$1 = _shared('keys');

var _sharedKey = function (key) {
  return shared$1[key] || (shared$1[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var assign$2 = createCommonjsModule(function (module) {
module.exports = { "default": assign, __esModule: true };
});

unwrapExports(assign$2);

var _extends = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _assign2 = _interopRequireDefault(assign$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
});

var _extends$1 = unwrapExports(_extends);

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$2 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty, __esModule: true };
});

unwrapExports(defineProperty$2);

var defineProperty$4 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
});

var _defineProperty$1 = unwrapExports(defineProperty$4);

var objectWithoutProperties = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};
});

var _objectWithoutProperties = unwrapExports(objectWithoutProperties);

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction_1;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning;

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject$1(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject$1(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty$1.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

if (process.env.NODE_ENV !== 'production') {
  var invariant$2 = invariant_1;
  var warning$1 = warning_1;
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$2(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }
        warning$1(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$1(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning_1(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning_1(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction_1.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    invariant_1(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ('object' !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof undefined === 'function' && typeof undefined.amd === 'object' && undefined.amd) {
		// register as 'classnames', consistent with npm package name
		undefined('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());
});

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

var keys = _core.Object.keys;

var keys$2 = createCommonjsModule(function (module) {
module.exports = { "default": keys, __esModule: true };
});

var _Object$keys = unwrapExports(keys$2);

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$1 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$1)) return O[IE_PROTO$1];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

// 19.1.2.9 Object.getPrototypeOf(O)



_objectSap('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return _objectGpo(_toObject(it));
  };
});

var getPrototypeOf$1 = _core.Object.getPrototypeOf;

var getPrototypeOf$3 = createCommonjsModule(function (module) {
module.exports = { "default": getPrototypeOf$1, __esModule: true };
});

var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$3);

var classCallCheck = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

var createClass = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _redefine = _hide;

var _iterators = {};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$2 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$2] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && !_has(IteratorPrototype, ITERATOR)) _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

var f$3 = _wks;

var _wksExt = {
	f: f$3
};

var iterator = _wksExt.f('iterator');

var iterator$2 = createCommonjsModule(function (module) {
module.exports = { "default": iterator, __esModule: true };
});

unwrapExports(iterator$2);

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});

var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var defineProperty$5 = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$5($Symbol, name, { value: _wksExt.f(name) });
};

// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$4
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
	f: f$5
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$6
};

// ECMAScript 6 symbols shim





var META = _meta.KEY;



















var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$1(ObjectProto$1, key);
  if (protoDesc) delete ObjectProto$1[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty$1 = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty$1(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty$1(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty$1;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty$1,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!_isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var symbol = _core.Symbol;

var symbol$2 = createCommonjsModule(function (module) {
module.exports = { "default": symbol, __esModule: true };
});

unwrapExports(symbol$2);

var _typeof_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _iterator2 = _interopRequireDefault(iterator$2);



var _symbol2 = _interopRequireDefault(symbol$2);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

var _typeof = unwrapExports(_typeof_1);

var possibleConstructorReturn = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
});

var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

var setPrototypeOf = _core.Object.setPrototypeOf;

var setPrototypeOf$2 = createCommonjsModule(function (module) {
module.exports = { "default": setPrototypeOf, __esModule: true };
});

unwrapExports(setPrototypeOf$2);

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
_export(_export.S, 'Object', { create: _objectCreate });

var $Object$1 = _core.Object;
var create$1 = function create(P, D) {
  return $Object$1.create(P, D);
};

var create$3 = createCommonjsModule(function (module) {
module.exports = { "default": create$1, __esModule: true };
});

unwrapExports(create$3);

var inherits = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf$2);



var _create2 = _interopRequireDefault(create$3);



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
});

var _inherits = unwrapExports(inherits);

var _redefineAll = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$1 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

var SPECIES = _wks('species');

var _setSpecies = function (KEY) {
  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

var _validateCollection = function (it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

var dP$2 = _objectDp.f;









var fastKey = _meta.fastKey;

var SIZE = _descriptors ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = _objectCreate(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = _validateCollection(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        _validateCollection(this, NAME);
        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });
    if (_descriptors) dP$2(C.prototype, 'size', {
      get: function () {
        return _validateCollection(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    _iterDefine(C, NAME, function (iterated, kind) {
      this._t = _validateCollection(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return _iterStep(1);
      }
      // return step by kind
      if (kind == 'keys') return _iterStep(0, entry.k);
      if (kind == 'values') return _iterStep(0, entry.v);
      return _iterStep(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    _setSpecies(NAME);
  }
};

var SPECIES$1 = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var dP$3 = _objectDp.f;
var each = _arrayMethods(0);


var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!_descriptors || typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    _redefineAll(C.prototype, methods);
    _meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      _anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) _forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) _hide(C.prototype, KEY, function (a, b) {
        _anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !_isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP$3(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  _setToStringTag(C, NAME);

  O[NAME] = C;
  _export(_export.G + _export.W + _export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

var MAP = 'Map';

// 23.1 Map Objects
var es6_map = _collection(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
  }
}, _collectionStrong, true);

var _arrayFromIterable = function (iter, ITERATOR) {
  var result = [];
  _forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


var _collectionToJson = function (NAME) {
  return function toJSON() {
    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return _arrayFromIterable(this);
  };
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


_export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

// https://tc39.github.io/proposal-setmap-offrom/


var _setCollectionOf = function (COLLECTION) {
  _export(_export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
_setCollectionOf('Map');

// https://tc39.github.io/proposal-setmap-offrom/





var _setCollectionFrom = function (COLLECTION) {
  _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    _aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) _aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = _ctx(mapFn, arguments[2], 2);
      _forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      _forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
_setCollectionFrom('Map');

var map = _core.Map;

var map$2 = createCommonjsModule(function (module) {
module.exports = { "default": map, __esModule: true };
});

var _Map = unwrapExports(map$2);

// 20.1.2.10 Number.MIN_SAFE_INTEGER


_export(_export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

var minSafeInteger = -0x1fffffffffffff;

var minSafeInteger$2 = createCommonjsModule(function (module) {
module.exports = { "default": minSafeInteger, __esModule: true };
});

var _Number$MIN_SAFE_INTEGER = unwrapExports(minSafeInteger$2);

/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = process.env.NODE_ENV !== 'production';

var warning$2 = function() {};

if (__DEV__) {
  warning$2 = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

var warning_1$2 = warning$2;

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

var defineProperty$6 = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf$4 = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf$4 && getPrototypeOf$4(Object);

var hoistNonReactStatics = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf$4(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols$1) {
            keys = keys.concat(getOwnPropertySymbols$1(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty$6(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};

var getDisplayName_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;
var getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

exports.default = getDisplayName;
});

var getDisplayName = unwrapExports(getDisplayName_1);

var wrapDisplayName_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _getDisplayName2 = _interopRequireDefault(getDisplayName_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + '(' + (0, _getDisplayName2.default)(BaseComponent) + ')';
};

exports.default = wrapDisplayName;
});

var wrapDisplayName = unwrapExports(wrapDisplayName_1);

var ns = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Namespaces to avoid conflicts on the context.
 */
var jss = exports.jss = '64a55d578f856d258dc345b094a2a2b3';
var sheetsRegistry = exports.sheetsRegistry = 'd4bd0baacbc52bbd48bbb9eb24344ecd';
var managers = exports.managers = 'b768b78919504fba9de2c03545c5cd3a';
var sheetOptions = exports.sheetOptions = '6fc570d6bd61383819d0f9e7407c452d';
});

unwrapExports(ns);
var ns_1 = ns.jss;
var ns_2 = ns.sheetsRegistry;
var ns_3 = ns.managers;
var ns_4 = ns.sheetOptions;

var propTypes$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



exports['default'] = {
  jss: (0, propTypes.shape)({
    options: (0, propTypes.shape)({
      createGenerateClassName: propTypes.func.isRequired
    }).isRequired,
    createStyleSheet: propTypes.func.isRequired,
    removeStyleSheet: propTypes.func.isRequired
  }),
  registry: (0, propTypes.shape)({
    add: propTypes.func.isRequired,
    toString: propTypes.func.isRequired
  })
};
});

unwrapExports(propTypes$1);

var contextTypes = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ns$jss$ns$sheetOptio;





var ns$$1 = _interopRequireWildcard(ns);



var _propTypes3 = _interopRequireDefault(propTypes$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports['default'] = (_ns$jss$ns$sheetOptio = {}, _defineProperty(_ns$jss$ns$sheetOptio, ns$$1.jss, _propTypes3['default'].jss), _defineProperty(_ns$jss$ns$sheetOptio, ns$$1.sheetOptions, propTypes.object), _defineProperty(_ns$jss$ns$sheetOptio, ns$$1.sheetsRegistry, _propTypes3['default'].registry), _defineProperty(_ns$jss$ns$sheetOptio, ns$$1.managers, propTypes.object), _ns$jss$ns$sheetOptio);
});

var contextTypes$1 = unwrapExports(contextTypes);

var getDynamicStyles = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Extracts a styles object with only props that contain function values.
 */
exports['default'] = function (styles) {
  // eslint-disable-next-line no-shadow
  function extract(styles) {
    var to = null;

    for (var key in styles) {
      var value = styles[key];
      var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

      if (type === 'function') {
        if (!to) to = {};
        to[key] = value;
      } else if (type === 'object' && value !== null && !Array.isArray(value)) {
        var extracted = extract(value);
        if (extracted) {
          if (!to) to = {};
          to[key] = extracted;
        }
      }
    }

    return to;
  }

  return extract(styles);
};
});

unwrapExports(getDynamicStyles);

var toCssValue_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = toCssValue;
var join = function join(value, by) {
  var result = '';
  for (var i = 0; i < value.length; i++) {
    // Remove !important from the value, it will be readded later.
    if (value[i] === '!important') break;
    if (result) result += by;
    result += value[i];
  }
  return result;
};

/**
 * Converts array values to string.
 *
 * `margin: [['5px', '10px']]` > `margin: 5px 10px;`
 * `border: ['1px', '2px']` > `border: 1px, 2px;`
 * `margin: [['5px', '10px'], '!important']` > `margin: 5px 10px !important;`
 * `color: ['red', !important]` > `color: red !important;`
 */
function toCssValue(value) {
  var ignoreImportant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!Array.isArray(value)) return value;

  var cssValue = '';

  // Support space separated values via `[['5px', '10px']]`.
  if (Array.isArray(value[0])) {
    for (var i = 0; i < value.length; i++) {
      if (value[i] === '!important') break;
      if (cssValue) cssValue += ', ';
      cssValue += join(value[i], ' ');
    }
  } else cssValue = join(value, ', ');

  // Add !important, because it was ignored.
  if (!ignoreImportant && value[value.length - 1] === '!important') {
    cssValue += ' !important';
  }

  return cssValue;
}
});

unwrapExports(toCssValue_1);

var SheetsRegistry_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Sheets registry to access them all at one place.
 */
var SheetsRegistry = function () {
  function SheetsRegistry() {
    _classCallCheck(this, SheetsRegistry);

    this.registry = [];
  }

  _createClass(SheetsRegistry, [{
    key: 'add',


    /**
     * Register a Style Sheet.
     */
    value: function add(sheet) {
      var registry = this.registry;
      var index = sheet.options.index;


      if (registry.indexOf(sheet) !== -1) return;

      if (registry.length === 0 || index >= this.index) {
        registry.push(sheet);
        return;
      }

      // Find a position.
      for (var i = 0; i < registry.length; i++) {
        if (registry[i].options.index > index) {
          registry.splice(i, 0, sheet);
          return;
        }
      }
    }

    /**
     * Reset the registry.
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.registry = [];
    }

    /**
     * Remove a Style Sheet.
     */

  }, {
    key: 'remove',
    value: function remove(sheet) {
      var index = this.registry.indexOf(sheet);
      this.registry.splice(index, 1);
    }

    /**
     * Convert all attached sheets to a CSS string.
     */

  }, {
    key: 'toString',
    value: function toString(options) {
      return this.registry.filter(function (sheet) {
        return sheet.attached;
      }).map(function (sheet) {
        return sheet.toString(options);
      }).join('\n');
    }
  }, {
    key: 'index',


    /**
     * Current highest index number.
     */
    get: function get() {
      return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
    }
  }]);

  return SheetsRegistry;
}();

exports['default'] = SheetsRegistry;
});

unwrapExports(SheetsRegistry_1);

var SheetsManager_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _warning2 = _interopRequireDefault(warning_1$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * SheetsManager is like a WeakMap which is designed to count StyleSheet
 * instances and attach/detach automatically.
 */
var SheetsManager = function () {
  function SheetsManager() {
    _classCallCheck(this, SheetsManager);

    this.sheets = [];
    this.refs = [];
    this.keys = [];
  }

  _createClass(SheetsManager, [{
    key: 'get',
    value: function get(key) {
      var index = this.keys.indexOf(key);
      return this.sheets[index];
    }
  }, {
    key: 'add',
    value: function add(key, sheet) {
      var sheets = this.sheets,
          refs = this.refs,
          keys = this.keys;

      var index = sheets.indexOf(sheet);

      if (index !== -1) return index;

      sheets.push(sheet);
      refs.push(0);
      keys.push(key);

      return sheets.length - 1;
    }
  }, {
    key: 'manage',
    value: function manage(key) {
      var index = this.keys.indexOf(key);
      var sheet = this.sheets[index];
      if (this.refs[index] === 0) sheet.attach();
      this.refs[index]++;
      if (!this.keys[index]) this.keys.splice(index, 0, key);
      return sheet;
    }
  }, {
    key: 'unmanage',
    value: function unmanage(key) {
      var index = this.keys.indexOf(key);
      if (index === -1) {
        // eslint-ignore-next-line no-console
        (0, _warning2['default'])(false, "SheetsManager: can't find sheet to unmanage");
        return;
      }
      if (this.refs[index] > 0) {
        this.refs[index]--;
        if (this.refs[index] === 0) this.sheets[index].detach();
      }
    }
  }, {
    key: 'size',
    get: function get() {
      return this.keys.length;
    }
  }]);

  return SheetsManager;
}();

exports['default'] = SheetsManager;
});

unwrapExports(SheetsManager_1);

var toCss_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = toCss;



var _toCssValue2 = _interopRequireDefault(toCssValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Indent a string.
 * http://jsperf.com/array-join-vs-for
 */
function indentStr(str, indent) {
  var result = '';
  for (var index = 0; index < indent; index++) {
    result += '  ';
  }return result + str;
}

/**
 * Converts a Rule to CSS string.
 */

function toCss(selector, style) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var result = '';

  if (!style) return result;

  var _options$indent = options.indent,
      indent = _options$indent === undefined ? 0 : _options$indent;
  var fallbacks = style.fallbacks;


  indent++;

  // Apply fallbacks first.
  if (fallbacks) {
    // Array syntax {fallbacks: [{prop: value}]}
    if (Array.isArray(fallbacks)) {
      for (var index = 0; index < fallbacks.length; index++) {
        var fallback = fallbacks[index];
        for (var prop in fallback) {
          var value = fallback[prop];
          if (value != null) {
            result += '\n' + indentStr(prop + ': ' + (0, _toCssValue2['default'])(value) + ';', indent);
          }
        }
      }
    } else {
      // Object syntax {fallbacks: {prop: value}}
      for (var _prop in fallbacks) {
        var _value = fallbacks[_prop];
        if (_value != null) {
          result += '\n' + indentStr(_prop + ': ' + (0, _toCssValue2['default'])(_value) + ';', indent);
        }
      }
    }
  }

  for (var _prop2 in style) {
    var _value2 = style[_prop2];
    if (_value2 != null && _prop2 !== 'fallbacks') {
      result += '\n' + indentStr(_prop2 + ': ' + (0, _toCssValue2['default'])(_value2) + ';', indent);
    }
  }

  // Allow empty style in this case, because properties will be added dynamically.
  if (!result && !options.allowEmpty) return result;

  indent--;
  result = indentStr(selector + ' {' + result + '\n', indent) + indentStr('}', indent);

  return result;
}
});

unwrapExports(toCss_1);

var StyleRule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _warning2 = _interopRequireDefault(warning_1$2);



var _toCss2 = _interopRequireDefault(toCss_1);



var _toCssValue2 = _interopRequireDefault(toCssValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyleRule = function () {
  function StyleRule(key, style, options) {
    _classCallCheck(this, StyleRule);

    this.type = 'style';
    this.isProcessed = false;
    var sheet = options.sheet,
        Renderer = options.Renderer,
        selector = options.selector;

    this.key = key;
    this.options = options;
    this.style = style;
    if (selector) this.selectorText = selector;
    this.renderer = sheet ? sheet.renderer : new Renderer();
  }

  /**
   * Set selector string.
   * Attention: use this with caution. Most browsers didn't implement
   * selectorText setter, so this may result in rerendering of entire Style Sheet.
   */


  _createClass(StyleRule, [{
    key: 'prop',


    /**
     * Get or set a style property.
     */
    value: function prop(name, value) {
      // It's a getter.
      if (value === undefined) return this.style[name];

      // Don't do anything if the value has not changed.
      if (this.style[name] === value) return this;

      value = this.options.jss.plugins.onChangeValue(value, name, this);

      var isEmpty = value == null || value === false;
      var isDefined = name in this.style;

      // Value is empty and wasn't defined before.
      if (isEmpty && !isDefined) return this;

      // We are going to remove this value.
      var remove = isEmpty && isDefined;

      if (remove) delete this.style[name];else this.style[name] = value;

      // Renderable is defined if StyleSheet option `link` is true.
      if (this.renderable) {
        if (remove) this.renderer.removeProperty(this.renderable, name);else this.renderer.setProperty(this.renderable, name, value);
        return this;
      }

      var sheet = this.options.sheet;

      if (sheet && sheet.attached) {
        (0, _warning2['default'])(false, 'Rule is not linked. Missing sheet option "link: true".');
      }
      return this;
    }

    /**
     * Apply rule to an element inline.
     */

  }, {
    key: 'applyTo',
    value: function applyTo(renderable) {
      var json = this.toJSON();
      for (var prop in json) {
        this.renderer.setProperty(renderable, prop, json[prop]);
      }return this;
    }

    /**
     * Returns JSON representation of the rule.
     * Fallbacks are not supported.
     * Useful for inline styles.
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = {};
      for (var prop in this.style) {
        var value = this.style[prop];
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') json[prop] = value;else if (Array.isArray(value)) json[prop] = (0, _toCssValue2['default'])(value);
      }
      return json;
    }

    /**
     * Generates a CSS string.
     */

  }, {
    key: 'toString',
    value: function toString(options) {
      var sheet = this.options.sheet;

      var link = sheet ? sheet.options.link : false;
      var opts = link ? _extends({}, options, { allowEmpty: true }) : options;
      return (0, _toCss2['default'])(this.selector, this.style, opts);
    }
  }, {
    key: 'selector',
    set: function set(selector) {
      if (selector === this.selectorText) return;

      this.selectorText = selector;

      if (!this.renderable) return;

      var hasChanged = this.renderer.setSelector(this.renderable, selector);

      // If selector setter is not implemented, rerender the rule.
      if (!hasChanged && this.renderable) {
        var renderable = this.renderer.replaceRule(this.renderable, this);
        if (renderable) this.renderable = renderable;
      }
    }

    /**
     * Get selector string.
     */
    ,
    get: function get() {
      return this.selectorText;
    }
  }]);

  return StyleRule;
}();

exports['default'] = StyleRule;
});

unwrapExports(StyleRule_1);

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);



var es = Object.freeze({
	default: result
});

var _symbolObservable = ( es && result ) || es;

var isObservable = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (value) {
  return value && value[_symbolObservable2['default']] && value === value[_symbolObservable2['default']]();
};
});

unwrapExports(isObservable);

var cloneStyle_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = cloneStyle;



var _isObservable2 = _interopRequireDefault(isObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var isArray = Array.isArray;
function cloneStyle(style) {
  // Support empty values in case user ends up with them by accident.
  if (style == null) return style;

  // Support string value for SimpleRule.
  var typeOfStyle = typeof style === 'undefined' ? 'undefined' : _typeof(style);

  if (typeOfStyle === 'string' || typeOfStyle === 'number' || typeOfStyle === 'function') {
    return style;
  }

  // Support array for FontFaceRule.
  if (isArray(style)) return style.map(cloneStyle);

  // Support Observable styles.  Observables are immutable, so we don't need to
  // copy them.
  if ((0, _isObservable2['default'])(style)) return style;

  var newStyle = {};
  for (var name in style) {
    var value = style[name];
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      newStyle[name] = cloneStyle(value);
      continue;
    }
    newStyle[name] = value;
  }

  return newStyle;
}
});

unwrapExports(cloneStyle_1);

var createRule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = createRule;



var _warning2 = _interopRequireDefault(warning_1$2);



var _StyleRule2 = _interopRequireDefault(StyleRule_1);



var _cloneStyle2 = _interopRequireDefault(cloneStyle_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Create a rule instance.
 */
function createRule() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'unnamed';
  var decl = arguments[1];
  var options = arguments[2];
  var jss = options.jss;

  var declCopy = (0, _cloneStyle2['default'])(decl);

  var rule = jss.plugins.onCreateRule(name, declCopy, options);
  if (rule) return rule;

  // It is an at-rule and it has no instance.
  if (name[0] === '@') {
    (0, _warning2['default'])(false, '[JSS] Unknown at-rule %s', name);
  }

  return new _StyleRule2['default'](name, declCopy, options);
}
});

unwrapExports(createRule_1);

var linkRule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = linkRule;
/**
 * Link rule with CSSStyleRule and nested rules with corresponding nested cssRules if both exists.
 */
function linkRule(rule, cssRule) {
  rule.renderable = cssRule;
  if (rule.rules && cssRule.cssRules) rule.rules.link(cssRule.cssRules);
}
});

unwrapExports(linkRule_1);

var _escape = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
var CSS = commonjsGlobal.CSS;

var env = process.env.NODE_ENV;

var escapeRegex = /([[\].#*$><+~=|^:(),"'`])/g;

exports['default'] = function (str) {
  // We don't need to escape it in production, because we are not using user's
  // input for selectors, we are generating a valid selector.
  if (env === 'production') return str;

  if (!CSS || !CSS.escape) {
    return str.replace(escapeRegex, '\\$1');
  }

  return CSS.escape(str);
};
});

unwrapExports(_escape);

var RuleList_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _createRule2 = _interopRequireDefault(createRule_1);



var _linkRule2 = _interopRequireDefault(linkRule_1);



var _StyleRule2 = _interopRequireDefault(StyleRule_1);



var _escape2 = _interopRequireDefault(_escape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Contains rules objects and allows adding/removing etc.
 * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
 */
var RuleList = function () {

  // Original styles object.
  function RuleList(options) {
    _classCallCheck(this, RuleList);

    this.map = {};
    this.raw = {};
    this.index = [];

    this.options = options;
    this.classes = options.classes;
  }

  /**
   * Create and register rule.
   *
   * Will not render after Style Sheet was rendered the first time.
   */


  // Used to ensure correct rules order.

  // Rules registry for access by .get() method.
  // It contains the same rule registered by name and by selector.


  _createClass(RuleList, [{
    key: 'add',
    value: function add(name, decl, options) {
      var _options = this.options,
          parent = _options.parent,
          sheet = _options.sheet,
          jss = _options.jss,
          Renderer = _options.Renderer,
          generateClassName = _options.generateClassName;


      options = _extends({
        classes: this.classes,
        parent: parent,
        sheet: sheet,
        jss: jss,
        Renderer: Renderer,
        generateClassName: generateClassName
      }, options);

      if (!options.selector && this.classes[name]) {
        options.selector = '.' + (0, _escape2['default'])(this.classes[name]);
      }

      this.raw[name] = decl;

      var rule = (0, _createRule2['default'])(name, decl, options);

      var className = void 0;

      if (!options.selector && rule instanceof _StyleRule2['default']) {
        className = generateClassName(rule, sheet);
        rule.selector = '.' + (0, _escape2['default'])(className);
      }

      this.register(rule, className);

      var index = options.index === undefined ? this.index.length : options.index;
      this.index.splice(index, 0, rule);

      return rule;
    }

    /**
     * Get a rule.
     */

  }, {
    key: 'get',
    value: function get(name) {
      return this.map[name];
    }

    /**
     * Delete a rule.
     */

  }, {
    key: 'remove',
    value: function remove(rule) {
      this.unregister(rule);
      this.index.splice(this.indexOf(rule), 1);
    }

    /**
     * Get index of a rule.
     */

  }, {
    key: 'indexOf',
    value: function indexOf(rule) {
      return this.index.indexOf(rule);
    }

    /**
     * Run `onProcessRule()` plugins on every rule.
     */

  }, {
    key: 'process',
    value: function process() {
      var plugins = this.options.jss.plugins;
      // We need to clone array because if we modify the index somewhere else during a loop
      // we end up with very hard-to-track-down side effects.

      this.index.slice(0).forEach(plugins.onProcessRule, plugins);
    }

    /**
     * Register a rule in `.map` and `.classes` maps.
     */

  }, {
    key: 'register',
    value: function register(rule, className) {
      this.map[rule.key] = rule;
      if (rule instanceof _StyleRule2['default']) {
        this.map[rule.selector] = rule;
        if (className) this.classes[rule.key] = className;
      }
    }

    /**
     * Unregister a rule.
     */

  }, {
    key: 'unregister',
    value: function unregister(rule) {
      delete this.map[rule.key];
      if (rule instanceof _StyleRule2['default']) {
        delete this.map[rule.selector];
        delete this.classes[rule.key];
      }
    }

    /**
     * Update the function values with a new data.
     */

  }, {
    key: 'update',
    value: function update(name, data) {
      var _options2 = this.options,
          plugins = _options2.jss.plugins,
          sheet = _options2.sheet;

      if (typeof name === 'string') {
        plugins.onUpdate(data, this.get(name), sheet);
        return;
      }

      for (var index = 0; index < this.index.length; index++) {
        plugins.onUpdate(name, this.index[index], sheet);
      }
    }

    /**
     * Link renderable rules with CSSRuleList.
     */

  }, {
    key: 'link',
    value: function link(cssRules) {
      var map = this.options.sheet.renderer.getUnescapedKeysMap(this.index);

      for (var i = 0; i < cssRules.length; i++) {
        var cssRule = cssRules[i];
        var _key = this.options.sheet.renderer.getKey(cssRule);
        if (map[_key]) _key = map[_key];
        var rule = this.map[_key];
        if (rule) (0, _linkRule2['default'])(rule, cssRule);
      }
    }

    /**
     * Convert rules to a CSS string.
     */

  }, {
    key: 'toString',
    value: function toString(options) {
      var str = '';
      var sheet = this.options.sheet;

      var link = sheet ? sheet.options.link : false;

      for (var index = 0; index < this.index.length; index++) {
        var rule = this.index[index];
        var css = rule.toString(options);

        // No need to render an empty rule.
        if (!css && !link) continue;

        if (str) str += '\n';
        str += css;
      }

      return str;
    }
  }]);

  return RuleList;
}();

exports['default'] = RuleList;
});

unwrapExports(RuleList_1);

var sheets = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _SheetsRegistry2 = _interopRequireDefault(SheetsRegistry_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * This is a global sheets registry. Only DomRenderer will add sheets to it.
 * On the server one should use an own SheetsRegistry instance and add the
 * sheets to it, because you need to make sure to create a new registry for
 * each request in order to not leak sheets across requests.
 */
exports['default'] = new _SheetsRegistry2['default']();
});

unwrapExports(sheets);

var StyleSheet_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _linkRule2 = _interopRequireDefault(linkRule_1);



var _RuleList2 = _interopRequireDefault(RuleList_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyleSheet = function () {
  function StyleSheet(styles, options) {
    _classCallCheck(this, StyleSheet);

    this.attached = false;
    this.deployed = false;
    this.linked = false;
    this.classes = {};
    this.options = _extends({}, options, {
      sheet: this,
      parent: this,
      classes: this.classes
    });
    this.renderer = new options.Renderer(this);
    this.rules = new _RuleList2['default'](this.options);

    for (var name in styles) {
      this.rules.add(name, styles[name]);
    }

    this.rules.process();
  }

  /**
   * Attach renderable to the render tree.
   */


  _createClass(StyleSheet, [{
    key: 'attach',
    value: function attach() {
      if (this.attached) return this;
      if (!this.deployed) this.deploy();
      this.renderer.attach();
      if (!this.linked && this.options.link) this.link();
      this.attached = true;
      return this;
    }

    /**
     * Remove renderable from render tree.
     */

  }, {
    key: 'detach',
    value: function detach() {
      if (!this.attached) return this;
      this.renderer.detach();
      this.attached = false;
      return this;
    }

    /**
     * Add a rule to the current stylesheet.
     * Will insert a rule also after the stylesheet has been rendered first time.
     */

  }, {
    key: 'addRule',
    value: function addRule(name, decl, options) {
      var queue = this.queue;

      // Plugins can create rules.
      // In order to preserve the right order, we need to queue all `.addRule` calls,
      // which happen after the first `rules.add()` call.

      if (this.attached && !queue) this.queue = [];

      var rule = this.rules.add(name, decl, options);
      this.options.jss.plugins.onProcessRule(rule);

      if (this.attached) {
        if (!this.deployed) return rule;
        // Don't insert rule directly if there is no stringified version yet.
        // It will be inserted all together when .attach is called.
        if (queue) queue.push(rule);else {
          this.insertRule(rule);
          if (this.queue) {
            this.queue.forEach(this.insertRule, this);
            this.queue = undefined;
          }
        }
        return rule;
      }

      // We can't add rules to a detached style node.
      // We will redeploy the sheet once user will attach it.
      this.deployed = false;

      return rule;
    }

    /**
     * Insert rule into the StyleSheet
     */

  }, {
    key: 'insertRule',
    value: function insertRule(rule) {
      var renderable = this.renderer.insertRule(rule);
      if (renderable && this.options.link) (0, _linkRule2['default'])(rule, renderable);
    }

    /**
     * Create and add rules.
     * Will render also after Style Sheet was rendered the first time.
     */

  }, {
    key: 'addRules',
    value: function addRules(styles, options) {
      var added = [];
      for (var name in styles) {
        added.push(this.addRule(name, styles[name], options));
      }
      return added;
    }

    /**
     * Get a rule by name.
     */

  }, {
    key: 'getRule',
    value: function getRule(name) {
      return this.rules.get(name);
    }

    /**
     * Delete a rule by name.
     * Returns `true`: if rule has been deleted from the DOM.
     */

  }, {
    key: 'deleteRule',
    value: function deleteRule(name) {
      var rule = this.rules.get(name);

      if (!rule) return false;

      this.rules.remove(rule);

      if (this.attached && rule.renderable) {
        return this.renderer.deleteRule(rule.renderable);
      }

      return true;
    }

    /**
     * Get index of a rule.
     */

  }, {
    key: 'indexOf',
    value: function indexOf(rule) {
      return this.rules.indexOf(rule);
    }

    /**
     * Deploy pure CSS string to a renderable.
     */

  }, {
    key: 'deploy',
    value: function deploy() {
      this.renderer.deploy();
      this.deployed = true;
      return this;
    }

    /**
     * Link renderable CSS rules from sheet with their corresponding models.
     */

  }, {
    key: 'link',
    value: function link() {
      var cssRules = this.renderer.getRules();

      // Is undefined when VirtualRenderer is used.
      if (cssRules) this.rules.link(cssRules);
      this.linked = true;
      return this;
    }

    /**
     * Update the function values with a new data.
     */

  }, {
    key: 'update',
    value: function update(name, data) {
      this.rules.update(name, data);
      return this;
    }

    /**
     * Convert rules to a CSS string.
     */

  }, {
    key: 'toString',
    value: function toString(options) {
      return this.rules.toString(options);
    }
  }]);

  return StyleSheet;
}();

exports['default'] = StyleSheet;
});

unwrapExports(StyleSheet_1);

var moduleId = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
var ns = '2f1acc6c3a606b082e5eef5e54414ffb';
if (commonjsGlobal[ns] == null) commonjsGlobal[ns] = 0;

// Bundle may contain multiple JSS versions at the same time. In order to identify
// the current version with just one short number and use it for classes generation
// we use a counter. Also it is more accurate, because user can manually reevaluate
// the module.
exports['default'] = commonjsGlobal[ns]++;
});

unwrapExports(moduleId);

var createGenerateClassName = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _warning2 = _interopRequireDefault(warning_1$2);



var _StyleSheet2 = _interopRequireDefault(StyleSheet_1);



var _moduleId2 = _interopRequireDefault(moduleId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var maxRules = 1e10;


var env = process.env.NODE_ENV;

/**
 * Returns a function which generates unique class names based on counters.
 * When new generator function is created, rule counter is reseted.
 * We need to reset the rule counter for SSR for each request.
 */

exports['default'] = function () {
  var ruleCounter = 0;
  var defaultPrefix = env === 'production' ? 'c' : '';

  return function (rule, sheet) {
    ruleCounter += 1;

    if (ruleCounter > maxRules) {
      (0, _warning2['default'])(false, '[JSS] You might have a memory leak. Rule counter is at %s.', ruleCounter);
    }

    var prefix = defaultPrefix;
    var jssId = '';

    if (sheet) {
      prefix = sheet.options.classNamePrefix || defaultPrefix;
      if (sheet.options.jss.id != null) jssId += sheet.options.jss.id;
    }

    if (env === 'production') {
      return '' + prefix + _moduleId2['default'] + jssId + ruleCounter;
    }

    return prefix + rule.key + '-' + _moduleId2['default'] + (jssId && '-' + jssId) + '-' + ruleCounter;
  };
};
});

unwrapExports(createGenerateClassName);

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof$1(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof$1(document)) === 'object' && document.nodeType === 9;




var module$1 = Object.freeze({
	isBrowser: isBrowser,
	default: isBrowser
});

var PluginsRegistry_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _warning2 = _interopRequireDefault(warning_1$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PluginsRegistry = function () {
  function PluginsRegistry() {
    _classCallCheck(this, PluginsRegistry);

    this.hooks = {
      onCreateRule: [],
      onProcessRule: [],
      onProcessStyle: [],
      onProcessSheet: [],
      onChangeValue: [],
      onUpdate: []

      /**
       * Call `onCreateRule` hooks and return an object if returned by a hook.
       */
    };
  }

  _createClass(PluginsRegistry, [{
    key: 'onCreateRule',
    value: function onCreateRule(name, decl, options) {
      for (var i = 0; i < this.hooks.onCreateRule.length; i++) {
        var rule = this.hooks.onCreateRule[i](name, decl, options);
        if (rule) return rule;
      }
      return null;
    }

    /**
     * Call `onProcessRule` hooks.
     */

  }, {
    key: 'onProcessRule',
    value: function onProcessRule(rule) {
      if (rule.isProcessed) return;
      var sheet = rule.options.sheet;

      for (var i = 0; i < this.hooks.onProcessRule.length; i++) {
        this.hooks.onProcessRule[i](rule, sheet);
      }

      // $FlowFixMe
      if (rule.style) this.onProcessStyle(rule.style, rule, sheet);

      rule.isProcessed = true;
    }

    /**
     * Call `onProcessStyle` hooks.
     */

  }, {
    key: 'onProcessStyle',
    value: function onProcessStyle(style, rule, sheet) {
      var nextStyle = style;

      for (var i = 0; i < this.hooks.onProcessStyle.length; i++) {
        nextStyle = this.hooks.onProcessStyle[i](nextStyle, rule, sheet);
        // $FlowFixMe
        rule.style = nextStyle;
      }
    }

    /**
     * Call `onProcessSheet` hooks.
     */

  }, {
    key: 'onProcessSheet',
    value: function onProcessSheet(sheet) {
      for (var i = 0; i < this.hooks.onProcessSheet.length; i++) {
        this.hooks.onProcessSheet[i](sheet);
      }
    }

    /**
     * Call `onUpdate` hooks.
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(data, rule, sheet) {
      for (var i = 0; i < this.hooks.onUpdate.length; i++) {
        this.hooks.onUpdate[i](data, rule, sheet);
      }
    }

    /**
     * Call `onChangeValue` hooks.
     */

  }, {
    key: 'onChangeValue',
    value: function onChangeValue(value, prop, rule) {
      var processedValue = value;
      for (var i = 0; i < this.hooks.onChangeValue.length; i++) {
        processedValue = this.hooks.onChangeValue[i](processedValue, prop, rule);
      }
      return processedValue;
    }

    /**
     * Register a plugin.
     * If function is passed, it is a shortcut for `{onProcessRule}`.
     */

  }, {
    key: 'use',
    value: function use(plugin) {
      for (var name in plugin) {
        if (this.hooks[name]) this.hooks[name].push(plugin[name]);else (0, _warning2['default'])(false, '[JSS] Unknown hook "%s".', name);
      }
    }
  }]);

  return PluginsRegistry;
}();

exports['default'] = PluginsRegistry;
});

unwrapExports(PluginsRegistry_1);

var SimpleRule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleRule = function () {
  function SimpleRule(key, value, options) {
    _classCallCheck(this, SimpleRule);

    this.type = 'simple';
    this.isProcessed = false;

    this.key = key;
    this.value = value;
    this.options = options;
  }

  /**
   * Generates a CSS string.
   */
  // eslint-disable-next-line no-unused-vars


  _createClass(SimpleRule, [{
    key: 'toString',
    value: function toString(options) {
      if (Array.isArray(this.value)) {
        var str = '';
        for (var index = 0; index < this.value.length; index++) {
          str += this.key + ' ' + this.value[index] + ';';
          if (this.value[index + 1]) str += '\n';
        }
        return str;
      }

      return this.key + ' ' + this.value + ';';
    }
  }]);

  return SimpleRule;
}();

exports['default'] = SimpleRule;
});

unwrapExports(SimpleRule_1);

var KeyframesRule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _RuleList2 = _interopRequireDefault(RuleList_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Rule for @keyframes
 */
var KeyframesRule = function () {
  function KeyframesRule(key, frames, options) {
    _classCallCheck(this, KeyframesRule);

    this.type = 'keyframes';
    this.isProcessed = false;

    this.key = key;
    this.options = options;
    this.rules = new _RuleList2['default'](_extends({}, options, { parent: this }));

    for (var name in frames) {
      this.rules.add(name, frames[name], _extends({}, this.options, {
        parent: this,
        selector: name
      }));
    }

    this.rules.process();
  }

  /**
   * Generates a CSS string.
   */


  _createClass(KeyframesRule, [{
    key: 'toString',
    value: function toString() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { indent: 1 };

      var inner = this.rules.toString(options);
      if (inner) inner += '\n';
      return this.key + ' {\n' + inner + '}';
    }
  }]);

  return KeyframesRule;
}();

exports['default'] = KeyframesRule;
});

unwrapExports(KeyframesRule_1);

var ConditionalRule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _RuleList2 = _interopRequireDefault(RuleList_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Conditional rule for @media, @supports
 */
var ConditionalRule = function () {
  function ConditionalRule(key, styles, options) {
    _classCallCheck(this, ConditionalRule);

    this.type = 'conditional';
    this.isProcessed = false;

    this.key = key;
    this.options = options;
    this.rules = new _RuleList2['default'](_extends({}, options, { parent: this }));

    for (var name in styles) {
      this.rules.add(name, styles[name]);
    }

    this.rules.process();
  }

  /**
   * Get a rule.
   */


  _createClass(ConditionalRule, [{
    key: 'getRule',
    value: function getRule(name) {
      return this.rules.get(name);
    }

    /**
     * Get index of a rule.
     */

  }, {
    key: 'indexOf',
    value: function indexOf(rule) {
      return this.rules.indexOf(rule);
    }

    /**
     * Create and register rule, run plugins.
     */

  }, {
    key: 'addRule',
    value: function addRule(name, style, options) {
      var rule = this.rules.add(name, style, options);
      this.options.jss.plugins.onProcessRule(rule);
      return rule;
    }

    /**
     * Generates a CSS string.
     */

  }, {
    key: 'toString',
    value: function toString() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { indent: 1 };

      var inner = this.rules.toString(options);
      return inner ? this.key + ' {\n' + inner + '\n}' : '';
    }
  }]);

  return ConditionalRule;
}();

exports['default'] = ConditionalRule;
});

unwrapExports(ConditionalRule_1);

var FontFaceRule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _toCss2 = _interopRequireDefault(toCss_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FontFaceRule = function () {
  function FontFaceRule(key, style, options) {
    _classCallCheck(this, FontFaceRule);

    this.type = 'font-face';
    this.isProcessed = false;

    this.key = key;
    this.style = style;
    this.options = options;
  }

  /**
   * Generates a CSS string.
   */


  _createClass(FontFaceRule, [{
    key: 'toString',
    value: function toString(options) {
      if (Array.isArray(this.style)) {
        var str = '';
        for (var index = 0; index < this.style.length; index++) {
          str += (0, _toCss2['default'])(this.key, this.style[index]);
          if (this.style[index + 1]) str += '\n';
        }
        return str;
      }

      return (0, _toCss2['default'])(this.key, this.style, options);
    }
  }]);

  return FontFaceRule;
}();

exports['default'] = FontFaceRule;
});

unwrapExports(FontFaceRule_1);

var ViewportRule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _toCss2 = _interopRequireDefault(toCss_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewportRule = function () {
  function ViewportRule(key, style, options) {
    _classCallCheck(this, ViewportRule);

    this.type = 'viewport';
    this.isProcessed = false;

    this.key = key;
    this.style = style;
    this.options = options;
  }

  /**
   * Generates a CSS string.
   */


  _createClass(ViewportRule, [{
    key: 'toString',
    value: function toString(options) {
      return (0, _toCss2['default'])(this.key, this.style, options);
    }
  }]);

  return ViewportRule;
}();

exports['default'] = ViewportRule;
});

unwrapExports(ViewportRule_1);

var rules = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _SimpleRule2 = _interopRequireDefault(SimpleRule_1);



var _KeyframesRule2 = _interopRequireDefault(KeyframesRule_1);



var _ConditionalRule2 = _interopRequireDefault(ConditionalRule_1);



var _FontFaceRule2 = _interopRequireDefault(FontFaceRule_1);



var _ViewportRule2 = _interopRequireDefault(ViewportRule_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var classes = {
  '@charset': _SimpleRule2['default'],
  '@import': _SimpleRule2['default'],
  '@namespace': _SimpleRule2['default'],
  '@keyframes': _KeyframesRule2['default'],
  '@media': _ConditionalRule2['default'],
  '@supports': _ConditionalRule2['default'],
  '@font-face': _FontFaceRule2['default'],
  '@viewport': _ViewportRule2['default'],
  '@-ms-viewport': _ViewportRule2['default']

  /**
   * Generate plugins which will register all rules.
   */
};
exports['default'] = Object.keys(classes).map(function (key) {
  // https://jsperf.com/indexof-vs-substr-vs-regex-at-the-beginning-3
  var re = new RegExp('^' + key);
  var onCreateRule = function onCreateRule(name, decl, options) {
    return re.test(name) ? new classes[key](name, decl, options) : null;
  };
  return { onCreateRule: onCreateRule };
});
});

unwrapExports(rules);

var observables = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _StyleRule2 = _interopRequireDefault(StyleRule_1);



var _createRule2 = _interopRequireDefault(createRule_1);



var _isObservable2 = _interopRequireDefault(isObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  onCreateRule: function onCreateRule(name, decl, options) {
    if (!(0, _isObservable2['default'])(decl)) return null;

    // Cast `decl` to `Observable`, since it passed the type guard.
    var style$ = decl;

    var rule = (0, _createRule2['default'])(name, {}, options);

    // TODO
    // Call `stream.subscribe()` returns a subscription, which should be explicitly
    // unsubscribed from when we know this sheet is no longer needed.
    style$.subscribe(function (style) {
      for (var prop in style) {
        rule.prop(prop, style[prop]);
      }
    });

    return rule;
  },
  onProcessRule: function onProcessRule(rule) {
    if (!(rule instanceof _StyleRule2['default'])) return;
    var styleRule = rule;
    var style = styleRule.style;

    var _loop = function _loop(prop) {
      var value = style[prop];
      if (!(0, _isObservable2['default'])(value)) return 'continue';
      delete style[prop];
      value.subscribe({
        next: function next(nextValue) {
          styleRule.prop(prop, nextValue);
        }
      });
    };

    for (var prop in style) {
      var _ret = _loop(prop);

      if (_ret === 'continue') continue;
    }
  }
};
});

unwrapExports(observables);

var kebabCase = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
var regExp = /([A-Z])/g;
var replace = function replace(str) {
  return "-" + str.toLowerCase();
};

exports["default"] = function (str) {
  return str.replace(regExp, replace);
};
});

unwrapExports(kebabCase);

var functions = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _RuleList2 = _interopRequireDefault(RuleList_1);



var _StyleRule2 = _interopRequireDefault(StyleRule_1);



var _kebabCase2 = _interopRequireDefault(kebabCase);



var _createRule2 = _interopRequireDefault(createRule_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// A symbol replacement.
var now = Date.now();
var fnValuesNs = 'fnValues' + now;
var fnStyleNs = 'fnStyle' + ++now;

exports['default'] = {
  onCreateRule: function onCreateRule(name, decl, options) {
    if (typeof decl !== 'function') return null;
    var rule = (0, _createRule2['default'])(name, {}, options);
    rule[fnStyleNs] = decl;
    return rule;
  },
  onProcessStyle: function onProcessStyle(style, rule) {
    var fn = {};
    for (var prop in style) {
      var value = style[prop];
      if (typeof value !== 'function') continue;
      delete style[prop];
      fn[(0, _kebabCase2['default'])(prop)] = value;
    }
    rule = rule;
    rule[fnValuesNs] = fn;
    return style;
  },
  onUpdate: function onUpdate(data, rule) {
    // It is a rules container like for e.g. ConditionalRule.
    if (rule.rules instanceof _RuleList2['default']) {
      rule.rules.update(data);
      return;
    }
    if (!(rule instanceof _StyleRule2['default'])) return;

    rule = rule;

    // If we have a fn values map, it is a rule with function values.
    if (rule[fnValuesNs]) {
      for (var prop in rule[fnValuesNs]) {
        rule.prop(prop, rule[fnValuesNs][prop](data));
      }
    }

    rule = rule;

    var fnStyle = rule[fnStyleNs];

    // If we have a style function, the entire rule is dynamic and style object
    // will be returned from that function.
    if (fnStyle) {
      var style = fnStyle(data);
      for (var _prop in style) {
        rule.prop(_prop, style[_prop]);
      }
    }
  }
};
});

unwrapExports(functions);

var DomRenderer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _warning2 = _interopRequireDefault(warning_1$2);



var _sheets2 = _interopRequireDefault(sheets);



var _StyleRule2 = _interopRequireDefault(StyleRule_1);



var _toCssValue2 = _interopRequireDefault(toCssValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Cache the value from the first time a function is called.
 */
var memoize = function memoize(fn) {
  var value = void 0;
  return function () {
    if (!value) value = fn();
    return value;
  };
};

/**
 * Get a style property value.
 */
function getPropertyValue(cssRule, prop) {
  try {
    return cssRule.style.getPropertyValue(prop);
  } catch (err) {
    // IE may throw if property is unknown.
    return '';
  }
}

/**
 * Set a style property.
 */
function setProperty(cssRule, prop, value) {
  try {
    var cssValue = value;

    if (Array.isArray(value)) {
      cssValue = (0, _toCssValue2['default'])(value, true);

      if (value[value.length - 1] === '!important') {
        cssRule.style.setProperty(prop, cssValue, 'important');
        return true;
      }
    }

    cssRule.style.setProperty(prop, cssValue);
  } catch (err) {
    // IE may throw if property is unknown.
    return false;
  }
  return true;
}

/**
 * Remove a style property.
 */
function removeProperty(cssRule, prop) {
  try {
    cssRule.style.removeProperty(prop);
  } catch (err) {
    (0, _warning2['default'])(false, '[JSS] DOMException "%s" was thrown. Tried to remove property "%s".', err.message, prop);
  }
}

var CSSRuleTypes = {
  STYLE_RULE: 1,
  KEYFRAMES_RULE: 7

  /**
   * Get the CSS Rule key.
   */

};var getKey = function () {
  var extractKey = function extractKey(cssText) {
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return cssText.substr(from, cssText.indexOf('{') - 1);
  };

  return function (cssRule) {
    if (cssRule.type === CSSRuleTypes.STYLE_RULE) return cssRule.selectorText;
    if (cssRule.type === CSSRuleTypes.KEYFRAMES_RULE) {
      var name = cssRule.name;

      if (name) return '@keyframes ' + name;

      // There is no rule.name in the following browsers:
      // - IE 9
      // - Safari 7.1.8
      // - Mobile Safari 9.0.0
      var cssText = cssRule.cssText;

      return '@' + extractKey(cssText, cssText.indexOf('keyframes'));
    }

    // Conditionals.
    return extractKey(cssRule.cssText);
  };
}();

/**
 * Set the selector.
 */
function setSelector(cssRule, selectorText) {
  cssRule.selectorText = selectorText;

  // Return false if setter was not successful.
  // Currently works in chrome only.
  return cssRule.selectorText === selectorText;
}

/**
 * Gets the `head` element upon the first call and caches it.
 */
var getHead = memoize(function () {
  return document.head || document.getElementsByTagName('head')[0];
});

/**
 * Gets a map of rule keys, where the property is an unescaped key and value
 * is a potentially escaped one.
 * It is used to identify CSS rules and the corresponding JSS rules. As an identifier
 * for CSSStyleRule we normally use `selectorText`. Though if original selector text
 * contains escaped code points e.g. `:not(#\\20)`, CSSOM will compile it to `:not(# )`
 * and so CSS rule's `selectorText` won't match JSS rule selector.
 *
 * https://www.w3.org/International/questions/qa-escapes#cssescapes
 */
var getUnescapedKeysMap = function () {
  var style = void 0;
  var isAttached = false;

  return function (rules) {
    var map = {};
    // https://github.com/facebook/flow/issues/2696
    if (!style) style = document.createElement('style');
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      if (!(rule instanceof _StyleRule2['default'])) continue;
      var selector = rule.selector;
      // Only unescape selector over CSSOM if it contains a back slash.

      if (selector && selector.indexOf('\\') !== -1) {
        // Lazilly attach when needed.
        if (!isAttached) {
          getHead().appendChild(style);
          isAttached = true;
        }
        style.textContent = selector + ' {}';
        var _style = style,
            sheet = _style.sheet;

        if (sheet) {
          var cssRules = sheet.cssRules;

          if (cssRules) map[cssRules[0].selectorText] = rule.key;
        }
      }
    }
    if (isAttached) {
      getHead().removeChild(style);
      isAttached = false;
    }
    return map;
  };
}();

/**
 * Find attached sheet with an index higher than the passed one.
 */
function findHigherSheet(registry, options) {
  for (var i = 0; i < registry.length; i++) {
    var sheet = registry[i];
    if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }
  return null;
}

/**
 * Find attached sheet with the highest index.
 */
function findHighestSheet(registry, options) {
  for (var i = registry.length - 1; i >= 0; i--) {
    var sheet = registry[i];
    if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }
  return null;
}

/**
 * Find a comment with "jss" inside.
 */
function findCommentNode(text) {
  var head = getHead();
  for (var i = 0; i < head.childNodes.length; i++) {
    var node = head.childNodes[i];
    if (node.nodeType === 8 && node.nodeValue.trim() === text) {
      return node;
    }
  }
  return null;
}

/**
 * Find a node before which we can insert the sheet.
 */
function findPrevNode(options) {
  var registry = _sheets2['default'].registry;


  if (registry.length > 0) {
    // Try to insert before the next higher sheet.
    var sheet = findHigherSheet(registry, options);
    if (sheet) return sheet.renderer.element;

    // Otherwise insert after the last attached.
    sheet = findHighestSheet(registry, options);
    if (sheet) return sheet.renderer.element.nextElementSibling;
  }

  // Try to find a comment placeholder if registry is empty.
  var insertionPoint = options.insertionPoint;

  if (insertionPoint && typeof insertionPoint === 'string') {
    var comment = findCommentNode(insertionPoint);
    if (comment) return comment.nextSibling;
    // If user specifies an insertion point and it can't be found in the document -
    // bad specificity issues may appear.
    (0, _warning2['default'])(insertionPoint === 'jss', '[JSS] Insertion point "%s" not found.', insertionPoint);
  }

  return null;
}

/**
 * Insert style element into the DOM.
 */
function insertStyle(style, options) {
  var insertionPoint = options.insertionPoint;

  var prevNode = findPrevNode(options);

  if (prevNode) {
    var parentNode = prevNode.parentNode;

    if (parentNode) parentNode.insertBefore(style, prevNode);
    return;
  }

  // Works with iframes and any node types.
  if (insertionPoint && typeof insertionPoint.nodeType === 'number') {
    // https://stackoverflow.com/questions/41328728/force-casting-in-flow
    var insertionPointElement = insertionPoint;
    var _parentNode = insertionPointElement.parentNode;

    if (_parentNode) _parentNode.insertBefore(style, insertionPointElement.nextSibling);else (0, _warning2['default'])(false, '[JSS] Insertion point is not in the DOM.');
    return;
  }

  getHead().insertBefore(style, prevNode);
}

/**
 * Read jss nonce setting from the page if the user has set it.
 */
var getNonce = memoize(function () {
  var node = document.querySelector('meta[property="csp-nonce"]');
  return node ? node.getAttribute('content') : null;
});

var DomRenderer = function () {
  function DomRenderer(sheet) {
    _classCallCheck(this, DomRenderer);

    this.getPropertyValue = getPropertyValue;
    this.setProperty = setProperty;
    this.removeProperty = removeProperty;
    this.setSelector = setSelector;
    this.getKey = getKey;
    this.getUnescapedKeysMap = getUnescapedKeysMap;
    this.hasInsertedRules = false;

    // There is no sheet when the renderer is used from a standalone StyleRule.
    if (sheet) _sheets2['default'].add(sheet);

    this.sheet = sheet;

    var _ref = this.sheet ? this.sheet.options : {},
        media = _ref.media,
        meta = _ref.meta,
        element = _ref.element;

    this.element = element || document.createElement('style');
    this.element.type = 'text/css';
    this.element.setAttribute('data-jss', '');
    if (media) this.element.setAttribute('media', media);
    if (meta) this.element.setAttribute('data-meta', meta);
    var nonce = getNonce();
    if (nonce) this.element.setAttribute('nonce', nonce);
  }

  /**
   * Insert style element into render tree.
   */


  // HTMLStyleElement needs fixing https://github.com/facebook/flow/issues/2696


  _createClass(DomRenderer, [{
    key: 'attach',
    value: function attach() {
      // In the case the element node is external and it is already in the DOM.
      if (this.element.parentNode || !this.sheet) return;

      // When rules are inserted using `insertRule` API, after `sheet.detach().attach()`
      // browsers remove those rules.
      // TODO figure out if its a bug and if it is known.
      // Workaround is to redeploy the sheet before attaching as a string.
      if (this.hasInsertedRules) {
        this.deploy();
        this.hasInsertedRules = false;
      }

      insertStyle(this.element, this.sheet.options);
    }

    /**
     * Remove style element from render tree.
     */

  }, {
    key: 'detach',
    value: function detach() {
      this.element.parentNode.removeChild(this.element);
    }

    /**
     * Inject CSS string into element.
     */

  }, {
    key: 'deploy',
    value: function deploy() {
      if (!this.sheet) return;
      this.element.textContent = '\n' + this.sheet.toString() + '\n';
    }

    /**
     * Insert a rule into element.
     */

  }, {
    key: 'insertRule',
    value: function insertRule(rule, index) {
      var sheet = this.element.sheet;
      var cssRules = sheet.cssRules;

      var str = rule.toString();
      if (!index) index = cssRules.length;

      if (!str) return false;

      try {
        sheet.insertRule(str, index);
      } catch (err) {
        (0, _warning2['default'])(false, '[JSS] Can not insert an unsupported rule \n\r%s', rule);
        return false;
      }
      this.hasInsertedRules = true;

      return cssRules[index];
    }

    /**
     * Delete a rule.
     */

  }, {
    key: 'deleteRule',
    value: function deleteRule(cssRule) {
      var sheet = this.element.sheet;

      var index = this.indexOf(cssRule);
      if (index === -1) return false;
      sheet.deleteRule(index);
      return true;
    }

    /**
     * Get index of a CSS Rule.
     */

  }, {
    key: 'indexOf',
    value: function indexOf(cssRule) {
      var cssRules = this.element.sheet.cssRules;

      for (var _index = 0; _index < cssRules.length; _index++) {
        if (cssRule === cssRules[_index]) return _index;
      }
      return -1;
    }

    /**
     * Generate a new CSS rule and replace the existing one.
     */

  }, {
    key: 'replaceRule',
    value: function replaceRule(cssRule, rule) {
      var index = this.indexOf(cssRule);
      var newCssRule = this.insertRule(rule, index);
      this.element.sheet.deleteRule(index);
      return newCssRule;
    }

    /**
     * Get all rules elements.
     */

  }, {
    key: 'getRules',
    value: function getRules() {
      return this.element.sheet.cssRules;
    }
  }]);

  return DomRenderer;
}();

exports['default'] = DomRenderer;
});

unwrapExports(DomRenderer_1);

var VirtualRenderer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */

/**
 * Rendering backend to do nothing in nodejs.
 */
var VirtualRenderer = function () {
  function VirtualRenderer() {
    _classCallCheck(this, VirtualRenderer);
  }

  _createClass(VirtualRenderer, [{
    key: 'setProperty',
    value: function setProperty() {
      return true;
    }
  }, {
    key: 'getPropertyValue',
    value: function getPropertyValue() {
      return '';
    }
  }, {
    key: 'removeProperty',
    value: function removeProperty() {}
  }, {
    key: 'setSelector',
    value: function setSelector() {
      return true;
    }
  }, {
    key: 'getKey',
    value: function getKey() {
      return '';
    }
  }, {
    key: 'attach',
    value: function attach() {}
  }, {
    key: 'detach',
    value: function detach() {}
  }, {
    key: 'deploy',
    value: function deploy() {}
  }, {
    key: 'insertRule',
    value: function insertRule() {
      return false;
    }
  }, {
    key: 'deleteRule',
    value: function deleteRule() {
      return true;
    }
  }, {
    key: 'replaceRule',
    value: function replaceRule() {
      return false;
    }
  }, {
    key: 'getRules',
    value: function getRules() {}
  }, {
    key: 'indexOf',
    value: function indexOf() {
      return -1;
    }
  }]);

  return VirtualRenderer;
}();

exports['default'] = VirtualRenderer;
});

unwrapExports(VirtualRenderer_1);

var _isInBrowser = ( module$1 && isBrowser ) || module$1;

var Jss_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _isInBrowser2 = _interopRequireDefault(_isInBrowser);



var _StyleSheet2 = _interopRequireDefault(StyleSheet_1);



var _PluginsRegistry2 = _interopRequireDefault(PluginsRegistry_1);



var _rules2 = _interopRequireDefault(rules);



var _observables2 = _interopRequireDefault(observables);



var _functions2 = _interopRequireDefault(functions);



var _sheets2 = _interopRequireDefault(sheets);



var _StyleRule2 = _interopRequireDefault(StyleRule_1);



var _createGenerateClassName2 = _interopRequireDefault(createGenerateClassName);



var _createRule3 = _interopRequireDefault(createRule_1);



var _DomRenderer2 = _interopRequireDefault(DomRenderer_1);



var _VirtualRenderer2 = _interopRequireDefault(VirtualRenderer_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultPlugins = _rules2['default'].concat([_observables2['default'], _functions2['default']]);

var instanceCounter = 0;

var Jss = function () {
  function Jss(options) {
    _classCallCheck(this, Jss);

    this.id = instanceCounter++;
    this.version = "9.7.0";
    this.plugins = new _PluginsRegistry2['default']();
    this.options = {
      createGenerateClassName: _createGenerateClassName2['default'],
      Renderer: _isInBrowser2['default'] ? _DomRenderer2['default'] : _VirtualRenderer2['default'],
      plugins: []
    };
    this.generateClassName = (0, _createGenerateClassName2['default'])();

    // eslint-disable-next-line prefer-spread
    this.use.apply(this, defaultPlugins);
    this.setup(options);
  }

  _createClass(Jss, [{
    key: 'setup',
    value: function setup() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (options.createGenerateClassName) {
        this.options.createGenerateClassName = options.createGenerateClassName;
        // $FlowFixMe
        this.generateClassName = options.createGenerateClassName();
      }

      if (options.insertionPoint != null) this.options.insertionPoint = options.insertionPoint;
      if (options.virtual || options.Renderer) {
        this.options.Renderer = options.Renderer || (options.virtual ? _VirtualRenderer2['default'] : _DomRenderer2['default']);
      }

      // eslint-disable-next-line prefer-spread
      if (options.plugins) this.use.apply(this, options.plugins);

      return this;
    }

    /**
     * Create a Style Sheet.
     */

  }, {
    key: 'createStyleSheet',
    value: function createStyleSheet(styles) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var index = options.index;
      if (typeof index !== 'number') {
        index = _sheets2['default'].index === 0 ? 0 : _sheets2['default'].index + 1;
      }
      var sheet = new _StyleSheet2['default'](styles, _extends({}, options, {
        jss: this,
        generateClassName: options.generateClassName || this.generateClassName,
        insertionPoint: this.options.insertionPoint,
        Renderer: this.options.Renderer,
        index: index
      }));
      this.plugins.onProcessSheet(sheet);

      return sheet;
    }

    /**
     * Detach the Style Sheet and remove it from the registry.
     */

  }, {
    key: 'removeStyleSheet',
    value: function removeStyleSheet(sheet) {
      sheet.detach();
      _sheets2['default'].remove(sheet);
      return this;
    }

    /**
     * Create a rule without a Style Sheet.
     */

  }, {
    key: 'createRule',
    value: function createRule(name) {
      var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      // Enable rule without name for inline styles.
      if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
        options = style;
        style = name;
        name = undefined;
      }

      // Cast from RuleFactoryOptions to RuleOptions
      // https://stackoverflow.com/questions/41328728/force-casting-in-flow
      var ruleOptions = options;

      ruleOptions.jss = this;
      ruleOptions.Renderer = this.options.Renderer;
      if (!ruleOptions.generateClassName) ruleOptions.generateClassName = this.generateClassName;
      if (!ruleOptions.classes) ruleOptions.classes = {};
      var rule = (0, _createRule3['default'])(name, style, ruleOptions);

      if (!ruleOptions.selector && rule instanceof _StyleRule2['default']) {
        rule.selector = '.' + ruleOptions.generateClassName(rule);
      }

      this.plugins.onProcessRule(rule);

      return rule;
    }

    /**
     * Register plugin. Passed function will be invoked with a rule instance.
     */

  }, {
    key: 'use',
    value: function use() {
      var _this = this;

      for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
        plugins[_key] = arguments[_key];
      }

      plugins.forEach(function (plugin) {
        // Avoids applying same plugin twice, at least based on ref.
        if (_this.options.plugins.indexOf(plugin) === -1) {
          _this.options.plugins.push(plugin);
          _this.plugins.use(plugin);
        }
      });

      return this;
    }
  }]);

  return Jss;
}();

exports['default'] = Jss;
});

unwrapExports(Jss_1);

var lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.createGenerateClassName = exports.sheets = exports.RuleList = exports.SheetsManager = exports.SheetsRegistry = exports.toCssValue = exports.getDynamicStyles = undefined;



Object.defineProperty(exports, 'getDynamicStyles', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(getDynamicStyles)['default'];
  }
});



Object.defineProperty(exports, 'toCssValue', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(toCssValue_1)['default'];
  }
});



Object.defineProperty(exports, 'SheetsRegistry', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(SheetsRegistry_1)['default'];
  }
});



Object.defineProperty(exports, 'SheetsManager', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(SheetsManager_1)['default'];
  }
});



Object.defineProperty(exports, 'RuleList', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(RuleList_1)['default'];
  }
});



Object.defineProperty(exports, 'sheets', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(sheets)['default'];
  }
});



Object.defineProperty(exports, 'createGenerateClassName', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(createGenerateClassName)['default'];
  }
});



var _Jss2 = _interopRequireDefault(Jss_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Creates a new instance of Jss.
 */
var create = exports.create = function create(options) {
  return new _Jss2['default'](options);
};

/**
 * A global Jss instance.
 */
exports['default'] = create();
});

unwrapExports(lib);
var lib_1 = lib.create;
var lib_2 = lib.createGenerateClassName;
var lib_3 = lib.sheets;
var lib_4 = lib.RuleList;
var lib_5 = lib.SheetsManager;
var lib_6 = lib.SheetsRegistry;
var lib_7 = lib.toCssValue;
var lib_8 = lib.getDynamicStyles;

var lib$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports['default'] = jssGlobal;



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var propKey = '@global';
var prefixKey = '@global ';

var GlobalContainerRule = function () {
  function GlobalContainerRule(key, styles, options) {
    _classCallCheck(this, GlobalContainerRule);

    this.type = 'global';

    this.key = key;
    this.options = options;
    this.rules = new lib.RuleList(_extends({}, options, {
      parent: this
    }));

    for (var selector in styles) {
      this.rules.add(selector, styles[selector], { selector: selector });
    }

    this.rules.process();
  }

  /**
   * Get a rule.
   */


  _createClass(GlobalContainerRule, [{
    key: 'getRule',
    value: function getRule(name) {
      return this.rules.get(name);
    }

    /**
     * Create and register rule, run plugins.
     */

  }, {
    key: 'addRule',
    value: function addRule(name, style, options) {
      var rule = this.rules.add(name, style, options);
      this.options.jss.plugins.onProcessRule(rule);
      return rule;
    }

    /**
     * Get index of a rule.
     */

  }, {
    key: 'indexOf',
    value: function indexOf(rule) {
      return this.rules.indexOf(rule);
    }

    /**
     * Generates a CSS string.
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.rules.toString();
    }
  }]);

  return GlobalContainerRule;
}();

var GlobalPrefixedRule = function () {
  function GlobalPrefixedRule(name, style, options) {
    _classCallCheck(this, GlobalPrefixedRule);

    this.name = name;
    this.options = options;
    var selector = name.substr(prefixKey.length);
    this.rule = options.jss.createRule(selector, style, _extends({}, options, {
      parent: this,
      selector: selector
    }));
  }

  _createClass(GlobalPrefixedRule, [{
    key: 'toString',
    value: function toString(options) {
      return this.rule.toString(options);
    }
  }]);

  return GlobalPrefixedRule;
}();

var separatorRegExp = /\s*,\s*/g;

function addScope(selector, scope) {
  var parts = selector.split(separatorRegExp);
  var scoped = '';
  for (var i = 0; i < parts.length; i++) {
    scoped += scope + ' ' + parts[i].trim();
    if (parts[i + 1]) scoped += ', ';
  }
  return scoped;
}

function handleNestedGlobalContainerRule(rule) {
  var options = rule.options,
      style = rule.style;

  var rules = style[propKey];

  if (!rules) return;

  for (var name in rules) {
    options.sheet.addRule(name, rules[name], _extends({}, options, {
      selector: addScope(name, rule.selector)
    }));
  }

  delete style[propKey];
}

function handlePrefixedGlobalRule(rule) {
  var options = rule.options,
      style = rule.style;

  for (var prop in style) {
    if (prop.substr(0, propKey.length) !== propKey) continue;

    var selector = addScope(prop.substr(propKey.length), rule.selector);
    options.sheet.addRule(selector, style[prop], _extends({}, options, {
      selector: selector
    }));
    delete style[prop];
  }
}

/**
 * Convert nested rules to separate, remove them from original styles.
 *
 * @param {Rule} rule
 * @api public
 */
function jssGlobal() {
  function onCreateRule(name, styles, options) {
    if (name === propKey) {
      return new GlobalContainerRule(name, styles, options);
    }

    if (name[0] === '@' && name.substr(0, prefixKey.length) === prefixKey) {
      return new GlobalPrefixedRule(name, styles, options);
    }

    var parent = options.parent;


    if (parent) {
      if (parent.type === 'global' || parent.options.parent.type === 'global') {
        options.global = true;
      }
    }

    if (options.global) options.selector = name;

    return null;
  }

  function onProcessRule(rule) {
    if (rule.type !== 'style') return;

    handleNestedGlobalContainerRule(rule);
    handlePrefixedGlobalRule(rule);
  }

  return { onCreateRule: onCreateRule, onProcessRule: onProcessRule };
}
});

var jssGlobal = unwrapExports(lib$1);

var lib$2 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = jssNested;



var _warning2 = _interopRequireDefault(warning_1$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var separatorRegExp = /\s*,\s*/g;
var parentRegExp = /&/g;
var refRegExp = /\$([\w-]+)/g;

/**
 * Convert nested rules to separate, remove them from original styles.
 *
 * @param {Rule} rule
 * @api public
 */
function jssNested() {
  // Get a function to be used for $ref replacement.
  function getReplaceRef(container) {
    return function (match, key) {
      var rule = container.getRule(key);
      if (rule) return rule.selector;
      (0, _warning2.default)(false, '[JSS] Could not find the referenced rule %s in %s.', key, container.options.meta || container);
      return key;
    };
  }

  var hasAnd = function hasAnd(str) {
    return str.indexOf('&') !== -1;
  };

  function replaceParentRefs(nestedProp, parentProp) {
    var parentSelectors = parentProp.split(separatorRegExp);
    var nestedSelectors = nestedProp.split(separatorRegExp);

    var result = '';

    for (var i = 0; i < parentSelectors.length; i++) {
      var parent = parentSelectors[i];

      for (var j = 0; j < nestedSelectors.length; j++) {
        var nested = nestedSelectors[j];
        if (result) result += ', ';
        // Replace all & by the parent or prefix & with the parent.
        result += hasAnd(nested) ? nested.replace(parentRegExp, parent) : parent + ' ' + nested;
      }
    }

    return result;
  }

  function getOptions(rule, container, options) {
    // Options has been already created, now we only increase index.
    if (options) return _extends({}, options, { index: options.index + 1 });

    var nestingLevel = rule.options.nestingLevel;

    nestingLevel = nestingLevel === undefined ? 1 : nestingLevel + 1;

    return _extends({}, rule.options, {
      nestingLevel: nestingLevel,
      index: container.indexOf(rule) + 1
    });
  }

  function onProcessStyle(style, rule) {
    if (rule.type !== 'style') return style;
    var container = rule.options.parent;
    var options = void 0;
    var replaceRef = void 0;
    for (var prop in style) {
      var isNested = hasAnd(prop);
      var isNestedConditional = prop[0] === '@';

      if (!isNested && !isNestedConditional) continue;

      options = getOptions(rule, container, options);

      if (isNested) {
        var selector = replaceParentRefs(prop, rule.selector
        // Lazily create the ref replacer function just once for
        // all nested rules within the sheet.
        );if (!replaceRef) replaceRef = getReplaceRef(container
        // Replace all $refs.
        );selector = selector.replace(refRegExp, replaceRef);

        container.addRule(selector, style[prop], _extends({}, options, { selector: selector }));
      } else if (isNestedConditional) {
        container
        // Place conditional right after the parent rule to ensure right ordering.
        .addRule(prop, null, options).addRule(rule.key, style[prop], { selector: rule.selector });
      }

      delete style[prop];
    }

    return style;
  }

  return { onProcessStyle: onProcessStyle };
}
});

var jssNested = unwrapExports(lib$2);

var lib$3 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = camelCase;
var regExp = /([A-Z])/g;

/**
 * Replace a string passed from String#replace.
 * @param {String} str
 * @return {String}
 */
function replace(str) {
  return "-" + str.toLowerCase();
}

/**
 * Convert camel cased property names to dash separated.
 *
 * @param {Object} style
 * @return {Object}
 */
function convertCase(style) {
  var converted = {};

  for (var prop in style) {
    converted[prop.replace(regExp, replace)] = style[prop];
  }

  if (style.fallbacks) {
    if (Array.isArray(style.fallbacks)) converted.fallbacks = style.fallbacks.map(convertCase);else converted.fallbacks = convertCase(style.fallbacks);
  }

  return converted;
}

/**
 * Allow camel cased property names by converting them back to dasherized.
 *
 * @param {Rule} rule
 */
function camelCase() {
  function onProcessStyle(style) {
    if (Array.isArray(style)) {
      // Handle rules like @font-face, which can have multiple styles in an array
      for (var index = 0; index < style.length; index++) {
        style[index] = convertCase(style[index]);
      }
      return style;
    }

    return convertCase(style);
  }

  return { onProcessStyle: onProcessStyle };
}
});

var jssCamelCase = unwrapExports(lib$3);

var defaultUnits = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Generated jss-default-unit CSS property units
 *
 * @type object
 */
exports['default'] = {
  'animation-delay': 'ms',
  'animation-duration': 'ms',
  'background-position': 'px',
  'background-position-x': 'px',
  'background-position-y': 'px',
  'background-size': 'px',
  border: 'px',
  'border-bottom': 'px',
  'border-bottom-left-radius': 'px',
  'border-bottom-right-radius': 'px',
  'border-bottom-width': 'px',
  'border-left': 'px',
  'border-left-width': 'px',
  'border-radius': 'px',
  'border-right': 'px',
  'border-right-width': 'px',
  'border-spacing': 'px',
  'border-top': 'px',
  'border-top-left-radius': 'px',
  'border-top-right-radius': 'px',
  'border-top-width': 'px',
  'border-width': 'px',
  'border-after-width': 'px',
  'border-before-width': 'px',
  'border-end-width': 'px',
  'border-horizontal-spacing': 'px',
  'border-start-width': 'px',
  'border-vertical-spacing': 'px',
  bottom: 'px',
  'box-shadow': 'px',
  'column-gap': 'px',
  'column-rule': 'px',
  'column-rule-width': 'px',
  'column-width': 'px',
  'flex-basis': 'px',
  'font-size': 'px',
  'font-size-delta': 'px',
  height: 'px',
  left: 'px',
  'letter-spacing': 'px',
  'logical-height': 'px',
  'logical-width': 'px',
  margin: 'px',
  'margin-after': 'px',
  'margin-before': 'px',
  'margin-bottom': 'px',
  'margin-left': 'px',
  'margin-right': 'px',
  'margin-top': 'px',
  'max-height': 'px',
  'max-width': 'px',
  'margin-end': 'px',
  'margin-start': 'px',
  'mask-position-x': 'px',
  'mask-position-y': 'px',
  'mask-size': 'px',
  'max-logical-height': 'px',
  'max-logical-width': 'px',
  'min-height': 'px',
  'min-width': 'px',
  'min-logical-height': 'px',
  'min-logical-width': 'px',
  motion: 'px',
  'motion-offset': 'px',
  outline: 'px',
  'outline-offset': 'px',
  'outline-width': 'px',
  padding: 'px',
  'padding-bottom': 'px',
  'padding-left': 'px',
  'padding-right': 'px',
  'padding-top': 'px',
  'padding-after': 'px',
  'padding-before': 'px',
  'padding-end': 'px',
  'padding-start': 'px',
  'perspective-origin-x': '%',
  'perspective-origin-y': '%',
  perspective: 'px',
  right: 'px',
  'shape-margin': 'px',
  size: 'px',
  'text-indent': 'px',
  'text-stroke': 'px',
  'text-stroke-width': 'px',
  top: 'px',
  'transform-origin': '%',
  'transform-origin-x': '%',
  'transform-origin-y': '%',
  'transform-origin-z': '%',
  'transition-delay': 'ms',
  'transition-duration': 'ms',
  'vertical-align': 'px',
  width: 'px',
  'word-spacing': 'px',
  // Not existing properties.
  // Used to avoid issues with jss-expand intergration.
  'box-shadow-x': 'px',
  'box-shadow-y': 'px',
  'box-shadow-blur': 'px',
  'box-shadow-spread': 'px',
  'font-line-height': 'px',
  'text-shadow-x': 'px',
  'text-shadow-y': 'px',
  'text-shadow-blur': 'px'
};
});

unwrapExports(defaultUnits);

var lib$4 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = defaultUnit;



var _defaultUnits2 = _interopRequireDefault(defaultUnits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Clones the object and adds a camel cased property version.
 */
function addCamelCasedVersion(obj) {
  var regExp = /(-[a-z])/g;
  var replace = function replace(str) {
    return str[1].toUpperCase();
  };
  var newObj = {};
  for (var key in obj) {
    newObj[key] = obj[key];
    newObj[key.replace(regExp, replace)] = obj[key];
  }
  return newObj;
}

var units = addCamelCasedVersion(_defaultUnits2['default']);

/**
 * Recursive deep style passing function
 *
 * @param {String} current property
 * @param {(Object|Array|Number|String)} property value
 * @param {Object} options
 * @return {(Object|Array|Number|String)} resulting value
 */
function iterate(prop, value, options) {
  if (!value) return value;

  var convertedValue = value;

  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type === 'object' && Array.isArray(value)) type = 'array';

  switch (type) {
    case 'object':
      if (prop === 'fallbacks') {
        for (var innerProp in value) {
          value[innerProp] = iterate(innerProp, value[innerProp], options);
        }
        break;
      }
      for (var _innerProp in value) {
        value[_innerProp] = iterate(prop + '-' + _innerProp, value[_innerProp], options);
      }
      break;
    case 'array':
      for (var i = 0; i < value.length; i++) {
        value[i] = iterate(prop, value[i], options);
      }
      break;
    case 'number':
      if (value !== 0) {
        convertedValue = value + (options[prop] || units[prop] || '');
      }
      break;
    default:
      break;
  }

  return convertedValue;
}

/**
 * Add unit to numeric values.
 */
function defaultUnit() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var camelCasedOptions = addCamelCasedVersion(options);

  function onProcessStyle(style, rule) {
    if (rule.type !== 'style') return style;

    for (var prop in style) {
      style[prop] = iterate(prop, style[prop], camelCasedOptions);
    }

    return style;
  }

  function onChangeValue(value, prop) {
    return iterate(prop, value, camelCasedOptions);
  }

  return { onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
}
});

var jssDefaultUnit = unwrapExports(lib$4);

var prefix = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _isInBrowser2 = _interopRequireDefault(_isInBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var js = ''; /**
              * Export javascript style and css style vendor prefixes.
              * Based on "transform" support test.
              */

var css = '';

// We should not do anything if required serverside.
if (_isInBrowser2['default']) {
  // Order matters. We need to check Webkit the last one because
  // other vendors use to add Webkit prefixes to some properties
  var jsCssMap = {
    Moz: '-moz-',
    // IE did it wrong again ...
    ms: '-ms-',
    O: '-o-',
    Webkit: '-webkit-'
  };
  var style = document.createElement('p').style;
  var testProp = 'Transform';

  for (var key in jsCssMap) {
    if (key + testProp in style) {
      js = key;
      css = jsCssMap[key];
      break;
    }
  }
}

/**
 * Vendor prefix string for the current browser.
 *
 * @type {{js: String, css: String}}
 * @api public
 */
exports['default'] = { js: js, css: css };
});

unwrapExports(prefix);

var camelize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = camelize;
var regExp = /[-\s]+(.)?/g;

/**
 * Convert dash separated strings to camel cased.
 *
 * @param {String} str
 * @return {String}
 */
function camelize(str) {
  return str.replace(regExp, toUpper);
}

function toUpper(match, c) {
  return c ? c.toUpperCase() : '';
}
});

unwrapExports(camelize_1);

var supportedProperty_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = supportedProperty;



var _isInBrowser2 = _interopRequireDefault(_isInBrowser);



var _prefix2 = _interopRequireDefault(prefix);



var _camelize2 = _interopRequireDefault(camelize_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var el = void 0;
var cache = {};

if (_isInBrowser2['default']) {
  el = document.createElement('p');

  /**
   * We test every property on vendor prefix requirement.
   * Once tested, result is cached. It gives us up to 70% perf boost.
   * http://jsperf.com/element-style-object-access-vs-plain-object
   *
   * Prefill cache with known css properties to reduce amount of
   * properties we need to feature test at runtime.
   * http://davidwalsh.name/vendor-prefix
   */
  var computed = window.getComputedStyle(document.documentElement, '');
  for (var key in computed) {
    if (!isNaN(key)) cache[computed[key]] = computed[key];
  }
}

/**
 * Test if a property is supported, returns supported property with vendor
 * prefix if required. Returns `false` if not supported.
 *
 * @param {String} prop dash separated
 * @return {String|Boolean}
 * @api public
 */
function supportedProperty(prop) {
  // For server-side rendering.
  if (!el) return prop;

  // We have not tested this prop yet, lets do the test.
  if (cache[prop] != null) return cache[prop];

  // Camelization is required because we can't test using
  // css syntax for e.g. in FF.
  // Test if property is supported as it is.
  if ((0, _camelize2['default'])(prop) in el.style) {
    cache[prop] = prop;
  }
  // Test if property is supported with vendor prefix.
  else if (_prefix2['default'].js + (0, _camelize2['default'])('-' + prop) in el.style) {
      cache[prop] = _prefix2['default'].css + prop;
    } else {
      cache[prop] = false;
    }

  return cache[prop];
}
});

unwrapExports(supportedProperty_1);

var supportedValue_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = supportedValue;



var _isInBrowser2 = _interopRequireDefault(_isInBrowser);



var _prefix2 = _interopRequireDefault(prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var cache = {};
var el = void 0;

if (_isInBrowser2['default']) el = document.createElement('p');

/**
 * Returns prefixed value if needed. Returns `false` if value is not supported.
 *
 * @param {String} property
 * @param {String} value
 * @return {String|Boolean}
 * @api public
 */
function supportedValue(property, value) {
  // For server-side rendering.
  if (!el) return value;

  // It is a string or a number as a string like '1'.
  // We want only prefixable values here.
  if (typeof value !== 'string' || !isNaN(parseInt(value, 10))) return value;

  var cacheKey = property + value;

  if (cache[cacheKey] != null) return cache[cacheKey];

  // IE can even throw an error in some cases, for e.g. style.content = 'bar'
  try {
    // Test value as it is.
    el.style[property] = value;
  } catch (err) {
    cache[cacheKey] = false;
    return false;
  }

  // Value is supported as it is.
  if (el.style[property] !== '') {
    cache[cacheKey] = value;
  } else {
    // Test value with vendor prefix.
    value = _prefix2['default'].css + value;

    // Hardcode test to convert "flex" to "-ms-flexbox" for IE10.
    if (value === '-ms-flex') value = '-ms-flexbox';

    el.style[property] = value;

    // Value is supported with vendor prefix.
    if (el.style[property] !== '') cache[cacheKey] = value;
  }

  if (!cache[cacheKey]) cache[cacheKey] = false;

  // Reset style value.
  el.style[property] = '';

  return cache[cacheKey];
}
});

unwrapExports(supportedValue_1);

var lib$5 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportedValue = exports.supportedProperty = exports.prefix = undefined;



var _prefix2 = _interopRequireDefault(prefix);



var _supportedProperty2 = _interopRequireDefault(supportedProperty_1);



var _supportedValue2 = _interopRequireDefault(supportedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  prefix: _prefix2['default'],
  supportedProperty: _supportedProperty2['default'],
  supportedValue: _supportedValue2['default']
}; /**
    * CSS Vendor prefix detection and property feature testing.
    *
    * @copyright Oleg Slobodskoi 2015
    * @website https://github.com/jsstyles/css-vendor
    * @license MIT
    */

exports.prefix = _prefix2['default'];
exports.supportedProperty = _supportedProperty2['default'];
exports.supportedValue = _supportedValue2['default'];
});

unwrapExports(lib$5);
var lib_1$1 = lib$5.supportedValue;
var lib_2$1 = lib$5.supportedProperty;
var lib_3$1 = lib$5.prefix;

var lib$6 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = jssVendorPrefixer;



var vendor = _interopRequireWildcard(lib$5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

/**
 * Add vendor prefix to a property name when needed.
 *
 * @param {Rule} rule
 * @api public
 */
function jssVendorPrefixer() {
  function onProcessRule(rule) {
    if (rule.type === 'keyframes') {
      rule.key = '@' + vendor.prefix.css + rule.key.substr(1);
    }
  }

  function onProcessStyle(style, rule) {
    if (rule.type !== 'style') return style;

    for (var prop in style) {
      var value = style[prop];

      var changeProp = false;
      var supportedProp = vendor.supportedProperty(prop);
      if (supportedProp && supportedProp !== prop) changeProp = true;

      var changeValue = false;
      var supportedValue = vendor.supportedValue(supportedProp, value);
      if (supportedValue && supportedValue !== value) changeValue = true;

      if (changeProp || changeValue) {
        if (changeProp) delete style[prop];
        style[supportedProp || prop] = supportedValue || value;
      }
    }

    return style;
  }

  function onChangeValue(value, prop) {
    return vendor.supportedValue(prop, value);
  }

  return { onProcessRule: onProcessRule, onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
}
});

var jssVendorPrefixer = unwrapExports(lib$6);

var lib$7 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = jssPropsSort;
/**
 * Sort props by length.
 */
function jssPropsSort() {
  function sort(prop0, prop1) {
    return prop0.length - prop1.length;
  }

  function onProcessStyle(style, rule) {
    if (rule.type !== 'style') return style;

    var newStyle = {};
    var props = Object.keys(style).sort(sort);
    for (var prop in props) {
      newStyle[props[prop]] = style[props[prop]];
    }
    return newStyle;
  }

  return { onProcessStyle: onProcessStyle };
}
});

var jssPropsSort = unwrapExports(lib$7);

// Subset of jss-preset-default with only the plugins the Material-UI
// components are using.
function jssPreset() {
  return {
    plugins: [jssGlobal(), jssNested(), jssCamelCase(), jssDefaultUnit(), jssVendorPrefixer(), jssPropsSort()]
  };
}

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, optionsArgument) {
	var clone = !optionsArgument || optionsArgument.clone !== false;

	return (clone && isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, optionsArgument)
		: value
}

function defaultArrayMerge(target, source, optionsArgument) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, optionsArgument)
	})
}

function mergeObject(target, source, optionsArgument) {
	var destination = {};
	if (isMergeableObject(target)) {
		Object.keys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], optionsArgument);
		});
	}
	Object.keys(source).forEach(function(key) {
		if (!isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], optionsArgument);
		} else {
			destination[key] = deepmerge(target[key], source[key], optionsArgument);
		}
	});
	return destination
}

function deepmerge(target, source, optionsArgument) {
	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var options = optionsArgument || { arrayMerge: defaultArrayMerge };
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, optionsArgument)
	} else if (sourceIsArray) {
		var arrayMerge = options.arrayMerge || defaultArrayMerge;
		return arrayMerge(target, source, optionsArgument)
	} else {
		return mergeObject(target, source, optionsArgument)
	}
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, optionsArgument)
	}, {})
};

var deepmerge_1 = deepmerge;

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

function createTypography(palette, typography) {
  var _ref = typeof typography === 'function' ? typography(palette) : typography,
      _ref$fontFamily = _ref.fontFamily,
      fontFamily = _ref$fontFamily === undefined ? '"Roboto", "Helvetica", "Arial", sans-serif' : _ref$fontFamily,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === undefined ? 14 : _ref$fontSize,
      _ref$fontWeightLight = _ref.fontWeightLight,
      fontWeightLight = _ref$fontWeightLight === undefined ? 300 : _ref$fontWeightLight,
      _ref$fontWeightRegula = _ref.fontWeightRegular,
      fontWeightRegular = _ref$fontWeightRegula === undefined ? 400 : _ref$fontWeightRegula,
      _ref$fontWeightMedium = _ref.fontWeightMedium,
      fontWeightMedium = _ref$fontWeightMedium === undefined ? 500 : _ref$fontWeightMedium,
      _ref$htmlFontSize = _ref.htmlFontSize,
      htmlFontSize = _ref$htmlFontSize === undefined ? 16 : _ref$htmlFontSize,
      other = _objectWithoutProperties(_ref, ['fontFamily', 'fontSize', 'fontWeightLight', 'fontWeightRegular', 'fontWeightMedium', 'htmlFontSize']);

  function pxToRem(value) {
    return value / htmlFontSize + 'rem';
  }

  return deepmerge_1({
    pxToRem: pxToRem,
    round: round,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeightLight: fontWeightLight,
    fontWeightRegular: fontWeightRegular,
    fontWeightMedium: fontWeightMedium,
    display4: {
      fontSize: pxToRem(112),
      fontWeight: fontWeightLight,
      fontFamily: fontFamily,
      letterSpacing: '-.04em',
      lineHeight: round(128 / 112) + 'em',
      marginLeft: '-.06em',
      color: palette.text.secondary
    },
    display3: {
      fontSize: pxToRem(56),
      fontWeight: fontWeightRegular,
      fontFamily: fontFamily,
      letterSpacing: '-.02em',
      lineHeight: round(73 / 56) + 'em',
      marginLeft: '-.04em',
      color: palette.text.secondary
    },
    display2: {
      fontSize: pxToRem(45),
      fontWeight: fontWeightRegular,
      fontFamily: fontFamily,
      lineHeight: round(48 / 45) + 'em',
      marginLeft: '-.04em',
      color: palette.text.secondary
    },
    display1: {
      fontSize: pxToRem(34),
      fontWeight: fontWeightRegular,
      fontFamily: fontFamily,
      lineHeight: round(41 / 34) + 'em',
      marginLeft: '-.04em',
      color: palette.text.secondary
    },
    headline: {
      fontSize: pxToRem(24),
      fontWeight: fontWeightRegular,
      fontFamily: fontFamily,
      lineHeight: round(32.5 / 24) + 'em',
      color: palette.text.primary
    },
    title: {
      fontSize: pxToRem(21),
      fontWeight: fontWeightMedium,
      fontFamily: fontFamily,
      lineHeight: round(24.5 / 21) + 'em',
      color: palette.text.primary
    },
    subheading: {
      fontSize: pxToRem(16),
      fontWeight: fontWeightRegular,
      fontFamily: fontFamily,
      lineHeight: round(24 / 16) + 'em',
      color: palette.text.primary
    },
    body2: {
      fontSize: pxToRem(14),
      fontWeight: fontWeightMedium,
      fontFamily: fontFamily,
      lineHeight: round(24 / 14) + 'em',
      color: palette.text.primary
    },
    body1: {
      fontSize: pxToRem(14),
      fontWeight: fontWeightRegular,
      fontFamily: fontFamily,
      lineHeight: round(20.5 / 14) + 'em',
      color: palette.text.primary
    },
    caption: {
      fontSize: pxToRem(12),
      fontWeight: fontWeightRegular,
      fontFamily: fontFamily,
      lineHeight: round(16.5 / 12) + 'em',
      color: palette.text.secondary
    },
    button: {
      fontSize: pxToRem(fontSize),
      textTransform: 'uppercase',
      fontWeight: fontWeightMedium,
      fontFamily: fontFamily
    }
  }, other, {
    clone: false // No need to clone deep
  });
}

// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
var keys$3 = ['xs', 'sm', 'md', 'lg', 'xl'];

// Keep in mind that @media is inclusive by the CSS specification.
function createBreakpoints(breakpoints) {
  var _breakpoints$values = breakpoints.values,
      values = _breakpoints$values === undefined ? {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  } : _breakpoints$values,
      _breakpoints$unit = breakpoints.unit,
      unit = _breakpoints$unit === undefined ? 'px' : _breakpoints$unit,
      _breakpoints$step = breakpoints.step,
      step = _breakpoints$step === undefined ? 5 : _breakpoints$step,
      other = _objectWithoutProperties(breakpoints, ['values', 'unit', 'step']);

  function up(key) {
    var value = typeof values[key] === 'number' ? values[key] : key;
    return '@media (min-width:' + value + unit + ')';
  }

  function down(key) {
    var endIndex = keys$3.indexOf(key) + 1;
    var upperbound = values[keys$3[endIndex]];

    if (endIndex === keys$3.length) {
      // xl down applies to all sizes
      return up('xs');
    }

    var value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : key;
    return '@media (max-width:' + (value - step / 100) + unit + ')';
  }

  function between(start, end) {
    var endIndex = keys$3.indexOf(end) + 1;

    if (endIndex === keys$3.length) {
      return up(start);
    }

    return '@media (min-width:' + values[start] + unit + ') and ' + ('(max-width:' + (values[keys$3[endIndex]] - step / 100) + unit + ')');
  }

  function only(key) {
    return between(key, key);
  }

  function width(key) {
    return values[key];
  }

  return _extends$1({
    keys: keys$3,
    values: values,
    up: up,
    down: down,
    between: between,
    only: only,
    width: width
  }, other);
}

var indigo = {
  50: '#e8eaf6',
  100: '#c5cae9',
  200: '#9fa8da',
  300: '#7986cb',
  400: '#5c6bc0',
  500: '#3f51b5',
  600: '#3949ab',
  700: '#303f9f',
  800: '#283593',
  900: '#1a237e',
  A100: '#8c9eff',
  A200: '#536dfe',
  A400: '#3d5afe',
  A700: '#304ffe'
};

var pink = {
  50: '#fce4ec',
  100: '#f8bbd0',
  200: '#f48fb1',
  300: '#f06292',
  400: '#ec407a',
  500: '#e91e63',
  600: '#d81b60',
  700: '#c2185b',
  800: '#ad1457',
  900: '#880e4f',
  A100: '#ff80ab',
  A200: '#ff4081',
  A400: '#f50057',
  A700: '#c51162'
};

var grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#d5d5d5',
  A200: '#aaaaaa',
  A400: '#303030',
  A700: '#616161'
};

var red = {
  50: '#ffebee',
  100: '#ffcdd2',
  200: '#ef9a9a',
  300: '#e57373',
  400: '#ef5350',
  500: '#f44336',
  600: '#e53935',
  700: '#d32f2f',
  800: '#c62828',
  900: '#b71c1c',
  A100: '#ff8a80',
  A200: '#ff5252',
  A400: '#ff1744',
  A700: '#d50000'
};

var common = {
  black: '#000',
  white: '#fff'
};

//  weak
/* eslint-disable no-use-before-define */

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clamp(value) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  process.env.NODE_ENV !== "production" ? warning_1$2(value >= min && value <= max, 'Material-UI: the value provided ' + value + ' is out of range [' + min + ', ' + max + '].') : void 0;

  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 *  @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 *  @returns {string} A CSS rgb color string
 */
function convertHexToRGB(color) {
  color = color.substr(1);

  var re = new RegExp('.{1,' + color.length / 3 + '}', 'g');
  var colors = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map(function (n) {
      return n + n;
    });
  }

  return colors ? 'rgb(' + colors.map(function (n) {
    return parseInt(n, 16);
  }).join(', ') + ')' : '';
}

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 */
function decomposeColor(color) {
  if (color.charAt(0) === '#') {
    return decomposeColor(convertHexToRGB(color));
  }

  var marker = color.indexOf('(');
  var type = color.substring(0, marker);
  var values = color.substring(marker + 1, color.length - 1).split(',');
  values = values.map(function (value) {
    return parseFloat(value);
  });

  return { type: type, values: values };
}

/**
 * Converts a color object with type and values to a string.
 *
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */
function recomposeColor(color) {
  var type = color.type;
  var values = color.values;


  if (type.indexOf('rgb') > -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map(function (n, i) {
      return i < 3 ? parseInt(n, 10) : n;
    });
  }

  if (type.indexOf('hsl') > -1) {
    values[1] = values[1] + '%';
    values[2] = values[2] + '%';
  }

  return color.type + '(' + values.join(', ') + ')';
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */
function getContrastRatio(foreground, background) {
  var lumA = getLuminance(foreground);
  var lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */
function getLuminance(color) {
  var decomposedColor = decomposeColor(color);

  if (decomposedColor.type.indexOf('rgb') > -1) {
    var rgb = decomposedColor.values.map(function (val) {
      val /= 255; // normalized
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    // Truncate at 3 digits
    return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
  } else if (decomposedColor.type.indexOf('hsl') > -1) {
    return decomposedColor.values[2] / 100;
  }

  throw new Error('Material-UI: unsupported `' + color + '` color.');
}

/**
 * Darken or lighten a colour, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function emphasize(color) {
  var coefficient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.15;

  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} value - value to set the alpha channel to in the range 0 -1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function fade(color, value) {
  process.env.NODE_ENV !== "production" ? warning_1$2(color, 'Material-UI: missing color argument in fade(' + color + ', ' + value + ').') : void 0;

  if (!color) return color;

  color = decomposeColor(color);
  value = clamp(value);

  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }
  color.values[3] = value;

  return recomposeColor(color);
}

/**
 * Darkens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function darken(color, coefficient) {
  process.env.NODE_ENV !== "production" ? warning_1$2(color, 'Material-UI: missing color argument in darken(' + color + ', ' + coefficient + ').') : void 0;

  if (!color) return color;

  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') > -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf('rgb') > -1) {
    for (var i = 0; i < 3; i += 1) {
      color.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color);
}

/**
 * Lightens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function lighten(color, coefficient) {
  process.env.NODE_ENV !== "production" ? warning_1$2(color, 'Material-UI: missing color argument in lighten(' + color + ', ' + coefficient + ').') : void 0;

  if (!color) return color;

  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') > -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf('rgb') > -1) {
    for (var i = 0; i < 3; i += 1) {
      color.values[i] += (255 - color.values[i]) * coefficient;
    }
  }

  return recomposeColor(color);
}

var light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.54)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)',
    // Text hints.
    hint: 'rgba(0, 0, 0, 0.38)'
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common.white,
    default: grey[50]
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.08)',
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.14)',
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)'
  }
};

var dark = {
  text: {
    primary: common.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)'
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: grey[800],
    default: '#303030'
  },
  action: {
    active: common.white,
    hover: 'rgba(255, 255, 255, 0.1)',
    selected: 'rgba(255, 255, 255, 0.2)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)'
  }
};

function addLightOrDark(intent, direction, shade, tonalOffset) {
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffset);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffset * 1.5);
    }
  }
}

function createPalette(palette) {
  var _palette$primary = palette.primary,
      primary = _palette$primary === undefined ? {
    light: indigo[300],
    main: indigo[500],
    dark: indigo[700]
  } : _palette$primary,
      _palette$secondary = palette.secondary,
      secondary = _palette$secondary === undefined ? {
    light: pink.A200,
    main: pink.A400,
    dark: pink.A700
  } : _palette$secondary,
      _palette$error = palette.error,
      error = _palette$error === undefined ? {
    light: red[300],
    main: red[500],
    dark: red[700]
  } : _palette$error,
      _palette$type = palette.type,
      type = _palette$type === undefined ? 'light' : _palette$type,
      _palette$contrastThre = palette.contrastThreshold,
      contrastThreshold = _palette$contrastThre === undefined ? 3 : _palette$contrastThre,
      _palette$tonalOffset = palette.tonalOffset,
      tonalOffset = _palette$tonalOffset === undefined ? 0.2 : _palette$tonalOffset,
      other = _objectWithoutProperties(palette, ['primary', 'secondary', 'error', 'type', 'contrastThreshold', 'tonalOffset']);

  function getContrastText(background) {
    // Use the same logic as
    // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
    // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
    var contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;

    if (process.env.NODE_ENV !== 'production') {
      var contrast = getContrastRatio(background, contrastText);
      process.env.NODE_ENV !== "production" ? warning_1$2(contrast >= 3, ['Material-UI: the contrast ratio of ' + contrast + ':1 for ' + contrastText + ' on ' + background, 'falls below the WACG recommended absolute minimum contrast ratio of 3:1.', 'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast'].join('\n')) : void 0;
    }

    return contrastText;
  }

  function augmentColor(color, mainShade, lightShade, darkShade) {
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }
    addLightOrDark(color, 'light', lightShade, tonalOffset);
    addLightOrDark(color, 'dark', darkShade, tonalOffset);
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
  }

  augmentColor(primary, 500, 300, 700);
  augmentColor(secondary, 'A400', 'A200', 'A700');
  augmentColor(error, 500, 300, 700);

  var types = { dark: dark, light: light };

  process.env.NODE_ENV !== "production" ? warning_1$2(types[type], 'Material-UI: the palette type `' + type + '` is not supported.') : void 0;

  var paletteOutput = deepmerge_1(_extends$1({
    // A collection of common colors.
    common: common,
    // The palette type, can be light or dark.
    type: type,
    // The colors used to represent primary interface elements for a user.
    primary: primary,
    // The colors used to represent secondary interface elements for a user.
    secondary: secondary,
    // The colors used to represent interface elements that the user should be made aware of.
    error: error,
    // The grey colors.
    grey: grey,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: contrastThreshold,
    // Take a background color and return the color of the text to maximize the contrast.
    getContrastText: getContrastText,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: tonalOffset
  }, types[type]), other, {
    clone: false // No need to clone deep
  });

  return paletteOutput;
}

function createMixins(breakpoints, spacing, mixins) {
  var _toolbar;

  return _extends$1({
    gutters: function gutters(styles) {
      return _extends$1({
        paddingLeft: spacing.unit * 2,
        paddingRight: spacing.unit * 2
      }, styles, _defineProperty$1({}, breakpoints.up('sm'), _extends$1({
        paddingLeft: spacing.unit * 3,
        paddingRight: spacing.unit * 3
      }, styles[breakpoints.up('sm')])));
    },
    toolbar: (_toolbar = {
      minHeight: 56
    }, _defineProperty$1(_toolbar, breakpoints.up('xs') + ' and (orientation: landscape)', {
      minHeight: 48
    }), _defineProperty$1(_toolbar, breakpoints.up('sm'), {
      minHeight: 64
    }), _toolbar)
  }, mixins);
}

var shadowKeyUmbraOpacity = 0.2;
var shadowKeyPenumbraOpacity = 0.14;
var shadowAmbientShadowOpacity = 0.12;

function createShadow() {
  return [(arguments.length <= 0 ? undefined : arguments[0]) + 'px ' + (arguments.length <= 1 ? undefined : arguments[1]) + 'px ' + (arguments.length <= 2 ? undefined : arguments[2]) + 'px ' + (arguments.length <= 3 ? undefined : arguments[3]) + 'px rgba(0, 0, 0, ' + shadowKeyUmbraOpacity + ')', (arguments.length <= 4 ? undefined : arguments[4]) + 'px ' + (arguments.length <= 5 ? undefined : arguments[5]) + 'px ' + (arguments.length <= 6 ? undefined : arguments[6]) + 'px ' + (arguments.length <= 7 ? undefined : arguments[7]) + 'px rgba(0, 0, 0, ' + shadowKeyPenumbraOpacity + ')', (arguments.length <= 8 ? undefined : arguments[8]) + 'px ' + (arguments.length <= 9 ? undefined : arguments[9]) + 'px ' + (arguments.length <= 10 ? undefined : arguments[10]) + 'px ' + (arguments.length <= 11 ? undefined : arguments[11]) + 'px rgba(0, 0, 0, ' + shadowAmbientShadowOpacity + ')'].join(',');
}

var shadows = ['none', createShadow(0, 1, 3, 0, 0, 1, 1, 0, 0, 2, 1, -1), createShadow(0, 1, 5, 0, 0, 2, 2, 0, 0, 3, 1, -2), createShadow(0, 1, 8, 0, 0, 3, 4, 0, 0, 3, 3, -2), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];

// 20.1.2.4 Number.isNaN(number)


_export(_export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

var isNan = _core.Number.isNaN;

var isNan$2 = createCommonjsModule(function (module) {
module.exports = { "default": isNan, __esModule: true };
});

var _Number$isNaN = unwrapExports(isNan$2);

/* eslint-disable no-param-reassign */

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
var easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
};

// Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
var duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};

var formatMs = function formatMs(milliseconds) {
  return Math.round(milliseconds) + 'ms';
};
var isString = function isString(value) {
  return typeof value === 'string';
};
var isNumber = function isNumber(value) {
  return !_Number$isNaN(parseFloat(value));
};

/**
 * @param {string|Array} props
 * @param {object} param
 * @param {string} param.prop
 * @param {number} param.duration
 * @param {string} param.easing
 * @param {number} param.delay
 */
var transitions = {
  easing: easing,
  duration: duration,
  create: function create() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['all'];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _options$duration = options.duration,
        durationOption = _options$duration === undefined ? duration.standard : _options$duration,
        _options$easing = options.easing,
        easingOption = _options$easing === undefined ? easing.easeInOut : _options$easing,
        _options$delay = options.delay,
        delay = _options$delay === undefined ? 0 : _options$delay,
        other = _objectWithoutProperties(options, ['duration', 'easing', 'delay']);

    process.env.NODE_ENV !== "production" ? warning_1$2(isString(props) || Array.isArray(props), 'Material-UI: argument "props" must be a string or Array.') : void 0;
    process.env.NODE_ENV !== "production" ? warning_1$2(isNumber(durationOption) || isString(durationOption), 'Material-UI: argument "duration" must be a number or a string but found ' + durationOption + '.') : void 0;
    process.env.NODE_ENV !== "production" ? warning_1$2(isString(easingOption), 'Material-UI: argument "easing" must be a string.') : void 0;
    process.env.NODE_ENV !== "production" ? warning_1$2(isNumber(delay) || isString(delay), 'Material-UI: argument "delay" must be a string or a string.') : void 0;
    process.env.NODE_ENV !== "production" ? warning_1$2(_Object$keys(other).length === 0, 'Material-UI: unrecognized argument(s) [' + _Object$keys(other).join(',') + ']') : void 0;

    return (Array.isArray(props) ? props : [props]).map(function (animatedProp) {
      return animatedProp + ' ' + (typeof durationOption === 'string' ? durationOption : formatMs(durationOption)) + ' ' + easingOption + ' ' + (typeof delay === 'string' ? delay : formatMs(delay));
    }).join(',');
  },
  getAutoHeightDuration: function getAutoHeightDuration(height) {
    if (!height) {
      return 0;
    }

    var constant = height / 36;

    // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
    return Math.round((4 + 15 * Math.pow(constant, 0.25) + constant / 5) * 10);
  }
};

// We need to centralize the zIndex definitions as they work
// like global values in the browser.
var zIndex = {
  mobileStepper: 1000,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};

var spacing = {
  // All components align to an 8dp square baseline grid for mobile, tablet, and desktop.
  // https://material.io/guidelines/layout/metrics-keylines.html#metrics-keylines-baseline-grids
  unit: 8
};

function createMuiTheme() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _options$palette = options.palette,
      paletteInput = _options$palette === undefined ? {} : _options$palette,
      _options$breakpoints = options.breakpoints,
      breakpointsInput = _options$breakpoints === undefined ? {} : _options$breakpoints,
      _options$mixins = options.mixins,
      mixinsInput = _options$mixins === undefined ? {} : _options$mixins,
      _options$typography = options.typography,
      typographyInput = _options$typography === undefined ? {} : _options$typography,
      shadowsInput = options.shadows,
      other = _objectWithoutProperties(options, ['palette', 'breakpoints', 'mixins', 'typography', 'shadows']);

  var palette = createPalette(paletteInput);
  var breakpoints = createBreakpoints(breakpointsInput);

  var muiTheme = _extends$1({
    direction: 'ltr',
    palette: palette,
    typography: createTypography(palette, typographyInput),
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    breakpoints: breakpoints,
    shadows: shadowsInput || shadows
  }, deepmerge_1({
    transitions: transitions,
    spacing: spacing,
    zIndex: zIndex
  }, other));

  process.env.NODE_ENV !== "production" ? warning_1$2(muiTheme.shadows.length === 25, 'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.') : void 0;

  return muiTheme;
}

// Same value used by react-jss
var CHANNEL = '__THEMING__';

var themeListener = {
  contextTypes: _defineProperty$1({}, CHANNEL, propTypes.object),
  initial: function initial(context) {
    if (!context[CHANNEL]) {
      return null;
    }

    return context[CHANNEL].getState();
  },
  subscribe: function subscribe(context, cb) {
    if (!context[CHANNEL]) {
      return null;
    }

    return context[CHANNEL].subscribe(cb);
  },
  unsubscribe: function unsubscribe(context, subscriptionId) {
    if (context[CHANNEL]) {
      context[CHANNEL].unsubscribe(subscriptionId);
    }
  }
};

var generatorCounter = 0;

// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// It's inspired by
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js
function createGenerateClassName$2() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$dangerouslyU = options.dangerouslyUseGlobalCSS,
      dangerouslyUseGlobalCSS = _options$dangerouslyU === undefined ? false : _options$dangerouslyU,
      _options$productionPr = options.productionPrefix,
      productionPrefix = _options$productionPr === undefined ? 'jss' : _options$productionPr;

  var escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
  var ruleCounter = 0;

  // - HMR can lead to many class name generators being instantiated,
  // so the warning is only triggered in production.
  // - We expect a class name generator to be instantiated per new request on the server,
  // so the warning is only triggered client side.
  // - You can get away with having multiple class name generators
  // by modifying the `productionPrefix`.
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && productionPrefix === 'jss') {
    generatorCounter += 1;

    if (generatorCounter > 2) {
      // eslint-disable-next-line no-console
      console.error(['Material-UI: we have detected more than needed creation of the class name generator.', 'You should only use one class name generator on the client side.', 'If you do otherwise, you take the risk to have conflicting class names in production.'].join('\n'));
    }
  }

  return function (rule, styleSheet) {
    ruleCounter += 1;
    process.env.NODE_ENV !== "production" ? warning_1$2(ruleCounter < 1e10, ['Material-UI: you might have a memory leak.', 'The ruleCounter is not supposed to grow that much.'].join('')) : void 0;

    // Code branch the whole block at the expense of more code.
    if (dangerouslyUseGlobalCSS) {
      if (styleSheet && styleSheet.options.classNamePrefix) {
        var prefix = styleSheet.options.classNamePrefix;
        // Sanitize the string as will be used to prefix the generated class name.
        prefix = prefix.replace(escapeRegex, '-');

        if (prefix.match(/^Mui/)) {
          return prefix + '-' + rule.key;
        }

        if (process.env.NODE_ENV !== 'production') {
          return prefix + '-' + rule.key + '-' + ruleCounter;
        }
      }

      if (process.env.NODE_ENV === 'production') {
        return '' + productionPrefix + ruleCounter;
      }

      return rule.key + '-' + ruleCounter;
    }

    if (process.env.NODE_ENV === 'production') {
      return '' + productionPrefix + ruleCounter;
    }

    if (styleSheet && styleSheet.options.classNamePrefix) {
      var _prefix = styleSheet.options.classNamePrefix;
      // Sanitize the string as will be used to prefix the generated class name.
      _prefix = _prefix.replace(escapeRegex, '-');

      return _prefix + '-' + rule.key + '-' + ruleCounter;
    }

    return rule.key + '-' + ruleCounter;
  };
}

function getStylesCreator(stylesOrCreator) {
  var themingEnabled = typeof stylesOrCreator === 'function';

  function create(theme, name) {
    var styles = themingEnabled ? stylesOrCreator(theme) : stylesOrCreator;

    if (!theme.overrides || !name || !theme.overrides[name]) {
      return styles;
    }

    var overrides = theme.overrides[name];
    var stylesWithOverrides = _extends$1({}, styles);

    _Object$keys(overrides).forEach(function (key) {
      process.env.NODE_ENV !== "production" ? warning_1$2(stylesWithOverrides[key], ['Material-UI: you are trying to override a style that does not exist.', 'Fix the `' + key + '` key of `theme.overrides.' + name + '`.'].join('\n')) : void 0;
      stylesWithOverrides[key] = deepmerge_1(stylesWithOverrides[key], overrides[key]);
    });

    return stylesWithOverrides;
  }

  return {
    create: create,
    options: {},
    themingEnabled: themingEnabled
  };
}

// New JSS instance.
var jss = lib_1(jssPreset());

// Use a singleton or the provided one by the context.
var generateClassName = createGenerateClassName$2();

// Global index counter to preserve source order.
// As we create the style sheet during componentWillMount lifecycle,
// children are handled after the parents, so the order of style elements would
// be parent->child. It is a problem though when a parent passes a className
// which needs to override any childs styles. StyleSheet of the child has a higher
// specificity, because of the source order.
// So our solution is to render sheets them in the reverse order child->sheet, so
// that parent has a higher specificity.
var indexCounter = _Number$MIN_SAFE_INTEGER;

var sheetsManager = new _Map();

// We use the same empty object to ref count the styles that don't need a theme object.
var noopTheme = {};

// In order to have self-supporting components, we rely on default theme when not provided.
var defaultTheme = void 0;

function getDefaultTheme() {
  if (defaultTheme) {
    return defaultTheme;
  }

  defaultTheme = createMuiTheme();
  return defaultTheme;
}

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new component, with a `classes` property.
var withStyles = function withStyles(stylesOrCreator) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (Component) {
    var _options$withTheme = options.withTheme,
        withTheme = _options$withTheme === undefined ? false : _options$withTheme,
        _options$flip = options.flip,
        flip = _options$flip === undefined ? null : _options$flip,
        name = options.name,
        styleSheetOptions = _objectWithoutProperties(options, ['withTheme', 'flip', 'name']);

    var stylesCreator = getStylesCreator(stylesOrCreator);
    var listenToTheme = stylesCreator.themingEnabled || withTheme || typeof name === 'string';

    indexCounter += 1;
    stylesCreator.options.index = indexCounter;

    process.env.NODE_ENV !== "production" ? warning_1$2(indexCounter < 0, ['Material-UI: you might have a memory leak.', 'The indexCounter is not supposed to grow that much.'].join(' ')) : void 0;

    var WithStyles = function (_React$Component) {
      _inherits(WithStyles, _React$Component);

      function WithStyles(props, context) {
        _classCallCheck(this, WithStyles);

        var _this = _possibleConstructorReturn(this, (WithStyles.__proto__ || _Object$getPrototypeOf(WithStyles)).call(this, props, context));

        _this.state = {};
        _this.disableStylesGeneration = false;
        _this.jss = null;
        _this.sheetOptions = null;
        _this.sheetsManager = sheetsManager;
        _this.stylesCreatorSaved = null;
        _this.theme = null;
        _this.unsubscribeId = null;


        _this.jss = _this.context[ns_1] || jss;

        var muiThemeProviderOptions = _this.context.muiThemeProviderOptions;

        if (muiThemeProviderOptions) {
          if (muiThemeProviderOptions.sheetsManager) {
            _this.sheetsManager = muiThemeProviderOptions.sheetsManager;
          }

          _this.disableStylesGeneration = muiThemeProviderOptions.disableStylesGeneration;
        }

        // Attach the stylesCreator to the instance of the component as in the context
        // of react-hot-loader the hooks can be executed in a different closure context:
        // https://github.com/gaearon/react-hot-loader/blob/master/src/patch.dev.js#L107
        _this.stylesCreatorSaved = stylesCreator;
        _this.sheetOptions = _extends$1({
          generateClassName: generateClassName
        }, _this.context[ns_4]);
        // We use || as the function call is lazy evaluated.
        _this.theme = listenToTheme ? themeListener.initial(context) || getDefaultTheme() : noopTheme;
        return _this;
      }

      _createClass(WithStyles, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.attach(this.theme);
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          if (!listenToTheme) {
            return;
          }

          this.unsubscribeId = themeListener.subscribe(this.context, function (theme) {
            var oldTheme = _this2.theme;
            _this2.theme = theme;
            _this2.attach(_this2.theme);

            // Rerender the component so the underlying component gets the theme update.
            // By theme update we mean receiving and applying the new class names.
            _this2.setState({}, function () {
              _this2.detach(oldTheme);
            });
          });
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
          // react-hot-loader specific logic
          if (this.stylesCreatorSaved === stylesCreator || process.env.NODE_ENV === 'production') {
            return;
          }

          this.detach(this.theme);
          this.stylesCreatorSaved = stylesCreator;
          this.attach(this.theme);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.detach(this.theme);

          if (this.unsubscribeId !== null) {
            themeListener.unsubscribe(this.context, this.unsubscribeId);
          }
        }
      }, {
        key: 'attach',
        value: function attach(theme) {
          if (this.disableStylesGeneration) {
            return;
          }

          var stylesCreatorSaved = this.stylesCreatorSaved;
          var sheetManager = this.sheetsManager.get(stylesCreatorSaved);

          if (!sheetManager) {
            sheetManager = new _Map();
            this.sheetsManager.set(stylesCreatorSaved, sheetManager);
          }

          var sheetManagerTheme = sheetManager.get(theme);

          if (!sheetManagerTheme) {
            sheetManagerTheme = {
              refs: 0,
              sheet: null
            };
            sheetManager.set(theme, sheetManagerTheme);
          }

          if (sheetManagerTheme.refs === 0) {
            var styles = stylesCreatorSaved.create(theme, name);
            var meta = name;

            if (process.env.NODE_ENV !== 'production' && !meta) {
              meta = getDisplayName(Component);
            }

            var sheet = this.jss.createStyleSheet(styles, _extends$1({
              meta: meta,
              classNamePrefix: meta,
              flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl',
              link: false
            }, this.sheetOptions, stylesCreatorSaved.options, {
              name: name
            }, styleSheetOptions));

            sheetManagerTheme.sheet = sheet;
            sheet.attach();

            var sheetsRegistry = this.context[ns_2];
            if (sheetsRegistry) {
              sheetsRegistry.add(sheet);
            }
          }

          sheetManagerTheme.refs += 1;
        }
      }, {
        key: 'detach',
        value: function detach(theme) {
          if (this.disableStylesGeneration) {
            return;
          }

          var stylesCreatorSaved = this.stylesCreatorSaved;
          var sheetManager = this.sheetsManager.get(stylesCreatorSaved);
          var sheetManagerTheme = sheetManager.get(theme);

          sheetManagerTheme.refs -= 1;

          if (sheetManagerTheme.refs === 0) {
            sheetManager.delete(theme);
            this.jss.removeStyleSheet(sheetManagerTheme.sheet);
            var sheetsRegistry = this.context[ns_2];
            if (sheetsRegistry) {
              sheetsRegistry.remove(sheetManagerTheme.sheet);
            }
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _this3 = this;

          var _props = this.props,
              classesProp = _props.classes,
              innerRef = _props.innerRef,
              other = _objectWithoutProperties(_props, ['classes', 'innerRef']);

          var classes = void 0;
          var renderedClasses = {};

          if (!this.disableStylesGeneration) {
            var sheetManager = this.sheetsManager.get(this.stylesCreatorSaved);
            var sheetsManagerTheme = sheetManager.get(this.theme);
            renderedClasses = sheetsManagerTheme.sheet.classes;
          }

          if (classesProp) {
            classes = _extends$1({}, renderedClasses, _Object$keys(classesProp).reduce(function (accumulator, key) {
              process.env.NODE_ENV !== "production" ? warning_1$2(renderedClasses[key] || _this3.disableStylesGeneration, ['Material-UI: the key `' + key + '` ' + ('provided to the classes property is not implemented in ' + getDisplayName(Component) + '.'), 'You can only override one of the following: ' + _Object$keys(renderedClasses).join(',')].join('\n')) : void 0;

              process.env.NODE_ENV !== "production" ? warning_1$2(!classesProp[key] || typeof classesProp[key] === 'string', ['Material-UI: the key `' + key + '` ' + ('provided to the classes property is not valid for ' + getDisplayName(Component) + '.'), 'You need to provide a non empty string instead of: ' + classesProp[key] + '.'].join('\n')) : void 0;

              if (classesProp[key]) {
                accumulator[key] = renderedClasses[key] + ' ' + classesProp[key];
              }

              return accumulator;
            }, {}));
          } else {
            classes = renderedClasses;
          }

          var more = {};

          // Provide the theme to the wrapped component.
          // So we don't have to use the `withTheme()` Higher-order Component.
          if (withTheme) {
            more.theme = this.theme;
          }

          return React.createElement(Component, _extends$1({ classes: classes }, more, other, { ref: innerRef }));
        }
      }]);

      return WithStyles;
    }(React.Component);

    WithStyles.propTypes = process.env.NODE_ENV !== "production" ? {
      /**
       * Useful to extend the style applied to components.
       */
      classes: propTypes.object,
      /**
       * Use that property to pass a ref callback to the decorated component.
       */
      innerRef: propTypes.func
    } : {};

    WithStyles.contextTypes = _extends$1({
      muiThemeProviderOptions: propTypes.object
    }, contextTypes$1, listenToTheme ? themeListener.contextTypes : {});

    if (process.env.NODE_ENV !== 'production') {
      WithStyles.displayName = wrapDisplayName(Component, 'WithStyles');
    }

    hoistNonReactStatics(WithStyles, Component);

    if (process.env.NODE_ENV !== 'production') {
      // Exposed for test purposes.
      WithStyles.Naked = Component;
      WithStyles.options = options;
    }

    return WithStyles;
  };
};

//  weak

function capitalize(string) {
  if (process.env.NODE_ENV !== 'production' && typeof string !== 'string') {
    throw new Error('Material-UI: capitalize(string) expects a string argument.');
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

function contains(obj, pred) {
  return _Object$keys(pred).every(function (key) {
    return obj.hasOwnProperty(key) && obj[key] === pred[key];
  });
}

function findIndex(arr, pred) {
  var predType = typeof pred === 'undefined' ? 'undefined' : _typeof(pred);
  for (var i = 0; i < arr.length; i += 1) {
    if (predType === 'function' && !!pred(arr[i], i, arr) === true) {
      return i;
    }
    if (predType === 'object' && contains(arr[i], pred)) {
      return i;
    }
    if (['string', 'number', 'boolean'].indexOf(predType) !== -1) {
      return arr.indexOf(pred);
    }
  }
  return -1;
}

function find(arr, pred) {
  var index = findIndex(arr, pred);
  return index > -1 ? arr[index] : undefined;
}

/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (func) {
    return func != null;
  }).reduce(function (acc, func) {
    process.env.NODE_ENV !== "production" ? warning_1$2(typeof func === 'function', 'Material-UI: invalid Argument Type, must only provide functions, undefined, or null.') : void 0;

    return function chainedFunction() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      func.apply(this, args);
    };
  }, function () {});
}

var styles = function styles(theme) {
  var shadows = {};
  theme.shadows.forEach(function (shadow, index) {
    shadows['shadow' + index] = {
      boxShadow: shadow
    };
  });

  return _extends$1({
    root: {
      backgroundColor: theme.palette.background.paper
    },
    rounded: {
      borderRadius: 2
    }
  }, shadows);
};

function Paper(props) {
  var classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      square = props.square,
      elevation = props.elevation,
      other = _objectWithoutProperties(props, ['classes', 'className', 'component', 'square', 'elevation']);

  process.env.NODE_ENV !== "production" ? warning_1$2(elevation >= 0 && elevation < 25, 'Material-UI: this elevation `' + elevation + '` is not implemented.') : void 0;

  var className = classnames(classes.root, classes['shadow' + (elevation >= 0 ? elevation : 0)], _defineProperty$1({}, classes.rounded, !square), classNameProp);

  return React.createElement(Component, _extends$1({ className: className }, other));
}

Paper.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It's accepting values between 0 and 24 inclusive.
   */
  elevation: propTypes.number,
  /**
   * If `true`, rounded corners are disabled.
   */
  square: propTypes.bool
} : {};

Paper.defaultProps = {
  component: 'div',
  elevation: 2,
  square: false
};

var Paper$1 = withStyles(styles, { name: 'MuiPaper' })(Paper);

// @inheritedComponent Paper

var styles$1 = function styles(theme) {
  var backgroundColorDefault = theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box', // Prevent padding issue with the Modal and fixed positioned AppBar.
      zIndex: theme.zIndex.appBar,
      flexShrink: 0
    },
    positionFixed: {
      position: 'fixed',
      top: 0,
      left: 'auto',
      right: 0
    },
    positionAbsolute: {
      position: 'absolute',
      top: 0,
      left: 'auto',
      right: 0
    },
    positionSticky: {
      position: 'sticky',
      top: 0,
      left: 'auto',
      right: 0
    },
    positionStatic: {
      position: 'static'
    },
    colorDefault: {
      backgroundColor: backgroundColorDefault,
      color: theme.palette.getContrastText(backgroundColorDefault)
    },
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    }
  };
};

function AppBar(props) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      position = props.position,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'color', 'position']);

  var className = classnames(classes.root, classes['position' + capitalize(position)], (_classNames = {}, _defineProperty$1(_classNames, classes['color' + capitalize(color)], color !== 'inherit'), _defineProperty$1(_classNames, 'mui-fixed', position === 'fixed'), _classNames), classNameProp);

  return React.createElement(
    Paper$1,
    _extends$1({ square: true, component: 'header', elevation: 4, className: className }, other),
    children
  );
}

AppBar.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: propTypes.oneOf(['inherit', 'primary', 'secondary', 'default']),
  /**
   * The positioning type. The behavior of the different options is described
   * [here](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   */
  position: propTypes.oneOf(['fixed', 'absolute', 'sticky', 'static'])
} : {};

AppBar.defaultProps = {
  color: 'primary',
  position: 'fixed'
};

var AppBar$1 = withStyles(styles$1, { name: 'MuiAppBar' })(AppBar);

var styles$2 = function styles(theme) {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 40,
      height: 40,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(20),
      borderRadius: '50%',
      overflow: 'hidden',
      userSelect: 'none'
    },
    colorDefault: {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
    },
    img: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      // Handle non-square image. The property isn't supported by IE11.
      objectFit: 'cover'
    }
  };
};

function Avatar(props) {
  var alt = props.alt,
      childrenProp = props.children,
      childrenClassNameProp = props.childrenClassName,
      classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      imgProps = props.imgProps,
      sizes = props.sizes,
      src = props.src,
      srcSet = props.srcSet,
      other = _objectWithoutProperties(props, ['alt', 'children', 'childrenClassName', 'classes', 'className', 'component', 'imgProps', 'sizes', 'src', 'srcSet']);

  var className = classnames(classes.root, _defineProperty$1({}, classes.colorDefault, childrenProp && !src && !srcSet), classNameProp);
  var children = null;

  if (childrenProp) {
    if (childrenClassNameProp && typeof childrenProp !== 'string' && React.isValidElement(childrenProp)) {
      var childrenClassName = classnames(childrenClassNameProp, childrenProp.props.className);
      children = React.cloneElement(childrenProp, { className: childrenClassName });
    } else {
      children = childrenProp;
    }
  } else if (src || srcSet) {
    children = React.createElement('img', _extends$1({
      alt: alt,
      src: src,
      srcSet: srcSet,
      sizes: sizes,
      className: classes.img
    }, imgProps));
  }

  return React.createElement(
    Component,
    _extends$1({ className: className }, other),
    children
  );
}

Avatar.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: propTypes.string,
  /**
   * Used to render icon or text elements inside the Avatar.
   * `src` and `alt` props will not be used and no `img` will
   * be rendered by default.
   *
   * This can be an element, or just a string.
   */
  children: propTypes.node,
  /**
   * @ignore
   * The className of the child element.
   * Used by Chip and ListItemIcon to style the Avatar icon.
   */
  childrenClassName: propTypes.string,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Properties applied to the `img` element when the component
   * is used to display an image.
   */
  imgProps: propTypes.object,
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: propTypes.string,
  /**
   * The `src` attribute for the `img` element.
   */
  src: propTypes.string,
  /**
   * The `srcSet` attribute for the `img` element.
   */
  srcSet: propTypes.string
} : {};

Avatar.defaultProps = {
  component: 'div'
};

var Avatar$1 = withStyles(styles$2, { name: 'MuiAvatar' })(Avatar);

var RADIUS = 12;

var styles$3 = function styles(theme) {
  return {
    root: {
      position: 'relative',
      display: 'inline-flex',
      // For correct alignment with the text.
      verticalAlign: 'middle'
    },
    badge: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: -RADIUS,
      right: -RADIUS,
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeight,
      fontSize: theme.typography.pxToRem(RADIUS),
      width: RADIUS * 2,
      height: RADIUS * 2,
      borderRadius: '50%',
      backgroundColor: theme.palette.color,
      color: theme.palette.textColor,
      zIndex: 1 // Render the badge on top of potential ripples.
    },
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    },
    colorError: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText
    }
  };
};

function Badge(props) {
  var badgeContent = props.badgeContent,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      ComponentProp = props.component,
      other = _objectWithoutProperties(props, ['badgeContent', 'children', 'classes', 'className', 'color', 'component']);

  var badgeClassName = classnames(classes.badge, _defineProperty$1({}, classes['color' + capitalize(color)], color !== 'default'));

  return React.createElement(
    ComponentProp,
    _extends$1({ className: classnames(classes.root, classNameProp) }, other),
    children,
    React.createElement(
      'span',
      { className: badgeClassName },
      badgeContent
    )
  );
}

Badge.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content rendered within the badge.
   */
  badgeContent: propTypes.node.isRequired,
  /**
   * The badge will be added relative to this node.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: propTypes.oneOf(['default', 'primary', 'secondary', 'error']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func])
} : {};

Badge.defaultProps = {
  color: 'default',
  component: 'span'
};

var Badge$1 = withStyles(styles$3, { name: 'MuiBadge' })(Badge);

var styles$4 = function styles(theme) {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      height: 56,
      backgroundColor: theme.palette.background.paper
    }
  };
};

function BottomNavigation(props) {
  var childrenProp = props.children,
      classes = props.classes,
      classNameProp = props.className,
      onChange = props.onChange,
      showLabels = props.showLabels,
      value = props.value,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'onChange', 'showLabels', 'value']);

  var className = classnames(classes.root, classNameProp);

  var children = React.Children.map(childrenProp, function (child, childIndex) {
    if (!React.isValidElement(child)) {
      return null;
    }

    var childValue = child.props.value || childIndex;
    return React.cloneElement(child, {
      selected: childValue === value,
      showLabel: child.props.showLabel !== undefined ? child.props.showLabel : showLabels,
      value: childValue,
      onChange: onChange
    });
  });

  return React.createElement(
    'div',
    _extends$1({ className: className }, other),
    children
  );
}

BottomNavigation.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value We default to the index of the child
   */
  onChange: propTypes.func,
  /**
   * If `true`, all `BottomNavigationAction`s will show their labels.
   * By default, only the selected `BottomNavigationAction` will show its label.
   */
  showLabels: propTypes.bool,
  /**
   * The value of the currently selected `BottomNavigationAction`.
   */
  value: propTypes.any
} : {};

BottomNavigation.defaultProps = {
  showLabels: false
};

var BottomNavigation$1 = withStyles(styles$4, { name: 'MuiBottomNavigation' })(BottomNavigation);

var keycode = createCommonjsModule(function (module, exports) {
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode;
    if (hasKeyCode) searchInput = hasKeyCode;
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput);

  // check codes
  var foundNamedKey = codes[search.toLowerCase()];
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()];
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
};

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
};

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
};


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32;

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i;

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111;

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96;

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {}; // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i;

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias];
}
});

var keycode_1 = keycode.code;
var keycode_2 = keycode.codes;
var keycode_3 = keycode.aliases;
var keycode_4 = keycode.names;
var keycode_5 = keycode.title;

var inDOM = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
module.exports = exports['default'];
});

var inDOM$1 = unwrapExports(inDOM);

var contains$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _inDOM2 = _interopRequireDefault(inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  return _inDOM2.default ? function (context, node) {
    if (context.contains) {
      return context.contains(node);
    } else if (context.compareDocumentPosition) {
      return context === node || !!(context.compareDocumentPosition(node) & 16);
    } else {
      return fallback(context, node);
    }
  } : fallback;
}();

function fallback(context, node) {
  if (node) do {
    if (node === context) return true;
  } while (node = node.parentNode);

  return false;
}
module.exports = exports['default'];
});

var contains$2 = unwrapExports(contains$1);

function addEventListener (node, event, handler, capture) {
  node.addEventListener(event, handler, capture);
  return {
    remove: function remove() {
      node.removeEventListener(event, handler, capture);
    }
  };
}

//  weak

var internal = {
  listening: false,
  focusKeyPressed: false
};

function focusKeyPressed(pressed) {
  if (typeof pressed !== 'undefined') {
    internal.focusKeyPressed = Boolean(pressed);
  }

  return internal.focusKeyPressed;
}

function detectKeyboardFocus(instance, element, callback) {
  var attempt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  process.env.NODE_ENV !== "production" ? warning_1$2(instance.keyboardFocusCheckTime, 'Material-UI: missing instance.keyboardFocusCheckTime') : void 0;
  process.env.NODE_ENV !== "production" ? warning_1$2(instance.keyboardFocusMaxCheckTimes, 'Material-UI: missing instance.keyboardFocusMaxCheckTimes') : void 0;

  instance.keyboardFocusTimeout = setTimeout(function () {
    if (focusKeyPressed() && (document.activeElement === element || contains$2(element, document.activeElement))) {
      callback();
    } else if (attempt < instance.keyboardFocusMaxCheckTimes) {
      detectKeyboardFocus(instance, element, callback, attempt + 1);
    }
  }, instance.keyboardFocusCheckTime);
}

var FOCUS_KEYS = ['tab', 'enter', 'space', 'esc', 'up', 'down', 'left', 'right'];

function isFocusKey(event) {
  return FOCUS_KEYS.indexOf(keycode(event)) !== -1;
}

function listenForFocusKeys() {
  // It's a singleton, we only need to listen once.
  // Also, this logic is client side only, we don't need a teardown.
  if (!internal.listening) {
    addEventListener(window, 'keyup', function (event) {
      if (isFocusKey(event)) {
        internal.focusKeyPressed = true;
      }
    });
    internal.listening = true;
  }
}

var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) {  }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var from$1 = _core.Array.from;

var from$3 = createCommonjsModule(function (module) {
module.exports = { "default": from$1, __esModule: true };
});

unwrapExports(from$3);

var toConsumableArray = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _from2 = _interopRequireDefault(from$3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
});

var _toConsumableArray = unwrapExports(toConsumableArray);

var ChildMapping = createCommonjsModule(function (module, exports) {
exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;



/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && (0, React.isValidElement)(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) React.Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = Object.create(null);

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}
});

unwrapExports(ChildMapping);
var ChildMapping_1 = ChildMapping.getChildMapping;
var ChildMapping_2 = ChildMapping.mergeChildMappings;

var TransitionGroup_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _propTypes2 = _interopRequireDefault(propTypes);



var _react2 = _interopRequireDefault(React);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var propTypes$$1 = {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   */
  component: _propTypes2.default.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   */
  children: _propTypes2.default.node,

  /**
   * A convenience prop that enables or disabled appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: _propTypes2.default.bool,
  /**
   * A convenience prop that enables or disabled enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: _propTypes2.default.bool,
  /**
    * A convenience prop that enables or disabled exit animations
    * for all children. Note that specifying this will override any defaults set
    * on individual children Transitions.
    */
  exit: _propTypes2.default.bool,

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: _propTypes2.default.func
};

var defaultProps = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }
};

/**
 * The `<TransitionGroup>` component manages a set of `<Transition>` components
 * in a list. Like with the `<Transition>` component, `<TransitionGroup>`, is a
 * state machine for managing the mounting and unmounting of components over
 * time.
 *
 * Consider the example below using the `Fade` CSS transition from before.
 * As items are removed or added to the TodoList the `in` prop is toggled
 * automatically by the `<TransitionGroup>`. You can use _any_ `<Transition>`
 * component in a `<TransitionGroup>`, not just css.
 *
 * ```jsx
 * import TransitionGroup from 'react-transition-group/TransitionGroup';
 *
 * class TodoList extends React.Component {
 *   constructor(props) {
 *     super(props)
 *     this.state = {items: ['hello', 'world', 'click', 'me']}
 *   }
 *   handleAdd() {
 *     const newItems = this.state.items.concat([
 *       prompt('Enter some text')
 *     ]);
 *     this.setState({ items: newItems });
 *   }
 *   handleRemove(i) {
 *     let newItems = this.state.items.slice();
 *     newItems.splice(i, 1);
 *     this.setState({items: newItems});
 *   }
 *   render() {
 *     return (
 *       <div>
 *         <button onClick={() => this.handleAdd()}>Add Item</button>
 *         <TransitionGroup>
 *           {this.state.items.map((item, i) => (
 *             <FadeTransition key={item}>
 *               <div>
 *                 {item}{' '}
 *                 <button onClick={() => this.handleRemove(i)}>
 *                   remove
 *                 </button>
 *               </div>
 *             </FadeTransition>
 *           ))}
 *         </TransitionGroup>
 *       </div>
 *     );
 *   }
 * }
 * ```
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual `<Transition>`
 * components. This means you can mix and match animations across different
 * list items.
 */

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    // Initial children should all be entering, dependent on appear
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleExited = function (key, node, originalHandler) {
      var currentChildMapping = (0, ChildMapping.getChildMapping)(_this.props.children);

      if (key in currentChildMapping) return;

      if (originalHandler) originalHandler(node);

      _this.setState(function (state) {
        var children = _extends({}, state.children);

        delete children[key];
        return { children: children };
      });
    };

    _this.state = {
      children: (0, ChildMapping.getChildMapping)(props.children, function (child) {
        var onExited = function onExited(node) {
          _this.handleExited(child.key, node, child.props.onExited);
        };

        return (0, React.cloneElement)(child, {
          onExited: onExited,
          in: true,
          appear: _this.getProp(child, 'appear'),
          enter: _this.getProp(child, 'enter'),
          exit: _this.getProp(child, 'exit')
        });
      })
    };
    return _this;
  }

  TransitionGroup.prototype.getChildContext = function getChildContext() {
    return {
      transitionGroup: { isMounting: !this.appeared }
    };
  };
  // use child config unless explictly set by the Group


  TransitionGroup.prototype.getProp = function getProp(child, prop) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props;

    return props[prop] != null ? props[prop] : child.props[prop];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    this.appeared = true;
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var prevChildMapping = this.state.children;
    var nextChildMapping = (0, ChildMapping.getChildMapping)(nextProps.children);

    var children = (0, ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping);

    Object.keys(children).forEach(function (key) {
      var child = children[key];

      if (!(0, React.isValidElement)(child)) return;

      var onExited = function onExited(node) {
        _this2.handleExited(child.key, node, child.props.onExited);
      };

      var hasPrev = key in prevChildMapping;
      var hasNext = key in nextChildMapping;

      var prevChild = prevChildMapping[key];
      var isLeaving = (0, React.isValidElement)(prevChild) && !prevChild.props.in;

      // item is new (entering)
      if (hasNext && (!hasPrev || isLeaving)) {
        // console.log('entering', key)
        children[key] = (0, React.cloneElement)(child, {
          onExited: onExited,
          in: true,
          exit: _this2.getProp(child, 'exit', nextProps),
          enter: _this2.getProp(child, 'enter', nextProps)
        });
      }
      // item is old (exiting)
      else if (!hasNext && hasPrev && !isLeaving) {
          // console.log('leaving', key)
          children[key] = (0, React.cloneElement)(child, { in: false });
        }
        // item hasn't changed transition states
        // copy over the last transition props;
        else if (hasNext && hasPrev && (0, React.isValidElement)(prevChild)) {
            // console.log('unchanged', key)
            children[key] = (0, React.cloneElement)(child, {
              onExited: onExited,
              in: prevChild.props.in,
              exit: _this2.getProp(child, 'exit', nextProps),
              enter: _this2.getProp(child, 'enter', nextProps)
            });
          }
    });

    this.setState({ children: children });
  };

  TransitionGroup.prototype.render = function render() {
    var _props = this.props,
        Component = _props.component,
        childFactory = _props.childFactory,
        props = _objectWithoutProperties(_props, ['component', 'childFactory']);

    var children = this.state.children;


    delete props.appear;
    delete props.enter;
    delete props.exit;

    return _react2.default.createElement(
      Component,
      props,
      values(children).map(childFactory)
    );
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.childContextTypes = {
  transitionGroup: _propTypes2.default.object.isRequired
};


TransitionGroup.propTypes = process.env.NODE_ENV !== "production" ? propTypes$$1 : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];
});

var TransitionGroup = unwrapExports(TransitionGroup_1);

var PropTypes$1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;
exports.classNamesShape = exports.timeoutsShape = undefined;
exports.transitionTimeout = transitionTimeout;



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var timeoutsShape = exports.timeoutsShape = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
  enter: _propTypes2.default.number,
  exit: _propTypes2.default.number
}).isRequired]);

var classNamesShape = exports.classNamesShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  exitActive: _propTypes2.default.string
})]);
});

unwrapExports(PropTypes$1);
var PropTypes_1 = PropTypes$1.classNamesShape;
var PropTypes_2 = PropTypes$1.timeoutsShape;
var PropTypes_3 = PropTypes$1.transitionTimeout;

var Transition_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;
exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;



var PropTypes = _interopRequireWildcard(propTypes);



var _react2 = _interopRequireDefault(React);



var _reactDom2 = _interopRequireDefault(ReactDOM);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UNMOUNTED = exports.UNMOUNTED = 'unmounted';
var EXITED = exports.EXITED = 'exited';
var ENTERING = exports.ENTERING = 'entering';
var ENTERED = exports.ENTERED = 'entered';
var EXITING = exports.EXITING = 'exiting';

/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the components.
 * It's up to you to give meaning and effect to those states. For example we can
 * add styles to a component when it enters or exits:
 *
 * ```jsx
 * import Transition from 'react-transition-group/Transition';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 0 },
 *   entered:  { opacity: 1 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {(state) => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm A fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * As noted the `Transition` component doesn't _do_ anything by itself to its child component.
 * What it does do is track transition states over time so you can update the
 * component (such as by adding styles or classes) when it changes states.
 *
 * There are 4 main states a Transition can be in:
 *  - `ENTERING`
 *  - `ENTERED`
 *  - `EXITING`
 *  - `EXITED`
 *
 * Transition state is toggled via the `in` prop. When `true` the component begins the
 * "Enter" stage. During this stage, the component will shift from its current transition state,
 * to `'entering'` for the duration of the transition and then to the `'entered'` stage once
 * it's complete. Let's take the following example:
 *
 * ```jsx
 * state= { in: false };
 *
 * toggleEnterState = () => {
 *   this.setState({ in: true });
 * }
 *
 * render() {
 *   return (
 *     <div>
 *       <Transition in={this.state.in} timeout={500} />
 *       <button onClick={this.toggleEnterState}>Click to Enter</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state and
 * stay there for 500ms (the value of `timeout`) when finally switches to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.
 */

var Transition = function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props, context) {
    _classCallCheck(this, Transition);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    var parentGroup = context.transitionGroup;
    // In the context of a TransitionGroup all enters are really appears
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;

    var initialStatus = void 0;
    _this.nextStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.nextStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = { status: initialStatus };

    _this.nextCallback = null;
    return _this;
  }

  Transition.prototype.getChildContext = function getChildContext() {
    return { transitionGroup: null }; // allows for nested Transitions
  };

  Transition.prototype.componentDidMount = function componentDidMount() {
    this.updateStatus(true);
  };

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _ref = this.pendingState || this.state,
        status = _ref.status;

    if (nextProps.in) {
      if (status === UNMOUNTED) {
        this.setState({ status: EXITED });
      }
      if (status !== ENTERING && status !== ENTERED) {
        this.nextStatus = ENTERING;
      }
    } else {
      if (status === ENTERING || status === ENTERED) {
        this.nextStatus = EXITING;
      }
    }
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
    this.updateStatus();
  };

  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  Transition.prototype.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;

    var exit = void 0,
        enter = void 0,
        appear = void 0;

    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear;
    }
    return { exit: exit, enter: enter, appear: appear };
  };

  Transition.prototype.updateStatus = function updateStatus() {
    var mounting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var nextStatus = this.nextStatus;

    if (nextStatus !== null) {
      this.nextStatus = null;
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();
      var node = _reactDom2.default.findDOMNode(this);

      if (nextStatus === ENTERING) {
        this.performEnter(node, mounting);
      } else {
        this.performExit(node);
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({ status: UNMOUNTED });
    }
  };

  Transition.prototype.performEnter = function performEnter(node, mounting) {
    var _this2 = this;

    var enter = this.props.enter;

    var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;

    var timeouts = this.getTimeouts();

    // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set
    if (!mounting && !enter) {
      this.safeSetState({ status: ENTERED }, function () {
        _this2.props.onEntered(node);
      });
      return;
    }

    this.props.onEnter(node, appearing);

    this.safeSetState({ status: ENTERING }, function () {
      _this2.props.onEntering(node, appearing);

      // FIXME: appear timeout?
      _this2.onTransitionEnd(node, timeouts.enter, function () {
        _this2.safeSetState({ status: ENTERED }, function () {
          _this2.props.onEntered(node, appearing);
        });
      });
    });
  };

  Transition.prototype.performExit = function performExit(node) {
    var _this3 = this;

    var exit = this.props.exit;

    var timeouts = this.getTimeouts();

    // no exit animation skip right to EXITED
    if (!exit) {
      this.safeSetState({ status: EXITED }, function () {
        _this3.props.onExited(node);
      });
      return;
    }
    this.props.onExit(node);

    this.safeSetState({ status: EXITING }, function () {
      _this3.props.onExiting(node);

      _this3.onTransitionEnd(node, timeouts.exit, function () {
        _this3.safeSetState({ status: EXITED }, function () {
          _this3.props.onExited(node);
        });
      });
    });
  };

  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
    var _this4 = this;

    // We need to track pending updates for instances where a cWRP fires quickly
    // after cDM and before the state flushes, which would double trigger a
    // transition
    this.pendingState = nextState;

    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, function () {
      _this4.pendingState = null;
      callback();
    });
  };

  Transition.prototype.setNextCallback = function setNextCallback(callback) {
    var _this5 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this5.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
    this.setNextCallback(handler);

    if (node) {
      if (this.props.addEndListener) {
        this.props.addEndListener(node, this.nextCallback);
      }
      if (timeout != null) {
        setTimeout(this.nextCallback, timeout);
      }
    } else {
      setTimeout(this.nextCallback, 0);
    }
  };

  Transition.prototype.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }

    var _props = this.props,
        children = _props.children,
        childProps = _objectWithoutProperties(_props, ['children']);
    // filter props for Transtition


    delete childProps.in;
    delete childProps.mountOnEnter;
    delete childProps.unmountOnExit;
    delete childProps.appear;
    delete childProps.enter;
    delete childProps.exit;
    delete childProps.timeout;
    delete childProps.addEndListener;
    delete childProps.onEnter;
    delete childProps.onEntering;
    delete childProps.onEntered;
    delete childProps.onExit;
    delete childProps.onExiting;
    delete childProps.onExited;

    if (typeof children === 'function') {
      return children(status, childProps);
    }

    var child = _react2.default.Children.only(children);
    return _react2.default.cloneElement(child, childProps);
  };

  return Transition;
}(_react2.default.Component);

Transition.contextTypes = {
  transitionGroup: PropTypes.object
};
Transition.childContextTypes = {
  transitionGroup: function transitionGroup() {}
};


Transition.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A `function` child can be used instead of a React element.
   * This function is called with the current transition status
   * ('entering', 'entered', 'exiting', 'exited', 'unmounted'), which can used
   * to apply context specific props to a component.
   *
   * ```jsx
   * <Transition timeout={150}>
   *   {(status) => (
   *     <MyComponent className={`fade fade-${status}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: PropTypes.bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
   * If you want to transition on the first mount set `appear` to `true`, and the
   * component will transition in as soon as the `<Transition>` mounts.
   *
   * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
   */
  appear: PropTypes.bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: PropTypes.bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: PropTypes.bool,

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEventListener` is provided
   *
   * You may specify a single timeout for all transitions like: `timeout={500}`,
   * or individually like:
   *
   * ```jsx
   * timeout={{
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * @type {number | { enter?: number, exit?: number }}
   */
  timeout: function timeout(props) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var pt = PropTypes$1.timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;
    return pt.apply(undefined, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. **Note:** Timeouts are still used as a fallback if provided.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: PropTypes.func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: PropTypes.func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: PropTypes.func
} : {};

// Name the function so it is clearer in the documentation
function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,

  onEnter: noop,
  onEntering: noop,
  onEntered: noop,

  onExit: noop,
  onExiting: noop,
  onExited: noop
};

Transition.UNMOUNTED = 0;
Transition.EXITED = 1;
Transition.ENTERING = 2;
Transition.ENTERED = 3;
Transition.EXITING = 4;

exports.default = Transition;
});

var Transition = unwrapExports(Transition_1);
var Transition_2 = Transition_1.EXITING;
var Transition_3 = Transition_1.ENTERED;
var Transition_4 = Transition_1.ENTERING;
var Transition_5 = Transition_1.EXITED;
var Transition_6 = Transition_1.UNMOUNTED;

/**
 * @ignore - internal component.
 */

var Ripple = function (_React$Component) {
  _inherits(Ripple, _React$Component);

  function Ripple() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Ripple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Ripple.__proto__ || _Object$getPrototypeOf(Ripple)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      rippleVisible: false,
      rippleLeaving: false
    }, _this.handleEnter = function () {
      _this.setState({
        rippleVisible: true
      });
    }, _this.handleExit = function () {
      _this.setState({
        rippleLeaving: true
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Ripple, [{
    key: 'render',
    value: function render() {
      var _classNames, _classNames2;

      var _props = this.props,
          classes = _props.classes,
          classNameProp = _props.className,
          pulsate = _props.pulsate,
          rippleX = _props.rippleX,
          rippleY = _props.rippleY,
          rippleSize = _props.rippleSize,
          other = _objectWithoutProperties(_props, ['classes', 'className', 'pulsate', 'rippleX', 'rippleY', 'rippleSize']);

      var _state = this.state,
          rippleVisible = _state.rippleVisible,
          rippleLeaving = _state.rippleLeaving;


      var className = classnames(classes.wrapper, (_classNames = {}, _defineProperty$1(_classNames, classes.wrapperLeaving, rippleLeaving), _defineProperty$1(_classNames, classes.wrapperPulsating, pulsate), _classNames), classNameProp);

      var rippleClassName = classnames(classes.ripple, (_classNames2 = {}, _defineProperty$1(_classNames2, classes.rippleVisible, rippleVisible), _defineProperty$1(_classNames2, classes.rippleFast, pulsate), _classNames2));

      var rippleStyles = {
        width: rippleSize,
        height: rippleSize,
        top: -(rippleSize / 2) + rippleY,
        left: -(rippleSize / 2) + rippleX
      };

      return React.createElement(
        Transition,
        _extends$1({ onEnter: this.handleEnter, onExit: this.handleExit }, other),
        React.createElement(
          'span',
          { className: className },
          React.createElement('span', { className: rippleClassName, style: rippleStyles })
        )
      );
    }
  }]);

  return Ripple;
}(React.Component);

Ripple.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: propTypes.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: propTypes.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: propTypes.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: propTypes.number
} : {};

Ripple.defaultProps = {
  pulsate: false
};

var DURATION = 550;
var DELAY_RIPPLE = 80;

var styles$5 = function styles(theme) {
  return {
    root: {
      display: 'block',
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: 'inherit',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      pointerEvents: 'none',
      zIndex: 0
    },
    wrapper: {
      opacity: 1
    },
    wrapperLeaving: {
      opacity: 0,
      animation: 'mui-ripple-exit ' + DURATION + 'ms ' + theme.transitions.easing.easeInOut
    },
    wrapperPulsating: {
      position: 'absolute',
      left: 0,
      top: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      animation: 'mui-ripple-pulsate 2500ms ' + theme.transitions.easing.easeInOut + ' 200ms infinite'
    },
    '@keyframes mui-ripple-enter': {
      '0%': {
        transform: 'scale(0)'
      },
      '100%': {
        transform: 'scale(1)'
      }
    },
    '@keyframes mui-ripple-exit': {
      '0%': {
        opacity: 1
      },
      '100%': {
        opacity: 0
      }
    },
    '@keyframes mui-ripple-pulsate': {
      '0%': {
        transform: 'scale(1)'
      },
      '50%': {
        transform: 'scale(0.92)'
      },
      '100%': {
        transform: 'scale(1)'
      }
    },
    ripple: {
      width: 50,
      height: 50,
      left: 0,
      top: 0,
      opacity: 0,
      position: 'absolute',
      borderRadius: '50%',
      background: 'currentColor'
    },
    rippleVisible: {
      opacity: 0.3,
      transform: 'scale(1)',
      animation: 'mui-ripple-enter ' + DURATION + 'ms ' + theme.transitions.easing.easeInOut
    },
    rippleFast: {
      animationDuration: '200ms'
    }
  };
};

/**
 * @ignore - internal component.
 */

var TouchRipple = function (_React$Component) {
  _inherits(TouchRipple, _React$Component);

  function TouchRipple() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TouchRipple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TouchRipple.__proto__ || _Object$getPrototypeOf(TouchRipple)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      nextKey: 0,
      ripples: []
    }, _this.ignoringMouseDown = false, _this.startTimer = null, _this.startTimerCommit = null, _this.pulsate = function () {
      _this.start({}, { pulsate: true });
    }, _this.start = function () {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cb = arguments[2];
      var _options$pulsate = options.pulsate,
          pulsate = _options$pulsate === undefined ? false : _options$pulsate,
          _options$center = options.center,
          center = _options$center === undefined ? _this.props.center || options.pulsate : _options$center,
          _options$fakeElement = options.fakeElement,
          fakeElement = _options$fakeElement === undefined ? false : _options$fakeElement;


      if (event.type === 'mousedown' && _this.ignoringMouseDown) {
        _this.ignoringMouseDown = false;
        return;
      }

      if (event.type === 'touchstart') {
        _this.ignoringMouseDown = true;
      }

      var element = fakeElement ? null : ReactDOM.findDOMNode(_this);
      var rect = element ? element.getBoundingClientRect() : {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      };

      // Get the size of the ripple
      var rippleX = void 0;
      var rippleY = void 0;
      var rippleSize = void 0;

      if (center || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
        rippleX = Math.round(rect.width / 2);
        rippleY = Math.round(rect.height / 2);
      } else {
        var clientX = event.clientX ? event.clientX : event.touches[0].clientX;
        var clientY = event.clientY ? event.clientY : event.touches[0].clientY;
        rippleX = Math.round(clientX - rect.left);
        rippleY = Math.round(clientY - rect.top);
      }

      if (center) {
        rippleSize = Math.sqrt((2 * Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 3);

        // For some reason the animation is broken on Mobile Chrome if the size if even.
        if (rippleSize % 2 === 0) {
          rippleSize += 1;
        }
      } else {
        var sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
        var sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
        rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
      }

      // Touche devices
      if (event.touches) {
        // Prepare the ripple effect.
        _this.startTimerCommit = function () {
          _this.startCommit({ pulsate: pulsate, rippleX: rippleX, rippleY: rippleY, rippleSize: rippleSize, cb: cb });
        };
        // Deplay the execution of the ripple effect.
        _this.startTimer = setTimeout(function () {
          _this.startTimerCommit();
          _this.startTimerCommit = null;
        }, DELAY_RIPPLE); // We have to make a tradeoff with this value.
      } else {
        _this.startCommit({ pulsate: pulsate, rippleX: rippleX, rippleY: rippleY, rippleSize: rippleSize, cb: cb });
      }
    }, _this.startCommit = function (params) {
      var pulsate = params.pulsate,
          rippleX = params.rippleX,
          rippleY = params.rippleY,
          rippleSize = params.rippleSize,
          cb = params.cb;

      var ripples = _this.state.ripples;

      // Add a ripple to the ripples array.
      ripples = [].concat(_toConsumableArray(ripples), [React.createElement(Ripple, {
        key: _this.state.nextKey,
        classes: _this.props.classes,
        timeout: {
          exit: DURATION,
          enter: DURATION
        },
        pulsate: pulsate,
        rippleX: rippleX,
        rippleY: rippleY,
        rippleSize: rippleSize
      })]);

      _this.setState({
        nextKey: _this.state.nextKey + 1,
        ripples: ripples
      }, cb);
    }, _this.stop = function (event, cb) {
      clearTimeout(_this.startTimer);
      var ripples = _this.state.ripples;

      // The touch interaction occures to quickly.
      // We still want to show ripple effect.

      if (event.type === 'touchend' && _this.startTimerCommit) {
        event.persist();
        _this.startTimerCommit();
        _this.startTimerCommit = null;
        _this.startTimer = setTimeout(function () {
          _this.stop(event, cb);
        }, 0);
        return;
      }

      _this.startTimerCommit = null;

      if (ripples && ripples.length) {
        _this.setState({
          ripples: ripples.slice(1)
        }, cb);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TouchRipple, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.startTimer);
    }

    // Used to filter out mouse emulated events on mobile.

    // We use a timer in order to only show the ripples for touch "click" like events.
    // We don't want to display the ripple for touch scroll events.

    // This is the hook called once the previous timeout is ready.

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          center = _props.center,
          classes = _props.classes,
          className = _props.className,
          other = _objectWithoutProperties(_props, ['center', 'classes', 'className']);

      return React.createElement(
        TransitionGroup,
        _extends$1({
          component: 'span',
          enter: true,
          exit: true,
          className: classnames(classes.root, className)
        }, other),
        this.state.ripples
      );
    }
  }]);

  return TouchRipple;
}(React.Component);

TouchRipple.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: propTypes.bool,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string
} : {};

TouchRipple.defaultProps = {
  center: false
};

var TouchRipple$1 = withStyles(styles$5, { flip: false, name: 'MuiTouchRipple' })(TouchRipple);

function createRippleHandler(instance, eventName, action, cb) {
  return function handleEvent(event) {
    if (cb) {
      cb.call(instance, event);
    }

    if (event.defaultPrevented) {
      return false;
    }

    if (instance.ripple) {
      instance.ripple[action](event);
    }

    if (instance.props && typeof instance.props['on' + eventName] === 'function') {
      instance.props['on' + eventName](event);
    }

    return true;
  };
}

var styles$6 = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    outline: 'none',
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none' // Remove Firefox dotted outline.
    }
  },
  disabled: {
    pointerEvents: 'none', // Disable link interactions
    cursor: 'default'
  }
};

// Don't automatically add the role="button" property on these components.
// It's invalid HTML syntax.
var INVALID_COMPONENT_ROLE = ['a'];

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */

var ButtonBase = function (_React$Component) {
  _inherits(ButtonBase, _React$Component);

  function ButtonBase() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ButtonBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ButtonBase.__proto__ || _Object$getPrototypeOf(ButtonBase)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      keyboardFocused: false
    }, _this.onKeyboardFocusHandler = function (event) {
      _this.keyDown = false;
      _this.setState({ keyboardFocused: true });

      if (_this.props.onKeyboardFocus) {
        _this.props.onKeyboardFocus(event);
      }
    }, _this.onRippleRef = function (node) {
      _this.ripple = node;
    }, _this.ripple = null, _this.keyDown = false, _this.button = null, _this.keyboardFocusTimeout = null, _this.keyboardFocusCheckTime = 50, _this.keyboardFocusMaxCheckTimes = 5, _this.handleKeyDown = function (event) {
      var _this$props = _this.props,
          component = _this$props.component,
          focusRipple = _this$props.focusRipple,
          onKeyDown = _this$props.onKeyDown,
          onClick = _this$props.onClick;

      var key = keycode(event);

      // Check if key is already down to avoid repeats being counted as multiple activations
      if (focusRipple && !_this.keyDown && _this.state.keyboardFocused && _this.ripple && key === 'space') {
        _this.keyDown = true;
        event.persist();
        _this.ripple.stop(event, function () {
          _this.ripple.start(event);
        });
      }

      if (onKeyDown) {
        onKeyDown(event);
      }

      // Keyboard accessibility for non interactive elements
      if (event.target === _this.button && onClick && component && component !== 'a' && component !== 'button' && (key === 'space' || key === 'enter')) {
        event.preventDefault();
        onClick(event);
      }
    }, _this.handleKeyUp = function (event) {
      if (_this.props.focusRipple && keycode(event) === 'space' && _this.ripple && _this.state.keyboardFocused) {
        _this.keyDown = false;
        event.persist();
        _this.ripple.stop(event, function () {
          return _this.ripple.pulsate(event);
        });
      }
      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(event);
      }
    }, _this.handleMouseDown = createRippleHandler(_this, 'MouseDown', 'start', function () {
      clearTimeout(_this.keyboardFocusTimeout);
      focusKeyPressed(false);
      if (_this.state.keyboardFocused) {
        _this.setState({ keyboardFocused: false });
      }
    }), _this.handleMouseUp = createRippleHandler(_this, 'MouseUp', 'stop'), _this.handleMouseLeave = createRippleHandler(_this, 'MouseLeave', 'stop', function (event) {
      if (_this.state.keyboardFocused) {
        event.preventDefault();
      }
    }), _this.handleTouchStart = createRippleHandler(_this, 'TouchStart', 'start'), _this.handleTouchEnd = createRippleHandler(_this, 'TouchEnd', 'stop'), _this.handleTouchMove = createRippleHandler(_this, 'TouchEnd', 'stop'), _this.handleBlur = createRippleHandler(_this, 'Blur', 'stop', function () {
      clearTimeout(_this.keyboardFocusTimeout);
      focusKeyPressed(false);
      _this.setState({ keyboardFocused: false });
    }), _this.handleFocus = function (event) {
      if (_this.props.disabled) {
        return;
      }

      // Fix for https://github.com/facebook/react/issues/7769
      if (!_this.button) {
        _this.button = event.currentTarget;
      }

      event.persist();
      detectKeyboardFocus(_this, _this.button, function () {
        _this.onKeyboardFocusHandler(event);
      });

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ButtonBase, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.button = findDOMNode(this);
      listenForFocusKeys();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // The blur won't fire when the disabled state is set on a focused input.
      // We need to book keep the focused state manually.
      if (!this.props.disabled && nextProps.disabled && this.state.keyboardFocused) {
        this.setState({
          keyboardFocused: false
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.focusRipple && nextState.keyboardFocused && !this.state.keyboardFocused && !this.props.disableRipple) {
        this.ripple.pulsate();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.button = null;
      clearTimeout(this.keyboardFocusTimeout);
    } // Used to help track keyboard activation keyDown

  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          buttonRef = _props.buttonRef,
          centerRipple = _props.centerRipple,
          children = _props.children,
          classes = _props.classes,
          classNameProp = _props.className,
          component = _props.component,
          disabled = _props.disabled,
          disableRipple = _props.disableRipple,
          focusRipple = _props.focusRipple,
          keyboardFocusedClassName = _props.keyboardFocusedClassName,
          onBlur = _props.onBlur,
          onFocus = _props.onFocus,
          onKeyboardFocus = _props.onKeyboardFocus,
          onKeyDown = _props.onKeyDown,
          onKeyUp = _props.onKeyUp,
          onMouseDown = _props.onMouseDown,
          onMouseLeave = _props.onMouseLeave,
          onMouseUp = _props.onMouseUp,
          onTouchEnd = _props.onTouchEnd,
          onTouchMove = _props.onTouchMove,
          onTouchStart = _props.onTouchStart,
          tabIndex = _props.tabIndex,
          type = _props.type,
          other = _objectWithoutProperties(_props, ['buttonRef', 'centerRipple', 'children', 'classes', 'className', 'component', 'disabled', 'disableRipple', 'focusRipple', 'keyboardFocusedClassName', 'onBlur', 'onFocus', 'onKeyboardFocus', 'onKeyDown', 'onKeyUp', 'onMouseDown', 'onMouseLeave', 'onMouseUp', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'tabIndex', 'type']);

      var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.disabled, disabled), _defineProperty$1(_classNames, keyboardFocusedClassName || '', this.state.keyboardFocused), _classNames), classNameProp);

      var buttonProps = {};

      var ComponentProp = component;

      if (!ComponentProp) {
        if (other.href) {
          ComponentProp = 'a';
        } else {
          ComponentProp = 'button';
        }
      }

      if (ComponentProp === 'button') {
        buttonProps.type = type || 'button';
        buttonProps.disabled = disabled;
      } else if (INVALID_COMPONENT_ROLE.indexOf(ComponentProp) === -1) {
        buttonProps.role = 'button';
      }

      return React.createElement(
        ComponentProp,
        _extends$1({
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onMouseDown: this.handleMouseDown,
          onMouseLeave: this.handleMouseLeave,
          onMouseUp: this.handleMouseUp,
          onTouchEnd: this.handleTouchEnd,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          tabIndex: disabled ? -1 : tabIndex,
          className: className,
          ref: buttonRef
        }, buttonProps, other),
        children,
        !disableRipple && !disabled ? React.createElement(TouchRipple$1, { innerRef: this.onRippleRef, center: centerRipple }) : null
      );
    }
  }]);

  return ButtonBase;
}(React.Component);

ButtonBase.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Use that property to pass a ref callback to the native button component.
   */
  buttonRef: propTypes.func,
  /**
   * If `true`, the ripples will be centered.
   * They won't start at the cursor interaction position.
   */
  centerRipple: propTypes.bool,
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * The default value is a `button`.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, the base button will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: propTypes.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * `disableRipple` must also be `false`.
   */
  focusRipple: propTypes.bool,
  /**
   * The CSS class applied while the component is keyboard focused.
   */
  keyboardFocusedClassName: propTypes.string,
  /**
   * @ignore
   */
  onBlur: propTypes.func,
  /**
   * @ignore
   */
  onClick: propTypes.func,
  /**
   * @ignore
   */
  onFocus: propTypes.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onKeyboardFocus: propTypes.func,
  /**
   * @ignore
   */
  onKeyDown: propTypes.func,
  /**
   * @ignore
   */
  onKeyUp: propTypes.func,
  /**
   * @ignore
   */
  onMouseDown: propTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: propTypes.func,
  /**
   * @ignore
   */
  onMouseUp: propTypes.func,
  /**
   * @ignore
   */
  onTouchEnd: propTypes.func,
  /**
   * @ignore
   */
  onTouchMove: propTypes.func,
  /**
   * @ignore
   */
  onTouchStart: propTypes.func,
  /**
   * @ignore
   */
  role: propTypes.string,
  /**
   * @ignore
   */
  tabIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /**
   * @ignore
   */
  type: propTypes.string
} : {};

ButtonBase.defaultProps = {
  centerRipple: false,
  disableRipple: false,
  focusRipple: false,
  tabIndex: 0,
  type: 'button'
};

var ButtonBase$1 = withStyles(styles$6, { name: 'MuiButtonBase' })(ButtonBase);

// @inheritedComponent ButtonBase

var styles$7 = function styles(theme) {
  return {
    root: {
      transition: theme.transitions.create(['color', 'padding-top'], {
        duration: theme.transitions.duration.short
      }),
      paddingTop: theme.spacing.unit,
      paddingBottom: 10,
      paddingLeft: 12,
      paddingRight: 12,
      minWidth: 80,
      maxWidth: 168,
      color: theme.palette.text.secondary,
      flex: '1'
    },
    selected: {
      paddingTop: 6,
      color: theme.palette.primary.main
    },
    selectedIconOnly: {
      paddingTop: theme.spacing.unit * 2
    },
    wrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'column'
    },
    label: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(theme.typography.fontSize - 2),
      opacity: 1,
      transition: 'font-size 0.2s, opacity 0.2s',
      transitionDelay: '0.1s'
    },
    selectedLabel: {
      fontSize: theme.typography.pxToRem(theme.typography.fontSize)
    },
    hiddenLabel: {
      opacity: 0,
      transitionDelay: '0s'
    }
  };
};

var BottomNavigationAction = function (_React$Component) {
  _inherits(BottomNavigationAction, _React$Component);

  function BottomNavigationAction() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BottomNavigationAction);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BottomNavigationAction.__proto__ || _Object$getPrototypeOf(BottomNavigationAction)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          value = _this$props.value,
          onClick = _this$props.onClick;


      if (onChange) {
        onChange(event, value);
      }

      if (onClick) {
        onClick(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BottomNavigationAction, [{
    key: 'render',
    value: function render() {
      var _classNames, _classNames2;

      var _props = this.props,
          classes = _props.classes,
          classNameProp = _props.className,
          icon = _props.icon,
          label = _props.label,
          onChange = _props.onChange,
          onClick = _props.onClick,
          selected = _props.selected,
          showLabelProp = _props.showLabel,
          value = _props.value,
          other = _objectWithoutProperties(_props, ['classes', 'className', 'icon', 'label', 'onChange', 'onClick', 'selected', 'showLabel', 'value']);

      var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.selected, selected), _defineProperty$1(_classNames, classes.selectedIconOnly, !showLabelProp && !selected), _classNames), classNameProp);

      var labelClassName = classnames(classes.label, (_classNames2 = {}, _defineProperty$1(_classNames2, classes.selectedLabel, selected), _defineProperty$1(_classNames2, classes.hiddenLabel, !showLabelProp && !selected), _classNames2));

      return React.createElement(
        ButtonBase$1,
        _extends$1({ className: className, focusRipple: true, onClick: this.handleChange }, other),
        React.createElement(
          'span',
          { className: classes.wrapper },
          icon,
          React.createElement(
            'span',
            { className: labelClassName },
            label
          )
        )
      );
    }
  }]);

  return BottomNavigationAction;
}(React.Component);

BottomNavigationAction.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The icon element.
   */
  icon: propTypes.node,
  /**
   * The label element.
   */
  label: propTypes.node,
  /**
   * @ignore
   */
  onChange: propTypes.func,
  /**
   * @ignore
   */
  onClick: propTypes.func,
  /**
   * @ignore
   */
  selected: propTypes.bool,
  /**
   * If `true`, the BottomNavigationAction will show its label.
   */
  showLabel: propTypes.bool,
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: propTypes.any
} : {};

var BottomNavigationAction$1 = withStyles(styles$7, { name: 'MuiBottomNavigationAction' })(BottomNavigationAction);

/* eslint-disable import/prefer-default-export */

function cloneChildrenWithClassName(children, className) {
  return React.Children.map(children, function (child) {
    return React.isValidElement(child) && React.cloneElement(child, {
      className: classnames(child.props.className, className)
    });
  });
}

function isMuiElement(element, muiNames) {
  return React.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}

// @inheritedComponent ButtonBase

var styles$8 = function styles(theme) {
  return {
    root: _extends$1({}, theme.typography.button, {
      lineHeight: '1.4em', // Improve readability for multiline button.
      boxSizing: 'border-box',
      minWidth: theme.spacing.unit * 11,
      minHeight: 36,
      padding: theme.spacing.unit + 'px ' + theme.spacing.unit * 2 + 'px',
      borderRadius: 2,
      color: theme.palette.text.primary,
      transition: theme.transitions.create(['background-color', 'box-shadow'], {
        duration: theme.transitions.duration.short
      }),
      '&:hover': {
        textDecoration: 'none',
        // Reset on mouse devices
        backgroundColor: fade(theme.palette.text.primary, 0.12),
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        },
        '&$disabled': {
          backgroundColor: 'transparent'
        }
      }
    }),
    label: {
      width: '100%',
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit'
    },
    flatPrimary: {
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.main, 0.12),
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },
    flatSecondary: {
      color: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: fade(theme.palette.secondary.main, 0.12),
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },
    colorInherit: {
      color: 'inherit'
    },
    raised: {
      color: theme.palette.getContrastText(theme.palette.grey[300]),
      backgroundColor: theme.palette.grey[300],
      boxShadow: theme.shadows[2],
      '&$keyboardFocused': {
        boxShadow: theme.shadows[6]
      },
      '&:active': {
        boxShadow: theme.shadows[8]
      },
      '&$disabled': {
        boxShadow: theme.shadows[0],
        backgroundColor: theme.palette.action.disabledBackground
      },
      '&:hover': {
        backgroundColor: theme.palette.grey.A100,
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: theme.palette.grey[300]
        },
        '&$disabled': {
          backgroundColor: theme.palette.action.disabledBackground
        }
      }
    },
    keyboardFocused: {},
    raisedPrimary: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: theme.palette.primary.main
        }
      }
    },
    raisedSecondary: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: theme.palette.secondary.main
        }
      }
    },
    disabled: {
      color: theme.palette.action.disabled
    },
    fab: {
      borderRadius: '50%',
      padding: 0,
      minWidth: 0,
      width: 56,
      fontSize: 24,
      height: 56,
      boxShadow: theme.shadows[6],
      '&:active': {
        boxShadow: theme.shadows[12]
      }
    },
    mini: {
      width: 40,
      height: 40
    },
    sizeSmall: {
      padding: theme.spacing.unit - 1 + 'px ' + theme.spacing.unit + 'px',
      minWidth: theme.spacing.unit * 8,
      minHeight: 32,
      fontSize: theme.typography.pxToRem(theme.typography.fontSize - 1)
    },
    sizeLarge: {
      padding: theme.spacing.unit + 'px ' + theme.spacing.unit * 3 + 'px',
      minWidth: theme.spacing.unit * 14,
      minHeight: 40,
      fontSize: theme.typography.pxToRem(theme.typography.fontSize + 1)
    },
    fullWidth: {
      width: '100%'
    }
  };
};

function Button(props) {
  var _classNames;

  var childrenProp = props.children,
      classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      disabled = props.disabled,
      disableFocusRipple = props.disableFocusRipple,
      fullWidth = props.fullWidth,
      mini = props.mini,
      size = props.size,
      variant = props.variant,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'color', 'disabled', 'disableFocusRipple', 'fullWidth', 'mini', 'size', 'variant']);

  var fab = variant === 'fab';
  var raised = variant === 'raised';
  var flat = !raised && !fab;
  var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.raised, raised || fab), _defineProperty$1(_classNames, classes.fab, fab), _defineProperty$1(_classNames, classes.mini, fab && mini), _defineProperty$1(_classNames, classes.colorInherit, color === 'inherit'), _defineProperty$1(_classNames, classes.flatPrimary, flat && color === 'primary'), _defineProperty$1(_classNames, classes.flatSecondary, flat && color === 'secondary'), _defineProperty$1(_classNames, classes.raisedPrimary, !flat && color === 'primary'), _defineProperty$1(_classNames, classes.raisedSecondary, !flat && color === 'secondary'), _defineProperty$1(_classNames, classes['size' + capitalize(size)], size !== 'medium'), _defineProperty$1(_classNames, classes.disabled, disabled), _defineProperty$1(_classNames, classes.fullWidth, fullWidth), _classNames), classNameProp);

  var children = childrenProp;

  if (fab) {
    children = React.Children.map(children, function (child) {
      if (isMuiElement(child, ['Icon', 'SvgIcon'])) {
        return React.cloneElement(child, { fontSize: true });
      }
      return child;
    });
  }

  return React.createElement(
    ButtonBase$1,
    _extends$1({
      className: className,
      disabled: disabled,
      focusRipple: !disableFocusRipple,
      keyboardFocusedClassName: classes.keyboardFocused
    }, other),
    React.createElement(
      'span',
      { className: classes.label },
      children
    )
  );
}

Button.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the button.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: propTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * The default value is a `button`.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, the button will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: propTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: propTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   */
  fullWidth: propTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: propTypes.string,
  /**
   * If `true`, and `fab` is `true`, will use mini floating action button styling.
   */
  mini: propTypes.bool,
  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size: propTypes.oneOf(['small', 'medium', 'large']),
  /**
   * @ignore
   */
  type: propTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  variant: propTypes.oneOf(['flat', 'raised', 'fab'])
} : {};

Button.defaultProps = {
  color: 'default',
  disabled: false,
  disableFocusRipple: false,
  disableRipple: false,
  fullWidth: false,
  mini: false,
  size: 'medium',
  type: 'button',
  variant: 'flat'
};

var Button$1 = withStyles(styles$8, { name: 'MuiButton' })(Button);

// @inheritedComponent Paper

function Card(props) {
  var raised = props.raised,
      other = _objectWithoutProperties(props, ['raised']);

  return React.createElement(Paper$1, _extends$1({ elevation: raised ? 8 : 2 }, other));
}

Card.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * If `true`, the card will use raised styling.
   */
  raised: propTypes.bool
} : {};

Card.defaultProps = {
  raised: false
};

var styles$9 = function styles(theme) {
  return {
    root: {
      padding: theme.spacing.unit * 2,
      '&:last-child': {
        paddingBottom: theme.spacing.unit * 3
      }
    }
  };
};

function CardContent(props) {
  var classes = props.classes,
      className = props.className,
      Component = props.component,
      other = _objectWithoutProperties(props, ['classes', 'className', 'component']);

  return React.createElement(Component, _extends$1({ className: classnames(classes.root, className) }, other));
}

CardContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func])
} : {};

CardContent.defaultProps = {
  component: 'div'
};

var CardContent$1 = withStyles(styles$9, { name: 'MuiCardContent' })(CardContent);

var styles$10 = {
  root: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
    padding: '2px 4px',
    boxSizing: 'border-box'
  },
  action: {
    margin: '0 4px'
  }
};

function CardActions(props) {
  var disableActionSpacing = props.disableActionSpacing,
      children = props.children,
      classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ['disableActionSpacing', 'children', 'classes', 'className']);

  return React.createElement(
    'div',
    _extends$1({ className: classnames(classes.root, className) }, other),
    disableActionSpacing ? children : cloneChildrenWithClassName(children, classes.action)
  );
}

CardActions.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * If `true`, the card actions do not have additional margin.
   */
  disableActionSpacing: propTypes.bool
} : {};

CardActions.defaultProps = {
  disableActionSpacing: false
};

var CardActions$1 = withStyles(styles$10, { name: 'MuiCardActions' })(CardActions);

var styles$11 = {
  root: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  rootMedia: {
    width: '100%'
  }
};

var MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

function CardMedia(props) {
  var _classNames;

  var classes = props.classes,
      className = props.className,
      Component = props.component,
      image = props.image,
      src = props.src,
      style = props.style,
      other = _objectWithoutProperties(props, ['classes', 'className', 'component', 'image', 'src', 'style']);

  process.env.NODE_ENV !== "production" ? warning_1$2(Boolean(image || src), 'Material-UI: either `image` or `src` property must be specified.') : void 0;

  var isMediaComponent = MEDIA_COMPONENTS.indexOf(Component) !== -1;
  var composedStyle = !isMediaComponent && image ? _extends$1({ backgroundImage: 'url(' + image + ')' }, style) : style;
  var composedClassName = classnames((_classNames = {}, _defineProperty$1(_classNames, classes.root, !isMediaComponent), _defineProperty$1(_classNames, classes.rootMedia, isMediaComponent), _classNames), className);

  return React.createElement(Component, _extends$1({
    className: composedClassName,
    style: composedStyle,
    src: isMediaComponent ? image || src : undefined
  }, other));
}

CardMedia.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Component for rendering image.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: propTypes.string,
  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src: propTypes.string,
  /**
   * @ignore
   */
  style: propTypes.object
} : {};

CardMedia.defaultProps = {
  component: 'div'
};

var CardMedia$1 = withStyles(styles$11, { name: 'MuiCardMedia' })(CardMedia);

var styles$12 = function styles(theme) {
  return {
    root: {
      display: 'block',
      margin: 0
    },
    display4: theme.typography.display4,
    display3: theme.typography.display3,
    display2: theme.typography.display2,
    display1: theme.typography.display1,
    headline: theme.typography.headline,
    title: theme.typography.title,
    subheading: theme.typography.subheading,
    body2: theme.typography.body2,
    body1: theme.typography.body1,
    caption: theme.typography.caption,
    button: theme.typography.button,
    alignLeft: {
      textAlign: 'left'
    },
    alignCenter: {
      textAlign: 'center'
    },
    alignRight: {
      textAlign: 'right'
    },
    alignJustify: {
      textAlign: 'justify'
    },
    noWrap: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    gutterBottom: {
      marginBottom: '0.35em'
    },
    paragraph: {
      marginBottom: theme.spacing.unit * 2
    },
    colorInherit: {
      color: 'inherit'
    },
    colorPrimary: {
      color: theme.palette.primary.main
    },
    colorSecondary: {
      color: theme.palette.secondary.main
    },
    colorTextSecondary: {
      color: theme.palette.text.secondary
    },
    colorError: {
      color: theme.palette.error.main
    }
  };
};

function Typography(props) {
  var _classNames;

  var align = props.align,
      classes = props.classes,
      classNameProp = props.className,
      componentProp = props.component,
      color = props.color,
      gutterBottom = props.gutterBottom,
      headlineMapping = props.headlineMapping,
      noWrap = props.noWrap,
      paragraph = props.paragraph,
      variant = props.variant,
      other = _objectWithoutProperties(props, ['align', 'classes', 'className', 'component', 'color', 'gutterBottom', 'headlineMapping', 'noWrap', 'paragraph', 'variant']);

  var className = classnames(classes.root, classes[variant], (_classNames = {}, _defineProperty$1(_classNames, classes['color' + capitalize(color)], color !== 'default'), _defineProperty$1(_classNames, classes.noWrap, noWrap), _defineProperty$1(_classNames, classes.gutterBottom, gutterBottom), _defineProperty$1(_classNames, classes.paragraph, paragraph), _defineProperty$1(_classNames, classes['align' + capitalize(align)], align !== 'inherit'), _classNames), classNameProp);

  var Component = componentProp || (paragraph ? 'p' : headlineMapping[variant]) || 'span';

  return React.createElement(Component, _extends$1({ className: className }, other));
}

Typography.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Set the text-align on the component.
   */
  align: propTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: propTypes.oneOf(['inherit', 'primary', 'textSecondary', 'secondary', 'error', 'default']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default, it maps the variant to a good default headline component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, the text will have a bottom margin.
   */
  gutterBottom: propTypes.bool,
  /**
   * We are empirically mapping the variant property to a range of different DOM element types.
   * For instance, h1 to h6. If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` property.
   */
  headlineMapping: propTypes.object,
  /**
   * If `true`, the text will not wrap, but instead will truncate with an ellipsis.
   */
  noWrap: propTypes.bool,
  /**
   * If `true`, the text will have a bottom margin.
   */
  paragraph: propTypes.bool,
  /**
   * Applies the theme typography styles.
   */
  variant: propTypes.oneOf(['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'])
} : {};

Typography.defaultProps = {
  align: 'inherit',
  color: 'default',
  gutterBottom: false,
  headlineMapping: {
    display4: 'h1',
    display3: 'h1',
    display2: 'h1',
    display1: 'h1',
    headline: 'h1',
    title: 'h2',
    subheading: 'h3',
    body2: 'aside',
    body1: 'p'
  },
  noWrap: false,
  paragraph: false,
  variant: 'body1'
};

var Typography$1 = withStyles(styles$12, { name: 'MuiTypography' })(Typography);

var styles$13 = function styles(theme) {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing.unit * 2
    },
    avatar: {
      flex: '0 0 auto',
      marginRight: theme.spacing.unit * 2
    },
    action: {
      flex: '0 0 auto',
      alignSelf: 'flex-start',
      marginTop: theme.spacing.unit * -1,
      marginRight: theme.spacing.unit * -2
    },
    content: {
      flex: '1 1 auto'
    },
    title: {},
    subheader: {}
  };
};

function CardHeader(props) {
  var action = props.action,
      avatar = props.avatar,
      classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      subheader = props.subheader,
      title = props.title,
      other = _objectWithoutProperties(props, ['action', 'avatar', 'classes', 'className', 'component', 'subheader', 'title']);

  return React.createElement(
    Component,
    _extends$1({ className: classnames(classes.root, classNameProp) }, other),
    avatar && React.createElement(
      'div',
      { className: classes.avatar },
      avatar
    ),
    React.createElement(
      'div',
      { className: classes.content },
      React.createElement(
        Typography$1,
        {
          variant: avatar ? 'body2' : 'headline',
          component: 'span',
          className: classes.title
        },
        title
      ),
      subheader && React.createElement(
        Typography$1,
        {
          variant: avatar ? 'body2' : 'body1',
          component: 'span',
          color: 'textSecondary',
          className: classes.subheader
        },
        subheader
      )
    ),
    action && React.createElement(
      'div',
      { className: classes.action },
      action
    )
  );
}

CardHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The action to display in the card header.
   */
  action: propTypes.node,
  /**
   * The Avatar for the Card Header.
   */
  avatar: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * The content of the component.
   */
  subheader: propTypes.node,
  /**
   * The content of the Card Title.
   */
  title: propTypes.node
} : {};

CardHeader.defaultProps = {
  component: 'div'
};

var CardHeader$1 = withStyles(styles$13, { name: 'MuiCardHeader' })(CardHeader);

var setStatic_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;
var setStatic = function setStatic(key, value) {
  return function (BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */
    return BaseComponent;
  };
};

exports.default = setStatic;
});

unwrapExports(setStatic_1);

var setDisplayName_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _setStatic2 = _interopRequireDefault(setStatic_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setDisplayName = function setDisplayName(displayName) {
  return (0, _setStatic2.default)('displayName', displayName);
};

exports.default = setDisplayName;
});

unwrapExports(setDisplayName_1);

var shouldUpdate_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;





var _setDisplayName2 = _interopRequireDefault(setDisplayName_1);



var _wrapDisplayName2 = _interopRequireDefault(wrapDisplayName_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shouldUpdate = function shouldUpdate(test) {
  return function (BaseComponent) {
    var factory = (0, React.createFactory)(BaseComponent);

    var ShouldUpdate = function (_Component) {
      _inherits(ShouldUpdate, _Component);

      function ShouldUpdate() {
        _classCallCheck(this, ShouldUpdate);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      ShouldUpdate.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return test(this.props, nextProps);
      };

      ShouldUpdate.prototype.render = function render() {
        return factory(this.props);
      };

      return ShouldUpdate;
    }(React.Component);

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'shouldUpdate'))(ShouldUpdate);
    }
    return ShouldUpdate;
  };
};

exports.default = shouldUpdate;
});

unwrapExports(shouldUpdate_1);

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

var hasOwnProperty$2 = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is$1(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is$1(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty$2.call(objB, keysA[i]) || !is$1(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

var shallowEqual_1 = shallowEqual;

var shallowEqual$1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _shallowEqual2 = _interopRequireDefault(shallowEqual_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _shallowEqual2.default;
});

unwrapExports(shallowEqual$1);

var pure_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _shouldUpdate2 = _interopRequireDefault(shouldUpdate_1);



var _shallowEqual2 = _interopRequireDefault(shallowEqual$1);



var _setDisplayName2 = _interopRequireDefault(setDisplayName_1);



var _wrapDisplayName2 = _interopRequireDefault(wrapDisplayName_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pure = function pure(BaseComponent) {
  var hoc = (0, _shouldUpdate2.default)(function (props, nextProps) {
    return !(0, _shallowEqual2.default)(props, nextProps);
  });

  if (process.env.NODE_ENV !== 'production') {
    return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'pure'))(hoc(BaseComponent));
  }

  return hoc(BaseComponent);
};

exports.default = pure;
});

var pure = unwrapExports(pure_1);

var styles$14 = function styles(theme) {
  return {
    root: {
      display: 'inline-block',
      fill: 'currentColor',
      height: 24,
      width: 24,
      userSelect: 'none',
      flexShrink: 0,
      transition: theme.transitions.create('fill', {
        duration: theme.transitions.duration.shorter
      })
    },
    colorPrimary: {
      color: theme.palette.primary.main
    },
    colorSecondary: {
      color: theme.palette.secondary.main
    },
    colorAction: {
      color: theme.palette.action.active
    },
    colorDisabled: {
      color: theme.palette.action.disabled
    },
    colorError: {
      color: theme.palette.error.main
    },
    fontSize: {
      width: '1em',
      height: '1em'
    }
  };
};

function SvgIcon(props) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      fontSize = props.fontSize,
      nativeColor = props.nativeColor,
      titleAccess = props.titleAccess,
      viewBox = props.viewBox,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'color', 'fontSize', 'nativeColor', 'titleAccess', 'viewBox']);

  var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes['color' + capitalize(color)], color !== 'inherit'), _defineProperty$1(_classNames, classes.fontSize, fontSize), _classNames), classNameProp);

  return React.createElement(
    'svg',
    _extends$1({
      className: className,
      focusable: 'false',
      viewBox: viewBox,
      color: nativeColor,
      'aria-hidden': titleAccess ? 'false' : 'true'
    }, other),
    titleAccess ? React.createElement(
      'title',
      null,
      titleAccess
    ) : null,
    children
  );
}

SvgIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Node passed into the SVG element.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * You can use the `nativeColor` property to apply a color attribute to the SVG element.
   */
  color: propTypes.oneOf(['action', 'disabled', 'error', 'inherit', 'primary', 'secondary']),
  /**
   * If `true`, the icon size will be determined by the font-size.
   */
  fontSize: propTypes.bool,
  /**
   * Applies a color attribute to the SVG element.
   */
  nativeColor: propTypes.string,
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: propTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   */
  viewBox: propTypes.string
} : {};

SvgIcon.defaultProps = {
  color: 'inherit',
  fontSize: false,
  viewBox: '0 0 24 24'
};

SvgIcon.muiName = 'SvgIcon';

var SvgIcon$1 = withStyles(styles$14, { name: 'MuiSvgIcon' })(SvgIcon);

/**
 * @ignore - internal component.
 */

var _ref = React.createElement('path', { d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' });

var CheckBoxOutlineBlank = function CheckBoxOutlineBlank(props) {
  return React.createElement(
    SvgIcon$1,
    props,
    _ref
  );
};
CheckBoxOutlineBlank = pure(CheckBoxOutlineBlank);
CheckBoxOutlineBlank.muiName = 'SvgIcon';

var CheckBoxOutlineBlankIcon = CheckBoxOutlineBlank;

/**
 * @ignore - internal component.
 */

var _ref$1 = React.createElement('path', { d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' });

var CheckBox = function CheckBox(props) {
  return React.createElement(
    SvgIcon$1,
    props,
    _ref$1
  );
};
CheckBox = pure(CheckBox);
CheckBox.muiName = 'SvgIcon';

var CheckBoxIcon = CheckBox;

// @inheritedComponent ButtonBase

var styles$15 = function styles(theme) {
  return {
    root: {
      textAlign: 'center',
      flex: '0 0 auto',
      fontSize: theme.typography.pxToRem(24),
      width: theme.spacing.unit * 6,
      height: theme.spacing.unit * 6,
      padding: 0,
      borderRadius: '50%',
      color: theme.palette.action.active,
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shortest
      })
    },
    colorInherit: {
      color: 'inherit'
    },
    colorPrimary: {
      color: theme.palette.primary.main
    },
    colorSecondary: {
      color: theme.palette.secondary.main
    },
    disabled: {
      color: theme.palette.action.disabled
    },
    label: {
      width: '100%',
      display: 'flex',
      alignItems: 'inherit',
      justifyContent: 'inherit'
    }
  };
};

/**
 * Refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icon options.
 */
function IconButton(props) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      className = props.className,
      color = props.color,
      disabled = props.disabled,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'color', 'disabled']);

  return React.createElement(
    ButtonBase$1,
    _extends$1({
      className: classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes['color' + capitalize(color)], color !== 'default'), _defineProperty$1(_classNames, classes.disabled, disabled), _classNames), className),
      centerRipple: true,
      focusRipple: true,
      disabled: disabled
    }, other),
    React.createElement(
      'span',
      { className: classes.label },
      React.Children.map(children, function (child) {
        if (isMuiElement(child, ['Icon', 'SvgIcon'])) {
          return React.cloneElement(child, { fontSize: true });
        }
        return child;
      })
    )
  );
}

IconButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The icon element.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: propTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /**
   * If `true`, the button will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the ripple will be disabled.
   */
  disableRipple: propTypes.bool
} : {};

IconButton.defaultProps = {
  color: 'default',
  disabled: false,
  disableRipple: false
};

var IconButton$1 = withStyles(styles$15, { name: 'MuiIconButton' })(IconButton);

var styles$16 = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'none'
  },
  input: {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0
  },
  default: {},
  checked: {},
  disabled: {}
};

/**
 * @ignore - internal component.
 */

var SwitchBase = function (_React$Component) {
  _inherits(SwitchBase, _React$Component);

  function SwitchBase() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SwitchBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SwitchBase.__proto__ || _Object$getPrototypeOf(SwitchBase)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.input = null, _this.isControlled = null, _this.handleInputChange = function (event) {
      var checked = event.target.checked;

      if (!_this.isControlled) {
        _this.setState({ checked: checked });
      }

      if (_this.props.onChange) {
        _this.props.onChange(event, checked);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SwitchBase, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var props = this.props;


      this.isControlled = props.checked != null;

      if (!this.isControlled) {
        // not controlled, use internal state
        this.setState({
          checked: props.defaultChecked !== undefined ? props.defaultChecked : false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          checkedProp = _props.checked,
          checkedIcon = _props.checkedIcon,
          classes = _props.classes,
          classNameProp = _props.className,
          disabledProp = _props.disabled,
          iconProp = _props.icon,
          inputProps = _props.inputProps,
          inputRef = _props.inputRef,
          inputType = _props.inputType,
          name = _props.name,
          onChange = _props.onChange,
          tabIndex = _props.tabIndex,
          value = _props.value,
          other = _objectWithoutProperties(_props, ['checked', 'checkedIcon', 'classes', 'className', 'disabled', 'icon', 'inputProps', 'inputRef', 'inputType', 'name', 'onChange', 'tabIndex', 'value']);

      var muiFormControl = this.context.muiFormControl;

      var disabled = disabledProp;

      if (muiFormControl) {
        if (typeof disabled === 'undefined') {
          disabled = muiFormControl.disabled;
        }
      }

      var checked = this.isControlled ? checkedProp : this.state.checked;
      var className = classnames(classes.root, classes.default, classNameProp, (_classNames = {}, _defineProperty$1(_classNames, classes.checked, checked), _defineProperty$1(_classNames, classes.disabled, disabled), _classNames));

      var icon = checked ? checkedIcon : iconProp;

      return React.createElement(
        IconButton$1,
        _extends$1({
          component: 'span',
          className: className,
          disabled: disabled,
          tabIndex: null,
          role: undefined
        }, other),
        icon,
        React.createElement('input', _extends$1({
          type: inputType,
          name: name,
          checked: checkedProp,
          onChange: this.handleInputChange,
          className: classes.input,
          disabled: disabled,
          tabIndex: tabIndex,
          value: value,
          ref: inputRef
        }, inputProps))
      );
    }
  }]);

  return SwitchBase;
}(React.Component);

// NB: If changed, please update Checkbox, Switch and Radio
// so that the API documentation is updated.


SwitchBase.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If `true`, the component is checked.
   */
  checked: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   */
  defaultChecked: propTypes.bool,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: propTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: propTypes.node,
  /**
   * If `true`, the component appears indeterminate.
   */
  indeterminate: propTypes.bool,
  /**
   * The icon to display when the component is indeterminate.
   */
  indeterminateIcon: propTypes.node,
  /**
   * Properties applied to the `input` element.
   */
  inputProps: propTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: propTypes.func,
  /**
   * The input component property `type`.
   */
  inputType: propTypes.string,
  /*
   * @ignore
   */
  name: propTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: propTypes.func,
  /**
   * @ignore
   */
  tabIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /**
   * The value of the component.
   */
  value: propTypes.string
} : {};

SwitchBase.defaultProps = {
  checkedIcon: React.createElement(CheckBoxIcon, null),
  disableRipple: false,
  icon: React.createElement(CheckBoxOutlineBlankIcon, null),
  inputType: 'checkbox'
};

SwitchBase.contextTypes = {
  muiFormControl: propTypes.object
};

var SwitchBase$1 = withStyles(styles$16, { name: 'MuiSwitchBase' })(SwitchBase);

/**
 * @ignore - internal component.
 */

var _ref$2 = React.createElement('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z' });

var IndeterminateCheckBox = function IndeterminateCheckBox(props) {
  return React.createElement(
    SvgIcon$1,
    props,
    _ref$2
  );
};
IndeterminateCheckBox = pure(IndeterminateCheckBox);
IndeterminateCheckBox.muiName = 'SvgIcon';

var IndeterminateCheckBoxIcon = IndeterminateCheckBox;

var styles$17 = function styles(theme) {
  return {
    default: {
      color: theme.palette.text.secondary
    },
    checked: {
      color: theme.palette.primary.main
    },
    disabled: {
      color: theme.palette.action.disabled
    }
  };
};

function Checkbox(props) {
  var checkedIcon = props.checkedIcon,
      icon = props.icon,
      indeterminate = props.indeterminate,
      indeterminateIcon = props.indeterminateIcon,
      other = _objectWithoutProperties(props, ['checkedIcon', 'icon', 'indeterminate', 'indeterminateIcon']);

  return React.createElement(SwitchBase$1, _extends$1({
    checkedIcon: indeterminate ? indeterminateIcon : checkedIcon,
    icon: indeterminate ? indeterminateIcon : icon
  }, other));
}

Checkbox.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If `true`, the component is checked.
   */
  checked: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   */
  defaultChecked: propTypes.bool,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: propTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: propTypes.node,
  /**
   * If `true`, the component appears indeterminate.
   */
  indeterminate: propTypes.bool,
  /**
   * The icon to display when the component is indeterminate.
   */
  indeterminateIcon: propTypes.node,
  /**
   * Properties applied to the `input` element.
   */
  inputProps: propTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: propTypes.func,
  /**
   * The input component property `type`.
   */
  inputType: propTypes.string,
  /*
   * @ignore
   */
  name: propTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: propTypes.func,
  /**
   * @ignore
   */
  tabIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /**
   * The value of the component.
   */
  value: propTypes.string
} : {};

Checkbox.defaultProps = {
  indeterminate: false,
  indeterminateIcon: React.createElement(IndeterminateCheckBoxIcon, null)
};

var Checkbox$1 = withStyles(styles$17, { name: 'MuiCheckbox' })(Checkbox);

/**
 * @ignore - internal component.
 */

var _ref$3 = React.createElement('path', { d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z' });

var Cancel = function Cancel(props) {
  return React.createElement(
    SvgIcon$1,
    props,
    _ref$3
  );
};
Cancel = pure(Cancel);
Cancel.muiName = 'SvgIcon';

var CancelIcon = Cancel;

var styles$18 = function styles(theme) {
  var height = 32;
  var backgroundColor = theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700];
  var deleteIconColor = fade(theme.palette.text.primary, 0.26);

  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(13),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: height,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor: backgroundColor,
      borderRadius: height / 2,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(),
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: 'default',
      outline: 'none', // No outline on focused element in Chrome (as triggered by tabIndex prop)
      border: 'none', // Remove `button` border
      padding: 0 // Remove `button` padding
    },
    clickable: {
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08)
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12)
      }
    },
    deletable: {
      '&:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08)
      }
    },
    avatar: {
      marginRight: -4,
      width: height,
      height: height,
      color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
      fontSize: theme.typography.pxToRem(16)
    },
    avatarChildren: {
      width: 19,
      height: 19
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 12,
      userSelect: 'none',
      whiteSpace: 'nowrap',
      cursor: 'inherit'
    },
    deleteIcon: {
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      color: deleteIconColor,
      cursor: 'pointer',
      height: 'auto',
      margin: '0 4px 0 -8px',
      '&:hover': {
        color: fade(deleteIconColor, 0.4)
      }
    }
  };
};

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */

var Chip = function (_React$Component) {
  _inherits(Chip, _React$Component);

  function Chip() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Chip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chip.__proto__ || _Object$getPrototypeOf(Chip)).call.apply(_ref, [this].concat(args))), _this), _this.chipRef = null, _this.handleDeleteIconClick = function (event) {
      // Stop the event from bubbling up to the `Chip`
      event.stopPropagation();
      var onDelete = _this.props.onDelete;

      if (onDelete) {
        onDelete(event);
      }
    }, _this.handleKeyDown = function (event) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          onDelete = _this$props.onDelete,
          onKeyDown = _this$props.onKeyDown;

      var key = keycode(event);

      if (onClick && (key === 'space' || key === 'enter')) {
        event.preventDefault();
        onClick(event);
      } else if (onDelete && key === 'backspace') {
        event.preventDefault();
        onDelete(event);
      } else if (key === 'esc') {
        event.preventDefault();
        if (_this.chipRef) {
          _this.chipRef.blur();
        }
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chip, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          avatarProp = _props.avatar,
          classes = _props.classes,
          classNameProp = _props.className,
          Component = _props.component,
          deleteIconProp = _props.deleteIcon,
          label = _props.label,
          onClick = _props.onClick,
          onDelete = _props.onDelete,
          onKeyDown = _props.onKeyDown,
          tabIndexProp = _props.tabIndex,
          other = _objectWithoutProperties(_props, ['avatar', 'classes', 'className', 'component', 'deleteIcon', 'label', 'onClick', 'onDelete', 'onKeyDown', 'tabIndex']);

      var className = classnames(classes.root, _defineProperty$1({}, classes.clickable, onClick), _defineProperty$1({}, classes.deletable, onDelete), classNameProp);

      var deleteIcon = null;
      if (onDelete) {
        deleteIcon = deleteIconProp && React.isValidElement(deleteIconProp) ? React.cloneElement(deleteIconProp, {
          className: classnames(deleteIconProp.props.className, classes.deleteIcon),
          onClick: this.handleDeleteIconClick
        }) : React.createElement(CancelIcon, { className: classes.deleteIcon, onClick: this.handleDeleteIconClick });
      }

      var avatar = null;
      if (avatarProp && React.isValidElement(avatarProp)) {
        avatar = React.cloneElement(avatarProp, {
          className: classnames(classes.avatar, avatarProp.props.className),
          childrenClassName: classnames(classes.avatarChildren, avatarProp.props.childrenClassName)
        });
      }

      var tabIndex = tabIndexProp;

      if (!tabIndex) {
        tabIndex = onClick || onDelete ? 0 : -1;
      }

      return React.createElement(
        Component,
        _extends$1({
          role: 'button',
          className: className,
          tabIndex: tabIndex,
          onClick: onClick,
          onKeyDown: this.handleKeyDown,
          ref: function ref(node) {
            _this2.chipRef = node;
          }
        }, other),
        avatar,
        React.createElement(
          'span',
          { className: classes.label },
          label
        ),
        deleteIcon
      );
    }
  }]);

  return Chip;
}(React.Component);

Chip.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Avatar element.
   */
  avatar: propTypes.element,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: propTypes.element,
  /**
   * The content of the label.
   */
  label: propTypes.node,
  /**
   * @ignore
   */
  onClick: propTypes.func,
  /**
   * Callback function fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: propTypes.func,
  /**
   * @ignore
   */
  onKeyDown: propTypes.func,
  /**
   * @ignore
   */
  tabIndex: propTypes.oneOfType([propTypes.number, propTypes.string])
} : {};

Chip.defaultProps = {
  component: 'div'
};

var Chip$1 = withStyles(styles$18, { name: 'MuiChip' })(Chip);

var supports = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passiveOption = undefined;



var _defineProperty2 = _interopRequireDefault(defineProperty$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defineProperty(object, property, attr) {
  return (0, _defineProperty2.default)(object, property, attr);
}

// Passive options
// Inspired by https://github.com/Modernizr/Modernizr/blob/master/feature-detects/dom/passiveeventlisteners.js
var passiveOption = exports.passiveOption = function () {
  var cache = null;

  return function () {
    if (cache !== null) {
      return cache;
    }

    var supportsPassiveOption = false;

    try {
      window.addEventListener('test', null, defineProperty({}, 'passive', {
        get: function get() {
          supportsPassiveOption = true;
        }
      }));
    } catch (err) {
      //
    }

    cache = supportsPassiveOption;

    return supportsPassiveOption;
  }();
}();

exports.default = {};
});

unwrapExports(supports);
var supports_1 = supports.passiveOption;

var lib$8 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf$3);



var _classCallCheck3 = _interopRequireDefault(classCallCheck);



var _createClass3 = _interopRequireDefault(createClass);



var _possibleConstructorReturn3 = _interopRequireDefault(possibleConstructorReturn);



var _inherits3 = _interopRequireDefault(inherits);



var _typeof3 = _interopRequireDefault(_typeof_1);



var _keys2 = _interopRequireDefault(keys$2);



var _objectWithoutProperties3 = _interopRequireDefault(objectWithoutProperties);



var _assign2 = _interopRequireDefault(assign$2);

exports.withOptions = withOptions;



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);



var _shallowEqual2 = _interopRequireDefault(shallowEqual_1);



var _warning2 = _interopRequireDefault(warning_1$2);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultEventOptions = {
  capture: false,
  passive: false
};

function mergeDefaultEventOptions(options) {
  return (0, _assign2.default)({}, defaultEventOptions, options);
}

function getEventListenerArgs(eventName, callback, options) {
  var args = [eventName, callback];
  args.push(supports.passiveOption ? options : options.capture);
  return args;
}

function on(target, eventName, callback, options) {
  // eslint-disable-next-line prefer-spread
  target.addEventListener.apply(target, getEventListenerArgs(eventName, callback, options));
}

function off(target, eventName, callback, options) {
  // eslint-disable-next-line prefer-spread
  target.removeEventListener.apply(target, getEventListenerArgs(eventName, callback, options));
}

function forEachListener(props, iteratee) {
  var children = props.children,
      target = props.target,
      eventProps = (0, _objectWithoutProperties3.default)(props, ['children', 'target']);


  (0, _keys2.default)(eventProps).forEach(function (name) {
    if (name.substring(0, 2) !== 'on') {
      return;
    }

    var prop = eventProps[name];
    var type = typeof prop === 'undefined' ? 'undefined' : (0, _typeof3.default)(prop);
    var isObject = type === 'object';
    var isFunction = type === 'function';

    if (!isObject && !isFunction) {
      return;
    }

    var capture = name.substr(-7).toLowerCase() === 'capture';
    var eventName = name.substring(2).toLowerCase();
    eventName = capture ? eventName.substring(0, eventName.length - 7) : eventName;

    if (isObject) {
      iteratee(eventName, prop.handler, prop.options);
    } else {
      iteratee(eventName, prop, mergeDefaultEventOptions({ capture: capture }));
    }
  });
}

function withOptions(handler, options) {
  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(options, 'react-event-listener: should be specified options in withOptions.') : void 0;

  return {
    handler: handler,
    options: mergeDefaultEventOptions(options)
  };
}

var EventListener = function (_React$Component) {
  (0, _inherits3.default)(EventListener, _React$Component);

  function EventListener() {
    (0, _classCallCheck3.default)(this, EventListener);
    return (0, _possibleConstructorReturn3.default)(this, (EventListener.__proto__ || (0, _getPrototypeOf2.default)(EventListener)).apply(this, arguments));
  }

  (0, _createClass3.default)(EventListener, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addListeners();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual2.default)(this.props, nextProps);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.removeListeners();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.addListeners();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeListeners();
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      this.applyListeners(on);
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      this.applyListeners(off);
    }
  }, {
    key: 'applyListeners',
    value: function applyListeners(onOrOff) {
      var target = this.props.target;


      if (target) {
        var element = target;

        if (typeof target === 'string') {
          element = window[target];
        }

        forEachListener(this.props, onOrOff.bind(null, element));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children || null;
    }
  }]);
  return EventListener;
}(_react2.default.Component);

EventListener.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * You can provide a single child too.
   */
  children: _propTypes2.default.node,
  /**
   * The DOM target to listen to.
   */
  target: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]).isRequired
} : {};

exports.default = EventListener;
});

var EventListener = unwrapExports(lib$8);
var lib_1$2 = lib$8.withOptions;

var isDescendant = function isDescendant(el, target) {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};

/**
 * Listen for click events that are triggered outside of the component children.
 */

var ClickAwayListener = function (_React$Component) {
  _inherits(ClickAwayListener, _React$Component);

  function ClickAwayListener() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ClickAwayListener);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ClickAwayListener.__proto__ || _Object$getPrototypeOf(ClickAwayListener)).call.apply(_ref, [this].concat(args))), _this), _this.mounted = false, _this.handleClickAway = function (event) {
      // Ignore events that have been `event.preventDefault()` marked.
      if (event.defaultPrevented) {
        return;
      }

      // IE11 support, which trigger the handleClickAway even after the unbind
      if (_this.mounted) {
        var el = findDOMNode(_this);

        if (event.target instanceof HTMLElement && document.documentElement && document.documentElement.contains(event.target) && !isDescendant(el, event.target)) {
          _this.props.onClickAway(event);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ClickAwayListener, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        EventListener,
        {
          target: 'document',
          onMouseup: this.handleClickAway,
          onTouchend: this.handleClickAway
        },
        this.props.children
      );
    }
  }]);

  return ClickAwayListener;
}(React.Component);

ClickAwayListener.propTypes = process.env.NODE_ENV !== "production" ? {
  children: propTypes.node.isRequired,
  onClickAway: propTypes.func.isRequired
} : {};

var ownerDocument_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ownerDocument;
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
module.exports = exports["default"];
});

var ownerDocument = unwrapExports(ownerDocument_1);

var activeElement_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = activeElement;



var _ownerDocument2 = _interopRequireDefault(ownerDocument_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function activeElement() {
  var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _ownerDocument2.default)();

  try {
    return doc.activeElement;
  } catch (e) {/* ie throws if no active element */}
}
module.exports = exports['default'];
});

var activeElement = unwrapExports(activeElement_1);

/**
 * @ignore - internal component.
 *
 * Internal helper component to allow attaching a ref to a
 * child element that may not accept refs (functional component).
 */

var RefHolder = function (_React$Component) {
  _inherits(RefHolder, _React$Component);

  function RefHolder() {
    _classCallCheck(this, RefHolder);

    return _possibleConstructorReturn(this, (RefHolder.__proto__ || _Object$getPrototypeOf(RefHolder)).apply(this, arguments));
  }

  _createClass(RefHolder, [{
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return RefHolder;
}(React.Component);

RefHolder.propTypes = process.env.NODE_ENV !== "production" ? {
  children: propTypes.node
} : {};

// This module is based on https://github.com/airbnb/prop-types-exact repository.
// However, in order to reduce the number of dependencies and to remove some extra safe checks
// the module was forked.

var specialProperty = 'exact-prop: \u200B';

function exactProp(propTypes, componentNameInError) {
  return _extends$1({}, propTypes, _defineProperty$1({}, specialProperty, function (props) {
    var unknownProps = _Object$keys(props).filter(function (prop) {
      return !propTypes.hasOwnProperty(prop);
    });
    if (unknownProps.length > 0) {
      return new TypeError(componentNameInError + ': unknown props found: ' + unknownProps.join(', ') + '. Please remove the unknown properties.');
    }
    return null;
  }));
}

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  return ownerDocument(ReactDOM.findDOMNode(element));
}

/**
 * This component shares many concepts with
 * [react-overlays](https://react-bootstrap.github.io/react-overlays/#portals)
 * But has been forked in order to fix some bugs, reduce the number of dependencies
 * and take the control of our destiny.
 */

var Portal = function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Portal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Portal.__proto__ || _Object$getPrototypeOf(Portal)).call.apply(_ref, [this].concat(args))), _this), _this.getMountNode = function () {
      return _this.mountNode;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setContainer(this.props.container);
      this.forceUpdate(this.props.onRendered);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.container !== this.props.container) {
        this.setContainer(nextProps.container);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mountNode = null;
    }
  }, {
    key: 'setContainer',
    value: function setContainer(container) {
      this.mountNode = getContainer(container, getOwnerDocument(this).body);
    }

    /**
     * @public
     */

  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return this.mountNode ? ReactDOM.createPortal(children, this.mountNode) : null;
    }
  }]);

  return Portal;
}(React.Component);

Portal.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The children to render into the `container`.
   */
  children: propTypes.node.isRequired,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it's using the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: propTypes.oneOfType([propTypes.object, propTypes.func]),
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered: propTypes.func
} : {};

Portal.propTypes = process.env.NODE_ENV !== "production" ? exactProp(Portal.propTypes, 'Portal') : {};

function getContainer$1(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument$1(element) {
  return ownerDocument(ReactDOM.findDOMNode(element));
}

/**
 * @ignore - internal component.
 *
 * This module will soon be gone. We should drop it as soon as React@15.x support stop.
 */

var LegacyPortal = function (_React$Component) {
  _inherits(LegacyPortal, _React$Component);

  function LegacyPortal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LegacyPortal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LegacyPortal.__proto__ || _Object$getPrototypeOf(LegacyPortal)).call.apply(_ref, [this].concat(args))), _this), _this.getMountNode = function () {
      return _this.mountNode;
    }, _this.mountOverlayTarget = function () {
      if (!_this.overlayTarget) {
        _this.overlayTarget = document.createElement('div');
        _this.mountNode = getContainer$1(_this.props.container, getOwnerDocument$1(_this).body);
        _this.mountNode.appendChild(_this.overlayTarget);
      }
    }, _this.unmountOverlayTarget = function () {
      if (_this.overlayTarget) {
        _this.mountNode.removeChild(_this.overlayTarget);
        _this.overlayTarget = null;
      }
      _this.mountNode = null;
    }, _this.unrenderOverlay = function () {
      if (_this.overlayTarget) {
        ReactDOM.unmountComponentAtNode(_this.overlayTarget);
        _this.overlayInstance = null;
      }
    }, _this.renderOverlay = function () {
      var overlay = _this.props.children;
      _this.mountOverlayTarget();
      var initialRender = !_this.overlayInstance;
      _this.overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(_this, overlay, _this.overlayTarget, function () {
        if (initialRender && _this.props.onRendered) {
          _this.props.onRendered();
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LegacyPortal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      this.renderOverlay();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.overlayTarget && nextProps.container !== this.props.container) {
        this.mountNode.removeChild(this.overlayTarget);
        this.mountNode = getContainer$1(nextProps.container, getOwnerDocument$1(this).body);
        this.mountNode.appendChild(this.overlayTarget);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderOverlay();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      this.unrenderOverlay();
      this.unmountOverlayTarget();
    }

    /**
     * @public
     */

  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return LegacyPortal;
}(React.Component);

LegacyPortal.propTypes = process.env.NODE_ENV !== "production" ? {
  children: propTypes.element.isRequired,
  container: propTypes.oneOfType([propTypes.object, propTypes.func]),
  onRendered: propTypes.func
} : {};

LegacyPortal.propTypes = process.env.NODE_ENV !== "production" ? exactProp(LegacyPortal.propTypes, 'LegacyPortal') : {};

var Portal$2 = ReactDOM.createPortal ? Portal : LegacyPortal;

var camelize_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelize;
var rHyphen = /-(.)/g;

function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
}
module.exports = exports["default"];
});

unwrapExports(camelize_1$1);

var camelizeStyle = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelizeStyleName;



var _camelize2 = _interopRequireDefault(camelize_1$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msPattern = /^-ms-/; /**
                          * Copyright 2014-2015, Facebook, Inc.
                          * All rights reserved.
                          * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
                          */
function camelizeStyleName(string) {
  return (0, _camelize2.default)(string.replace(msPattern, 'ms-'));
}
module.exports = exports['default'];
});

unwrapExports(camelizeStyle);

var hyphenate_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenate;

var rUpper = /([A-Z])/g;

function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
}
module.exports = exports['default'];
});

unwrapExports(hyphenate_1);

var hyphenateStyle = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateStyleName;



var _hyphenate2 = _interopRequireDefault(hyphenate_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msPattern = /^ms-/; /**
                         * Copyright 2013-2014, Facebook, Inc.
                         * All rights reserved.
                         * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
                         */

function hyphenateStyleName(string) {
  return (0, _hyphenate2.default)(string).replace(msPattern, '-ms-');
}
module.exports = exports['default'];
});

unwrapExports(hyphenateStyle);

var getComputedStyle$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _getComputedStyle;



var _camelizeStyle2 = _interopRequireDefault(camelizeStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rposition = /^(top|right|bottom|left)$/;
var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

function _getComputedStyle(node) {
  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
  var doc = node.ownerDocument;

  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : {
    //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
    getPropertyValue: function getPropertyValue(prop) {
      var style = node.style;

      prop = (0, _camelizeStyle2.default)(prop);

      if (prop == 'float') prop = 'styleFloat';

      var current = node.currentStyle[prop] || null;

      if (current == null && style && style[prop]) current = style[prop];

      if (rnumnonpx.test(current) && !rposition.test(prop)) {
        // Remember the original values
        var left = style.left;
        var runStyle = node.runtimeStyle;
        var rsLeft = runStyle && runStyle.left;

        // Put in the new values to get a computed value out
        if (rsLeft) runStyle.left = node.currentStyle.left;

        style.left = prop === 'fontSize' ? '1em' : current;
        current = style.pixelLeft + 'px';

        // Revert the changed values
        style.left = left;
        if (rsLeft) runStyle.left = rsLeft;
      }

      return current;
    }
  };
}
module.exports = exports['default'];
});

unwrapExports(getComputedStyle$1);

var removeStyle_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeStyle;
function removeStyle(node, key) {
  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
}
module.exports = exports['default'];
});

unwrapExports(removeStyle_1);

var properties = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined;



var _inDOM2 = _interopRequireDefault(inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transform = 'transform';
var prefix = void 0,
    transitionEnd = void 0,
    animationEnd = void 0;
var transitionProperty = void 0,
    transitionDuration = void 0,
    transitionTiming = void 0,
    transitionDelay = void 0;
var animationName = void 0,
    animationDuration = void 0,
    animationTiming = void 0,
    animationDelay = void 0;

if (_inDOM2.default) {
  var _getTransitionPropert = getTransitionProperties();

  prefix = _getTransitionPropert.prefix;
  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;
  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;


  exports.transform = transform = prefix + '-' + transform;
  exports.transitionProperty = transitionProperty = prefix + '-transition-property';
  exports.transitionDuration = transitionDuration = prefix + '-transition-duration';
  exports.transitionDelay = transitionDelay = prefix + '-transition-delay';
  exports.transitionTiming = transitionTiming = prefix + '-transition-timing-function';

  exports.animationName = animationName = prefix + '-animation-name';
  exports.animationDuration = animationDuration = prefix + '-animation-duration';
  exports.animationTiming = animationTiming = prefix + '-animation-delay';
  exports.animationDelay = animationDelay = prefix + '-animation-timing-function';
}

exports.transform = transform;
exports.transitionProperty = transitionProperty;
exports.transitionTiming = transitionTiming;
exports.transitionDelay = transitionDelay;
exports.transitionDuration = transitionDuration;
exports.transitionEnd = transitionEnd;
exports.animationName = animationName;
exports.animationDuration = animationDuration;
exports.animationTiming = animationTiming;
exports.animationDelay = animationDelay;
exports.animationEnd = animationEnd;
exports.default = {
  transform: transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};


function getTransitionProperties() {
  var style = document.createElement('div').style;

  var vendorMap = {
    O: function O(e) {
      return 'o' + e.toLowerCase();
    },
    Moz: function Moz(e) {
      return e.toLowerCase();
    },
    Webkit: function Webkit(e) {
      return 'webkit' + e;
    },
    ms: function ms(e) {
      return 'MS' + e;
    }
  };

  var vendors = Object.keys(vendorMap);

  var transitionEnd = void 0,
      animationEnd = void 0;
  var prefix = '';

  for (var i = 0; i < vendors.length; i++) {
    var vendor = vendors[i];

    if (vendor + 'TransitionProperty' in style) {
      prefix = '-' + vendor.toLowerCase();
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';

  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';

  style = null;

  return { animationEnd: animationEnd, transitionEnd: transitionEnd, prefix: prefix };
}
});

unwrapExports(properties);
var properties_1 = properties.animationEnd;
var properties_2 = properties.animationDelay;
var properties_3 = properties.animationTiming;
var properties_4 = properties.animationDuration;
var properties_5 = properties.animationName;
var properties_6 = properties.transitionEnd;
var properties_7 = properties.transitionDuration;
var properties_8 = properties.transitionDelay;
var properties_9 = properties.transitionTiming;
var properties_10 = properties.transitionProperty;
var properties_11 = properties.transform;

var isTransform_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTransform;
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;

function isTransform(property) {
  return !!(property && supportedTransforms.test(property));
}
module.exports = exports["default"];
});

unwrapExports(isTransform_1);

var style_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = style;



var _camelizeStyle2 = _interopRequireDefault(camelizeStyle);



var _hyphenateStyle2 = _interopRequireDefault(hyphenateStyle);



var _getComputedStyle3 = _interopRequireDefault(getComputedStyle$1);



var _removeStyle2 = _interopRequireDefault(removeStyle_1);





var _isTransform2 = _interopRequireDefault(isTransform_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function style(node, property, value) {
  var css = '';
  var transforms = '';
  var props = property;

  if (typeof property === 'string') {
    if (value === undefined) {
      return node.style[(0, _camelizeStyle2.default)(property)] || (0, _getComputedStyle3.default)(node).getPropertyValue((0, _hyphenateStyle2.default)(property));
    } else {
      (props = {})[property] = value;
    }
  }

  Object.keys(props).forEach(function (key) {
    var value = props[key];
    if (!value && value !== 0) {
      (0, _removeStyle2.default)(node, (0, _hyphenateStyle2.default)(key));
    } else if ((0, _isTransform2.default)(key)) {
      transforms += key + '(' + value + ') ';
    } else {
      css += (0, _hyphenateStyle2.default)(key) + ': ' + value + ';';
    }
  });

  if (transforms) {
    css += properties.transform + ': ' + transforms + ';';
  }

  node.style.cssText += ';' + css;
}
module.exports = exports['default'];
});

var css = unwrapExports(style_1);

var scrollbarSize = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (recalc) {
  if (!size && size !== 0 || recalc) {
    if (_inDOM2.default) {
      var scrollDiv = document.createElement('div');

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
};



var _inDOM2 = _interopRequireDefault(inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var size = void 0;

module.exports = exports['default'];
});

var getScrollbarSize = unwrapExports(scrollbarSize);

var isWindow = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindow;
function getWindow(node) {
  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
}
module.exports = exports["default"];
});

var isWindow$1 = unwrapExports(isWindow);

function isBody(node) {
  return node && node.tagName.toLowerCase() === 'body';
}

// Do we have a scroll bar?
function isOverflowing(container) {
  var doc = ownerDocument(container);
  var win = isWindow$1(doc);

  /* istanbul ignore next */
  if (!win && !isBody(container)) {
    return container.scrollHeight > container.clientHeight;
  }

  // Takes in account potential non zero margin on the body.
  var style = window.getComputedStyle(doc.body);
  var marginLeft = parseInt(style.getPropertyValue('margin-left'), 10);
  var marginRight = parseInt(style.getPropertyValue('margin-right'), 10);

  return marginLeft + doc.body.clientWidth + marginRight < win.innerWidth;
}

var BLACKLIST = ['template', 'script', 'style'];

function isHidable(node) {
  return node.nodeType === 1 && BLACKLIST.indexOf(node.tagName.toLowerCase()) === -1;
}

function siblings(container, mount, callback) {
  mount = [].concat(mount); // eslint-disable-line no-param-reassign
  [].forEach.call(container.children, function (node) {
    if (mount.indexOf(node) === -1 && isHidable(node)) {
      callback(node);
    }
  });
}

function ariaHidden(show, node) {
  if (!node) {
    return;
  }
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}

function hideSiblings(container, mountNode) {
  siblings(container, mountNode, function (node) {
    return ariaHidden(true, node);
  });
}

function showSiblings(container, mountNode) {
  siblings(container, mountNode, function (node) {
    return ariaHidden(false, node);
  });
}

function findIndexOf(data, callback) {
  var idx = -1;
  data.some(function (item, index) {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}

function findContainer(data, modal) {
  return findIndexOf(data, function (item) {
    return item.modals.indexOf(modal) !== -1;
  });
}

function getPaddingRight(node) {
  return parseInt(css(node, 'paddingRight') || 0, 10);
}

function setContainerStyle(data, container) {
  var style = { overflow: 'hidden' };

  // We are only interested in the actual `style` here because we will override it.
  data.style = {
    overflow: container.style.overflow,
    paddingRight: container.style.paddingRight
  };

  if (data.overflowing) {
    var scrollbarSize$$1 = getScrollbarSize();

    // Use computed style, here to get the real padding to add our scrollbar width.
    style.paddingRight = getPaddingRight(container) + scrollbarSize$$1 + 'px';

    // .mui-fixed is a global helper.
    var fixedNodes = document.querySelectorAll('.mui-fixed');
    for (var i = 0; i < fixedNodes.length; i += 1) {
      var paddingRight = getPaddingRight(fixedNodes[i]);
      data.prevPaddings.push(paddingRight);
      fixedNodes[i].style.paddingRight = paddingRight + scrollbarSize$$1 + 'px';
    }
  }

  _Object$keys(style).forEach(function (key) {
    container.style[key] = style[key];
  });
}

function removeContainerStyle(data, container) {
  _Object$keys(data.style).forEach(function (key) {
    container.style[key] = data.style[key];
  });

  var fixedNodes = document.querySelectorAll('.mui-fixed');
  for (var i = 0; i < fixedNodes.length; i += 1) {
    fixedNodes[i].style.paddingRight = data.prevPaddings[i] + 'px';
  }
}
/**
 * @ignore - do not document.
 *
 * Proper state managment for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class
 * Used by the Modal to ensure proper styling of containers.
 */

var ModalManager = function ModalManager() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$hideSiblingNodes = _ref.hideSiblingNodes,
      hideSiblingNodes = _ref$hideSiblingNodes === undefined ? true : _ref$hideSiblingNodes,
      _ref$handleContainerO = _ref.handleContainerOverflow,
      handleContainerOverflow = _ref$handleContainerO === undefined ? true : _ref$handleContainerO;

  _classCallCheck(this, ModalManager);

  this.add = function (modal, container) {
    var modalIdx = _this.modals.indexOf(modal);
    var containerIdx = _this.containers.indexOf(container);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = _this.modals.length;
    _this.modals.push(modal);

    if (_this.hideSiblingNodes) {
      hideSiblings(container, modal.mountNode);
    }

    if (containerIdx !== -1) {
      _this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }

    var data = {
      modals: [modal],
      overflowing: isOverflowing(container),
      prevPaddings: []
    };

    if (_this.handleContainerOverflow) {
      setContainerStyle(data, container);
    }

    _this.containers.push(container);
    _this.data.push(data);

    return modalIdx;
  };

  this.remove = function (modal) {
    var modalIdx = _this.modals.indexOf(modal);

    if (modalIdx === -1) {
      return modalIdx;
    }

    var containerIdx = findContainer(_this.data, modal);
    var data = _this.data[containerIdx];
    var container = _this.containers[containerIdx];

    data.modals.splice(data.modals.indexOf(modal), 1);
    _this.modals.splice(modalIdx, 1);

    // If that was the last modal in a container, clean up the container.
    if (data.modals.length === 0) {
      if (_this.handleContainerOverflow) {
        removeContainerStyle(data, container);
      }

      if (_this.hideSiblingNodes) {
        showSiblings(container, modal.mountNode);
      }
      _this.containers.splice(containerIdx, 1);
      _this.data.splice(containerIdx, 1);
    } else if (_this.hideSiblingNodes) {
      // Otherwise make sure the next top modal is visible to a SR.
      ariaHidden(false, data.modals[data.modals.length - 1].mountNode);
    }

    return modalIdx;
  };

  this.isTopModal = function (modal) {
    return !!_this.modals.length && _this.modals[_this.modals.length - 1] === modal;
  };

  this.hideSiblingNodes = hideSiblingNodes;
  this.handleContainerOverflow = handleContainerOverflow;
  // this.modals[modalIdx] = modal
  this.modals = [];
  // this.containers[containerIdx] = container
  this.containers = [];
  // this.data[containerIdx] = {
  //   modals: [],
  // }
  this.data = [];
};

var defaultTheme$1 = void 0;

function getDefaultTheme$1() {
  if (defaultTheme$1) {
    return defaultTheme$1;
  }

  defaultTheme$1 = createMuiTheme();
  return defaultTheme$1;
}

// Provide the theme object as a property to the input component.
var withTheme = function withTheme() {
  return function (Component) {
    var WithTheme = function (_React$Component) {
      _inherits(WithTheme, _React$Component);

      function WithTheme(props, context) {
        _classCallCheck(this, WithTheme);

        var _this = _possibleConstructorReturn(this, (WithTheme.__proto__ || _Object$getPrototypeOf(WithTheme)).call(this, props, context));

        _this.state = {};
        _this.unsubscribeId = null;

        _this.state = {
          // We use || as the function call is lazy evaluated.
          theme: themeListener.initial(context) || getDefaultTheme$1()
        };
        return _this;
      }

      _createClass(WithTheme, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          this.unsubscribeId = themeListener.subscribe(this.context, function (theme) {
            _this2.setState({ theme: theme });
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.unsubscribeId !== null) {
            themeListener.unsubscribe(this.context, this.unsubscribeId);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return React.createElement(Component, _extends$1({ theme: this.state.theme }, this.props));
        }
      }]);

      return WithTheme;
    }(React.Component);

    WithTheme.contextTypes = themeListener.contextTypes;

    if (process.env.NODE_ENV !== 'production') {
      WithTheme.displayName = wrapDisplayName(Component, 'WithTheme');
    }

    hoistNonReactStatics(WithTheme, Component);

    if (process.env.NODE_ENV !== 'production') {
      // Exposed for test purposes.
      WithTheme.Naked = Component;
    }

    return WithTheme;
  };
};

var reflow = function reflow(node) {
  return node.scrollTop;
};

function getTransitionProps(props, options) {
  var timeout = props.timeout,
      _props$style = props.style,
      style = _props$style === undefined ? {} : _props$style;


  return {
    duration: style.transitionDuration || typeof timeout === 'number' ? timeout : timeout[options.mode],
    delay: style.transitionDelay
  };
}

// @inheritedComponent Transition

var styles$19 = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};

/**
 * The Fade transition is used by the Modal component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

var Fade = function (_React$Component) {
  _inherits(Fade, _React$Component);

  function Fade() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Fade);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Fade.__proto__ || _Object$getPrototypeOf(Fade)).call.apply(_ref, [this].concat(args))), _this), _this.handleEnter = function (node) {
      var theme = _this.props.theme;

      reflow(node); // So the animation always start from the start.

      var _getTransitionProps = getTransitionProps(_this.props, {
        mode: 'enter'
      }),
          transitionDuration = _getTransitionProps.duration,
          delay = _getTransitionProps.delay;

      node.style.transition = theme.transitions.create('opacity', {
        duration: transitionDuration,
        delay: delay
      });
      node.style.webkitTransition = theme.transitions.create('opacity', {
        duration: transitionDuration,
        delay: delay
      });

      if (_this.props.onEnter) {
        _this.props.onEnter(node);
      }
    }, _this.handleExit = function (node) {
      var theme = _this.props.theme;

      var _getTransitionProps2 = getTransitionProps(_this.props, {
        mode: 'exit'
      }),
          transitionDuration = _getTransitionProps2.duration,
          delay = _getTransitionProps2.delay;

      node.style.transition = theme.transitions.create('opacity', {
        duration: transitionDuration,
        delay: delay
      });
      node.style.webkitTransition = theme.transitions.create('opacity', {
        duration: transitionDuration,
        delay: delay
      });

      if (_this.props.onExit) {
        _this.props.onExit(node);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Fade, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          onEnter = _props.onEnter,
          onExit = _props.onExit,
          styleProp = _props.style,
          theme = _props.theme,
          other = _objectWithoutProperties(_props, ['children', 'onEnter', 'onExit', 'style', 'theme']);

      var style = _extends$1({}, styleProp, React.isValidElement(children) ? children.props.style : {});

      return React.createElement(
        Transition,
        _extends$1({ appear: true, onEnter: this.handleEnter, onExit: this.handleExit }, other),
        function (state, childProps) {
          return React.cloneElement(children, _extends$1({
            style: _extends$1({
              opacity: 0
            }, styles$19[state], style)
          }, childProps));
        }
      );
    }
  }]);

  return Fade;
}(React.Component);

Fade.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A single child content element.
   */
  children: propTypes.oneOfType([propTypes.element, propTypes.func]),
  /**
   * If `true`, the component will transition in.
   */
  in: propTypes.bool,
  /**
   * @ignore
   */
  onEnter: propTypes.func,
  /**
   * @ignore
   */
  onEntering: propTypes.func,
  /**
   * @ignore
   */
  onExit: propTypes.func,
  /**
   * @ignore
   */
  style: propTypes.object,
  /**
   * @ignore
   */
  theme: propTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number })])
} : {};

Fade.defaultProps = {
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};

var Fade$1 = withTheme()(Fade);

var styles$20 = {
  root: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    willChange: 'opacity',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  invisible: {
    backgroundColor: 'transparent'
  }
};

function Backdrop(props) {
  var classes = props.classes,
      invisible = props.invisible,
      open = props.open,
      transitionDuration = props.transitionDuration,
      other = _objectWithoutProperties(props, ['classes', 'invisible', 'open', 'transitionDuration']);

  var className = classnames(classes.root, _defineProperty$1({}, classes.invisible, invisible));

  return React.createElement(
    Fade$1,
    _extends$1({ appear: true, 'in': open, timeout: transitionDuration }, other),
    React.createElement('div', { className: className, 'aria-hidden': 'true' })
  );
}

Backdrop.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible: propTypes.bool,
  /**
   * If `true`, the backdrop is open.
   */
  open: propTypes.bool.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number })])
} : {};

Backdrop.defaultProps = {
  invisible: false
};

var Backdrop$1 = withStyles(styles$20, { name: 'MuiBackdrop' })(Backdrop);

// @inheritedComponent Portal

function getContainer$2(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument$2(element) {
  return ownerDocument(ReactDOM.findDOMNode(element));
}

function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty('in') : false;
}

var styles$21 = function styles(theme) {
  return {
    root: {
      display: 'flex',
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: theme.zIndex.modal,
      top: 0,
      left: 0
    },
    hidden: {
      visibility: 'hidden'
    }
  };
};

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props, context) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || _Object$getPrototypeOf(Modal)).call(this, props, context));

    _this.dialog = null;
    _this.mounted = false;
    _this.mountNode = null;

    _this.handleRendered = function () {
      _this.autoFocus();

      if (_this.props.onRendered) {
        _this.props.onRendered();
      }
    };

    _this.handleOpen = function () {
      var doc = getOwnerDocument$2(_this);
      var container = getContainer$2(_this.props.container, doc.body);

      _this.props.manager.add(_this, container);
      _this.onDocumentKeydownListener = addEventListener(doc, 'keydown', _this.handleDocumentKeyDown);
      _this.onFocusinListener = addEventListener(document, 'focus', _this.enforceFocus, true);
    };

    _this.handleClose = function () {
      _this.props.manager.remove(_this);
      _this.onDocumentKeydownListener.remove();
      _this.onFocusinListener.remove();
      _this.restoreLastFocus();
    };

    _this.handleExited = function () {
      _this.setState({ exited: true });
      _this.handleClose();
    };

    _this.handleBackdropClick = function (event) {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (_this.props.onBackdropClick) {
        _this.props.onBackdropClick(event);
      }

      if (!_this.props.disableBackdropClick && _this.props.onClose) {
        _this.props.onClose(event, 'backdropClick');
      }
    };

    _this.handleDocumentKeyDown = function (event) {
      if (!_this.isTopModal() || keycode(event) !== 'esc') {
        return;
      }

      if (_this.props.onEscapeKeyDown) {
        _this.props.onEscapeKeyDown(event);
      }

      if (!_this.props.disableEscapeKeyDown && _this.props.onClose) {
        _this.props.onClose(event, 'escapeKeyDown');
      }
    };

    _this.checkForFocus = function () {
      if (inDOM$1) {
        _this.lastFocus = activeElement();
      }
    };

    _this.enforceFocus = function () {
      if (_this.props.disableEnforceFocus || !_this.mounted || !_this.isTopModal()) {
        return;
      }

      var dialogElement = _this.getDialogElement();
      var currentActiveElement = activeElement(getOwnerDocument$2(_this));

      if (dialogElement && !contains$2(dialogElement, currentActiveElement)) {
        dialogElement.focus();
      }
    };

    _this.state = {
      exited: !_this.props.open
    };
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      if (this.props.open) {
        this.handleOpen();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.open) {
        this.setState({ exited: false });
      } else if (!getHasTransition(nextProps)) {
        // Otherwise let handleExited take care of marking exited.
        this.setState({ exited: true });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (!this.props.open && nextProps.open) {
        this.checkForFocus();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.open && !this.props.open && !getHasTransition(this.props)) {
        // Otherwise handleExited will call this.
        this.handleClose();
      } else if (!prevProps.open && this.props.open) {
        this.handleOpen();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;

      if (this.props.open || getHasTransition(this.props) && !this.state.exited) {
        this.handleClose();
      }
    }
  }, {
    key: 'getDialogElement',
    value: function getDialogElement() {
      return ReactDOM.findDOMNode(this.dialog);
    }
  }, {
    key: 'autoFocus',
    value: function autoFocus() {
      if (this.props.disableAutoFocus) {
        return;
      }

      var dialogElement = this.getDialogElement();
      var currentActiveElement = activeElement(getOwnerDocument$2(this));

      if (dialogElement && !contains$2(dialogElement, currentActiveElement)) {
        this.lastFocus = currentActiveElement;

        if (!dialogElement.hasAttribute('tabIndex')) {
          process.env.NODE_ENV !== "production" ? warning_1$2(false, ['Material-UI: the modal content node does not accept focus.', 'For the benefit of assistive technologies, ' + 'the tabIndex of the node is being set to "-1".'].join('\n')) : void 0;
          dialogElement.setAttribute('tabIndex', -1);
        }

        dialogElement.focus();
      }
    }
  }, {
    key: 'restoreLastFocus',
    value: function restoreLastFocus() {
      if (this.props.disableRestoreFocus) {
        return;
      }

      if (this.lastFocus) {
        this.lastFocus.focus();
        this.lastFocus = null;
      }
    }
  }, {
    key: 'isTopModal',
    value: function isTopModal() {
      return this.props.manager.isTopModal(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          BackdropComponent = _props.BackdropComponent,
          BackdropProps = _props.BackdropProps,
          children = _props.children,
          classes = _props.classes,
          className = _props.className,
          container = _props.container,
          disableAutoFocus = _props.disableAutoFocus,
          disableBackdropClick = _props.disableBackdropClick,
          disableEnforceFocus = _props.disableEnforceFocus,
          disableEscapeKeyDown = _props.disableEscapeKeyDown,
          disableRestoreFocus = _props.disableRestoreFocus,
          hideBackdrop = _props.hideBackdrop,
          keepMounted = _props.keepMounted,
          onBackdropClick = _props.onBackdropClick,
          onClose = _props.onClose,
          onEscapeKeyDown = _props.onEscapeKeyDown,
          onRendered = _props.onRendered,
          open = _props.open,
          manager = _props.manager,
          other = _objectWithoutProperties(_props, ['BackdropComponent', 'BackdropProps', 'children', 'classes', 'className', 'container', 'disableAutoFocus', 'disableBackdropClick', 'disableEnforceFocus', 'disableEscapeKeyDown', 'disableRestoreFocus', 'hideBackdrop', 'keepMounted', 'onBackdropClick', 'onClose', 'onEscapeKeyDown', 'onRendered', 'open', 'manager']);

      var exited = this.state.exited;

      var hasTransition = getHasTransition(this.props);
      var childProps = {};

      if (!keepMounted && !open && (!hasTransition || exited)) {
        return null;
      }

      // It's a Transition like component
      if (hasTransition) {
        childProps.onExited = createChainedFunction(this.handleExited, children.props.onExited);
      }

      if (children.props.role === undefined) {
        childProps.role = children.props.role || 'document';
      }

      if (children.props.tabIndex === undefined) {
        childProps.tabIndex = children.props.tabIndex || '-1';
      }

      return React.createElement(
        Portal$2,
        {
          ref: function ref(node) {
            _this2.mountNode = node ? node.getMountNode() : node;
          },
          container: container,
          onRendered: this.handleRendered
        },
        React.createElement(
          'div',
          _extends$1({
            className: classnames(classes.root, className, _defineProperty$1({}, classes.hidden, exited))
          }, other),
          hideBackdrop ? null : React.createElement(BackdropComponent, _extends$1({ open: open, onClick: this.handleBackdropClick }, BackdropProps)),
          React.createElement(
            RefHolder,
            {
              ref: function ref(node) {
                _this2.dialog = node;
              }
            },
            React.cloneElement(children, childProps)
          )
        )
      );
    }
  }]);

  return Modal;
}(React.Component);

Modal.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A backdrop component. Useful for custom backdrop rendering.
   */
  BackdropComponent: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Properties applied to the `Backdrop` element.
   */
  BackdropProps: propTypes.object,
  /**
   * A single child content element.
   */
  children: propTypes.element,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   */
  container: propTypes.oneOfType([propTypes.object, propTypes.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableAutoFocus: propTypes.bool,
  /**
   * If `true`, clicking the backdrop will not fire any callback.
   */
  disableBackdropClick: propTypes.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableEnforceFocus: propTypes.bool,
  /**
   * If `true`, hitting escape will not fire any callback.
   */
  disableEscapeKeyDown: propTypes.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden.
   */
  disableRestoreFocus: propTypes.bool,
  /**
   * If `true`, the backdrop is not rendered.
   */
  hideBackdrop: propTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This property can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   */
  keepMounted: propTypes.bool,
  /**
   * A modal manager used to track and manage the state of open
   * Modals. Useful when customizing how modals interact within a container.
   */
  manager: propTypes.object,
  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: propTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback
   * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`
   */
  onClose: propTypes.func,
  /**
   * Callback fired when the escape key is pressed,
   * `disableEscapeKeyDown` is false and the modal is in focus.
   */
  onEscapeKeyDown: propTypes.func,
  /**
   * Callback fired once the children has been mounted into the `container`.
   * It signals that the `open={true}` property took effect.
   */
  onRendered: propTypes.func,
  /**
   * If `true`, the modal is open.
   */
  open: propTypes.bool.isRequired
} : {};

Modal.defaultProps = {
  disableAutoFocus: false,
  disableBackdropClick: false,
  disableEnforceFocus: false,
  disableEscapeKeyDown: false,
  disableRestoreFocus: false,
  hideBackdrop: false,
  keepMounted: false,
  // Modals don't open on the server so this won't conflict with concurrent requests.
  manager: new ModalManager(),
  BackdropComponent: Backdrop$1
};

var Modal$1 = withStyles(styles$21, { flip: false, name: 'MuiModal' })(Modal);

// @inheritedComponent Modal

var styles$22 = function styles(theme) {
  return {
    root: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    paper: {
      display: 'flex',
      margin: theme.spacing.unit * 4,
      flexDirection: 'column',
      flex: '0 1 auto',
      position: 'relative',
      maxHeight: '90vh',
      overflowY: 'auto', // Fix IE11 issue, to remove at some point.
      '&:focus': {
        outline: 'none'
      }
    },
    paperWidthXs: {
      maxWidth: Math.max(theme.breakpoints.values.xs, 360)
    },
    paperWidthSm: {
      maxWidth: theme.breakpoints.values.sm
    },
    paperWidthMd: {
      maxWidth: theme.breakpoints.values.md
    },
    fullWidth: {
      width: '100%'
    },
    fullScreen: {
      margin: 0,
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      borderRadius: 0
    }
  };
};

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
function Dialog(props) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      className = props.className,
      fullScreen = props.fullScreen,
      fullWidth = props.fullWidth,
      disableBackdropClick = props.disableBackdropClick,
      disableEscapeKeyDown = props.disableEscapeKeyDown,
      maxWidth = props.maxWidth,
      onBackdropClick = props.onBackdropClick,
      onClose = props.onClose,
      onEnter = props.onEnter,
      onEntered = props.onEntered,
      onEntering = props.onEntering,
      onEscapeKeyDown = props.onEscapeKeyDown,
      onExit = props.onExit,
      onExited = props.onExited,
      onExiting = props.onExiting,
      open = props.open,
      PaperProps = props.PaperProps,
      TransitionProp = props.transition,
      transitionDuration = props.transitionDuration,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'fullScreen', 'fullWidth', 'disableBackdropClick', 'disableEscapeKeyDown', 'maxWidth', 'onBackdropClick', 'onClose', 'onEnter', 'onEntered', 'onEntering', 'onEscapeKeyDown', 'onExit', 'onExited', 'onExiting', 'open', 'PaperProps', 'transition', 'transitionDuration']);

  return React.createElement(
    Modal$1,
    _extends$1({
      className: classnames(classes.root, className),
      BackdropProps: {
        transitionDuration: transitionDuration
      },
      disableBackdropClick: disableBackdropClick,
      disableEscapeKeyDown: disableEscapeKeyDown,
      onBackdropClick: onBackdropClick,
      onEscapeKeyDown: onEscapeKeyDown,
      onClose: onClose,
      open: open,
      role: 'dialog'
    }, other),
    React.createElement(
      TransitionProp,
      {
        appear: true,
        'in': open,
        timeout: transitionDuration,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: onExited
      },
      React.createElement(
        Paper$1,
        _extends$1({
          elevation: 24,
          className: classnames(classes.paper, (_classNames = {}, _defineProperty$1(_classNames, classes['paperWidth' + (maxWidth ? capitalize(maxWidth) : '')], maxWidth), _defineProperty$1(_classNames, classes.fullScreen, fullScreen), _defineProperty$1(_classNames, classes.fullWidth, fullWidth), _classNames))
        }, PaperProps),
        children
      )
    )
  );
}

Dialog.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Dialog children, usually the included sub-components.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * If `true`, clicking the backdrop will not fire the `onClose` callback.
   */
  disableBackdropClick: propTypes.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   */
  disableEscapeKeyDown: propTypes.bool,
  /**
   * If `true`, it will be full-screen
   */
  fullScreen: propTypes.bool,
  /**
   * If specified, stretches dialog to max width.
   */
  fullWidth: propTypes.bool,
  /**
   * Determine the max width of the dialog.
   * The dialog width grows with the size of the screen, this property is useful
   * on the desktop where you might need some coherent different width size across your
   * application. Set to `false` to disable `maxWidth`.
   */
  maxWidth: propTypes.oneOf(['xs', 'sm', 'md', false]),
  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: propTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: propTypes.func,
  /**
   * Callback fired before the dialog enters.
   */
  onEnter: propTypes.func,
  /**
   * Callback fired when the dialog has entered.
   */
  onEntered: propTypes.func,
  /**
   * Callback fired when the dialog is entering.
   */
  onEntering: propTypes.func,
  /**
   * Callback fired when the escape key is pressed,
   * `disableKeyboard` is false and the modal is in focus.
   */
  onEscapeKeyDown: propTypes.func,
  /**
   * Callback fired before the dialog exits.
   */
  onExit: propTypes.func,
  /**
   * Callback fired when the dialog has exited.
   */
  onExited: propTypes.func,
  /**
   * Callback fired when the dialog is exiting.
   */
  onExiting: propTypes.func,
  /**
   * If `true`, the Dialog is open.
   */
  open: propTypes.bool.isRequired,
  /**
   * Properties applied to the `Paper` element.
   */
  PaperProps: propTypes.object,
  /**
   * Transition component.
   */
  transition: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number })])
} : {};

Dialog.defaultProps = {
  fullScreen: false,
  fullWidth: false,
  disableBackdropClick: false,
  disableEscapeKeyDown: false,
  maxWidth: 'sm',
  transition: Fade$1,
  transitionDuration: { enter: duration.enteringScreen, exit: duration.leavingScreen }
};

var Dialog$1 = withStyles(styles$22, { name: 'MuiDialog' })(Dialog);

var styles$23 = function styles(theme) {
  return {
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: theme.spacing.unit + 'px ' + theme.spacing.unit / 2 + 'px',
      flex: '0 0 auto'
    },
    action: {
      margin: '0 ' + theme.spacing.unit / 2 + 'px'
    },
    button: {
      minWidth: 64
    }
  };
};

function DialogActions(props) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className']);

  return React.createElement(
    'div',
    _extends$1({ className: classnames(classes.root, className) }, other),
    React.Children.map(children, function (child) {
      if (!React.isValidElement(child)) {
        return null;
      }

      return React.createElement(
        'div',
        { className: classes.action },
        React.cloneElement(child, {
          className: classnames(classes.button, child.props.className)
        })
      );
    })
  );
}

DialogActions.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string
} : {};

var DialogActions$1 = withStyles(styles$23, { name: 'MuiDialogActions' })(DialogActions);

var styles$24 = function styles(theme) {
  return {
    root: {
      margin: 0,
      padding: theme.spacing.unit * 3 + 'px ' + theme.spacing.unit * 3 + 'px       20px ' + theme.spacing.unit * 3 + 'px',
      flex: '0 0 auto'
    }
  };
};

function DialogTitle(props) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      disableTypography = props.disableTypography,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'disableTypography']);

  return React.createElement(
    'div',
    _extends$1({ className: classnames(classes.root, className) }, other),
    disableTypography ? children : React.createElement(
      Typography$1,
      { variant: 'title' },
      children
    )
  );
}

DialogTitle.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, this can be useful to render an h4 instead of the default h2.
   */
  disableTypography: propTypes.bool
} : {};

DialogTitle.defaultProps = {
  disableTypography: false
};

var DialogTitle$1 = withStyles(styles$24, { name: 'MuiDialogTitle' })(DialogTitle);

var styles$25 = function styles(theme) {
  var spacing = theme.spacing.unit * 3;
  return {
    root: {
      flex: '1 1 auto',
      overflowY: 'auto',
      padding: '0 ' + spacing + 'px ' + spacing + 'px ' + spacing + 'px',
      '&:first-child': {
        paddingTop: spacing
      }
    }
  };
};

function DialogContent(props) {
  var classes = props.classes,
      children = props.children,
      className = props.className,
      other = _objectWithoutProperties(props, ['classes', 'children', 'className']);

  return React.createElement(
    'div',
    _extends$1({ className: classnames(classes.root, className) }, other),
    children
  );
}

DialogContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string
} : {};

var DialogContent$1 = withStyles(styles$25, { name: 'MuiDialogContent' })(DialogContent);

var styles$26 = function styles(theme) {
  return {
    root: _extends$1({}, theme.typography.subheading, {
      color: theme.palette.text.secondary,
      margin: 0
    })
  };
};

function DialogContentText(props) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className']);

  return React.createElement(
    'p',
    _extends$1({ className: classnames(classes.root, className) }, other),
    children
  );
}

DialogContentText.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string
} : {};

var DialogContentText$1 = withStyles(styles$26, { name: 'MuiDialogContentText' })(DialogContentText);

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$1;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = _freeGlobal || freeSelf || Function('return this')();

var _root = root$1;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return _root.Date.now();
};

var now_1 = now;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$3.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol$1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;
var nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber_1(wait) || 0;
  if (isObject_1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now_1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now_1());
  }

  function debounced() {
    var time = now_1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

// By default, returns true if screen width is the same or greater than the given breakpoint.
var isWidthUp = function isWidthUp(breakpoint, width) {
  var inclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (inclusive) {
    return keys$3.indexOf(breakpoint) <= keys$3.indexOf(width);
  }
  return keys$3.indexOf(breakpoint) < keys$3.indexOf(width);
};

// By default, returns true if screen width is the same or less than the given breakpoint.
var isWidthDown = function isWidthDown(breakpoint, width) {
  var inclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (inclusive) {
    return keys$3.indexOf(width) <= keys$3.indexOf(breakpoint);
  }
  return keys$3.indexOf(width) < keys$3.indexOf(breakpoint);
};

var withWidth = function withWidth() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    var _options$resizeInterv = options.resizeInterval,
        resizeInterval = _options$resizeInterv === undefined ? 166 : _options$resizeInterv,
        _options$withTheme = options.withTheme,
        withThemeOption = _options$withTheme === undefined ? false : _options$withTheme;

    var WithWidth = function (_React$Component) {
      _inherits(WithWidth, _React$Component);

      function WithWidth() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, WithWidth);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WithWidth.__proto__ || _Object$getPrototypeOf(WithWidth)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          width: undefined
        }, _this.handleResize = debounce_1(function () {
          _this.updateWidth(window.innerWidth);
        }, resizeInterval), _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(WithWidth, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.updateWidth(window.innerWidth);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.handleResize.cancel();
        }
      }, {
        key: 'updateWidth',
        value: function updateWidth(innerWidth) {
          var breakpoints = this.props.theme.breakpoints;
          var width = null;

          /**
           * Start with the slowest value as low end devices often have a small screen.
           *
           * innerWidth |xs      sm      md      lg      xl
           *            |-------|-------|-------|-------|------>
           * width      |  xs   |  sm   |  md   |  lg   |  xl
           */
          var index = 1;
          while (width === null && index < keys$3.length) {
            var currentWidth = keys$3[index];

            // @media are inclusive, so reproduce the behavior here.
            if (innerWidth < breakpoints.values[currentWidth]) {
              width = keys$3[index - 1];
              break;
            }

            index += 1;
          }

          width = width || 'xl';

          if (width !== this.state.width) {
            this.setState({
              width: width
            });
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _props = this.props,
              initialWidth = _props.initialWidth,
              theme = _props.theme,
              width = _props.width,
              other = _objectWithoutProperties(_props, ['initialWidth', 'theme', 'width']);

          var props = _extends$1({
            width: width || this.state.width || initialWidth
          }, other);
          var more = {};

          if (withThemeOption) {
            more.theme = theme;
          }

          // When rendering the component on the server,
          // we have no idea about the client browser screen width.
          // In order to prevent blinks and help the reconciliation of the React tree
          // we are not rendering the child component.
          //
          // An alternative is to use the `initialWidth` property.
          if (props.width === undefined) {
            return null;
          }

          return React.createElement(
            EventListener,
            { target: 'window', onResize: this.handleResize },
            React.createElement(Component, _extends$1({}, more, props))
          );
        }
      }]);

      return WithWidth;
    }(React.Component);

    WithWidth.propTypes = process.env.NODE_ENV !== "production" ? {
      /**
       * As `window.innerWidth` is unavailable on the server,
       * we default to rendering an empty componenent during the first mount.
       * In some situation you might want to use an heristic to approximate
       * the screen width of the client browser screen width.
       *
       * For instance, you could be using the user-agent or the client-hints.
       * http://caniuse.com/#search=client%20hint
       */
      initialWidth: propTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
      /**
       * @ignore
       */
      theme: propTypes.object.isRequired,
      /**
       * Bypass the width calculation logic.
       */
      width: propTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
    } : {};

    if (process.env.NODE_ENV !== 'production') {
      WithWidth.displayName = wrapDisplayName(Component, 'WithWidth');
    }

    hoistNonReactStatics(WithWidth, Component);

    return withTheme()(WithWidth);
  };
};

/**
 * Dialog will responsively be full screen *at or below* the given breakpoint
 * (defaults to 'sm' for mobile devices).
 * Notice that this Higher-order Component is incompatible with server side rendering.
 */
var withMobileDialog = function withMobileDialog() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    var _options$breakpoint = options.breakpoint,
        breakpoint = _options$breakpoint === undefined ? 'sm' : _options$breakpoint;


    function WithMobileDialog(props) {
      return React.createElement(Component, _extends$1({ fullScreen: isWidthDown(breakpoint, props.width) }, props));
    }

    WithMobileDialog.propTypes = process.env.NODE_ENV !== "production" ? {
      width: propTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired
    } : {};

    return withWidth()(WithMobileDialog);
  };
};

var styles$27 = function styles(theme) {
  return {
    root: {
      height: 1,
      margin: 0, // Reset browser default style.
      border: 'none',
      flexShrink: 0
    },
    inset: {
      marginLeft: 72
    },
    default: {
      backgroundColor: theme.palette.divider
    },
    light: {
      backgroundColor: fade(theme.palette.divider, 0.08)
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%'
    }
  };
};

function Divider(props) {
  var _classNames;

  var absolute = props.absolute,
      classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      inset = props.inset,
      light = props.light,
      other = _objectWithoutProperties(props, ['absolute', 'classes', 'className', 'component', 'inset', 'light']);

  var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.absolute, absolute), _defineProperty$1(_classNames, classes.inset, inset), _classNames), light ? classes.light : classes.default, classNameProp);

  return React.createElement(Component, _extends$1({ className: className }, other));
}

Divider.propTypes = process.env.NODE_ENV !== "production" ? {
  absolute: propTypes.bool,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, the divider will be indented.
   */
  inset: propTypes.bool,
  /**
   * If `true`, the divider will have a lighter color.
   */
  light: propTypes.bool
} : {};

Divider.defaultProps = {
  absolute: false,
  component: 'hr',
  inset: false,
  light: false
};

var Divider$1 = withStyles(styles$27, { name: 'MuiDivider' })(Divider);

// @inheritedComponent Transition

var GUTTER = 24;

// Translate the node so he can't be seen on the screen.
// Later, we gonna translate back the node to his original location
// with `translate3d(0, 0, 0)`.`
function getTranslateValue(props, node) {
  var direction = props.direction;

  var rect = node.getBoundingClientRect();

  var transform = void 0;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    var computedStyle = window.getComputedStyle(node);
    transform = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
  }

  var offsetX = 0;
  var offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    var transformValues = transform.split('(')[1].split(')')[0].split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    return 'translateX(100vw) translateX(-' + (rect.left - offsetX) + 'px)';
  } else if (direction === 'right') {
    return 'translateX(-' + (rect.left + rect.width + GUTTER - offsetX) + 'px)';
  } else if (direction === 'up') {
    return 'translateY(100vh) translateY(-' + (rect.top - offsetY) + 'px)';
  }

  // direction === 'down
  return 'translate3d(0, ' + (0 - (rect.top + rect.height)) + 'px, 0)';
}

function setTranslateValue(props, node) {
  var transform = getTranslateValue(props, node);

  if (transform) {
    node.style.transform = transform;
    node.style.webkitTransform = transform;
  }
}

var Slide = function (_React$Component) {
  _inherits(Slide, _React$Component);

  function Slide() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Slide);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Slide.__proto__ || _Object$getPrototypeOf(Slide)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      mounted: false
    }, _this.transition = null, _this.handleResize = debounce_1(function () {
      // Skip configuration where the position is screen size invariant.
      if (_this.props.in || _this.props.direction === 'down' || _this.props.direction === 'right') {
        return;
      }

      var node = findDOMNode(_this.transition);
      if (node instanceof HTMLElement) {
        setTranslateValue(_this.props, node);
      }
    }, 166), _this.handleEnter = function (node) {
      setTranslateValue(_this.props, node);
      reflow(node);

      if (_this.props.onEnter) {
        _this.props.onEnter(node);
      }
    }, _this.handleEntering = function (node) {
      var theme = _this.props.theme;

      var _getTransitionProps = getTransitionProps(_this.props, {
        mode: 'enter'
      }),
          transitionDuration = _getTransitionProps.duration,
          delay = _getTransitionProps.delay;

      node.style.transition = theme.transitions.create('transform', {
        duration: transitionDuration,
        easing: theme.transitions.easing.easeOut,
        delay: delay
      });
      node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
        duration: transitionDuration,
        easing: theme.transitions.easing.easeOut,
        delay: delay
      });
      node.style.transform = 'translate3d(0, 0, 0)';
      node.style.webkitTransform = 'translate3d(0, 0, 0)';
      if (_this.props.onEntering) {
        _this.props.onEntering(node);
      }
    }, _this.handleExit = function (node) {
      var theme = _this.props.theme;

      var _getTransitionProps2 = getTransitionProps(_this.props, {
        mode: 'exit'
      }),
          transitionDuration = _getTransitionProps2.duration,
          delay = _getTransitionProps2.delay;

      node.style.transition = theme.transitions.create('transform', {
        duration: transitionDuration,
        easing: theme.transitions.easing.sharp,
        delay: delay
      });
      node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
        duration: transitionDuration,
        easing: theme.transitions.easing.sharp,
        delay: delay
      });
      setTranslateValue(_this.props, node);

      if (_this.props.onExit) {
        _this.props.onExit(node);
      }
    }, _this.handleExited = function (node) {
      // No need for transitions when the component is hidden
      node.style.transition = '';
      node.style.webkitTransition = '';

      if (_this.props.onExited) {
        _this.props.onExited(node);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Slide, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // state.mounted handle SSR, once the component is mounted, we need
      // to properly hide it.
      if (!this.props.in) {
        // We need to set initial translate values of transition element
        // otherwise component will be shown when in=false.
        this.updatePosition();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setState({
        mounted: true
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.direction !== this.props.direction && !this.props.in) {
        // We need to update the position of the drawer when the direction change and
        // when it's hidden.
        this.updatePosition();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.handleResize.cancel();
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      var element = findDOMNode(this.transition);
      if (element instanceof HTMLElement) {
        element.style.visibility = 'inherit';
        setTranslateValue(this.props, element);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          onEnter = _props.onEnter,
          onEntering = _props.onEntering,
          onExit = _props.onExit,
          onExited = _props.onExited,
          styleProp = _props.style,
          theme = _props.theme,
          other = _objectWithoutProperties(_props, ['children', 'onEnter', 'onEntering', 'onExit', 'onExited', 'style', 'theme']);

      var style = {};

      // We use this state to handle the server-side rendering.
      // We don't know the width of the children ahead of time.
      // We need to render it.
      if (!this.props.in && !this.state.mounted) {
        style.visibility = 'hidden';
      }

      style = _extends$1({}, style, styleProp, React.isValidElement(children) ? children.props.style : {});

      return React.createElement(
        EventListener,
        { target: 'window', onResize: this.handleResize },
        React.createElement(
          Transition,
          _extends$1({
            onEnter: this.handleEnter,
            onEntering: this.handleEntering,
            onExit: this.handleExit,
            onExited: this.handleExited,
            appear: true,
            style: style,
            ref: function ref(node) {
              _this2.transition = node;
            }
          }, other),
          children
        )
      );
    }
  }]);

  return Slide;
}(React.Component);

Slide.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A single child content element.
   */
  children: propTypes.oneOfType([propTypes.element, propTypes.func]),
  /**
   * Direction the child node will enter from.
   */
  direction: propTypes.oneOf(['left', 'right', 'up', 'down']),
  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in: propTypes.bool,
  /**
   * @ignore
   */
  onEnter: propTypes.func,
  /**
   * @ignore
   */
  onEntered: propTypes.func,
  /**
   * @ignore
   */
  onEntering: propTypes.func,
  /**
   * @ignore
   */
  onExit: propTypes.func,
  /**
   * @ignore
   */
  onExited: propTypes.func,
  /**
   * @ignore
   */
  onExiting: propTypes.func,
  /**
   * @ignore
   */
  style: propTypes.object,
  /**
   * @ignore
   */
  theme: propTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number })])
} : {};

Slide.defaultProps = {
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};

var Slide$1 = withTheme()(Slide);

// @inheritedComponent Modal

function getSlideDirection(anchor) {
  if (anchor === 'left') {
    return 'right';
  } else if (anchor === 'right') {
    return 'left';
  } else if (anchor === 'top') {
    return 'down';
  }

  // (anchor === 'bottom')
  return 'up';
}

var styles$28 = function styles(theme) {
  return {
    docked: {
      flex: '0 0 auto'
    },
    paper: {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      flex: '1 0 auto',
      zIndex: theme.zIndex.drawer,
      WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
      // temporary style
      position: 'fixed',
      top: 0,
      // We disable the focus ring for mouse, touch and keyboard users.
      // At some point, it would be better to keep it for keyboard users.
      // :focus-ring CSS pseudo-class will help.
      '&:focus': {
        outline: 'none'
      }
    },
    paperAnchorLeft: {
      left: 0,
      right: 'auto'
    },
    paperAnchorRight: {
      left: 'auto',
      right: 0
    },
    paperAnchorTop: {
      top: 0,
      left: 0,
      bottom: 'auto',
      right: 0,
      height: 'auto',
      maxHeight: '100vh'
    },
    paperAnchorBottom: {
      top: 'auto',
      left: 0,
      bottom: 0,
      right: 0,
      height: 'auto',
      maxHeight: '100vh'
    },
    paperAnchorDockedLeft: {
      borderRight: '1px solid ' + theme.palette.divider
    },
    paperAnchorDockedTop: {
      borderBottom: '1px solid ' + theme.palette.divider
    },
    paperAnchorDockedRight: {
      borderLeft: '1px solid ' + theme.palette.divider
    },
    paperAnchorDockedBottom: {
      borderTop: '1px solid ' + theme.palette.divider
    },
    modal: {} // Just here so people can override the style.
  };
};

var Drawer = function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Drawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Drawer.__proto__ || _Object$getPrototypeOf(Drawer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      // Let's assume that the Drawer will always be rendered on user space.
      // We use that state is order to skip the appear transition during the
      // initial mount of the component.
      firstMount: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Drawer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setState({
        firstMount: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          anchorProp = _props.anchor,
          children = _props.children,
          classes = _props.classes,
          className = _props.className,
          elevation = _props.elevation,
          ModalProps = _props.ModalProps,
          onClose = _props.onClose,
          open = _props.open,
          PaperProps = _props.PaperProps,
          SlideProps = _props.SlideProps,
          theme = _props.theme,
          transitionDuration = _props.transitionDuration,
          variant = _props.variant,
          other = _objectWithoutProperties(_props, ['anchor', 'children', 'classes', 'className', 'elevation', 'ModalProps', 'onClose', 'open', 'PaperProps', 'SlideProps', 'theme', 'transitionDuration', 'variant']);

      var anchor = anchorProp;
      if (theme.direction === 'rtl' && ['left', 'right'].includes(anchor)) {
        anchor = anchor === 'left' ? 'right' : 'left';
      }

      var drawer = React.createElement(
        Paper$1,
        _extends$1({
          elevation: variant === 'temporary' ? elevation : 0,
          square: true,
          className: classnames(classes.paper, classes['paperAnchor' + capitalize(anchor)], _defineProperty$1({}, classes['paperAnchorDocked' + capitalize(anchor)], variant !== 'temporary'))
        }, PaperProps),
        children
      );

      if (variant === 'permanent') {
        return React.createElement(
          'div',
          _extends$1({ className: classnames(classes.docked, className) }, other),
          drawer
        );
      }

      var slidingDrawer = React.createElement(
        Slide$1,
        _extends$1({
          'in': open,
          direction: getSlideDirection(anchor),
          timeout: transitionDuration,
          appear: !this.state.firstMount
        }, SlideProps),
        drawer
      );

      if (variant === 'persistent') {
        return React.createElement(
          'div',
          _extends$1({ className: classnames(classes.docked, className) }, other),
          slidingDrawer
        );
      }

      // variant === temporary
      return React.createElement(
        Modal$1,
        _extends$1({
          BackdropProps: {
            transitionDuration: transitionDuration
          },
          className: classnames(classes.modal, className),
          open: open,
          onClose: onClose
        }, other, ModalProps),
        slidingDrawer
      );
    }
  }]);

  return Drawer;
}(React.Component);

Drawer.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Side from which the drawer will appear.
   */
  anchor: propTypes.oneOf(['left', 'top', 'right', 'bottom']),
  /**
   * The contents of the drawer.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The elevation of the drawer.
   */
  elevation: propTypes.number,
  /**
   * Properties applied to the `Modal` element.
   */
  ModalProps: propTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: propTypes.func,
  /**
   * If `true`, the drawer is open.
   */
  open: propTypes.bool,
  /**
   * Properties applied to the `Paper` element.
   */
  PaperProps: propTypes.object,
  /**
   * Properties applied to the `Slide` element.
   */
  SlideProps: propTypes.object,
  /**
   * @ignore
   */
  theme: propTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number })]),
  /**
   * The type of drawer.
   */
  variant: propTypes.oneOf(['permanent', 'persistent', 'temporary'])
} : {};

Drawer.defaultProps = {
  anchor: 'left',
  elevation: 16,
  open: false,
  transitionDuration: { enter: duration.enteringScreen, exit: duration.leavingScreen },
  variant: 'temporary' // Mobile first.
};

var Drawer$1 = withStyles(styles$28, { name: 'MuiDrawer', flip: false, withTheme: true })(Drawer);

// @inheritedComponent Transition

var styles$29 = function styles(theme) {
  return {
    container: {
      height: 0,
      overflow: 'hidden',
      transition: theme.transitions.create('height')
    },
    entered: {
      height: 'auto'
    },
    wrapper: {
      // Hack to get children with a negative margin to not falsify the height computation.
      display: 'flex'
    },
    wrapperInner: {
      width: '100%'
    }
  };
};

var Collapse = function (_React$Component) {
  _inherits(Collapse, _React$Component);

  function Collapse() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Collapse);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Collapse.__proto__ || _Object$getPrototypeOf(Collapse)).call.apply(_ref, [this].concat(args))), _this), _this.wrapper = null, _this.autoTransitionDuration = undefined, _this.handleEnter = function (node) {
      node.style.height = _this.props.collapsedHeight;

      if (_this.props.onEnter) {
        _this.props.onEnter(node);
      }
    }, _this.handleEntering = function (node) {
      var _this$props = _this.props,
          timeout = _this$props.timeout,
          theme = _this$props.theme;

      var wrapperHeight = _this.wrapper ? _this.wrapper.clientHeight : 0;

      var _getTransitionProps = getTransitionProps(_this.props, {
        mode: 'enter'
      }),
          transitionDuration = _getTransitionProps.duration;

      if (timeout === 'auto') {
        var duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
        node.style.transitionDuration = duration2 + 'ms';
        _this.autoTransitionDuration = duration2;
      } else {
        node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : transitionDuration + 'ms';
      }

      node.style.height = wrapperHeight + 'px';

      if (_this.props.onEntering) {
        _this.props.onEntering(node);
      }
    }, _this.handleEntered = function (node) {
      node.style.height = 'auto';

      if (_this.props.onEntered) {
        _this.props.onEntered(node);
      }
    }, _this.handleExit = function (node) {
      var wrapperHeight = _this.wrapper ? _this.wrapper.clientHeight : 0;
      node.style.height = wrapperHeight + 'px';

      if (_this.props.onExit) {
        _this.props.onExit(node);
      }
    }, _this.handleExiting = function (node) {
      var _this$props2 = _this.props,
          timeout = _this$props2.timeout,
          theme = _this$props2.theme;

      var wrapperHeight = _this.wrapper ? _this.wrapper.clientHeight : 0;

      var _getTransitionProps2 = getTransitionProps(_this.props, {
        mode: 'exit'
      }),
          transitionDuration = _getTransitionProps2.duration;

      if (timeout === 'auto') {
        var duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
        node.style.transitionDuration = duration2 + 'ms';
        _this.autoTransitionDuration = duration2;
      } else {
        node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : transitionDuration + 'ms';
      }

      node.style.height = _this.props.collapsedHeight;

      if (_this.props.onExiting) {
        _this.props.onExiting(node);
      }
    }, _this.addEndListener = function (node, next) {
      if (_this.props.timeout === 'auto') {
        setTimeout(next, _this.autoTransitionDuration || 0);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Collapse, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          classes = _props.classes,
          className = _props.className,
          collapsedHeight = _props.collapsedHeight,
          Component = _props.component,
          onEnter = _props.onEnter,
          onEntered = _props.onEntered,
          onEntering = _props.onEntering,
          onExit = _props.onExit,
          onExiting = _props.onExiting,
          style = _props.style,
          theme = _props.theme,
          timeout = _props.timeout,
          other = _objectWithoutProperties(_props, ['children', 'classes', 'className', 'collapsedHeight', 'component', 'onEnter', 'onEntered', 'onEntering', 'onExit', 'onExiting', 'style', 'theme', 'timeout']);

      return React.createElement(
        Transition,
        _extends$1({
          onEntering: this.handleEntering,
          onEnter: this.handleEnter,
          onEntered: this.handleEntered,
          onExiting: this.handleExiting,
          onExit: this.handleExit,
          addEndListener: this.addEndListener,
          timeout: timeout === 'auto' ? null : timeout
        }, other),
        function (state, childProps) {
          return React.createElement(
            Component,
            _extends$1({
              className: classnames(classes.container, _defineProperty$1({}, classes.entered, state === 'entered'), className),
              style: _extends$1({}, style, {
                minHeight: collapsedHeight
              })
            }, childProps),
            React.createElement(
              'div',
              {
                className: classes.wrapper,
                ref: function ref(node) {
                  _this2.wrapper = node;
                }
              },
              React.createElement(
                'div',
                { className: classes.wrapperInner },
                children
              )
            )
          );
        }
      );
    }
  }]);

  return Collapse;
}(React.Component);

Collapse.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content node to be collapsed.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The height of the container when collapsed.
   */
  collapsedHeight: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, the component will transition in.
   */
  in: propTypes.bool,
  /**
   * @ignore
   */
  onEnter: propTypes.func,
  /**
   * @ignore
   */
  onEntered: propTypes.func,
  /**
   * @ignore
   */
  onEntering: propTypes.func,
  /**
   * @ignore
   */
  onExit: propTypes.func,
  /**
   * @ignore
   */
  onExiting: propTypes.func,
  /**
   * @ignore
   */
  style: propTypes.object,
  /**
   * @ignore
   */
  theme: propTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number }), propTypes.oneOf(['auto'])])
} : {};

Collapse.defaultProps = {
  collapsedHeight: '0px',
  component: 'div',
  timeout: duration.standard
};

var Collapse$1 = withStyles(styles$29, {
  withTheme: true,
  name: 'MuiCollapse'
})(Collapse);

// @inheritedComponent Paper

var styles$30 = function styles(theme) {
  var transition = {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.ease
  };

  return {
    root: {
      position: 'relative',
      margin: 0,
      transition: theme.transitions.create(['margin'], transition),
      '&:before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: theme.palette.divider,
        transition: theme.transitions.create(['opacity', 'background-color'], transition)
      },
      '&:first-child': {
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        '&:before': {
          display: 'none'
        }
      },
      '&:last-child': {
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2
      },
      '&$expanded + &': {
        '&:before': {
          display: 'none'
        }
      }
    },
    expanded: {
      margin: theme.spacing.unit * 2 + 'px 0',
      '&:first-child': {
        marginTop: 0
      },
      '&:last-child': {
        marginBottom: 0
      },
      '&:before': {
        opacity: 0
      }
    },
    disabled: {
      backgroundColor: theme.palette.action.disabledBackground
    }
  };
};

var ExpansionPanel = function (_React$Component) {
  _inherits(ExpansionPanel, _React$Component);

  function ExpansionPanel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ExpansionPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExpansionPanel.__proto__ || _Object$getPrototypeOf(ExpansionPanel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false
    }, _this.isControlled = null, _this.handleChange = function (event) {
      var onChange = _this.props.onChange;

      var expanded = !_this.state.expanded;

      if (onChange) {
        onChange(event, expanded);
      }

      if (!_this.isControlled) {
        _this.setState({ expanded: expanded });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ExpansionPanel, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          expanded = _props.expanded,
          defaultExpanded = _props.defaultExpanded;

      this.isControlled = expanded != null;
      this.setState({
        expanded: this.isControlled ? expanded : defaultExpanded
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.isControlled) {
        this.setState({
          expanded: nextProps.expanded
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames,
          _this2 = this;

      var _props2 = this.props,
          childrenProp = _props2.children,
          classes = _props2.classes,
          classNameProp = _props2.className,
          CollapsePropsProp = _props2.CollapseProps,
          defaultExpanded = _props2.defaultExpanded,
          disabled = _props2.disabled,
          expandedProp = _props2.expanded,
          onChange = _props2.onChange,
          other = _objectWithoutProperties(_props2, ['children', 'classes', 'className', 'CollapseProps', 'defaultExpanded', 'disabled', 'expanded', 'onChange']);

      var expanded = this.state.expanded;


      var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.expanded, expanded), _defineProperty$1(_classNames, classes.disabled, disabled), _classNames), classNameProp);

      var summary = null;

      var children = React.Children.map(childrenProp, function (child) {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (isMuiElement(child, ['ExpansionPanelSummary'])) {
          summary = React.cloneElement(child, {
            disabled: disabled,
            expanded: expanded,
            onChange: _this2.handleChange
          });
          return null;
        }

        return child;
      });

      var CollapseProps = !expanded ? {
        'aria-hidden': 'true'
      } : null;

      return React.createElement(
        Paper$1,
        _extends$1({ className: className, elevation: 1, square: true }, other),
        summary,
        React.createElement(
          Collapse$1,
          _extends$1({ 'in': expanded, timeout: 'auto' }, CollapseProps, CollapsePropsProp),
          children
        )
      );
    }
  }]);

  return ExpansionPanel;
}(React.Component);

ExpansionPanel.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the expansion panel.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Properties applied to the `Collapse` element.
   */
  CollapseProps: propTypes.object,
  /**
   * If `true`, expands the panel by default.
   */
  defaultExpanded: propTypes.bool,
  /**
   * If `true`, the panel will be displayed in a disabled state.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, expands the panel, otherwise collapse it.
   * Setting this prop enables control over the panel.
   */
  expanded: propTypes.bool,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} expanded The `expanded` state of the panel
   */
  onChange: propTypes.func
} : {};

ExpansionPanel.defaultProps = {
  defaultExpanded: false,
  disabled: false
};

var ExpansionPanel$1 = withStyles(styles$30, { name: 'MuiExpansionPanel' })(ExpansionPanel);

var styles$31 = function styles(theme) {
  return {
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: theme.spacing.unit * 2 + 'px ' + theme.spacing.unit + 'px'
    },
    action: {
      marginLeft: theme.spacing.unit
    }
  };
};

function ExpansionPanelActions(props) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className']);

  return React.createElement(
    'div',
    _extends$1({ className: classnames(classes.root, className) }, other),
    cloneChildrenWithClassName(children, classes.action)
  );
}

ExpansionPanelActions.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string
} : {};

var ExpansionPanelActions$1 = withStyles(styles$31, { name: 'MuiExpansionPanelActions' })(ExpansionPanelActions);

var styles$32 = function styles(theme) {
  return {
    root: {
      display: 'flex',
      flexGrow: 1,
      padding: theme.spacing.unit + 'px ' + theme.spacing.unit * 3 + 'px ' + theme.spacing.unit * 3 + 'px'
    }
  };
};

function ExpansionPanelDetails(props) {
  var classes = props.classes,
      children = props.children,
      className = props.className,
      other = _objectWithoutProperties(props, ['classes', 'children', 'className']);

  return React.createElement(
    'div',
    _extends$1({ className: classnames(classes.root, className) }, other),
    children
  );
}

ExpansionPanelDetails.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the expansion panel details.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string
} : {};

var ExpansionPanelDetails$1 = withStyles(styles$32, { name: 'MuiExpansionPanelDetails' })(ExpansionPanelDetails);

// @inheritedComponent ButtonBase

var styles$33 = function styles(theme) {
  var transition = {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.ease
  };
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: theme.spacing.unit * 6,
      transition: theme.transitions.create(['min-height', 'background-color'], transition),
      padding: '0 ' + theme.spacing.unit * 3 + 'px 0 ' + theme.spacing.unit * 3 + 'px',
      position: 'relative',
      '&:hover:not($disabled)': {
        cursor: 'pointer'
      }
    },
    expanded: {
      minHeight: 64
    },
    focused: {
      backgroundColor: theme.palette.grey[300]
    },
    disabled: {
      opacity: 0.38
    },
    content: {
      display: 'flex',
      flexGrow: 1,
      transition: theme.transitions.create(['margin'], transition),
      margin: '12px 0',
      '& > :last-child': {
        paddingRight: theme.spacing.unit * 4
      }
    },
    contentExpanded: {
      margin: '20px 0'
    },
    expandIcon: {
      position: 'absolute',
      top: '50%',
      right: theme.spacing.unit,
      transform: 'translateY(-50%) rotate(0deg)',
      transition: theme.transitions.create('transform', transition)
    },
    expandIconExpanded: {
      transform: 'translateY(-50%) rotate(180deg)'
    }
  };
};

var ExpansionPanelSummary = function (_React$Component) {
  _inherits(ExpansionPanelSummary, _React$Component);

  function ExpansionPanelSummary() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ExpansionPanelSummary);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExpansionPanelSummary.__proto__ || _Object$getPrototypeOf(ExpansionPanelSummary)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focused: false
    }, _this.handleFocus = function () {
      _this.setState({
        focused: true
      });
    }, _this.handleBlur = function () {
      _this.setState({
        focused: false
      });
    }, _this.handleChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onClick = _this$props.onClick;

      if (onChange) {
        onChange(event);
      }
      if (onClick) {
        onClick(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ExpansionPanelSummary, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          children = _props.children,
          classes = _props.classes,
          className = _props.className,
          disabled = _props.disabled,
          expanded = _props.expanded,
          expandIcon = _props.expandIcon,
          onChange = _props.onChange,
          other = _objectWithoutProperties(_props, ['children', 'classes', 'className', 'disabled', 'expanded', 'expandIcon', 'onChange']);

      var focused = this.state.focused;


      return React.createElement(
        ButtonBase$1,
        _extends$1({
          focusRipple: false,
          disableRipple: true,
          disabled: disabled,
          component: 'div',
          'aria-expanded': expanded,
          className: classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.disabled, disabled), _defineProperty$1(_classNames, classes.expanded, expanded), _defineProperty$1(_classNames, classes.focused, focused), _classNames), className)
        }, other, {
          onKeyboardFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onClick: this.handleChange
        }),
        React.createElement(
          'div',
          { className: classnames(classes.content, _defineProperty$1({}, classes.contentExpanded, expanded)) },
          children
        ),
        expandIcon && React.createElement(
          IconButton$1,
          {
            disabled: disabled,
            className: classnames(classes.expandIcon, _defineProperty$1({}, classes.expandIconExpanded, expanded)),
            component: 'div',
            tabIndex: '-1',
            'aria-hidden': 'true'
          },
          expandIcon
        )
      );
    }
  }]);

  return ExpansionPanelSummary;
}(React.Component);

ExpansionPanelSummary.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the expansion panel summary.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   * If `true`, the summary will be displayed in a disabled state.
   */
  disabled: propTypes.bool,
  /**
   * @ignore
   * If `true`, expands the summary, otherwise collapse it.
   */
  expanded: propTypes.bool,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: propTypes.node,
  /**
   * @ignore
   */
  onChange: propTypes.func,
  /**
   * @ignore
   */
  onClick: propTypes.func
} : {};

ExpansionPanelSummary.defaultProps = {
  disabled: false
};

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

var ExpansionPanelSummary$1 = withStyles(styles$33, { name: 'MuiExpansionPanelSummary' })(ExpansionPanelSummary);

var styles$34 = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  row: {
    flexDirection: 'row'
  }
};

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */
function FormGroup(props) {
  var classes = props.classes,
      className = props.className,
      children = props.children,
      row = props.row,
      other = _objectWithoutProperties(props, ['classes', 'className', 'children', 'row']);

  var rootClassName = classnames(classes.root, _defineProperty$1({}, classes.row, row), className);

  return React.createElement(
    'div',
    _extends$1({ className: rootClassName }, other),
    children
  );
}

FormGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Display group of elements in a compact row.
   */
  row: propTypes.bool
} : {};

FormGroup.defaultProps = {
  row: false
};

var FormGroup$1 = withStyles(styles$34, { name: 'MuiFormGroup' })(FormGroup);

var styles$35 = function styles(theme) {
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: 1,
      padding: 0
    },
    focused: {
      color: theme.palette.primary[theme.palette.type === 'light' ? 'dark' : 'light']
    },
    error: {
      color: theme.palette.error.main
    },
    disabled: {
      color: theme.palette.text.disabled
    }
  };
};

function FormLabel(props, context) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      disabledProp = props.disabled,
      errorProp = props.error,
      focusedProp = props.focused,
      requiredProp = props.required,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'component', 'disabled', 'error', 'focused', 'required']);

  var muiFormControl = context.muiFormControl;


  var required = requiredProp;
  var focused = focusedProp;
  var disabled = disabledProp;
  var error = errorProp;

  if (muiFormControl) {
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }
    if (typeof focused === 'undefined') {
      focused = muiFormControl.focused;
    }
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }
  }

  var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.focused, focused), _defineProperty$1(_classNames, classes.disabled, disabled), _defineProperty$1(_classNames, classes.error, error), _classNames), classNameProp);

  var asteriskClassName = classnames(_defineProperty$1({}, classes.error, error));

  return React.createElement(
    Component,
    _extends$1({ className: className }, other),
    children,
    required && React.createElement(
      'span',
      { className: asteriskClassName },
      '\u2009*'
    )
  );
}

FormLabel.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: propTypes.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: propTypes.bool,
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: propTypes.bool
} : {};

FormLabel.defaultProps = {
  component: 'label'
};

FormLabel.contextTypes = {
  muiFormControl: propTypes.object
};

var FormLabel$1 = withStyles(styles$35, { name: 'MuiFormLabel' })(FormLabel);

var ROWS_HEIGHT = 24;

var styles$36 = {
  root: {
    position: 'relative', // because the shadow has position: 'absolute',
    width: '100%'
  },
  textarea: {
    width: '100%',
    height: '100%',
    resize: 'none',
    font: 'inherit',
    padding: 0,
    cursor: 'inherit',
    boxSizing: 'border-box',
    lineHeight: 'inherit',
    border: 'none',
    outline: 'none',
    background: 'transparent'
  },
  shadow: {
    resize: 'none',
    // Overflow also needed to here to remove the extra row
    // added to textareas in Firefox.
    overflow: 'hidden',
    // Visibility needed to hide the extra text area on ipads
    visibility: 'hidden',
    position: 'absolute',
    height: 'auto',
    whiteSpace: 'pre-wrap'
  }
};

/**
 * @ignore - internal component.
 */

var Textarea = function (_React$Component) {
  _inherits(Textarea, _React$Component);

  function Textarea() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Textarea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Textarea.__proto__ || _Object$getPrototypeOf(Textarea)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      height: null
    }, _this.shadow = null, _this.singlelineShadow = null, _this.input = null, _this.value = null, _this.handleResize = debounce_1(function (event) {
      _this.syncHeightWithShadow(event);
    }, 166), _this.handleRefInput = function (node) {
      _this.input = node;
      if (_this.props.textareaRef) {
        _this.props.textareaRef(node);
      }
    }, _this.handleRefSinglelineShadow = function (node) {
      _this.singlelineShadow = node;
    }, _this.handleRefShadow = function (node) {
      _this.shadow = node;
    }, _this.handleChange = function (event) {
      _this.value = event.target.value;

      if (typeof _this.props.value === 'undefined' && _this.shadow) {
        // The component is not controlled, we need to update the shallow value.
        _this.shadow.value = _this.value;
        _this.syncHeightWithShadow(event);
      }

      if (_this.props.onChange) {
        _this.props.onChange(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Textarea, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // <Input> expects the components it renders to respond to 'value'
      // so that it can check whether they are dirty
      this.value = this.props.value || this.props.defaultValue || '';
      this.setState({
        height: Number(this.props.rows) * ROWS_HEIGHT
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.syncHeightWithShadow(null);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value || Number(nextProps.rowsMax) !== Number(this.props.rowsMax)) {
        this.syncHeightWithShadow(null, nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.handleResize.cancel();
    }
  }, {
    key: 'syncHeightWithShadow',
    value: function syncHeightWithShadow(event) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;

      if (this.shadow && this.singlelineShadow) {
        // The component is controlled, we need to update the shallow value.
        if (typeof this.props.value !== 'undefined') {
          this.shadow.value = props.value == null ? '' : String(props.value);
        }

        var lineHeight = this.singlelineShadow.scrollHeight;
        var newHeight = this.shadow.scrollHeight;

        // Guarding for jsdom, where scrollHeight isn't present.
        // See https://github.com/tmpvar/jsdom/issues/1013
        if (newHeight === undefined) {
          return;
        }

        if (Number(props.rowsMax) >= Number(props.rows)) {
          newHeight = Math.min(Number(props.rowsMax) * lineHeight, newHeight);
        }

        newHeight = Math.max(newHeight, lineHeight);

        if (this.state.height !== newHeight) {
          this.setState({
            height: newHeight
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          className = _props.className,
          defaultValue = _props.defaultValue,
          onChange = _props.onChange,
          rows = _props.rows,
          rowsMax = _props.rowsMax,
          textareaRef = _props.textareaRef,
          value = _props.value,
          other = _objectWithoutProperties(_props, ['classes', 'className', 'defaultValue', 'onChange', 'rows', 'rowsMax', 'textareaRef', 'value']);

      return React.createElement(
        'div',
        { className: classes.root, style: { height: this.state.height } },
        React.createElement(EventListener, { target: 'window', onResize: this.handleResize }),
        React.createElement('textarea', {
          ref: this.handleRefSinglelineShadow,
          className: classnames(classes.shadow, classes.textarea),
          tabIndex: -1,
          rows: '1',
          readOnly: true,
          'aria-hidden': 'true',
          value: ''
        }),
        React.createElement('textarea', {
          ref: this.handleRefShadow,
          className: classnames(classes.shadow, classes.textarea),
          tabIndex: -1,
          rows: rows,
          'aria-hidden': 'true',
          readOnly: true,
          defaultValue: defaultValue,
          value: value
        }),
        React.createElement('textarea', _extends$1({
          rows: rows,
          className: classnames(classes.textarea, className),
          defaultValue: defaultValue,
          value: value,
          onChange: this.handleChange,
          ref: this.handleRefInput
        }, other))
      );
    }
  }]);

  return Textarea;
}(React.Component);

Textarea.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   */
  defaultValue: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /**
   * @ignore
   */
  disabled: propTypes.bool,
  /**
   * @ignore
   */
  onChange: propTypes.func,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /**
   * Use that property to pass a ref callback to the native textarea element.
   */
  textareaRef: propTypes.func,
  /**
   * @ignore
   */
  value: propTypes.oneOfType([propTypes.string, propTypes.number])
} : {};

Textarea.defaultProps = {
  rows: 1
};

var Textarea$1 = withStyles(styles$36, { name: 'MuiTextarea' })(Textarea);

// Supports determination of isControlled().
// Controlled input accepts its current value as a prop.
//
// @see https://facebook.github.io/react/docs/forms.html#controlled-components
// @param value
// @returns {boolean} true if string (including '') or number (including zero)
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

// Determine if field is dirty (a.k.a. filled).
//
// Response determines if label is presented above field or as placeholder.
//
// @param obj
// @param SSR
// @returns {boolean} False when not present or empty string.
//                    True when any number or string with length.
function isDirty(obj) {
  var SSR = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return obj && (hasValue(obj.value) && obj.value !== '' || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== '');
}

// Determine if an Input is adorned on start.
// It's corresponding to the left with LTR.
//
// @param obj
// @returns {boolean} False when no adornments.
//                    True when adorned at the start.
function isAdornedStart(obj) {
  return obj.startAdornment;
}

var styles$37 = function styles(theme) {
  var light = theme.palette.type === 'light';
  var placeholder = {
    color: 'currentColor',
    opacity: light ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.ease
    })
  };
  var placeholderHidden = {
    opacity: 0
  };
  var placeholderVisible = {
    opacity: light ? 0.42 : 0.5
  };
  var bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';

  return {
    root: {
      // Mimics the default input display property used by browsers for an input.
      display: 'inline-flex',
      position: 'relative',
      fontFamily: theme.typography.fontFamily,
      color: light ? 'rgba(0, 0, 0, 0.87)' : theme.palette.common.white,
      fontSize: theme.typography.pxToRem(16)
    },
    formControl: {
      'label + &': {
        marginTop: theme.spacing.unit * 2
      }
    },
    inkbar: {
      '&:after': {
        backgroundColor: theme.palette.primary[light ? 'dark' : 'light'],
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 2,
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut
        }),
        pointerEvents: 'none' // Transparent to the hover style.
      },
      '&$focused:after': {
        transform: 'scaleX(1)'
      }
    },
    error: {
      '&:after': {
        backgroundColor: theme.palette.error.main,
        transform: 'scaleX(1)' // error is always underlined in red
      }
    },
    focused: {},
    disabled: {
      color: theme.palette.text.disabled
    },
    underline: {
      '&:before': {
        backgroundColor: bottomLineColor,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 1,
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.ease
        }),
        pointerEvents: 'none' // Transparent to the hover style.
      },
      '&:hover:not($disabled):before': {
        backgroundColor: theme.palette.text.primary,
        height: 2
      },
      '&$disabled:before': {
        background: 'transparent',
        backgroundImage: 'linear-gradient(to right, ' + bottomLineColor + ' 33%, transparent 0%)',
        backgroundPosition: 'left top',
        backgroundRepeat: 'repeat-x',
        backgroundSize: '5px 1px'
      }
    },
    multiline: {
      padding: theme.spacing.unit - 2 + 'px 0 ' + (theme.spacing.unit - 1) + 'px'
    },
    fullWidth: {
      width: '100%'
    },
    input: {
      font: 'inherit',
      color: 'currentColor',
      padding: theme.spacing.unit - 2 + 'px 0 ' + (theme.spacing.unit - 1) + 'px',
      border: 0,
      boxSizing: 'content-box',
      verticalAlign: 'middle',
      background: 'none',
      margin: 0, // Reset for Safari
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      display: 'block',
      // Make the flex item shrink with Firefox
      minWidth: 0,
      width: '100%',
      '&::-webkit-input-placeholder': placeholder,
      '&::-moz-placeholder': placeholder, // Firefox 19+
      '&:-ms-input-placeholder': placeholder, // IE 11
      '&::-ms-input-placeholder': placeholder, // Edge
      '&:focus': {
        outline: 0
      },
      // Reset Firefox invalid required input style
      '&:invalid': {
        boxShadow: 'none'
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        '-webkit-appearance': 'none'
      },
      // Show and hide the placeholder logic
      'label[data-shrink=false] + $formControl &': {
        '&::-webkit-input-placeholder': placeholderHidden,
        '&::-moz-placeholder': placeholderHidden, // Firefox 19+
        '&:-ms-input-placeholder': placeholderHidden, // IE 11
        '&::-ms-input-placeholder': placeholderHidden, // Edge
        '&:focus::-webkit-input-placeholder': placeholderVisible,
        '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
        '&:focus:-ms-input-placeholder': placeholderVisible, // IE 11
        '&:focus::-ms-input-placeholder': placeholderVisible // Edge
      }
    },
    inputDense: {
      paddingTop: theme.spacing.unit / 2 - 1
    },
    inputDisabled: {
      opacity: 1 // Reset iOS opacity
    },
    inputType: {
      // type="date" or type="time", etc. have specific styles we need to reset.
      height: '1.1875em' // Reset (19px), match the native input line-height
    },
    inputMultiline: {
      resize: 'none',
      padding: 0
    },
    inputSearch: {
      // Improve type search style.
      '-moz-appearance': 'textfield',
      '-webkit-appearance': 'textfield'
    }
  };
};

function formControlState(props, context) {
  var disabled = props.disabled;
  var error = props.error;
  var margin = props.margin;

  if (context && context.muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = context.muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = context.muiFormControl.error;
    }

    if (typeof margin === 'undefined') {
      margin = context.muiFormControl.margin;
    }
  }

  return {
    disabled: disabled,
    error: error,
    margin: margin
  };
}

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || _Object$getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focused: false
    }, _this.input = null, _this.handleFocus = function (event) {
      // Fix an bug with IE11 where the focus/blur events are triggered
      // while the input is disabled.
      if (formControlState(_this.props, _this.context).disabled) {
        event.stopPropagation();
        return;
      }

      _this.setState({ focused: true });
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _this.handleBlur = function (event) {
      _this.setState({ focused: false });
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    }, _this.handleChange = function (event) {
      if (!_this.isControlled) {
        _this.checkDirty(_this.input);
      }

      // Perform in the willUpdate
      if (_this.props.onChange) {
        _this.props.onChange(event);
      }
    }, _this.handleRefInput = function (node) {
      _this.input = node;

      if (_this.props.inputRef) {
        _this.props.inputRef(node);
      } else if (_this.props.inputProps && _this.props.inputProps.ref) {
        _this.props.inputProps.ref(node);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Input, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.isControlled = this.props.value != null;

      if (this.isControlled) {
        this.checkDirty(this.props);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.isControlled) {
        this.checkDirty(this.input);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      // The blur won't fire when the disabled state is set on a focused input.
      // We need to book keep the focused state manually.
      if (!formControlState(this.props, this.context).disabled && formControlState(nextProps, nextContext).disabled) {
        this.setState({
          focused: false
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState, nextContext) {
      if (this.isControlled) {
        this.checkDirty(nextProps);
      } // else performed in the onChange

      // Book keep the focused state.
      if (!formControlState(this.props, this.context).disabled && formControlState(nextProps, nextContext).disabled) {
        var muiFormControl = this.context.muiFormControl;

        if (muiFormControl && muiFormControl.onBlur) {
          muiFormControl.onBlur();
        }
      }
    }

    // Holds the input reference

  }, {
    key: 'checkDirty',
    value: function checkDirty(obj) {
      var muiFormControl = this.context.muiFormControl;


      if (isDirty(obj)) {
        if (muiFormControl && muiFormControl.onDirty) {
          muiFormControl.onDirty();
        }
        if (this.props.onDirty) {
          this.props.onDirty();
        }
        return;
      }

      if (muiFormControl && muiFormControl.onClean) {
        muiFormControl.onClean();
      }
      if (this.props.onClean) {
        this.props.onClean();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames, _classNames2;

      var _props = this.props,
          autoComplete = _props.autoComplete,
          autoFocus = _props.autoFocus,
          classes = _props.classes,
          classNameProp = _props.className,
          defaultValue = _props.defaultValue,
          disabledProp = _props.disabled,
          disableUnderline = _props.disableUnderline,
          endAdornment = _props.endAdornment,
          errorProp = _props.error,
          fullWidth = _props.fullWidth,
          id = _props.id,
          inputComponent = _props.inputComponent,
          _props$inputProps = _props.inputProps;
      _props$inputProps = _props$inputProps === undefined ? {} : _props$inputProps;

      var inputPropsClassName = _props$inputProps.className,
          inputPropsProp = _objectWithoutProperties(_props$inputProps, ['className']),
          inputRef = _props.inputRef,
          marginProp = _props.margin,
          multiline = _props.multiline,
          name = _props.name,
          onBlur = _props.onBlur,
          onChange = _props.onChange,
          onClean = _props.onClean,
          onDirty = _props.onDirty,
          onFocus = _props.onFocus,
          onKeyDown = _props.onKeyDown,
          onKeyUp = _props.onKeyUp,
          placeholder = _props.placeholder,
          readOnly = _props.readOnly,
          rows = _props.rows,
          rowsMax = _props.rowsMax,
          startAdornment = _props.startAdornment,
          type = _props.type,
          value = _props.value,
          other = _objectWithoutProperties(_props, ['autoComplete', 'autoFocus', 'classes', 'className', 'defaultValue', 'disabled', 'disableUnderline', 'endAdornment', 'error', 'fullWidth', 'id', 'inputComponent', 'inputProps', 'inputRef', 'margin', 'multiline', 'name', 'onBlur', 'onChange', 'onClean', 'onDirty', 'onFocus', 'onKeyDown', 'onKeyUp', 'placeholder', 'readOnly', 'rows', 'rowsMax', 'startAdornment', 'type', 'value']);

      var muiFormControl = this.context.muiFormControl;

      var _formControlState = formControlState(this.props, this.context),
          disabled = _formControlState.disabled,
          error = _formControlState.error,
          margin = _formControlState.margin;

      var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.disabled, disabled), _defineProperty$1(_classNames, classes.error, error), _defineProperty$1(_classNames, classes.fullWidth, fullWidth), _defineProperty$1(_classNames, classes.focused, this.state.focused), _defineProperty$1(_classNames, classes.formControl, muiFormControl), _defineProperty$1(_classNames, classes.inkbar, !disableUnderline), _defineProperty$1(_classNames, classes.multiline, multiline), _defineProperty$1(_classNames, classes.underline, !disableUnderline), _classNames), classNameProp);

      var inputClassName = classnames(classes.input, (_classNames2 = {}, _defineProperty$1(_classNames2, classes.inputDisabled, disabled), _defineProperty$1(_classNames2, classes.inputType, type !== 'text'), _defineProperty$1(_classNames2, classes.inputMultiline, multiline), _defineProperty$1(_classNames2, classes.inputSearch, type === 'search'), _defineProperty$1(_classNames2, classes.inputDense, margin === 'dense'), _classNames2), inputPropsClassName);

      var required = muiFormControl && muiFormControl.required === true;

      var InputComponent = 'input';
      var inputProps = _extends$1({}, inputPropsProp, {
        ref: this.handleRefInput
      });

      if (inputComponent) {
        InputComponent = inputComponent;
        inputProps = _extends$1({
          // Rename ref to inputRef as we don't know the
          // provided `inputComponent` structure.
          inputRef: this.handleRefInput
        }, inputProps, {
          ref: null
        });
      } else if (multiline) {
        if (rows && !rowsMax) {
          InputComponent = 'textarea';
        } else {
          inputProps = _extends$1({
            rowsMax: rowsMax,
            textareaRef: this.handleRefInput
          }, inputProps, {
            ref: null
          });
          InputComponent = Textarea$1;
        }
      }

      return React.createElement(
        'div',
        _extends$1({ onBlur: this.handleBlur, onFocus: this.handleFocus, className: className }, other),
        startAdornment,
        React.createElement(InputComponent, _extends$1({
          autoComplete: autoComplete,
          autoFocus: autoFocus,
          className: inputClassName,
          onChange: this.handleChange,
          onKeyUp: onKeyUp,
          onKeyDown: onKeyDown,
          disabled: disabled,
          required: required ? true : undefined,
          value: value,
          id: id,
          name: name,
          defaultValue: defaultValue,
          placeholder: placeholder,
          type: type,
          readOnly: readOnly,
          rows: rows,
          'aria-required': required,
          'aria-invalid': error
        }, inputProps)),
        endAdornment
      );
    }
  }]);

  return Input;
}(React.Component);

Input.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it here:
   * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
   */
  autoComplete: propTypes.string,
  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus: propTypes.bool,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * The CSS class name of the wrapper element.
   */
  className: propTypes.string,
  /**
   * The default input value, useful when not controlling the component.
   */
  defaultValue: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /**
   * If `true`, the input will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline: propTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: propTypes.node,
  /**
   * If `true`, the input will indicate an error. This is normally obtained via context from
   * FormControl.
   */
  error: propTypes.bool,
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth: propTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: propTypes.string,
  /**
   * The component used for the native input.
   * Either a string to use a DOM element or a component.
   */
  inputComponent: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Properties applied to the `input` element.
   */
  inputProps: propTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: propTypes.func,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: propTypes.oneOf(['dense', 'none']),
  /**
   * If `true`, a textarea element will be rendered.
   */
  multiline: propTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: propTypes.string,
  /**
   * @ignore
   */
  onBlur: propTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback
   */
  onChange: propTypes.func,
  /**
   * TODO
   */
  onClean: propTypes.func,
  /**
   * TODO
   */
  onDirty: propTypes.func,
  /**
   * @ignore
   */
  onFocus: propTypes.func,
  /**
   * @ignore
   */
  onKeyDown: propTypes.func,
  /**
   * @ignore
   */
  onKeyUp: propTypes.func,
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: propTypes.string,
  /**
   * @ignore
   */
  readOnly: propTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: propTypes.node,
  /**
   * Type of the input element. It should be a valid HTML5 input type.
   */
  type: propTypes.string,
  /**
   * The input value, required for a controlled component.
   */
  value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number]))])
} : {};

Input.muiName = 'Input';

Input.defaultProps = {
  disableUnderline: false,
  fullWidth: false,
  multiline: false,
  type: 'text'
};

Input.contextTypes = {
  muiFormControl: propTypes.object
};

var Input$1 = withStyles(styles$37, { name: 'MuiInput' })(Input);

var styles$38 = function styles(theme) {
  return {
    root: {
      display: 'inline-flex',
      flexDirection: 'column',
      position: 'relative',
      // Reset fieldset default style
      minWidth: 0,
      padding: 0,
      margin: 0,
      border: 0
    },
    marginNormal: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit
    },
    marginDense: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit / 2
    },
    fullWidth: {
      width: '100%'
    }
  };
};

/**
 * Provides context such as dirty/focused/error/required for form inputs.
 * Relying on the context provides high flexibilty and ensures that the state always stay
 * consitent across the children of the `FormControl`.
 * This context is used by the following components:
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 */

var FormControl = function (_React$Component) {
  _inherits(FormControl, _React$Component);

  function FormControl(props, context) {
    _classCallCheck(this, FormControl);

    // We need to iterate through the children and find the Input in order
    // to fully support server side rendering.
    var _this = _possibleConstructorReturn(this, (FormControl.__proto__ || _Object$getPrototypeOf(FormControl)).call(this, props, context));

    _this.state = {
      adornedStart: false,
      dirty: false,
      focused: false
    };

    _this.handleFocus = function (event) {
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
      _this.setState(function (state) {
        return !state.focused ? { focused: true } : null;
      });
    };

    _this.handleBlur = function (event) {
      // The event might be undefined.
      // For instance, a child component might call this hook
      // when an input is disabled but still having the focus.
      if (_this.props.onBlur && event) {
        _this.props.onBlur(event);
      }
      _this.setState(function (state) {
        return state.focused ? { focused: false } : null;
      });
    };

    _this.handleDirty = function () {
      if (!_this.state.dirty) {
        _this.setState({ dirty: true });
      }
    };

    _this.handleClean = function () {
      if (_this.state.dirty) {
        _this.setState({ dirty: false });
      }
    };

    var children = _this.props.children;

    if (children) {
      React.Children.forEach(children, function (child) {
        if (isMuiElement(child, ['Input', 'Select']) && isDirty(child.props, true)) {
          _this.state.dirty = true;
        }
        if (isMuiElement(child, ['Input']) && isAdornedStart(child.props)) {
          _this.state.adornedStart = true;
        }
      });
    }
    return _this;
  }

  _createClass(FormControl, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          disabled = _props.disabled,
          error = _props.error,
          required = _props.required,
          margin = _props.margin;
      var _state = this.state,
          adornedStart = _state.adornedStart,
          dirty = _state.dirty,
          focused = _state.focused;


      return {
        muiFormControl: {
          adornedStart: adornedStart,
          dirty: dirty,
          disabled: disabled,
          error: error,
          focused: focused,
          margin: margin,
          required: required,
          onDirty: this.handleDirty,
          onClean: this.handleClean,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props2 = this.props,
          classes = _props2.classes,
          className = _props2.className,
          Component = _props2.component,
          disabled = _props2.disabled,
          error = _props2.error,
          fullWidth = _props2.fullWidth,
          margin = _props2.margin,
          required = _props2.required,
          other = _objectWithoutProperties(_props2, ['classes', 'className', 'component', 'disabled', 'error', 'fullWidth', 'margin', 'required']);

      return React.createElement(Component, _extends$1({
        className: classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes['margin' + capitalize(margin)], margin !== 'none'), _defineProperty$1(_classNames, classes.fullWidth, fullWidth), _classNames), className)
      }, other, {
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }));
    }
  }]);

  return FormControl;
}(React.Component);

FormControl.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The contents of the form control.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: propTypes.bool,
  /**
   * If `true`, the component will take up the full width of its container.
   */
  fullWidth: propTypes.bool,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin: propTypes.oneOf(['none', 'dense', 'normal']),
  /**
   * @ignore
   */
  onBlur: propTypes.func,
  /**
   * @ignore
   */
  onFocus: propTypes.func,
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: propTypes.bool
} : {};

FormControl.defaultProps = {
  component: 'div',
  disabled: false,
  error: false,
  fullWidth: false,
  margin: 'none',
  required: false
};

FormControl.childContextTypes = {
  muiFormControl: propTypes.object.isRequired
};

var FormControl$1 = withStyles(styles$38, { name: 'MuiFormControl' })(FormControl);

var styles$39 = function styles(theme) {
  return {
    root: {
      color: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(12),
      textAlign: 'left',
      marginTop: theme.spacing.unit,
      lineHeight: '1em',
      minHeight: '1em',
      margin: 0
    },
    dense: {
      marginTop: theme.spacing.unit / 2
    },
    error: {
      color: theme.palette.error.main
    },
    disabled: {
      color: theme.palette.text.disabled
    }
  };
};

function FormHelperText(props, context) {
  var _classNames;

  var classes = props.classes,
      classNameProp = props.className,
      disabledProp = props.disabled,
      errorProp = props.error,
      marginProp = props.margin,
      Component = props.component,
      other = _objectWithoutProperties(props, ['classes', 'className', 'disabled', 'error', 'margin', 'component']);

  var muiFormControl = context.muiFormControl;


  var disabled = disabledProp;
  var error = errorProp;
  var margin = marginProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }

    if (typeof margin === 'undefined') {
      margin = muiFormControl.margin;
    }
  }

  var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.disabled, disabled), _defineProperty$1(_classNames, classes.error, error), _defineProperty$1(_classNames, classes.dense, margin === 'dense'), _classNames), classNameProp);

  return React.createElement(Component, _extends$1({ className: className }, other));
}

FormHelperText.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: propTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: propTypes.oneOf(['dense'])
} : {};

FormHelperText.defaultProps = {
  component: 'p'
};

FormHelperText.contextTypes = {
  muiFormControl: propTypes.object
};

var FormHelperText$1 = withStyles(styles$39, { name: 'MuiFormHelperText' })(FormHelperText);

/* eslint-disable jsx-a11y/label-has-for */

var styles$40 = function styles(theme) {
  return {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      // For correct alignment with the text.
      verticalAlign: 'middle',
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      marginLeft: -14,
      marginRight: theme.spacing.unit * 2 // used for row presentation of radio/checkbox
    },
    disabled: {
      color: theme.palette.text.disabled,
      cursor: 'default'
    },
    label: {}
  };
};

/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
function FormControlLabel(props, context) {
  var checked = props.checked,
      classes = props.classes,
      classNameProp = props.className,
      control = props.control,
      disabledProp = props.disabled,
      inputRef = props.inputRef,
      label = props.label,
      name = props.name,
      onChange = props.onChange,
      value = props.value,
      other = _objectWithoutProperties(props, ['checked', 'classes', 'className', 'control', 'disabled', 'inputRef', 'label', 'name', 'onChange', 'value']);

  var muiFormControl = context.muiFormControl;

  var disabled = disabledProp;

  if (typeof control.props.disabled !== 'undefined') {
    if (typeof disabled === 'undefined') {
      disabled = control.props.disabled;
    }
  }

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  var className = classnames(classes.root, _defineProperty$1({}, classes.disabled, disabled), classNameProp);

  return React.createElement(
    'label',
    _extends$1({ className: className }, other),
    React.cloneElement(control, {
      disabled: disabled,
      checked: typeof control.props.checked === 'undefined' ? checked : control.props.checked,
      name: control.props.name || name,
      onChange: control.props.onChange || onChange,
      value: control.props.value || value,
      inputRef: control.props.inputRef || inputRef
    }),
    React.createElement(
      Typography$1,
      { component: 'span', className: classes.label },
      label
    )
  );
}

FormControlLabel.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If `true`, the component appears selected.
   */
  checked: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: propTypes.element,
  /**
   * If `true`, the control will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: propTypes.func,
  /**
   * The text to be used in an enclosing label element.
   */
  label: propTypes.node,
  /*
   * @ignore
   */
  name: propTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: propTypes.func,
  /**
   * The value of the component.
   */
  value: propTypes.string
} : {};

FormControlLabel.contextTypes = {
  muiFormControl: propTypes.object
};

var FormControlLabel$1 = withStyles(styles$40, { name: 'MuiFormControlLabel' })(FormControlLabel);

/**
 * @ignore - internal component.
 */
function HiddenJs(props) {
  var children = props.children,
      only = props.only,
      width = props.width;


  var visible = true;

  // `only` check is faster to get out sooner if used.
  if (only) {
    if (Array.isArray(only)) {
      for (var i = 0; i < only.length; i += 1) {
        var breakpoint = only[i];
        if (width === breakpoint) {
          visible = false;
          break;
        }
      }
    } else if (only && width === only) {
      visible = false;
    }
  }

  // Allow `only` to be combined with other props. If already hidden, no need to check others.
  if (visible) {
    // determine visibility based on the smallest size up
    for (var _i = 0; _i < keys$3.length; _i += 1) {
      var _breakpoint = keys$3[_i];
      var breakpointUp = props[_breakpoint + 'Up'];
      var breakpointDown = props[_breakpoint + 'Down'];
      if (breakpointUp && isWidthUp(_breakpoint, width) || breakpointDown && isWidthDown(_breakpoint, width)) {
        visible = false;
        break;
      }
    }
  }

  if (!visible) {
    return null;
  }

  return children;
}

HiddenJs.propTypes = {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for server
   * side rendering.
   */
  implementation: propTypes.oneOf(['js', 'css']),
  /**
   * You can use this property when choosing the `js` implementation with server side rendering.
   *
   * As `window.innerWidth` is unavailable on the server,
   * we default to rendering an empty componenent during the first mount.
   * In some situation you might want to use an heristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * http://caniuse.com/#search=client%20hint
   */
  initialWidth: propTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /**
   * If true, screens this size and down will be hidden.
   */
  lgDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  lgUp: propTypes.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  mdDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  mdUp: propTypes.bool,
  /**
   * Hide the given breakpoint(s).
   */
  only: propTypes.oneOfType([propTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), propTypes.arrayOf(propTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']))]),
  /**
   * If true, screens this size and down will be hidden.
   */
  smDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  smUp: propTypes.bool,
  /**
   * @ignore
   * width prop provided by withWidth decorator.
   */
  width: propTypes.string.isRequired,
  /**
   * If true, screens this size and down will be hidden.
   */
  xlDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xlUp: propTypes.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  xsDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xsUp: propTypes.bool
};

HiddenJs.propTypes = exactProp(HiddenJs.propTypes, 'HiddenJs');

var HiddenJs$1 = withWidth()(HiddenJs);

var styles$41 = function styles(theme) {
  var hidden = {
    display: 'none'
  };

  return keys$3.reduce(function (acc, key) {
    acc['only' + capitalize(key)] = _defineProperty$1({}, theme.breakpoints.only(key), hidden);
    acc[key + 'Up'] = _defineProperty$1({}, theme.breakpoints.up(key), hidden);
    acc[key + 'Down'] = _defineProperty$1({}, theme.breakpoints.down(key), hidden);

    return acc;
  }, {});
};

/**
 * @ignore - internal component.
 */
function HiddenCss(props) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      lgDown = props.lgDown,
      lgUp = props.lgUp,
      mdDown = props.mdDown,
      mdUp = props.mdUp,
      only = props.only,
      smDown = props.smDown,
      smUp = props.smUp,
      xlDown = props.xlDown,
      xlUp = props.xlUp,
      xsDown = props.xsDown,
      xsUp = props.xsUp,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'lgDown', 'lgUp', 'mdDown', 'mdUp', 'only', 'smDown', 'smUp', 'xlDown', 'xlUp', 'xsDown', 'xsUp']);

  process.env.NODE_ENV !== "production" ? warning_1$2(_Object$keys(other).length === 0 || _Object$keys(other).length === 1 && other.hasOwnProperty('ref'), 'Material-UI: unsupported properties received ' + _Object$keys(other).join(', ') + ' by `<Hidden />`.') : void 0;

  var classNames = [];

  if (className) {
    classNames.push(className);
  }

  for (var i = 0; i < keys$3.length; i += 1) {
    var breakpoint = keys$3[i];
    var breakpointUp = props[breakpoint + 'Up'];
    var breakpointDown = props[breakpoint + 'Down'];

    if (breakpointUp) {
      classNames.push(classes[breakpoint + 'Up']);
    }
    if (breakpointDown) {
      classNames.push(classes[breakpoint + 'Down']);
    }
  }

  if (only) {
    var onlyBreakpoints = Array.isArray(only) ? only : [only];
    onlyBreakpoints.forEach(function (breakpoint) {
      classNames.push(classes['only' + capitalize(breakpoint)]);
    });
  }

  return React.createElement(
    'div',
    { className: classNames.join(' ') },
    children
  );
}

HiddenCss.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for server
   * side rendering.
   */
  implementation: propTypes.oneOf(['js', 'css']),
  /**
   * If true, screens this size and down will be hidden.
   */
  lgDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  lgUp: propTypes.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  mdDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  mdUp: propTypes.bool,
  /**
   * Hide the given breakpoint(s).
   */
  only: propTypes.oneOfType([propTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), propTypes.arrayOf(propTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']))]),
  /**
   * If true, screens this size and down will be hidden.
   */
  smDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  smUp: propTypes.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  xlDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xlUp: propTypes.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  xsDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xsUp: propTypes.bool
} : {};

var HiddenCss$1 = withStyles(styles$41, { name: 'MuiHiddenCss' })(HiddenCss);

/**
 * Responsively hides children based on the selected implementation.
 */
function Hidden(props) {
  var implementation = props.implementation,
      other = _objectWithoutProperties(props, ['implementation']);

  if (implementation === 'js') {
    return React.createElement(HiddenJs$1, other);
  }

  return React.createElement(HiddenCss$1, other);
}

Hidden.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for server
   * side rendering.
   */
  implementation: propTypes.oneOf(['js', 'css']),
  /**
   * You can use this property when choosing the `js` implementation with server side rendering.
   *
   * As `window.innerWidth` is unavailable on the server,
   * we default to rendering an empty componenent during the first mount.
   * In some situation you might want to use an heristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * http://caniuse.com/#search=client%20hint
   */
  initialWidth: propTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /**
   * If true, screens this size and down will be hidden.
   */
  lgDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  lgUp: propTypes.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  mdDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  mdUp: propTypes.bool,
  /**
   * Hide the given breakpoint(s).
   */
  only: propTypes.oneOfType([propTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), propTypes.arrayOf(propTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']))]),
  /**
   * If true, screens this size and down will be hidden.
   */
  smDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  smUp: propTypes.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  xlDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xlUp: propTypes.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  xsDown: propTypes.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xsUp: propTypes.bool
} : {};

Hidden.defaultProps = {
  implementation: 'js',
  lgDown: false,
  lgUp: false,
  mdDown: false,
  mdUp: false,
  smDown: false,
  smUp: false,
  xlDown: false,
  xlUp: false,
  xsDown: false,
  xsUp: false
};

var styles$42 = function styles(theme) {
  return {
    root: {
      userSelect: 'none'
    },
    colorPrimary: {
      color: theme.palette.primary.main
    },
    colorSecondary: {
      color: theme.palette.secondary.main
    },
    colorAction: {
      color: theme.palette.action.active
    },
    colorDisabled: {
      color: theme.palette.action.disabled
    },
    colorError: {
      color: theme.palette.error.main
    },
    fontSize: {
      width: '1em',
      height: '1em'
    }
  };
};

function Icon(props) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      fontSize = props.fontSize,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'color', 'fontSize']);

  var className = classnames('material-icons', classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes['color' + capitalize(color)], color !== 'inherit'), _defineProperty$1(_classNames, classes.fontSize, fontSize), _classNames), classNameProp);

  return React.createElement(
    'span',
    _extends$1({ className: className, 'aria-hidden': 'true' }, other),
    children
  );
}

Icon.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The name of the icon font ligature.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: propTypes.oneOf(['inherit', 'secondary', 'action', 'disabled', 'error', 'primary']),
  /**
   * If `true`, the icon size will be determined by the font-size.
   */
  fontSize: propTypes.bool
} : {};

Icon.defaultProps = {
  color: 'inherit',
  fontSize: false
};

Icon.muiName = 'Icon';

var Icon$1 = withStyles(styles$42, { name: 'MuiIcon' })(Icon);

var styles$43 = function styles(theme) {
  return {
    root: {
      display: 'flex',
      maxHeight: '2em',
      alignItems: 'center'
    },
    positionStart: {
      marginRight: theme.spacing.unit
    },
    positionEnd: {
      marginLeft: theme.spacing.unit
    }
  };
};

function InputAdornment(props) {
  var _classNames;

  var children = props.children,
      Component = props.component,
      classes = props.classes,
      className = props.className,
      disableTypography = props.disableTypography,
      position = props.position,
      other = _objectWithoutProperties(props, ['children', 'component', 'classes', 'className', 'disableTypography', 'position']);

  return React.createElement(
    Component,
    _extends$1({
      className: classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.positionStart, position === 'start'), _defineProperty$1(_classNames, classes.positionEnd, position === 'end'), _classNames), className)
    }, other),
    typeof children === 'string' && !disableTypography ? React.createElement(
      Typography$1,
      { color: 'textSecondary' },
      children
    ) : children
  );
}

InputAdornment.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If children is a string then disable wrapping in a Typography component.
   */
  disableTypography: propTypes.bool,
  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: propTypes.oneOf(['start', 'end'])
} : {};

InputAdornment.defaultProps = {
  component: 'div',
  disableTypography: false
};

var InputAdornment$1 = withStyles(styles$43, { name: 'MuiInputAdornment' })(InputAdornment);

var styles$44 = function styles(theme) {
  return {
    root: {
      transformOrigin: 'top left'
    },
    formControl: {
      position: 'absolute',
      left: 0,
      top: 0,
      // slight alteration to spec spacing to match visual spec result
      transform: 'translate(0, ' + theme.spacing.unit * 3 + 'px) scale(1)'
    },
    labelDense: {
      // Compensation for the `Input.inputDense` style.
      transform: 'translate(0, ' + (theme.spacing.unit * 2.5 + 1) + 'px) scale(1)'
    },
    shrink: {
      transform: 'translate(0, 1.5px) scale(0.75)',
      transformOrigin: 'top left'
    },
    animated: {
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      })
    },
    disabled: {
      color: theme.palette.text.disabled
    }
  };
};

function InputLabel(props, context) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      disableAnimation = props.disableAnimation,
      disabled = props.disabled,
      FormControlClasses = props.FormControlClasses,
      marginProp = props.margin,
      shrinkProp = props.shrink,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'disableAnimation', 'disabled', 'FormControlClasses', 'margin', 'shrink']);

  var muiFormControl = context.muiFormControl;

  var shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.dirty || muiFormControl.focused || muiFormControl.adornedStart;
  }

  var margin = marginProp;
  if (typeof margin === 'undefined' && muiFormControl) {
    margin = muiFormControl.margin;
  }

  var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.formControl, muiFormControl), _defineProperty$1(_classNames, classes.animated, !disableAnimation), _defineProperty$1(_classNames, classes.shrink, shrink), _defineProperty$1(_classNames, classes.disabled, disabled), _defineProperty$1(_classNames, classes.labelDense, margin === 'dense'), _classNames), classNameProp);

  return React.createElement(
    FormLabel$1,
    _extends$1({ 'data-shrink': shrink, className: className, classes: FormControlClasses }, other),
    children
  );
}

InputLabel.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The contents of the `InputLabel`.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation: propTypes.bool,
  /**
   * If `true`, apply disabled class.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: propTypes.bool,
  /**
   * If `true`, the input of this label is focused.
   */
  focused: propTypes.bool,
  /**
   * `classes` property applied to the `FormControl` element.
   */
  FormControlClasses: propTypes.object,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: propTypes.oneOf(['dense']),
  /**
   * if `true`, the label will indicate that the input is required.
   */
  required: propTypes.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: propTypes.bool
} : {};

InputLabel.defaultProps = {
  disabled: false,
  disableAnimation: false
};

InputLabel.contextTypes = {
  muiFormControl: propTypes.object
};

var InputLabel$1 = withStyles(styles$44, { name: 'MuiInputLabel' })(InputLabel);

//  weak

var requirePropFactory = function requirePropFactory(componentNameInError) {
  var requireProp = function requireProp(requiredProp) {
    return function (props, propName, componentName, location, propFullName) {
      var propFullNameSafe = propFullName || propName;

      if (typeof props[propName] !== 'undefined' && !props[requiredProp]) {
        return new Error('The property `' + propFullNameSafe + '` of ' + ('`' + componentNameInError + '` must be used on `' + requiredProp + '`.'));
      }

      return null;
    };
  };
  return requireProp;
};

// A grid component using the following libs as inspiration.
//
// For the implementation:
// - http://v4-alpha.getbootstrap.com/layout/flexbox-grid/
// - https://github.com/kristoferjoseph/flexboxgrid/blob/master/src/css/flexboxgrid.css
// - https://github.com/roylee0704/react-flexbox-grid
// - https://material.angularjs.org/latest/layout/introduction
//
// Follow this flexbox Guide to better understand the underlying model:
// - https://css-tricks.com/snippets/css/a-guide-to-flexbox/

var GUTTERS = [0, 8, 16, 24, 40];
var GRID_SIZES = [true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateGrid(globalStyles, theme, breakpoint) {
  // For the auto layouting
  var styles = _defineProperty$1({}, 'grid-' + breakpoint, {
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: '100%'
  });

  GRID_SIZES.forEach(function (size) {
    if (typeof size === 'boolean') {
      // Skip the first one as handle above.
      return;
    }

    // Only keep 6 significant numbers.
    var width = Math.round(size / 12 * 10e6) / 10e4 + '%';

    /* eslint-disable max-len */
    // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/b0508a975d711d6b24c01f57dd5445c22699fac4/scss/mixins/_grid.scss#L69
    /* eslint-enable max-len */
    styles['grid-' + breakpoint + '-' + size] = {
      flexBasis: width,
      maxWidth: width
    };
  });

  // No need for a media query for the first size.
  if (breakpoint === 'xs') {
    _extends$1(globalStyles, styles);
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles;
  }
}

function generateGutter(theme, breakpoint) {
  var styles = {};

  GUTTERS.forEach(function (spacing, index) {
    if (index === 0) {
      // Skip the default style.
      return;
    }

    styles['spacing-' + breakpoint + '-' + spacing] = {
      margin: -spacing / 2,
      width: 'calc(100% + ' + spacing + 'px)',
      '& > $typeItem': {
        padding: spacing / 2
      }
    };
  });

  return styles;
}

// Default CSS values
// flex: '0 1 auto',
// flexDirection: 'row',
// alignItems: 'flex-start',
// flexWrap: 'nowrap',
// justifyContent: 'flex-start',
var styles$45 = function styles(theme) {
  return _extends$1({
    typeContainer: {
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%'
    },
    typeItem: {
      boxSizing: 'border-box',
      flex: '0 0 auto',
      margin: '0' // For instance, it's useful when used with a `figure` element.
    },
    zeroMinWidth: {
      minWidth: 0
    },
    'direction-xs-column': {
      flexDirection: 'column'
    },
    'direction-xs-column-reverse': {
      flexDirection: 'column-reverse'
    },
    'direction-xs-row-reverse': {
      flexDirection: 'row-reverse'
    },
    'wrap-xs-nowrap': {
      flexWrap: 'nowrap'
    },
    'wrap-xs-wrap-reverse': {
      flexWrap: 'wrap-reverse'
    },
    'align-items-xs-center': {
      alignItems: 'center'
    },
    'align-items-xs-flex-start': {
      alignItems: 'flex-start'
    },
    'align-items-xs-flex-end': {
      alignItems: 'flex-end'
    },
    'align-items-xs-baseline': {
      alignItems: 'baseline'
    },
    'align-content-xs-center': {
      alignContent: 'center'
    },
    'align-content-xs-flex-start': {
      alignContent: 'flex-start'
    },
    'align-content-xs-flex-end': {
      alignContent: 'flex-end'
    },
    'align-content-xs-space-between': {
      alignContent: 'space-between'
    },
    'align-content-xs-space-around': {
      alignContent: 'space-around'
    },
    'justify-xs-center': {
      justifyContent: 'center'
    },
    'justify-xs-flex-end': {
      justifyContent: 'flex-end'
    },
    'justify-xs-space-between': {
      justifyContent: 'space-between'
    },
    'justify-xs-space-around': {
      justifyContent: 'space-around'
    }
  }, generateGutter(theme, 'xs'), keys$3.reduce(function (accumulator, key) {
    // Use side effect over immutability for better performance.
    generateGrid(accumulator, theme, key);
    return accumulator;
  }, {}));
};

function Grid(props) {
  var _classNames;

  var alignContent = props.alignContent,
      alignItems = props.alignItems,
      classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      container = props.container,
      direction = props.direction,
      hidden = props.hidden,
      item = props.item,
      justify = props.justify,
      lg = props.lg,
      md = props.md,
      zeroMinWidth = props.zeroMinWidth,
      sm = props.sm,
      spacing = props.spacing,
      wrap = props.wrap,
      xl = props.xl,
      xs = props.xs,
      other = _objectWithoutProperties(props, ['alignContent', 'alignItems', 'classes', 'className', 'component', 'container', 'direction', 'hidden', 'item', 'justify', 'lg', 'md', 'zeroMinWidth', 'sm', 'spacing', 'wrap', 'xl', 'xs']);

  var className = classnames((_classNames = {}, _defineProperty$1(_classNames, classes.typeContainer, container), _defineProperty$1(_classNames, classes.typeItem, item), _defineProperty$1(_classNames, classes.zeroMinWidth, zeroMinWidth), _defineProperty$1(_classNames, classes['spacing-xs-' + String(spacing)], container && spacing !== 0), _defineProperty$1(_classNames, classes['direction-xs-' + String(direction)], direction !== Grid.defaultProps.direction), _defineProperty$1(_classNames, classes['wrap-xs-' + String(wrap)], wrap !== Grid.defaultProps.wrap), _defineProperty$1(_classNames, classes['align-items-xs-' + String(alignItems)], alignItems !== Grid.defaultProps.alignItems), _defineProperty$1(_classNames, classes['align-content-xs-' + String(alignContent)], alignContent !== Grid.defaultProps.alignContent), _defineProperty$1(_classNames, classes['justify-xs-' + String(justify)], justify !== Grid.defaultProps.justify), _defineProperty$1(_classNames, classes['grid-xs'], xs === true), _defineProperty$1(_classNames, classes['grid-xs-' + String(xs)], xs && xs !== true), _defineProperty$1(_classNames, classes['grid-sm'], sm === true), _defineProperty$1(_classNames, classes['grid-sm-' + String(sm)], sm && sm !== true), _defineProperty$1(_classNames, classes['grid-md'], md === true), _defineProperty$1(_classNames, classes['grid-md-' + String(md)], md && md !== true), _defineProperty$1(_classNames, classes['grid-lg'], lg === true), _defineProperty$1(_classNames, classes['grid-lg-' + String(lg)], lg && lg !== true), _defineProperty$1(_classNames, classes['grid-xl'], xl === true), _defineProperty$1(_classNames, classes['grid-xl-' + String(xl)], xl && xl !== true), _classNames), classNameProp);
  var gridProps = _extends$1({ className: className }, other);

  if (hidden) {
    return React.createElement(
      Hidden,
      hidden,
      React.createElement(Component, gridProps)
    );
  }

  return React.createElement(Component, gridProps);
}

Grid.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Defines the `align-content` style property.
   * It's applied for all screen sizes.
   */
  alignContent: propTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around']),
  /**
   * Defines the `align-items` style property.
   * It's applied for all screen sizes.
   */
  alignItems: propTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   */
  container: propTypes.bool,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   */
  direction: propTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  /**
   * If provided, will wrap with [Hidden](/api/hidden) component and given properties.
   */
  hidden: propTypes.object,
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   */
  item: propTypes.bool,
  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   */
  justify: propTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg: propTypes.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   */
  md: propTypes.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm: propTypes.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   */
  spacing: propTypes.oneOf(GUTTERS),
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   */
  wrap: propTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   */
  xl: propTypes.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   */
  xs: propTypes.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   */
  zeroMinWidth: propTypes.bool
} : {};

Grid.defaultProps = {
  alignContent: 'stretch',
  alignItems: 'stretch',
  component: 'div',
  container: false,
  direction: 'row',
  item: false,
  justify: 'flex-start',
  zeroMinWidth: false,
  spacing: 16,
  wrap: 'wrap'
};

// Add a wrapper component to generate some helper messages in the development
// environment.
/* eslint-disable react/no-multi-comp */
// eslint-disable-next-line import/no-mutable-exports
var GridWrapper = Grid;

if (process.env.NODE_ENV !== 'production') {
  GridWrapper = function GridWrapper(props) {
    return React.createElement(Grid, props);
  };

  var requireProp = requirePropFactory('Grid');
  GridWrapper.propTypes = {
    alignContent: requireProp('container'),
    alignItems: requireProp('container'),
    direction: requireProp('container'),
    justify: requireProp('container'),
    lg: requireProp('item'),
    md: requireProp('item'),
    sm: requireProp('item'),
    spacing: requireProp('container'),
    wrap: requireProp('container'),
    xs: requireProp('item'),
    zeroMinWidth: requireProp('zeroMinWidth')
  };
}

var Grid$1 = withStyles(styles$45, { name: 'MuiGrid' })(GridWrapper);

var styles$46 = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.
  }
};

function GridList(props) {
  var cellHeight = props.cellHeight,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      cols = props.cols,
      Component = props.component,
      spacing = props.spacing,
      style = props.style,
      other = _objectWithoutProperties(props, ['cellHeight', 'children', 'classes', 'className', 'cols', 'component', 'spacing', 'style']);

  return React.createElement(
    Component,
    _extends$1({
      className: classnames(classes.root, classNameProp),
      style: _extends$1({ margin: -spacing / 2 }, style)
    }, other),
    React.Children.map(children, function (currentChild) {
      var childCols = currentChild.props.cols || 1;
      var childRows = currentChild.props.rows || 1;

      return React.cloneElement(currentChild, {
        style: _extends$1({
          width: 100 / cols * childCols + '%',
          height: cellHeight === 'auto' ? 'auto' : cellHeight * childRows + spacing,
          padding: spacing / 2
        }, currentChild.props.style)
      });
    })
  );
}

GridList.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Number of px for one cell height.
   * You can set `'auto'` if you want to let the children determine the height.
   */
  cellHeight: propTypes.oneOfType([propTypes.number, propTypes.oneOf(['auto'])]),
  /**
   * Grid Tiles that will be in Grid List.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Number of columns.
   */
  cols: propTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Number of px for the spacing between tiles.
   */
  spacing: propTypes.number,
  /**
   * @ignore
   */
  style: propTypes.object
} : {};

GridList.defaultProps = {
  cellHeight: 180,
  cols: 2,
  component: 'ul',
  spacing: 4
};

var GridList$1 = withStyles(styles$46, { name: 'MuiGridList' })(GridList);

var styles$47 = {
  root: {
    boxSizing: 'border-box',
    flexShrink: 0
  },
  tile: {
    position: 'relative',
    display: 'block', // In case it's not renderd with a div.
    height: '100%',
    overflow: 'hidden'
  },
  imgFullHeight: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%'
  },
  imgFullWidth: {
    width: '100%',
    position: 'relative',
    transform: 'translateY(-50%)',
    top: '50%'
  }
};

var GridListTile = function (_React$Component) {
  _inherits(GridListTile, _React$Component);

  function GridListTile() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GridListTile);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GridListTile.__proto__ || _Object$getPrototypeOf(GridListTile)).call.apply(_ref, [this].concat(args))), _this), _this.imgElement = null, _this.handleResize = debounce_1(function () {
      _this.fit();
    }, 166), _this.fit = function () {
      var imgElement = _this.imgElement;

      if (!imgElement) {
        return;
      }

      if (!imgElement.complete) {
        return;
      }

      if (imgElement.width / imgElement.height > imgElement.parentNode.offsetWidth / imgElement.parentNode.offsetHeight) {
        var _imgElement$classList, _imgElement$classList2;

        (_imgElement$classList = imgElement.classList).remove.apply(_imgElement$classList, _toConsumableArray(_this.props.classes.imgFullWidth.split(' ')));
        (_imgElement$classList2 = imgElement.classList).add.apply(_imgElement$classList2, _toConsumableArray(_this.props.classes.imgFullHeight.split(' ')));
      } else {
        var _imgElement$classList3, _imgElement$classList4;

        (_imgElement$classList3 = imgElement.classList).remove.apply(_imgElement$classList3, _toConsumableArray(_this.props.classes.imgFullHeight.split(' ')));
        (_imgElement$classList4 = imgElement.classList).add.apply(_imgElement$classList4, _toConsumableArray(_this.props.classes.imgFullWidth.split(' ')));
      }

      imgElement.removeEventListener('load', _this.fit);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GridListTile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.ensureImageCover();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.ensureImageCover();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.handleResize.cancel();
    }
  }, {
    key: 'ensureImageCover',
    value: function ensureImageCover() {
      if (!this.imgElement) {
        return;
      }

      if (this.imgElement.complete) {
        this.fit();
      } else {
        this.imgElement.addEventListener('load', this.fit);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          classes = _props.classes,
          className = _props.className,
          cols = _props.cols,
          Component = _props.component,
          rows = _props.rows,
          other = _objectWithoutProperties(_props, ['children', 'classes', 'className', 'cols', 'component', 'rows']);

      return React.createElement(
        Component,
        _extends$1({ className: classnames(classes.root, className) }, other),
        React.createElement(EventListener, { target: 'window', onResize: this.handleResize }),
        React.createElement(
          'div',
          { className: classes.tile },
          React.Children.map(children, function (child) {
            if (child && child.type === 'img') {
              return React.cloneElement(child, {
                key: 'img',
                ref: function ref(node) {
                  _this2.imgElement = node;
                }
              });
            }

            return child;
          })
        )
      );
    }
  }]);

  return GridListTile;
}(React.Component);

GridListTile.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Theoretically you can pass any node as children, but the main use case is to pass an img,
   * in which case GridListTile takes care of making the image "cover" available space
   * (similar to `background-size: cover` or to `object-fit: cover`).
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Width of the tile in number of grid cells.
   */
  cols: propTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Height of the tile in number of grid cells.
   */
  rows: propTypes.number
} : {};

GridListTile.defaultProps = {
  cols: 1,
  component: 'li',
  rows: 1
};

var GridListTile$1 = withStyles(styles$47, { name: 'MuiGridListTile' })(GridListTile);

var styles$48 = function styles(theme) {
  return {
    root: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 48,
      background: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily
    },
    rootBottom: {
      bottom: 0
    },
    rootTop: {
      top: 0
    },
    rootWithSubtitle: {
      height: 68
    },
    titleWrap: {
      flexGrow: 1,
      marginLeft: theme.mixins.gutters({}).paddingLeft,
      marginRight: theme.mixins.gutters({}).paddingRight,
      color: theme.palette.common.white,
      overflow: 'hidden'
    },
    titleWrapActionLeft: {
      marginLeft: 0
    },
    titleWrapActionRight: {
      marginRight: 0
    },
    title: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '24px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    subtitle: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 1,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    actionIconPositionLeft: {
      order: -1
    },
    childImg: {
      height: '100%',
      transform: 'translateX(-50%)',
      position: 'relative',
      left: '50%'
    }
  };
};

function GridListTileBar(props) {
  var _classNames, _classNames2;

  var actionIcon = props.actionIcon,
      actionPosition = props.actionPosition,
      classes = props.classes,
      classNameProp = props.className,
      subtitle = props.subtitle,
      title = props.title,
      titlePosition = props.titlePosition,
      other = _objectWithoutProperties(props, ['actionIcon', 'actionPosition', 'classes', 'className', 'subtitle', 'title', 'titlePosition']);

  var actionPos = actionIcon && actionPosition;
  var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.rootBottom, titlePosition === 'bottom'), _defineProperty$1(_classNames, classes.rootTop, titlePosition === 'top'), _defineProperty$1(_classNames, classes.rootWithSubtitle, subtitle), _classNames), classNameProp);

  // Remove the margin between the title / subtitle wrapper, and the Action Icon
  var titleWrapClassName = classnames(classes.titleWrap, (_classNames2 = {}, _defineProperty$1(_classNames2, classes.titleWrapActionLeft, actionPos === 'left'), _defineProperty$1(_classNames2, classes.titleWrapActionRight, actionPos === 'right'), _classNames2));

  return React.createElement(
    'div',
    _extends$1({ className: className }, other),
    React.createElement(
      'div',
      { className: titleWrapClassName },
      React.createElement(
        'div',
        { className: classes.title },
        title
      ),
      subtitle ? React.createElement(
        'div',
        { className: classes.subtitle },
        subtitle
      ) : null
    ),
    actionIcon ? React.createElement(
      'div',
      { className: classnames(_defineProperty$1({}, classes.actionIconPositionLeft, actionPos === 'left')) },
      actionIcon
    ) : null
  );
}

GridListTileBar.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the tile itself).
   */
  actionIcon: propTypes.node,
  /**
   * Position of secondary action IconButton.
   */
  actionPosition: propTypes.oneOf(['left', 'right']),
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: propTypes.node,
  /**
   * Title to be displayed on tile.
   */
  title: propTypes.node,
  /**
   * Position of the title bar.
   */
  titlePosition: propTypes.oneOf(['top', 'bottom'])
} : {};

GridListTileBar.defaultProps = {
  actionPosition: 'right',
  titlePosition: 'bottom'
};

var GridListTileBar$1 = withStyles(styles$48, { name: 'MuiGridListTileBar' })(GridListTileBar);

var styles$49 = function styles(theme) {
  return {
    root: {
      flex: '1 1 auto',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      position: 'relative'
    },
    padding: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    },
    dense: {
      paddingTop: theme.spacing.unit / 2,
      paddingBottom: theme.spacing.unit / 2
    },
    subheader: {
      paddingTop: 0
    }
  };
};

var List = function (_React$Component) {
  _inherits(List, _React$Component);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, (List.__proto__ || _Object$getPrototypeOf(List)).apply(this, arguments));
  }

  _createClass(List, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        dense: this.props.dense
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          children = _props.children,
          classes = _props.classes,
          classNameProp = _props.className,
          Component = _props.component,
          dense = _props.dense,
          disablePadding = _props.disablePadding,
          subheader = _props.subheader,
          other = _objectWithoutProperties(_props, ['children', 'classes', 'className', 'component', 'dense', 'disablePadding', 'subheader']);

      var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.dense, dense && !disablePadding), _defineProperty$1(_classNames, classes.padding, !disablePadding), _defineProperty$1(_classNames, classes.subheader, subheader), _classNames), classNameProp);

      return React.createElement(
        Component,
        _extends$1({ className: className }, other),
        subheader,
        children
      );
    }
  }]);

  return List;
}(React.Component);

List.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used for
   * the list and list items. The property is available to descendant components as the
   * `dense` context.
   */
  dense: propTypes.bool,
  /**
   * If `true`, vertical padding will be removed from the list.
   */
  disablePadding: propTypes.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: propTypes.node
} : {};

List.defaultProps = {
  component: 'ul',
  dense: false,
  disablePadding: false
};

List.childContextTypes = {
  dense: propTypes.bool
};

var List$1 = withStyles(styles$49, { name: 'MuiList' })(List);

var styles$50 = function styles(theme) {
  return {
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'left'
    },
    container: {
      position: 'relative'
    },
    keyboardFocused: {
      backgroundColor: theme.palette.action.hover
    },
    default: {
      paddingTop: 12,
      paddingBottom: 12
    },
    dense: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    },
    disabled: {
      opacity: 0.5
    },
    divider: {
      borderBottom: '1px solid ' + theme.palette.divider,
      backgroundClip: 'padding-box'
    },
    gutters: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    },
    button: {
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shortest
      }),
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: theme.palette.action.hover,
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },
    secondaryAction: {
      // Add some space to avoid collision as `ListItemSecondaryAction`
      // is absolutely positionned.
      paddingRight: theme.spacing.unit * 4
    }
  };
};

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, (ListItem.__proto__ || _Object$getPrototypeOf(ListItem)).apply(this, arguments));
  }

  _createClass(ListItem, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        dense: this.props.dense || this.context.dense || false
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          button = _props.button,
          childrenProp = _props.children,
          classes = _props.classes,
          classNameProp = _props.className,
          componentProp = _props.component,
          ContainerComponent = _props.ContainerComponent,
          ContainerProps = _props.ContainerProps,
          dense = _props.dense,
          disabled = _props.disabled,
          disableGutters = _props.disableGutters,
          divider = _props.divider,
          other = _objectWithoutProperties(_props, ['button', 'children', 'classes', 'className', 'component', 'ContainerComponent', 'ContainerProps', 'dense', 'disabled', 'disableGutters', 'divider']);

      var isDense = dense || this.context.dense || false;
      var children = React.Children.toArray(childrenProp);
      var hasAvatar = children.some(function (value) {
        return isMuiElement(value, ['ListItemAvatar']);
      });
      var hasSecondaryAction = children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction']);

      var className = classnames(classes.root, isDense || hasAvatar ? classes.dense : classes.default, (_classNames = {}, _defineProperty$1(_classNames, classes.gutters, !disableGutters), _defineProperty$1(_classNames, classes.divider, divider), _defineProperty$1(_classNames, classes.disabled, disabled), _defineProperty$1(_classNames, classes.button, button), _defineProperty$1(_classNames, classes.secondaryAction, hasSecondaryAction), _classNames), classNameProp);

      var componentProps = _extends$1({ className: className, disabled: disabled }, other);
      var Component = componentProp || 'li';

      if (button) {
        componentProps.component = componentProp || 'div';
        componentProps.keyboardFocusedClassName = classes.keyboardFocused;
        Component = ButtonBase$1;
      }

      if (hasSecondaryAction) {
        Component = Component !== ButtonBase$1 && !componentProp ? 'div' : Component;

        return React.createElement(
          ContainerComponent,
          _extends$1({ className: classes.container }, ContainerProps),
          React.createElement(
            Component,
            componentProps,
            children
          ),
          children.pop()
        );
      }

      return React.createElement(
        Component,
        componentProps,
        children
      );
    }
  }]);

  return ListItem;
}(React.Component);

ListItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If `true`, the list item will be a button (using `ButtonBase`).
   */
  button: propTypes.bool,
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * The container component. Useful when a `ListItemSecondaryAction` is rendered.
   */
  ContainerComponent: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Properties applied to the container element when the component
   * is used to display a `ListItemSecondaryAction`.
   */
  ContainerProps: propTypes.object,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   */
  dense: propTypes.bool,
  /**
   * @ignore
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters: propTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   */
  divider: propTypes.bool
} : {};

ListItem.defaultProps = {
  button: false,
  ContainerComponent: 'li',
  dense: false,
  disabled: false,
  disableGutters: false,
  divider: false
};

ListItem.contextTypes = {
  dense: propTypes.bool
};

ListItem.childContextTypes = {
  dense: propTypes.bool
};

var ListItem$1 = withStyles(styles$50, { name: 'MuiListItem' })(ListItem);

var styles$51 = function styles(theme) {
  return {
    root: {
      width: 36,
      height: 36,
      fontSize: theme.typography.pxToRem(18),
      marginRight: 4
    },
    icon: {
      width: 20,
      height: 20,
      fontSize: theme.typography.pxToRem(20)
    }
  };
};

/**
 * It's a simple wrapper to apply the `dense` mode styles to `Avatar`.
 */
function ListItemAvatar(props, context) {
  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className']);

  if (context.dense === undefined) {
    process.env.NODE_ENV !== "production" ? warning_1$2(false, 'Material-UI: <ListItemAvatar> is a simple wrapper to apply the dense styles\n      to <Avatar>. You do not need it unless you are controlling the <List> dense property.') : void 0;
    return props.children;
  }

  return React.cloneElement(children, _extends$1({
    className: classnames(_defineProperty$1({}, classes.root, context.dense), classNameProp, children.props.className),
    childrenClassName: classnames(_defineProperty$1({}, classes.icon, context.dense), children.props.childrenClassName)
  }, other));
}

ListItemAvatar.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component, normally `Avatar`.
   */
  children: propTypes.element.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string
} : {};

ListItemAvatar.contextTypes = {
  dense: propTypes.bool
};

ListItemAvatar.muiName = 'ListItemAvatar';

var ListItemAvatar$1 = withStyles(styles$51, { name: 'MuiListItemAvatar' })(ListItemAvatar);

var styles$52 = function styles(theme) {
  return {
    root: {
      flex: '1 1 auto',
      minWidth: 0,
      padding: '0 16px',
      '&:first-child': {
        paddingLeft: 0
      }
    },
    inset: {
      '&:first-child': {
        paddingLeft: theme.spacing.unit * 7
      }
    },
    dense: {
      fontSize: theme.typography.pxToRem(13)
    },
    primary: {
      '&$textDense': {
        fontSize: 'inherit'
      }
    },
    secondary: {
      '&$textDense': {
        fontSize: 'inherit'
      }
    },
    textDense: {}
  };
};

function ListItemText(props, context) {
  var _classNames;

  var classes = props.classes,
      classNameProp = props.className,
      disableTypography = props.disableTypography,
      inset = props.inset,
      primary = props.primary,
      secondary = props.secondary,
      other = _objectWithoutProperties(props, ['classes', 'className', 'disableTypography', 'inset', 'primary', 'secondary']);

  var dense = context.dense;

  var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.dense, dense), _defineProperty$1(_classNames, classes.inset, inset), _classNames), classNameProp);

  return React.createElement(
    'div',
    _extends$1({ className: className }, other),
    primary && (disableTypography ? primary : React.createElement(
      Typography$1,
      {
        variant: 'subheading',
        className: classnames(classes.primary, _defineProperty$1({}, classes.textDense, dense))
      },
      primary
    )),
    secondary && (disableTypography ? secondary : React.createElement(
      Typography$1,
      {
        variant: 'body1',
        className: classnames(classes.secondary, _defineProperty$1({}, classes.textDense, dense)),
        color: 'textSecondary'
      },
      secondary
    ))
  );
}

ListItemText.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, that can be useful to can render an h4 instead of a
   */
  disableTypography: propTypes.bool,
  /**
   * If `true`, the children will be indented.
   * This should be used if there is no left avatar or left icon.
   */
  inset: propTypes.bool,
  primary: propTypes.node,
  secondary: propTypes.node
} : {};

ListItemText.defaultProps = {
  disableTypography: false,
  inset: false,
  primary: false,
  secondary: false
};

ListItemText.contextTypes = {
  dense: propTypes.bool
};

var ListItemText$1 = withStyles(styles$52, { name: 'MuiListItemText' })(ListItemText);

var styles$53 = function styles(theme) {
  return {
    root: {
      height: 24,
      marginRight: theme.spacing.unit * 2,
      width: 24,
      color: theme.palette.action.active,
      flexShrink: 0
    }
  };
};

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */
function ListItemIcon(props) {
  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className']);

  return React.cloneElement(children, _extends$1({
    className: classnames(classes.root, classNameProp, children.props.className)
  }, other));
}

ListItemIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `material-ui-icons` SVG icon component.
   */
  children: propTypes.element.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string
} : {};

var ListItemIcon$1 = withStyles(styles$53, { name: 'MuiListItemIcon' })(ListItemIcon);

var styles$54 = function styles(theme) {
  return {
    root: {
      position: 'absolute',
      right: 4,
      top: '50%',
      marginTop: -theme.spacing.unit * 3
    }
  };
};

function ListItemSecondaryAction(props) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className']);

  return React.createElement(
    'div',
    _extends$1({ className: classnames(classes.root, className) }, other),
    children
  );
}

ListItemSecondaryAction.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string
} : {};

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

var ListItemSecondaryAction$1 = withStyles(styles$54, { name: 'MuiListItemSecondaryAction' })(ListItemSecondaryAction);

var styles$55 = function styles(theme) {
  return {
    root: {
      boxSizing: 'border-box',
      lineHeight: '48px',
      listStyle: 'none',
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      color: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(theme.typography.fontSize)
    },
    colorPrimary: {
      color: theme.palette.primary.main
    },
    colorInherit: {
      color: 'inherit'
    },
    inset: {
      paddingLeft: theme.spacing.unit * 9
    },
    sticky: {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: 'inherit'
    }
  };
};

function ListSubheader(props) {
  var _classNames;

  var classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      Component = props.component,
      disableSticky = props.disableSticky,
      inset = props.inset,
      other = _objectWithoutProperties(props, ['classes', 'className', 'color', 'component', 'disableSticky', 'inset']);

  var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes['color' + capitalize(color)], color !== 'default'), _defineProperty$1(_classNames, classes.inset, inset), _defineProperty$1(_classNames, classes.sticky, !disableSticky), _classNames), classNameProp);

  return React.createElement(Component, _extends$1({ className: className }, other));
}

ListSubheader.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: propTypes.oneOf(['default', 'primary', 'inherit']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   */
  disableSticky: propTypes.bool,
  /**
   * If `true`, the List Subheader will be indented.
   */
  inset: propTypes.bool
} : {};

ListSubheader.defaultProps = {
  color: 'default',
  component: 'li',
  disableSticky: false,
  inset: false
};

ListSubheader.muiName = 'ListSubheader';

var ListSubheader$1 = withStyles(styles$55, { name: 'MuiListSubheader' })(ListSubheader);

var ownerWindow_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ownerWindow;



var _ownerDocument2 = _interopRequireDefault(ownerDocument_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownerWindow(node) {
  var doc = (0, _ownerDocument2.default)(node);
  return doc && doc.defaultView || doc.parentWindow;
}
module.exports = exports['default'];
});

var ownerWindow = unwrapExports(ownerWindow_1);

// @inheritedComponent Transition

function getScale(value) {
  return 'scale(' + value + ', ' + Math.pow(value, 2) + ')';
}

var styles$56 = {
  entering: {
    opacity: 1,
    transform: getScale(1)
  },
  entered: {
    opacity: 1,
    transform: getScale(1)
  }
};

/**
 * The Grow transition is used by the Popover component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

var Grow = function (_React$Component) {
  _inherits(Grow, _React$Component);

  function Grow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Grow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Grow.__proto__ || _Object$getPrototypeOf(Grow)).call.apply(_ref, [this].concat(args))), _this), _this.autoTimeout = undefined, _this.handleEnter = function (node) {
      var _this$props = _this.props,
          theme = _this$props.theme,
          timeout = _this$props.timeout;

      reflow(node); // So the animation always start from the start.

      var _getTransitionProps = getTransitionProps(_this.props, {
        mode: 'enter'
      }),
          transitionDuration = _getTransitionProps.duration,
          delay = _getTransitionProps.delay;

      var duration = 0;
      if (timeout === 'auto') {
        duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
        _this.autoTimeout = duration;
      } else {
        duration = transitionDuration;
      }

      node.style.transition = [theme.transitions.create('opacity', {
        duration: duration,
        delay: delay
      }), theme.transitions.create('transform', {
        duration: duration * 0.666,
        delay: delay
      })].join(',');

      if (_this.props.onEnter) {
        _this.props.onEnter(node);
      }
    }, _this.handleExit = function (node) {
      var _this$props2 = _this.props,
          theme = _this$props2.theme,
          timeout = _this$props2.timeout;

      var duration = 0;

      var _getTransitionProps2 = getTransitionProps(_this.props, {
        mode: 'exit'
      }),
          transitionDuration = _getTransitionProps2.duration,
          delay = _getTransitionProps2.delay;

      if (timeout === 'auto') {
        duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
        _this.autoTimeout = duration;
      } else {
        duration = transitionDuration;
      }

      node.style.transition = [theme.transitions.create('opacity', {
        duration: duration,
        delay: delay
      }), theme.transitions.create('transform', {
        duration: duration * 0.666,
        delay: delay || duration * 0.333
      })].join(',');

      node.style.opacity = '0';
      node.style.transform = getScale(0.75);

      if (_this.props.onExit) {
        _this.props.onExit(node);
      }
    }, _this.addEndListener = function (node, next) {
      if (_this.props.timeout === 'auto') {
        setTimeout(next, _this.autoTimeout || 0);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Grow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          onEnter = _props.onEnter,
          onExit = _props.onExit,
          styleProp = _props.style,
          theme = _props.theme,
          timeout = _props.timeout,
          other = _objectWithoutProperties(_props, ['children', 'onEnter', 'onExit', 'style', 'theme', 'timeout']);

      var style = _extends$1({}, styleProp, React.isValidElement(children) ? children.props.style : {});

      return React.createElement(
        Transition,
        _extends$1({
          appear: true,
          onEnter: this.handleEnter,
          onExit: this.handleExit,
          addEndListener: this.addEndListener,
          timeout: timeout === 'auto' ? null : timeout
        }, other),
        function (state, childProps) {
          return React.cloneElement(children, _extends$1({
            style: _extends$1({
              opacity: 0,
              transform: getScale(0.75)
            }, styles$56[state], style)
          }, childProps));
        }
      );
    }
  }]);

  return Grow;
}(React.Component);

Grow.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A single child content element.
   */
  children: propTypes.oneOfType([propTypes.element, propTypes.func]),
  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in: propTypes.bool,
  /**
   * @ignore
   */
  onEnter: propTypes.func,
  /**
   * @ignore
   */
  onEntered: propTypes.func,
  /**
   * @ignore
   */
  onEntering: propTypes.func,
  /**
   * @ignore
   */
  onExit: propTypes.func,
  /**
   * @ignore
   */
  style: propTypes.object,
  /**
   * @ignore
   */
  theme: propTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number }), propTypes.oneOf(['auto'])])
} : {};

Grow.defaultProps = {
  timeout: 'auto'
};

var Grow$1 = withTheme()(Grow);

// @inheritedComponent Modal

function getOffsetTop(rect, vertical) {
  var offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

function getOffsetLeft(rect, horizontal) {
  var offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map(function (n) {
    return typeof n === 'number' ? n + 'px' : n;
  }).join(' ');
}

// Sum the scrollTop between two elements.
function getScrollParent(parent, child) {
  var element = child;
  var scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentNode;
    scrollTop += element.scrollTop;
  }
  return scrollTop;
}

var styles$57 = {
  paper: {
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    // So we see the popover when it's empty.
    // It's most likely on issue on userland.
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vh - 32px)',
    '&:focus': {
      outline: 'none'
    }
  }
};

var Popover = function (_React$Component) {
  _inherits(Popover, _React$Component);

  function Popover() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Popover);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popover.__proto__ || _Object$getPrototypeOf(Popover)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillUnmount = function () {
      _this.handleResize.cancel();
    }, _this.setPositioningStyles = function (element) {
      if (element && element.style) {
        var positioning = _this.getPositioningStyle(element);
        element.style.top = positioning.top;
        element.style.left = positioning.left;
        element.style.transformOrigin = positioning.transformOrigin;
      }
    }, _this.getPositioningStyle = function (element) {
      var _this$props = _this.props,
          anchorEl = _this$props.anchorEl,
          marginThreshold = _this$props.marginThreshold;

      // Check if the parent has requested anchoring on an inner content node

      var contentAnchorOffset = _this.getContentAnchorOffset(element);
      // Get the offset of of the anchoring element
      var anchorOffset = _this.getAnchorOffset(contentAnchorOffset);

      var elemRect = {
        width: element.clientWidth,
        height: element.clientHeight
      };
      // Get the transform origin point on the element itself
      var transformOrigin = _this.getTransformOrigin(elemRect, contentAnchorOffset);

      // Calculate element positioning
      var top = anchorOffset.top - transformOrigin.vertical;
      var left = anchorOffset.left - transformOrigin.horizontal;
      var bottom = top + elemRect.height;
      var right = left + elemRect.width;

      // Use the parent window of the anchorEl if provided
      var containerWindow = ownerWindow(anchorEl);

      // Window thresholds taking required margin into account
      var heightThreshold = containerWindow.innerHeight - marginThreshold;
      var widthThreshold = containerWindow.innerWidth - marginThreshold;

      // Check if the vertical axis needs shifting
      if (top < marginThreshold) {
        var diff = top - marginThreshold;
        top -= diff;
        transformOrigin.vertical += diff;
      } else if (bottom > heightThreshold) {
        var _diff = bottom - heightThreshold;
        top -= _diff;
        transformOrigin.vertical += _diff;
      }

      process.env.NODE_ENV !== "production" ? warning_1$2(elemRect.height < heightThreshold || !elemRect.height || !heightThreshold, ['Material-UI: the popover component is too tall.', 'Some part of it can not be seen on the screen (' + (elemRect.height - heightThreshold) + 'px).', 'Please consider adding a `max-height` to improve the user-experience.'].join('\n')) : void 0;

      // Check if the horizontal axis needs shifting
      if (left < marginThreshold) {
        var _diff2 = left - marginThreshold;
        left -= _diff2;
        transformOrigin.horizontal += _diff2;
      } else if (right > widthThreshold) {
        var _diff3 = right - widthThreshold;
        left -= _diff3;
        transformOrigin.horizontal += _diff3;
      }

      return {
        top: top + 'px',
        left: left + 'px',
        transformOrigin: getTransformOriginValue(transformOrigin)
      };
    }, _this.transitionEl = undefined, _this.handleGetOffsetTop = getOffsetTop, _this.handleGetOffsetLeft = getOffsetLeft, _this.handleEnter = function (element) {
      if (_this.props.onEnter) {
        _this.props.onEnter(element);
      }

      _this.setPositioningStyles(element);
    }, _this.handleResize = debounce_1(function () {
      var element = ReactDOM.findDOMNode(_this.transitionEl);
      _this.setPositioningStyles(element);
    }, 166), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Popover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.action) {
        this.props.action({
          updatePosition: this.handleResize
        });
      }
    }
  }, {
    key: 'getAnchorOffset',


    // Returns the top/left offset of the position
    // to attach to on the anchor element (or body if none is provided)
    value: function getAnchorOffset(contentAnchorOffset) {
      var _props = this.props,
          anchorEl = _props.anchorEl,
          anchorOrigin = _props.anchorOrigin,
          anchorReference = _props.anchorReference,
          anchorPosition = _props.anchorPosition;


      if (anchorReference === 'anchorPosition') {
        return anchorPosition;
      }

      var anchorElement = anchorEl || document.body;
      var anchorRect = anchorElement.getBoundingClientRect();
      var anchorVertical = contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';

      return {
        top: anchorRect.top + this.handleGetOffsetTop(anchorRect, anchorVertical),
        left: anchorRect.left + this.handleGetOffsetLeft(anchorRect, anchorOrigin.horizontal)
      };
    }

    // Returns the vertical offset of inner content to anchor the transform on if provided

  }, {
    key: 'getContentAnchorOffset',
    value: function getContentAnchorOffset(element) {
      var _props2 = this.props,
          getContentAnchorEl = _props2.getContentAnchorEl,
          anchorReference = _props2.anchorReference;

      var contentAnchorOffset = 0;

      if (getContentAnchorEl && anchorReference === 'anchorEl') {
        var contentAnchorEl = getContentAnchorEl(element);

        if (contentAnchorEl && contains$2(element, contentAnchorEl)) {
          var scrollTop = getScrollParent(element, contentAnchorEl);
          contentAnchorOffset = contentAnchorEl.offsetTop + contentAnchorEl.clientHeight / 2 - scrollTop || 0;
        }

        // != the default value
        process.env.NODE_ENV !== "production" ? warning_1$2(this.props.anchorOrigin.vertical === 'top', ['Material-UI: you can not change the default `anchorOrigin.vertical` value ', 'when also providing the `getContentAnchorEl` property to the popover component.', 'Only use one of the two properties.', 'Set `getContentAnchorEl` to null or left `anchorOrigin.vertical` unchanged.'].join('\n')) : void 0;
      }

      return contentAnchorOffset;
    }

    // Return the base transform origin using the element
    // and taking the content anchor offset into account if in use

  }, {
    key: 'getTransformOrigin',
    value: function getTransformOrigin(elemRect) {
      var contentAnchorOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var transformOrigin = this.props.transformOrigin;

      return {
        vertical: this.handleGetOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
        horizontal: this.handleGetOffsetLeft(elemRect, transformOrigin.horizontal)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          anchorEl = _props3.anchorEl,
          anchorOrigin = _props3.anchorOrigin,
          anchorPosition = _props3.anchorPosition,
          anchorReference = _props3.anchorReference,
          children = _props3.children,
          classes = _props3.classes,
          containerProp = _props3.container,
          elevation = _props3.elevation,
          getContentAnchorEl = _props3.getContentAnchorEl,
          marginThreshold = _props3.marginThreshold,
          onEnter = _props3.onEnter,
          onEntered = _props3.onEntered,
          onEntering = _props3.onEntering,
          onExit = _props3.onExit,
          onExited = _props3.onExited,
          onExiting = _props3.onExiting,
          open = _props3.open,
          PaperProps = _props3.PaperProps,
          role = _props3.role,
          transformOrigin = _props3.transformOrigin,
          TransitionProp = _props3.transition,
          transitionDuration = _props3.transitionDuration,
          action = _props3.action,
          other = _objectWithoutProperties(_props3, ['anchorEl', 'anchorOrigin', 'anchorPosition', 'anchorReference', 'children', 'classes', 'container', 'elevation', 'getContentAnchorEl', 'marginThreshold', 'onEnter', 'onEntered', 'onEntering', 'onExit', 'onExited', 'onExiting', 'open', 'PaperProps', 'role', 'transformOrigin', 'transition', 'transitionDuration', 'action']);

      // If the container prop is provided, use that
      // If the anchorEl prop is provided, use its parent body element as the container
      // If neither are provided let the Modal take care of choosing the container


      var container = containerProp || (anchorEl ? ownerDocument(anchorEl).body : undefined);

      var transitionProps = {};
      // The provided transition might not support the auto timeout value.
      if (TransitionProp === Grow$1) {
        transitionProps.timeout = transitionDuration;
      }

      return React.createElement(
        Modal$1,
        _extends$1({ container: container, open: open, BackdropProps: { invisible: true } }, other),
        React.createElement(
          TransitionProp,
          _extends$1({
            appear: true,
            'in': open,
            onEnter: this.handleEnter,
            onEntered: onEntered,
            onEntering: onEntering,
            onExit: onExit,
            onExited: onExited,
            onExiting: onExiting,
            role: role,
            ref: function ref(node) {
              _this2.transitionEl = node;
            }
          }, transitionProps),
          React.createElement(
            Paper$1,
            _extends$1({
              className: classes.paper,

              elevation: elevation
            }, PaperProps),
            React.createElement(EventListener, { target: 'window', onResize: this.handleResize }),
            children
          )
        )
      );
    }
  }]);

  return Popover;
}(React.Component);

Popover.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * This is callback property. It's called by the component on mount.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports updatePosition() action.
   *
   * @param {object} actions This object contains all posible actions
   * that can be triggered programmatically.
   */
  action: propTypes.func,
  /**
   * This is the DOM element that may be used
   * to set the position of the popover.
   */
  anchorEl: propTypes.object,
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   */
  anchorOrigin: propTypes.shape({
    horizontal: propTypes.oneOfType([propTypes.number, propTypes.oneOf(['left', 'center', 'right'])]),
    vertical: propTypes.oneOfType([propTypes.number, propTypes.oneOf(['top', 'center', 'bottom'])])
  }),
  /**
   * This is the position that may be used
   * to set the position of the popover.
   * The coordinates are relative to
   * the application's client area.
   */
  anchorPosition: propTypes.shape({
    top: propTypes.number,
    left: propTypes.number
  }),
  /*
   * This determines which anchor prop to refer to to set
   * the position of the popover.
   */
  anchorReference: propTypes.oneOf(['anchorEl', 'anchorPosition']),
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   * By default, it's using the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: propTypes.oneOfType([propTypes.object, propTypes.func]),
  /**
   * The elevation of the popover.
   */
  elevation: propTypes.number,
  /**
   * This function is called in order to retrieve the content anchor element.
   * It's the opposite of the `anchorEl` property.
   * The content anchor element should be an element inside the popover.
   * It's used to correctly scroll and set the position of the popover.
   * The positioning strategy tries to make the content anchor element just above the
   * anchor element.
   */
  getContentAnchorEl: propTypes.func,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   */
  marginThreshold: propTypes.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: propTypes.func,
  /**
   * Callback fired before the component is entering.
   */
  onEnter: propTypes.func,
  /**
   * Callback fired when the component has entered.
   */
  onEntered: propTypes.func,
  /**
   * Callback fired when the component is entering.
   */
  onEntering: propTypes.func,
  /**
   * Callback fired before the component is exiting.
   */
  onExit: propTypes.func,
  /**
   * Callback fired when the component has exited.
   */
  onExited: propTypes.func,
  /**
   * Callback fired when the component is exiting.
   */
  onExiting: propTypes.func,
  /**
   * If `true`, the popover is visible.
   */
  open: propTypes.bool.isRequired,
  /**
   * Properties applied to the `Paper` element.
   */
  PaperProps: propTypes.object,
  /**
   * @ignore
   */
  role: propTypes.string,
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   */
  transformOrigin: propTypes.shape({
    horizontal: propTypes.oneOfType([propTypes.number, propTypes.oneOf(['left', 'center', 'right'])]),
    vertical: propTypes.oneOfType([propTypes.number, propTypes.oneOf(['top', 'center', 'bottom'])])
  }),
  /**
   * Transition component.
   */
  transition: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number }), propTypes.oneOf(['auto'])])
} : {};

Popover.defaultProps = {
  anchorReference: 'anchorEl',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  elevation: 8,
  marginThreshold: 16,
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  transition: Grow$1,
  transitionDuration: 'auto'
};

var Popover$1 = withStyles(styles$57, { name: 'MuiPopover' })(Popover);

// @inheritedComponent List

var MenuList = function (_React$Component) {
  _inherits(MenuList, _React$Component);

  function MenuList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MenuList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuList.__proto__ || _Object$getPrototypeOf(MenuList)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentTabIndex: undefined
    }, _this.list = undefined, _this.selectedItem = undefined, _this.blurTimer = undefined, _this.handleBlur = function (event) {
      _this.blurTimer = setTimeout(function () {
        if (_this.list) {
          var list = findDOMNode(_this.list);
          var currentFocus = activeElement(ownerDocument(list));
          if (!contains$2(list, currentFocus)) {
            _this.resetTabIndex();
          }
        }
      }, 30);

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    }, _this.handleKeyDown = function (event) {
      var list = findDOMNode(_this.list);
      var key = keycode(event);
      var currentFocus = activeElement(ownerDocument(list));

      if ((key === 'up' || key === 'down') && (!currentFocus || currentFocus && !contains$2(list, currentFocus))) {
        if (_this.selectedItem) {
          findDOMNode(_this.selectedItem).focus();
        } else {
          list.firstChild.focus();
        }
      } else if (key === 'down') {
        event.preventDefault();
        if (currentFocus.nextElementSibling) {
          currentFocus.nextElementSibling.focus();
        }
      } else if (key === 'up') {
        event.preventDefault();
        if (currentFocus.previousElementSibling) {
          currentFocus.previousElementSibling.focus();
        }
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(event, key);
      }
    }, _this.handleItemFocus = function (event) {
      var list = findDOMNode(_this.list);
      if (list) {
        for (var i = 0; i < list.children.length; i += 1) {
          if (list.children[i] === event.currentTarget) {
            _this.setTabIndex(i);
            break;
          }
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MenuList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resetTabIndex();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.blurTimer);
    }
  }, {
    key: 'setTabIndex',
    value: function setTabIndex(index) {
      this.setState({ currentTabIndex: index });
    }
  }, {
    key: 'focus',
    value: function focus() {
      var currentTabIndex = this.state.currentTabIndex;

      var list = findDOMNode(this.list);
      if (!list || !list.children || !list.firstChild) {
        return;
      }

      if (currentTabIndex && currentTabIndex >= 0) {
        list.children[currentTabIndex].focus();
      } else {
        list.firstChild.focus();
      }
    }
  }, {
    key: 'resetTabIndex',
    value: function resetTabIndex() {
      var list = findDOMNode(this.list);
      var currentFocus = activeElement(ownerDocument(list));
      var items = [].concat(_toConsumableArray(list.children));
      var currentFocusIndex = items.indexOf(currentFocus);

      if (currentFocusIndex !== -1) {
        return this.setTabIndex(currentFocusIndex);
      }

      if (this.selectedItem) {
        return this.setTabIndex(items.indexOf(findDOMNode(this.selectedItem)));
      }

      return this.setTabIndex(0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          onBlur = _props.onBlur,
          onKeyDown = _props.onKeyDown,
          other = _objectWithoutProperties(_props, ['children', 'className', 'onBlur', 'onKeyDown']);

      return React.createElement(
        List$1,
        _extends$1({
          role: 'menu',
          ref: function ref(node) {
            _this2.list = node;
          },
          className: className,
          onKeyDown: this.handleKeyDown,
          onBlur: this.handleBlur
        }, other),
        React.Children.map(children, function (child, index) {
          if (!React.isValidElement(child)) {
            return null;
          }

          return React.cloneElement(child, {
            tabIndex: index === _this2.state.currentTabIndex ? 0 : -1,
            ref: child.props.selected ? function (node) {
              _this2.selectedItem = node;
            } : undefined,
            onFocus: _this2.handleItemFocus
          });
        })
      );
    }
  }]);

  return MenuList;
}(React.Component);

MenuList.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: propTypes.node,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   */
  onBlur: propTypes.func,
  /**
   * @ignore
   */
  onKeyDown: propTypes.func
} : {};

// @inheritedComponent Popover

var RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right'
};

var LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left'
};

var styles$58 = {
  paper: {
    // specZ: The maximum height of a simple menu should be one or more rows less than the view
    // height. This ensures a tappable area outside of the simple menu with which to dismiss
    // the menu.
    maxHeight: 'calc(100vh - 96px)',
    // Add iOS momentum scrolling.
    WebkitOverflowScrolling: 'touch'
  }
};

var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Menu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Menu.__proto__ || _Object$getPrototypeOf(Menu)).call.apply(_ref, [this].concat(args))), _this), _this.getContentAnchorEl = function () {
      if (!_this.menuList || !_this.menuList.selectedItem) {
        return findDOMNode(_this.menuList).firstChild;
      }

      return findDOMNode(_this.menuList.selectedItem);
    }, _this.menuList = undefined, _this.focus = function () {
      if (_this.menuList && _this.menuList.selectedItem) {
        findDOMNode(_this.menuList.selectedItem).focus();
        return;
      }

      var menuList = findDOMNode(_this.menuList);
      if (menuList && menuList.firstChild) {
        menuList.firstChild.focus();
      }
    }, _this.handleEnter = function (element) {
      var theme = _this.props.theme;

      var menuList = findDOMNode(_this.menuList);

      // Focus so the scroll computation of the Popover works as expected.
      _this.focus();

      // Let's ignore that piece of logic if users are already overriding the width
      // of the menu.
      if (menuList && element.clientHeight < menuList.clientHeight && !menuList.style.width) {
        var size = getScrollbarSize() + 'px';
        menuList.style[theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = size;
        menuList.style.width = 'calc(100% + ' + size + ')';
      }

      if (_this.props.onEnter) {
        _this.props.onEnter(element);
      }
    }, _this.handleListKeyDown = function (event, key) {
      if (key === 'tab') {
        event.preventDefault();

        if (_this.props.onClose) {
          _this.props.onClose(event);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Menu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.open) {
        this.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          classes = _props.classes,
          MenuListProps = _props.MenuListProps,
          onEnter = _props.onEnter,
          _props$PaperProps = _props.PaperProps,
          PaperProps = _props$PaperProps === undefined ? {} : _props$PaperProps,
          PopoverClasses = _props.PopoverClasses,
          theme = _props.theme,
          other = _objectWithoutProperties(_props, ['children', 'classes', 'MenuListProps', 'onEnter', 'PaperProps', 'PopoverClasses', 'theme']);

      return React.createElement(
        Popover$1,
        _extends$1({
          getContentAnchorEl: this.getContentAnchorEl,
          classes: PopoverClasses,
          onEnter: this.handleEnter,
          anchorOrigin: theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN,
          transformOrigin: theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN,
          PaperProps: _extends$1({}, PaperProps, {
            classes: _extends$1({}, PaperProps.classes, {
              root: classes.paper
            })
          })
        }, other),
        React.createElement(
          MenuList,
          _extends$1({
            role: 'menu',
            onKeyDown: this.handleListKeyDown
          }, MenuListProps, {
            ref: function ref(node) {
              _this2.menuList = node;
            }
          }),
          children
        )
      );
    }
  }]);

  return Menu;
}(React.Component);

Menu.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The DOM element used to set the position of the menu.
   */
  anchorEl: propTypes.object,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * Properties applied to the `MenuList` element.
   */
  MenuListProps: propTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: propTypes.func,
  /**
   * Callback fired before the Menu enters.
   */
  onEnter: propTypes.func,
  /**
   * Callback fired when the Menu has entered.
   */
  onEntered: propTypes.func,
  /**
   * Callback fired when the Menu is entering.
   */
  onEntering: propTypes.func,
  /**
   * Callback fired before the Menu exits.
   */
  onExit: propTypes.func,
  /**
   * Callback fired when the Menu has exited.
   */
  onExited: propTypes.func,
  /**
   * Callback fired when the Menu is exiting.
   */
  onExiting: propTypes.func,
  /**
   * If `true`, the menu is visible.
   */
  open: propTypes.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: propTypes.object,
  /**
   * `classes` property applied to the `Popover` element.
   */
  PopoverClasses: propTypes.object,
  /**
   * @ignore
   */
  theme: propTypes.object.isRequired,
  /**
   * The length of the transition in `ms`, or 'auto'
   */
  transitionDuration: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number }), propTypes.oneOf(['auto'])])
} : {};

Menu.defaultProps = {
  transitionDuration: 'auto'
};

var Menu$1 = withStyles(styles$58, { name: 'MuiMenu', withTheme: true })(Menu);

// @inheritedComponent ListItem

var styles$59 = function styles(theme) {
  return {
    root: _extends$1({}, theme.typography.subheading, {
      height: theme.spacing.unit * 3,
      boxSizing: 'content-box',
      width: 'auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '&$selected': {
        backgroundColor: theme.palette.action.selected
      }
    }),
    selected: {}
  };
};

function MenuItem(props) {
  var classes = props.classes,
      classNameProp = props.className,
      component = props.component,
      selected = props.selected,
      role = props.role,
      other = _objectWithoutProperties(props, ['classes', 'className', 'component', 'selected', 'role']);

  var className = classnames(classes.root, _defineProperty$1({}, classes.selected, selected), classNameProp);

  return React.createElement(ListItem$1, _extends$1({
    button: true,
    role: role,
    tabIndex: -1,
    className: className,
    component: component
  }, other));
}

MenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Menu item contents.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * @ignore
   */
  role: propTypes.string,
  /**
   * Use to apply selected styling.
   */
  selected: propTypes.bool
} : {};

MenuItem.defaultProps = {
  component: 'li',
  role: 'menuitem',
  selected: false
};

var MenuItem$1 = withStyles(styles$59, { name: 'MuiMenuItem' })(MenuItem);

var SIZE$1 = 50;

function getRelativeValue(value, min, max) {
  var clampedValue = Math.min(Math.max(min, value), max);
  return (clampedValue - min) / (max - min);
}

function easeOut(t) {
  t = getRelativeValue(t, 0, 1);
  // https://gist.github.com/gre/1650294
  t = (t -= 1) * t * t + 1;
  return t;
}

function easeIn(t) {
  return t * t;
}

var styles$60 = function styles(theme) {
  return {
    root: {
      display: 'inline-block'
    },
    colorPrimary: {
      color: theme.palette.primary.main
    },
    colorSecondary: {
      color: theme.palette.secondary.main
    },
    svgIndeterminate: {
      animation: 'mui-progress-circular-rotate 1.4s linear infinite'
    },
    svgDeterminate: {},
    circle: {
      stroke: 'currentColor',
      strokeLinecap: 'round'
    },
    circleIndeterminate: {
      animation: 'mui-progress-circular-dash 1.4s ease-in-out infinite',
      // Some default value that looks fine waiting for the animation to kicks in.
      strokeDasharray: '80px, 200px',
      strokeDashoffset: '0px' // Add the unit to fix a Edge 16 and below bug.
    },
    '@keyframes mui-progress-circular-rotate': {
      '100%': {
        transform: 'rotate(360deg)'
      }
    },
    '@keyframes mui-progress-circular-dash': {
      '0%': {
        strokeDasharray: '1px, 200px',
        strokeDashoffset: '0px'
      },
      '50%': {
        strokeDasharray: '100px, 200px',
        strokeDashoffset: '-15px'
      },
      '100%': {
        strokeDasharray: '100px, 200px',
        strokeDashoffset: '-120px'
      }
    }
  };
};

/**
 * ## ARIA
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
function CircularProgress(props) {
  var _classNames2;

  var classes = props.classes,
      className = props.className,
      color = props.color,
      max = props.max,
      min = props.min,
      size = props.size,
      style = props.style,
      thickness = props.thickness,
      value = props.value,
      variant = props.variant,
      other = _objectWithoutProperties(props, ['classes', 'className', 'color', 'max', 'min', 'size', 'style', 'thickness', 'value', 'variant']);

  var circleStyle = {};
  var rootStyle = { width: size, height: size };
  var rootProps = {};

  if (variant === 'determinate') {
    var relVal = getRelativeValue(value, min, max) * 100;
    var circumference = 2 * Math.PI * (SIZE$1 / 2 - 5);

    circleStyle.strokeDashoffset = (easeIn((100 - relVal) / 100) * circumference).toFixed(3) + 'px';
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootStyle.transform = 'rotate(' + (easeOut(relVal / 70) * 270).toFixed(3) + 'deg)';
    rootProps['aria-valuenow'] = Math.round(relVal);
  }

  return React.createElement(
    'div',
    _extends$1({
      className: classnames(classes.root, _defineProperty$1({}, classes['color' + capitalize(color)], color !== 'inherit'), className),
      style: _extends$1({}, rootStyle, style),
      role: 'progressbar'
    }, rootProps, other),
    React.createElement(
      'svg',
      {
        className: classnames((_classNames2 = {}, _defineProperty$1(_classNames2, classes.svgIndeterminate, variant === 'indeterminate'), _defineProperty$1(_classNames2, classes.svgDeterminate, variant === 'determinate'), _classNames2)),
        viewBox: '0 0 ' + SIZE$1 + ' ' + SIZE$1
      },
      React.createElement('circle', {
        className: classnames(classes.circle, _defineProperty$1({}, classes.circleIndeterminate, variant === 'indeterminate')),
        style: circleStyle,
        cx: SIZE$1 / 2,
        cy: SIZE$1 / 2,
        r: SIZE$1 / 2 - 5,
        fill: 'none',
        strokeWidth: thickness
      })
    )
  );
}

CircularProgress.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: propTypes.oneOf(['primary', 'secondary', 'inherit']),
  /**
   * The max value of progress in determinate variant.
   */
  max: propTypes.number,
  /**
   * The min value of progress in determinate variant.
   */
  min: propTypes.number,
  /**
   * The size of the circle.
   */
  size: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /**
   * @ignore
   */
  style: propTypes.object,
  /**
   * The thickness of the circle.
   */
  thickness: propTypes.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: propTypes.number,
  /**
   * The variant of progress indicator. Use indeterminate
   * when there is no progress value.
   */
  variant: propTypes.oneOf(['determinate', 'indeterminate'])
} : {};

CircularProgress.defaultProps = {
  color: 'primary',
  max: 100,
  min: 0,
  size: 40,
  thickness: 3.6,
  value: 0,
  variant: 'indeterminate'
};

var CircularProgress$1 = withStyles(styles$60, { name: 'MuiCircularProgress', flip: false })(CircularProgress);

var TRANSITION_DURATION = 4; // 400ms

var styles$61 = function styles(theme) {
  return {
    root: {
      position: 'relative',
      overflow: 'hidden',
      height: 5
    },
    primaryColor: {
      backgroundColor: lighten(theme.palette.primary.light, 0.6)
    },
    primaryColorBar: {
      backgroundColor: theme.palette.primary.main
    },
    primaryDashed: {
      background: 'radial-gradient(' + lighten(theme.palette.primary.light, 0.6) + ' 0%, ' + lighten(theme.palette.primary.light, 0.6) + ' 16%, transparent 42%)',
      backgroundSize: '10px 10px',
      backgroundPosition: '0px -23px'
    },
    secondaryColor: {
      backgroundColor: lighten(theme.palette.secondary.light, 0.4)
    },
    secondaryColorBar: {
      backgroundColor: theme.palette.secondary.main
    },
    secondaryDashed: {
      background: 'radial-gradient(' + lighten(theme.palette.secondary.light, 0.4) + ' 0%, ' + lighten(theme.palette.secondary.light, 0.6) + ' 16%, transparent 42%)',
      backgroundSize: '10px 10px',
      backgroundPosition: '0px -23px'
    },
    bar: {
      width: '100%',
      position: 'absolute',
      left: 0,
      bottom: 0,
      top: 0,
      transition: 'transform 0.2s linear',
      transformOrigin: 'left'
    },
    dashed: {
      position: 'absolute',
      marginTop: 0,
      height: '100%',
      width: '100%',
      animation: 'buffer 3s infinite linear'
    },
    bufferBar2: {
      transition: 'transform .' + TRANSITION_DURATION + 's linear'
    },
    rootBuffer: {
      backgroundColor: 'transparent'
    },
    rootQuery: {
      transform: 'rotate(180deg)'
    },
    indeterminateBar1: {
      width: 'auto',
      willChange: 'left, right',
      animation: 'mui-indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite'
    },
    indeterminateBar2: {
      width: 'auto',
      willChange: 'left, right',
      animation: 'mui-indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
      animationDelay: '1.15s'
    },
    determinateBar1: {
      willChange: 'transform',
      transition: 'transform .' + TRANSITION_DURATION + 's linear'
    },
    bufferBar1: {
      zIndex: 1,
      transition: 'transform .' + TRANSITION_DURATION + 's linear'
    },
    // Legends:
    // || represents the viewport
    // -  represents a light background
    // x  represents a dark background
    '@keyframes mui-indeterminate1': {
      //  |-----|---x-||-----||-----|
      '0%': {
        left: '-35%',
        right: '100%'
      },
      //  |-----|-----||-----||xxxx-|
      '60%': {
        left: '100%',
        right: '-90%'
      },
      '100%': {
        left: '100%',
        right: '-90%'
      }
    },
    '@keyframes mui-indeterminate2': {
      //  |xxxxx|xxxxx||-----||-----|
      '0%': {
        left: '-200%',
        right: '100%'
      },
      //  |-----|-----||-----||-x----|
      '60%': {
        left: '107%',
        right: '-8%'
      },
      '100%': {
        left: '107%',
        right: '-8%'
      }
    },
    '@keyframes buffer': {
      '0%': {
        opacity: 1,
        backgroundPosition: '0px -23px'
      },
      '50%': {
        opacity: 0,
        backgroundPosition: '0px -23px'
      },
      '100%': {
        opacity: 1,
        backgroundPosition: '-200px -23px'
      }
    }
  };
};

/**
 * ## ARIA
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
function LinearProgress(props) {
  var _classNames, _classNames2, _classNames3, _classNames4;

  var classes = props.classes,
      className = props.className,
      color = props.color,
      value = props.value,
      valueBuffer = props.valueBuffer,
      variant = props.variant,
      other = _objectWithoutProperties(props, ['classes', 'className', 'color', 'value', 'valueBuffer', 'variant']);

  var dashedClass = classnames(classes.dashed, (_classNames = {}, _defineProperty$1(_classNames, classes.primaryDashed, color === 'primary'), _defineProperty$1(_classNames, classes.secondaryDashed, color === 'secondary'), _classNames));

  var rootClassName = classnames(classes.root, (_classNames2 = {}, _defineProperty$1(_classNames2, classes.primaryColor, color === 'primary'), _defineProperty$1(_classNames2, classes.secondaryColor, color === 'secondary'), _defineProperty$1(_classNames2, classes.rootBuffer, variant === 'buffer'), _defineProperty$1(_classNames2, classes.rootQuery, variant === 'query'), _classNames2), className);
  var primaryClassName = classnames(classes.bar, (_classNames3 = {}, _defineProperty$1(_classNames3, classes.primaryColorBar, color === 'primary'), _defineProperty$1(_classNames3, classes.secondaryColorBar, color === 'secondary'), _defineProperty$1(_classNames3, classes.indeterminateBar1, variant === 'indeterminate' || variant === 'query'), _defineProperty$1(_classNames3, classes.determinateBar1, variant === 'determinate'), _defineProperty$1(_classNames3, classes.bufferBar1, variant === 'buffer'), _classNames3));
  var secondaryClassName = classnames(classes.bar, (_classNames4 = {}, _defineProperty$1(_classNames4, classes.bufferBar2, variant === 'buffer'), _defineProperty$1(_classNames4, classes.primaryColorBar, color === 'primary' && variant !== 'buffer'), _defineProperty$1(_classNames4, classes.primaryColor, color === 'primary' && variant === 'buffer'), _defineProperty$1(_classNames4, classes.secondaryColorBar, color === 'secondary' && variant !== 'buffer'), _defineProperty$1(_classNames4, classes.secondaryColor, color === 'secondary' && variant === 'buffer'), _defineProperty$1(_classNames4, classes.indeterminateBar2, variant === 'indeterminate' || variant === 'query'), _classNames4));
  var inlineStyles = { primary: {}, secondary: {} };
  var rootProps = {};

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      inlineStyles.primary.transform = 'scaleX(' + value / 100 + ')';
      rootProps['aria-valuenow'] = Math.round(value);
    } else {
      process.env.NODE_ENV !== "production" ? warning_1$2(false, 'Material-UI: you need to provide a value property ' + 'when using the determinate or buffer variant of LinearProgress .') : void 0;
    }
  }
  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      inlineStyles.secondary.transform = 'scaleX(' + (valueBuffer || 0) / 100 + ')';
    } else {
      process.env.NODE_ENV !== "production" ? warning_1$2(false, 'Material-UI: you need to provide a valueBuffer property ' + 'when using the buffer variant of LinearProgress.') : void 0;
    }
  }

  return React.createElement(
    'div',
    _extends$1({ className: rootClassName, role: 'progressbar' }, rootProps, other),
    variant === 'buffer' ? React.createElement('div', { className: dashedClass }) : null,
    React.createElement('div', { className: primaryClassName, style: inlineStyles.primary }),
    variant === 'determinate' ? null : React.createElement('div', { className: secondaryClassName, style: inlineStyles.secondary })
  );
}

LinearProgress.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: propTypes.oneOf(['primary', 'secondary']),
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: propTypes.number,
  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer: propTypes.number,
  /**
   * The variant of progress indicator. Use indeterminate or query
   * when there is no progress value.
   */
  variant: propTypes.oneOf(['determinate', 'indeterminate', 'buffer', 'query'])
} : {};

LinearProgress.defaultProps = {
  color: 'primary',
  variant: 'indeterminate'
};

var LinearProgress$1 = withStyles(styles$61, { name: 'MuiLinearProgress' })(LinearProgress);

// @inheritedComponent Paper

var styles$62 = function styles(theme) {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: theme.palette.background.default,
      padding: theme.spacing.unit
    },
    positionBottom: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: theme.zIndex.mobileStepper
    },
    positionTop: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: theme.zIndex.mobileStepper
    },
    positionStatic: {},
    dots: {
      display: 'flex',
      flexDirection: 'row'
    },
    dot: {
      backgroundColor: theme.palette.action.disabled,
      borderRadius: '50%',
      width: theme.spacing.unit,
      height: theme.spacing.unit,
      margin: '0 2px'
    },
    dotActive: {
      backgroundColor: theme.palette.primary.main
    },
    progress: {
      width: '50%'
    }
  };
};

function MobileStepper(props) {
  var activeStep = props.activeStep,
      backButton = props.backButton,
      classes = props.classes,
      classNameProp = props.className,
      nextButton = props.nextButton,
      position = props.position,
      steps = props.steps,
      variant = props.variant,
      other = _objectWithoutProperties(props, ['activeStep', 'backButton', 'classes', 'className', 'nextButton', 'position', 'steps', 'variant']);

  var className = classnames(classes.root, classes['position' + capitalize(position)], classNameProp);

  return React.createElement(
    Paper$1,
    _extends$1({ square: true, elevation: 0, className: className }, other),
    backButton,
    variant === 'dots' && React.createElement(
      'div',
      { className: classes.dots },
      [].concat(_toConsumableArray(new Array(steps))).map(function (_, step) {
        var dotClassName = classnames(_defineProperty$1({}, classes.dotActive, step === activeStep), classes.dot);
        // eslint-disable-next-line react/no-array-index-key
        return React.createElement('div', { key: step, className: dotClassName });
      })
    ),
    variant === 'progress' && React.createElement(
      'div',
      { className: classes.progress },
      React.createElement(LinearProgress$1, { variant: 'determinate', value: Math.ceil(activeStep / (steps - 1) * 100) })
    ),
    nextButton
  );
}

MobileStepper.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   */
  activeStep: propTypes.number,
  /**
   * A back button element. For instance, it can be be a `Button` or a `IconButton`.
   */
  backButton: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * A next button element. For instance, it can be be a `Button` or a `IconButton`.
   */
  nextButton: propTypes.node,
  /**
   * Set the positioning type.
   */
  position: propTypes.oneOf(['bottom', 'top', 'static']),
  /**
   * The total steps.
   */
  steps: propTypes.number.isRequired,
  /**
   * The type of mobile stepper to use.
   */
  variant: propTypes.oneOf(['text', 'dots', 'progress'])
} : {};

MobileStepper.defaultProps = {
  activeStep: 0,
  position: 'bottom',
  variant: 'dots'
};

var MobileStepper$1 = withStyles(styles$62, { name: 'MuiMobileStepper' })(MobileStepper);

/**
 * @ignore - internal component.
 */

var _ref$4 = React.createElement('path', { d: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' });

var RadioButtonChecked = function RadioButtonChecked(props) {
  return React.createElement(
    SvgIcon$1,
    props,
    _ref$4
  );
};
RadioButtonChecked = pure(RadioButtonChecked);
RadioButtonChecked.muiName = 'SvgIcon';

var RadioButtonCheckedIcon = RadioButtonChecked;

/**
 * @ignore - internal component.
 */

var _ref$5 = React.createElement('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' });

var RadioButtonUnchecked = function RadioButtonUnchecked(props) {
  return React.createElement(
    SvgIcon$1,
    props,
    _ref$5
  );
};
RadioButtonUnchecked = pure(RadioButtonUnchecked);
RadioButtonUnchecked.muiName = 'SvgIcon';

var RadioButtonUncheckedIcon = RadioButtonUnchecked;

var styles$63 = function styles(theme) {
  return {
    default: {
      color: theme.palette.text.secondary
    },
    checked: {
      color: theme.palette.primary.main
    },
    disabled: {
      color: theme.palette.action.disabled
    }
  };
};

var _ref$6 = React.createElement(RadioButtonUncheckedIcon, null);

var _ref2 = React.createElement(RadioButtonCheckedIcon, null);

function Radio(props) {
  return React.createElement(SwitchBase$1, _extends$1({
    inputType: 'radio',
    icon: _ref$6,
    checkedIcon: _ref2
  }, props));
}

Radio.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If `true`, the component is checked.
   */
  checked: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   */
  defaultChecked: propTypes.bool,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: propTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: propTypes.node,
  /**
   * Properties applied to the `input` element.
   */
  inputProps: propTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: propTypes.func,
  /**
   * The input component property `type`.
   */
  inputType: propTypes.string,
  /*
   * @ignore
   */
  name: propTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: propTypes.func,
  /**
   * @ignore
   */
  tabIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /**
   * The value of the component.
   */
  value: propTypes.string
} : {};

var Radio$1 = withStyles(styles$63, { name: 'MuiRadio' })(Radio);

// @inheritedComponent FormGroup

var RadioGroup = function (_React$Component) {
  _inherits(RadioGroup, _React$Component);

  function RadioGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RadioGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioGroup.__proto__ || _Object$getPrototypeOf(RadioGroup)).call.apply(_ref, [this].concat(args))), _this), _this.radios = [], _this.focus = function () {
      if (!_this.radios || !_this.radios.length) {
        return;
      }

      var focusRadios = _this.radios.filter(function (n) {
        return !n.disabled;
      });

      if (!focusRadios.length) {
        return;
      }

      var selectedRadio = find(focusRadios, function (n) {
        return n.checked;
      });

      if (selectedRadio) {
        selectedRadio.focus();
        return;
      }

      focusRadios[0].focus();
    }, _this.handleRadioChange = function (event, checked) {
      if (checked && _this.props.onChange) {
        _this.props.onChange(event, event.target.value);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadioGroup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          name = _props.name,
          value = _props.value,
          onChange = _props.onChange,
          other = _objectWithoutProperties(_props, ['children', 'name', 'value', 'onChange']);

      this.radios = [];

      return React.createElement(
        FormGroup$1,
        _extends$1({ role: 'radiogroup' }, other),
        React.Children.map(children, function (child, index) {
          if (!React.isValidElement(child)) {
            return null;
          }

          return React.cloneElement(child, {
            key: index,
            name: name,
            inputRef: function inputRef(node) {
              if (node) {
                _this2.radios.push(node);
              }
            },
            checked: value === child.props.value,
            onChange: _this2.handleRadioChange
          });
        })
      );
    }
  }]);

  return RadioGroup;
}(React.Component);

RadioGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * The name used to reference the value of the control.
   */
  name: propTypes.string,
  /**
   * @ignore
   */
  onBlur: propTypes.func,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback
   * @param {string} value The `value` of the selected radio button
   */
  onChange: propTypes.func,
  /**
   * @ignore
   */
  onKeyDown: propTypes.func,
  /**
   * Value of the selected radio button.
   */
  value: propTypes.string
} : {};

function createBroadcast (initialState) {
  var listeners = {};
  var id = 1;
  var _state = initialState;

  function getState () {
    return _state
  }

  function setState (state) {
    _state = state;
    var keys = Object.keys(listeners);
    var i = 0;
    var len = keys.length;
    for (; i < len; i++) {
      // if a listener gets unsubscribed during setState we just skip it
      if (listeners[keys[i]]) { listeners[keys[i]](state); }
    }
  }

  // subscribe to changes and return the subscriptionId
  function subscribe (listener) {
    if (typeof listener !== 'function') {
      throw new Error('listener must be a function.')
    }
    var currentId = id;
    listeners[currentId] = listener;
    id += 1;
    return currentId
  }

  // remove subscription by removing the listener function
  function unsubscribe (id) {
    listeners[id] = undefined;
  }

  return { getState: getState, setState: setState, subscribe: subscribe, unsubscribe: unsubscribe }
}

/**
 * This component takes a `theme` property.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */

var MuiThemeProvider = function (_React$Component) {
  _inherits(MuiThemeProvider, _React$Component);

  function MuiThemeProvider(props, context) {
    _classCallCheck(this, MuiThemeProvider);

    // Get the outer theme from the context, can be null
    var _this = _possibleConstructorReturn(this, (MuiThemeProvider.__proto__ || _Object$getPrototypeOf(MuiThemeProvider)).call(this, props, context));

    _this.broadcast = createBroadcast();
    _this.unsubscribeId = null;
    _this.outerTheme = null;
    _this.outerTheme = themeListener.initial(context);
    // Propagate the theme so it can be accessed by the children
    _this.broadcast.setState(_this.mergeOuterLocalTheme(_this.props.theme));
    return _this;
  }

  _createClass(MuiThemeProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _ref;

      var _props = this.props,
          sheetsManager = _props.sheetsManager,
          disableStylesGeneration = _props.disableStylesGeneration;

      var muiThemeProviderOptions = this.context.muiThemeProviderOptions || {};

      if (sheetsManager !== undefined) {
        muiThemeProviderOptions.sheetsManager = sheetsManager;
      }

      if (disableStylesGeneration !== undefined) {
        muiThemeProviderOptions.disableStylesGeneration = disableStylesGeneration;
      }

      return _ref = {}, _defineProperty$1(_ref, CHANNEL, this.broadcast), _defineProperty$1(_ref, 'muiThemeProviderOptions', muiThemeProviderOptions), _ref;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // Subscribe on the outer theme, if present
      this.unsubscribeId = themeListener.subscribe(this.context, function (outerTheme) {
        _this2.outerTheme = outerTheme;
        // Forward the parent theme update to the children
        _this2.broadcast.setState(_this2.mergeOuterLocalTheme(_this2.props.theme));
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Propagate a local theme update
      if (this.props.theme !== nextProps.theme) {
        this.broadcast.setState(this.mergeOuterLocalTheme(nextProps.theme));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.unsubscribeId !== null) {
        themeListener.unsubscribe(this.context, this.unsubscribeId);
      }
    }
    // We are not using the React state in order to avoid unnecessary rerender.

  }, {
    key: 'mergeOuterLocalTheme',


    // Simple merge between the outer theme and the local theme
    value: function mergeOuterLocalTheme(localTheme) {
      // To support composition of theme.
      if (typeof localTheme === 'function') {
        process.env.NODE_ENV !== "production" ? warning_1$2(this.outerTheme, ['Material-UI: you are providing a theme function property ' + 'to the MuiThemeProvider component:', '<MuiThemeProvider theme={outerTheme => outerTheme} />', '', 'However, no outer theme is present.', 'Make sure a theme is already injected higher in the React tree ' + 'or provide a theme object.'].join('\n')) : void 0;
        return localTheme(this.outerTheme);
      }

      if (!this.outerTheme) {
        return localTheme;
      }

      return _extends$1({}, this.outerTheme, localTheme);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return MuiThemeProvider;
}(React.Component);

MuiThemeProvider.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * You can only provide a single element with react@15, a node with react@16.
   */
  children: propTypes.node.isRequired,
  /**
   * You can disable the generation of the styles with this option.
   * It can be useful when traversing the React tree outside of the HTML
   * rendering step on the server.
   * Let's say you are using react-apollo to extract all
   * the queries made by the interface server side.
   * You can significantly speed up the traversal with this property.
   */
  disableStylesGeneration: propTypes.bool,
  /**
   * The sheetsManager is used to deduplicate style sheet injection in the page.
   * It's deduplicating using the (theme, styles) couple.
   * On the server, you should provide a new instance for each request.
   */
  sheetsManager: propTypes.object,
  /**
   * A theme object.
   */
  theme: propTypes.oneOfType([propTypes.object, propTypes.func]).isRequired
} : {};

MuiThemeProvider.propTypes = process.env.NODE_ENV !== "production" ? exactProp(MuiThemeProvider.propTypes, 'MuiThemeProvider') : {};

MuiThemeProvider.childContextTypes = _extends$1({}, themeListener.contextTypes, {
  muiThemeProviderOptions: propTypes.object
});

MuiThemeProvider.contextTypes = _extends$1({}, themeListener.contextTypes, {
  muiThemeProviderOptions: propTypes.object
});

var styles$64 = function styles(theme) {
  return {
    '@global': {
      html: {
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        // Change from `box-sizing: content-box` so that `width`
        // is not affected by `padding` or `border`.
        boxSizing: 'border-box'
      },
      '*, *::before, *::after': {
        boxSizing: 'inherit'
      },
      body: {
        margin: 0, // Remove the margin in all browsers.
        backgroundColor: theme.palette.background.default,
        '@media print': {
          // Save printer ink.
          backgroundColor: theme.palette.common.white
        }
      }
    }
  };
};

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */

var Reboot = function (_React$Component) {
  _inherits(Reboot, _React$Component);

  function Reboot() {
    _classCallCheck(this, Reboot);

    return _possibleConstructorReturn(this, (Reboot.__proto__ || _Object$getPrototypeOf(Reboot)).apply(this, arguments));
  }

  _createClass(Reboot, [{
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return Reboot;
}(React.Component);

Reboot.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * You can only provide a single element with react@15, a node with react@16.
   */
  children: propTypes.node,
  /**
   * @ignore
   */
  classes: propTypes.object.isRequired
} : {};

Reboot.propTypes = process.env.NODE_ENV !== "production" ? exactProp(Reboot.propTypes, 'Reboot') : {};

Reboot.defaultProps = {
  children: null
};

var Reboot$1 = withStyles(styles$64, { name: 'MuiReboot' })(Reboot);

/**
 * @ignore - internal component.
 */

var _ref$7 = React.createElement('path', { d: 'M7 10l5 5 5-5z' });

var ArrowDropDown = function ArrowDropDown(props) {
  return React.createElement(
    SvgIcon$1,
    props,
    _ref$7
  );
};

ArrowDropDown = pure(ArrowDropDown);
ArrowDropDown.muiName = 'SvgIcon';

var ArrowDropDownIcon = ArrowDropDown;

/**
 * @ignore - internal component.
 */

var SelectInput = function (_React$Component) {
  _inherits(SelectInput, _React$Component);

  function SelectInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectInput.__proto__ || _Object$getPrototypeOf(SelectInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.ignoreNextBlur = false, _this.displayNode = null, _this.isControlled = _this.props.open !== undefined, _this.update = _this.isControlled ? function (_ref2) {
      var event = _ref2.event,
          open = _ref2.open;

      if (open) {
        _this.props.onOpen(event);
      } else {
        _this.props.onClose(event);
      }
    } : function (_ref3) {
      var open = _ref3.open;
      return _this.setState({ open: open });
    }, _this.handleClick = function (event) {
      // Opening the menu is going to blur the. It will be focused back when closed.
      _this.ignoreNextBlur = true;
      _this.update({
        open: true,
        event: event
      });
    }, _this.handleClose = function (event) {
      _this.update({
        open: false,
        event: event
      });
    }, _this.handleItemClick = function (child) {
      return function (event) {
        if (!_this.props.multiple) {
          _this.update({
            open: false,
            event: event
          });
        }

        var _this$props = _this.props,
            onChange = _this$props.onChange,
            name = _this$props.name;


        if (onChange) {
          var value = void 0;
          var target = void 0;

          if (event.target) {
            target = event.target;
          }

          if (_this.props.multiple) {
            value = Array.isArray(_this.props.value) ? [].concat(_toConsumableArray(_this.props.value)) : [];
            var itemIndex = value.indexOf(child.props.value);
            if (itemIndex === -1) {
              value.push(child.props.value);
            } else {
              value.splice(itemIndex, 1);
            }
          } else {
            value = child.props.value;
          }

          event.persist();
          event.target = _extends$1({}, target, { value: value, name: name });

          onChange(event, child);
        }
      };
    }, _this.handleBlur = function (event) {
      if (_this.ignoreNextBlur === true) {
        // The parent components are relying on the bubbling of the event.
        event.stopPropagation();
        _this.ignoreNextBlur = false;
        return;
      }

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    }, _this.handleKeyDown = function (event) {
      if (_this.props.readOnly) {
        return;
      }

      if (['space', 'up', 'down'].includes(keycode(event))) {
        event.preventDefault();
        // Opening the menu is going to blur the. It will be focused back when closed.
        _this.ignoreNextBlur = true;
        _this.update({
          open: true,
          event: event
        });
      }
    }, _this.handleSelectRef = function (node) {
      if (!_this.props.inputRef) {
        return;
      }

      _this.props.inputRef({
        node: node,
        // By pass the native input as we expose a rich object (array).
        value: _this.props.value
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.isControlled && this.props.open) {
        // Focus the display node so the focus is restored on this element once
        // the menu is closed.
        this.displayNode.focus();
        // Rerender with the resolve `displayNode` reference.
        this.forceUpdate();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          autoWidth = _props.autoWidth,
          children = _props.children,
          classes = _props.classes,
          classNameProp = _props.className,
          disabled = _props.disabled,
          displayEmpty = _props.displayEmpty,
          inputRef = _props.inputRef,
          _props$MenuProps = _props.MenuProps,
          MenuProps = _props$MenuProps === undefined ? {} : _props$MenuProps,
          multiple = _props.multiple,
          name = _props.name,
          native = _props.native,
          onBlur = _props.onBlur,
          onChange = _props.onChange,
          onClose = _props.onClose,
          onFocus = _props.onFocus,
          onOpen = _props.onOpen,
          openProp = _props.open,
          readOnly = _props.readOnly,
          renderValue = _props.renderValue,
          value = _props.value,
          other = _objectWithoutProperties(_props, ['autoWidth', 'children', 'classes', 'className', 'disabled', 'displayEmpty', 'inputRef', 'MenuProps', 'multiple', 'name', 'native', 'onBlur', 'onChange', 'onClose', 'onFocus', 'onOpen', 'open', 'readOnly', 'renderValue', 'value']);

      var open = this.isControlled && this.displayNode ? openProp : this.state.open;

      if (native) {
        process.env.NODE_ENV !== "production" ? warning_1$2(multiple === false, 'Material-UI: you can not use the `native` and `multiple` properties ' + 'at the same time on a `Select` component.') : void 0;
        process.env.NODE_ENV !== "production" ? warning_1$2(!renderValue, 'Material-UI: the `renderValue` property is not used by the native implementation.') : void 0;
        process.env.NODE_ENV !== "production" ? warning_1$2(!displayEmpty, 'Material-UI: the `displayEmpty` property is not used by the native implementation.') : void 0;

        return React.createElement(
          'div',
          { className: classes.root },
          React.createElement(
            'select',
            _extends$1({
              className: classnames(classes.select, _defineProperty$1({}, classes.disabled, disabled), classNameProp),
              name: name,
              disabled: disabled,
              onBlur: onBlur,
              onChange: onChange,
              onFocus: onFocus,
              value: value,
              readOnly: readOnly,
              ref: inputRef
            }, other),
            children
          ),
          React.createElement(ArrowDropDownIcon, { className: classes.icon })
        );
      }

      if (value === undefined) {
        throw new Error('Material-UI: the `value` property is required ' + 'when using the `Select` component with `native=false`.');
      }

      var display = void 0;
      var displaySingle = '';
      var displayMultiple = [];
      var computeDisplay = false;

      // No need to display any value if the field is empty.
      if (isDirty(this.props) || displayEmpty) {
        if (renderValue) {
          display = renderValue(value);
        } else {
          computeDisplay = true;
        }
      }

      var items = React.Children.map(children, function (child) {
        if (!React.isValidElement(child)) {
          return null;
        }
        var selected = void 0;

        if (multiple) {
          if (!Array.isArray(value)) {
            throw new Error('Material-UI: the `value` property must be an array ' + 'when using the `Select` component with `multiple`.');
          }

          selected = value.indexOf(child.props.value) !== -1;
          if (selected && computeDisplay) {
            displayMultiple.push(child.props.children);
          }
        } else {
          selected = value === child.props.value;
          if (selected && computeDisplay) {
            displaySingle = child.props.children;
          }
        }

        return React.cloneElement(child, {
          role: 'option',
          selected: selected,
          onClick: _this2.handleItemClick(child)
        });
      });

      if (computeDisplay) {
        display = multiple ? displayMultiple.join(', ') : displaySingle;
      }

      var MenuMinWidth = this.displayNode && !autoWidth ? this.displayNode.clientWidth : undefined;

      return React.createElement(
        'div',
        { className: classes.root },
        React.createElement(
          'div',
          {
            className: classnames(classes.select, classes.selectMenu, _defineProperty$1({}, classes.disabled, disabled), classNameProp),
            ref: function ref(node) {
              _this2.displayNode = node;
            },

            'aria-pressed': open ? 'true' : 'false',
            tabIndex: disabled ? null : 0,
            role: 'button',
            'aria-owns': open ? 'menu-' + (name || '') : null,
            'aria-haspopup': 'true',
            onKeyDown: this.handleKeyDown,
            onBlur: this.handleBlur,
            onClick: disabled || readOnly ? null : this.handleClick,
            onFocus: onFocus
          },
          display
        ),
        React.createElement('input', _extends$1({
          value: Array.isArray(value) ? value.join(',') : value,
          name: name,
          readOnly: readOnly,
          ref: this.handleSelectRef
        }, other, {
          type: 'hidden'
        })),
        React.createElement(ArrowDropDownIcon, { className: classes.icon }),
        React.createElement(
          Menu$1,
          _extends$1({
            id: 'menu-' + (name || ''),
            anchorEl: this.displayNode,
            open: open,
            onClose: this.handleClose
          }, MenuProps, {
            MenuListProps: _extends$1({
              role: 'listbox'
            }, MenuProps.MenuListProps),
            PaperProps: _extends$1({}, MenuProps.PaperProps, {
              style: _extends$1({
                minWidth: MenuMinWidth
              }, MenuProps.PaperProps != null ? MenuProps.PaperProps.style : null)
            })
          }),
          items
        )
      );
    }
  }]);

  return SelectInput;
}(React.Component);

SelectInput.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If true, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: propTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * The CSS class name of the select element.
   */
  className: propTypes.string,
  /**
   * If `true`, the select will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   * You can only use it when the `native` property is `false` (default).
   */
  displayEmpty: propTypes.bool,
  /**
   * Use that property to pass a ref callback to the native select element.
   */
  inputRef: propTypes.func,
  /**
   * Properties applied to the `Menu` element.
   */
  MenuProps: propTypes.object,
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   * You can only use it when the `native` property is `false` (default).
   */
  multiple: propTypes.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: propTypes.string,
  /**
   * If `true`, the component will be using a native `select` element.
   */
  native: propTypes.bool,
  /**
   * @ignore
   */
  onBlur: propTypes.func,
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback
   * @param {object} child The react element that was selected
   */
  onChange: propTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Useful in controlled mode (see open).
   *
   * @param {object} event The event source of the callback
   */
  onClose: propTypes.func,
  /**
   * @ignore
   */
  onFocus: propTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Useful in controlled mode (see open).
   *
   * @param {object} event The event source of the callback
   */
  onOpen: propTypes.func,
  /**
   * Control `select` open state.
   * You can only use it when the `native` property is `false` (default).
   */
  open: propTypes.bool,
  /**
   * @ignore
   */
  readOnly: propTypes.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` property is `false` (default).
   */
  renderValue: propTypes.func,
  /**
   * The value of the component, required for a controlled component.
   */
  value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number]))])
} : {};

// @inheritedComponent Input

var styles$65 = function styles(theme) {
  return {
    root: {
      position: 'relative',
      width: '100%'
    },
    select: {
      '-moz-appearance': 'none', // Reset
      '-webkit-appearance': 'none', // Reset
      // When interacting quickly, the text can end up selected.
      // Native select can't be selected either.
      userSelect: 'none',
      paddingRight: theme.spacing.unit * 4,
      width: 'calc(100% - ' + theme.spacing.unit * 4 + 'px)',
      minWidth: theme.spacing.unit * 2, // So it doesn't collapse.
      cursor: 'pointer',
      '&:focus': {
        // Show that it's not an text input
        background: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
        borderRadius: 0 // Reset Chrome style
      },
      // Remove Firefox focus border
      '&:-moz-focusring': {
        color: 'transparent',
        textShadow: '0 0 0 #000'
      },
      // Remove IE11 arrow
      '&::-ms-expand': {
        display: 'none'
      }
    },
    selectMenu: {
      width: 'auto', // Fix Safari textOverflow
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      minHeight: '1.1875em', // Reset (19px), match the native input line-height
      lineHeight: '1.1875em' // Reset (19px), match the native input line-height
    },
    disabled: {
      cursor: 'default'
    },
    icon: {
      // We use a position absolute over a flexbox in order to forward the pointer events
      // to the input.
      position: 'absolute',
      right: 0,
      top: 'calc(50% - 12px)', // Center vertically
      color: theme.palette.action.active,
      'pointer-events': 'none' // Don't block pointer events on the select under the icon.
    }
  };
};

function Select(props) {
  var autoWidth = props.autoWidth,
      children = props.children,
      classes = props.classes,
      displayEmpty = props.displayEmpty,
      input = props.input,
      inputProps = props.inputProps,
      MenuProps = props.MenuProps,
      multiple = props.multiple,
      native = props.native,
      onClose = props.onClose,
      onOpen = props.onOpen,
      open = props.open,
      renderValue = props.renderValue,
      other = _objectWithoutProperties(props, ['autoWidth', 'children', 'classes', 'displayEmpty', 'input', 'inputProps', 'MenuProps', 'multiple', 'native', 'onClose', 'onOpen', 'open', 'renderValue']);

  return React.cloneElement(input, _extends$1({
    // Most of the logic is implemented in `SelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: SelectInput
  }, other, {
    inputProps: _extends$1({}, inputProps, input ? input.props.inputProps : {}, {
      autoWidth: autoWidth,
      children: children,
      classes: classes,
      displayEmpty: displayEmpty,
      MenuProps: MenuProps,
      multiple: multiple,
      native: native,
      onClose: onClose,
      onOpen: onOpen,
      open: open,
      renderValue: renderValue
    })
  }));
}

Select.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If true, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: propTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   * You can only use it when the `native` property is `false` (default).
   */
  displayEmpty: propTypes.bool,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: propTypes.element,
  /**
   * Properties applied to the `input` element.
   * When `native` is `true`, the properties are applied on the `select` element.
   */
  inputProps: propTypes.object,
  /**
   * Properties applied to the `Menu` element.
   */
  MenuProps: propTypes.object,
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   * You can only use it when the `native` property is `false` (default).
   */
  multiple: propTypes.bool,
  /**
   * If `true`, the component will be using a native `select` element.
   */
  native: propTypes.bool,
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback
   * @param {object} child The react element that was selected
   */
  onChange: propTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Useful in controlled mode (see open).
   *
   * @param {object} event The event source of the callback
   */
  onClose: propTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Useful in controlled mode (see open).
   *
   * @param {object} event The event source of the callback
   */
  onOpen: propTypes.func,
  /**
   * Control `select` open state.
   * You can only use it when the `native` property is `false` (default).
   */
  open: propTypes.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` property is `false` (default).
   */
  renderValue: propTypes.func,
  /**
   * The input value, required for a controlled component.
   */
  value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number]))])
} : {};

Select.defaultProps = {
  autoWidth: false,
  displayEmpty: false,
  input: React.createElement(Input$1, null),
  multiple: false,
  native: false
};

Select.muiName = 'Select';

var Select$1 = withStyles(styles$65, { name: 'MuiSelect' })(Select);

// @inheritedComponent Paper

var styles$66 = function styles(theme) {
  var _root;

  var emphasis = theme.palette.type === 'light' ? 0.8 : 0.98;
  var backgroundColor = emphasize(theme.palette.background.default, emphasis);

  return {
    root: (_root = {
      pointerEvents: 'initial',
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor: backgroundColor,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '6px ' + theme.spacing.unit * 3 + 'px'
    }, _defineProperty$1(_root, theme.breakpoints.up('md'), {
      minWidth: 288,
      maxWidth: 568,
      borderRadius: 2
    }), _defineProperty$1(_root, theme.breakpoints.down('sm'), {
      flexGrow: 1
    }), _root),
    message: {
      padding: theme.spacing.unit + 'px 0'
    },
    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: theme.spacing.unit * 3,
      marginRight: -theme.spacing.unit
    }
  };
};

function SnackbarContent(props) {
  var action = props.action,
      classes = props.classes,
      className = props.className,
      message = props.message,
      other = _objectWithoutProperties(props, ['action', 'classes', 'className', 'message']);

  return React.createElement(
    Paper$1,
    _extends$1({
      component: Typography$1,
      headlineMapping: {
        body1: 'div'
      },
      role: 'alertdialog',
      square: true,
      elevation: 6,
      className: classnames(classes.root, className)
    }, other),
    React.createElement(
      'div',
      { className: classes.message },
      message
    ),
    action ? React.createElement(
      'div',
      { className: classes.action },
      action
    ) : null
  );
}

SnackbarContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The action to display.
   */
  action: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The message to display.
   */
  message: propTypes.node
} : {};

var SnackbarContent$1 = withStyles(styles$66, { name: 'MuiSnackbarContent' })(SnackbarContent);

var styles$67 = function styles(theme) {
  var gutter = theme.spacing.unit * 3;
  var top = { top: 0 };
  var bottom = { bottom: 0 };
  var right = { justifyContent: 'flex-end' };
  var left = { justifyContent: 'flex-start' };
  var topSpace = { top: gutter };
  var bottomSpace = { bottom: gutter };
  var rightSpace = { right: gutter };
  var leftSpace = { left: gutter };
  var center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)'
  };

  return {
    root: {
      zIndex: theme.zIndex.snackbar,
      position: 'fixed',
      display: 'flex',
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    anchorTopCenter: _extends$1({}, top, _defineProperty$1({}, theme.breakpoints.up('md'), _extends$1({}, center))),
    anchorBottomCenter: _extends$1({}, bottom, _defineProperty$1({}, theme.breakpoints.up('md'), _extends$1({}, center))),
    anchorTopRight: _extends$1({}, top, right, _defineProperty$1({}, theme.breakpoints.up('md'), _extends$1({
      left: 'auto'
    }, topSpace, rightSpace))),
    anchorBottomRight: _extends$1({}, bottom, right, _defineProperty$1({}, theme.breakpoints.up('md'), _extends$1({
      left: 'auto'
    }, bottomSpace, rightSpace))),
    anchorTopLeft: _extends$1({}, top, left, _defineProperty$1({}, theme.breakpoints.up('md'), _extends$1({
      right: 'auto'
    }, topSpace, leftSpace))),
    anchorBottomLeft: _extends$1({}, bottom, left, _defineProperty$1({}, theme.breakpoints.up('md'), _extends$1({
      right: 'auto'
    }, bottomSpace, leftSpace)))
  };
};

var Snackbar = function (_React$Component) {
  _inherits(Snackbar, _React$Component);

  function Snackbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Snackbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Snackbar.__proto__ || _Object$getPrototypeOf(Snackbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      // Used to only render active snackbars.
      exited: false
    }, _this.timerAutoHide = null, _this.handleMouseEnter = function (event) {
      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
      _this.handlePause();
    }, _this.handleMouseLeave = function (event) {
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
      _this.handleResume();
    }, _this.handleClickAway = function (event) {
      if (_this.props.onClose) {
        _this.props.onClose(event, 'clickaway');
      }
    }, _this.handlePause = function () {
      clearTimeout(_this.timerAutoHide);
    }, _this.handleResume = function () {
      if (_this.props.autoHideDuration != null) {
        if (_this.props.resumeHideDuration !== undefined) {
          _this.setAutoHideTimer(_this.props.resumeHideDuration);
          return;
        }
        _this.setAutoHideTimer((_this.props.autoHideDuration || 0) * 0.5);
      }
    }, _this.handleExited = function () {
      _this.setState({ exited: true });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Snackbar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.props.open) {
        this.setState({ exited: true });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.open) {
        this.setAutoHideTimer();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.open) {
        this.setState({ exited: false });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.open !== this.props.open) {
        if (this.props.open) {
          this.setAutoHideTimer();
        } else {
          clearTimeout(this.timerAutoHide);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timerAutoHide);
    }

    // Timer that controls delay before snackbar auto hides

  }, {
    key: 'setAutoHideTimer',
    value: function setAutoHideTimer() {
      var _this2 = this;

      var autoHideDuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!this.props.onClose || this.props.autoHideDuration == null) {
        return;
      }

      clearTimeout(this.timerAutoHide);
      this.timerAutoHide = setTimeout(function () {
        if (!_this2.props.onClose || _this2.props.autoHideDuration == null) {
          return;
        }

        _this2.props.onClose(null, 'timeout');
      }, autoHideDuration || this.props.autoHideDuration || 0);
    }

    // Pause the timer when the user is interacting with the Snackbar
    // or when the user hide the window.


    // Restart the timer when the user is no longer interacting with the Snackbar
    // or when the window is shown back.

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          action = _props.action,
          _props$anchorOrigin = _props.anchorOrigin,
          vertical = _props$anchorOrigin.vertical,
          horizontal = _props$anchorOrigin.horizontal,
          autoHideDuration = _props.autoHideDuration,
          children = _props.children,
          classes = _props.classes,
          className = _props.className,
          message = _props.message,
          onClose = _props.onClose,
          onEnter = _props.onEnter,
          onEntered = _props.onEntered,
          onEntering = _props.onEntering,
          onExit = _props.onExit,
          onExited = _props.onExited,
          onExiting = _props.onExiting,
          onMouseEnter = _props.onMouseEnter,
          onMouseLeave = _props.onMouseLeave,
          open = _props.open,
          resumeHideDuration = _props.resumeHideDuration,
          SnackbarContentProps = _props.SnackbarContentProps,
          TransitionProp = _props.transition,
          transitionDuration = _props.transitionDuration,
          other = _objectWithoutProperties(_props, ['action', 'anchorOrigin', 'autoHideDuration', 'children', 'classes', 'className', 'message', 'onClose', 'onEnter', 'onEntered', 'onEntering', 'onExit', 'onExited', 'onExiting', 'onMouseEnter', 'onMouseLeave', 'open', 'resumeHideDuration', 'SnackbarContentProps', 'transition', 'transitionDuration']);

      if (!open && this.state.exited) {
        return null;
      }

      var transitionProps = {};

      // The provided transition might not support the direction property.
      if (TransitionProp === Slide$1) {
        transitionProps.direction = vertical === 'top' ? 'down' : 'up';
      }

      return React.createElement(
        EventListener,
        { target: 'window', onFocus: this.handleResume, onBlur: this.handlePause },
        React.createElement(
          ClickAwayListener,
          { onClickAway: this.handleClickAway },
          React.createElement(
            'div',
            _extends$1({
              className: classnames(classes.root, classes['anchor' + capitalize(vertical) + capitalize(horizontal)], className),
              onMouseEnter: this.handleMouseEnter,
              onMouseLeave: this.handleMouseLeave
            }, other),
            React.createElement(
              TransitionProp,
              _extends$1({
                appear: true,
                'in': open,
                onEnter: onEnter,
                onEntered: onEntered,
                onEntering: onEntering,
                onExit: onExit,
                onExited: createChainedFunction(this.handleExited, onExited),
                onExiting: onExiting,
                timeout: transitionDuration
              }, transitionProps),
              children || React.createElement(SnackbarContent$1, _extends$1({ message: message, action: action }, SnackbarContentProps))
            )
          )
        )
      );
    }
  }]);

  return Snackbar;
}(React.Component);

Snackbar.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The action to display.
   */
  action: propTypes.node,
  /**
   * The anchor of the `Snackbar`.
   */
  anchorOrigin: propTypes.shape({
    horizontal: propTypes.oneOfType([propTypes.number, propTypes.oneOf(['left', 'center', 'right'])]),
    vertical: propTypes.oneOfType([propTypes.number, propTypes.oneOf(['top', 'center', 'bottom'])])
  }),
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   */
  autoHideDuration: propTypes.number,
  /**
   * If you wish the take control over the children of the component you can use this property.
   * When used, you replace the `SnackbarContent` component with the children.
   */
  children: propTypes.element,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * When displaying multiple consecutive Snackbars from a parent rendering a single
   * <Snackbar/>, add the key property to ensure independent treatment of each message.
   * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
   * features such as autoHideDuration may be canceled.
   */
  key: propTypes.any,
  /**
   * The message to display.
   */
  message: propTypes.node,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {object} event The event source of the callback
   * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
   */
  onClose: propTypes.func,
  /**
   * Callback fired before the transition is entering.
   */
  onEnter: propTypes.func,
  /**
   * Callback fired when the transition has entered.
   */
  onEntered: propTypes.func,
  /**
   * Callback fired when the transition is entering.
   */
  onEntering: propTypes.func,
  /**
   * Callback fired before the transition is exiting.
   */
  onExit: propTypes.func,
  /**
   * Callback fired when the transition has exited.
   */
  onExited: propTypes.func,
  /**
   * Callback fired when the transition is exiting.
   */
  onExiting: propTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: propTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: propTypes.func,
  /**
   * If true, `Snackbar` is open.
   */
  open: propTypes.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` property isn't specified, it does nothing.
   * If `autoHideDuration` property is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: propTypes.number,
  /**
   * Properties applied to the `SnackbarContent` element.
   */
  SnackbarContentProps: propTypes.object,
  /**
   * Transition component.
   */
  transition: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number })])
} : {};

Snackbar.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center'
  },
  transition: Slide$1,
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};

var Snackbar$1 = withStyles(styles$67, { flip: false, name: 'MuiSnackbar' })(Snackbar);

var styles$68 = function styles(theme) {
  return {
    root: {
      flex: '1 1 auto'
    },
    line: {
      display: 'block',
      borderColor: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
    },
    rootVertical: {
      marginLeft: 12, // half icon
      padding: '0 0 ' + theme.spacing.unit + 'px'
    },
    lineHorizontal: {
      borderTopStyle: 'solid',
      borderTopWidth: 1
    },
    lineVertical: {
      borderLeftStyle: 'solid',
      borderLeftWidth: 1,
      minHeight: 24
    },
    alternativeLabelRoot: {
      position: 'absolute',
      top: theme.spacing.unit + 4,
      left: 'calc(50% + 20px)',
      right: 'calc(-50% + 20px)'
    },
    alternativeLabelLine: {
      marginLeft: 0
    }
  };
};

/**
 * @ignore - internal component.
 */
function StepConnector(props) {
  var _classNames, _classNames2;

  var alternativeLabel = props.alternativeLabel,
      classNameProp = props.className,
      classes = props.classes,
      orientation = props.orientation,
      other = _objectWithoutProperties(props, ['alternativeLabel', 'className', 'classes', 'orientation']);

  var className = classnames((_classNames = {}, _defineProperty$1(_classNames, classes.root, !alternativeLabel), _defineProperty$1(_classNames, classes.rootVertical, orientation === 'vertical'), _defineProperty$1(_classNames, classes.alternativeLabelRoot, alternativeLabel), _classNames), classNameProp);
  var lineClassName = classnames(classes.line, (_classNames2 = {}, _defineProperty$1(_classNames2, classes.lineHorizontal, orientation === 'horizontal'), _defineProperty$1(_classNames2, classes.lineVertical, orientation === 'vertical'), _defineProperty$1(_classNames2, classes.alternativeLabelLine, alternativeLabel), _classNames2));

  return React.createElement(
    'div',
    _extends$1({ className: className }, other),
    React.createElement('span', { className: lineClassName })
  );
}

StepConnector.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: propTypes.bool,
  /**
   * Useful to extend the style applied to the component.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   */
  orientation: propTypes.oneOf(['horizontal', 'vertical'])
} : {};

StepConnector.defaultProps = {
  alternativeLabel: false,
  orientation: 'horizontal'
};

var StepConnector$1 = withStyles(styles$68, { name: 'MuiStepConnector' })(StepConnector);

// @inheritedComponent Paper

var styles$69 = function styles(theme) {
  return {
    root: {
      display: 'flex',
      padding: theme.spacing.unit * 3
    },
    horizontal: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    vertical: {
      flexDirection: 'column'
    }
  };
};

function Stepper(props) {
  var activeStep = props.activeStep,
      alternativeLabel = props.alternativeLabel,
      classes = props.classes,
      classNameProp = props.className,
      children = props.children,
      connectorProp = props.connector,
      nonLinear = props.nonLinear,
      orientation = props.orientation,
      other = _objectWithoutProperties(props, ['activeStep', 'alternativeLabel', 'classes', 'className', 'children', 'connector', 'nonLinear', 'orientation']);

  var className = classnames(classes.root, classNameProp, alternativeLabel ? null : classes[orientation]);

  var connector = connectorProp ? React.cloneElement(connectorProp, { orientation: orientation }) : null;
  var childrenArray = React.Children.toArray(children);
  var steps = childrenArray.map(function (step, index) {
    var controlProps = {
      index: index,
      orientation: orientation,
      active: false,
      completed: false,
      disabled: false,
      last: index + 1 === childrenArray.length,
      alternativeLabel: alternativeLabel,
      connector: connectorProp
    };

    if (activeStep === index) {
      controlProps.active = true;
    } else if (!nonLinear && activeStep > index) {
      controlProps.completed = true;
    } else if (!nonLinear && activeStep < index) {
      controlProps.disabled = true;
    }

    return [!alternativeLabel && connector && index > 0 && React.cloneElement(connector, {
      key: 'connect-' + (index - 1) + '-to-' + index // eslint-disable-line react/no-array-index-key
    }), React.cloneElement(step, _extends$1({}, controlProps, step.props))];
  });

  return React.createElement(
    Paper$1,
    _extends$1({ square: true, elevation: 0, className: className }, other),
    steps
  );
}

Stepper.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Set the active step (zero based index).
   */
  activeStep: propTypes.number,
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   */
  alternativeLabel: propTypes.bool,
  /**
   * Two or more `<Step />` components.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * A component to be placed between each step.
   */
  connector: propTypes.element,
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   */
  nonLinear: propTypes.bool,
  /**
   * The stepper orientation (layout flow direction).
   */
  orientation: propTypes.oneOf(['horizontal', 'vertical'])
} : {};

Stepper.defaultProps = {
  activeStep: 0,
  alternativeLabel: false,
  connector: React.createElement(StepConnector$1, null),
  nonLinear: false,
  orientation: 'horizontal'
};

Stepper.muiName = 'Stepper';

var Stepper$1 = withStyles(styles$69, { name: 'MuiStepper' })(Stepper);

var styles$70 = function styles(theme) {
  return {
    root: {},
    horizontal: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      '&:first-child': {
        paddingLeft: 0
      },
      '&:last-child': {
        paddingRight: 0
      }
    },
    alternativeLabel: {
      flex: 1,
      position: 'relative',
      marginLeft: 0
    }
  };
};

function Step(props) {
  var active = props.active,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      completed = props.completed,
      connector = props.connector,
      disabled = props.disabled,
      index = props.index,
      last = props.last,
      orientation = props.orientation,
      other = _objectWithoutProperties(props, ['active', 'alternativeLabel', 'children', 'classes', 'className', 'completed', 'connector', 'disabled', 'index', 'last', 'orientation']);

  var className = classnames(classes.root, classes[orientation], _defineProperty$1({}, classes.alternativeLabel, alternativeLabel), classNameProp);

  return React.createElement(
    'div',
    _extends$1({ className: className }, other),
    React.Children.map(children, function (child) {
      return React.cloneElement(child, _extends$1({
        active: active,
        alternativeLabel: alternativeLabel,
        completed: completed,
        disabled: disabled,
        icon: index + 1,
        last: last,
        orientation: orientation
      }, child.props));
    }),
    connector && alternativeLabel && !last && React.cloneElement(connector, { orientation: orientation, alternativeLabel: alternativeLabel })
  );
}

Step.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active: propTypes.bool,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: propTypes.bool,
  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
   */
  children: propTypes.node,
  /**
   * @ignore
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: propTypes.bool,
  /**
   * @ignore
   * Passed down from Stepper if alternativeLabel is also set.
   */
  connector: propTypes.element,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: propTypes.bool,
  /**
   * @ignore
   * Used internally for numbering.
   */
  index: propTypes.number,
  /**
   * @ignore
   */
  last: propTypes.bool,
  /**
   * @ignore
   */
  orientation: propTypes.oneOf(['horizontal', 'vertical'])
} : {};

Step.defaultProps = {
  active: false,
  completed: false,
  disabled: false
};

var Step$1 = withStyles(styles$70, { name: 'MuiStep' })(Step);

/**
 * @ignore - internal component.
 */

var _ref$8 = React.createElement('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' });

var CheckCircle = function CheckCircle(props) {
  return React.createElement(
    SvgIcon$1,
    props,
    _ref$8
  );
};
CheckCircle = pure(CheckCircle);
CheckCircle.muiName = 'SvgIcon';

var CheckCircle$1 = CheckCircle;

var styles$71 = function styles(theme) {
  return {
    root: {
      color: theme.palette.action.disabled
    },
    active: {
      color: theme.palette.primary.main
    },
    text: {
      fill: theme.palette.primary.contrastText,
      fontSize: theme.typography.caption.fontSize,
      fontFamily: theme.typography.fontFamily
    }
  };
};

/**
 * @ignore - internal component.
 */

var _ref$9 = React.createElement('circle', { cx: '12', cy: '12', r: '10' });

function StepPositionIcon(props) {
  var position = props.position,
      classes = props.classes,
      classNameProp = props.className,
      active = props.active;

  var className = classnames(classes.root, _defineProperty$1({}, classes.active, active), classNameProp);

  return React.createElement(
    SvgIcon$1,
    { className: className },
    _ref$9,
    React.createElement(
      'text',
      { className: classes.text, x: '12', y: '16', textAnchor: 'middle' },
      position
    )
  );
}

StepPositionIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Whether this step is active.
   */
  active: propTypes.bool,
  /**
   * Classses for component style customizations.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The step position as a number.
   */
  position: propTypes.node
} : {};

var StepPositionIcon$1 = withStyles(styles$71, { name: 'MuiStepPosition' })(StepPositionIcon);

var styles$72 = function styles(theme) {
  return {
    root: {
      display: 'block'
    },
    completed: {
      color: theme.palette.primary.main
    }
  };
};

function StepIcon(props) {
  var completed = props.completed,
      icon = props.icon,
      active = props.active,
      classes = props.classes;


  if (typeof icon === 'number' || typeof icon === 'string') {
    if (completed) {
      return React.createElement(CheckCircle$1, { className: classnames(classes.root, classes.completed) });
    }
    return React.createElement(StepPositionIcon$1, { className: classes.root, position: icon, active: active });
  }

  return icon;
}

StepIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Whether this step is active.
   */
  active: propTypes.bool,
  /**
   * Classses for component style customizations.
   */
  classes: propTypes.object.isRequired,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: propTypes.bool,
  /**
   * The icon displayed by the step label.
   */
  icon: propTypes.node.isRequired
} : {};

StepIcon.defaultProps = {
  active: false,
  completed: false
};

var StepIcon$1 = withStyles(styles$72, { name: 'MuiStepIcon' })(StepIcon);

var styles$73 = function styles(theme) {
  return {
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    horizontal: {},
    vertical: {},
    active: {
      fontWeight: 500
    },
    completed: {
      fontWeight: 500
    },
    disabled: {
      cursor: 'default'
    },
    iconContainer: {},
    iconContainerNoAlternative: {
      paddingRight: theme.spacing.unit
    },
    alternativeLabelRoot: {
      flexDirection: 'column'
    },
    alternativeLabel: {
      textAlign: 'center',
      marginTop: theme.spacing.unit * 2
    }
  };
};

function StepLabel(props) {
  var _classNames, _classNames2;

  var active = props.active,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      completed = props.completed,
      disabled = props.disabled,
      icon = props.icon,
      last = props.last,
      optional = props.optional,
      orientation = props.orientation,
      other = _objectWithoutProperties(props, ['active', 'alternativeLabel', 'children', 'classes', 'className', 'completed', 'disabled', 'icon', 'last', 'optional', 'orientation']);

  var className = classnames(classes.root, classes[orientation], (_classNames = {}, _defineProperty$1(_classNames, classes.disabled, disabled), _defineProperty$1(_classNames, classes.completed, completed), _defineProperty$1(_classNames, classes.alternativeLabelRoot, alternativeLabel), _defineProperty$1(_classNames, 'classNameProp', classNameProp), _classNames));
  var labelClassName = classnames((_classNames2 = {}, _defineProperty$1(_classNames2, classes.alternativeLabel, alternativeLabel), _defineProperty$1(_classNames2, classes.completed, completed), _defineProperty$1(_classNames2, classes.active, active), _classNames2));

  return React.createElement(
    'span',
    _extends$1({ className: className }, other),
    icon && React.createElement(
      'span',
      {
        className: classnames(classes.iconContainer, _defineProperty$1({}, classes.iconContainerNoAlternative, !alternativeLabel))
      },
      React.createElement(StepIcon$1, {
        completed: completed,
        active: active,
        icon: icon,
        alternativeLabel: alternativeLabel
      })
    ),
    React.createElement(
      'span',
      null,
      React.createElement(
        Typography$1,
        { variant: 'body1', component: 'span', className: labelClassName },
        children
      ),
      optional
    )
  );
}

StepLabel.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * @ignore
   * Sets the step as active. Is passed to child components.
   */
  active: propTypes.bool,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: propTypes.bool,
  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children: propTypes.node,
  /**
   * Custom styles for component.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   * Mark the step as completed. Is passed to child components.
   */
  completed: propTypes.bool,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepLabelButton` is a child of `StepLabel`. Is passed to child components.
   */
  disabled: propTypes.bool,
  /**
   * Override the default icon.
   */
  icon: propTypes.node,
  /**
   * @ignore
   */
  last: propTypes.bool,
  /**
   * The optional node to display.
   */
  optional: propTypes.node,
  /**
   * @ignore
   */
  orientation: propTypes.oneOf(['horizontal', 'vertical'])
} : {};

StepLabel.defaultProps = {
  active: false,
  alternativeLabel: false,
  completed: false,
  disabled: false,
  last: false,
  orientation: 'horizontal'
};

StepLabel.muiName = 'StepLabel';

var StepLabel$1 = withStyles(styles$73, { name: 'MuiStepLabel' })(StepLabel);

// @inheritedComponent ButtonBase

var styles$74 = {
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    background: 'none'
  },
  alternativeLabel: {
    margin: '0 auto'
  }
};

function StepButton(props) {
  var active = props.active,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      completed = props.completed,
      disabled = props.disabled,
      icon = props.icon,
      last = props.last,
      optional = props.optional,
      orientation = props.orientation,
      other = _objectWithoutProperties(props, ['active', 'alternativeLabel', 'children', 'classes', 'className', 'completed', 'disabled', 'icon', 'last', 'optional', 'orientation']);

  var className = classnames(classes.root, _defineProperty$1({}, classes.alternativeLabel, alternativeLabel), classNameProp);
  var childProps = {
    active: active,
    alternativeLabel: alternativeLabel,
    completed: completed,
    disabled: disabled,
    icon: icon,
    optional: optional,
    orientation: orientation
  };
  var child = isMuiElement(children, ['StepLabel']) ? React.cloneElement(children, childProps) : React.createElement(
    StepLabel$1,
    childProps,
    children
  );

  return React.createElement(
    ButtonBase$1,
    _extends$1({ disabled: disabled, className: className }, other),
    child
  );
}

StepButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * @ignore
   * Passed in via `Step` - passed through to `StepLabel`.
   */
  active: propTypes.bool,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: propTypes.bool,
  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children: propTypes.node,
  /**
   * @ignore
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   * Sets completed styling. Is passed to StepLabel.
   */
  completed: propTypes.bool,
  /**
   * @ignore
   * Disables the button and sets disabled styling. Is passed to StepLabel.
   */
  disabled: propTypes.bool,
  /**
   * The icon displayed by the step label.
   */
  icon: propTypes.node,
  /**
   * @ignore
   */
  last: propTypes.bool,
  /**
   * The optional node to display.
   */
  optional: propTypes.node,
  /**
   * @ignore
   */
  orientation: propTypes.oneOf(['horizontal', 'vertical'])
} : {};

var StepButton$1 = withStyles(styles$74, { name: 'MuiStepButton' })(StepButton);

var styles$75 = function styles(theme) {
  return {
    root: {
      marginTop: theme.spacing.unit,
      marginLeft: 12, // half icon
      paddingLeft: theme.spacing.unit + 12, // margin + half icon
      paddingRight: theme.spacing.unit,
      borderLeft: '1px solid ' + (theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600])
    },
    last: {
      borderLeft: 'none'
    },
    transition: {}
  };
};

function StepContent(props) {
  var active = props.active,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      completed = props.completed,
      last = props.last,
      optional = props.optional,
      orientation = props.orientation,
      Transition = props.transition,
      transitionDuration = props.transitionDuration,
      other = _objectWithoutProperties(props, ['active', 'alternativeLabel', 'children', 'classes', 'className', 'completed', 'last', 'optional', 'orientation', 'transition', 'transitionDuration']);

  process.env.NODE_ENV !== "production" ? warning_1$2(orientation === 'vertical', 'Material-UI: <StepContent /> is only designed for use with the vertical stepper.') : void 0;

  var className = classnames(classes.root, _defineProperty$1({}, classes.last, last), classNameProp);

  return React.createElement(
    'div',
    _extends$1({ className: className }, other),
    React.createElement(
      Transition,
      {
        'in': active,
        className: classes.transition,
        timeout: transitionDuration,
        unmountOnExit: true
      },
      children
    )
  );
}

StepContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * @ignore
   * Expands the content.
   */
  active: propTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: propTypes.bool,
  /**
   * Step content.
   */
  children: propTypes.node,
  /**
   * @ignore
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   */
  completed: propTypes.bool,
  /**
   * @ignore
   */
  last: propTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the optional property.
   */
  optional: propTypes.bool,
  /**
   * @ignore
   */
  orientation: propTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Collapse component.
   */
  transition: propTypes.func,
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a property to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number }), propTypes.oneOf(['auto'])])
} : {};

StepContent.defaultProps = {
  transition: Collapse$1,
  transitionDuration: 'auto'
};

var StepContent$1 = withStyles(styles$75, { name: 'MuiStepContent' })(StepContent);

var purple = {
  50: '#f3e5f5',
  100: '#e1bee7',
  200: '#ce93d8',
  300: '#ba68c8',
  400: '#ab47bc',
  500: '#9c27b0',
  600: '#8e24aa',
  700: '#7b1fa2',
  800: '#6a1b9a',
  900: '#4a148c',
  A100: '#ea80fc',
  A200: '#e040fb',
  A400: '#d500f9',
  A700: '#aa00ff'
};

var deepPurple = {
  50: '#ede7f6',
  100: '#d1c4e9',
  200: '#b39ddb',
  300: '#9575cd',
  400: '#7e57c2',
  500: '#673ab7',
  600: '#5e35b1',
  700: '#512da8',
  800: '#4527a0',
  900: '#311b92',
  A100: '#b388ff',
  A200: '#7c4dff',
  A400: '#651fff',
  A700: '#6200ea'
};

var blue = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#2196f3',
  600: '#1e88e5',
  700: '#1976d2',
  800: '#1565c0',
  900: '#0d47a1',
  A100: '#82b1ff',
  A200: '#448aff',
  A400: '#2979ff',
  A700: '#2962ff'
};

var lightBlue = {
  50: '#e1f5fe',
  100: '#b3e5fc',
  200: '#81d4fa',
  300: '#4fc3f7',
  400: '#29b6f6',
  500: '#03a9f4',
  600: '#039be5',
  700: '#0288d1',
  800: '#0277bd',
  900: '#01579b',
  A100: '#80d8ff',
  A200: '#40c4ff',
  A400: '#00b0ff',
  A700: '#0091ea'
};

var cyan = {
  50: '#e0f7fa',
  100: '#b2ebf2',
  200: '#80deea',
  300: '#4dd0e1',
  400: '#26c6da',
  500: '#00bcd4',
  600: '#00acc1',
  700: '#0097a7',
  800: '#00838f',
  900: '#006064',
  A100: '#84ffff',
  A200: '#18ffff',
  A400: '#00e5ff',
  A700: '#00b8d4'
};

var teal = {
  50: '#e0f2f1',
  100: '#b2dfdb',
  200: '#80cbc4',
  300: '#4db6ac',
  400: '#26a69a',
  500: '#009688',
  600: '#00897b',
  700: '#00796b',
  800: '#00695c',
  900: '#004d40',
  A100: '#a7ffeb',
  A200: '#64ffda',
  A400: '#1de9b6',
  A700: '#00bfa5'
};

var green = {
  50: '#e8f5e9',
  100: '#c8e6c9',
  200: '#a5d6a7',
  300: '#81c784',
  400: '#66bb6a',
  500: '#4caf50',
  600: '#43a047',
  700: '#388e3c',
  800: '#2e7d32',
  900: '#1b5e20',
  A100: '#b9f6ca',
  A200: '#69f0ae',
  A400: '#00e676',
  A700: '#00c853'
};

var lightGreen = {
  50: '#f1f8e9',
  100: '#dcedc8',
  200: '#c5e1a5',
  300: '#aed581',
  400: '#9ccc65',
  500: '#8bc34a',
  600: '#7cb342',
  700: '#689f38',
  800: '#558b2f',
  900: '#33691e',
  A100: '#ccff90',
  A200: '#b2ff59',
  A400: '#76ff03',
  A700: '#64dd17'
};

var lime = {
  50: '#f9fbe7',
  100: '#f0f4c3',
  200: '#e6ee9c',
  300: '#dce775',
  400: '#d4e157',
  500: '#cddc39',
  600: '#c0ca33',
  700: '#afb42b',
  800: '#9e9d24',
  900: '#827717',
  A100: '#f4ff81',
  A200: '#eeff41',
  A400: '#c6ff00',
  A700: '#aeea00'
};

var yellow = {
  50: '#fffde7',
  100: '#fff9c4',
  200: '#fff59d',
  300: '#fff176',
  400: '#ffee58',
  500: '#ffeb3b',
  600: '#fdd835',
  700: '#fbc02d',
  800: '#f9a825',
  900: '#f57f17',
  A100: '#ffff8d',
  A200: '#ffff00',
  A400: '#ffea00',
  A700: '#ffd600'
};

var amber = {
  50: '#fff8e1',
  100: '#ffecb3',
  200: '#ffe082',
  300: '#ffd54f',
  400: '#ffca28',
  500: '#ffc107',
  600: '#ffb300',
  700: '#ffa000',
  800: '#ff8f00',
  900: '#ff6f00',
  A100: '#ffe57f',
  A200: '#ffd740',
  A400: '#ffc400',
  A700: '#ffab00'
};

var orange = {
  50: '#fff3e0',
  100: '#ffe0b2',
  200: '#ffcc80',
  300: '#ffb74d',
  400: '#ffa726',
  500: '#ff9800',
  600: '#fb8c00',
  700: '#f57c00',
  800: '#ef6c00',
  900: '#e65100',
  A100: '#ffd180',
  A200: '#ffab40',
  A400: '#ff9100',
  A700: '#ff6d00'
};

var deepOrange = {
  50: '#fbe9e7',
  100: '#ffccbc',
  200: '#ffab91',
  300: '#ff8a65',
  400: '#ff7043',
  500: '#ff5722',
  600: '#f4511e',
  700: '#e64a19',
  800: '#d84315',
  900: '#bf360c',
  A100: '#ff9e80',
  A200: '#ff6e40',
  A400: '#ff3d00',
  A700: '#dd2c00'
};

var brown = {
  50: '#efebe9',
  100: '#d7ccc8',
  200: '#bcaaa4',
  300: '#a1887f',
  400: '#8d6e63',
  500: '#795548',
  600: '#6d4c41',
  700: '#5d4037',
  800: '#4e342e',
  900: '#3e2723',
  A100: '#d7ccc8',
  A200: '#bcaaa4',
  A400: '#8d6e63',
  A700: '#5d4037'
};

var blueGrey = {
  50: '#eceff1',
  100: '#cfd8dc',
  200: '#b0bec5',
  300: '#90a4ae',
  400: '#78909c',
  500: '#607d8b',
  600: '#546e7a',
  700: '#455a64',
  800: '#37474f',
  900: '#263238',
  A100: '#cfd8dc',
  A200: '#b0bec5',
  A400: '#78909c',
  A700: '#455a64'
};



var index$2 = Object.freeze({
	common: common,
	red: red,
	pink: pink,
	purple: purple,
	deepPurple: deepPurple,
	indigo: indigo,
	blue: blue,
	lightBlue: lightBlue,
	cyan: cyan,
	teal: teal,
	green: green,
	lightGreen: lightGreen,
	lime: lime,
	yellow: yellow,
	amber: amber,
	orange: orange,
	deepOrange: deepOrange,
	brown: brown,
	grey: grey,
	blueGrey: blueGrey
});

var styles$76 = function styles(theme) {
  return {
    root: {
      display: 'inline-flex',
      width: 62,
      position: 'relative',
      flexShrink: 0,
      // For correct alignment with the text.
      verticalAlign: 'middle'
    },
    bar: {
      borderRadius: 7,
      display: 'block',
      position: 'absolute',
      width: 34,
      height: 14,
      top: '50%',
      marginTop: -7,
      left: '50%',
      marginLeft: -17,
      transition: theme.transitions.create(['opacity', 'background-color'], {
        duration: theme.transitions.duration.shortest
      }),
      backgroundColor: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
      opacity: theme.palette.type === 'light' ? 0.38 : 0.3
    },
    icon: {
      boxShadow: theme.shadows[1],
      backgroundColor: 'currentColor',
      width: 20,
      height: 20,
      borderRadius: '50%'
    },
    iconChecked: {
      boxShadow: theme.shadows[2]
    },
    // For SwitchBase
    default: {
      zIndex: 1,
      color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    checked: {
      color: theme.palette.primary.main,
      transform: 'translateX(14px)',
      '& + $bar': {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.5
      }
    },
    disabled: {
      color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
      '& + $bar': {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
        opacity: theme.palette.type === 'light' ? 0.12 : 0.1
      },
      '& $icon': {
        boxShadow: theme.shadows[1]
      }
    }
  };
};

function Switch(props) {
  var classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ['classes', 'className']);

  var icon = React.createElement('span', { className: classes.icon });
  var checkedIcon = React.createElement('span', { className: classnames(classes.icon, classes.iconChecked) });

  return React.createElement(
    'span',
    { className: classnames(classes.root, className) },
    React.createElement(SwitchBase$1, _extends$1({
      icon: icon,
      classes: {
        default: classes.default,
        checked: classes.checked,
        disabled: classes.disabled
      },
      checkedIcon: checkedIcon
    }, other)),
    React.createElement('span', { className: classes.bar })
  );
}

Switch.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If `true`, the component is checked.
   */
  checked: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   */
  defaultChecked: propTypes.bool,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: propTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: propTypes.node,
  /**
   * Properties applied to the `input` element.
   */
  inputProps: propTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: propTypes.func,
  /**
   * The input component property `type`.
   */
  inputType: propTypes.string,
  /*
   * @ignore
   */
  name: propTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: propTypes.func,
  /**
   * @ignore
   */
  tabIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /**
   * The value of the component.
   */
  value: propTypes.string
} : {};

var Switch$1 = withStyles(styles$76, { name: 'MuiSwitch' })(Switch);

var styles$77 = function styles(theme) {
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      width: '100%',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      overflow: 'hidden'
    }
  };
};

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table() {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, (Table.__proto__ || _Object$getPrototypeOf(Table)).apply(this, arguments));
  }

  _createClass(Table, [{
    key: 'getChildContext',
    value: function getChildContext() {
      // eslint-disable-line class-methods-use-this
      return {
        table: {}
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          classNameProp = _props.className,
          Component = _props.component,
          other = _objectWithoutProperties(_props, ['classes', 'className', 'component']);

      return React.createElement(Component, _extends$1({ className: classnames(classes.root, classNameProp) }, other));
    }
  }]);

  return Table;
}(React.Component);

Table.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the table, normally `TableHeader` and `TableBody`.
   */
  children: propTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func])
} : {};

Table.defaultProps = {
  component: 'table'
};

Table.childContextTypes = {
  table: propTypes.object
};

var Table$1 = withStyles(styles$77, { name: 'MuiTable' })(Table);

var TableBody = function (_React$Component) {
  _inherits(TableBody, _React$Component);

  function TableBody() {
    _classCallCheck(this, TableBody);

    return _possibleConstructorReturn(this, (TableBody.__proto__ || _Object$getPrototypeOf(TableBody)).apply(this, arguments));
  }

  _createClass(TableBody, [{
    key: 'getChildContext',
    value: function getChildContext() {
      // eslint-disable-line class-methods-use-this
      return {
        table: {
          body: true
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.component,
          other = _objectWithoutProperties(_props, ['component']);

      return React.createElement(Component, other);
    }
  }]);

  return TableBody;
}(React.Component);

TableBody.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component, normally `TableRow`.
   */
  children: propTypes.node.isRequired,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func])
} : {};

TableBody.defaultProps = {
  component: 'tbody'
};

TableBody.childContextTypes = {
  table: propTypes.object
};

var styles$78 = function styles(theme) {
  return {
    root: {
      // Workaround for a rendering bug with spanned columns in Chrome 62.0.
      // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
      borderBottom: '1px solid\n    ' + (theme.palette.type === 'light' ? lighten(fade(theme.palette.divider, 1), 0.88) : darken(fade(theme.palette.divider, 1), 0.8)),
      textAlign: 'left'
    },
    numeric: {
      textAlign: 'right',
      flexDirection: 'row-reverse' // can be dynamically inherited at runtime by contents
    },
    typeHead: {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(12),
      fontWeight: theme.typography.fontWeightMedium,
      position: 'relative' // Workaround for Tooltip positioning issue.
    },
    typeBody: {
      fontSize: theme.typography.pxToRem(13),
      color: theme.palette.text.primary
    },
    typeFooter: {
      borderBottom: 0,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(12)
    },
    paddingDefault: {
      padding: theme.spacing.unit / 2 + 'px ' + theme.spacing.unit * 7 + 'px ' + theme.spacing.unit / 2 + 'px ' + theme.spacing.unit * 3 + 'px',
      '&:last-child': {
        paddingRight: theme.spacing.unit * 3
      }
    },
    paddingDense: {
      paddingRight: theme.spacing.unit * 3
    },
    paddingCheckbox: {
      padding: '0 12px'
    }
  };
};

function TableCell(props, context) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      component = props.component,
      sortDirection = props.sortDirection,
      numeric = props.numeric,
      padding = props.padding,
      variant = props.variant,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'component', 'sortDirection', 'numeric', 'padding', 'variant']);

  var table = context.table;

  var Component = void 0;
  if (component) {
    Component = component;
  } else {
    Component = table && table.head ? 'th' : 'td';
  }

  var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.numeric, numeric), _defineProperty$1(_classNames, classes['padding' + capitalize(padding)], padding !== 'none' && padding !== 'default'), _defineProperty$1(_classNames, classes.paddingDefault, padding !== 'none'), _defineProperty$1(_classNames, classes.typeHead, variant ? variant === 'head' : table && table.head), _defineProperty$1(_classNames, classes.typeBody, variant ? variant === 'body' : table && table.body), _defineProperty$1(_classNames, classes.typeFooter, variant ? variant === 'footer' : table && table.footer), _classNames), classNameProp);

  var ariaSort = null;
  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return React.createElement(
    Component,
    _extends$1({ className: className, 'aria-sort': ariaSort }, other),
    children
  );
}

TableCell.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The table cell contents.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, content will align to the right.
   */
  numeric: propTypes.bool,
  /**
   * Sets the padding applied to the cell.
   */
  padding: propTypes.oneOf(['default', 'checkbox', 'dense', 'none']),
  /**
   * Set aria-sort direction.
   */
  sortDirection: propTypes.oneOf(['asc', 'desc', false]),
  /**
   * Specify the cell type.
   * By default, the TableHead, TableBody or TableFooter parent component set the value.
   */
  variant: propTypes.oneOf(['head', 'body', 'footer'])
} : {};

TableCell.defaultProps = {
  numeric: false,
  padding: 'default'
};

TableCell.contextTypes = {
  table: propTypes.object.isRequired
};

var TableCell$1 = withStyles(styles$78, { name: 'MuiTableCell' })(TableCell);

var TableFooter = function (_React$Component) {
  _inherits(TableFooter, _React$Component);

  function TableFooter() {
    _classCallCheck(this, TableFooter);

    return _possibleConstructorReturn(this, (TableFooter.__proto__ || _Object$getPrototypeOf(TableFooter)).apply(this, arguments));
  }

  _createClass(TableFooter, [{
    key: 'getChildContext',
    value: function getChildContext() {
      // eslint-disable-line class-methods-use-this
      return {
        table: {
          footer: true
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.component,
          other = _objectWithoutProperties(_props, ['component']);

      return React.createElement(Component, other);
    }
  }]);

  return TableFooter;
}(React.Component);

TableFooter.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component, normally `TableRow`.
   */
  children: propTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func])
} : {};

TableFooter.defaultProps = {
  component: 'tfoot'
};

TableFooter.childContextTypes = {
  table: propTypes.object
};

var TableHead = function (_React$Component) {
  _inherits(TableHead, _React$Component);

  function TableHead() {
    _classCallCheck(this, TableHead);

    return _possibleConstructorReturn(this, (TableHead.__proto__ || _Object$getPrototypeOf(TableHead)).apply(this, arguments));
  }

  _createClass(TableHead, [{
    key: 'getChildContext',
    value: function getChildContext() {
      // eslint-disable-line class-methods-use-this
      return {
        table: {
          head: true
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.component,
          other = _objectWithoutProperties(_props, ['component']);

      return React.createElement(Component, other);
    }
  }]);

  return TableHead;
}(React.Component);

TableHead.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component, normally `TableRow`.
   */
  children: propTypes.node.isRequired,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func])
} : {};

TableHead.defaultProps = {
  component: 'thead'
};

TableHead.childContextTypes = {
  table: propTypes.object
};

var styles$79 = function styles(theme) {
  return {
    root: _extends$1({
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }, theme.mixins.toolbar),
    gutters: theme.mixins.gutters({})
  };
};

function Toolbar(props) {
  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      disableGutters = props.disableGutters,
      other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'disableGutters']);

  var className = classnames(classes.root, _defineProperty$1({}, classes.gutters, !disableGutters), classNameProp);

  return React.createElement(
    'div',
    _extends$1({ className: className }, other),
    children
  );
}

Toolbar.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * If `true`, disables gutter padding.
   */
  disableGutters: propTypes.bool
} : {};

Toolbar.defaultProps = {
  disableGutters: false
};

var Toolbar$1 = withStyles(styles$79, { name: 'MuiToolbar' })(Toolbar);

/**
 * @ignore - internal component.
 */

var _ref$10 = React.createElement('path', { d: 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' });

var KeyboardArrowLeft = function KeyboardArrowLeft(props) {
  return React.createElement(
    SvgIcon$1,
    props,
    _ref$10
  );
};
KeyboardArrowLeft = pure(KeyboardArrowLeft);
KeyboardArrowLeft.muiName = 'SvgIcon';

var KeyboardArrowLeft$1 = KeyboardArrowLeft;

/**
 * @ignore - internal component.
 */

var _ref$11 = React.createElement('path', { d: 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' });

var KeyboardArrowRight = function KeyboardArrowRight(props) {
  return React.createElement(
    SvgIcon$1,
    props,
    _ref$11
  );
};
KeyboardArrowRight = pure(KeyboardArrowRight);
KeyboardArrowRight.muiName = 'SvgIcon';

var KeyboardArrowRight$1 = KeyboardArrowRight;

var styles$80 = function styles(theme) {
  return {
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5
    }
  };
};

/**
 * @ignore - internal component.
 */

var _ref2$1 = React.createElement(KeyboardArrowRight$1, null);

var _ref3 = React.createElement(KeyboardArrowLeft$1, null);

var _ref4 = React.createElement(KeyboardArrowLeft$1, null);

var _ref5 = React.createElement(KeyboardArrowRight$1, null);

var TablePaginationActions = function (_React$Component) {
  _inherits(TablePaginationActions, _React$Component);

  function TablePaginationActions() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TablePaginationActions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TablePaginationActions.__proto__ || _Object$getPrototypeOf(TablePaginationActions)).call.apply(_ref, [this].concat(args))), _this), _this.handleBackButtonClick = function (event) {
      _this.props.onChangePage(event, _this.props.page - 1);
    }, _this.handleNextButtonClick = function (event) {
      _this.props.onChangePage(event, _this.props.page + 1);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TablePaginationActions, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          backIconButtonProps = _props.backIconButtonProps,
          classes = _props.classes,
          count = _props.count,
          nextIconButtonProps = _props.nextIconButtonProps,
          onChangePage = _props.onChangePage,
          page = _props.page,
          rowsPerPage = _props.rowsPerPage,
          theme = _props.theme,
          other = _objectWithoutProperties(_props, ['backIconButtonProps', 'classes', 'count', 'nextIconButtonProps', 'onChangePage', 'page', 'rowsPerPage', 'theme']);

      return React.createElement(
        'div',
        _extends$1({ className: classes.root }, other),
        React.createElement(
          IconButton$1,
          _extends$1({
            onClick: this.handleBackButtonClick,
            disabled: page === 0
          }, backIconButtonProps),
          theme.direction === 'rtl' ? _ref2$1 : _ref3
        ),
        React.createElement(
          IconButton$1,
          _extends$1({
            onClick: this.handleNextButtonClick,
            disabled: page >= Math.ceil(count / rowsPerPage) - 1
          }, nextIconButtonProps),
          theme.direction === 'rtl' ? _ref4 : _ref5
        )
      );
    }
  }]);

  return TablePaginationActions;
}(React.Component);

TablePaginationActions.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Properties applied to the back arrow `IconButton` component.
   */
  backIconButtonProps: propTypes.object,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * The total number of rows.
   */
  count: propTypes.number.isRequired,
  /**
   * Properties applied to the next arrow `IconButton` component.
   */
  nextIconButtonProps: propTypes.object,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback
   * @param {number} page The page selected
   */
  onChangePage: propTypes.func.isRequired,
  /**
   * The zero-based index of the current page.
   */
  page: propTypes.number.isRequired,
  /**
   * The number of rows per page.
   */
  rowsPerPage: propTypes.number.isRequired,
  /**
   * @ignore
   */
  theme: propTypes.object.isRequired
} : {};

var TablePaginationActions$1 = withStyles(styles$80, { name: 'MuiTablePaginationActions', withTheme: true })(TablePaginationActions);

// @inheritedComponent TableCell

var styles$81 = function styles(theme) {
  return {
    root: {
      // Increase the specificity to override TableCell.
      '&:last-child': {
        padding: 0
      }
    },
    toolbar: {
      height: 56,
      minHeight: 56,
      paddingRight: 2
    },
    spacer: {
      flex: '1 1 100%'
    },
    caption: {
      flexShrink: 0
    },
    input: {
      fontSize: 'inherit',
      flexShrink: 0
    },
    selectRoot: {
      marginRight: theme.spacing.unit * 4,
      marginLeft: theme.spacing.unit,
      color: theme.palette.text.secondary
    },
    select: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit * 2
    },
    selectIcon: {
      top: 1
    },
    actions: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5
    }
  };
};

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */

var TablePagination = function (_React$Component) {
  _inherits(TablePagination, _React$Component);

  function TablePagination() {
    _classCallCheck(this, TablePagination);

    return _possibleConstructorReturn(this, (TablePagination.__proto__ || _Object$getPrototypeOf(TablePagination)).apply(this, arguments));
  }

  _createClass(TablePagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var count = nextProps.count,
          onChangePage = nextProps.onChangePage,
          rowsPerPage = nextProps.rowsPerPage;

      var newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
      if (this.props.page > newLastPage) {
        onChangePage(null, newLastPage);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          Actions = _props.Actions,
          backIconButtonProps = _props.backIconButtonProps,
          classes = _props.classes,
          colSpanProp = _props.colSpan,
          Component = _props.component,
          count = _props.count,
          labelDisplayedRows = _props.labelDisplayedRows,
          labelRowsPerPage = _props.labelRowsPerPage,
          nextIconButtonProps = _props.nextIconButtonProps,
          onChangePage = _props.onChangePage,
          onChangeRowsPerPage = _props.onChangeRowsPerPage,
          page = _props.page,
          rowsPerPage = _props.rowsPerPage,
          rowsPerPageOptions = _props.rowsPerPageOptions,
          other = _objectWithoutProperties(_props, ['Actions', 'backIconButtonProps', 'classes', 'colSpan', 'component', 'count', 'labelDisplayedRows', 'labelRowsPerPage', 'nextIconButtonProps', 'onChangePage', 'onChangeRowsPerPage', 'page', 'rowsPerPage', 'rowsPerPageOptions']);

      var colSpan = void 0;

      if (Component === TableCell$1 || Component === 'td') {
        colSpan = colSpanProp || 1000; // col-span over everything
      }

      return React.createElement(
        Component,
        _extends$1({ className: classes.root, colSpan: colSpan }, other),
        React.createElement(
          Toolbar$1,
          { className: classes.toolbar },
          React.createElement('div', { className: classes.spacer }),
          rowsPerPageOptions.length > 1 && React.createElement(
            Typography$1,
            { variant: 'caption', className: classes.caption },
            labelRowsPerPage
          ),
          rowsPerPageOptions.length > 1 && React.createElement(
            Select$1,
            {
              classes: {
                root: classes.selectRoot,
                select: classes.select,
                icon: classes.selectIcon
              },
              input: React.createElement(Input$1, {
                classes: {
                  root: classes.input
                },
                disableUnderline: true
              }),
              value: rowsPerPage,
              onChange: onChangeRowsPerPage
            },
            rowsPerPageOptions.map(function (rowsPerPageOption) {
              return React.createElement(
                MenuItem$1,
                { key: rowsPerPageOption, value: rowsPerPageOption },
                rowsPerPageOption
              );
            })
          ),
          React.createElement(
            Typography$1,
            { variant: 'caption', className: classes.caption },
            labelDisplayedRows({
              from: count === 0 ? 0 : page * rowsPerPage + 1,
              to: Math.min(count, (page + 1) * rowsPerPage),
              count: count,
              page: page
            })
          ),
          React.createElement(Actions, {
            backIconButtonProps: backIconButtonProps,
            count: count,
            nextIconButtonProps: nextIconButtonProps,
            onChangePage: onChangePage,
            page: page,
            rowsPerPage: rowsPerPage
          })
        )
      );
    }
  }]);

  return TablePagination;
}(React.Component);

TablePagination.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The component used for displaying the actions.
   * Either a string to use a DOM element or a component.
   */
  Actions: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Properties applied to the back arrow `IconButton` component.
   */
  backIconButtonProps: propTypes.object,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  colSpan: propTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * The total number of rows.
   */
  count: propTypes.number.isRequired,
  /**
   * Useful to customize the displayed rows label.
   */
  labelDisplayedRows: propTypes.func,
  /**
   * Useful to customize the rows per page label. Invoked with a `{ from, to, count, page }`
   * object.
   */
  labelRowsPerPage: propTypes.node,
  /**
   * Properties applied to the next arrow `IconButton` component.
   */
  nextIconButtonProps: propTypes.object,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback
   * @param {number} page The page selected
   */
  onChangePage: propTypes.func.isRequired,
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {object} event The event source of the callback
   */
  onChangeRowsPerPage: propTypes.func,
  /**
   * The zero-based index of the current page.
   */
  page: propTypes.number.isRequired,
  /**
   * The number of rows per page.
   */
  rowsPerPage: propTypes.number.isRequired,
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   */
  rowsPerPageOptions: propTypes.array
} : {};

TablePagination.defaultProps = {
  Actions: TablePaginationActions$1,
  component: TableCell$1,
  labelDisplayedRows: function labelDisplayedRows(_ref) {
    var from = _ref.from,
        to = _ref.to,
        count = _ref.count;
    return from + '-' + to + ' of ' + count;
  },
  labelRowsPerPage: 'Rows per page:',
  rowsPerPageOptions: [5, 10, 25]
};

var TablePagination$1 = withStyles(styles$81, { name: 'MuiTablePagination' })(TablePagination);

var styles$82 = function styles(theme) {
  return {
    root: {
      color: 'inherit',
      display: 'table-row',
      height: 48,
      '&:focus': {
        outline: 'none'
      },
      verticalAlign: 'middle'
    },
    typeHead: {
      height: 56
    },
    typeFooter: {
      height: 56
    },
    selected: {
      backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.04)' // grey[100]
      : 'rgba(255, 255, 255, 0.08)'
    },
    hover: {
      '&:hover': {
        backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.07)' // grey[200]
        : 'rgba(255, 255, 255, 0.14)'
      }
    }
  };
};

/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */
function TableRow(props, context) {
  var _classNames;

  var classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      hover = props.hover,
      selected = props.selected,
      other = _objectWithoutProperties(props, ['classes', 'className', 'component', 'hover', 'selected']);

  var table = context.table;


  var className = classnames(classes.root, (_classNames = {}, _defineProperty$1(_classNames, classes.typeHead, table && table.head), _defineProperty$1(_classNames, classes.typeFooter, table && table.footer), _defineProperty$1(_classNames, classes.hover, table && hover), _defineProperty$1(_classNames, classes.selected, table && selected), _classNames), classNameProp);

  return React.createElement(Component, _extends$1({ className: className }, other));
}

TableRow.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Should be valid `<tr>` children such as `TableCell`.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * If `true`, the table row will shade on hover.
   */
  hover: propTypes.bool,
  /**
   * If `true`, the table row will have the selected shading.
   */
  selected: propTypes.bool
} : {};

TableRow.defaultProps = {
  component: 'tr',
  hover: false,
  selected: false
};

TableRow.contextTypes = {
  table: propTypes.object
};

var TableRow$1 = withStyles(styles$82, { name: 'MuiTableRow' })(TableRow);

/**
 * @ignore - internal component.
 */

var _ref$12 = React.createElement('path', { d: 'M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z' });

var ArrowDownward = function ArrowDownward(props) {
  return React.createElement(
    SvgIcon$1,
    props,
    _ref$12
  );
};

ArrowDownward = pure(ArrowDownward);
ArrowDownward.muiName = 'SvgIcon';

var ArrowDownwardIcon = ArrowDownward;

// @inheritedComponent ButtonBase

var styles$83 = function styles(theme) {
  return {
    root: {
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'flex-start',
      flexDirection: 'inherit',
      alignItems: 'center',
      '&:hover': {
        color: theme.palette.text.primary
      },
      '&:focus': {
        color: theme.palette.text.primary
      }
    },
    active: {
      color: theme.palette.text.primary,
      '& $icon': {
        opacity: 1
      }
    },
    icon: {
      height: 16,
      marginRight: 4,
      marginLeft: 4,
      opacity: 0,
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shorter
      }),
      userSelect: 'none',
      width: 16
    },
    desc: {
      transform: 'rotate(0deg)'
    },
    asc: {
      transform: 'rotate(180deg)'
    }
  };
};

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
function TableSortLabel(props) {
  var active = props.active,
      classes = props.classes,
      classNameProp = props.className,
      children = props.children,
      direction = props.direction,
      other = _objectWithoutProperties(props, ['active', 'classes', 'className', 'children', 'direction']);

  var className = classnames(classes.root, _defineProperty$1({}, classes.active, active), classNameProp);

  var iconClassName = classnames(classes.icon, _defineProperty$1({}, classes[direction], !!direction));

  return React.createElement(
    ButtonBase$1,
    _extends$1({ className: className, component: 'span', disableRipple: true }, other),
    children,
    React.createElement(ArrowDownwardIcon, { className: iconClassName })
  );
}

TableSortLabel.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   */
  active: propTypes.bool,
  /**
   * Label contents, the arrow will be appended automatically.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The current sort direction.
   */
  direction: propTypes.oneOf(['asc', 'desc'])
} : {};

TableSortLabel.defaultProps = {
  active: false,
  direction: 'desc'
};

var TableSortLabel$1 = withStyles(styles$83, { name: 'MuiTableSortLabel' })(TableSortLabel);

var stifle_1 = stifle;


function stifle (fn, wait) {
  if (typeof fn !== 'function' || typeof wait !== 'number') {
    throw new Error('stifle(fn, wait) -- expected a function and number of milliseconds, got (' + typeof fn + ', ' + typeof wait + ')');
  }

  var timer;    // Timer to fire after `wait` has elapsed
  var called;   // Keep track if it gets called during the `wait`

  var wrapper = function () {

    // Check if still "cooling down" from a previous call
    if (timer) {
      called = true;
    } else {
      // Start a timer to fire after the `wait` is over
      timer = setTimeout(afterWait, wait);
      // And call the wrapped function
      fn();
    }
  };

  // Add a cancel method, to kill and pending calls
  wrapper.cancel = function () {
    // Clear the called flag, or it would fire twice when called again later
    called = false;

    // Turn off the timer, so it won't fire after the wait expires
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  function afterWait() {
    // Empty out the timer
    timer = undefined;

    // If it was called during the `wait`, fire it again
    if (called) {
      called = false;
      wrapper();
    }
  }

  return wrapper;
}

var ScrollbarSize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
	value: true
});



var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf$3);



var _classCallCheck3 = _interopRequireDefault(classCallCheck);



var _createClass3 = _interopRequireDefault(createClass);



var _possibleConstructorReturn3 = _interopRequireDefault(possibleConstructorReturn);



var _inherits3 = _interopRequireDefault(inherits);



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);



var _reactEventListener2 = _interopRequireDefault(lib$8);



var _stifle2 = _interopRequireDefault(stifle_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
	width: '100px',
	height: '100px',
	position: 'absolute',
	top: '-100000px',
	overflow: 'scroll',
	msOverflowStyle: 'scrollbar'
};

var ScrollbarSize = function (_Component) {
	(0, _inherits3.default)(ScrollbarSize, _Component);

	function ScrollbarSize() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, ScrollbarSize);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ScrollbarSize.__proto__ || (0, _getPrototypeOf2.default)(ScrollbarSize)).call.apply(_ref, [this].concat(args))), _this), _this.setMeasurements = function () {
			_this.scrollbarHeight = _this.node.offsetHeight - _this.node.clientHeight;
			_this.scrollbarWidth = _this.node.offsetWidth - _this.node.clientWidth;
		}, _this.handleResize = (0, _stifle2.default)(function () {
			var onChange = _this.props.onChange;


			var prevHeight = _this.scrollbarHeight;
			var prevWidth = _this.scrollbarWidth;
			_this.setMeasurements();
			if (prevHeight !== _this.scrollbarHeight || prevWidth !== _this.scrollbarWidth) {
				onChange({ scrollbarHeight: _this.scrollbarHeight, scrollbarWidth: _this.scrollbarWidth });
			}
		}, 166), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(ScrollbarSize, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var onLoad = this.props.onLoad;


			if (onLoad) {
				this.setMeasurements();
				onLoad({ scrollbarHeight: this.scrollbarHeight, scrollbarWidth: this.scrollbarWidth });
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.handleResize.cancel();
		}
	}, {
		key: 'render',
		// Corresponds to 10 frames at 60 Hz.

		value: function render() {
			var _this2 = this;

			var onChange = this.props.onChange;


			return _react2.default.createElement(
				'div',
				null,
				onChange ? _react2.default.createElement(_reactEventListener2.default, { target: 'window', onResize: this.handleResize }) : null,
				_react2.default.createElement('div', {
					style: styles,
					ref: function ref(node) {
						_this2.node = node;
					}
				})
			);
		}
	}]);
	return ScrollbarSize;
}(React.Component);

ScrollbarSize.defaultProps = {
	onLoad: null,
	onChange: null
};
exports.default = ScrollbarSize;
});

unwrapExports(ScrollbarSize_1);

var reactScrollbarSize = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _ScrollbarSize2 = _interopRequireDefault(ScrollbarSize_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ScrollbarSize2.default;
});

var ScrollbarSize$1 = unwrapExports(reactScrollbarSize);

var main = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
// Based on https://github.com/react-bootstrap/dom-helpers/blob/master/src/util/inDOM.js
var inDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
var cachedType;
function _setScrollType(type) {
    cachedType = type;
}
exports._setScrollType = _setScrollType;
// Based on the jquery plugin https://github.com/othree/jquery.rtl-scroll-type
function detectScrollType() {
    if (cachedType) {
        return cachedType;
    }
    if (!inDOM || !window.document.body) {
        return 'indeterminate';
    }
    var dummy = window.document.createElement('div');
    dummy.appendChild(document.createTextNode('ABCD'));
    dummy.dir = 'rtl';
    dummy.style.fontSize = '14px';
    dummy.style.width = '4px';
    dummy.style.height = '1px';
    dummy.style.position = 'absolute';
    dummy.style.top = '-1000px';
    dummy.style.overflow = 'scroll';
    document.body.appendChild(dummy);
    cachedType = 'reverse';
    if (dummy.scrollLeft > 0) {
        cachedType = 'default';
    }
    else {
        dummy.scrollLeft = 1;
        if (dummy.scrollLeft === 0) {
            cachedType = 'negative';
        }
    }
    document.body.removeChild(dummy);
    return cachedType;
}
exports.detectScrollType = detectScrollType;
// Based on https://stackoverflow.com/a/24394376
function getNormalizedScrollLeft(element, direction) {
    var scrollLeft = element.scrollLeft;
    // Perform the calculations only when direction is rtl to avoid messing up the ltr bahavior
    if (direction !== 'rtl') {
        return scrollLeft;
    }
    var type = detectScrollType();
    if (type === 'indeterminate') {
        return Number.NaN;
    }
    switch (type) {
        case 'negative':
            return element.scrollWidth - element.clientWidth + scrollLeft;
        case 'reverse':
            return element.scrollWidth - element.clientWidth - scrollLeft;
    }
    return scrollLeft;
}
exports.getNormalizedScrollLeft = getNormalizedScrollLeft;
function setNormalizedScrollLeft(element, scrollLeft, direction) {
    // Perform the calculations only when direction is rtl to avoid messing up the ltr bahavior
    if (direction !== 'rtl') {
        element.scrollLeft = scrollLeft;
        return;
    }
    var type = detectScrollType();
    if (type === 'indeterminate') {
        return;
    }
    switch (type) {
        case 'negative':
            element.scrollLeft = element.clientWidth - element.scrollWidth + scrollLeft;
            break;
        case 'reverse':
            element.scrollLeft = element.scrollWidth - element.clientWidth - scrollLeft;
            break;
        default:
            element.scrollLeft = scrollLeft;
            break;
    }
}
exports.setNormalizedScrollLeft = setNormalizedScrollLeft;
});

unwrapExports(main);
var main_1 = main._setScrollType;
var main_2 = main.detectScrollType;
var main_3 = main.getNormalizedScrollLeft;
var main_4 = main.setNormalizedScrollLeft;

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof commonjsGlobal !== "undefined") {
    win = commonjsGlobal;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

var window_1 = win;

var rafl = createCommonjsModule(function (module, exports) {
/**
 * `requestAnimationFrame()`
 */

var request = window_1.requestAnimationFrame
  || window_1.webkitRequestAnimationFrame
  || window_1.mozRequestAnimationFrame
  || fallback;

var prev = +new Date;
function fallback (fn) {
  var curr = +new Date;
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  return prev = curr, req
}

/**
 * `cancelAnimationFrame()`
 */

var cancel = window_1.cancelAnimationFrame
  || window_1.webkitCancelAnimationFrame
  || window_1.mozCancelAnimationFrame
  || clearTimeout;

if (Function.prototype.bind) {
  request = request.bind(window_1);
  cancel = cancel.bind(window_1);
}

exports = module.exports = request;
exports.cancel = cancel;
});

var rafl_1 = rafl.cancel;

function scroll (prop, element, to, options, callback) {
  var start = +new Date;
  var from = element[prop];
  var cancelled = false;

  var ease = inOutSine;
  var duration = 350;

  if (typeof options === 'function') {
    callback = options;
  }
  else {
    options = options || {};
    ease = options.ease || ease;
    duration = options.duration || duration;
    callback = callback || function () {};
  }

  if (from === to) {
    return callback(
      new Error('Element already at target scroll position'),
      element[prop]
    )
  }

  function cancel () {
    cancelled = true;
  }

  function animate (timestamp) {
    if (cancelled) {
      return callback(
        new Error('Scroll cancelled'),
        element[prop]
      )
    }

    var now = +new Date;
    var time = Math.min(1, ((now - start) / duration));
    var eased = ease(time);

    element[prop] = (eased * (to - from)) + from;

    time < 1 ? rafl(animate) : rafl(function () {
      callback(null, element[prop]);
    });
  }

  rafl(animate);

  return cancel
}

function inOutSine (n) {
  return .5 * (1 - Math.cos(Math.PI * n))
}

var scroll_1 = {
  top: function (element, to, options, callback) {
    return scroll('scrollTop', element, to, options, callback)
  },
  left: function (element, to, options, callback) {
    return scroll('scrollLeft', element, to, options, callback)
  }
};

var styles$84 = function styles(theme) {
  return {
    root: {
      position: 'absolute',
      height: 2,
      bottom: 0,
      width: '100%',
      transition: theme.transitions.create(),
      willChange: 'left, width'
    },
    colorPrimary: {
      backgroundColor: theme.palette.primary.main
    },
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main
    }
  };
};

/**
 * @ignore - internal component.
 */
function TabIndicator(props) {
  var classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      styleProp = props.style;

  var colorPredefined = ['primary', 'secondary'].indexOf(color) !== -1;
  var className = classnames(classes.root, _defineProperty$1({}, classes['color' + capitalize(color)], colorPredefined), classNameProp);

  var style = colorPredefined ? styleProp : _extends$1({}, styleProp, {
    backgroundColor: color
  });

  return React.createElement('span', { className: className, style: style });
}

TabIndicator.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * @ignore
   * The color of the tab indicator.
   */
  color: propTypes.oneOfType([propTypes.string, propTypes.oneOf(['primary', 'secondary'])]),
  /**
   * @ignore
   * The style of the root element.
   */
  style: propTypes.object
} : {};

var TabIndicator$1 = withStyles(styles$84, { name: 'MuiTabIndicator' })(TabIndicator);

var styles$85 = function styles(theme) {
  return {
    root: {
      color: 'inherit',
      flex: '0 0 ' + theme.spacing.unit * 7 + 'px'
    }
  };
};

/**
 * @ignore - internal component.
 */

var _ref$13 = React.createElement(KeyboardArrowLeft$1, null);

var _ref2$2 = React.createElement(KeyboardArrowRight$1, null);

function TabScrollButton(props) {
  var classes = props.classes,
      classNameProp = props.className,
      direction = props.direction,
      onClick = props.onClick,
      visible = props.visible,
      other = _objectWithoutProperties(props, ['classes', 'className', 'direction', 'onClick', 'visible']);

  var className = classnames(classes.root, classNameProp);

  if (!visible) {
    return React.createElement('div', { className: className });
  }

  return React.createElement(
    ButtonBase$1,
    _extends$1({ className: className, onClick: onClick, tabIndex: -1 }, other),
    direction === 'left' ? _ref$13 : _ref2$2
  );
}

TabScrollButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Which direction should the button indicate?
   */
  direction: propTypes.oneOf(['left', 'right']),
  /**
   * Callback to execute for button press.
   */
  onClick: propTypes.func,
  /**
   * Should the button be present or just consume space.
   */
  visible: propTypes.bool
} : {};

TabScrollButton.defaultProps = {
  visible: true
};

var TabScrollButton$1 = withStyles(styles$85, { name: 'MuiTabScrollButton' })(TabScrollButton);

var styles$86 = function styles(theme) {
  return {
    root: {
      overflow: 'hidden',
      minHeight: 48,
      WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.
    },
    flexContainer: {
      display: 'flex'
    },
    scrollingContainer: {
      position: 'relative',
      display: 'inline-block',
      flex: '1 1 auto',
      whiteSpace: 'nowrap'
    },
    fixed: {
      overflowX: 'hidden',
      width: '100%'
    },
    scrollable: {
      overflowX: 'scroll'
    },
    centered: {
      justifyContent: 'center'
    },
    buttonAuto: _defineProperty$1({}, theme.breakpoints.down('xs'), {
      display: 'none'
    })
  };
};

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || _Object$getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      indicatorStyle: {},
      scrollerStyle: {
        marginBottom: 0
      },
      showLeftScroll: false,
      showRightScroll: false,
      mounted: false
    }, _this.getConditionalElements = function () {
      var _this$props = _this.props,
          classes = _this$props.classes,
          buttonClassName = _this$props.buttonClassName,
          scrollable = _this$props.scrollable,
          scrollButtons = _this$props.scrollButtons,
          TabScrollButtonProp = _this$props.TabScrollButton,
          theme = _this$props.theme;

      var conditionalElements = {};
      conditionalElements.scrollbarSizeListener = scrollable ? React.createElement(ScrollbarSize$1, {
        onLoad: _this.handleScrollbarSizeChange,
        onChange: _this.handleScrollbarSizeChange
      }) : null;

      var showScrollButtons = scrollable && (scrollButtons === 'auto' || scrollButtons === 'on');

      conditionalElements.scrollButtonLeft = showScrollButtons ? React.createElement(TabScrollButtonProp, {
        direction: theme && theme.direction === 'rtl' ? 'right' : 'left',
        onClick: _this.handleLeftScrollClick,
        visible: _this.state.showLeftScroll,
        className: classnames(_defineProperty$1({}, classes.buttonAuto, scrollButtons === 'auto'), buttonClassName)
      }) : null;

      conditionalElements.scrollButtonRight = showScrollButtons ? React.createElement(TabScrollButtonProp, {
        direction: theme && theme.direction === 'rtl' ? 'left' : 'right',
        onClick: _this.handleRightScrollClick,
        visible: _this.state.showRightScroll,
        className: classnames(_defineProperty$1({}, classes.buttonAuto, scrollButtons === 'auto'), buttonClassName)
      }) : null;

      return conditionalElements;
    }, _this.getTabsMeta = function (value, direction) {
      var tabsMeta = void 0;
      if (_this.tabs) {
        var rect = _this.tabs.getBoundingClientRect();
        // create a new object with ClientRect class props + scrollLeft
        tabsMeta = {
          clientWidth: _this.tabs ? _this.tabs.clientWidth : 0,
          scrollLeft: _this.tabs ? _this.tabs.scrollLeft : 0,
          scrollLeftNormalized: _this.tabs ? main_3(_this.tabs, direction) : 0,
          scrollWidth: _this.tabs ? _this.tabs.scrollWidth : 0,
          left: rect.left,
          right: rect.right
        };
      }

      var tabMeta = void 0;
      if (_this.tabs && value !== false) {
        var children = _this.tabs.children[0].children;

        if (children.length > 0) {
          var tab = children[_this.valueToIndex[value]];
          process.env.NODE_ENV !== "production" ? warning_1$2(tab, 'Material-UI: the value provided `' + value + '` is invalid') : void 0;
          tabMeta = tab ? tab.getBoundingClientRect() : null;
        }
      }
      return { tabsMeta: tabsMeta, tabMeta: tabMeta };
    }, _this.tabs = undefined, _this.valueToIndex = {}, _this.handleResize = debounce_1(function () {
      _this.updateIndicatorState(_this.props);
      _this.updateScrollButtonState();
    }, 166), _this.handleLeftScrollClick = function () {
      if (_this.tabs) {
        _this.moveTabsScroll(-_this.tabs.clientWidth);
      }
    }, _this.handleRightScrollClick = function () {
      if (_this.tabs) {
        _this.moveTabsScroll(_this.tabs.clientWidth);
      }
    }, _this.handleScrollbarSizeChange = function (_ref2) {
      var scrollbarHeight = _ref2.scrollbarHeight;

      _this.setState({
        scrollerStyle: {
          marginBottom: -scrollbarHeight
        }
      });
    }, _this.handleTabsScroll = debounce_1(function () {
      _this.updateScrollButtonState();
    }, 166), _this.moveTabsScroll = function (delta) {
      var theme = _this.props.theme;


      if (_this.tabs) {
        var multiplier = theme.direction === 'rtl' ? -1 : 1;
        var nextScrollLeft = _this.tabs.scrollLeft + delta * multiplier;
        // Fix for Edge
        var invert = theme.direction === 'rtl' && main_2() === 'reverse' ? -1 : 1;
        scroll_1.left(_this.tabs, invert * nextScrollLeft);
      }
    }, _this.scrollSelectedIntoView = function () {
      var _this$props2 = _this.props,
          theme = _this$props2.theme,
          value = _this$props2.value;

      var _this$getTabsMeta = _this.getTabsMeta(value, theme.direction),
          tabsMeta = _this$getTabsMeta.tabsMeta,
          tabMeta = _this$getTabsMeta.tabMeta;

      if (!tabMeta || !tabsMeta) {
        return;
      }

      if (tabMeta.left < tabsMeta.left) {
        // left side of button is out of view
        var nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
        scroll_1.left(_this.tabs, nextScrollLeft);
      } else if (tabMeta.right > tabsMeta.right) {
        // right side of button is out of view
        var _nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);
        scroll_1.left(_this.tabs, _nextScrollLeft);
      }
    }, _this.updateScrollButtonState = function () {
      var _this$props3 = _this.props,
          scrollable = _this$props3.scrollable,
          scrollButtons = _this$props3.scrollButtons,
          theme = _this$props3.theme;


      if (_this.tabs && scrollable && scrollButtons !== 'off') {
        var _this$tabs = _this.tabs,
            scrollWidth = _this$tabs.scrollWidth,
            clientWidth = _this$tabs.clientWidth;

        var scrollLeft = main_3(_this.tabs, theme.direction);

        var showLeftScroll = theme.direction === 'rtl' ? scrollWidth > clientWidth + scrollLeft : scrollLeft > 0;

        var showRightScroll = theme.direction === 'rtl' ? scrollLeft > 0 : scrollWidth > clientWidth + scrollLeft;

        if (showLeftScroll !== _this.state.showLeftScroll || showRightScroll !== _this.state.showRightScroll) {
          _this.setState({ showLeftScroll: showLeftScroll, showRightScroll: showRightScroll });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ mounted: true });
      this.updateIndicatorState(this.props);
      this.updateScrollButtonState();

      if (this.props.action) {
        this.props.action({
          updateIndicator: this.handleResize
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this.updateScrollButtonState();

      // The index might have changed at the same time.
      // We need to check again the right indicator position.
      this.updateIndicatorState(this.props);

      if (this.state.indicatorStyle !== prevState.indicatorStyle) {
        this.scrollSelectedIntoView();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.handleResize.cancel();
      this.handleTabsScroll.cancel();
    }
  }, {
    key: 'updateIndicatorState',
    value: function updateIndicatorState(props) {
      var theme = props.theme,
          value = props.value;

      var _getTabsMeta = this.getTabsMeta(value, theme.direction),
          tabsMeta = _getTabsMeta.tabsMeta,
          tabMeta = _getTabsMeta.tabMeta;

      var left = 0;

      if (tabMeta && tabsMeta) {
        var correction = theme.direction === 'rtl' ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth : tabsMeta.scrollLeft;
        left = tabMeta.left - tabsMeta.left + correction;
      }

      var indicatorStyle = {
        left: left,
        // May be wrong until the font is loaded.
        width: tabMeta ? tabMeta.width : 0
      };

      if ((indicatorStyle.left !== this.state.indicatorStyle.left || indicatorStyle.width !== this.state.indicatorStyle.width) && !_Number$isNaN(indicatorStyle.left) && !_Number$isNaN(indicatorStyle.width)) {
        this.setState({ indicatorStyle: indicatorStyle });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames3,
          _this2 = this;

      var _props = this.props,
          action = _props.action,
          buttonClassName = _props.buttonClassName,
          centered = _props.centered,
          childrenProp = _props.children,
          classes = _props.classes,
          classNameProp = _props.className,
          fullWidth = _props.fullWidth,
          indicatorClassName = _props.indicatorClassName,
          indicatorColor = _props.indicatorColor,
          onChange = _props.onChange,
          scrollable = _props.scrollable,
          scrollButtons = _props.scrollButtons,
          TabScrollButtonProp = _props.TabScrollButton,
          textColor = _props.textColor,
          theme = _props.theme,
          value = _props.value,
          other = _objectWithoutProperties(_props, ['action', 'buttonClassName', 'centered', 'children', 'classes', 'className', 'fullWidth', 'indicatorClassName', 'indicatorColor', 'onChange', 'scrollable', 'scrollButtons', 'TabScrollButton', 'textColor', 'theme', 'value']);

      var className = classnames(classes.root, classNameProp);
      var scrollerClassName = classnames(classes.scrollingContainer, (_classNames3 = {}, _defineProperty$1(_classNames3, classes.fixed, !scrollable), _defineProperty$1(_classNames3, classes.scrollable, scrollable), _classNames3));
      var tabItemContainerClassName = classnames(classes.flexContainer, _defineProperty$1({}, classes.centered, centered && !scrollable));

      var indicator = React.createElement(TabIndicator$1, {
        style: this.state.indicatorStyle,
        className: indicatorClassName,
        color: indicatorColor
      });

      this.valueToIndex = {};
      var childIndex = 0;
      var children = React.Children.map(childrenProp, function (child) {
        if (!React.isValidElement(child)) {
          return null;
        }

        var childValue = child.props.value || childIndex;
        _this2.valueToIndex[childValue] = childIndex;
        var selected = childValue === value;

        childIndex += 1;
        return React.cloneElement(child, {
          fullWidth: fullWidth,
          indicator: selected && !_this2.state.mounted && indicator,
          selected: selected,
          onChange: onChange,
          textColor: textColor,
          value: childValue
        });
      });

      var conditionalElements = this.getConditionalElements();

      return React.createElement(
        'div',
        _extends$1({ className: className }, other),
        React.createElement(EventListener, { target: 'window', onResize: this.handleResize }),
        conditionalElements.scrollbarSizeListener,
        React.createElement(
          'div',
          { className: classes.flexContainer },
          conditionalElements.scrollButtonLeft,
          React.createElement(
            'div',
            {
              className: scrollerClassName,
              style: this.state.scrollerStyle,
              ref: function ref(node) {
                _this2.tabs = node;
              },
              role: 'tablist',
              onScroll: this.handleTabsScroll
            },
            React.createElement(
              'div',
              { className: tabItemContainerClassName },
              children
            ),
            this.state.mounted && indicator
          ),
          conditionalElements.scrollButtonRight
        )
      );
    }
  }]);

  return Tabs;
}(React.Component);

Tabs.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports `updateIndicator()` action.
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: propTypes.func,
  /**
   * The CSS class name of the scroll button elements.
   */
  buttonClassName: propTypes.string,
  /**
   * If `true`, the tabs will be centered.
   * This property is intended for large views.
   */
  centered: propTypes.bool,
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * If `true`, the tabs will grow to use all the available space.
   * This property is intended for small views, like on mobile.
   */
  fullWidth: propTypes.bool,
  /**
   * The CSS class name of the indicator element.
   */
  indicatorClassName: propTypes.string,
  /**
   * Determines the color of the indicator.
   */
  indicatorColor: propTypes.oneOfType([propTypes.string, propTypes.oneOf(['secondary', 'primary'])]),
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {number} value We default to the index of the child
   */
  onChange: propTypes.func,
  /**
   * True invokes scrolling properties and allow for horizontally scrolling
   * (or swiping) the tab bar.
   */
  scrollable: propTypes.bool,
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll
   * `auto` will only present them on medium and larger viewports
   * `on` will always present them
   * `off` will never present them
   */
  scrollButtons: propTypes.oneOf(['auto', 'on', 'off']),
  /**
   * The component used to render the scroll buttons.
   */
  TabScrollButton: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /**
   * Determines the color of the `Tab`.
   */
  textColor: propTypes.oneOf(['secondary', 'primary', 'inherit']),
  /**
   * @ignore
   */
  theme: propTypes.object.isRequired,
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: propTypes.any
} : {};

Tabs.defaultProps = {
  centered: false,
  fullWidth: false,
  indicatorColor: 'secondary',
  scrollable: false,
  scrollButtons: 'auto',
  TabScrollButton: TabScrollButton$1,
  textColor: 'inherit'
};

var Tabs$1 = withStyles(styles$86, { name: 'MuiTabs', withTheme: true })(Tabs);

// @inheritedComponent ButtonBase

var styles$87 = function styles(theme) {
  return {
    root: _extends$1({}, theme.typography.button, _defineProperty$1({
      maxWidth: 264,
      position: 'relative',
      minWidth: 72,
      padding: 0,
      height: 48,
      flex: 'none',
      overflow: 'hidden'
    }, theme.breakpoints.up('md'), {
      minWidth: 160
    })),
    rootLabelIcon: {
      height: 72
    },
    rootInherit: {
      color: 'inherit',
      opacity: 0.7
    },
    rootPrimary: {
      color: theme.palette.text.secondary
    },
    rootPrimarySelected: {
      color: theme.palette.primary.main
    },
    rootPrimaryDisabled: {
      color: theme.palette.text.disabled
    },
    rootSecondary: {
      color: theme.palette.text.secondary
    },
    rootSecondarySelected: {
      color: theme.palette.secondary.main
    },
    rootSecondaryDisabled: {
      color: theme.palette.text.disabled
    },
    rootInheritSelected: {
      opacity: 1
    },
    rootInheritDisabled: {
      opacity: 0.4
    },
    fullWidth: {
      flexGrow: 1
    },
    wrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'column'
    },
    labelContainer: _defineProperty$1({
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 12,
      paddingRight: 12
    }, theme.breakpoints.up('md'), {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }),
    label: _defineProperty$1({
      fontSize: theme.typography.pxToRem(theme.typography.fontSize),
      whiteSpace: 'normal'
    }, theme.breakpoints.up('md'), {
      fontSize: theme.typography.pxToRem(theme.typography.fontSize - 1)
    }),
    labelWrapped: _defineProperty$1({}, theme.breakpoints.down('sm'), {
      fontSize: theme.typography.pxToRem(theme.typography.fontSize - 2)
    })
  };
};

var Tab = function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || _Object$getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      wrappedText: false
    }, _this.handleChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          value = _this$props.value,
          onClick = _this$props.onClick;


      if (onChange) {
        onChange(event, value);
      }

      if (onClick) {
        onClick(event);
      }
    }, _this.label = undefined, _this.checkTextWrap = function () {
      if (_this.label) {
        var wrappedText = _this.label.getClientRects().length > 1;
        if (_this.state.wrappedText !== wrappedText) {
          _this.setState({ wrappedText: wrappedText });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkTextWrap();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.wrappedText === prevState.wrappedText) {
        /**
         * At certain text and tab lengths, a larger font size may wrap to two lines while the smaller
         * font size still only requires one line.  This check will prevent an infinite render loop
         * fron occurring in that scenario.
         */
        this.checkTextWrap();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this,
          _classNames2;

      var _props = this.props,
          classes = _props.classes,
          classNameProp = _props.className,
          disabled = _props.disabled,
          fullWidth = _props.fullWidth,
          icon = _props.icon,
          indicator = _props.indicator,
          labelProp = _props.label,
          onChange = _props.onChange,
          selected = _props.selected,
          styleProp = _props.style,
          textColor = _props.textColor,
          value = _props.value,
          other = _objectWithoutProperties(_props, ['classes', 'className', 'disabled', 'fullWidth', 'icon', 'indicator', 'label', 'onChange', 'selected', 'style', 'textColor', 'value']);

      var label = void 0;

      if (labelProp !== undefined) {
        label = React.createElement(
          'span',
          { className: classes.labelContainer },
          React.createElement(
            'span',
            {
              className: classnames(classes.label, _defineProperty$1({}, classes.labelWrapped, this.state.wrappedText)),
              ref: function ref(node) {
                _this2.label = node;
              }
            },
            labelProp
          )
        );
      }

      var className = classnames(classes.root, classes['root' + capitalize(textColor)], (_classNames2 = {}, _defineProperty$1(_classNames2, classes['root' + capitalize(textColor) + 'Disabled'], disabled), _defineProperty$1(_classNames2, classes['root' + capitalize(textColor) + 'Selected'], selected), _defineProperty$1(_classNames2, classes.rootLabelIcon, icon && label), _defineProperty$1(_classNames2, classes.fullWidth, fullWidth), _classNames2), classNameProp);

      var style = {};

      if (textColor !== 'secondary' && textColor !== 'inherit') {
        style.color = textColor;
      }

      style = _Object$keys(style).length > 0 ? _extends$1({}, style, styleProp) : styleProp;

      return React.createElement(
        ButtonBase$1,
        _extends$1({
          focusRipple: true,
          className: className,
          style: style,
          role: 'tab',
          'aria-selected': selected,
          disabled: disabled
        }, other, {
          onClick: this.handleChange
        }),
        React.createElement(
          'span',
          { className: classes.wrapper },
          icon,
          label
        ),
        indicator
      );
    }
  }]);

  return Tab;
}(React.Component);

Tab.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * If `true`, the tab will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * @ignore
   */
  fullWidth: propTypes.bool,
  /**
   * The icon element.
   */
  icon: propTypes.node,
  /**
   * @ignore
   * For server side rendering consideration, we let the selected tab
   * render the indicator.
   */
  indicator: propTypes.node,
  /**
   * The label element.
   */
  label: propTypes.node,
  /**
   * @ignore
   */
  onChange: propTypes.func,
  /**
   * @ignore
   */
  onClick: propTypes.func,
  /**
   * @ignore
   */
  selected: propTypes.bool,
  /**
   * @ignore
   */
  style: propTypes.object,
  /**
   * @ignore
   */
  textColor: propTypes.oneOfType([propTypes.string, propTypes.oneOf(['secondary', 'primary', 'inherit'])]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: propTypes.any
} : {};

Tab.defaultProps = {
  disabled: false,
  textColor: 'inherit'
};

var Tab$1 = withStyles(styles$87, { name: 'MuiTab' })(Tab);

// @inheritedComponent FormControl

/**
 * The `TextField` is a convenience wrapper for the most common cases (80%).
 * It cannot be all things to all people, otherwise the API would grow out of control.
 *
 * ## Advanced Configuration
 *
 * It's important to understand that the text field is a simple abstraction
 * on top of the following components:
 * - [FormControl](/api/form-control)
 * - [InputLabel](/api/input-label)
 * - [Input](/api/input)
 * - [FormHelperText](/api/form-helper-text)
 *
 * If you wish to alter the properties applied to the native input, you can do as follow:
 *
 * ```jsx
 * const inputProps = {
 *   step: 300,
 * };
 *
 * return <TextField id="time" type="time" inputProps={inputProps} />;
 * ```
 *
 * For advanced cases, please look at the source of TextField by clicking on the
 * "Edit this page" button above. Consider either:
 * - using the upper case props for passing values direct to the components.
 * - using the underlying components directly as shown in the demos.
 */
function TextField(props) {
  var autoComplete = props.autoComplete,
      autoFocus = props.autoFocus,
      children = props.children,
      className = props.className,
      defaultValue = props.defaultValue,
      disabled = props.disabled,
      error = props.error,
      FormHelperTextProps = props.FormHelperTextProps,
      fullWidth = props.fullWidth,
      helperText = props.helperText,
      helperTextClassName = props.helperTextClassName,
      id = props.id,
      InputLabelProps = props.InputLabelProps,
      inputProps = props.inputProps,
      InputProps = props.InputProps,
      inputRef = props.inputRef,
      label = props.label,
      labelClassName = props.labelClassName,
      multiline = props.multiline,
      name = props.name,
      onChange = props.onChange,
      placeholder = props.placeholder,
      required = props.required,
      rows = props.rows,
      rowsMax = props.rowsMax,
      select = props.select,
      SelectProps = props.SelectProps,
      type = props.type,
      value = props.value,
      other = _objectWithoutProperties(props, ['autoComplete', 'autoFocus', 'children', 'className', 'defaultValue', 'disabled', 'error', 'FormHelperTextProps', 'fullWidth', 'helperText', 'helperTextClassName', 'id', 'InputLabelProps', 'inputProps', 'InputProps', 'inputRef', 'label', 'labelClassName', 'multiline', 'name', 'onChange', 'placeholder', 'required', 'rows', 'rowsMax', 'select', 'SelectProps', 'type', 'value']);

  process.env.NODE_ENV !== "production" ? warning_1$2(!select || Boolean(children), 'Material-UI: `children` must be passed when using the `TextField` component with `select`.') : void 0;

  var helperTextId = helperText && id ? id + '-helper-text' : undefined;
  var InputComponent = React.createElement(Input$1, _extends$1({
    autoComplete: autoComplete,
    autoFocus: autoFocus,
    defaultValue: defaultValue,
    disabled: disabled,
    fullWidth: fullWidth,
    multiline: multiline,
    name: name,
    rows: rows,
    rowsMax: rowsMax,
    type: type,
    value: value,
    id: id,
    inputRef: inputRef,
    onChange: onChange,
    placeholder: placeholder,
    inputProps: inputProps
  }, InputProps));

  return React.createElement(
    FormControl$1,
    _extends$1({
      'aria-describedby': helperTextId,
      className: className,
      error: error,
      fullWidth: fullWidth,
      required: required
    }, other),
    label && React.createElement(
      InputLabel$1,
      _extends$1({ htmlFor: id, className: labelClassName }, InputLabelProps),
      label
    ),
    select ? React.createElement(
      Select$1,
      _extends$1({ value: value, input: InputComponent }, SelectProps),
      children
    ) : InputComponent,
    helperText && React.createElement(
      FormHelperText$1,
      _extends$1({ className: helperTextClassName, id: helperTextId }, FormHelperTextProps),
      helperText
    )
  );
}

TextField.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it here:
   * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
   */
  autoComplete: propTypes.string,
  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus: propTypes.bool,
  /**
   * @ignore
   */
  children: propTypes.node,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * The default value of the `Input` element.
   */
  defaultValue: propTypes.string,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: propTypes.bool,
  /**
   * Properties applied to the `FormHelperText` element.
   */
  FormHelperTextProps: propTypes.object,
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth: propTypes.bool,
  /**
   * The helper text content.
   */
  helperText: propTypes.node,
  /**
   * The CSS class name of the helper text element.
   */
  helperTextClassName: propTypes.string,
  /**
   * The id of the `input` element.
   * Use that property to make `label` and `helperText` accessible for screen readers.
   */
  id: propTypes.string,
  /**
   * Properties applied to the `InputLabel` element.
   */
  InputLabelProps: propTypes.object,
  /**
   * Properties applied to the `Input` element.
   */
  InputProps: propTypes.object,
  /**
   * Properties applied to the native `input` element.
   */
  inputProps: propTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: propTypes.func,
  /**
   * The label content.
   */
  label: propTypes.node,
  /**
   * The CSS class name of the label element.
   */
  labelClassName: propTypes.string,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin: propTypes.oneOf(['none', 'dense', 'normal']),
  /**
   * If `true`, a textarea element will be rendered instead of an input.
   */
  multiline: propTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: propTypes.string,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback
   */
  onChange: propTypes.func,
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: propTypes.string,
  /**
   * If `true`, the label is displayed as required.
   */
  required: propTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /**
   * Render a `Select` element while passing the `Input` element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   */
  select: propTypes.bool,
  /**
   * Properties applied to the `Select` element.
   */
  SelectProps: propTypes.object,
  /**
   * Type attribute of the `Input` element. It should be a valid HTML5 input type.
   */
  type: propTypes.string,
  /**
   * The value of the `Input` element, required for a controlled component.
   */
  value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number]))])
} : {};

TextField.defaultProps = {
  required: false,
  select: false
};

var Manager_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Manager = function (_Component) {
  _inherits(Manager, _Component);

  function Manager() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Manager);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Manager.__proto__ || Object.getPrototypeOf(Manager)).call.apply(_ref, [this].concat(args))), _this), _this._setTargetNode = function (node) {
      _this._targetNode = node;
    }, _this._getTargetNode = function () {
      return _this._targetNode;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Manager, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        popperManager: {
          setTargetNode: this._setTargetNode,
          getTargetNode: this._getTargetNode
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          tag = _props.tag,
          children = _props.children,
          restProps = _objectWithoutProperties(_props, ['tag', 'children']);

      if (tag !== false) {
        return (0, React.createElement)(tag, restProps, children);
      } else {
        return children;
      }
    }
  }]);

  return Manager;
}(React.Component);

Manager.childContextTypes = {
  popperManager: _propTypes2.default.object.isRequired
};
Manager.propTypes = {
  tag: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool])
};
Manager.defaultProps = {
  tag: 'div'
};
exports.default = Manager;
});

unwrapExports(Manager_1);

var Target_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Target = function Target(props, context) {
  var _props$component = props.component,
      component = _props$component === undefined ? 'div' : _props$component,
      innerRef = props.innerRef,
      children = props.children,
      restProps = _objectWithoutProperties(props, ['component', 'innerRef', 'children']);

  var popperManager = context.popperManager;

  var targetRef = function targetRef(node) {
    popperManager.setTargetNode(node);
    if (typeof innerRef === 'function') {
      innerRef(node);
    }
  };

  if (typeof children === 'function') {
    var targetProps = { ref: targetRef };
    return children({ targetProps: targetProps, restProps: restProps });
  }

  var componentProps = _extends({}, restProps);

  if (typeof component === 'string') {
    componentProps.ref = targetRef;
  } else {
    componentProps.innerRef = targetRef;
  }

  return (0, React.createElement)(component, componentProps, children);
};

Target.contextTypes = {
  popperManager: _propTypes2.default.object.isRequired
};

Target.propTypes = {
  component: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  innerRef: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])
};

exports.default = Target;
});

unwrapExports(Target_1);

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.9
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser$2 = typeof window !== 'undefined' && typeof document !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i$1 = 0; i$1 < longerTimeoutBrowsers.length; i$1 += 1) {
  if (isBrowser$2 && navigator.userAgent.indexOf(longerTimeoutBrowsers[i$1]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser$2 && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce$2 = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var css = getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent$1(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent$1(getParentNode(element));
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  var offsetParent = element && element.offsetParent;
  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    if (element) {
      return element.ownerDocument.documentElement;
    }

    return document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

/**
 * Tells if you are running Internet Explorer 10
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean} isIE10
 */
var isIE10 = undefined;

var isIE10$1 = function () {
  if (isIE10 === undefined) {
    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
  }
  return isIE10;
};

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}

function getWindowSizes() {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE10$1() && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck$1 = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty$7 = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends$2 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends$2({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  if (isIE10$1()) {
    try {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } catch (err) {}
  } else {
    rect = element.getBoundingClientRect();
  }

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var isIE10 = isIE10$1();
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent$1(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = getScroll(html);
  var scrollLeft = getScroll(html, 'left');

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return isFixed(getParentNode(element));
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  // NOTE: 1 DOM access here
  var boundaries = { top: 0, left: 0 };
  var offsetParent = findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent$1(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends$2({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var commonOffsetParent = findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var styles = getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find$1(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex$1(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find$1(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex$1(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length - 1; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.left = '';
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent$1(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent$1(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find$1(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  // floor sides to avoid blurry text
  var offsets = {
    left: Math.floor(popper.left),
    top: Math.floor(popper.top),
    bottom: Math.floor(popper.bottom),
    right: Math.floor(popper.right)
  };

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends$2({}, attributes, data.attributes);
  data.styles = _extends$2({}, styles, data.styles);
  data.arrowStyles = _extends$2({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find$1(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$7(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$7(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends$2({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find$1(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty$7({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty$7({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends$2({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty$7({}, side, reference[side]),
      end: defineProperty$7({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends$2({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide$1(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find$1(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide$1
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck$1(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce$2(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends$2({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends$2({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends$2({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends$2({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass$1(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;





var popper = Object.freeze({
	default: Popper
});

var _popper = ( popper && Popper ) || popper;

var Popper_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);



var _popper2 = _interopRequireDefault(_popper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popper = function (_Component) {
  _inherits(Popper, _Component);

  function Popper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Popper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popper.__proto__ || Object.getPrototypeOf(Popper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._setArrowNode = function (node) {
      _this._arrowNode = node;
    }, _this._getTargetNode = function () {
      return _this.context.popperManager.getTargetNode();
    }, _this._getOffsets = function (data) {
      return Object.keys(data.offsets).map(function (key) {
        return data.offsets[key];
      });
    }, _this._isDataDirty = function (data) {
      if (_this.state.data) {
        return JSON.stringify(_this._getOffsets(_this.state.data)) !== JSON.stringify(_this._getOffsets(data));
      } else {
        return true;
      }
    }, _this._updateStateModifier = {
      enabled: true,
      order: 900,
      fn: function fn(data) {
        if (_this._isDataDirty(data)) {
          _this.setState({ data: data });
        }
        return data;
      }
    }, _this._getPopperStyle = function () {
      var data = _this.state.data;

      // If Popper isn't instantiated, hide the popperElement
      // to avoid flash of unstyled content

      if (!data) {
        return {
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0
        };
      }

      var _data$offsets$popper = data.offsets.popper,
          top = _data$offsets$popper.top,
          left = _data$offsets$popper.left,
          position = _data$offsets$popper.position;


      return _extends({
        position: position
      }, data.styles);
    }, _this._getPopperPlacement = function () {
      return _this.state.data ? _this.state.data.placement : undefined;
    }, _this._getPopperHide = function () {
      return !!_this.state.data && _this.state.data.hide ? '' : undefined;
    }, _this._getArrowStyle = function () {
      if (!_this.state.data || !_this.state.data.offsets.arrow) {
        return {};
      } else {
        var _this$state$data$offs = _this.state.data.offsets.arrow,
            top = _this$state$data$offs.top,
            left = _this$state$data$offs.left;

        return { top: top, left: left };
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Popper, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        popper: {
          setArrowNode: this._setArrowNode,
          getArrowStyle: this._getArrowStyle
        }
      };
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(lastProps) {
      if (lastProps.placement !== this.props.placement || lastProps.eventsEnabled !== this.props.eventsEnabled) {
        this._destroyPopper();
        this._createPopper();
      }

      if (lastProps.children !== this.props.children) {
        this._popper.scheduleUpdate();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._destroyPopper();
    }
  }, {
    key: '_createPopper',
    value: function _createPopper() {
      var _props = this.props,
          placement = _props.placement,
          eventsEnabled = _props.eventsEnabled;

      var modifiers = _extends({}, this.props.modifiers, {
        applyStyle: { enabled: false },
        updateState: this._updateStateModifier
      });

      if (this._arrowNode) {
        modifiers.arrow = {
          element: this._arrowNode
        };
      }

      this._popper = new _popper2.default(this._getTargetNode(), this._node, {
        placement: placement,
        eventsEnabled: eventsEnabled,
        modifiers: modifiers
      });

      // schedule an update to make sure everything gets positioned correctly
      // after being instantiated
      this._popper.scheduleUpdate();
    }
  }, {
    key: '_destroyPopper',
    value: function _destroyPopper() {
      if (this._popper) {
        this._popper.destroy();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          component = _props2.component,
          innerRef = _props2.innerRef,
          placement = _props2.placement,
          eventsEnabled = _props2.eventsEnabled,
          modifiers = _props2.modifiers,
          children = _props2.children,
          restProps = _objectWithoutProperties(_props2, ['component', 'innerRef', 'placement', 'eventsEnabled', 'modifiers', 'children']);

      var popperRef = function popperRef(node) {
        _this2._node = node;
        if (node) {
          _this2._createPopper();
        } else {
          _this2._destroyPopper();
        }
        if (typeof innerRef === 'function') {
          innerRef(node);
        }
      };
      var popperStyle = this._getPopperStyle();
      var popperPlacement = this._getPopperPlacement();
      var popperHide = this._getPopperHide();

      if (typeof children === 'function') {
        var _popperProps;

        var popperProps = (_popperProps = {
          ref: popperRef,
          style: popperStyle
        }, _defineProperty(_popperProps, 'data-placement', popperPlacement), _defineProperty(_popperProps, 'data-x-out-of-boundaries', popperHide), _popperProps);

        return children({
          popperProps: popperProps,
          restProps: restProps,
          scheduleUpdate: function scheduleUpdate() {
            // _createPopper will scheduleUpdate,
            // so calling this before this._popper exists
            // can be a noop.
            _this2._popper && _this2._popper.scheduleUpdate();
          }
        });
      }

      var componentProps = _extends({}, restProps, {
        style: _extends({}, restProps.style, popperStyle),
        'data-placement': popperPlacement,
        'data-x-out-of-boundaries': popperHide
      });

      if (typeof component === 'string') {
        componentProps.ref = popperRef;
      } else {
        componentProps.innerRef = popperRef;
      }

      return (0, React.createElement)(component, componentProps, children);
    }
  }]);

  return Popper;
}(React.Component);

Popper.contextTypes = {
  popperManager: _propTypes2.default.object.isRequired
};
Popper.childContextTypes = {
  popper: _propTypes2.default.object.isRequired
};
Popper.propTypes = {
  component: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  innerRef: _propTypes2.default.func,
  placement: _propTypes2.default.oneOf(_popper2.default.placements),
  eventsEnabled: _propTypes2.default.bool,
  modifiers: _propTypes2.default.object,
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])
};
Popper.defaultProps = {
  component: 'div',
  placement: 'bottom',
  eventsEnabled: true,
  modifiers: {}
};
exports.default = Popper;
});

unwrapExports(Popper_1);

var Arrow_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Arrow = function Arrow(props, context) {
  var _props$component = props.component,
      component = _props$component === undefined ? 'span' : _props$component,
      innerRef = props.innerRef,
      children = props.children,
      restProps = _objectWithoutProperties(props, ['component', 'innerRef', 'children']);

  var popper = context.popper;

  var arrowRef = function arrowRef(node) {
    popper.setArrowNode(node);
    if (typeof innerRef === 'function') {
      innerRef(node);
    }
  };
  var arrowStyle = popper.getArrowStyle();

  if (typeof children === 'function') {
    var arrowProps = {
      ref: arrowRef,
      style: arrowStyle
    };
    return children({ arrowProps: arrowProps, restProps: restProps });
  }

  var componentProps = _extends({}, restProps, {
    style: _extends({}, arrowStyle, restProps.style)
  });

  if (typeof component === 'string') {
    componentProps.ref = arrowRef;
  } else {
    componentProps.innerRef = arrowRef;
  }

  return (0, React.createElement)(component, componentProps, children);
};

Arrow.contextTypes = {
  popper: _propTypes2.default.object.isRequired
};

Arrow.propTypes = {
  component: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  innerRef: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])
};

exports.default = Arrow;
});

unwrapExports(Arrow_1);

var reactPopper = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Arrow = exports.Popper = exports.Target = exports.Manager = undefined;



var _Manager3 = _interopRequireDefault(Manager_1);



var _Target3 = _interopRequireDefault(Target_1);



var _Popper3 = _interopRequireDefault(Popper_1);



var _Arrow3 = _interopRequireDefault(Arrow_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Manager = _Manager3.default;
exports.Target = _Target3.default;
exports.Popper = _Popper3.default;
exports.Arrow = _Arrow3.default;
});

unwrapExports(reactPopper);
var reactPopper_1 = reactPopper.Arrow;
var reactPopper_2 = reactPopper.Popper;
var reactPopper_3 = reactPopper.Target;
var reactPopper_4 = reactPopper.Manager;

/* eslint-disable react/no-multi-comp, no-underscore-dangle */

var styles$88 = function styles(theme) {
  return {
    root: {
      display: 'inline',
      flexDirection: 'inherit' // Makes the wrapper more transparent.
    },
    popper: {
      zIndex: theme.zIndex.tooltip
    },
    popperClose: {
      pointerEvents: 'none'
    },
    tooltip: _defineProperty$1({
      backgroundColor: theme.palette.grey[700],
      borderRadius: 2,
      color: common.white,
      fontFamily: theme.typography.fontFamily,
      opacity: 0,
      transform: 'scale(0)',
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shortest
      }),
      minHeight: 0,
      padding: theme.spacing.unit,
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.round(16 / 14) + 'em'
    }, theme.breakpoints.up('sm'), {
      padding: theme.spacing.unit / 2 + 'px ' + theme.spacing.unit + 'px',
      fontSize: theme.typography.pxToRem(10),
      lineHeight: theme.typography.round(14 / 10) + 'em'
    }),
    tooltipLeft: _defineProperty$1({
      transformOrigin: 'right center',
      margin: '0 ' + theme.spacing.unit * 3 + 'px'
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),
    tooltipRight: _defineProperty$1({
      transformOrigin: 'left center',
      margin: '0 ' + theme.spacing.unit * 3 + 'px'
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),
    tooltipTop: _defineProperty$1({
      transformOrigin: 'center bottom',
      margin: theme.spacing.unit * 3 + 'px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    }),
    tooltipBottom: _defineProperty$1({
      transformOrigin: 'center top',
      margin: theme.spacing.unit * 3 + 'px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    }),
    tooltipOpen: {
      opacity: 0.9,
      transform: 'scale(1)'
    }
  };
};

function flipPlacement(placement) {
  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || _Object$getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.enterTimer = null, _this.leaveTimer = null, _this.touchTimer = null, _this.isControlled = null, _this.popper = null, _this.children = null, _this.ignoreNonTouchEvents = false, _this.handleResize = debounce_1(function () {
      if (_this.popper) {
        _this.popper._popper.scheduleUpdate();
      }
    }, 166), _this.handleRequestOpen = function (event) {
      var children = _this.props.children;

      var childrenProps = children.props;

      if (event.type === 'focus' && childrenProps.onFocus) {
        childrenProps.onFocus(event);
      }

      if (event.type === 'mouseover' && childrenProps.onMouseOver) {
        childrenProps.onMouseOver(event);
      }

      if (_this.ignoreNonTouchEvents && event.type !== 'touchstart') {
        return;
      }

      clearTimeout(_this.leaveTimer);
      if (_this.props.enterDelay > 0) {
        _this.leaveTimer = setTimeout(function () {
          _this.requestOpen(event);
        }, _this.props.enterDelay);
      } else {
        _this.requestOpen(event);
      }
    }, _this.requestOpen = function (event) {
      if (!_this.isControlled) {
        _this.setState({ open: true });
      }

      if (_this.props.onOpen) {
        _this.props.onOpen(event, true);
      }
    }, _this.handleClose = function (event) {
      var children = _this.props.children;

      var childrenProps = children.props;

      if (event.type === 'blur' && childrenProps.onBlur) {
        childrenProps.onBlur(event);
      }

      if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
        childrenProps.onMouseLeave(event);
      }

      clearTimeout(_this.leaveTimer);
      if (_this.props.leaveDelay) {
        _this.leaveTimer = setTimeout(function () {
          _this.requestClose(event);
        }, _this.props.leaveDelay);
      } else {
        _this.requestClose(event);
      }
    }, _this.requestClose = function (event) {
      _this.ignoreNonTouchEvents = false;

      if (!_this.isControlled) {
        _this.setState({ open: false });
      }

      if (_this.props.onClose) {
        _this.props.onClose(event, false);
      }
    }, _this.handleTouchStart = function (event) {
      _this.ignoreNonTouchEvents = true;
      var children = _this.props.children;

      var childrenProps = children.props;

      if (childrenProps.onTouchStart) {
        childrenProps.onTouchStart(event);
      }

      clearTimeout(_this.touchTimer);
      event.persist();
      _this.touchTimer = setTimeout(function () {
        _this.handleRequestOpen(event);
      }, 1e3);
    }, _this.handleTouchEnd = function (event) {
      var children = _this.props.children;

      var childrenProps = children.props;

      if (childrenProps.onTouchEnd) {
        childrenProps.onTouchEnd(event);
      }

      clearTimeout(_this.touchTimer);
      clearTimeout(_this.leaveTimer);
      event.persist();
      _this.leaveTimer = setTimeout(function () {
        _this.requestClose(event);
      }, 1500 + _this.props.leaveDelay);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tooltip, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var props = this.props;


      this.isControlled = props.open != null;

      if (!this.isControlled) {
        // not controlled, use internal state
        this.setState({
          open: false
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      process.env.NODE_ENV !== "production" ? warning_1$2(!this.children || !this.children.disabled || !this.children.tagName.toLowerCase() === 'button', ['Material-UI: you are providing a disabled button children to the Tooltip component.', 'A disabled element do not fire events.', 'But the Tooltip needs to listen to the children element events to display the title.', '', 'Place a `div` over top of the element.'].join('\n')) : void 0;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.enterTimer);
      clearTimeout(this.leaveTimer);
      this.handleResize.cancel();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          childrenProp = _props.children,
          classes = _props.classes,
          className = _props.className,
          disableTriggerFocus = _props.disableTriggerFocus,
          disableTriggerHover = _props.disableTriggerHover,
          disableTriggerTouch = _props.disableTriggerTouch,
          enterDelay = _props.enterDelay,
          id = _props.id,
          leaveDelay = _props.leaveDelay,
          onClose = _props.onClose,
          onOpen = _props.onOpen,
          openProp = _props.open,
          rawPlacement = _props.placement,
          _props$PopperProps = _props.PopperProps;
      _props$PopperProps = _props$PopperProps === undefined ? {} : _props$PopperProps;

      var PopperClassName = _props$PopperProps.PopperClassName,
          PopperOther = _objectWithoutProperties(_props$PopperProps, ['PopperClassName']),
          theme = _props.theme,
          title = _props.title,
          other = _objectWithoutProperties(_props, ['children', 'classes', 'className', 'disableTriggerFocus', 'disableTriggerHover', 'disableTriggerTouch', 'enterDelay', 'id', 'leaveDelay', 'onClose', 'onOpen', 'open', 'placement', 'PopperProps', 'theme', 'title']);

      var placement = theme.direction === 'rtl' ? flipPlacement(rawPlacement) : rawPlacement;
      var open = this.isControlled ? openProp : this.state.open;
      var childrenProps = {};

      if (title === '') {
        open = false;
      }

      childrenProps['aria-describedby'] = id;

      if (!disableTriggerTouch) {
        childrenProps.onTouchStart = this.handleTouchStart;
        childrenProps.onTouchEnd = this.handleTouchEnd;
      }

      if (!disableTriggerHover) {
        childrenProps.onMouseOver = this.handleRequestOpen;
        childrenProps.onMouseLeave = this.handleClose;
      }

      if (!disableTriggerFocus) {
        childrenProps.onFocus = this.handleRequestOpen;
        childrenProps.onBlur = this.handleClose;
      }

      process.env.NODE_ENV !== "production" ? warning_1$2(!childrenProp.props.title, ['Material-UI: you have been providing a `title` property to the child of <Tooltip />.', 'Remove this title property `' + childrenProp.props.title + '` or the Tooltip component.'].join('\n')) : void 0;

      return React.createElement(
        EventListener,
        { target: 'window', onResize: this.handleResize },
        React.createElement(
          reactPopper_4,
          _extends$1({ className: classnames(classes.root, className) }, other),
          React.createElement(
            reactPopper_3,
            null,
            function (_ref2) {
              var targetProps = _ref2.targetProps;
              return React.createElement(
                RefHolder,
                {
                  ref: function ref(node) {
                    _this2.children = findDOMNode(node);
                    targetProps.ref(_this2.children);
                  }
                },
                React.cloneElement(childrenProp, childrenProps)
              );
            }
          ),
          React.createElement(
            reactPopper_2,
            _extends$1({
              placement: placement,
              eventsEnabled: open,
              className: classnames(classes.popper, _defineProperty$1({}, classes.popperClose, !open), PopperClassName)
            }, PopperOther, {
              ref: function ref(node) {
                _this2.popper = node;
              }
            }),
            function (_ref3) {
              var popperProps = _ref3.popperProps,
                  restProps = _ref3.restProps;

              var actualPlacement = popperProps['data-placement'] || placement;
              return React.createElement(
                'div',
                _extends$1({}, popperProps, restProps, {
                  style: _extends$1({}, popperProps.style, {
                    top: popperProps.style.top || 0,
                    left: popperProps.style.left || 0
                  }, restProps.style)
                }),
                React.createElement(
                  'div',
                  {
                    id: id,
                    role: 'tooltip',
                    'aria-hidden': !open,
                    className: classnames(classes.tooltip, _defineProperty$1({}, classes.tooltipOpen, open), classes['tooltip' + capitalize(actualPlacement.split('-')[0])])
                  },
                  title
                )
              );
            }
          )
        )
      );
    }
  }]);

  return Tooltip;
}(React.Component);

Tooltip.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Tooltip reference element.
   */
  children: propTypes.element.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: propTypes.object.isRequired,
  /**
   * @ignore
   */
  className: propTypes.string,
  /**
   * Do not respond to focus events.
   */
  disableTriggerFocus: propTypes.bool,
  /**
   * Do not respond to hover events.
   */
  disableTriggerHover: propTypes.bool,
  /**
   * Do not respond to long press touch events.
   */
  disableTriggerTouch: propTypes.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   */
  enterDelay: propTypes.number,
  /**
   * The relationship between the tooltip and the wrapper component is not clear from the DOM.
   * By providing this property, we can use aria-describedby to solve the accessibility issue.
   */
  id: propTypes.string,
  /**
   * The number of milliseconds to wait before hidding the tooltip.
   */
  leaveDelay: propTypes.number,
  /**
   * Callback fired when the tooltip requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: propTypes.func,
  /**
   * Callback fired when the tooltip requests to be open.
   *
   * @param {object} event The event source of the callback
   */
  onOpen: propTypes.func,
  /**
   * If `true`, the tooltip is shown.
   */
  open: propTypes.bool,
  /**
   * Tooltip placement
   */
  placement: propTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /**
   * Properties applied to the `Popper` element.
   */
  PopperProps: propTypes.object,
  /**
   * @ignore
   */
  theme: propTypes.object.isRequired,
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: propTypes.node.isRequired
} : {};

Tooltip.defaultProps = {
  disableTriggerFocus: false,
  disableTriggerHover: false,
  disableTriggerTouch: false,
  enterDelay: 0,
  leaveDelay: 0,
  placement: 'bottom'
};

var Tooltip$1 = withStyles(styles$88, { name: 'MuiTooltip', withTheme: true })(Tooltip);

// @inheritedComponent Transition

var styles$89 = {
  entering: {
    transform: 'scale(1)'
  },
  entered: {
    transform: 'scale(1)'
  }
};

/**
 * The Zoom transition is used by the SpeedDial component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

var Zoom = function (_React$Component) {
  _inherits(Zoom, _React$Component);

  function Zoom() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Zoom);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Zoom.__proto__ || _Object$getPrototypeOf(Zoom)).call.apply(_ref, [this].concat(args))), _this), _this.handleEnter = function (node) {
      var theme = _this.props.theme;

      reflow(node); // So the animation always start from the start.

      var _getTransitionProps = getTransitionProps(_this.props, {
        mode: 'enter'
      }),
          transitionDuration = _getTransitionProps.duration,
          delay = _getTransitionProps.delay;

      node.style.transition = theme.transitions.create('transform', {
        duration: transitionDuration,
        delay: delay
      });
      node.style.webkitTransition = theme.transitions.create('transform', {
        duration: transitionDuration,
        delay: delay
      });

      if (_this.props.onEnter) {
        _this.props.onEnter(node);
      }
    }, _this.handleExit = function (node) {
      var theme = _this.props.theme;

      var _getTransitionProps2 = getTransitionProps(_this.props, {
        mode: 'exit'
      }),
          transitionDuration = _getTransitionProps2.duration,
          delay = _getTransitionProps2.delay;

      node.style.transition = theme.transitions.create('transform', {
        duration: transitionDuration,
        delay: delay
      });
      node.style.webkitTransition = theme.transitions.create('transform', {
        duration: transitionDuration,
        delay: delay
      });

      if (_this.props.onExit) {
        _this.props.onExit(node);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Zoom, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          onEnter = _props.onEnter,
          onExit = _props.onExit,
          styleProp = _props.style,
          theme = _props.theme,
          other = _objectWithoutProperties(_props, ['children', 'onEnter', 'onExit', 'style', 'theme']);

      var style = _extends$1({}, styleProp, React.isValidElement(children) ? children.props.style : {});

      return React.createElement(
        Transition,
        _extends$1({ appear: true, onEnter: this.handleEnter, onExit: this.handleExit }, other),
        function (state, childProps) {
          return React.cloneElement(children, _extends$1({
            style: _extends$1({
              transform: 'scale(0)'
            }, styles$89[state], style)
          }, childProps));
        }
      );
    }
  }]);

  return Zoom;
}(React.Component);

Zoom.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A single child content element.
   */
  children: propTypes.oneOfType([propTypes.element, propTypes.func]),
  /**
   * If `true`, the component will transition in.
   */
  in: propTypes.bool,
  /**
   * @ignore
   */
  onEnter: propTypes.func,
  /**
   * @ignore
   */
  onExit: propTypes.func,
  /**
   * @ignore
   */
  style: propTypes.object,
  /**
   * @ignore
   */
  theme: propTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: propTypes.oneOfType([propTypes.number, propTypes.shape({ enter: propTypes.number, exit: propTypes.number })])
} : {};

Zoom.defaultProps = {
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};

var Zoom$1 = withTheme()(Zoom);

// eslint-disable-next-line import/first


var mui = Object.freeze({
	colors: index$2,
	AppBar: AppBar$1,
	Avatar: Avatar$1,
	Badge: Badge$1,
	BottomNavigation: BottomNavigation$1,
	BottomNavigationAction: BottomNavigationAction$1,
	Button: Button$1,
	ButtonBase: ButtonBase$1,
	Card: Card,
	CardActions: CardActions$1,
	CardContent: CardContent$1,
	CardHeader: CardHeader$1,
	CardMedia: CardMedia$1,
	Checkbox: Checkbox$1,
	Chip: Chip$1,
	ClickAwayListener: ClickAwayListener,
	Dialog: Dialog$1,
	DialogActions: DialogActions$1,
	DialogContent: DialogContent$1,
	DialogContentText: DialogContentText$1,
	DialogTitle: DialogTitle$1,
	withMobileDialog: withMobileDialog,
	Divider: Divider$1,
	Drawer: Drawer$1,
	ExpansionPanel: ExpansionPanel$1,
	ExpansionPanelActions: ExpansionPanelActions$1,
	ExpansionPanelDetails: ExpansionPanelDetails$1,
	ExpansionPanelSummary: ExpansionPanelSummary$1,
	FormControl: FormControl$1,
	FormGroup: FormGroup$1,
	FormLabel: FormLabel$1,
	FormHelperText: FormHelperText$1,
	FormControlLabel: FormControlLabel$1,
	Hidden: Hidden,
	Icon: Icon$1,
	IconButton: IconButton$1,
	Input: Input$1,
	InputLabel: InputLabel$1,
	InputAdornment: InputAdornment$1,
	Grid: Grid$1,
	GridList: GridList$1,
	GridListTile: GridListTile$1,
	GridListTileBar: GridListTileBar$1,
	List: List$1,
	ListItem: ListItem$1,
	ListItemAvatar: ListItemAvatar$1,
	ListItemIcon: ListItemIcon$1,
	ListItemSecondaryAction: ListItemSecondaryAction$1,
	ListItemText: ListItemText$1,
	ListSubheader: ListSubheader$1,
	Menu: Menu$1,
	MenuItem: MenuItem$1,
	MenuList: MenuList,
	MobileStepper: MobileStepper$1,
	Modal: Modal$1,
	Backdrop: Backdrop$1,
	ModalManager: ModalManager,
	Paper: Paper$1,
	Popover: Popover$1,
	Portal: Portal$2,
	CircularProgress: CircularProgress$1,
	LinearProgress: LinearProgress$1,
	Radio: Radio$1,
	RadioGroup: RadioGroup,
	Reboot: Reboot$1,
	Select: Select$1,
	Snackbar: Snackbar$1,
	SnackbarContent: SnackbarContent$1,
	Stepper: Stepper$1,
	Step: Step$1,
	StepButton: StepButton$1,
	StepIcon: StepIcon$1,
	StepContent: StepContent$1,
	StepLabel: StepLabel$1,
	MuiThemeProvider: MuiThemeProvider,
	withStyles: withStyles,
	withTheme: withTheme,
	createMuiTheme: createMuiTheme,
	jssPreset: jssPreset,
	SvgIcon: SvgIcon$1,
	Switch: Switch$1,
	Table: Table$1,
	TableBody: TableBody,
	TableCell: TableCell$1,
	TableFooter: TableFooter,
	TableHead: TableHead,
	TablePagination: TablePagination$1,
	TableRow: TableRow$1,
	TableSortLabel: TableSortLabel$1,
	Tabs: Tabs$1,
	Tab: Tab$1,
	Typography: Typography$1,
	TextField: TextField,
	Toolbar: Toolbar$1,
	Tooltip: Tooltip$1,
	Slide: Slide$1,
	Grow: Grow$1,
	Fade: Fade$1,
	Collapse: Collapse$1,
	Zoom: Zoom$1,
	withWidth: withWidth
});

var index$3 = (function () {
  console.log(mui);
});

export default index$3;
