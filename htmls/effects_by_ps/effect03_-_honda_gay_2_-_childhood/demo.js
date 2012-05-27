rand = function(n){
	return Math.floor(Math.random()*n);
};

//var images = [];
//var imagesloaded = [];
//var images_gif = [];
//var images_jpg = [];

//var limitconns = 6;
/*
function getImages() {
	if (limitconns-- < 0) return;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4){				
				var ourarray = JSON.parse(xmlhttp.responseText);
				var thisarray = ourarray["responseData"]["results"];
				for (var i=0; i < thisarray.length; i++) {

					var valid = true;
					if (thisarray[i]["unescapedUrl"] != 'http://i25.tinypic.com/j67twx.jpg')
						valid = false;
					//console.log(valid + " " + images.length + " " + j);
					if (images.length > 0)
					for (var j=0; j<images.length; j++) {
						console.log(images[j].src+" "+thisarray[i]["unescapedUrl"]);
						if (images[j].src === thisarray[i]["unescapedUrl"]) valid = false;
					}

					if (valid === true) {
						var idx = images.length;
						images[idx] = new Image();
						imagesloaded[idx] = 0;
						images[idx].src = thisarray[i]["unescapedUrl"];
						console.log("loading: "+thisarray[i]["unescapedUrl"]);
					}
				
				}
				//playDemo();
			}
	};
	xmlhttp.open("GET","getimages.php",true);
	xmlhttp.send(null);
}*/
/*
function loadImages() {
	for (var i=0; i<17; i++) {
		var idx = images_gif.length;
		images_gif[idx] = new Image();
		images_gif[idx].src = "lolitas/"+i+".gif";
	}
	for (var i=0; i<9; i++) {
		var idx = images_jpg.length;
		images_jpg[idx] = new Image();
		images_jpg[idx].src = "lolitas/"+i+".jpg";
	}
}*/

var imgrnd;

function setColors() {
		r1 = rand(255);
		g1 = rand(255);
		b1 = rand(255);
		angle = rand(20)+5;
		
		comp0 = SetColors(r1,g1,b1,0); //itself
		comp1 = SetColors(r1,g1,b1,180); //complementary
		comp2 = SetColors(r1,g1,b1,180.0-angle); //quad
		comp3 = SetColors(r1,g1,b1,180.0+angle); //quad
	
		colors = [comp1[2], comp2[2], comp3[2]];
		cl = colors.length;
		b.style.backgroundColor = comp0["hex"];
}

function playDemo() {

	var audio = document.getElementById('input');
	audio.play();

	document.getElementById('hideme').style.display = 'none';
	
	with(Math) {
		
		t=setTimeout;
		c.width = c.height = w = 400;
	
		var myx, myy = w*.5;
	
		setColors();
		
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
	
	//alert("started");
		(l = function() {

/*
				if (fft.spectrum[20] > 80.0) {
					getImages();
					//console.log("loaded more");
				}		*/
			
				//var magnitude = fft.spectrum[12];
          		if (fft.spectrum[12] + fft.spectrum[25] + fft.spectrum[40] > 80.0*3) {
          			if (random() > 0.5) {
						imgrnd = rand(17);//images_gif.length);
						//var imw = images_gif[imgrnd].width;
						//if ((imw != 0) && (imw < 600)) {
						//	img = images_gif[imgrnd];
							document.getElementById('bgimg').src = 'lolitas/'+imgrnd+'.gif';
						//}
					}
					if (random() > 0.8) {
						setColors();
					}
				}
				
				//c.width = img.width;
				//c.height = img.height;		
				//a.drawImage(img, 0, 0, img.width, img.height);
		
				updateArcs();
			
				myx = c.width / 2;
				myy = c.height / 2;
				
				//a.fillStyle = 'rgba('+comp0[0]+',1.0)';
				//a.fillRect(0,0,w,w);
				a.clearRect ( 0 , 0 , w , w );

				a.fillStyle = 'rgba('+colors[rand(cl)]+',0.5)';
				a.lineWidth = 12;
	
				 for (var i=0;i<narcs;i++){
				  {
					a.strokeStyle = 'rgba('+colors[n[i][3]]+','+fft.spectrum[12*i]/130.0+')';
					a.beginPath();
					a.arc( myx+sin(n[i][0])*n[i][1],
						   myy+cos(n[i][0])*n[i][1],
						   n[i][1],0,Math.PI*(sin(n[i][0])+1),true);
					a.stroke();
				  }
			}
			t(l,20)
		})()
		
	}
}

//loadImages();