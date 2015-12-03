(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var has = ({}).hasOwnProperty;

  var aliases = {};

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf('components/' === 0)) {
        start = 'components/'.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return 'components/' + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  })();
  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  globals.require = require;
})();
require.register("initialize", function(exports, require, module) {
$(window).load(function() {
  return $('.preloader').removeClass('active');
});

$(document).ready(function() {
  var config;
  $('.popup').hide();
  inlineSVG.init();
  config = {
    mobile: true
  };
  window.sr = new scrollReveal(config);
  $('.nav-local').find('div').click(function() {
    var a;
    $('div').removeClass('ch');
    $(this).addClass('ch');
    $('.contant').removeClass('active');
    a = '.' + $(this).attr('id');
    return $('.inner').find(a).addClass('active');
  });
  $('.popup').find('.plus').click(function() {
    var a;
    a = Number($('#digit').html());
    return $('#digit').html(a + 1);
  });
  $('.popup').find('.minus').click(function() {
    var a;
    a = Number($('#digit').html());
    a = a - 1;
    if (a < 1) {
      return $('#digit').html(1);
    } else {
      return $('#digit').html(a);
    }
  });
  $('#chosen-item').find('.add').click(function() {
    return $('.popup').fadeIn(300);
  });
  $('.popup').find('.christ').click(function() {
    return $('.popup').fadeOut(300);
  });
  $('.form1').find('.plus').click(function() {
    var a;
    a = Number($('#digit-eat').html());
    return $('#digit-eat').html(a + 1);
  });
  $('.form1').find('.minus').click(function() {
    var a;
    a = Number($('#digit-eat').html());
    a = a - 1;
    if (a < 1) {
      return $('#digit-eat').html(1);
    } else {
      return $('#digit-eat').html(a);
    }
  });
  $('.form2').find('.plus').click(function() {
    var a;
    a = Number($('#digit-drink').html());
    return $('#digit-drink').html(a + 1);
  });
  $('.form2').find('.minus').click(function() {
    var a;
    a = Number($('#digit-drink').html());
    a = a - 1;
    if (a < 1) {
      return $('#digit-drink').html(1);
    } else {
      return $('#digit-drink').html(a);
    }
  });
  return $('.slider').slick({
    dots: true
  });
});
});

;
//# sourceMappingURL=app.js.map