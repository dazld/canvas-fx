define(function(require){

	var bus = require('mediator'),
		$ = require('jquery'),
		_ = require('underscore'),
		vector2d = require('../lib/vector2d');


	var main = {
		particles: [],
		init: function(){

			this.bus = bus;
			
			this.$canvas = $("canvas");
			this.$offscreen = $(document.createElement('canvas'));
			this.$input = $("#keyword");

			this.ctx = this.$canvas[0].getContext('2d');
			this.offscreenCtx = this.$offscreen[0].getContext('2d');

			this.width = $(window).innerWidth(),
			this.height = $(window).innerHeight();

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

     		this.keyword = '<^.^> hurro';

			$(window).bind('resize',$.proxy(this.resize,this)); // <3 proxy
			this.$input.bind('change keyup', $.proxy(this.updateKeyword,this));
			$($.proxy(this.resize,this)); //not always triggering?

			console.log('loaded and bound');
			
		},
		start: function(){
			this.stop();
			this.interval = window.setInterval($.proxy(this.draw,this), 33);
		},
		stop: function(){
			window.clearInterval(this.interval);
		},
		updateKeyword: function(e){
			console.log(e.target.value);
			var self = this;
			window.clearTimeout(this.timeout);
			this.timeout = window.setTimeout(function(){
				self.keyword = e.target.value;
				self.setupParticles();
			},66);
		},
		resize: function(e){
			// this.stop();
			// console.log('resize');
			this.width = $(window).innerWidth(),
			this.height = $(window).innerHeight();

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


			
			this.ctx.font = "190px 'Lato' bold";
			

			
			this.setupParticles($.proxy(this.start,this));
			
		},
		setupParticles: function(callback){
			this.offscreenCtx.clearRect(0,0,this.width,this.height);
			this.offscreenCtx.font  = "200px arial";

			this.offscreenCtx.fillText(this.keyword, ( this.width / 2 ) - ( Math.round( this.offscreenCtx.measureText(this.keyword).width/2 )  ) ,  (this.height/2) + 47  );
			// delete this.particles;

			// this.particles = [];
			 var imageData, image_Data, 
		        pixel,
		        width   = 0,
		        i       = 0,
		        density = 4,
		        slide   = false;
		         
		    //Get the image data - from (0,0) to the edges of the canvas
		    imageData = this.offscreenCtx.getImageData( 0, 0, this.width, this.height );
		    image_Data= imageData.data;
		    
		    var counter = 0;
		    for( var height = 0; height < this.height; height += density ) {
		         
		        ++i;
		        slide   = ((i % 2) == 0);
		         
		        width   = 0;
		         
		        if (slide == true) {
		         
		            width += 6;
		         
		        }
		         
		        //Iterate horizontally over the image data
		        for( width; width < this.width; width += density ) {
		            
		            //Get the pixel located at our current iteration
		            pixel = image_Data[ ( ( width + ( height * this.width )) * 4 ) - 1 ];
		            //Pixel has been drawn on.
		            if( pixel == 255 ) {
		            	// console.log(this.particles[counter]);s
		 				if (this.particles[counter]) {
		 					// console.log('rewrite');
		 					this.particles[counter].destination = new vector2d(width,height);
		 				} else {
		 					//Add the coodinates and colour to our particle array.
		 					// console.log('adding');
			                this.particles.push({
			                    colour  : "rgba(214,2,112,0.5)",
			                    x       : width,
			                    y       : height,
			                    destination: new vector2d(width,height),
			                    position: new vector2d((Math.random() * this.width) << 0,(Math.random() * this.height) << 0),
			                    speed 	: new vector2d(0,0)
			                });	
		 				}
		                
		                ++counter;
		            }
		        }

		        
			}

			this.particles.splice(counter);

			

			

		    if (callback && typeof(callback) == "function") {
		    	callback();
		    };

		},
		draw: function(){

			this.ctx.clearRect(0,0,this.width,this.height);

			var context = this.ctx;


			for ( var i = 0, len = this.particles.length; i < len ; ++i ) {
         
		        var particle = this.particles[i];

		        var dvec = new vector2d(particle.destination.vx - particle.position.vx, particle.destination.vy - particle.position.vy);

				var dist = dvec.normalize();
				dvec.scale(Math.log(dist)*0.05);
				particle.speed.add(dvec);




				// this.speed.add(this.gravity);
				particle.position.add(particle.speed);
				particle.speed.scale(0.95);
				context.fillStyle = particle.colour;
				context.fillRect(particle.position.vx,particle.position.vy,3,3);

		        // var x = particle.x,
		        // 	y = particle.y,
		        // 	sx = particle.sx,
		        // 	sy = particle.sy,
		        // 	width = this.width,
		        // 	height = this.height;
		        

		        // context.fillRect(x,y,2,2);

			
		         
		    }
		}
	};



	return main;

});