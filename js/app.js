$(function() {
	var allLinks = $(document).find('.js-tabs-link'), 
		allContent = $(document).find('.js-content-item'), 
		activeLink = allLinks.filter('.is-active').length ? allLinks.filter('.is-active') : allLinks.eq(0),
		linkData = activeLink.data('link'),
		filtered = filterElements(linkData);

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
	});

})