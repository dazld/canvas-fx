
with(Math) {
	
	t=setTimeout;
	c.width = c.height = w = 400;

	myx = myy = w*.5;

	rand = function(n){
		return Math.floor(Math.random()*n);
	};

	r1 = rand(255);
	g1 = rand(255);
	b1 = rand(255);
	angle = rand(20)+5;
	
	comp0 = SetColors(r1,g1,b1,0); //itself
	comp1 = SetColors(r1,g1,b1,180); //complementary
	comp2 = SetColors(r1,g1,b1,180.0-angle); //quad
	comp3 = SetColors(r1,g1,b1,180.0+angle); //quad

	colors = [comp1[2], comp2[2], comp3[2]];
	//colors = ["255,0,0","255,255,0"];
	cl = colors.length;
	
	n=[];
	narcs = 5;
	


	for (var i=0;i<narcs;i++){
		n[i] = [rand(360), rand(50)+50, Math.random()*0.1, rand(cl) ];
	}

	function updateArcs() {
		for (var i=0;i<narcs;i++){
			n[i][0] = n[i][0]+n[i][2];
		}
	}

	with(b.style) margin = padding = 0;
	c.style.border = '0px';

	(l = function() {
	
			updateArcs();
		
			a.fillStyle = 'rgba('+comp0[0]+',1.0)';
			a.fillRect(0,0,w,w);
			a.fillStyle = 'rgba('+colors[rand(cl)]+',0.5)';
			a.lineWidth = 12;

			 for (var i=0;i<narcs;i++){
				a.strokeStyle = 'rgba('+colors[n[i][3]]+',0.5)';
				a.beginPath();
				a.arc( myx+sin(n[i][0])*n[i][1],
					   myy+cos(n[i][0])*n[i][1],
					   n[i][1],0,Math.PI*(sin(n[i][0])+1),true);
				a.stroke();
			  }
		t(l,20)
	})()
	
}
