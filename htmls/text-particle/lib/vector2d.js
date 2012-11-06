define(function(){
	var vector2d = function(x,y){

		var vec = {
			vx: x,
			vy: y,

			scale: function(scale){
				vec.vx *= scale;
				vec.vy *= scale;
				return vec;
			},
			add: function(vec2){
				vec.vx += vec2.vx;
				vec.vy += vec2.vy;
				return vec;
			},
			sub: function(vec2){
				vec.vx -= vec2.vx;
				vec.vy -= vec2.vy;
				return vec;
			},
			negate: function(){
				vec.vx -= vec.vx;
				vec.vy -= vec.vy;
				return vec;
			},
			length: function(){
				return Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
			},
			lengthSquared: function(){
				return vec.vx * vec.vx + vec.vy * vec.vy;
			},
			normalize: function(){
				
				var len = this.length();
				if (len) {
					vec.vx = vec.vx/len;
					vec.vy = vec.vy/len;
				};

				return len;
			},
			normalized: function(){
				var normalized = {
					vx:0,
					vy:0
				};
				var len = this.length();
				if (len) {
					normalized.vx = 0.01 * vec.vx/len;
					normalized.vy = 0.01 * vec.vy/len;
				};
				return normalized;
			},
			rotate: function(angle){
				var vx = vec.vx,
					vy = vec.vy,
					cosVal = Math.cos(angle),
					sinVal = Math.sin(angle);
				vec.vx = vx * cosVal - vy * sinVal;
				vec.vy = vx * sinVal + vy * cosVal;
			},
			toString: function(){
				return '('+vec.vx.toFixed(0)+', '+vec.vy.toFixed(0)+'), '+(vec.length()*Game.fps).toFixed(0)+'px/s';
			}

		};

		return vec;

	}

	return vector2d;
});