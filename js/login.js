var id = 'hp12180@yahoo.com';
var pwd = 'getright1';
var serviceURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var userdetails;

$(window).load(function() {
	setTimeout(getcatList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').append('Error accessing the server');
});

function getcatList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'login.php?id='+id+'&pwd='+pwd, function(data) {
		$('#busy').hide();
		$('#userDet li').remove();
		userdetails = data.items;
		$.each(userdetails, function(index, userdetail) {
			$('#userDet').append('<li>' + userdetail.customer_firstname + ' ' + userdetail.customer_lastname
					'<p class="line1">' + catlist.customers_email_address + '</p>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}
