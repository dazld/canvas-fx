if (!app  || typeof(app) !== 'object'){
	var app = {};
}

function debouncer( func , timeout ) {
   var timeoutID , timeout = timeout || 200;
   return function () {
      var scope = this , args = arguments;
      clearTimeout( timeoutID );
      timeoutID = setTimeout( function () {
          func.apply( scope , Array.prototype.slice.call( args ) );
      } , timeout );
   }
}

app.utils = {};

app.utils.r = function(){
	return Math.random();
}

app.utils.osc = function(low, high, inc) {

    // basic test for illegal parameters
    if (low > high || inc < 0 ||  2 * (high - low) < inc) 
        return function() { return NaN; };

    var curr = low;
    return function() {
        var ret = curr;
        curr += inc;

        if (curr > high || curr < low) 
        {   
            curr = inc > 0 ? 2 * high - curr : 2 * low - curr;  
            inc = -inc;
        };

        return app.utils.roundNumber(ret,2);
    }; 
}
				
app.utils.roundNumber = function(number, decimals) { // Arguments: number to round, number of decimal places

    if (!decimals) {decimals = 0;};

    var newnumber = new Number(number+'').toFixed(parseInt(decimals));
    return  parseFloat(newnumber); 
}
