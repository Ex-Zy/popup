$(function() {

	let MYAPP = {
		filterElements: function (linkData) {
			link = allLinks.filter('[data-link="' + linkData + '"]');
			content = allContent.filter('[data-content="' + linkData + '"]');

			return {
				link: link,
				content: content
			};
		},
		initSlider: function (slider, option) {
			slider.on('init', function() {
				setTimeout(function(){
					slider.addClass('is-ready');
				},200);
			});
			slider.not('.slick-initialized').slick(option);
		},
		showActiveElements: function (currentLink, currentContent) {
			let currentSlider = currentContent.find('.slider');

				allLinks.add(allContent).removeClass('is-active');
				currentLink.add(currentContent).addClass('is-active');
				MYAPP.initSlider(currentSlider, {slidesToShow: 2, infinite: false});
		},
		destroyPopup: function (popup, popupSlider) {
			popup.removeClass('is-active');
			popupSlider.remove();
		}
	}
	let allLinks = $('.js-tabs-link');
	let allContent = $('.js-content-item');
	let linkFilter = allLinks.filter('.is-active');
	let activeLink = linkFilter.length ? linkFilter : allLinks.eq(0);
	let linkData = activeLink.attr('data-link');
	let filtered = MYAPP.filterElements(linkData);
	let btn = $('.js-open-popup');
	let popup = $('.js-popup');
	let close = $('.js-close');

	MYAPP.showActiveElements(filtered.link, filtered.content);

	allLinks.click(function(e) {
		let that = $(this);
		let linkData = that.attr('data-link');
		let filtered = MYAPP.filterElements(linkData);

		e.preventDefault();
		MYAPP.showActiveElements(filtered.link, filtered.content);
	});

	btn.click(function() {
		let that = $(this);
		let _slider = that.parents('.slider');
		let content = _slider.find('.modal-content');
		let slide = that.parents('.slider-slide');
		let index = +slide.attr('data-slick-index');
		let innerPopup = $('.js-inner-popup');
		let sliderPopup = $('<div class="js-slider-popup"></div>');
		let counter = $('.counter');
		let counterSlides = counter.find('.counter__all');
		let counterCurrent = counter.find('.counter__current');


		innerPopup.prepend(
			sliderPopup.prepend(content.clone())
		);

		content.each(function(index) {
			let imgData = _slider.find('.slider-slide__pic').eq(index).attr('data-picture');
			let picture = $('<div>').attr({
				class: 'modal-content__pic',
				style: 'background-image: url("'+ imgData + '")'
			});
			sliderPopup.find('.modal-content').eq(index).append(picture);
		});

		popup.addClass('is-active');
		MYAPP.initSlider(sliderPopup, {slidesToShow: 1, initialSlide: index, infinite: false});
		counterSlides.text(_slider.find('.slick-slide').length);
		counterCurrent.text(index+1);
		sliderPopup.on('beforeChange', function(e, slick, current, next) {
			counter.find('.counter__current').text(next + 1);
		});
	});

	close.click(function() {
		MYAPP.destroyPopup(popup, $('.js-slider-popup'));
	});

	popup.click(function(e) {
		if ($(this).is(e.target) ) {
			MYAPP.destroyPopup(popup, $('.js-slider-popup'));
		}
	});
});
