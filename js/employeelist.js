localStorage['serviceURL'] = "http://toyworld.in/app/services/";
var serviceURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var employees;

$(window).load(function() {
	setTimeout(getEmployeeList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getEmployeeList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getemployees.php', function(data) {
		$('#busy').hide();
		$('#employeeList li').remove();
		employees = data.items;
		$.each(employees, function(index, employee) {
			$('#employeeList').append('<li><a href="subcategories.html?id=' + employee.categories_id + '">' +
					'<p class="line1">' + employee.categories_name + '</p>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}