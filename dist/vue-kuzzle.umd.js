(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue-function-api')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue-function-api'], factory) :
  (global = global || self, factory(global['vue-kuzzle'] = {}, global.vueFunctionApi));
}(this, function (exports, vueFunctionApi) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
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
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var SmartKuzzle =
  /*#__PURE__*/
  function () {
    function SmartKuzzle(vm, key, options) {
      var autostart = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      _classCallCheck(this, SmartKuzzle);

      this.type = null;
      this.vm = vm;
      this.key = key;
      this.initialOptions = options;
      this.options = Object.assign({}, options);
      this._skip = false;
      this._watchers = [];
      this._destroyed = false;
      this._loading = false;

      if (vm.$data.$kuzzleData && !vm.$data.$kuzzleData.queries[key]) {
        vm.$set(vm.$data.$kuzzleData.queries, key, {
          loading: false
        });
      }

      this._hasDataField = this.vm.$data.hasOwnProperty(key);

      this._initData();

      if (autostart) {
        this.autostart();
      }
    }

    _createClass(SmartKuzzle, [{
      key: "autostart",
      value: function autostart() {
        if (typeof this.options.skip === 'function') {
          this._skipWatcher = this.vm.$watch(this.options.skip.bind(this.vm), this.skipChanged.bind(this), {
            immediate: true,
            deep: this.options.deep
          });
        } else if (!this.options.skip) {
          this.start();
        } else {
          this._skip = true;
        }
      }
    }, {
      key: "skipChanged",
      value: function skipChanged(value, oldValue) {
        if (value !== oldValue) {
          this.skip = value;
        }
      }
    }, {
      key: "fetchMore",
      value: function fetchMore() {}
    }, {
      key: "refresh",
      value: function () {
        var _refresh = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (this._skip) {
                    _context.next = 5;
                    break;
                  }

                  _context.next = 3;
                  return this.stop();

                case 3:
                  _context.next = 5;
                  return this.start();

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function refresh() {
          return _refresh.apply(this, arguments);
        }

        return refresh;
      }()
    }, {
      key: "start",
      value: function start() {
        var _this = this;

        this.starting = true; // Document callback

        if (typeof this.initialOptions.document === 'function') {
          var cb = this.initialOptions.document.bind(this.vm);
          this.options.document = cb();

          this._watchers.push(this.vm.$watch(cb, function (res) {
            _this.options.document = res;

            _this.refresh();
          }, {
            deep: this.options.deep
          }));
        } // Search callback


        if (typeof this.initialOptions.search === 'function') {
          var _cb = this.initialOptions.search.bind(this.vm);

          this.options.search = _cb();

          this._watchers.push(this.vm.$watch(_cb, function (res) {
            _this.options.search = res;

            _this.refresh();
          }, {
            deep: this.options.deep
          }));
        }

        return this.executeKuzzle();
      }
    }, {
      key: "stop",
      value: function () {
        var _stop = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, unwatch;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context2.prev = 3;

                  for (_iterator = this._watchers[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    unwatch = _step.value;
                    unwatch();
                  }

                  _context2.next = 11;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2["catch"](3);
                  _didIteratorError = true;
                  _iteratorError = _context2.t0;

                case 11:
                  _context2.prev = 11;
                  _context2.prev = 12;

                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }

                case 14:
                  _context2.prev = 14;

                  if (!_didIteratorError) {
                    _context2.next = 17;
                    break;
                  }

                  throw _iteratorError;

                case 17:
                  return _context2.finish(14);

                case 18:
                  return _context2.finish(11);

                case 19:
                  if (!this.sub) {
                    _context2.next = 23;
                    break;
                  }

                  _context2.next = 22;
                  return this.client.realtime.unsubscribe(this.sub);

                case 22:
                  this.sub = null;

                case 23:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[3, 7, 11, 19], [12,, 14, 18]]);
        }));

        function stop() {
          return _stop.apply(this, arguments);
        }

        return stop;
      }()
    }, {
      key: "executeKuzzle",
      value: function executeKuzzle() {
        this.starting = false;
      }
    }, {
      key: "_initData",
      value: function _initData() {
        var _this2 = this;

        if (!this.options.manual) {
          if (this._hasDataField) {
            Object.defineProperty(this.vm.$data.$kuzzleData.data, this.key, {
              get: function get() {
                return _this2.vm.$data[_this2.key];
              },
              enumerable: true,
              configurable: true
            });
          } else {
            Object.defineProperty(this.vm.$data, this.key, {
              get: function get() {
                return _this2.vm.$data.$kuzzleData.data[_this2.key];
              },
              enumerable: true,
              configurable: true
            });
          }
        }
      }
    }, {
      key: "setData",
      value: function setData(value) {
        if (_typeof(value) === 'object') {
          Object.freeze(value);
        }

        this.vm.$set(this._hasDataField ? this.vm.$data : this.vm.$data.$kuzzleData.data, this.key, value);
      }
    }, {
      key: "getData",
      value: function getData() {
        if (this._hasDataField) {
          return this.vm.$data[this.key];
        }

        return this.vm.$data.$kuzzleData.data[this.key];
      }
    }, {
      key: "callHandlers",
      value: function callHandlers(handlers) {
        var catched = false;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = handlers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var handler = _step2.value;

            if (handler) {
              catched = true;
              var result = handler.apply(this.vm, args);

              if (typeof result !== 'undefined' && !result) {
                break;
              }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return catched;
      }
    }, {
      key: "errorHandler",
      value: function errorHandler() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return this.callHandlers.apply(this, [[this.options.error, this.vm.$kuzzle.error, this.vm.$kuzzle.provider.errorHandler]].concat(args));
      }
    }, {
      key: "catchError",
      value: function catchError(error) {
        var catched = this.errorHandler(error);
        if (catched) return;
        console.error("[vue-kuzzle] An error has occured for ".concat(this.type, " '").concat(this.key, "'"));

        if (Array.isArray(error)) {
          var _console;

          (_console = console).error.apply(_console, _toConsumableArray(error));
        } else {
          console.error(error);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this._destroyed) return;
        this._destroyed = true;
        this.stop();

        if (this._skipWatcher) {
          this._skipWatcher();
        }
      }
    }, {
      key: "skip",
      get: function get() {
        return this._skip;
      },
      set: function set(value) {
        if (value) {
          this.stop();
        } else {
          this.start();
        }

        this._skip = value;
      }
    }, {
      key: "hasMore",
      get: function get() {
        return false;
      }
    }, {
      key: "client",
      get: function get() {
        var key = this.options.client || 'defaultClient';
        return this.vm.$kuzzle.provider.clients[key];
      }
    }, {
      key: "clientSupportsRealtime",
      get: function get() {
        return typeof this.client.protocol.http === 'undefined';
      }
    }, {
      key: "index",
      get: function get() {
        var index = this.options.index || this.vm.$kuzzle.index || this.vm.$kuzzle.provider.defaultIndex;

        if (!index) {
          throw new Error('Index was not specified');
        }

        return index;
      }
    }, {
      key: "collection",
      get: function get() {
        var collection = this.options.collection || this.vm.$kuzzle.collection || this.vm.$kuzzle.provider.defaultCollection;

        if (!collection) {
          throw new Error('Collection was not specified');
        }

        return collection;
      }
    }, {
      key: "loading",
      get: function get() {
        return this.vm.$data.$kuzzleData && this.vm.$data.$kuzzleData.queries[this.key] ? this.vm.$data.$kuzzleData.queries[this.key].loading : this._loading;
      },
      set: function set(value) {
        if (this._loading !== value) {
          this._loading = value;

          if (this.vm.$data.$kuzzleData && this.vm.$data.$kuzzleData.queries[this.key]) {
            this.vm.$data.$kuzzleData.queries[this.key].loading = value;
            this.vm.$data.$kuzzleData.loading += value ? 1 : -1;
          }
        }
      }
    }]);

    return SmartKuzzle;
  }();

  function getRootChanges(reference, obj) {
    var res = {};

    for (var key in obj) {
      if (!eq(obj[key], reference[key])) {
        res[key] = obj[key];
      }
    }

    return res;
  }
  function reapply(options, context) {
    while (typeof options === 'function') {
      options = options.call(context);
    }

    return options;
  }
  var isArray = Array.isArray;
  var keyList = Object.keys;
  var hasProp = Object.prototype.hasOwnProperty;

  var definedKeyList = function definedKeyList(obj) {
    var res = [];
    var keys = keyList(obj);

    for (var index = 0; index < keys.length; index++) {
      var key = keys[index];

      if (typeof obj[key] !== 'undefined') {
        res.push(key);
      }
    }

    return res;
  }; // https://github.com/epoberezkin/fast-deep-equal


  function eq(a, b, ignoreUndefined) {
    if (a === b) return true;

    if (a && b && _typeof(a) == 'object' && _typeof(b) == 'object') {
      var arrA = isArray(a);
      var arrB = isArray(b);
      var i;
      var length;
      var key;

      if (arrA && arrB) {
        length = a.length;
        if (length != b.length) return false;

        for (i = length; i-- !== 0;) {
          if (!eq(a[i], b[i], ignoreUndefined)) return false;
        }

        return true;
      }

      if (arrA != arrB) return false;
      var dateA = a instanceof Date;
      var dateB = b instanceof Date;
      if (dateA != dateB) return false;
      if (dateA && dateB) return a.getTime() == b.getTime();
      var regexpA = a instanceof RegExp;
      var regexpB = b instanceof RegExp;
      if (regexpA != regexpB) return false;
      if (regexpA && regexpB) return a.toString() == b.toString();
      var keysA = ignoreUndefined ? definedKeyList(a) : keyList(a);
      var keysB = keyList(b);
      length = keysA.length;
      if (length !== keysB.length) return false;

      for (i = length; i-- !== 0;) {
        if (!hasProp.call(b, keysA[i])) return false;
      }

      for (i = length; i-- !== 0;) {
        key = keysA[i];
        if (!eq(a[key], b[key], ignoreUndefined)) return false;
      }

      return true;
    }

    return a !== a && b !== b;
  }

  var SmartQuery =
  /*#__PURE__*/
  function (_SmartKuzzle) {
    _inherits(SmartQuery, _SmartKuzzle);

    function SmartQuery(vm, key, options) {
      var _this;

      _classCallCheck(this, SmartQuery);

      // Simple document query
      if (_typeof(options) !== 'object') {
        var doc = options;
        options = {
          document: doc
        };
      }

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SmartQuery).call(this, vm, key, options, false));
      _this.type = 'document';

      if (vm.$data.$kuzzleData && !vm.$data.$kuzzleData.documents[key]) {
        vm.$set(vm.$data.$kuzzleData.documents, key, vm.$data.$kuzzleData.queries[key]);
      }

      _this.firstRun = new Promise(function (resolve, reject) {
        _this._firstRunResolve = resolve;
        _this._firstRunReject = reject;
      }); // if (this.vm.$isServer) {
      //   this.options.fetchPolicy = 'network-only';
      // }

      return _this;
    }

    _createClass(SmartQuery, [{
      key: "executeKuzzle",
      value: function () {
        var _executeKuzzle = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var _this$options, id, subscribe, response;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this.starting = true;
                  _this$options = this.options, id = _this$options.document, subscribe = _this$options.subscribe;
                  this.setLoading();
                  _context.prev = 3;
                  _context.next = 6;
                  return this.vm.$kuzzle.provider.connectAll();

                case 6:
                  _context.next = 8;
                  return this.client.document.get(this.index, this.collection, id);

                case 8:
                  response = _context.sent;

                  if (!response) {
                    _context.next = 12;
                    break;
                  }

                  _context.next = 12;
                  return this.nextResult(response._source, response, 'get');

                case 12:
                  this.loadingDone(null, response._source);
                  _context.next = 18;
                  break;

                case 15:
                  _context.prev = 15;
                  _context.t0 = _context["catch"](3);
                  this.catchError(_context.t0);

                case 18:
                  if (!subscribe) {
                    _context.next = 21;
                    break;
                  }

                  _context.next = 21;
                  return this.startDocumentSubscription(id);

                case 21:
                  _get(_getPrototypeOf(SmartQuery.prototype), "executeKuzzle", this).call(this);

                case 22:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 15]]);
        }));

        function executeKuzzle() {
          return _executeKuzzle.apply(this, arguments);
        }

        return executeKuzzle;
      }()
    }, {
      key: "startDocumentSubscription",
      value: function () {
        var _startDocumentSubscription = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(id) {
          var _this2 = this;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(!this.clientSupportsRealtime || this.sub)) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt("return");

                case 2:
                  _context2.prev = 2;
                  _context2.next = 5;
                  return this.client.realtime.subscribe(this.index, this.collection, {
                    ids: {
                      values: [id]
                    }
                  }, function (notificaiton) {
                    return _this2.nextResult(notificaiton.result._source, notificaiton.result, 'subscription');
                  }, {
                    subscribeToSelf: false
                  });

                case 5:
                  this.sub = _context2.sent;
                  _context2.next = 11;
                  break;

                case 8:
                  _context2.prev = 8;
                  _context2.t0 = _context2["catch"](2);
                  this.catchError(_context2.t0);

                case 11:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[2, 8]]);
        }));

        function startDocumentSubscription(_x) {
          return _startDocumentSubscription.apply(this, arguments);
        }

        return startDocumentSubscription;
      }()
    }, {
      key: "nextResult",
      value: function () {
        var _nextResult = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(doc, response, operation) {
          var respDoc;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (doc) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt("return");

                case 2:
                  if (typeof this.vm.$kuzzle.provider.afterFetch === 'function') {
                    doc = this.vm.$kuzzle.provider.afterFetch.call(this.vm, doc, response, operation);
                  }

                  if (!(typeof this.options.update === 'function')) {
                    _context3.next = 10;
                    break;
                  }

                  _context3.next = 6;
                  return Promise.resolve(this.options.update.call(this.vm, doc, response, operation));

                case 6:
                  respDoc = _context3.sent;
                  this.setData(respDoc);
                  _context3.next = 11;
                  break;

                case 10:
                  this.setData(doc);

                case 11:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function nextResult(_x2, _x3, _x4) {
          return _nextResult.apply(this, arguments);
        }

        return nextResult;
      }()
    }, {
      key: "setLoading",
      value: function setLoading() {
        if (!this.loading) {
          this.applyLoadingModifier(1);
        }

        this.loading = true;
      }
    }, {
      key: "catchError",
      value: function catchError(error) {
        _get(_getPrototypeOf(SmartQuery.prototype), "catchError", this).call(this, error);

        this.loadingDone(error);
      }
    }, {
      key: "watchLoading",
      value: function watchLoading() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.callHandlers.apply(this, [[this.options.watchLoading, this.vm.$kuzzle.watchLoading, this.vm.$kuzzle.provider.watchLoading]].concat(args, [this]));
      }
    }, {
      key: "applyLoadingModifier",
      value: function applyLoadingModifier(value) {
        var loadingKey = this.loadingKey;

        if (loadingKey && typeof this.vm[loadingKey] === 'number') {
          this.vm[loadingKey] += value;
        }

        this.watchLoading(value === 1, value);
      }
    }, {
      key: "loadingDone",
      value: function loadingDone(error, data) {
        if (this.loading) {
          this.applyLoadingModifier(-1);
        }

        this.loading = false;

        if (!error) {
          if (!this.changeRun) {
            this.changeRun = this.firstRun;
          }

          this.firstRunResolve(data);
        } else {
          this.firstRunReject(error);
        }
      }
    }, {
      key: "refetch",
      value: function () {
        var _refetch = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4() {
          var response;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  this.setLoading();
                  _context4.prev = 1;
                  _context4.next = 4;
                  return this.client.document.get(this.index, this.collection, this.options.document);

                case 4:
                  response = _context4.sent;
                  this.loadingDone();
                  _context4.next = 11;
                  break;

                case 8:
                  _context4.prev = 8;
                  _context4.t0 = _context4["catch"](1);
                  this.catchError(_context4.t0);

                case 11:
                  if (!response) {
                    _context4.next = 14;
                    break;
                  }

                  _context4.next = 14;
                  return this.nextResult(response._source, response, 'get');

                case 14:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[1, 8]]);
        }));

        function refetch() {
          return _refetch.apply(this, arguments);
        }

        return refetch;
      }()
    }, {
      key: "change",
      value: function change(newDoc) {
        var _this3 = this;

        this.setLoading();

        if (!this.changeRun) {
          this.changeRun = Promise.resolve(null);
        }

        if (typeof this.options.document === 'function') {
          var cb = this.options.document.bind(this.vm);
          this.options.document = cb();
        }

        var thisChangeRun = this.changeRun = this.changeRun.then(
        /*#__PURE__*/
        function () {
          var _ref = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee5(savedDoc) {
            var isUpdate, changeDoc, changeContext, beforeChange, updateResp, serverDoc, returnDoc;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    isUpdate = savedDoc && Object.keys(savedDoc).every(function (key) {
                      return key === '_kuzzle_info' || newDoc.hasOwnProperty(key);
                    });
                    changeDoc = isUpdate ? getRootChanges(savedDoc, newDoc) : newDoc;
                    changeContext = {
                      index: _this3.index,
                      collection: _this3.collection,
                      id: _this3.options.document,
                      documentKey: _this3.key,
                      savedDocument: savedDoc,
                      changedDocument: newDoc
                    };
                    beforeChange = _this3.options.beforeChange || _this3.vm.$kuzzle.beforeChange || _this3.vm.$kuzzle.provider.beforeChange;

                    if (!(typeof beforeChange === 'function')) {
                      _context5.next = 15;
                      break;
                    }

                    _context5.prev = 5;
                    _context5.next = 8;
                    return Promise.resolve(beforeChange.call(_this3.vm, changeDoc, changeContext));

                  case 8:
                    changeDoc = _context5.sent;
                    _context5.next = 15;
                    break;

                  case 11:
                    _context5.prev = 11;
                    _context5.t0 = _context5["catch"](5);

                    _this3.catchError(_context5.t0);

                    return _context5.abrupt("return", savedDoc);

                  case 15:
                    if (!(!changeDoc || Object.keys(changeDoc).length === 0)) {
                      _context5.next = 18;
                      break;
                    }

                    _this3.loadingDone();

                    return _context5.abrupt("return", savedDoc);

                  case 18:
                    _context5.prev = 18;

                    if (_this3.options.document) {
                      _context5.next = 25;
                      break;
                    }

                    _context5.next = 22;
                    return _this3.client.document.create(_this3.index, _this3.collection, changeDoc, null, {
                      refresh: 'wait_for'
                    });

                  case 22:
                    updateResp = _context5.sent;
                    _context5.next = 34;
                    break;

                  case 25:
                    if (isUpdate) {
                      _context5.next = 31;
                      break;
                    }

                    _context5.next = 28;
                    return _this3.client.document.createOrReplace(_this3.index, _this3.collection, _this3.options.document, changeDoc, {
                      refresh: 'wait_for'
                    });

                  case 28:
                    updateResp = _context5.sent;
                    _context5.next = 34;
                    break;

                  case 31:
                    _context5.next = 33;
                    return _this3.client.document.update(_this3.index, _this3.collection, _this3.options.document, changeDoc, {
                      refresh: 'wait_for'
                    });

                  case 33:
                    updateResp = _context5.sent;

                  case 34:
                    _context5.next = 36;
                    return _this3.client.document.get(_this3.index, _this3.collection, updateResp._id);

                  case 36:
                    serverDoc = _context5.sent._source;
                    returnDoc = serverDoc;

                    if (!(typeof _this3.options.update === 'function')) {
                      _context5.next = 42;
                      break;
                    }

                    _context5.next = 41;
                    return Promise.resolve(_this3.options.update.call(_this3.vm, serverDoc, updateResp, updateResp.created ? 'created' : updateResp.result));

                  case 41:
                    returnDoc = _context5.sent;

                  case 42:
                    if (_this3.changeRun === thisChangeRun) {
                      _this3.setData(returnDoc);
                    }

                    _this3.loadingDone();

                    return _context5.abrupt("return", serverDoc);

                  case 47:
                    _context5.prev = 47;
                    _context5.t1 = _context5["catch"](18);

                    _this3.catchError(_context5.t1);

                    return _context5.abrupt("return", savedDoc);

                  case 51:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, null, [[5, 11], [18, 47]]);
          }));

          return function (_x5) {
            return _ref.apply(this, arguments);
          };
        }());
        return thisChangeRun.then(function () {
          return _this3.getData();
        });
      }
    }, {
      key: "_initData",
      value: function _initData() {
        var _this4 = this;

        if (!this.options.manual) {
          if (this._hasDataField) {
            Object.defineProperty(this.vm.$data.$kuzzleData.data, this.key, {
              get: function get() {
                return _this4.vm.$data[_this4.key];
              },
              set: function set(value) {
                return _this4.change(value);
              },
              enumerable: true,
              configurable: true
            });
          } else {
            Object.defineProperty(this.vm.$data, this.key, {
              get: function get() {
                return _this4.vm.$data.$kuzzleData.data[_this4.key];
              },
              set: function set(value) {
                return _this4.change(value);
              },
              enumerable: true,
              configurable: true
            });
          }
        }
      }
    }, {
      key: "firstRunResolve",
      value: function firstRunResolve(data) {
        if (this._firstRunResolve) {
          this._firstRunResolve(data);

          this._firstRunResolve = null;
        }
      }
    }, {
      key: "firstRunReject",
      value: function firstRunReject(err) {
        if (this._firstRunReject) {
          this._firstRunReject(err);

          this._firstRunReject = null;
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(SmartQuery.prototype), "destroy", this).call(this);

        if (this.loading) {
          this.watchLoading(false, -1);
        }

        this.loading = false;
      }
    }, {
      key: "loadingKey",
      get: function get() {
        return this.options.loadingKey || this.vm.$kuzzle.loadingKey;
      }
    }]);

    return SmartQuery;
  }(SmartKuzzle);

  var SmartSearch =
  /*#__PURE__*/
  function (_SmartKuzzle) {
    _inherits(SmartSearch, _SmartKuzzle);

    function SmartSearch(vm, key, options) {
      var _this;

      _classCallCheck(this, SmartSearch);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SmartSearch).call(this, vm, key, options, false));
      _this.type = 'search';
      return _this;
    }

    _createClass(SmartSearch, [{
      key: "executeKuzzle",
      value: function () {
        var _executeKuzzle = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var search, data;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  search = this.options.search;
                  _context.prev = 1;
                  _context.next = 4;
                  return this.vm.$kuzzle.provider.connectAll();

                case 4:
                  _context.next = 6;
                  return this.client.document.search(this.index, this.collection, {
                    query: search.query,
                    aggregations: search.aggregations,
                    sort: search.sort
                  }, {
                    from: search.from || 0,
                    size: search.size || 10
                  });

                case 6:
                  this.response = _context.sent;
                  data = this.response.hits.map(function (_ref) {
                    var _source = _ref._source;
                    return _source;
                  });
                  data = this.applyAfterFetch(data, this.response);
                  this.nextResult(data, this.response);
                  _context.next = 15;
                  break;

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context["catch"](1);
                  this.catchError(_context.t0);

                case 15:
                  _get(_getPrototypeOf(SmartSearch.prototype), "executeKuzzle", this).call(this);

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 12]]);
        }));

        function executeKuzzle() {
          return _executeKuzzle.apply(this, arguments);
        }

        return executeKuzzle;
      }()
    }, {
      key: "fetchMore",
      value: function () {
        var _fetchMore = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var moreResponse, fetchMoreData, data;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (this.response) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt("return");

                case 2:
                  _context2.prev = 2;
                  _context2.next = 5;
                  return this.response.next();

                case 5:
                  moreResponse = _context2.sent;
                  fetchMoreData = moreResponse.hits.map(function (_ref2) {
                    var _source = _ref2._source;
                    return _source;
                  });

                  if (fetchMoreData) {
                    fetchMoreData = this.applyAfterFetch(fetchMoreData, moreResponse);
                    data = [].concat(_toConsumableArray(this.getData()), _toConsumableArray(fetchMoreData));
                    this.nextResult(data, moreResponse);
                  }

                  _context2.next = 13;
                  break;

                case 10:
                  _context2.prev = 10;
                  _context2.t0 = _context2["catch"](2);
                  this.catchError(_context2.t0);

                case 13:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[2, 10]]);
        }));

        function fetchMore() {
          return _fetchMore.apply(this, arguments);
        }

        return fetchMore;
      }()
    }, {
      key: "nextResult",
      value: function nextResult(data, response) {
        if (typeof this.options.update === 'function') {
          this.setData(this.options.update.call(this.vm, data, response));
        } else {
          this.setData(data);
        }
      }
    }, {
      key: "applyAfterFetch",
      value: function applyAfterFetch(data, response) {
        if (typeof this.vm.$kuzzle.provider.afterFetch !== 'function') {
          return data;
        }

        return this.vm.$kuzzle.provider.afterFetch.call(this.vm, data, response, 'search');
      }
    }, {
      key: "hasMore",
      get: function get() {
        return this.response ? this.response.fetched < this.response.total : false;
      }
    }]);

    return SmartSearch;
  }(SmartKuzzle);

  var DollarKuzzle =
  /*#__PURE__*/
  function () {
    function DollarKuzzle(vm) {
      _classCallCheck(this, DollarKuzzle);

      this._kuzzleSubscriptions = [];
      this._watchers = [];
      this.vm = vm;
      this.queries = {};
      this.documents = {};
      this.searches = {};
      this.client = undefined;
      this.loadingKey = undefined;
      this.error = undefined;
    }

    _createClass(DollarKuzzle, [{
      key: "getClient",
      value: function getClient(options) {
        if (!options || !options.client) {
          if (_typeof(this.client) === 'object') {
            return this.client;
          }

          if (this.client) {
            if (!this.provider.clients) {
              throw new Error("[vue-kuzzle] Missing 'clients' options in 'kuzzleProvider'");
            } else {
              var _client = this.provider.clients[this.client];

              if (!_client) {
                throw new Error("[vue-kuzzle] Missing client '".concat(this.client, "' in 'kuzzleProvider'"));
              }

              return _client;
            }
          }

          return this.provider.defaultClient;
        }

        var client = this.provider.clients[options.client];

        if (!client) {
          throw new Error("[vue-kuzzle] Missing client '".concat(options.client, "' in 'kuzzleProvider'"));
        }

        return client;
      }
    }, {
      key: "query",
      value: function query(body, options) {
        var _this$getIndexAndColl = this.getIndexAndCollection(options),
            index = _this$getIndexAndColl.index,
            collection = _this$getIndexAndColl.collection;

        try {
          return this.getClient(options).query({
            index: index,
            collection: collection,
            controller: options.controller,
            action: options.action,
            _id: options.id,
            body: body,
            refresh: 'wait_for'
          });
        } catch (e) {
          throw new Error("[vue-kuzzle] ".concat(e));
        }
      }
    }, {
      key: "get",
      value: function () {
        var _get = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(id, options) {
          var _this$getIndexAndColl2, index, collection, response;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this$getIndexAndColl2 = this.getIndexAndCollection(options, 'getDocument'), index = _this$getIndexAndColl2.index, collection = _this$getIndexAndColl2.collection;
                  _context.next = 3;
                  return this.getClient(options).document.get(index, collection, id);

                case 3:
                  response = _context.sent;
                  return _context.abrupt("return", _objectSpread({}, this.applyAfterFetch(response._source, response, 'get'), {
                    _kuzzle_response: response
                  }));

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function get(_x, _x2) {
          return _get.apply(this, arguments);
        }

        return get;
      }()
    }, {
      key: "search",
      value: function () {
        var _search = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(query, options) {
          var _this$getIndexAndColl3, index, collection, _kuzzle_response, hits;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _this$getIndexAndColl3 = this.getIndexAndCollection(options, 'searchDocuments'), index = _this$getIndexAndColl3.index, collection = _this$getIndexAndColl3.collection;
                  _context2.next = 3;
                  return this.getClient(options).document.search(index, collection, {
                    query: query,
                    aggregations: options && options.aggregations,
                    sort: options && options.sort
                  }, {
                    from: options && options.from || 0,
                    size: options && options.size || 10
                  });

                case 3:
                  _kuzzle_response = _context2.sent;
                  hits = (_kuzzle_response.hits || []).map(function (_ref) {
                    var _source = _ref._source;
                    return _source;
                  });
                  hits = this.applyAfterFetch(hits, _kuzzle_response, 'search');
                  hits._kuzzle_response = _kuzzle_response;
                  return _context2.abrupt("return", hits);

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function search(_x3, _x4) {
          return _search.apply(this, arguments);
        }

        return search;
      }()
    }, {
      key: "create",
      value: function () {
        var _create = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(doc, options) {
          var _this$getIndexAndColl4, index, collection, _kuzzle_response;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _this$getIndexAndColl4 = this.getIndexAndCollection(options, 'createDocument'), index = _this$getIndexAndColl4.index, collection = _this$getIndexAndColl4.collection;

                  if (!(options && options.replace === true)) {
                    _context3.next = 7;
                    break;
                  }

                  if (options.id) {
                    _context3.next = 4;
                    break;
                  }

                  throw new Error("[vue-kuzzle] Missing 'id' in 'createDocument' called with 'replace: true'");

                case 4:
                  _context3.next = 6;
                  return this.getClient(options).document.createOrReplace(index, collection, options && options.id, doc, {
                    refresh: 'wait_for'
                  });

                case 6:
                  _kuzzle_response = _context3.sent;

                case 7:
                  _context3.next = 9;
                  return this.getClient(options).document.create(index, collection, doc, options && options.id, {
                    refresh: 'wait_for'
                  });

                case 9:
                  _kuzzle_response = _context3.sent;
                  return _context3.abrupt("return", _objectSpread({}, this.applyAfterFetch(_kuzzle_response._source, _kuzzle_response, _kuzzle_response.created ? 'create' : _kuzzle_response.result), {
                    _kuzzle_response: _kuzzle_response
                  }));

                case 11:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function create(_x5, _x6) {
          return _create.apply(this, arguments);
        }

        return create;
      }()
    }, {
      key: "change",
      value: function () {
        var _change = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(id, doc, options) {
          var _this$getIndexAndColl5, index, collection, _kuzzle_response;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _this$getIndexAndColl5 = this.getIndexAndCollection(options, 'changeDocument'), index = _this$getIndexAndColl5.index, collection = _this$getIndexAndColl5.collection;

                  if (!(options && options.replace === true)) {
                    _context4.next = 5;
                    break;
                  }

                  _context4.next = 4;
                  return this.getClient(options).document.replace(index, collection, id, doc, {
                    refresh: 'wait_for'
                  });

                case 4:
                  _kuzzle_response = _context4.sent;

                case 5:
                  _context4.next = 7;
                  return this.getClient(options).document.update(index, collection, id, doc, {
                    refresh: 'wait_for'
                  });

                case 7:
                  _kuzzle_response = _context4.sent;
                  return _context4.abrupt("return", _objectSpread({}, this.applyAfterFetch(_kuzzle_response._source, _kuzzle_response, _kuzzle_response.response), {
                    _kuzzle_response: _kuzzle_response
                  }));

                case 9:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function change(_x7, _x8, _x9) {
          return _change.apply(this, arguments);
        }

        return change;
      }()
    }, {
      key: "delete",
      value: function _delete(id, options) {
        var _this$getIndexAndColl6 = this.getIndexAndCollection(options, 'deleteDocument'),
            index = _this$getIndexAndColl6.index,
            collection = _this$getIndexAndColl6.collection;

        return this.getClient(options).document.delete(index, collection, id, {
          refresh: 'wait_for'
        });
      }
    }, {
      key: "addSmartDocumentOrSearch",
      value: function addSmartDocumentOrSearch(key, options) {
        var finalOptions = reapply(options, this.vm);
        var smart;

        if (typeof finalOptions.document !== 'undefined') {
          smart = this.queries[key] = this.documents[key] = new SmartQuery(this.vm, key, finalOptions, false);
        } else if (finalOptions.search !== 'undefined') {
          smart = this.queries[key] = this.searches[key] = new SmartSearch(this.vm, key, finalOptions, false);
        } else {
          throw new Error("[vue-kuzzle] Missing either 'document' or 'search' in 'kuzzle.".concat(key, "' options"));
        }

        if (!this.vm.$isServer) {
          smart.autostart();
        } // if (!this.vm.$isServer) {
        //   const subs = finalOptions.subscribeToMore;
        //   if (subs) {
        //     if (Array.isArray(subs)) {
        //       subs.forEach((sub, index) => {
        //         this.addSmartSubscription(`${key}${index}`, {
        //           ...sub,
        //           linkedQuery: smart,
        //         });
        //       });
        //     } else {
        //       this.addSmartSubscription(key, {
        //         ...subs,
        //         linkedQuery: smart,
        //       });
        //     }
        //   }
        // }


        return smart;
      } // addSmartSubscription(key, options) {
      //   if (!this.vm.$isServer) {
      //     options = reapply(options, this.vm);
      //     const smart = (this.subscriptions[key] = new SmartSearch(
      //       this.vm,
      //       key,
      //       options,
      //       false,
      //     ));
      //     smart.autostart();
      //     return smart;
      //   }
      // }

    }, {
      key: "applyAfterFetch",
      value: function applyAfterFetch(data, request, operation) {
        if (typeof this.provider.afterFetch !== 'function') {
          return data;
        }

        return this.provider.afterFetch.call(this.vm, data, request, operation);
      }
    }, {
      key: "defineReactiveSetter",
      value: function defineReactiveSetter(key, func, deep) {
        var _this = this;

        this._watchers.push(this.vm.$watch(func, function (value) {
          _this[key] = value;
        }, {
          immediate: true,
          deep: deep
        }));
      }
    }, {
      key: "getIndexAndCollection",
      value: function getIndexAndCollection(options, throwWithMethodName) {
        var index = options && options.index || this.index || this.provider.defaultIndex;
        var collection = options && options.collection || this.collection || this.provider.defaultCollection;

        if (throwWithMethodName) {
          if (!index) {
            throw new Error("[vue-kuzzle] Missing index in '".concat(throwWithMethodName, "'"));
          }

          if (!collection) {
            throw new Error("[vue-kuzzle] Missing collection in '".concat(throwWithMethodName, "'"));
          }
        }

        return {
          index: index,
          collection: collection
        };
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._watchers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var unwatch = _step.value;
            unwatch();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        for (var key in this.queries) {
          this.queries[key].destroy();
        } // this._kuzzleSubscriptions.forEach(sub => {
        //   sub.unsubscribe();
        // });
        // this._kuzzleSubscriptions = null;


        this.vm = null;
      }
    }, {
      key: "provider",
      get: function get() {
        return this.vm.$kuzzleProvider;
      }
    }, {
      key: "loading",
      get: function get() {
        return this.vm.$data.$kuzzleData.loading !== 0;
      }
    }, {
      key: "data",
      get: function get() {
        return this.vm.$data.$kuzzleData.data;
      }
    }]);

    return DollarKuzzle;
  }();

  var KuzzleProvider =
  /*#__PURE__*/
  function () {
    function KuzzleProvider(options) {
      _classCallCheck(this, KuzzleProvider);

      if (!options) {
        throw new Error('Options argument required');
      }

      this.clients = options.clients || {};
      this.clients.defaultClient = this.defaultClient = options.defaultClient;
      this.defaultOptions = options.defaultOptions || {};
      this.defaultIndex = options.defaultIndex;
      this.defaultCollection = options.defaultCollection;
      this.watchLoading = options.watchLoading;
      this.errorHandler = options.errorHandler;
      this.beforeChange = options.beforeChange;
      this.afterFetch = options.afterFetch;
      this.connectAll();
    }

    _createClass(KuzzleProvider, [{
      key: "connectAll",
      value: function connectAll() {
        if (!this._connectAllPromise) {
          this._connectAllPromise = Promise.all(Object.values(this.clients).map(function (client) {
            return client.connect();
          }));
        }

        return this._connectAllPromise;
      }
    }]);

    return KuzzleProvider;
  }();

  function hasProperty(holder, key) {
    return typeof holder !== 'undefined' && Object.prototype.hasOwnProperty.call(holder, key);
  }

  function initProvider() {
    var options = this.$options; // KuzzleProvider injection

    var optionValue = options.kuzzleProvider;

    if (optionValue) {
      this.$kuzzleProvider = typeof optionValue === 'function' ? optionValue() : optionValue;
    } else if (options.parent && options.parent.$kuzzleProvider) {
      this.$kuzzleProvider = options.parent.$kuzzleProvider;
    }
  }

  function proxyData() {
    var _this = this;

    this.$_kuzzleInitData = {};
    var kuzzle = this.$options.kuzzle;

    if (kuzzle) {
      var _loop = function _loop(key) {
        if (key.charAt(0) !== '$') {
          var options = kuzzle[key]; // Property proxy

          if (!options.manual && !hasProperty(_this.$options.props, key) && !hasProperty(_this.$options.computed, key) && !hasProperty(_this.$options.methods, key)) {
            Object.defineProperty(_this, key, {
              get: function get() {
                return _this.$data.$kuzzleData.data[key];
              },
              // For component class constructor
              set: function set(value) {
                return _this.$_kuzzleInitData[key] = value;
              },
              enumerable: true,
              configurable: true
            });
          }
        }
      };

      // watchQuery
      for (var key in kuzzle) {
        _loop(key);
      }
    }
  }

  function launch() {
    var _this2 = this;

    var kuzzleProvider = this.$kuzzleProvider;
    if (this._kuzzleLaunched || !kuzzleProvider) return;
    this._kuzzleLaunched = true; // Prepare properties

    var kuzzle = this.$options.kuzzle;

    if (kuzzle) {
      this.$_kuzzlePromises = [];

      if (!kuzzle.$init) {
        kuzzle.$init = true; // Default options applied to `kuzzle` options

        if (kuzzleProvider.defaultOptions) {
          kuzzle = this.$options.kuzzle = Object.assign({}, kuzzleProvider.defaultOptions, kuzzle);
        }
      }

      defineReactiveSetter(this.$kuzzle, 'client', kuzzle.$client, kuzzle.$deep);
      defineReactiveSetter(self.$kuzzle, 'index', kuzzle.$index, kuzzle.$deep);
      defineReactiveSetter(self.$kuzzle, 'collection', kuzzle.$collection, kuzzle.$deep);
      defineReactiveSetter(this.$kuzzle, 'loadingKey', kuzzle.$loadingKey, kuzzle.$deep);
      defineReactiveSetter(this.$kuzzle, 'error', kuzzle.$error, kuzzle.$deep);
      defineReactiveSetter(this.$kuzzle, 'watchLoading', kuzzle.$watchLoading, kuzzle.$deep); // Kuzzle Data

      Object.defineProperty(this, '$kuzzleData', {
        get: function get() {
          return _this2.$data.$kuzzleData;
        },
        enumerable: true,
        configurable: true
      }); // watchQuery

      for (var key in kuzzle) {
        if (key.charAt(0) !== '$') {
          var options = kuzzle[key];
          var smart = this.$kuzzle.addSmartDocumentOrSearch(key, options);

          if (options.prefetch !== false && kuzzle.$prefetch !== false) {
            this.$_kuzzlePromises.push(smart.firstRun);
          }
        }
      }
    }
  }

  function defineReactiveSetter($kuzzle, key, value, deep) {
    if (typeof value !== 'undefined') {
      if (typeof value === 'function') {
        $kuzzle.defineReactiveSetter(key, value, deep);
      } else {
        $kuzzle[key] = value;
      }
    }
  }

  function destroy() {
    if (this.$_kuzzle) {
      this.$_kuzzle.destroy();
      this.$_kuzzle = null;
    }
  }

  function installMixin(Vue, vueVersion) {
    Vue.mixin(_objectSpread({}, vueVersion === '1' ? {
      init: initProvider
    } : {}, vueVersion === '2' ? {
      data: function data() {
        return {
          $kuzzleData: {
            queries: {},
            documents: {},
            searches: {},
            loading: 0,
            data: this.$_kuzzleInitData
          }
        };
      },
      beforeCreate: function beforeCreate() {
        initProvider.call(this);
        proxyData.call(this);
      },
      serverPrefetch: function serverPrefetch() {
        if (this.$_kuzzlePromises) {
          return Promise.all(this.$_kuzzlePromises);
        }
      }
    } : {}, {
      created: launch,
      destroyed: destroy
    }));
  }

  var KUZZLE_PROVIDER_KEY = Symbol('kuzzleProvider');
  function useKuzzle(config) {
    var configProvider = config && config.provider;
    var cached = getFromCache(configProvider, config);

    if (cached) {
      return cached;
    }

    var provider = configProvider || vueFunctionApi.inject(KUZZLE_PROVIDER_KEY).value;

    if (!provider) {
      throw new Error("[useKuzzle] Missing 'kuzzleProvider' to be provided via 'provide'");
    }

    if (configProvider) {
      var defaultCached = getFromCache(provider, config);

      if (defaultCached) {
        setToCache(null, config, defaultCached);
        return defaultCached;
      }
    }

    var defaultIndex = provider.defaultIndex;
    var defaultCollection = provider.defaultCollection;

    var getClient = function getClient(options) {
      if (options && options.client) {
        if (_typeof(options.client) === 'object') {
          return options.client;
        }

        if (!provider.clients) {
          throw new Error("[useKuzzle] Missing 'clients' options in 'kuzzleProvider'");
        } else {
          var _client = provider.clients[options.client];

          if (!_client) {
            throw new Error("[useKuzzle] Missing client '".concat(options.client, "' in 'kuzzleProvider'"));
          }

          return _client;
        }
      }

      if (!config || !config.client) {
        return provider.defaultClient;
      }

      var client = provider.clients[config.client];

      if (!client) {
        throw new Error("[useKuzzle] Missing client '".concat(config.client, "' in 'kuzzleProvider'"));
      }

      return client;
    };

    var getIndexAndCollection = function getIndexAndCollection(options, throwWithMethodName) {
      var index = options && options.index || defaultIndex;
      var collection = options && options.collection || defaultCollection;

      if (throwWithMethodName) {
        if (!index) {
          throw new Error("[useKuzzle] Missing index in '".concat(throwWithMethodName, "'"));
        }

        if (!collection) {
          throw new Error("[useKuzzle] Missing collection in '".concat(throwWithMethodName, "'"));
        }
      }

      return {
        index: index,
        collection: collection
      };
    };

    var afterFetch = typeof provider.afterFetch === 'function' ? provider.afterFetch : function (x) {
      return x;
    };

    var query = function query(body, options) {
      var _getIndexAndCollectio = getIndexAndCollection(options),
          index = _getIndexAndCollectio.index,
          collection = _getIndexAndCollectio.collection;

      try {
        return getClient(options).query({
          index: index,
          collection: collection,
          controller: options.controller,
          action: options.action,
          _id: options.id,
          body: body,
          refresh: 'wait_for'
        });
      } catch (e) {
        throw new Error("[useKuzzle] ".concat(e));
      }
    };

    var get =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(id, options) {
        var _getIndexAndCollectio2, index, collection, response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _getIndexAndCollectio2 = getIndexAndCollection(options, 'getDocument'), index = _getIndexAndCollectio2.index, collection = _getIndexAndCollectio2.collection;
                _context.next = 3;
                return getClient(options).document.get(index, collection, id);

              case 3:
                response = _context.sent;
                return _context.abrupt("return", _objectSpread({}, afterFetch.call(null, response._source, response, 'get'), {
                  _kuzzle_response: response
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function get(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    var search =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(query, options) {
        var _getIndexAndCollectio3, index, collection, _kuzzle_response, hits;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _getIndexAndCollectio3 = getIndexAndCollection(options, 'searchDocuments'), index = _getIndexAndCollectio3.index, collection = _getIndexAndCollectio3.collection;
                _context2.next = 3;
                return getClient(options).document.search(index, collection, {
                  query: query,
                  aggregations: options && options.aggregations,
                  sort: options && options.sort
                }, {
                  from: options && options.from || 0,
                  size: options && options.size || 10
                });

              case 3:
                _kuzzle_response = _context2.sent;
                hits = (_kuzzle_response.hits || []).map(function (_ref3) {
                  var _source = _ref3._source;
                  return _source;
                });
                hits = afterFetch.call(null, hits, _kuzzle_response, 'search');
                hits._kuzzle_response = _kuzzle_response;
                return _context2.abrupt("return", hits);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function search(_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }();

    var fetchMore =
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(response) {
        var moreResponse, fetchMoreData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (typeof response._kuzzle_response !== 'undefined') {
                  response = response._kuzzle_response;
                }

                _context3.next = 3;
                return response.next();

              case 3:
                moreResponse = _context3.sent;

                if (moreResponse) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", []);

              case 6:
                fetchMoreData = moreResponse.hits.map(function (_ref5) {
                  var _source = _ref5._source;
                  return _source;
                });
                fetchMoreData = afterFetch.call(null, fetchMoreData, response, 'search');
                return _context3.abrupt("return", fetchMoreData);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function fetchMore(_x5) {
        return _ref4.apply(this, arguments);
      };
    }();

    var create =
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(doc, options) {
        var _getIndexAndCollectio4, index, collection, _kuzzle_response;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _getIndexAndCollectio4 = getIndexAndCollection(options, 'createDocument'), index = _getIndexAndCollectio4.index, collection = _getIndexAndCollectio4.collection;

                if (!(options && options.replace === true)) {
                  _context4.next = 7;
                  break;
                }

                if (options.id) {
                  _context4.next = 4;
                  break;
                }

                throw new Error("[vue-kuzzle] Missing 'id' in 'createDocument' called with 'replace: true'");

              case 4:
                _context4.next = 6;
                return getClient(options).document.createOrReplace(index, collection, options && options.id, doc, {
                  refresh: 'wait_for'
                });

              case 6:
                _kuzzle_response = _context4.sent;

              case 7:
                _context4.next = 9;
                return getClient(options).document.create(index, collection, doc, options && options.id, {
                  refresh: 'wait_for'
                });

              case 9:
                _kuzzle_response = _context4.sent;
                return _context4.abrupt("return", _objectSpread({}, afterFetch.call(null, _kuzzle_response._source, _kuzzle_response, _kuzzle_response.created ? 'create' : _kuzzle_response.result), {
                  _kuzzle_response: _kuzzle_response
                }));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function create(_x6, _x7) {
        return _ref6.apply(this, arguments);
      };
    }();

    var change =
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id, doc, options) {
        var _getIndexAndCollectio5, index, collection, _kuzzle_response;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _getIndexAndCollectio5 = getIndexAndCollection(options, 'changeDocument'), index = _getIndexAndCollectio5.index, collection = _getIndexAndCollectio5.collection;

                if (!(options && options.replace === true)) {
                  _context5.next = 5;
                  break;
                }

                _context5.next = 4;
                return getClient(options).document.replace(index, collection, id, doc, {
                  refresh: 'wait_for'
                });

              case 4:
                _kuzzle_response = _context5.sent;

              case 5:
                _context5.next = 7;
                return getClient(options).document.update(index, collection, id, doc, {
                  refresh: 'wait_for'
                });

              case 7:
                _kuzzle_response = _context5.sent;
                return _context5.abrupt("return", _objectSpread({}, afterFetch.call(null, _kuzzle_response._source, _kuzzle_response, _kuzzle_response.response), {
                  _kuzzle_response: _kuzzle_response
                }));

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function change(_x8, _x9, _x10) {
        return _ref7.apply(this, arguments);
      };
    }();

    var deleteDoc = function deleteDoc(id, options) {
      var _getIndexAndCollectio6 = getIndexAndCollection(options, 'deleteDocument'),
          index = _getIndexAndCollectio6.index,
          collection = _getIndexAndCollectio6.collection;

      return getClient(options).document.delete(index, collection, id, {
        refresh: 'wait_for'
      });
    };

    var kuzzle = {
      provider: provider,
      getClient: getClient,
      query: query,
      get: get,
      search: search,
      fetchMore: fetchMore,
      create: create,
      change: change,
      delete: deleteDoc,
      getIndexAndCollection: getIndexAndCollection
    };
    setToCache(configProvider, config, kuzzle);
    return kuzzle;
  }
  function fetchKuzzle(options) {
    if (!options || !options.document) {
      throw new Error('[fetchKuzzle] Missing `document` in options');
    }

    var kuzzle = useKuzzle(options);
    var isReading = vueFunctionApi.value(false);
    var isWriting = vueFunctionApi.value(false);
    var rawData = vueFunctionApi.value(null);
    var error = vueFunctionApi.value(null);
    var documentId = typeof options.document === 'function' ? vueFunctionApi.computed(options.document) : vueFunctionApi.value(options.document);
    var skip = typeof options.skip === 'function' ? vueFunctionApi.computed(options.skip) : vueFunctionApi.value(options.skip);

    var setError = function setError(err) {
      error.value = err;
      isReading.value = false;
      isWriting.value = false;

      if (typeof options.error === 'function') {
        options.error(err);
      } else {
        console.error(err);
      }
    };

    var changePromise;
    vueFunctionApi.watch(function () {
      if (skip.value) {
        return null;
      }

      return documentId.value;
    },
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(id) {
        var _ref9, _kuzzle_response, dataValue;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (id) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                isReading.value = true;
                _context6.next = 5;
                return kuzzle.provider.connectAll();

              case 5:
                _context6.prev = 5;
                _context6.next = 8;
                return kuzzle.get(id, options);

              case 8:
                _ref9 = _context6.sent;
                _kuzzle_response = _ref9._kuzzle_response;
                dataValue = _objectWithoutProperties(_ref9, ["_kuzzle_response"]);
                isReading.value = false;

                if (options.update) {
                  rawData.value = options.update(dataValue, _kuzzle_response);
                } else {
                  rawData.value = dataValue;
                }

                if (!changePromise) {
                  changePromise = Promise.resolve(rawData.value);
                }

                _context6.next = 19;
                break;

              case 16:
                _context6.prev = 16;
                _context6.t0 = _context6["catch"](5);
                setError(_context6.t0);

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[5, 16]]);
      }));

      return function (_x11) {
        return _ref8.apply(this, arguments);
      };
    }(), {
      lazy: false
    });

    var change =
    /*#__PURE__*/
    function () {
      var _ref10 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(newDoc) {
        var currentChangeRun;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                isWriting.value = true;

                if (!changePromise) {
                  changePromise = Promise.resolve(null);
                }

                currentChangeRun = changePromise = changePromise.then(
                /*#__PURE__*/
                function () {
                  var _ref11 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee7(savedDoc) {
                    var isUpdate, changeDoc, _kuzzle$getIndexAndCo, index, collection, changeContext, beforeChange, client, updateResp, serverDoc, returnDoc;

                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            isUpdate = savedDoc && Object.keys(savedDoc).every(function (key) {
                              return key === '_kuzzle_info' || newDoc.hasOwnProperty(key);
                            }); // Prepare changeDoc

                            changeDoc = isUpdate ? getRootChanges(savedDoc, newDoc) : newDoc;
                            _kuzzle$getIndexAndCo = kuzzle.getIndexAndCollection(options, 'change'), index = _kuzzle$getIndexAndCo.index, collection = _kuzzle$getIndexAndCo.collection;
                            changeContext = {
                              kuzzle: kuzzle,
                              index: index,
                              collection: collection,
                              id: documentId.value,
                              savedDocument: savedDoc,
                              changedDocument: newDoc // key missing

                            };
                            beforeChange = options.beforeChange || kuzzle.provider.beforeChange;

                            if (!(typeof beforeChange === 'function')) {
                              _context7.next = 16;
                              break;
                            }

                            _context7.prev = 6;
                            _context7.next = 9;
                            return Promise.resolve(beforeChange.call(null, changeDoc, changeContext));

                          case 9:
                            changeDoc = _context7.sent;
                            _context7.next = 16;
                            break;

                          case 12:
                            _context7.prev = 12;
                            _context7.t0 = _context7["catch"](6);
                            setError(_context7.t0);
                            return _context7.abrupt("return", savedDoc);

                          case 16:
                            if (!(!changeDoc || Object.keys(changeDoc).length === 0)) {
                              _context7.next = 19;
                              break;
                            }

                            isWriting.value = false;
                            return _context7.abrupt("return", savedDoc);

                          case 19:
                            // Attempt change
                            client = kuzzle.getClient(options);
                            _context7.prev = 20;

                            if (documentId.value) {
                              _context7.next = 27;
                              break;
                            }

                            _context7.next = 24;
                            return client.document.create(index, collection, changeDoc, null, {
                              refresh: 'wait_for'
                            });

                          case 24:
                            updateResp = _context7.sent;
                            _context7.next = 36;
                            break;

                          case 27:
                            if (isUpdate) {
                              _context7.next = 33;
                              break;
                            }

                            _context7.next = 30;
                            return client.document.createOrReplace(index, collection, documentId.value, changeDoc, {
                              refresh: 'wait_for'
                            });

                          case 30:
                            updateResp = _context7.sent;
                            _context7.next = 36;
                            break;

                          case 33:
                            _context7.next = 35;
                            return client.document.update(index, collection, documentId.value, changeDoc, {
                              refresh: 'wait_for'
                            });

                          case 35:
                            updateResp = _context7.sent;

                          case 36:
                            _context7.next = 38;
                            return client.document.get(index, collection, updateResp._id);

                          case 38:
                            serverDoc = _context7.sent._source;
                            returnDoc = serverDoc;

                            if (!(typeof options.update === 'function')) {
                              _context7.next = 44;
                              break;
                            }

                            _context7.next = 43;
                            return Promise.resolve(options.update(serverDoc, updateResp, updateResp.created ? 'created' : updateResp.result));

                          case 43:
                            returnDoc = _context7.sent;

                          case 44:
                            if (changePromise === currentChangeRun) {
                              rawData.value = returnDoc;
                            }

                            isWriting.value = false;
                            return _context7.abrupt("return", returnDoc);

                          case 49:
                            _context7.prev = 49;
                            _context7.t1 = _context7["catch"](20);
                            setError(_context7.t1);
                            return _context7.abrupt("return", savedDoc);

                          case 53:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7, null, [[6, 12], [20, 49]]);
                  }));

                  return function (_x13) {
                    return _ref11.apply(this, arguments);
                  };
                }());
                return _context8.abrupt("return", currentChangeRun.then(function () {
                  return rawData.value;
                }));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function change(_x12) {
        return _ref10.apply(this, arguments);
      };
    }();

    var isLoading = vueFunctionApi.computed(function () {
      return isReading.value || isWriting.value;
    });
    var data = vueFunctionApi.computed(function () {
      return rawData.value;
    }, change);
    return {
      kuzzle: kuzzle,
      isReading: isReading,
      isWriting: isWriting,
      isLoading: isLoading,
      data: data,
      error: error,
      change: change
    };
  }
  function searchKuzzle(options) {
    if (!options || !options.search) {
      throw new Error('[searchKuzzle] Missing `search` in options');
    }

    var kuzzle = useKuzzle(options);
    var isLoading = vueFunctionApi.value(false);
    var data = vueFunctionApi.value(null);
    var error = vueFunctionApi.value(null);
    var response = vueFunctionApi.value(null);
    var searchQuery = typeof options.search === 'function' ? vueFunctionApi.computed(options.search) : vueFunctionApi.value(options.search);
    var skip = typeof options.skip === 'function' ? vueFunctionApi.computed(options.skip) : vueFunctionApi.value(options.skip);

    var setData = function setData(dataValue, resp) {
      response.value = resp;

      if (options.update) {
        data.value = options.update(dataValue, resp);
      } else {
        data.value = dataValue;
      }
    };

    var setError = function setError(err) {
      error.value = err;
      isLoading.value = false;

      if (typeof options.error === 'function') {
        options.error(err);
      } else {
        console.error(err);
      }
    };

    var requestSearch =
    /*#__PURE__*/
    function () {
      var _ref12 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(search) {
        var resp;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (search) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return");

              case 2:
                isLoading.value = true;
                _context9.next = 5;
                return kuzzle.provider.connectAll();

              case 5:
                _context9.prev = 5;
                _context9.next = 8;
                return kuzzle.search(search.query || {}, _objectSpread({}, options, {
                  aggregations: search.aggregations,
                  sort: search.sort,
                  from: search.from,
                  size: search.size
                }));

              case 8:
                resp = _context9.sent;
                isLoading.value = false;
                setData(resp, resp._kuzzle_response);
                _context9.next = 16;
                break;

              case 13:
                _context9.prev = 13;
                _context9.t0 = _context9["catch"](5);
                setError(_context9.t0);

              case 16:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[5, 13]]);
      }));

      return function requestSearch(_x14) {
        return _ref12.apply(this, arguments);
      };
    }();

    vueFunctionApi.watch(function () {
      if (skip.value) {
        return null;
      }

      return searchQuery.value;
    }, requestSearch, {
      lazy: false
    });
    var hasMore = vueFunctionApi.computed(function () {
      return response.value ? response.value.fetched < response.value.total : false;
    });

    var fetchMore =
    /*#__PURE__*/
    function () {
      var _ref13 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10() {
        var fetchMoreData;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (response.value) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return");

              case 2:
                isLoading.value = true;
                _context10.prev = 3;
                _context10.next = 6;
                return kuzzle.fetchMore(response.value);

              case 6:
                fetchMoreData = _context10.sent;
                setData([].concat(_toConsumableArray(data.value), _toConsumableArray(fetchMoreData)), response.value);
                return _context10.abrupt("return", fetchMoreData);

              case 11:
                _context10.prev = 11;
                _context10.t0 = _context10["catch"](3);
                setError(_context10.t0);

              case 14:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[3, 11]]);
      }));

      return function fetchMore() {
        return _ref13.apply(this, arguments);
      };
    }();

    var refresh = function refresh() {
      return requestSearch(searchQuery.value);
    };

    return {
      kuzzle: kuzzle,
      isLoading: isLoading,
      data: data,
      error: error,
      hasMore: hasMore,
      fetchMore: fetchMore,
      refresh: refresh
    };
  } //
  // useKuzzle cache
  //

  var useKuzzleCache = new Map();

  var getProviderKey = function getProviderKey(provider) {
    return provider || 'default';
  };

  var getConfigKey = function getConfigKey(config) {
    var configKey = null;

    if (config) {
      configKey = config.client || 'default';
    }

    return configKey || 'default';
  };

  function getFromCache(provider, config) {
    var providerKey = getProviderKey(provider);
    var cacheHit = useKuzzleCache.get(providerKey);

    if (!cacheHit) {
      return null;
    }

    var configKey = getConfigKey(config);
    return cacheHit[configKey];
  }

  function setToCache(provider, config, kuzzle) {
    var providerKey = getProviderKey(provider);
    var cacheHit = useKuzzleCache.get(providerKey);
    var configKey = getConfigKey(config);
    var newCacheHit = cacheHit;

    if (!newCacheHit) {
      newCacheHit = {};
    }

    newCacheHit[configKey] = kuzzle;
    useKuzzleCache.set(providerKey, newCacheHit);
  }

  function install(Vue, options) {
    if (install.installed) return;
    install.installed = true;
    var vueVersion = Vue.version.substr(0, Vue.version.indexOf('.')); // Lazy creation

    Object.defineProperty(Vue.prototype, '$kuzzle', {
      get: function get() {
        if (!this.$_kuzzle) {
          this.$_kuzzle = new DollarKuzzle(this);
        }

        return this.$_kuzzle;
      }
    });
    installMixin(Vue, vueVersion);
  }
  KuzzleProvider.install = install; // Kuzzle provider

  var KuzzleProvider$1 = KuzzleProvider; // Components
  // export const KuzzleQuery = CKuzzleQuery;
  // export const KuzzleSubscribeToMore = CKuzzleSubscribeToMore;
  // export const KuzzleMutation = CKuzzleMutation;
  // Auto-install

  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(KuzzleProvider);
  }

  exports.install = install;
  exports.KuzzleProvider = KuzzleProvider$1;
  exports.default = KuzzleProvider;
  exports.KUZZLE_PROVIDER_KEY = KUZZLE_PROVIDER_KEY;
  exports.useKuzzle = useKuzzle;
  exports.fetchKuzzle = fetchKuzzle;
  exports.searchKuzzle = searchKuzzle;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
