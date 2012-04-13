var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

$(window).load(function() {
	setTimeout(getuserDetails, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').append('Error accessing the server');
});

function getuserDetails() {
	$('#busy').show();
	$.getJSON(serviceURL + 'login.php?id=' + id, function(data) {
		$('#busy').hide();
		$('#userDet li').remove();
		pdetails = data.items;
		$.each(pdetails, function(index, pdetail) {
			$('#userDet').append('<li>' + pdetail.customers_firstname + ' ' + pdetail.customers_lastname + '>' +
					'<br>' + pdetail.customers_email_address + '<br>');
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