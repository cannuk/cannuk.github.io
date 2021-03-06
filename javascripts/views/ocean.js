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

  sdn.Views.Ocean = (function(_super) {
    __extends(Ocean, _super);

    function Ocean() {
      return Ocean.__super__.constructor.apply(this, arguments);
    }

    Ocean.prototype.initialize = function() {
      return this.model.on("change:scene", this.render, this);
    };

    Ocean.prototype.css = {
      "mcloud": "mostly-cloudy",
      "rain": "storm",
      "thunder": "storm"
    };

    Ocean.prototype.el = "#ocean";

    Ocean.prototype.render = function() {
      var scene;
      scene = this.model.get("scene");
      if (!!scene) {
        return this.$el.removeClass().addClass(this.css[scene]);
      }
    };

    return Ocean;

  })(Backbone.View);

}).call(this);
