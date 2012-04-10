var id = 'hp12180@yahoo.com';
var pwd = 'getright1';
var serviceURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var userdetails;
var userdetails1;

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
		userdetails = data.login_status;
		userdetails1 = data.login_message;
			$('#userDet').append('<li>' + userdetails +
					'<p class="line1">' + userdetails1 + '</p>');
		setTimeout(function(){
			scroll.refresh();
		});
	});
}
