localStorage['serviceURL'] = "http://toyworld.in/app/services/";
var serviceURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var catlists;

$(window).load(function() {
	setTimeout(getcatList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').append('Error accessing the server');
});

function getcatList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getsubcats.php', function(data) {
		$('#busy').hide();
		$('#catList li').remove();
		catlists = data.items;
		$.each(catlists, function(index, catlist) {
			$('#catList').append('<li><a href="subcategories.html?id=' + catlist.categories_id + '">' +
					'<p class="line1">' + catlist.categories_name + '</p>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}