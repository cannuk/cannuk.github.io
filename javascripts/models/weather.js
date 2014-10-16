(function() {
  var _base, _base1;

  if (window.sdn == null) {
    window.sdn = {};
  }

  if ((_base = window.sdn).Models == null) {
    _base.Models = {};
  }

  if ((_base1 = window.sdn).Views == null) {
    _base1.Views = {};
  }

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sdn.Models.YQLModel = (function(_super) {
    __extends(YQLModel, _super);

    function YQLModel() {
      return YQLModel.__super__.constructor.apply(this, arguments);
    }

    YQLModel.prototype.sync = function(method, model, options) {
      var params;
      params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: model.url(),
        jsonp: '_callback',
        processData: false
      }, options);
      return $.jsonp(params);
    };

    YQLModel.prototype.parse = function(response) {
      var _ref, _ref1, _ref2;
      response = response != null ? (_ref = response.query) != null ? (_ref1 = _ref.results) != null ? _ref1.channel : void 0 : void 0 : void 0;
      if (((_ref2 = response.item.condition) != null ? _ref2.code : void 0) != null) {
        response.conditionCode = response.item.condition.code;
        response.conditionText = response.item.condition.text;
      }
      return response;
    };

    return YQLModel;

  })(Backbone.Model);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sdn.Models.Weather = (function(_super) {
    __extends(Weather, _super);

    function Weather() {
      return Weather.__super__.constructor.apply(this, arguments);
    }

    Weather.prototype.urlRoot = "http://query.yahooapis.com/v1/public/yql?q=select%20wind%2C%20astronomy%2C%20item.condition.code%2C%20item.condition.temp%2C%20item.condition.text%20%20%20from%20weather.forecast%20where%20location%3D%2294105%22&format=json&callback=?";

    Weather.prototype.initialize = function() {
      this.setScene();
      this.setWindspeed();
      return this.bindEvents();
    };

    Weather.prototype.bindEvents = function() {
      this.on("change:conditionCode", this.setScene);
      this.on("change", this.setWindspeed);
      return true;
    };

    Weather.prototype.setScene = function() {
      var code, codes, conditionCode, scene, scenes;
      conditionCode = this.get("conditionCode");
      if (conditionCode) {
        code = parseInt(conditionCode);
        console.log(code);
        scenes = {
          'clear': [32, 31, 33, 34],
          'pcloud': [29, 30, 44],
          'mcloud': [26, 27, 28],
          'thunder': [37, 38, 39, 45, 47],
          'rain': [8, 9, 11, 12, 40, 28]
        };
        for (scene in scenes) {
          if (!__hasProp.call(scenes, scene)) continue;
          codes = scenes[scene];
          if (_.indexOf(codes, code) >= 0) {
            return this.set({
              scene: scene
            });
          }
        }
        return true;
      }
    };

    Weather.prototype.changeWind = function(windspeed) {
      var wind;
      wind = this.get("wind");
      wind.speed = windspeed;
      this.set("wind", wind);
      return this.setWindspeed();
    };

    Weather.prototype.setWindspeed = function() {
      var wind, windSpeed;
      wind = this.get("wind");
      windSpeed = .1;
      if ((wind != null) && (wind.speed != null)) {
        windSpeed = (parseInt(wind.speed)) * .012;
        console.log("windspeed is " + windSpeed);
        return this.set({
          windspeed: windSpeed
        });
      }
    };

    return Weather;

  })(sdn.Models.YQLModel);

}).call(this);
