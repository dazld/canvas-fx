

with(Math) {
	
	t=setTimeout;
	c.width = c.height = w = 800;

myx = 400;
myy = 400;

	colors = ["255,26,0", "255,255,0", "26,255,26"];
	cl = colors.length;
	
	n=[];
	nbranches = 2;
	narcs = 2;
	
	rand = function(n){
		return Math.floor(Math.random()*n);
	};

	for (var j=0;j<nbranches;j++){
		n[j] = [];
		for (var i=0;i<narcs;i++){
			//m=[rand(360),rand(10)+10];
			n[j][i] = [rand(360), rand(50)+50, Math.random()*0.1, rand(cl) ];
		}
		n[j]["ang"] = rand(360);
		n[j]["len"] = rand(50)+50;
	}

	function updateArcs() {
		for (var j=0;j<nbranches;j++){
			n[j]["ang"] += Math.random()*0.3;
			for (var i=0;i<narcs;i++){
				//m=[rand(360),rand(10)+10];
				n[j][i][0] = n[j][i][0]+n[j][i][2];
			}
		}
	}

	with(b.style) margin = padding = 0;
	c.style.border = '0px';

	(l = function() {
	
			updateArcs();
		
			a.clearRect(0,0,w,w);
			a.fillStyle = 'rgba('+colors[rand(cl)]+',0.5)';
			a.lineWidth = 12;
		
			for (var j=0;j<nbranches;j++){
				var cosang = cos(n[j]["ang"])*n[j]["len"];
				var sinang = sin(n[j]["ang"])*n[j]["len"];
				var bx = cosang;
				var by = sinang;
				 for (var i=0;i<narcs;i++){
				  {
					a.strokeStyle = 'rgba('+colors[n[j][i][3]]+',0.5)';
					a.beginPath();
					a.arc( myx+cosang+sin(n[j][i][0])*n[j][i][1],
						   myy+cosang+cos(n[j][i][0])*n[j][i][1],
						   n[j][i][1],0,Math.PI*2,true);
					a.stroke();
				  }
			}				
				
		}
		t(l,20)
	})()
	
}
