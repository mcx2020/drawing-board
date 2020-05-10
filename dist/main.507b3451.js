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
})({"OKMM":[function(require,module,exports) {

},{}],"iMte":[function(require,module,exports) {

},{"./components/reset.css":"OKMM","./components/display.css":"OKMM","./components/color.css":"OKMM"}],"epB2":[function(require,module,exports) {
"use strict";

require("./style.css");

var $color = document.querySelector('.color');
var $dots = document.querySelector('.dots');
var $rubber = document.querySelector('.rubber');
var $colorList = document.querySelector('.color-list');
var $canvas = document.querySelector('.canvas');
var ctx = $canvas.getContext('2d');
var mouseState = false;
var lastLocation;
var touchDevice = "ontouchend" in document ? true : false;
var widthChoice = 1;
var rubberChoice = false;
var colorChoice = 0;
var colorStore = ['black', 'red', '#ff5000', '#1AAD19', 'blue', '#8000ff', '#483D8D'];
var widthStore = ['20', '15', '10'];
$canvas.width = document.documentElement.clientWidth;
$canvas.height = document.documentElement.clientHeight - 135;

if (touchDevice) {
  $canvas.ontouchstart = function (e) {
    lastLocation = [e.touches[0].clientX, e.touches[0].clientY];
  };

  $canvas.ontouchmove = function (e) {
    if (rubberChoice) {
      ctx.clearRect(e.touches[0].clientX, e.touches[0].clientY, 30, 30);
    } else {
      ctx.beginPath();
      ctx.moveTo(lastLocation[0], lastLocation[1]);
      ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
      ctx.lineWidth = widthStore[widthChoice];
      ctx.strokeStyle = colorStore[colorChoice];
      ctx.lineCap = 'round';
      ctx.stroke();
      lastLocation = [e.touches[0].clientX, e.touches[0].clientY];
    }
  };
} else {
  $canvas.onmousedown = function (e) {
    mouseState = true;
    lastLocation = [e.clientX, e.clientY];
  };

  $canvas.onmouseup = function () {
    mouseState = false;
  };

  $canvas.onmousemove = function (e) {
    if (mouseState) {
      if (rubberChoice) {
        ctx.clearRect(e.clientX, e.clientY, 30, 30);
      } else {
        ctx.beginPath();
        ctx.moveTo(lastLocation[0], lastLocation[1]);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.lineWidth = widthStore[widthChoice];
        ctx.strokeStyle = colorStore[colorChoice];
        ctx.lineCap = 'round';
        ctx.stroke();
        lastLocation = [e.clientX, e.clientY];
      }
    }
  };
}

$dots.addEventListener('click', function (e) {
  if (e.target !== e.currentTarget) {
    for (var i = 0; i < e.currentTarget.children.length; i++) {
      var parent = e.currentTarget.children;

      if (parent[i] != e.target) {
        parent[i].classList.remove('selected');
      } else {
        parent[i].classList.add('selected');
        widthChoice = i;
      }
    }
  }
});
$rubber.addEventListener('click', function (e) {
  e.currentTarget.classList.add('selected');
  rubberChoice = true;
});
$colorList.addEventListener('click', function (e) {
  if (e.target != e.currentTarget) {
    $rubber.classList.remove('selected');

    for (var i = 0; i < e.currentTarget.children.length; i++) {
      var parent = e.currentTarget.children;

      if (parent[i] === e.target) {
        e.target.classList.add('selected');
        colorChoice = i;
        rubberChoice = false;
        $color.style.background = colorStore[colorChoice];
      } else {
        parent[i].classList.remove('selected');
      }
    }
  }
});
},{"./style.css":"iMte"}]},{},["epB2"], null)
//# sourceMappingURL=main.507b3451.js.map