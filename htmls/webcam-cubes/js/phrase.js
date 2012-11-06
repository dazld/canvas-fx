define(function(require){
	var bus = require('mediator');

	var Phrase = function(){

	};

	Phrase.prototype.askText = function(){
		var phrase = prompt('Enter phrase');

		return this.text = phrase;
	}

	return Phrase;

})