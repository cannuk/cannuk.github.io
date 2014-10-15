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
/*
    Cloudgen.js JavaScript library version 1.0.
    
    https://github.com/Ninjakannon/Cloudgen.js
    
    Copyright 2012 Benjamin Pryke
    Released under the MIT license
    https://github.com/Ninjakannon/Cloudgen.js/blob/master/LICENSE.txt
*/

// Hide Cloudgen.js internals from the global scope in an anonymous function.
(function() {
    // Constants =============================================================
    // We require this later, so precompute it here.
    var TWO_PI = Math.PI * 2;
    
    // The ratio of circle radius to cloud radius. The circles used to draw
    // the clouds are thus this times the cloud radius.
    var CIRCLE_RADIUS_RATIO = 0.6;
    
    // The spacing as a percentage of cloud radius between clouds in the grid
    // of "drawCloudGroup".
    var CLOUD_GROUP_SPACING = 0.75;
    
    // Our default values.
    var DEFAULT_RADIUS = 100;
    var DEFAULT_COLOUR = {r:255, g:255, b:255};
    var DEFAULT_ALPHA = 0.15;
    var DEFAULT_CIRCLES = 25;
    
    
    
    // Setup =================================================================
    // Create our local Cloudgen.js object.
    var Cloudgen = function() {
    };
    
    
    
    // Public Methods ========================================================
    /*  Draws a single cloud to the given canvas context.
        
        context (required)
            The "CanvasRenderingContext2D" instance to draw to.
            
        centreX (optional) Default 0.
            The approximate centre of the cloud in the x-dimension.
            
        centreY (optional) Default 0.
            The approximate centre of the cloud in the y-dimension.
            
        radius (optional) Default "DEFAULT_RADIUS".
            The radius of the circular area inside which the cloud will be
            generated.
            
        colour (optional) Default "DEFAULT_COLOUR".
            An object of the form {r:0, g:0, b:0} representing the RGB values
            of the cloud colour.
            
        alpha (optional) Default "DEFAULT_ALPHA".
            The transparency of the cloud. Range 0.0 to 1.0.
            
        circles (optional) Default "DEFAULT_CIRCLES".
            Clouds are created by drawing numerous gradient-filled circles;
            the more there are, the thicker the cloud. This is the number to
            draw. */
    Cloudgen.drawCloud = function(context, centreX, centreY, radius, colour, alpha, circles) {
        // Set default arguments.
        switch (arguments.length) {
            case 0: return;
            case 1: centreX = 0;
            case 2: centreY = 0;
            case 3: radius = DEFAULT_RADIUS;
            case 4: colour = DEFAULT_COLOUR;
            case 5: alpha = DEFAULT_ALPHA;
            case 6: circles = DEFAULT_CIRCLES;
        }
        
        // Calcualte the radius of the circles used to draw the cloud.
        var circleRadius = radius * CIRCLE_RADIUS_RATIO;
        
        // Create the circle's radial gradient.
        var gradient = context.createRadialGradient(circleRadius, circleRadius, 0, circleRadius, circleRadius, circleRadius);
        var gradientColour = "rgba(" + colour.r + ", " + colour.g + ", " + colour.b + ", ";
        
        gradient.addColorStop(0, gradientColour + String(alpha) + ")");
        gradient.addColorStop(1, gradientColour + "0)");
        
        // Draw the circle with gradient to a canvas.
        var circleCanvas = document.createElement("canvas");
        var circleCanvasContext = circleCanvas.getContext("2d");
        
        circleCanvas.width = circleRadius * 2;
        circleCanvas.height = circleCanvas.width;
        
        circleCanvasContext.fillStyle = gradient;
        
        circleCanvasContext.beginPath();
        circleCanvasContext.arc(circleRadius, circleRadius, circleRadius, 0, TWO_PI, true);
        circleCanvasContext.fill();
        
        // Draw the specified number of circles.
        for (var i = 0; i < circles; i++) {
            // Compute a randomised circle position within the cloud.
            var angle = Math.random() * TWO_PI;
            var x = centreX - circleRadius + Math.random() * radius * Math.cos(angle);
            var y = centreY - circleRadius + Math.random() * radius * Math.sin(angle);
            
            // Draw the circle.
            context.drawImage(circleCanvas, x, y);
        }
    };
    
    
    /*  Draws a grid of clouds to the given canvas context.
        
        context (required)
            The "CanvasRenderingContext2D" instance to draw to.
        
        grid (required)
            A two-dimensional binary array specifying the location of clouds
            with ones. Note that rows can be different lengths. For example, a
            grid specifying a single diagonal cloud is below.
                [[1],
                 [0, 1],
                 [0, 0, 1]]
        
        topLeftX (optional) Default 0.
            The approximate centre of the top-left cloud centre in the grid in
            the x-dimension.
        
        topLeftY (optional) Default 0.
            The approximate centre of the top-left cloud centre in the grid in
            the y-dimension.
        
        radius: see "drawCloud".
        colour: see "drawCloud".
        alpha: see "drawCloud".
        circles: see "drawCloud". */
    Cloudgen.drawCloudGroup = function(context, grid, topLeftX, topLeftY, radius, colour, alpha, circles) {
        // Set default arguments.
        switch (arguments.length) {
            case 0: return;
            case 1: return;
            case 2: topLeftX = 0;
            case 3: topLeftY = 0;
            case 4: radius = DEFAULT_RADIUS;
        }
        
        // Get an array of the parameters we need to send on to "drawCloud".
        var parameters = Array.prototype.splice.call(arguments, 4);
        
        // Loop through the cloud grid, row by row.
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                // If this cell is a 1, we draw a cloud.
                if (grid[i][j] === 1) {
                    // Calculate the cloud centre position.
                    var centreX = topLeftX + j * radius * CLOUD_GROUP_SPACING;
                    var centreY = topLeftY + i * radius * CLOUD_GROUP_SPACING;
                    
                    // Call "drawCloud" with the correct parameters as passed
                    // to this method. Parameters that were not passed will
                    // not be sent.
                    var args = [context, centreX, centreY].concat(parameters);
                    
                    this.drawCloud.apply(this, args);
                }
            }
        }
    };
    
    
    
    // Finalisation ==========================================================
    // Expose Cloudgen.js to the global scope.
    window.$cloudgen = Cloudgen;
})();
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sdn.Views.Weather = (function(_super) {
    __extends(Weather, _super);

    function Weather() {
      return Weather.__super__.constructor.apply(this, arguments);
    }

    Weather.prototype.clouds = {
      "clear": {
        density: 0
      },
      "pcloud": {
        color: {
          r: 255,
          g: 255,
          b: 255
        },
        density: 8
      },
      "mcloud": {
        color: {
          r: 255,
          g: 255,
          b: 255
        },
        density: 22
      },
      "rain": {
        color: {
          r: 190,
          g: 195,
          b: 209
        },
        density: 35
      },
      "thunder": {
        color: {
          r: 190,
          g: 195,
          b: 209
        },
        density: 40
      }
    };

    Weather.prototype.initialize = function(options) {
      var _ref, _ref1;
      this.windModifier = (_ref = options.windModifier) != null ? _ref : 0;
      this.ceiling = (_ref1 = options.ceiling) != null ? _ref1 : 20;
      this.model.on("change:scene", this.render, this);
      return this.model.on("change:windspeed", function() {
        this.windSpeed = this.model.get("windspeed");
        return this.windSpeed += this.windModifier;
      }, this);
    };

    Weather.prototype.render = function() {
      var _ref;
      if (this.isRendered) {
        this.$el.html('');
      }
      this.width = this.$el.width();
      this.height = this.$el.height();
      this.stage = new Kinetic.Stage({
        container: this.$el.get(0),
        width: this.width,
        height: this.height
      });
      this.isRendered = true;
      if ((((_ref = this.options) != null ? _ref.delay : void 0) != null)) {
        return setTimeout((function(_this) {
          return function() {
            return _this.draw();
          };
        })(this), this.options.delay);
      } else {
        return this.draw();
      }
    };

    Weather.prototype.createCloud = function(height, width, x, y) {
      var cloudCanvas, context, grid, num, size;
      if (height == null) {
        height = 3;
      }
      if (width == null) {
        width = 15;
      }
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      size = 23.7;
      cloudCanvas = document.createElement("canvas");
      context = cloudCanvas.getContext("2d");
      cloudCanvas.width = width * size;
      cloudCanvas.height = height * (size + 20);
      grid = (function() {
        var _i, _results;
        _results = [];
        for (num = _i = 0; 0 <= height ? _i <= height : _i >= height; num = 0 <= height ? ++_i : --_i) {
          _results.push((function() {
            var _j, _results1;
            _results1 = [];
            for (num = _j = 0; 0 <= width ? _j <= width : _j >= width; num = 0 <= width ? ++_j : --_j) {
              _results1.push(Math.round(Math.random()));
            }
            return _results1;
          })());
        }
        return _results;
      })();
      $cloudgen.drawCloudGroup(context, grid, 40, 40, 25, this.clouds[this.model.get('scene')].color);
      return new Kinetic.Image({
        image: cloudCanvas,
        x: x,
        y: y,
        opacity: 0
      });
    };

    Weather.prototype.draw = function() {
      var cloudDensity, layer, segmentSize, x, _i, _results;
      layer = new Kinetic.Layer();
      if (this.clouds[this.model.get('scene')].density > 0) {
        cloudDensity = this.clouds[this.model.get('scene')].density;
        segmentSize = Math.floor(this.width / cloudDensity);
        _results = [];
        for (x = _i = 0; 0 <= cloudDensity ? _i <= cloudDensity : _i >= cloudDensity; x = 0 <= cloudDensity ? ++_i : --_i) {
          _results.push(this.drawCloud(layer, Math.floor(Math.random() * (x * segmentSize)), Math.floor(Math.random() * this.height) - 120));
        }
        return _results;
      }
    };

    Weather.prototype.drawCloud = function(layer, x, y) {
      var anim, cloud, cloudWidth;
      cloud = this.createCloud(3, 15, x, y);
      this.windSpeed = this.model.get('windspeed');
      this.windSpeed += this.windModifier;
      cloudWidth = cloud.getWidth();
      layer.add(cloud);
      this.stage.add(layer);
      cloud.transitionTo({
        opacity: 1,
        duration: 3
      });
      anim = new Kinetic.Animation({
        func: (function(_this) {
          return function(frame) {
            var pos;
            pos = cloud.getX() - _this.windSpeed;
            if ((cloud.getX() + cloudWidth) <= 0) {
              pos = _this.stage.getWidth() + 10;
              y = Math.floor(Math.random() * _this.height) - 120;
              cloud.setY(y);
            }
            return cloud.setX(pos);
          };
        })(this),
        node: layer
      });
      return anim.start();
    };

    return Weather;

  })(Backbone.View);

}).call(this);
