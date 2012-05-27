D=document;D.title = "Cyboman 5";

a = D.createElement('link');
a.setAttribute('href', 'http://fonts.googleapis.com/css?family=Audiowide');
a.setAttribute('rel', 'stylesheet');
a.setAttribute('type','text/css');
D.head.appendChild(a);

PI = Math.PI;
Ro = Math.round;
Ra = Math.random;
si = Math.sin;
co = Math.cos;

b = D.body;
with(b.style) padding='80px',textAlign='center',margin='auto',background="#000";
b.innerHTML = '';
c = D.createElement('canvas');
b.appendChild(c);
c.style.border = '0px';
a = c.getContext('2d');
b.clientWidth; // fix bug in webkit?! do i really need this?! http://qfox.nl/weblog/218

A = D.createElement('audio');
b.appendChild(A);

var st=[['TPOLM','T polm'],['presents','presents'],['a 4K intro','a four kai intro'],['not titled','not taiteld'],['cyboman 6','sai bo man   saiks'],['greetings to','ritings two'],['PWP','pi dobly pi'],['MFX','me f s'],['Kewlers','kuwlers'],['Satori','sa pori'],['Flo','fo'],['Kosmoplovci','kosmoploksi'],['Accession','a ksession'],['Ephidrena','ephi deina'],['and you!','and iu'],['','vi hav teknoloji'],['','T polm tu tousan an tuelv'],['','surender ior vol']];

//meta = D.createElement('meta');
//meta.setAttribute('charset', 'utf-8');

b.onload = function() {
	au = new Audio("data:audio/x-wav," + bA(RIFFChunk(1, 16, generateSound())));
	au.play();
	au.volume = .20;
	
	(L = function() {
		a.fillStyle = 'rgba('+c0[0]+','+transparency+')';
		a.fillRect(0,0,cw,ch);
		TH = au.currentTime;
		dS();
		if (TH==au.duration) {
			b.innerHTML = 'TPOLM &#9829; Stream 2012';
			b.appendChild(A);
			SA(st[16][1]);
		} else {
			T(L,20);
		}
	})()
}


// colorwheel, based from a couple of random internet sites that i dont remember anymore

// angle = 0 for complementary
// angle +15 +15 for triad
// angle +15 +180+15 for quad
function SC(r1, g1, b1, angle) {
	tR = new Object();
	tR.r = r1;
	tR.g = g1;
	tR.b = b1;
	
	tS=RGB2HSV(tR);
	tS.hue=HueShift(tS.hue, angle);
	tR=HSV2RGB(tS);
	
	var r=tR.r;
	var g=tR.g;
	var b=tR.b;
	var cL = [];

	var ra=Ro(r+(255-r)*.8);
	var ga=Ro(g+(255-g)*.8);
	var ba=Ro(b+(255-b)*.8);

	var rb=Ro(r+(255-r)*.4);
	var gb=Ro(g+(255-g)*.4);
	var bb=Ro(b+(255-b)*.4);

	var rc=Ro(r*.6);
	var gc=Ro(g*.6);
	var bc=Ro(b*.6);

	var rd=Ro(r*.3);
	var gd=Ro(g*.3);
	var bd=Ro(b*.3);

	cL[0] = ra+","+ga+","+ba;
	cL[1] = rb+","+gb+","+bb;
	cL[2] = r+","+g+","+b;
	cL[3] = rc+","+gc+","+bc;
	cL[4] = rd+","+gd+","+bd;

	return cL;
}

function HueShift(h,s) {
	h+=s;
	while (h>=360.0) h-=360.0;
	while (h<0.0) h+=360.0;
	return h;
}

hexdig='0123456789ABCDEF';
function DH(d) {
	return hexdig.charAt((d-(d%16))/16)+hexdig.charAt(d%16);
}
function Hex2Dec(h) {
	h=h.toUpperCase();
	var d=0;
	for (var i=0;i<h.length;i++) {
		d=d*16;
		d+=hexdig.indexOf(h.charAt(i));
	}
	return d;
}
function RGB2Hex(r,g,b) {
	return DH(r)+DH(g)+DH(b);
}

// RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
// which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
function HSV2RGB(hsv) {
	var rgb=new Object();
	if (hsv.saturation==0) {
		rgb.r=rgb.g=rgb.b=Ro(hsv.value*2.55);
	} else {
		hsv.hue/=60;
		hsv.saturation/=100;
		hsv.value/=100;
		var i=Math.floor(hsv.hue);
		var f=hsv.hue-i;
		var p=hsv.value*(1-hsv.saturation);
		var q=hsv.value*(1-hsv.saturation*f);
		var t=hsv.value*(1-hsv.saturation*(1-f));
		switch(i) {
			case 0: rgb.r=hsv.value; rgb.g=t; rgb.b=p; break;
			case 1: rgb.r=q; rgb.g=hsv.value; rgb.b=p; break;
			case 2: rgb.r=p; rgb.g=hsv.value; rgb.b=t; break;
			case 3: rgb.r=p; rgb.g=q; rgb.b=hsv.value; break;
			case 4: rgb.r=t; rgb.g=p; rgb.b=hsv.value; break;
			default: rgb.r=hsv.value; rgb.g=p; rgb.b=q;
		}
		rgb.r=Ro(rgb.r*255);
		rgb.g=Ro(rgb.g*255);
		rgb.b=Ro(rgb.b*255);
	}
	return rgb;
}

function min3(a,b,c) { return (a<b)?((a<c)?a:c):((b<c)?b:c); }
function max3(a,b,c) { return (a>b)?((a>c)?a:c):((b>c)?b:c); }

function RGB2HSV(rgb) {
	var hsv = new Object();
	var max=max3(rgb.r,rgb.g,rgb.b);
	var dif=max-min3(rgb.r,rgb.g,rgb.b);
	hsv.saturation=(max==0.0)?0:(100*dif/max);
	if (hsv.saturation==0) hsv.hue=0;
 	else if (rgb.r==max) hsv.hue=60.0*(rgb.g-rgb.b)/dif;
	else if (rgb.g==max) hsv.hue=120.0+60.0*(rgb.b-rgb.r)/dif;
	else if (rgb.b==max) hsv.hue=240.0+60.0*(rgb.r-rgb.g)/dif;
	if (hsv.hue<0.0) hsv.hue+=360.0;
	hsv.value=Ro(max*100/255);
	hsv.hue=Ro(hsv.hue);
	hsv.saturation=Ro(hsv.saturation);
	return hsv;
}


// bytecode sound synth, based on player and examples from viznut, bemmu et al

var hz = 8000;

function generateSound() {
    var seconds = 110;

    var sA = [];

    for (var t = 0; t < hz*seconds; t++) {
        // Between 0 - 65535
//        var sample = Math.floor(Ra()*65535);
        
        var value = (si(t)>>t|t|t>>122|2*t|t<<si(t)|t>>6|t<<1|t>>4|t>>14)*10+(t<<2|si(t))^(t<hz*10?0:t|t>>4+si(t>>4));
        
        if ( ((t>hz*26) && (t<hz*30)) || 
        	 ((t>hz*47) && (t<hz*51)) ) value = (3<<t+(si(t)^(t>>15&3)))|((t>>4)&(t<<3));
        	 
        if ( (t>hz*59.9) && (t<hz*60.1) ||
        	 ( (t>hz*63.9) && (t<hz*64.1) )) value = (t*si(t))^(20);
        
        var sample = value & 0xff;
        sample *= 256;
        if (sample < 0) sample = 0;
        if (sample > 65535) sample = 65535;
        
        sA.push(sample);
    }
   return sA;
}

// [255, 0] -> "%FF%00"
function bA(values) {
    var out = "";
    for (var i = 0; i < values.length; i++) {
        var hex = values[i].toString(16);
        if (hex.length == 1) hex = "0" + hex;
        out += "%" + hex;
    }
    return out.toUpperCase();
}

// Character to ASCII value, or string to array of ASCII values.
function cA(str) {
    if (str.length == 1) {
        return str.charCodeAt(0);
    } else {
        var out = [];
        for (var i = 0; i < str.length; i++) {
            out.push(cA(str[i]));
        }
        return out;
    }
}

function sb(l) {
    return [l&0xff, (l&0xff00)>>8, (l&0xff0000)>>16, (l&0xff000000)>>24];
}

