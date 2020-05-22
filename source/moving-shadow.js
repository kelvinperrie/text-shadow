
var MovingShadow = function(element) {
    var self = this;
    self.element = element;
    self.processing = false;

    // work out the center of our element
    var position = self.element.position();
    self.centerPoint = { 
        x: position.left + (self.element.width() / 2),
        y: position.top + (self.element.height() / 2)
    };
    // hookup mousemove events so we get notified the mouse has moved
    $('html').mousemove(function(event) {
        if(self.processing) {
            return;
        }
        self.processMouseMove(event);
    });
    self.processMouseMove = function(event) {
        self.processing = true;
        var source = {
            x: event.pageX,
            y: event.pageY
        };
        // work out the angle from where the mouse is to where our text is centered
        var dy = self.centerPoint.y - source.y;
        var dx = self.centerPoint.x - source.x;
        var theta_radians = Math.atan2(dy, dx);

        // depending on how far away the mouse is from the element will make a difference to how far away the shadow is            
        var distance = Math.sqrt(dx * dx + dy * dy);
        var distanceFactor = distance / 20;
        if(distanceFactor > 10) {   // don't let the shadow get too far away
            distanceFactor = 10;
        }
        // what is the adjacent (X)
        var adjacent = Math.cos(theta_radians) * distanceFactor;
        // what is the opposite (Y)
        var opposite = Math.sin(theta_radians) * distanceFactor;

        // update the element
        var setStyle = "text-shadow: "+adjacent+"px "+opposite+"px 2px #404040";
        self.element.attr({
            style: setStyle
        })
        self.processing = false;
    };
};

// wrapper to create as jquery function
$.fn.giveMovingShadow = function() {
    $.each($(this),function( index, value ) {
        new MovingShadow($(this))
    });
    
};