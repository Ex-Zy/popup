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
		slider.not('.slick-initialized').slick(option);
	}

	function showActiveElements(currentLink, currentContent) {
		let currentSlider = currentContent.find('.slider');
		
			allLinks.add(allContent).removeClass('is-active');
			currentLink.add(currentContent).addClass('is-active');
			initSlider(currentSlider, {slidesToShow: 2, infinite: false});
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
		let _slider = that.parents('.slider');
		let content = _slider.find('.modal-content');
		let slide = that.parents('.slider-slide');
		let index = +slide.attr('data-slick-index');
		let innerPopup = $('.js-inner-popup');
		let sliderPopup = $('<div></div>');
		let counter = $('.counter');


		popup.addClass('is-active');
		sliderPopup.attr('class', 'js-slider-popup');
		innerPopup.prepend(sliderPopup);
		sliderPopup.html(content.clone());

		content.each(function(index) {
			let imgData = _slider.find('.slider-slide__pic').eq(index).data('picture');
			let picture;

			picture = $('<div>').attr({
				class: 'modal-content__pic',
				style: 'background-image: url("'+ imgData + '")'
			});
			sliderPopup.find('.modal-content').eq(index).append(picture);
		})

		initSlider(sliderPopup, {slidesToShow: 1, initialSlide: index, infinite: false});

		counter.find('.counter__all').text(_slider.find('.slick-slide').length);
		counter.find('.counter__current').text(index+1);
		sliderPopup.on('beforeChange', function(e, slick, current, next) {
			counter.find('.counter__current').text(next + 1);
		});
	})

	$('.js-close').click(function() {
		popup.removeClass('is-active');
		$('.js-slider-popup').remove();
	})

	popup.click(function(e) {
		if ($(this).is(e.target) ) {
			popup.removeClass('is-active');
			$('.js-slider-popup').remove();
		}
	});


});