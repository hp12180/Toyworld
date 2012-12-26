var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var email = getUrlVars()["email"];
var password = getUrlVars()["password"];

$(window).load(function() {
	setTimeout(loginStat, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').append('Error accessing the server');
});

function loginStat() {
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