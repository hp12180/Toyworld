var serviceURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

$(window).load(function() {
	setTimeout(getbrandList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').append('Error accessing the server');
});

function getbrandList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getbrandlist.php', function(data) {
		$('#busy').hide();
		$('#brandList li').remove();
		brands = data.items;
		$.each(brands, function(index, brand) {
			$('#brandList').append('<li><a href="branddet.html?id=' + brand.manufacturers_id + '">' +
					'<img src="http://toyworld.in/catalog/images/' + brand.manufacturers_image + '" width="100">' + brand.manufacturers_name + ' (' +brand.tot_prods + ')</li>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}