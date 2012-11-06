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
		cubesize: 16,
		init: function(){

			var self = this;
			// will only work on a server, because of security policies
			// try python -m SimpleHTTPServer (2)
			// or python -m http.server 8000 in this directory and going to
			// localhost:8000 if you have python installed
			this.worker = new Worker('js/workers/averaging.js');
			
			this.worker.onmessage = function(e){
				// console.log('received colors'+e.data.length);

				var response = e.data;
				var num_cubes = e.data.length-1;

				for (var i = 0; i < num_cubes; i++) {
					self.cubes[i].color = e.data[i];
				};
				self.stillprocessing = false;
			};

			this.worker.onerror = function(e){
				console.log('worker error');
			}

			

			this.bus = bus;
			
			this.$canvas = $("canvas");
			this.$offscreen = $(document.createElement('canvas'));
			this.video = document.getElementById('vid');
			this.$input = $("#keyword");

			this.ctx = this.$canvas[0].getContext('2d');
			this.offscreenCtx = this.$offscreen[0].getContext('2d');

			// init video
			if (navigator.webkitGetUserMedia) {
				navigator.webkitGetUserMedia({video:true},function(stream){
					 self.video.src = window.webkitURL.createObjectURL(stream);
					 self.startProcessing();
					 self.stream = stream;
				},function(){
					self.stream = false;
					alert('webcam init problem');
				})
			};


			$(window).bind('resize',$.proxy(this.resize,this)); // <3 proxy
			
			
			this.starttime = new Date();

		
			
			

			console.log('loaded and bound');

			$($.proxy(this.resize,this)); //not always triggering?

			
		},
		handleVideo: function(){
			
			
			if (this.stillprocessing) {
				// console.log('skipping frame');
				return;
			};
			// console.log('handling frame');

			this.stillprocessing = true;
			this.offscreenCtx.drawImage(this.video,0,0,this.width,this.height);

			var frameData = this.offscreenCtx.getImageData(0,0,this.width,this.height);
			

			this.worker.postMessage({
				size: this.cubesize,
				frame: frameData,
				width: this.width,
				height: this.height,
				cols: this.cols,
				rows: this.rows
			});
			
		},
		startProcessing: function(){
			var self = this;

			this.processInterval = window.setInterval($.proxy(this.handleVideo,this),333);

			

		},
		start: function(){
			this.stop();
			this.interval = window.setInterval($.proxy(this.draw,this), 33);
		},
		stop: function(){
			window.clearInterval(this.interval);
			// window.clearInterval(this.processInterval);
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
						row: row,
						col: col,

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
		draw: function(){

			this.ctx.clearRect(0,0,this.width,this.height);

			var context = this.ctx;
			// this.handleVideo();


			for ( var i = 0, len = this.cubes.length; i < len ; ++i ) {
				
				var cube = this.cubes[i];

				// if (this.stream) {
				// 	// var data = this.offscreenCtx.getImageData(cube.col*this.cubesize, cube.row*this.cubesize, this.cubesize, this.cubesize);
					
				// 		// var rgb = this.avgColor(data);
				// 		// cube.color = "rgb("+rgb.r+","+rgb.g+","+rgb.b+")";
						
					
					
				// };

				
				cube.a[0] = cube.oscs.a();
				cube.b[1] = cube.oscs.b();
				cube.c[0] = cube.oscs.c();
				cube.d[1] = cube.oscs.d();
				this.ctx.fillStyle  = cube.color;
				
     		 	this.ctx.beginPath();
				this.ctx.moveTo(cube.a[0],cube.a[1]);
				this.ctx.lineTo(cube.b[0],cube.b[1]);
				this.ctx.lineTo(cube.c[0],cube.c[1]);
				this.ctx.lineTo(cube.d[0],cube.d[1]);
				this.ctx.lineTo(cube.a[0],cube.a[1]);

				this.ctx.closePath();
				this.ctx.fill();
				 
				
		       	

			
		         
		    }
		}
	};



	return main;

});
