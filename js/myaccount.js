var serviceURL = localStorage['serviceURL'];

var id = getUrlVars()["id"];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var userdetails;

$(window).load(function() {
	setTimeout(getuserdet, 10000);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').append('Error accessing the server');
});

function getuserdet() {
	$('#busy').show();
	$.getJSON(serviceURL + 'login.php?id='+id, function(data) {
		$('#busy').hide();
		$('#userDet li').remove();
		userdetails = data.items;
		$.each(userdetails, function(index, userdetail) {
			$('#userDet').append('<li>' + userdetail.customers_firstname + ' ' + userdetail.customers_lastname
					'<p class="line1">' + userdetail.customers_email_address + '</p>');
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