
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
	cl = colors.length;
	
	with(b.style) margin = padding = 0;
	c.style.border = '0px';

	nlines = 20;

	
	function drawShapes() {

			a.lineCap = 'round';
			a.lineJoin = 'round';
			a.lineWidth = 4;
			a.font="24pt Helvetica";
			var d = new Date();
			var timer = d.getTime();

			for (var i=0;i<nlines;i++){
			    var linex = w/nlines;
			    
				for (var j=0; j<w; j+=linex) {
					a.strokeStyle = 'rgba('+colors[i%cl]+',0.1)';
					a.fillStyle = 'rgba('+colors[(i*j)%cl]+',0.1)';
					var pivotx = i*linex+Math.cos(timer*2/1000+(j+i))*10;
					var pivoty = j+Math.sin(timer/1000+(j+Math.sin(timer*i)))*10;
					a.globalCompositeOperation = 'xor';
					a.fillText( (i*j)%cl, pivotx, pivoty);
					
					a.globalCompositeOperation = 'lighter';
					a.beginPath();
					a.arc(pivotx,pivoty,Math.abs(Math.cos(timer*2/1000+(j+i))),0, 2*Math.PI, rand(1));
					//a.arc(pivotx,pivoty,-10,0,2*Math.PI,true);
					
					if ((i+j)%2 == 0) a.stroke();
					 else a.fill();
				}
			  }
	}


	var transparency = 0.05;
	
	document.onkeypress = function textsizer(e){
		var evtobj=window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
		var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
		var actualkey=String.fromCharCode(unicode)
		if (actualkey=="a")
			transparency += 0.005;
		if (actualkey=="z")
			transparency -= 0.005;
		console.log("transparency changed to "+transparency);
	};

	(l = function() {
	
			//updateLines();

			a.fillStyle = 'rgba('+comp0[0]+','+transparency+')';
			a.fillRect(0,0,w,w);
		
			drawShapes();
				//}
		t(l,20)
	})()
