"use strict";

$(function () {
	var $slides = undefined,
		interval = undefined,
		$selectors = undefined,
		$btns = undefined,
		currentIndex = undefined,
		nextIndex = undefined;

	var cycle = function cycle(index) {
		var $currentSlide = undefined,
			$nextSlide = undefined,
			$currentSelector = undefined,
			$nextSelector = undefined;

		nextIndex = index !== undefined ? index : nextIndex;

		$currentSlide = $($slides.get(currentIndex));
		$currentSelector = $($selectors.get(currentIndex));

		$nextSlide = $($slides.get(nextIndex));
		$nextSelector = $($selectors.get(nextIndex));

		$currentSlide.removeClass("active").css("z-index", "0");

		$nextSlide.addClass("active").css("z-index", "1");

		$currentSelector.removeClass("current");
		$nextSelector.addClass("current");

		currentIndex = index !== undefined ? nextIndex : currentIndex < $slides.length - 1 ? currentIndex + 1 : 0;

		nextIndex = currentIndex + 1 < $slides.length ? currentIndex + 1 : 0;
	};

	
	currentIndex = 0;
	nextIndex = 1;
    
    var $slider = $(".js-slider");

    $slider.each(function (el, i) {
    	var element = $(el);
    	$slides = $slider.find(".slide");
	        $selectors = $slider.find(".selector");
			$btns = $slider.find(".btn");

			$slides.first().addClass("active");
			$selectors.first().addClass("current");

			interval = window.setInterval(cycle, 6000);

			$selectors.on("click", function (e) {
				var target = $selectors.index(e.target);
				if (target !== currentIndex) {
					window.clearInterval(interval);
					cycle(target);
					interval = window.setInterval(cycle, 6000);
				}
		});

		$btns.on("click", function (e) {
			window.clearInterval(interval);
			if ($(e.target).hasClass("prev")) {
				var target = currentIndex > 0 ? currentIndex - 1 : $slides.length - 1;
				cycle(target);
			} else if ($(e.target).hasClass("next")) {
				cycle();
			}
			interval = window.setInterval(cycle, 4500);
		});
    });


});