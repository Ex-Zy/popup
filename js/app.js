$(function() {
	let allLinks = $(document).find('.js-tabs-link'); 
	let allContent = $(document).find('.js-content-item');
	const ACTIVE_LINK_FOUND = allLinks.filter('.is-active').length;
	let activeLink = ACTIVE_LINK_FOUND ? allLinks.filter('.is-active') : allLinks.eq(0);
	let linkData = activeLink.data('link');
	let filtered = filterElements(linkData);
	let AllSliders = $(document).find(".slider");
	let slider1 = $(document).find(".js-slider-index1");
	let slider2 = $(document).find(".js-slider-index2");
	let popup = $(document).find(".js-popup");


	function filterElements(linkData) {
		let link, content;

		link = allLinks.filter('[data-link="' + linkData + '"]');
		content = allContent.filter('[data-content="' + linkData + '"]');

		return {
			link: link,
			content: content
		};
	}	

	function showActiveElements(currentLink, currentContent) {
		const FIRST_SLIDE = currentContent.index() === 0;
		const SECOND_SLIDE = currentContent.index() === 1;

		allLinks.add(allContent).removeClass('is-active');
		currentLink.add(currentContent).addClass('is-active');
		console.log('Первый слайд - ' + FIRST_SLIDE + ' Второй слайд - ' + SECOND_SLIDE);

		if(FIRST_SLIDE) {
			initSLider(slider1);
		} else if(SECOND_SLIDE) {
			initSLider(slider2);
		} else {
			AllSliders.hide();
		}
	}
	
	showActiveElements(filtered.link, filtered.content);

	allLinks.click(function(e) {
		let that = $(this),
			linkData = that.data('link'),
			filtered = filterElements(linkData);

		e.preventDefault();
		showActiveElements(filtered.link, filtered.content);
	});

    function initSLider(slider) {
		slider.on("init", function(){
	        setTimeout(function(){
	           slider.parent().addClass("is-ready");
	        },200);
	    });

	    slider.not('.slick-initialized').slick({
	    	slidesToShow: 2,
	    	slidesToScroll: 1
	    });
    }

    // function checkActiveSlider(argument) {
    // 	// body...
    // }

    $(".js-open-popup").click(function() {
    	let that = $(this);
    	let popupActive = popup.has('.is-active');
    	let sliderClone = that.parents('.js-content-item').html();

    	if(popupActive) {
    		popup.addClass('is-active');
    		$('.window__col2').html(sliderClone);
    	} else {
    		popup.removeClass('is-active');
    	}
    })

    $('.js-close').click(function() {
    	popup.removeClass('is-active');
    })

    $(document).click(function(e) {
		if (popup.is(e.target) ) {
			popup.removeClass('is-active');
		}
	});


});