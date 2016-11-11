$(function() {
	let allLinks = $(document).find('.js-tabs-link'); 
	let allContent = $(document).find('.js-content-item');
	const ACTIVE_LINK_FOUND = allLinks.filter('.is-active').length;
	let activeLink = ACTIVE_LINK_FOUND ? allLinks.filter('.is-active') : allLinks.eq(0);
	let linkData = activeLink.data('link');
	let filtered = filterElements(linkData);

	function filterElements(linkData) {
		let link, content;

		link = allLinks.filter('[data-link="' + linkData + '"]');
		content = allContent.filter('[data-content="' + linkData + '"]');

		return {
			link: link,
			content: content
		};
	}

	function initSLider(slider, option) {
		function visibility(slider) {
			slider.on('init', function() {
				setTimeout(function(){
					slider.addClass("is-ready");
				},200);
			});
		}
		visibility(slider);
		slider.not('.slick-initialized').slick(option);
	}

	function showActiveElements(currentLink, currentContent) {
		let currentSlider = currentContent.find('.slider');
		
			allLinks.add(allContent).removeClass('is-active');
			currentLink.add(currentContent).addClass('is-active');
			initSLider(currentSlider, {slidesToShow: 2, slidesToScroll: 1});
	}
	
	showActiveElements(filtered.link, filtered.content);

	allLinks.click(function(e) {
		let that = $(this);
		let linkData = that.data('link');
		let filtered = filterElements(linkData);

		e.preventDefault();
		showActiveElements(filtered.link, filtered.content);
	});

	$(".js-open-popup").click(function() {
		let that = $(this);
		let popupActive = $(".js-popup").has('.is-active');

		if(popupActive) {
			$(".js-popup").addClass('is-active');
		} else {
			$(".js-popup").removeClass('is-active');
		}
	})

	$('.js-close').click(function() {
		$(".js-popup").removeClass('is-active');
	})

	$(document).click(function(e) {
		if ($(".js-popup").is(e.target) ) {
			$(".js-popup").removeClass('is-active');
		}
	});


});