localStorage['serviceURL'] = "http://toyworld.in/app/services/";
var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var employees;

$(window).load(function() {
	setTimeout(getsubcagoriesList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getsubcagoriesList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getemployees.php?id='+id, function(data) {
		$('#busy').hide();
		$('#subcategoriesList li').remove();
		employees = data.items;
		$.each(employees, function(index, employee) {
			$('#subcategoriesList').append('<li><a href="subcategories.html?id=' + employee.categories_id + '">' +
					'<p class="line1">' + employee.categories_name + '</p>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}