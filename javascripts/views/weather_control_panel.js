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
      "change input[name=windSpeed]": "setWind"
    };

    WeatherControlPanel.prototype.render = function() {
      this.hide();
      this.resetPanels();
      this.$el.find(".row-panel").first().css("display", "block");
      this.$el.find("button[data-panel]").first().addClass("active");
      this.selectScene();
      return this.selectWind();
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

    WeatherControlPanel.prototype.cancelClose = function() {
      return false;
    };

    WeatherControlPanel.prototype.selectScene = function() {
      this.$el.find(".condition-wrapper").removeClass("selected");
      return this.$el.find("[data-scene=" + (this.model.get("scene")) + "]").find(".condition-wrapper").addClass("selected");
    };

    WeatherControlPanel.prototype.selectWind = function() {
      var wind;
      wind = this.model.get("wind");
      return this.$el.find("[name=windSpeed]").val(wind.speed);
    };

    WeatherControlPanel.prototype.setWind = function(ev) {
      return this.model.changeWind($(ev.currentTarget).val());
    };

    WeatherControlPanel.prototype.chooseCondition = function(ev) {
      var code, item, text;
      code = $(ev.currentTarget).data("condition-code");
      text = $(ev.currentTarget).data("condition-text");
      item = _.clone(this.model.get("item"));
      this.model.set("conditionCode", code);
      this.model.set("conditionText", text);
      this.trigger("controlpanel:changecondition", {
        conditionCode: code
      });
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
