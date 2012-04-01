localStorage['serviceURL'] = "http://toyworld.in/app/services/";
var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var subcats;

$(window).load(function() {
	setTimeout(getsubcagoriesList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getsubcagoriesList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getemployees.php', function(data) {
		$('#busy').hide();
		$('#subcategoriesList li').remove();
		subcats = data.items;
		$.each(subcats, function(index, subcat) {
			$('#subcategoriesList').append('<li><a href="subcategories.html?id=' + subcat.categories_id + '">' +
					'<p class="line1">' + subcat.categories_name + 'hp</p>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}