
Date.prototype.getHoursTwoDigits = function()
{
    var retval = this.getHours();
    if (retval < 10)
    {
        return ("0" + retval.toString());
    }
    else
    {
        return retval.toString();
    }
}

Date.prototype.getMinutesTwoDigits = function()
{
    var retval = this.getMinutes();
    if (retval < 10)
    {
        return ("0" + retval.toString());
    }
    else
    {
        return retval.toString();
    }
}

Date.prototype.getSecondsTwoDigits = function()
{
    var retval = this.getSeconds();
    if (retval < 10)
    {
        return ("0" + retval.toString());
    }
    else
    {
        return retval.toString();
    }
}

var app = {
    pi: Math.PI,
    r: Math.random,
    m: Math,
    numpaths: 55,
    minutes:[],
    hours: [],
    seconds: [],
    init: function(){
        var self = this;
        
        this.count = 0;
        this.now = new Date();
        this.$obj = $("#sand");
        
        this.cycle = this.osc(1.2,2,0.2);
        this.ctx = this.$obj[0].getContext('2d');
        
       
        $(window).bind('resize',function(){
                       self.reset();
        });
        this.reset();
    },
    reset: function(){
        var self = this;
        
        window.clearInterval(this.anim);
        
        this.$obj.height($(window).height());
        this.$obj.width($(window).width());
        
        this.$obj.attr('height',$(window).height());
        this.$obj.attr('width',$(window).width());
        
        self.width  = this.$obj.width();
        self.height = this.$obj.height();
        
        self.paths = {
            hours: [],
            minutes: [],
            seconds: []
        };

         for (var i = 0; i < 24; i++) {
            
            var x = self.width/2;
            var y = self.height/2;
            
            self.paths.hours.push(new bPath(x, y, i+1,'hour'));
        };


        for (var i = 0; i < 60; i++) {
            
            var x = self.width/2;
            var y = self.height/2;
            
            self.paths.minutes.push(new bPath(x, y, i+1,'minute'));
        };

        for (var i = 0; i < 60; i++) {
            
            var x = self.width/2;
            var y = self.height/2;
            
            self.paths.seconds.push(new bPath(x, y, i+1,'second'));
        };

        
        		 		
       
        this.anim = window.setInterval(this.draw,32)

    },
    animate: function(){
        requestAnimationFrame(app.animate);
        app.draw();
    },
    clear: function(){
        var self = this;
        self.ctx.clearRect(0,0,self.width, self.height);
    },
    endAnim: function(){
        window.clearInterval(this.anim);
    },
    fade: function(){
        var self = this;
        this.ctx.fillStyle = "rgba(0,0,0,0.1)";
        self.ctx.rect(0, 0, self.width, self.height);
        self.ctx.fill();

    },
    draw: function(){
        var self = app;
        var x = self.width/2;
        var y = self.height/2;
        
        self.now = new Date();

        var seconds = self.now.getSecondsTwoDigits();
        var hours   = self.now.getHoursTwoDigits();
        var minutes = self.now.getMinutesTwoDigits();


        $("h1").html(hours+":"+minutes+":"+seconds);
        
        for (var i = 0; i < hours<<0; i++) {
            self.paths.hours[i].updatePosition();
        };
                
        for (var i = 0; i < minutes<<0; i++) {
            self.paths.minutes[i].updatePosition();
        };
        
        
        for (var i = 0; i < seconds<<0; i++) {
            self.paths.seconds[i].updatePosition();
        };

        

        self.fade();					
        
    },
    osc: function(low, high, inc) {
        
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
            
            return app.roundNumber(ret,2);
        }; 
    },
    
    roundNumber:function(number, decimals) { // Arguments: number to round, number of decimal places
        
        if (!decimals) {decimals = 0;};
        
        var newnumber = new Number(number+'').toFixed(parseInt(decimals));
        return  parseFloat(newnumber); 
    }
}

