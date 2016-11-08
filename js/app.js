$(function() {
	var allLinks = $('.js-tabs-link'),
		allContents = $('.js-content-item'),
		activeLink = allLinks.filter('.is-active') || allLinks.eq(0),
		activeLinkData = activeLink.data('link');

	console.log(activeLink.get(0), activeLinkData);

	function filterElements(activeLinkClass) {
		
	}

	// allLinks.eq(0).add(allContents.eq(0)).addClass('is-active');

	// allLinks.click(function(e) {
	// 	var that = $(this),
	// 		linkData = that.data('link'),
	// 		content = $('.js-content-item[data-content="' + linkData + '"]');

	// 	e.preventDefault();
	// 	allLinks.add(allContents).removeClass('is-active');
	// 	that.add(content).addClass('is-active');	
	// });
})