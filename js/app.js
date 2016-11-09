$(function() {
	var allLinks = $(document).find('.js-tabs-link'), 
		allContent = $(document).find('.js-content-item'), 
		activeLink = allLinks.filter('.is-active').length ? allLinks.filter('.is-active') : allLinks.eq(0),
		linkData = activeLink.data('link'),
		filtered = filterElements(linkData),
		slider1 = $(document).find(".js-slider-index1"),
		slider2 = $(document).find(".js-slider-index2");

	function filterElements(linkData) {
		var link, content;

		link = allLinks.filter('[data-link="' + linkData + '"]');
		content = allContent.filter('[data-content="' + linkData + '"]');

		return {
			link: link,
			content: content
		};
	}	

	function addClassElement(currentLink, currentContent) {
		allLinks.add(allContent).removeClass('is-active');
		currentLink.add(currentContent).addClass('is-active');
	}
	
	addClassElement(filtered.link, filtered.content);	

	allLinks.click(function(e) {
		var that = $(this),
			linkData = that.data('link'),
			filtered = filterElements(linkData);

		e.preventDefault();
		addClassElement(filtered.link, filtered.content);
		slider1.slick('reinit');
		slider2.slick('reinit');
	});

    function initSLider(slider) {
		slider.on("init", function(){
	        setTimeout(function(){
	           slider.addClass("is-ready");
	        },200);
	    });

	    slider.not('.slick-initialized').slick({
	    	slidesToShow: 2,
	    	slidesToScroll: 1
	    });
    }

    initSLider(slider1);
    initSLider(slider2);

});