function FMTSubChunk(channels, bPS) {
    var byteRate = hz * channels * bPS/8;
    var blockAlign = channels * bPS/8;
    return [].concat(
        cA("fmt "),
        sb(16), // Subchunk1Size for PCM
        [1, 0], // PCM is 1, split to 16 bit
        [channels, 0], 
        sb(hz),
        sb(byteRate),
        [blockAlign, 0],
        [bPS, 0]
    );
}

function sATD(sA, bPS) {
    if (bPS === 8) return sA;
    if (bPS !== 16) {
        alert("Only 8 or 16 bit supported.");
        return;
    }
    
    var da = [];
    for (var i = 0; i < sA.length; i++) {
        da.push(0xff & sA[i]);
        da.push((0xff00 & sA[i])>>8);
    }
    return da;
}

function dataSubChunk(channels, bPS, sA) {
    return [].concat(
        cA("data"),
        sb(sA.length * channels * bPS/8),
        sATD(sA, bPS)
    );
}

function chunkSize(fmt, data) {
    return sb(4 + (8 + fmt.length) + (8 + data.length));
}
    
function RIFFChunk(channels, bPS, sA) {
    var fmt = FMTSubChunk(channels, bPS);
    var data = dataSubChunk(channels, bPS, sA);
    var header = [].concat(cA("RIFF"), chunkSize(fmt, data), cA("WAVE"));
    return [].concat(header, fmt, data);
}


// speech synth, based from p01's js1k entry
// http://www.p01.org/releases/JS1K_Speech_Synthesizer/
	
function SA(M) {
		for(  S='',h=g=l=k=s=0;s<M.length;s+=1/1024,S+=String.fromCharCode(t>255?255:t<0?0:0|t)) {
if(f=g,g=h,j=k,k=l,t=128,p={o:[52,55,10,10,6],i:[45,96,10,10,3],j:[45,96,10,10,3],u:[45,54,10,10,3],a:[58,70,10,10,15],e:[54,90,10,10,15],E:[60,80,10,10,12],w:[43,54,10,10,1],v:[42,60,20,10,3],T:[42,60,40,1,5],z:[45,68,10,5,3],Z:[44,70,50,1,5],b:[44,44,10,10,2],d:[44,99,10,10,2],m:[44,60,10,10,2],n:[44,99,10,10,2],r:[43,50,30,8,3],l:[48,60,10,10,5],g:[42,50,15,5,1],f:[48,60,10,10,4,1],h:[62,66,30,10,10,1],s:[120,150,80,40,5,1],S:[20,70,99,99,10,1],p:[44,50,5,10,2,1],t:[44,60,10,20,3,1],k:[60,99,10,10,6,1]}[M[0|s]]) {
				// 2 formant filters
				i=1-p[2]/255;
				m=1-p[3]/255;
				h=i*(g*2*si(p[0]/25)-i*f)+(p[5]?Ra():s*16%1)-.5;
				l=m*(k*2*si(p[1]/25)-m*j)+(p[5]?Ra():s*16%1)-.5;
				t+=Math.min(1,4*si(PI*s))*((h+l)*p[4]+(g+k)/2+(f+j)/8);
			}
		}
		// generate and play a WAVE PCM file
		t = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgA';
		//new Audio(t+btoa(t+S)).play();
		A.src=t+btoa(t+S);
		A.play();
		if (iS > 12) b.style.background="#"+RGB2Hex(rand(256),rand(256),rand(256));
		//console.log(TH);
}

// misc test utils

//	onkeypress=function(e){		
//	};



