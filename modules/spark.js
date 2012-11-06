if (!app  || typeof(app) !== 'object'){
	var app = {};
}

var Spark = function(startX, startY,ctx){

	// private vars
				
	var a 			= app;
	var u 			= app.utils;
	var r 			= Math.random;
	var ctx 		= a.$obj[0].getContext('2d');
	var that 		= this;

	var opacity		= a.roundNumber(a.r() * 0.5,1);
	var red 		= a.r() * 256 << 0;

	var green 		= 0;
	var blue 		= 0;
	



	var width		= u.roundNumber(a.r() * 2,2);
	var lastaction 	= 'arc';
	var angle  		= u.r()*2 * Math.PI; // start angle in rads
	var distance 	= 0;
	var direction 	= 1;
	var lastdata	= {};

	
	
	this.updatePosition = function(){
	
		lastaction = (lastaction == 'arc') ? 'line' : 'arc';
		direction = (direction > 0) ? -1 : 1;
	
		switch (lastaction){
			
			case 'arc':
				break;

			case 'line':
				dist = app.r()*12 << 0; // bitshift floor magic!
				
				angle = a.r()*360 << 0;
				angle = this.getAngle();

				// need to work out an angle here
				var coords = {
					x : dist * Math.cos(angle),
						y : dist * Math.sin(angle)	
				};
					ctx.beginPath();
				ctx.moveTo(startX,startY);
				ctx.strokeStyle = "rgba("+red+","+green+","+blue+","+opacity+")";
				ctx.lineWidth = width;			
				ctx.lineTo(startX+coords.x, startY+coords.y);
				ctx.stroke();
				
				distance += dist;
				
				lastdata.coords = coords;
				lastdata.angle = angle;

				startX = startX+coords.x;
				startY = startY+coords.y;
				break;


		}

		return lastaction;
	}

	this.getAngle = function(){
		return direction * (u.roundNumber( a.r()*2, 2 ) * Math.PI);
	}


	// is this needed?
	return that;


}