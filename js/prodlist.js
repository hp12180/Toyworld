var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var prodlist;

$(window).load(function() {
	setTimeout(getprodList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getsubcagoriesList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getprodlist.php?id=' + id, function(data) {
		$('#busy').hide();
		$('#productsList li').remove();
		subcats = data.items;
		$.each(subcats, function(index, subcat) {
			$('#productsList').append('<li><a href="product.html?id=' + subcat.products_id + '">' +
					'<p class="line1">' + subcat.products_name + '</p>');
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