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
