$(function() {
	let allLinks = $(document).find('.js-tabs-link'); 
	let allContent = $(document).find('.js-content-item');
	let linkFilter = allLinks.filter('.is-active');
	let activeLink = linkFilter.length ? linkFilter : allLinks.eq(0);
	let linkData = activeLink.data('link');
	let filtered = filterElements(linkData);
	let btn = $('.js-open-popup');
	let popup = $('.js-popup');

	function filterElements(linkData) {
		let link, content;

		link = allLinks.filter('[data-link="' + linkData + '"]');
		content = allContent.filter('[data-content="' + linkData + '"]');

		return {
			link: link,
			content: content
		};
	}

	function initSlider(slider, option) {
		slider.on('init', function() {
			setTimeout(function(){
				slider.addClass('is-ready');
			},200);
		});
		slider.slick(option);
	}

	function showActiveElements(currentLink, currentContent) {
		let currentSlider = currentContent.find('.slider');
		
			allLinks.add(allContent).removeClass('is-active');
			currentLink.add(currentContent).addClass('is-active');
			initSlider(currentSlider, {slidesToShow: 2});
	}
	
	showActiveElements(filtered.link, filtered.content);

	allLinks.click(function(e) {
		let that = $(this);
		let linkData = that.data('link');
		let filtered = filterElements(linkData);

		e.preventDefault();
		showActiveElements(filtered.link, filtered.content);
	});

	btn.click(function() {
		let that = $(this);
		let slide = that.parents('.slider-slide');
		let _slider = that.parents('.slider');
		let index = +slide.attr('data-slick-index') + 1;


		popup.addClass('is-active');

		$('.window').prepend(
			'<div class="js-slider-popup"></div>'
		);
	})

	$('.js-close').click(function() {
		popup.removeClass('is-active');
	})

	popup.click(function(e) {
		if ($(this).is(e.target) ) {
			popup.removeClass('is-active');
		}
	});


});