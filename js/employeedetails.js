var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

$(window).load(function() {
	setTimeout(getEmployee, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getEmployee() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getemployee.php?id='+id, function(data) {
		$('#busy').hide();
		var employee = data.item;
		console.log(employee);
		$('#employeePic').attr('src', 'pics/' + employee.picture);
		$('#fullName').text(employee.firstName + ' ' + employee.lastName);
		$('#employeeTitle').text(employee.title);
		$('#city').text(employee.city);
		console.log(employee.officePhone);
		if (employee.managerId>0) {
			$('#actionList').append('<li><a href="employeedetails.html?id=' + employee.managerId + '"><p class="line1">View Manager</p>' +
					'<p class="line2">' + employee.managerFirstName + ' ' + employee.managerLastName + '</p></a></li>');
		}
		if (employee.reportCount>0) {
			$('#actionList').append('<li><a href="reportlist.html?id=' + employee.id + '"><p class="line1">View Direct Reports</p>' +
					'<p class="line2">' + employee.reportCount + '</p></a></li>');
		}
		if (employee.email) {
			$('#actionList').append('<li><a href="mailto:' + employee.email + '"><p class="line1">Email</p>' +
					'<p class="line2">' + employee.email + '</p><img src="img/mail.png" class="action-icon"/></a></li>');
		}
		if (employee.officePhone) {
			$('#actionList').append('<li><a href="tel:' + employee.officePhone + '"><p class="line1">Call Office</p>' +
					'<p class="line2">' + employee.officePhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
		}
		if (employee.cellPhone) {
			$('#actionList').append('<li><a href="tel:' + employee.cellPhone + '"><p class="line1">Call Cell</p>' +
					'<p class="line2">' + employee.cellPhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
			$('#actionList').append('<li><a href="sms:' + employee.cellPhone + '"><p class="line1">SMS</p>' +
					'<p class="line2">' + employee.cellPhone + '</p><img src="img/sms.png" class="action-icon"/></a></li>');
		}
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
