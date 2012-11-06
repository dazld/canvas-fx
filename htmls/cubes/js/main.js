define(function(require){

	var bus = require('mediator'),
		$ = require('jquery'),
		_ = require('underscore'),
		vector2d = require('../lib/vector2d');

	/**
	 * Returns a random number between min and max
	 */
	function getRandomArbitary (min, max) {
	    return Math.random() * (max - min) + min;
	}

	/**
	 * Returns a random integer between min and max
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function applyPrecision (float,precision) { // http://jsperf.com/tofixed-vs-factor
        var factor = Math.pow(10, precision);
        return Math.round(float * factor) / factor;
    }

	var osc = function(start,min,max,inc,precision){

		if (min > max || max < min || inc > max) {
			return false;
		};

		var min = min || 0,
			max = max || 1,
			current = start || 0.5,
			inc = inc || 0.1,
			precision = precision || 2;

		

		return function(){
			current += inc;
			current = applyPrecision(current,precision);
			if (current >= max ) {
				current = max;
				inc = -inc;
			} else if (current <= min) {
				current = min;
				inc = -inc;
			}

			return current;
		}
	}


	var main = {
		cubes: [],
		cubesize: 12,
		init: function(){

		

			this.bus = bus;
			
			this.$canvas = $("canvas");
			this.$offscreen = $(document.createElement('canvas'));
			this.$input = $("#keyword");

			this.ctx = this.$canvas[0].getContext('2d');
			this.offscreenCtx = this.$offscreen[0].getContext('2d');


			$(window).bind('resize',$.proxy(this.resize,this)); // <3 proxy
			
			
			this.starttime = new Date();

		
			
			

			console.log('loaded and bound');

			$($.proxy(this.resize,this)); //not always triggering?

			
		},
		start: function(){
			this.stop();
			this.interval = window.setInterval($.proxy(this.draw,this), 16);
		},
		stop: function(){
			window.clearInterval(this.interval);
		},
		
		resize: function(e){
			// this.stop();
			// console.log('resize');

			//	HOW MANY CUBES omg caps
			// per row anc col ting

			

			this.width = $(window).innerWidth(),
			this.height = $(window).innerHeight();


			this.cols = (this.width / this.cubesize) << 0;
			this.rows = (this.height / this.cubesize) << 0;

			this.$canvas.width(this.width).height(this.height);
			this.$offscreen.width(this.width).height(this.height);

			this.$canvas.attr({
				"width":this.width,
				"height":this.height
			});

			this.$offscreen.attr({
				"width":this.width,
				"height":this.height
			});

			this.setupCubes($.proxy(this.start,this));
			
		},
		setupCubes: function(callback){

			this.cubes = [];

			for (var row = 0; row < this.rows; row++) {
				for (var col = 0; col < this.cols; col++) {
					// console.log(col+"-"+row);
					this.cubes.push({
						color: "#"+(Math.random()*0xFFFFFF<<0).toString(16).toUpperCase(),
						a: [getRandomInt(col*this.cubesize,(col+1)*this.cubesize),row*this.cubesize ],
						b: [(col+1)*this.cubesize,getRandomInt(row*this.cubesize,(row+1)*this.cubesize)],
						c: [getRandomInt(col*this.cubesize,(col+1)*this.cubesize),(row+1)*this.cubesize],
						d: [col*this.cubesize,getRandomInt(row*this.cubesize,(row+1)*this.cubesize)]
					});
					var lastcube = this.cubes[this.cubes.length-1];
					lastcube.oscs = {
						a: osc(lastcube.a[0],col*this.cubesize,(col+1)*this.cubesize,Math.random()),
						b: osc(lastcube.b[1],row*this.cubesize,(row+1)*this.cubesize,Math.random()),
						c: osc(lastcube.c[0],col*this.cubesize,(col+1)*this.cubesize,Math.random()),
						d: osc(lastcube.d[1],row*this.cubesize,(row+1)*this.cubesize,Math.random())
					}
				};
			};


		
			

		    if (callback && typeof(callback) == "function") {
		    	callback();
		    };

		},
		timedtext: function(){
			var times = [

			];
		},
		draw: function(){

			this.ctx.clearRect(0,0,this.width,this.height);

			var context = this.ctx;


			for ( var i = 0, len = this.cubes.length; i < len ; ++i ) {
				
				var cube = this.cubes[i];

				// this.ctx.save();
				// this.ctx.rotate(0.003);
				cube.a[0] = cube.oscs.a();
				cube.b[1] = cube.oscs.b();
				cube.c[0] = cube.oscs.c();
				cube.d[1] = cube.oscs.d();
				this.ctx.fillStyle  = cube.color;
				// this.ctx.lineWidth = 0.5;
				// this.ctx.globalAlpha = 0.8;
     		 	this.ctx.beginPath();
				this.ctx.moveTo(cube.a[0],cube.a[1]);
				this.ctx.lineTo(cube.b[0],cube.b[1]);
				this.ctx.lineTo(cube.c[0],cube.c[1]);
				this.ctx.lineTo(cube.d[0],cube.d[1]);
				this.ctx.lineTo(cube.a[0],cube.a[1]);

				this.ctx.closePath();
				this.ctx.fill();
				// this.ctx.restore();
				if (i%3 == 0) {
					// this.ctx.stroke();
				} else {

				}

				// 
				
		       	

			
		         
		    }
		}
	};



	return main;

});
