(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sdn.Views.WeatherControlPanel = (function(_super) {
    __extends(WeatherControlPanel, _super);

    function WeatherControlPanel() {
      return WeatherControlPanel.__super__.constructor.apply(this, arguments);
    }

    WeatherControlPanel.prototype.events = {
      "click .close-button": "hide",
      "click": "cancelClose",
      "click .condition": "chooseCondition",
      "click button[data-panel]": "changePanel",
      "change input[name=windspeed]": "selectWind",
      "change input[name=hour]": "selectTime"
    };

    WeatherControlPanel.prototype.initialize = function(options) {
      this.fogModel = options.fogModel;
      this.model.on("change:conditionCode", this.setScene, this);
      return this.fogModel.on("change:foggy", this.selectScene, this);
    };

    WeatherControlPanel.prototype.render = function() {
      this.hide();
      this.resetPanels();
      this.$el.find(".row-panel").first().css("display", "block");
      this.$el.find("button[data-panel]").first().addClass("active");
      this.setScene();
      this.setWind();
      return this.setFog();
    };

    WeatherControlPanel.prototype.show = function() {
      this._isShown = true;
      this.$el.addClass("visible");
      return false;
    };

    WeatherControlPanel.prototype.hide = function() {
      this._isShown = false;
      this.$el.removeClass("visible");
      return false;
    };

    WeatherControlPanel.prototype.resetPanels = function() {
      this.$el.find(".row-panel").css("display", "none");
      return this.$el.find("button[data-panel]").removeClass("active");
    };

    WeatherControlPanel.prototype.cancelClose = function(ev) {
      ev.preventDefault();
      return false;
    };

    WeatherControlPanel.prototype.setScene = function() {
      this.$el.find("[data-scene]").not("[data-scene=fog]").removeClass("selected");
      return this.$el.find("[data-scene=" + (this.model.get("scene")) + "]").addClass("selected");
    };

    WeatherControlPanel.prototype.setWind = function() {
      var wind;
      wind = this.model.get("wind");
      this.$el.find("[name=windspeed]").val(wind.speed);
      return false;
    };

    WeatherControlPanel.prototype.setTime = function() {
      this.$el.find("[name=hour]").val(this.fogModel.get("hour"));
      return false;
    };

    WeatherControlPanel.prototype.selectWind = function(ev) {
      this.model.changeWind($(ev.currentTarget).val());
      ev.preventDefault();
      return false;
    };

    WeatherControlPanel.prototype.selectTime = function(ev) {
      var val;
      val = $(ev.currentTarget).val();
      if (val > 23) {
        val -= 23;
      }
      this.fogModel.set("hour", val);
      ev.preventDefault();
      return false;
    };

    WeatherControlPanel.prototype.setFog = function() {
      if (this.fogModel.get("foggy") !== "no") {
        return this.$el.find("[data-scene=fog]").addClass("selected");
      }
    };

    WeatherControlPanel.prototype.selectFog = function(ev) {
      var $wrapper;
      $wrapper = $(ev.currentTarget);
      if ($wrapper.hasClass('selected')) {
        this.fogModel.set("foggy", "no");
        return $wrapper.removeClass("selected");
      } else {
        this.fogModel.set("foggy", "yes");
        return $wrapper.addClass("selected");
      }
    };

    WeatherControlPanel.prototype.chooseCondition = function(ev) {
      var code, item, text;
      code = $(ev.currentTarget).data("condition-code");
      if (code === "fog") {
        this.selectFog(ev);
      } else {
        text = $(ev.currentTarget).data("condition-text");
        item = _.clone(this.model.get("item"));
        this.model.set("conditionCode", code);
        this.model.set("conditionText", text);
      }
      return false;
    };

    WeatherControlPanel.prototype.changePanel = function(ev) {
      var $target, panel;
      $target = $(ev.currentTarget);
      panel = $target.data("panel");
      this.resetPanels();
      this.$el.find(".panel-" + panel).css("display", "block");
      $target.addClass("active");
      return false;
    };

    return WeatherControlPanel;

  })(Backbone.View);

}).call(this);
