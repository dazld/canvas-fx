"use strict";

var Game = {
	width: 700,
	height: 550,
	balls: [],
	levels: [
		{
			num_balls: 5,
			condition: 1
		},
		{
			num_balls: 7,
			condition: 3
		},
		{
			num_balls: 9,
			condition: 5
		},
		{
			num_balls: 12,
			condition: 7
		},
		{
			num_balls: 15,
			condition: 9
		},
		{
			num_balls: 17,
			condition: 12
		},
		{
			num_balls: 22,
			condition: 17
		},
		{
			num_balls: 25,
			condition: 20
		},
		{
			num_balls: 33,
			condition: 29
		},
		{
			num_balls: 37,
			condition: 33
		},
		{
			num_balls: 42,
			condition: 39
		},
		{
			num_balls: 47,
			condition: 42
		},
		{
			num_balls: 51,
			condition: 48
		},
		{
			num_balls: 57,
			condition: 55
		}
	],
	current_level: false,
	init: function(){


		this.$obj = $("canvas");
		this.ctx = this.$obj[0].getContext("2d");

		this.score = 0;
		this.level = 0;
		this.startLevel();

		
	},
	draw: function(){

		var keepgoing = false;

		this.ctx.clearRect(0, 0, Game.width, Game.height);

		$.each(this.balls,function(i){
			if (this.expanded) {
				keepgoing = true;
			};
			this.update();
			this.draw();
		});

		$.each(this.balls,function(i){
			if (this.size <= 0) {
				Game.balls.splice(i,1);
			}
		});

		if (!keepgoing && Game.played) {
			window.clearInterval(this.interval);
			
			if (this.score < this.current_level.condition) {

				alert('Try again');

			} else {
				alert('well done!')
				this.level++;
			}

			this.score = 0;
			this.played = false;
			this.startLevel();
		};

		$(".score").html(this.score);
	},
	startLevel: function(){
		this.current_level = this.levels[this.level];
		this.balls = [];
		this.$obj.unbind();
		this.$obj.bind('click',function(e){
			if (Game.played) {
				return false;
			};
			Game.played = true;
			var playerBall = new Ball(e.offsetX,e.offsetY,Game);
			playerBall.played = true;
			playerBall.expanded = true;
			Game.balls.push(playerBall);
			
		});

		for (var i = this.current_level.num_balls; i > 0; i--) {
			var pos = this.randomPosition();
			this.balls.push(new Ball(pos.x,pos.y,this));
		};

		this.interval = window.setInterval(function(){
			Game.draw();
		},16);
	},
	randomPosition: function(){
		var pos = {
			x: (Math.random() * this.width << 0),
			y: (Math.random() * this.height << 0)
		}

		pos.x = this.restrict(pos.x,70,this.width-70);
		pos.y = this.restrict(pos.y,70,this.width-70);

		return pos;
	},
	hsv: function(h, s, v, a){
	
		h = h - Math.floor(h);
		h = h * 6;
		s = s < 0 ? 0 : s > 1 ? 1 : s;
		v = v < 0 ? 0 : v > 1 ? 1 : v;
		var r = 0;
		var g = 0;
		var b = 0;
		if( h >= 0 && h < 1 ){
			r = 255;
			g = 255 * h;
		} else if ( h < 2 ){
			g = 255;
			r = 255 * ( 2 - h );
		} else if ( h < 3 ){
			g = 255;
			b = 255 * (h - 2);
		} else if ( h < 4 ){
			b = 255;
			g = 255 * (4 - h);
		} else if ( h < 5 ){
			b = 255;
			r = 255 * (h - 4);
		} else if ( h <= 6 ){
			r = 255;
			b = 255 * (6 - h);
		}
		r = (255 - r) * (1 - s) + r;
		g = (255 - g) * (1 - s) + g;
		b = (255 - b) * (1 - s) + b;
		r *= v;
		g *= v;
		b *= v;
		r = Math.floor(r);
		g = Math.floor(g);
		b = Math.floor(b);
		if( typeof(a) == 'undefined' ){
			return 'rgb(' + r + ',' + g + ',' + b + ')';
		} else {
			a = a < 0 ? 0 : a > 1 ? 1 : a;
			return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
		}
	
	},
	restrict: function(val,min,max){
		if (val > max) {
			return max;
		} else if (val < min) {
			return min;
		} else {
			return val;
		}
	},
	randomSpeed: function(){

	}

}