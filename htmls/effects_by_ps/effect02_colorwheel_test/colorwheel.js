var savegrade1="0.8";
var savegrade2="0.4";
var savegrade3="0.6";
var savegrade4="0.3";

function PutInRange(n,l,h) { return (n<l)?l:((n>h)?h:n); }

var grade1=PutInRange(parseFloat(savegrade1),0.0,1.0);
var grade2=PutInRange(parseFloat(savegrade2),0.0,1.0);
var grade3=PutInRange(parseFloat(savegrade3),0.0,1.0);
var grade4=PutInRange(parseFloat(savegrade4),0.0,1.0);

// angle = 0 for complementary
// angle +15 +15 for triad
// angle +15 +180+15 for quad
function SetColors(r1, g1, b1, angle) {
	thisrgb = new Object();
	thisrgb.r = r1;
	thisrgb.g = g1;
	thisrgb.b = b1;
	
	temprgb=thisrgb;
	temphsv=RGB2HSV(temprgb);
	temphsv.hue=HueShift(temphsv.hue, angle);
	temprgb=HSV2RGB(temphsv);
	
	var r=temprgb.r;
	var g=temprgb.g;
	var b=temprgb.b;
	
	var ra=Math.round(r+(255-r)*grade1);
	var ga=Math.round(g+(255-g)*grade1);
	var ba=Math.round(b+(255-b)*grade1);

	var rb=Math.round(r+(255-r)*grade2);
	var gb=Math.round(g+(255-g)*grade2);
	var bb=Math.round(b+(255-b)*grade2);

	var rc=Math.round(r*grade3);
	var gc=Math.round(g*grade3);
	var bc=Math.round(b*grade3);

	var rd=Math.round(r*grade4);
	var gd=Math.round(g*grade4);
	var bd=Math.round(b*grade4);

	var colors = [];
	colors[0] = ra+","+ga+","+ba;
	colors[1] = rb+","+gb+","+bb;
	colors[2] = r+","+g+","+b;
	colors[3] = rc+","+gc+","+bc;
	colors[4] = rd+","+gd+","+bd;
	
	return colors;
}

function HueShift(h,s) {
	h+=s;
	while (h>=360.0) h-=360.0;
	while (h<0.0) h+=360.0;
	return h;
}


hexdig='0123456789ABCDEF';
function Dec2Hex(d) {
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
	return Dec2Hex(r)+Dec2Hex(g)+Dec2Hex(b);
}

// RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
// which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
function HSV2RGB(hsv) {
	var rgb=new Object();
	if (hsv.saturation==0) {
		rgb.r=rgb.g=rgb.b=Math.round(hsv.value*2.55);
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
		rgb.r=Math.round(rgb.r*255);
		rgb.g=Math.round(rgb.g*255);
		rgb.b=Math.round(rgb.b*255);
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
	hsv.value=Math.round(max*100/255);
	hsv.hue=Math.round(hsv.hue);
	hsv.saturation=Math.round(hsv.saturation);
	return hsv;
}

