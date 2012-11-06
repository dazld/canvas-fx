require.config({
	urlArgs: "bust=" +  (new Date()).getTime(),
	deps: ['main', 'jquery'],
	paths: {
		"jquery" : "http://code.jquery.com/jquery.min",
		"underscore" : "../lib/lodash"
	},
	shim: {
		"main": {
			"deps" : ['../lib/vector2d']
		},
		"mediator": {
			"deps":['jquery']
		}

	}
});

require(['main'], function (main) {
	main.init();
	window.main = main; // expose for debug

});