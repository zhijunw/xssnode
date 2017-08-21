(function() {
  var Babel, Fs, Path, Step, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Fs = require("fs");
  Path = require("path");
  Step = require("step");
  _ = require("underscore");
  module.exports = Babel = {
    template: function(file, callback) {
      return Babel.typedFile("template", file, callback);
    },
    data: function(file, callback) {
      return Babel.typedFile("data", file, callback);
    },
    source: function(file, callback) {
      return Babel.typedFile("script", file, callback);
    },
    script: function(file, callback) {
      return Babel.source(file, function(err, source) {
        return callback(err, new Function("__values", " with(__values) { " + source + " } "));
      });
    },
    stylesheet: function(file, callback) {
      return Babel.typedFile("stylesheet", file, callback);
    },
    typedFile: function(type, file, callback) {
      var extension;
      extension = Path.extname(file).substr(1);
      return Step(function() {
        Babel.translator(type, extension, this.parallel());
        return Babel.plain(file, this.parallel());
      }, function(err, translator, source) {
        if (err) {
          return callback(err);
        }
        return translator(source, this);
      }, callback);
    },
    plain: function(file, callback) {
      return Path.exists(file, function(exists) {
        if (exists) {
          return Fs.readFile(file, "utf8", function(err, source) {
            return callback(err, source);
          });
        } else {
          return callback(null, "");
        }
      });
    },
    translators: {},
    translatorsDir: Path.join(__dirname, "../translators"),
    translator: function(type, extension, callback) {
      var file, translator, _base, _ref;
            if ((_ref = (_base = this.translators)[type]) != null) {
        _ref;
      } else {
        _base[type] = {};
      };
      translator = this.translators[type][extension];
      if (translator !== void 0) {
        return callback(null, translator);
      } else {
        file = Path.join(this.translatorsDir, type, "" + extension + ".coffee");
        return Path.exists(file, __bind(function(exists) {
          if (exists) {
            translator = require(file);
            if (!translator) {
              return callback("Invalid '" + type + "' translator for '" + extension + "'");
            } else {
              this.translators[type][extension] = translator;
              return callback(null, translator);
            }
          } else {
            return callback("Could not find '" + type + "' translator for '" + extension + "'");
          }
        }, this));
      }
    },
    ignoreFiles: [".DS_Store", ".git"],
    dir: function(dir, iterator, callback) {
      if (callback == null) {
        callback = function() {};
      }
      return Step(function() {
        return Fs.readdir(dir, this);
      }, function(err, files) {
        var file, group, _i, _len;
        if (files == null) {
          files = [];
        }
        if (err) {
          files = [];
        }
        files = _.reject(files, function(file) {
          return _.include(Babel.ignoreFiles, file);
        });
        this.parallel()(null, files);
        if (files.length) {
          group = this.group();
        }
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          iterator(Path.join(dir, file), group());
        }
        return;
      }, function(err, files, results) {
        var file, name, object, result, touple, _i, _len, _ref;
        if (files == null) {
          files = [];
        }
        if (results == null) {
          results = [];
        }
        if (err) {
          callback(err);
        }
        object = {};
        _ref = _.zip(files, results);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          touple = _ref[_i];
          file = touple[0], result = touple[1];
          name = Path.basename(file, Path.extname(file));
          object[name] = result;
        }
        return callback(null, object);
      });
    }
  };
}).call(this);
