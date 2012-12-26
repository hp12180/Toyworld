var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var email = 'hp12180@yahoo.com';
var password = 'getright';

$(document).ajaxError(function(event, request, settings) {
	$('#busy').append('Error accessing the server');
});

$('form').submit(function(){
	$('#busy').show();
	$.getJSON(serviceURL + 'login.php?email=' + email + '&password=' + password, function(data) {
		$('#busy').hide();
		logindata = data.items;
		$.each(logindata, function(index, login_status) {
		if (login_status.customers_id > 0)
			{
			$('#loginstatus').append('<li>Welcome ' + login_status.customers_lastname + ', ' + login_status.customers_firstname + '.<br>Please <a href="main.html">click here</a> to continue');
			}
		else 
			{
			$('#loginstatus').append('<li>There is no user with these credentials in our systems. Please <a href="register.html">click here</a> to register');
			}
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}