// based on js1k framework
// has to be minified with UglifyJS
// http://marijnhaverbeke.nl/uglifyjs
// and converted into PNG autoextractor, based on works of daekan, p01 and gasman
// https://gist.github.com/2560551

	T=setTimeout;
	c.width = cw = 320;
	c.height = ch = 240;
	c.style.width  = '640px';
	c.style.height = '480px';

	rand = function(n){
		return Math.floor(Ra()*n);
	};

	r1 = rand(255);
	g1 = rand(255);
	b1 = rand(255);
	angle = rand(20)+5;
	//console.log("r1="+r1+",g1="+g1+",b1="+b1+",angle="+angle+";");
	//r1=30,g1=244,b1=224,angle=10;
	//r1=190,g1=144,b1=48,angle=16;
	//r1=191,g1=42,b1=8,angle=20;
	
	c0 = SC(r1,g1,b1,0); //itself
	c1 = SC(r1,g1,b1,180); //complementary
	c2 = SC(r1,g1,b1,180.0-angle); //quad
	c3 = SC(r1,g1,b1,180.0+angle); //quad

	//console.log("used cL: " + c0[0] + " ::: " + c1[2] + " ::: " + c2[2] + " ::: " + c3[2]);

	cL = [c1[2], c2[2], c3[2]];
	cl = cL.length;

	nlines = 20;

	//var tt;
	var t1 = 0;
	var t2 = 2500;
	var u1 = false;
	var u2 = false;
	var transparency = 0.05;
	var iS = 0;
	
	/*n=[];
	narcs = 5;
	for (var i=0;i<narcs;i++){
		n[i] = [rand(360), rand(50)+50, Ra()*0.1, rand(cl) ];
	}*/
	function dS() {

			//var d = new Date();
			//var TI = d.getTime() - tt;
			//var TH = TI/1000;

			var TI=Ro(TH*1000);
			
			with(a){
			switch (iS) {
				case 0: //start
					if (TH > 4.3) {
						iS++;
						SA(st[0][1]);
					}
				break;
				case 1: //tpolm
					if (TH > 8.3) {
						iS++;
						SA(st[1][1]);
					}
				break;
				case 2: //presents
					if (TH > 12.3) {
						iS++;
						SA(st[2][1]);
					}
				break;
				case 3: //a 4k intro
					if (TH > 17) {
						iS++;
						SA(st[3][1]);
					}
				break;
				case 4: //not titled
					if (TH > 21) {
						iS++;
						SA(st[4][1]);
					}
				break;
				case 5: //cyboman 6
					if (TH > 26) {
						iS++;
						u1 = true;
						u2 = true;
						transparency = 0.025;
					}
				case 6: //ringing sound, z
					if (TH > 30) {
						iS++;
						//u1 = false;
						t1 = transparency = 0.05;
					}
				break;
				case 7: //squares
					if (TH > 37) {
						iS++;
						T("SA(st[15][1])",2000);
					}
				break;
				case 8: //circles
					if (TH > 41) {
						iS++;
						//u2 = false;
						//t2 = 2500;
					}
				break;
				case 9: //squares again
					if (TH > 47) {
						iS++;
						//u2 = false;
					}
				break;
				case 10: //plasma interference
					if (TH > 51) {
						iS++;
						u1 = false;
						u2 = false;
						transparency = 0.01;
						T("SA(st[17][1])",5000);
					}
				break;
				case 11: 
					if (TH > 60) {
						iS++;
						u1 = false;
						u2 = false;
						transparency = 0.01;
						globalCompositeOperation = 'xor';
					}
				break;
				case 12: 
					if (TH > 64) {
						iS++;
					}
				break;
				case 13: 
					if (TH > 68) {
						iS++;
						SA(st[5][1]);
					}
				break;
				case 14: //greetings to
					if (TH > 72) {
						iS++;
						SA(st[6][1]);
					}
				break;
				case 15: //pwp
					if (TH > 76) {
						iS++;
						SA(st[7][1]);
					}
				break;
				case 16: //mfx
					if (TH > 80) {
						iS++;
						SA(st[8][1]);
					}
				break;
				case 17: //kewlers
					if (TH > 84) {
						iS++;
						SA(st[9][1]);
					}
				break;
				case 18: //flo
					if (TH > 88) {
						iS++;
						SA(st[10][1]);
					}
				break;
				case 19: //kooi
					if (TH > 92) {
						iS++;
						SA(st[11][1]);
					}
				break;
				case 20: //accession
					if (TH > 96) {
						iS++;
						SA(st[12][1]);
					}
				break;
				case 21: //ephidrena
					if (TH > 100) {
						iS++;
						SA(st[13][1]);
					}
				break;
				case 22: //and you
					if (TH > 104) {
						iS++;
						SA(st[14][1]);
					}
				break;
				case 23:
				break;
			}
			
			lineCap = 'round';
			lineJoin = 'round';
			lineWidth = 4;
			font="24pt arial";
			
			if (u1 == true)
				t1 = TI;
			
			if (iS < 10) {	
				save();
				translate(cw/2,ch/2);
				rotate(PI*si(t1/10000));
				var z = co(TH)*4+4.5;
				if (u2) scale(z,z);
				translate(-cw/2,-ch/2);

				for (var i=0;i<nlines;i++){
					var linex = cw/nlines;					
					for (var j=0; j<cw; j+=linex) {
						strokeStyle = 'rgba('+cL[i%cl]+',0.1)';
						fillStyle = 'rgba('+cL[(i*j)%cl]+',0.1)';
						px = i*linex+co(TI/500+(j+i))*(9-z);
						py = j+si(TH+(j+si(TI*i)))*(9-z);
						globalCompositeOperation = 'xor';
						fillText( hexdig[((i*j)%cl)+iS], px, py);
						
						globalCompositeOperation = 'lighter';
						beginPath();
						arc(px,py,Math.abs(co(TI*2/1000+(j+i))),0, 2*PI, rand(1));
						
						if ((i)%2 == 0) stroke();
						 else fill();
					}
				  }
				restore();
			}
			
			if (iS > 0) {
				save();
				font="32pt Audiowide, Sans-Serif";
				if (iS>5) {
					shadowOffsetX = z*iS;
					shadowOffsetY = iS;
					shadowColor = 'rgba('+c1[rand(4)]+',0.3)';
					fillStyle = 'rgba('+c1[rand(4)]+',0.5)';
					translate(cw*.5,ch*.5);
					rotate(PI*si(TH));
					translate(-cw*.5, -ch*.5);
					var say;
					if (iS < 14) say = st[4][0];
					 else say = st[iS-9][0];
					//console.log(say + " :: " + iS);
					fillText( say,30+si(TI/2000)*10, 80+co(TI/2500)*15);
				} else {
					shadowOffsetX = 2;
					shadowOffsetY = 4;
					shadowColor = 'rgba('+c1[3]+',0.8)';
					fillStyle = 'rgba('+c1[1]+',1)';
					//console.log( st.size + " " + st[0][0] );
					fillText( st[(iS-1)%(st.length)][0], 30+si(TI/800)*15, 80+(iS%2)*100);
				}
				restore();
			}
			
			if ((iS > 6) && (iS < 12))  {
				if (iS%2==1) {
					var cos1 = co(TH)*2*PI;
					var cos2 = co(TH+si(TH)*20)*2*PI;
			
					save();
					translate(cw*0.5,ch*0.5);
					rotate(cos1);
					translate(-cw*0.5, -ch*0.5);
					
					fillStyle = "rgba("+c0[rand(4)]+",0.15)";
					fillRect (80+co(TI/PI)*20, 80+si(TH)*10, 30, 30);
	
					translate(cw*0.5,ch*0.5);
					rotate(cos2);
					translate(-cw*0.5, -ch*0.5);
					fillStyle = "rgba("+c1[rand(4)]+",0.20)";
					fillRect (120+co(TI/PI)*20, 120+si(TH*.5)*10, 40, 40);
			
					fillStyle = "rgba("+c2[rand(4)]+",0.25)";
					fillRect (150+co(TI/PI)*40, 120+cos2, 90, 90);
					
					restore();
				}/* else {
					for (var i=0;i<narcs;i++) n[i][0] = n[i][0]+n[i][2];
					
					fillStyle = 'rgba('+cL[rand(cl)]+',0.5)';
					lineWidth = 10;
		
					 for (var i=0;i<narcs;i++){
						strokeStyle = 'rgba('+cL[n[i][3]]+',0.5)';
						beginPath();
						arc( cw*0.5+si(n[i][0])*n[i][1],
							   ch*0.5+co(n[i][0])*n[i][1],
							   n[i][1],0,PI*(si(n[i][0])+1),true);
						stroke();
					  }
				}*/
			}
			}
			
			if ((iS > 9) && (iS!= 11)) {
				var idata = a.getImageData(0,0,cw,ch);
				var data = idata.data;
				for(var x = 0; x < cw; x++) {
				for(var y = 0; y < ch; y++) {
					i = (ch*x+y)*4;
					data[i] = 255-(si(TH+si((TI*(x+ch*si(TH)+ch)>>x)*PI/10000)+co(TI*(y+cw)/10000))*64<<3+104);
					if (iS>11) {
						data[i+1] = (si(data[i+2])*124+124)&0xff;
						if (iS>12) data[i+2] = (co(TH)*124+124-data[i+2]*.5)&0xff;
					}
					}
				}
				idata.data = data;
				a.putImageData(idata,0,0);	
			}
	}
