
	t=setTimeout;
	c.width = c.height = w = 400;

	rand = function(n){
		return Math.floor(Math.random()*n);
	};

	r1 = rand(255);
	g1 = rand(255);
	b1 = rand(255);
	angle = rand(20)+5;
	console.log("r1="+r1+",g1="+g1+",b1="+b1+",angle="+angle+";");
	//r1=30,g1=244,b1=224,angle=10;
	//r1=190,g1=144,b1=48,angle=16;
	//r1=191,g1=42,b1=8,angle=20;
	
	comp0 = SetColors(r1,g1,b1,0); //itself
	comp1 = SetColors(r1,g1,b1,180); //complementary
	comp2 = SetColors(r1,g1,b1,180.0-angle); //quad
	comp3 = SetColors(r1,g1,b1,180.0+angle); //quad

	colors = [comp1[2], comp2[2], comp3[2]];
	//colors = ["255,0,0","255,255,0"];
	cl = colors.length;
	
	with(b.style) margin = padding = 0;
	c.style.border = '0px';

	nlines = 20;

	function updateLines() {
	}
	
	function drawLines() {

			a.lineCap = 'round';
			a.lineJoin = 'round';
			var d = new Date();
			var timer = d.getTime();

			for (var i=0;i<nlines;i++){
			    var linex = w/nlines;
			    a.lineWidth = Math.abs(Math.cos(timer*i*2/1000)*(nlines*0.5));
			  	//a.lineWidth = Math.abs(Math.cos(timer*i/1000)*i+nlines*.5)+1;
				a.strokeStyle = 'rgba('+colors[i%cl]+',0.1)';
				a.beginPath();
				for (var j=0; j<w; j+=linex*2) {
					a.moveTo(i*linex+Math.cos(timer*2/1000)*10,j+Math.cos(timer/1000+(j+i))*5);
					//a.lineTo(i*linex+Math.cos(timer/1000)*10*i,j+linex);
					a.lineTo(i*linex+Math.cos(timer/1000)*10,j+linex);
				}
				a.stroke();
			  }
	}

	(l = function() {
	
			//updateLines();

			a.fillStyle = 'rgba('+comp0[0]+',0.08)';
			a.fillRect(0,0,w,w);
		
			drawLines();
				//}
		t(l,20)
	})()
