(function($){
	$.fn.swipeToDelete = function(options) {
		var ele = this;

		var config = $.extend({
			multipleDelete: false,
			swipeOffset: -80,
			threshold: 50
		}, options);

		var swipedLeft = false;
		var swipedItem = "";
		var currentDirection = "";

		function resetSwipeLeft() {
			swipedItem.css("margin-left", config.swipeOffset);
			swipedLeft = true;
		}

		function resetSwipeRight() {
			swipedItem.css("margin-left", 0);
			swipedLeft = false;
		}

		ele.swipe({
			swipeStatus: function(event, phase, direction, distance, duration, fingerCount) {
				console.log(direction + ", " + distance);
				if(phase === "start") {
					if(!config.multipleDelete && swipedLeft && !swipedItem.is($(this))) {
						resetSwipeRight();
					}
					swipedItem = $(this);
					console.log("current Direction: " + currentDirection);
				} else if(phase === "move") {
					console.log(direction, distance);
					if(!swipedLeft && direction === "left") {
						currentDirection = direction;
						$(this).css("margin-left", -distance);
					} else if (swipedLeft && direction === "right") {
						currentDirection = direction;
						$(this).css("margin-left", config.swipeOffset + distance);
					} else {
						// Phase is up or down
					}
				} else if (phase === "cancel" || phase === "end"){
					// jquery.touchSwipe lib sets direction to null or none if the action is cancelled before trigerring swipe  
					// or if its similar to tap or touch event
					
					if(currentDirection === "left") {
						(distance >= Math.abs(config.threshold)) ? resetSwipeLeft() : resetSwipeRight();
					} else if(currentDirection === "right") {
						(distance >= Math.abs(config.threshold)) ? resetSwipeRight() : resetSwipeLeft();
					}
				}
			},

			allowPageScroll: "auto",
        
			triggerOnTouchLeave:true,	// End event when moved out of event bound element (this object)
			triggerOnTouchEnd: false,	// End event when threshold is reached
        	threshold: config.threshold
		});
	}
}(jQuery));