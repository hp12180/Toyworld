localStorage['serviceURL'] = "http://toyworld.in/app/services/";
var serviceURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var employees;

$(window).load(function() {
	setTimeout(getcatList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getcatList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getsubcats.php', function(data) {
		$('#busy').hide();
		$('#catList li').remove();
		employees = data.items;
		$.each(employees, function(index, employee) {
			$('#catList').append('<li><a href="subcategories.html?id=' + employee.categories_id + '">' +
					'<p class="line1">' + employee.categories_name + '</p>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}