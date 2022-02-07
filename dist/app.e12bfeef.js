// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/javascript/todoClass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Todo = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Todo = /*#__PURE__*/function () {
  function Todo() {
    _classCallCheck(this, Todo);

    _defineProperty(this, "data", localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []);

    _defineProperty(this, "inputTitleElement", document.querySelector('#title'));

    _defineProperty(this, "inputEstimateElement", document.querySelector('#estimate'));

    _defineProperty(this, "selectPriorityElement", document.querySelector('#priority'));

    _defineProperty(this, "buttonSubmitElement", document.querySelector('#submit'));

    _defineProperty(this, "formElement", document.querySelector('#form'));

    _defineProperty(this, "divListElement", document.querySelector('#list'));

    _defineProperty(this, "listWrapElement", document.querySelector('#list-wrap'));

    _defineProperty(this, "searchInputElement", document.querySelector('#search'));

    _defineProperty(this, "openFormButtonElement", document.querySelector('#open-form'));

    _defineProperty(this, "formSearchElement", document.querySelector('#form-search'));

    _defineProperty(this, "openMainButtonElement", document.querySelector('#open-mainForm'));

    _defineProperty(this, "closeMainButtonElement", document.querySelector('#cancel'));

    _defineProperty(this, "selectSortElement", document.querySelector('#sort'));

    _defineProperty(this, 1, void 0);

    this.init();
  }

  _createClass(Todo, [{
    key: "init",
    value: function init() {
      this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
      this.searchInputElement.addEventListener('input', this.handleInputSearch.bind(this));
      this.selectSortElement.addEventListener('change', this.handleChangeSelectSort.bind(this));
      this.openFormButtonElement.addEventListener('click', this.handleOpenForm.bind(this));
      this.openMainButtonElement.addEventListener('click', this.handleOpenMainForm.bind(this));
      this.closeMainButtonElement.addEventListener('click', this.handleCloseMainForm.bind(this));
      this.listWrapElement.addEventListener('click', this.handleRemoveButton.bind(this));
      window.addEventListener('beforeunload', this.handleBeforeunload.bind(this));
      this.renderList(this.data);
    }
  }, {
    key: "handleBeforeunload",
    value: function handleBeforeunload() {
      localStorage.setItem('data', JSON.stringify(this.data));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      var content = this.inputTitleElement.value.trim();
      var Obj = {};
      Obj.id = Date.now();
      Obj.title = this.inputTitleElement.value;
      Obj.date = this.buildDate();
      Obj.createStar = this.createStar();
      Obj.priority = this.selectPriorityElement.value;
      Obj.estimate = this.createEstimate();

      if (content) {
        this.data.push(Obj);
        this.formElement.reset();
        this.renderList(this.data);
      } else {
        alert('Заполните поле!!!');
      }
    }
  }, {
    key: "createListItem",
    value: function createListItem(Obj) {
      var template = "<li class=\"list-item\" >\n      <div class = \"span-title\">".concat(Obj.title, " ").concat(Obj.date, " </div>\n      <div class=\"div-estimate\" ><span>").concat(Obj.estimate, " \u0447.</span>\n      <span class= \"calc-star\">").concat(Obj.createStar, "</span>\n      <button  data-id=\"").concat(Obj.id, "\" class=\"remove-button\">\uD83D\uDDD1</button></div>\n      </li>\n    ");
      return template;
    }
  }, {
    key: "renderList",
    value: function renderList(data) {
      var _this = this;

      var listElement = document.createElement('ul');
      listElement.classList.add('list');
      this.listWrapElement.innerHTML = '';
      this.listWrapElement.append(listElement);
      data.forEach(function (item, index) {
        var listItem = _this.createListItem(item, index);

        listElement.innerHTML = listElement.innerHTML + listItem;
      });
    }
  }, {
    key: "buildDate",
    value: function buildDate() {
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      if (day < 10) day = '0' + day;
      if (month < 10) month = '0' + month;
      var fullDate = day + '.' + month + '.' + year;
      return fullDate;
    }
  }, {
    key: "createEstimate",
    value: function createEstimate() {
      var time = +this.inputEstimateElement.value;

      if (time > 0) {
        return time;
      } else {
        alert('время должно быть больше 0 часов!');
        return '❓';
      }
    }
  }, {
    key: "handleRemoveButton",
    value: function handleRemoveButton(event) {
      var _this2 = this;

      var target = event.target;

      if (target.hasAttribute('data-id')) {
        var idElement = target.getAttribute('data-id');
        this.data.forEach(function (item, index) {
          if (item.id == idElement) {
            _this2.data.splice(index, 1);

            _this2.renderList(_this2.data);
          }

          if (_this2.data.length == 0) {
            _this2.listWrapElement.innerHTML = '<div class="div-list">Список пуст</div>';
          }
        });
      }
    }
  }, {
    key: "handleInputSearch",
    value: function handleInputSearch() {
      var value = this.searchInputElement.value;
      var filterData = this.data.filter(function (item) {
        if (item.title.includes(value)) {
          return true;
        }

        return false;
      });

      if (filterData.length) {
        this.renderList(filterData);
      } else {
        this.listWrapElement.innerHTML = '<div>Ничего не найдено</div>';
      }
    }
  }, {
    key: "createStar",
    value: function createStar() {
      if (this.selectPriorityElement.value == 1) {
        return "<i class=\"fas fa-star\" id=\"#star\"></i>";
      }

      if (this.selectPriorityElement.value == 2) {
        return "<i class=\"fas fa-star\" id=\"#star\"></i>\n      <i class=\"fas fa-star\" id=\"#star\"></i>";
      }

      if (this.selectPriorityElement.value == 3) {
        return "<i class=\"fas fa-star\" id=\"#star\"></i>\n      <i class=\"fas fa-star\" id=\"#star\"></i>\n      <i class=\"fas fa-star\" id=\"#star\"></i>";
      }
    }
  }, {
    key: "handleChangeSelectSort",
    value: function handleChangeSelectSort() {
      var sortElement = this.selectSortElement.value;
      var resultSort = this.data.sort(function (a, b) {
        if ('estimate' == sortElement) {
          return a.estimate - b.estimate;
        }

        if ('priority' == sortElement) {
          return a.priority - b.priority;
        }
      });
      this.renderList(resultSort);
    }
  }, {
    key: "handleOpenForm",
    value: function handleOpenForm() {
      if (this.formSearchElement.classList.contains('open')) {
        this.formSearchElement.classList.remove('open');
        this.formSearchElement.classList.add('close');
      } else {
        this.formSearchElement.classList.remove('close');
        this.formSearchElement.classList.add('open');
      }
    }
  }, {
    key: "handleOpenMainForm",
    value: function handleOpenMainForm() {
      if (this.formElement.classList.contains('close')) {
        this.formElement.classList.remove('close');
        this.formElement.classList.add('open');
      }
    }
  }, {
    key: "handleCloseMainForm",
    value: function handleCloseMainForm() {
      if (this.formElement.classList.contains('open')) {
        this.formElement.classList.remove('open');
        this.formElement.classList.add('close');
      }
    }
  }]);

  return Todo;
}();

exports.Todo = Todo;
},{}],"src/javascript/app.js":[function(require,module,exports) {
"use strict";

var _todoClass = require("./todoClass");

// const todoList = new Todo
var todo = new _todoClass.Todo();
},{"./todoClass":"src/javascript/todoClass.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54874" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/javascript/app.js"], null)
//# sourceMappingURL=/app.e12bfeef.js.map