

self.onmessage = function(e){

	var data = e.data,
		width = e.data.width,
		height = e.data.height,
		frame = e.data.frame,
		size = e.data.size,
		cols = e.data.cols,
		rows = e.data.rows,
		colors = [];

	function getPixel(x,y){ // google chromabrush
		var x = x < 0 ? 0 : x;
		var y = y < 0 ? 0 : y;
		if (x >= width) {x = width -1};
		if (y >= height) {x = height -1};
		var index = (y * width + x) * 4;
		return [
			frame.data[index+0],
			frame.data[index+1],
			frame.data[index+2],
			frame.data[index+3]
		];
	}

	function avgColor(x,y,size){
		var blockSize = 8,
			rgb = {r:0,g:0,b:0},
			count = 0;


		for (var xPtr = x; xPtr < x+size; xPtr += blockSize) {
			for (var yPtr = y; yPtr < y+size; yPtr += blockSize) {
				var rgbData = getPixel(xPtr,yPtr);
				++count;
		        rgb.r += rgbData[0];
		        rgb.g += rgbData[1];
		        rgb.b += rgbData[2];
			};
		};

	    

	    // ~~ used to floor values
	    rgb.r = ~~(rgb.r/count);
	    rgb.g = ~~(rgb.g/count);
	    rgb.b = ~~(rgb.b/count);

	    return rgb;
	}

	







	for (var row = 0; row < data.rows; row++) {
		for (var col = 0; col < data.cols; col++) {
			var color = avgColor(col*size,row*size,size);
			
			colors.push("rgb("+color.r+","+color.g+","+color.b+")");
		}
	}


	self.postMessage(colors);
}