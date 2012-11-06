

var Ball = function(x, y, Game) {

	"use strict";

	var ball = this;

	this.Game = Game;
	this.played = false;
	this.x = x;
	this.y = y;
	this.lastX = x;
	this.lastY = y;
	this.position = new vector2d(x, y);
	this.size = 10;
	this.expanded_size = 50;
	this.expanded = false;
	this.shrink = false;
	this.color = this.Game.hsv(Math.random(),1,1,0.3);
	// 
	var startdirection = Math.random() * 360;
	var startspeed = 3;


	this.speed = new vector2d(Math.cos(startdirection) * startspeed, Math.sin(startdirection) * startspeed);

	// this.gravity = new vector2d(0, 0.03);

	

	

	this.update = function() {
		// this.speed.add(this.gravity);
		if (this.size < this.expanded_size && this.expanded && !this.shrink) {
			this.size += 0.4;
		}
		if (this.size >= this.expanded_size) {
			this.shrink = true;
		}

		if (this.shrink && this.size > 0) {
			this.size -= 0.7;
			if (this.size < 0 ){
				this.size = 0;
			}
				
		};

		



		if (this.position.vx > (Game.width - this.size) || this.position.vx < this.size) {  
	  		this.speed.vx *= -1;
		};

		if (this.position.vy > (Game.height - this.size) || this.position.vy < this.size) {
			this.speed.vy *= -1;
		};

		if (!this.expanded) {
			this.position.add(this.speed);
		};

		$.each(this.Game.balls,function(){
			if (this == ball){
				// do nothing, it's the same ball
			} else {
				var dist = Math.sqrt(
					(this.position.vx - ball.position.vx)*(this.position.vx - ball.position.vx) + 
					(this.position.vy - ball.position.vy)*(this.position.vy - ball.position.vy));

				if (dist <= ball.size + this.size && ball.expanded && !this.expanded) {
					this.expand();
				};
			}
		})

		
		
	}

	this.expand = function(){
		this.expanded = true;
		if (!this.played ) {
			Game.score++;
		};
	}

	this.draw = function() {
		var context = this.Game.ctx;

		context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.position.vx, this.position.vy, this.size, 0, Math.PI*2, true); 
        context.closePath();
        context.fill();
	}


}