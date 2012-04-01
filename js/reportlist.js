var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });
var id = getUrlVars()["id"];

$(window).load(function() {
	setTimeout(getReportList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getReportList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getreports.php?id='+id, function (data) {
		$('#busy').hide();
		var reports = data.items;
		$.each(reports, function(index, employee) {
			$('#reportList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
					'<img src="pics/' + employee.picture + '" class="list-icon"/>' +
					'<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
					'<p class="line2">' + employee.title + '</p>' +
					'<span class="bubble">' + employee.reportCount + '</span></a></li>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

