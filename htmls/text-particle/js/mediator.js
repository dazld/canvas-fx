define(function(require){

	// benalman.com tiny pubsub wrapped in a CJS mod

	var o =  $({});

	var mediator = {
		
		sub: function() {
			o.on.apply(o, arguments);
		},
		pub: function(){
			o.trigger.apply(o,arguments);
		},
		unsub: function(){
			o.off.apply(o,arguments);
		}

	};


	return mediator;
});