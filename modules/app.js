var app = {
	init: function(){

		var self = this;

		self.$obj 	= $("#stage");
		self.ctx 	= self.$obj[0].getContext('2d');

		this.reset();
 		$(window).unbind();
 		$(window).bind('resize', debouncer( function ( e ) {
    		self.reset();
		}));
		
	},
	reset: function(){

		var self = app;

		this.$obj.height($(window).height());
		this.$obj.width($(window).width());

		this.$obj.attr('height',$(window).height());
		this.$obj.attr('width',$(window).width());

		self.width  = this.$obj.width();
 		self.height = this.$obj.height();
		
 		effect.reset(self.width, self.height, self.ctx);

		window.clearInterval(this.anim);
		this.anim = window.setInterval(this.draw,16);
	},
	draw: function(){
		// console.log('drawing');
		effect.draw();
	}
};