var loginURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var logindet;
var id = 'hp12180@yahoo.com';
var pwd = 'getright1';
$(window).load(function() {
	setTimeout(getLogin, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').append('Error accessing the server');
});

function getLogin() {
	$('#busy').show();
	$.getJSON(loginURL + 'login.php?id=' + id + '&pwd=' + pwd, function(data) {
		$('#busy').hide();
		$('#userDet li').remove();
		logindet = data.items;
		$('#userDet').append('<li>' +
					'<p class="line1">' + logindetail + '</p>');
		setTimeout(function(){
			scroll.refresh();
		});
	});
}
