(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sdn.Models.Time = (function(_super) {
    __extends(Time, _super);

    function Time() {
      return Time.__super__.constructor.apply(this, arguments);
    }

    Time.prototype.urlRoot = "http://www.isitfoggyinsanfrancisco.com/forecast/time?callback=?";

    Time.prototype.sync = function(method, model, options) {
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

    Time.prototype.parse = function(response) {
      var _ref, _ref1;
      return response != null ? (_ref = response.query) != null ? (_ref1 = _ref.results) != null ? _ref1.channel : void 0 : void 0 : void 0;
    };

    return Time;

  })(Backbone.Model);

}).call(this);
