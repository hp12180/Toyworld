var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

var prodid;
$(window).load(function() {
	setTimeout(getprodDetails, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getprodDetails() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getproddetails.php?id=' + id, function(data) {
		$('#busy').hide();
		$('#productDetails li').remove();
		pdetails = data.items;
		$.each(pdetails, function(index, pdetail) {
			$('#productDetails').append('<li><img src="http://toyworld.in/catalog/images/' + pdetail.products_image + '" width="100%">' +
					'<p class="line1">' + pdetail.products_name + '</p><br>' + pdetail.products_description + '<br><br>Ages:' + pdetail.products_minage + ' ' + pdetail.products_maxage + '<br><b>Price Rs.' + pdetail.products_price + '</b><br><br>');
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