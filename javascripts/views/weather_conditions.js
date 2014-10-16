(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sdn.Views.WeatherConditions = (function(_super) {
    __extends(WeatherConditions, _super);

    function WeatherConditions() {
      return WeatherConditions.__super__.constructor.apply(this, arguments);
    }

    WeatherConditions.prototype.events = {
      "click .weather-control-panel-button": "changeWeather"
    };

    WeatherConditions.prototype.initialize = function() {};

    WeatherConditions.prototype.render = function() {
      var item;
      item = this.model.get("item");
      this.$el.find(".temperature").html("" + item.condition.temp);
      return this.$el.find(".conditions").text(this.model.get("conditionText"));
    };

    WeatherConditions.prototype.changeWeather = function() {
      this.trigger("weatherconditions:change");
      return false;
    };

    return WeatherConditions;

  })(Backbone.View);

}).call(this);
