(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sdn.Models.Fog = (function(_super) {
    __extends(Fog, _super);

    function Fog() {
      return Fog.__super__.constructor.apply(this, arguments);
    }

    Fog.prototype.urlRoot = "http://www.isitfoggyinsanfrancisco.com/forecast/current?callback=?";

    Fog.prototype.sync = function(method, model, options) {
      var params;
      params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: model.url(),
        jsonp: 'callback',
        processData: false
      }, options);
      return $.jsonp(params);
    };

    return Fog;

  })(Backbone.Model);

}).call(this);