function bPath(startX, startY, index, cat) {
    
    var distance 	= 0
    var dist 		= 0;
    var a 			= app;
    this.category   = cat;
    var ctx         = a.$obj[0].getContext('2d');
    var that        = this;
    
    var opacity     = a.roundNumber(a.r() * 0.3+0.5,1);
    var red         = 0;//128 + (a.r() * 128 << 0);
    var green       = 0;//32; //128 + (a.r() * 32 << 0);
    var blue        = 0;//32; //128 + (a.r() * 32 << 0);
    var width       = a.roundNumber(a.r() * 2,2);
    this.setupStyle = function(){
        var t = new Date();
        switch (this.category){
            case 'hour':
                red         = 32 + (a.r() * 128 << 0);
                green       = 132 + (a.r() * 32 << 0);
                blue        = 32 + (a.r() * 32 << 0);
                width       = a.roundNumber(a.r() * 6,2)+2;
                this.numpaths = t.getHours()+1;
                break;
            case 'minute':
                red         = 32 + (a.r() * 128 << 0);
                green       = 32 + (a.r() * 32 << 0);
                blue        = 132 + (a.r() * 32 << 0);
                width       = a.roundNumber(a.r() * 4,2)+1;
                this.numpaths = t.getMinutes()+1;
                break;
            case 'second':
                red         = 128 + (a.r() * 128 << 0);
                green       = 32 + (a.r() * 32 << 0);
                blue        = 32 + (a.r() * 32 << 0);
                width       = a.roundNumber(a.r() * 2,2);
                this.numpaths = t.getSeconds()+1;
                break;
            

        }

        
    }
    this.setupStyle();
    this.direction	= 1;
    this.count = 0;
    this.painting = {
        x: null,
        y: null,
        angle: null,
        angle_end:null
    };
    
    
    
    
    
    var lastaction 	= 'line'; // arc or line
    var angle 		= 0;
    var angle_end	= a.roundNumber( 360 / this.numpaths, 2 ) * Math.PI/180  * index;
    var coords = {
        x : null,
        y : null,
        x2 : startX,
        y2 : startY
    };
    
    // ctx.moveTo(startX, startY);
    // ctx.beginPath();
    
    
    
    this.swapAction = function(){
        lastaction = (lastaction == 'arc') ? 'line' : 'arc';
    }
    
    this.updatePosition = function(){
        
        var t = new Date();

        switch (this.category){
            case 'hour':
                this.numpaths = 24;
                break;
            case 'minute':
                this.numpaths = 60;
                break;
            case 'second':
                this.numpaths = 60
                break;
            

        }

        if (distance > startY) {
            
            distance = 0;
            coords.x2 = startX;
            coords.y2 = startY;
            lastaction = 'line';
            angle = 0;
        };
        
        
        
        switch (lastaction){
            
            case 'arc':
                
                ctx.beginPath();
                ctx.moveTo(coords.x,coords.y);
                ctx.lineCap = "round";
                
                ctx.strokeStyle = "rgba("+red+","+green+","+blue+","+opacity+")";
                ctx.lineWidth = width;
                this.count++;
                this.painting.angle++;
                
                ctx.arc(startX,startY, distance, angle,this.deg_to_rad(this.painting.angle));
                
                ctx.stroke();
                
                if (this.painting.angle<<0 == this.rad_to_deg(coords.angle_end)<<0 || this.count > 360) {
                    this.count = 0;
                    this.swapAction();	
                };
                
                break;
            
            case 'line':
                this.count = 0;
                ctx.beginPath();
                ctx.lineCap = "round";
                // this.direction = this.direction * -1;
                
                ctx.moveTo(coords.x2, coords.y2);
                
                dist 			= 2 * index;//(a.r()*30)/2 << 0; // bitshift floor magic!
                distance 		= dist + distance;
                
                ctx.lineWidth = width;
                ctx.strokeStyle = "rgba("+red+","+green+","+blue+","+opacity+")";
                
                var na = this.getAngle()*index;
                
                angle 		= angle_end;
                angle_end	= angle + na; 
                
                this.lastangle = angle_end;
                
                
                coords = {
                    x : startX + distance * Math.cos(angle) << 0,
                    y : startY + distance * Math.sin(angle) << 0,
                    x2: startX  + distance * Math.cos(angle_end) << 0,
                    y2: startY  + distance * Math.sin(angle_end) << 0,
                    angle: angle,
                    angle_end: angle_end
                    
                };
                
                this.painting.angle = this.rad_to_deg(angle)<<0;
                
                
                ctx.lineTo(coords.x, coords.y);
                
                ctx.stroke();
                
                this.swapAction();
                break;
            
        }	
        
    }
    
    this.rad_to_deg = function(angle){
        return angle * 180 / Math.PI;
    }
    
    this.deg_to_rad = function(angle){
        return angle * Math.PI/180;
    }
    
    this.getAngle = function(){
        
        // return 0.5 * this.direction;
        return this.direction * (this.deg_to_rad(a.roundNumber( a.r()*360 / this.numpaths, 2 ))) ;
    }
}