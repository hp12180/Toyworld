var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

$(window).load(function() {
	setTimeout(getsubcagoriesList, 100);
	setTimeout(getprodList, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').append('Error accessing the server');
});

function getsubcagoriesList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getsubcats.php?id=' + id, function(data) {
		$('#busy').hide();
		$('#subcategoriesList li').remove();
		subcats = data.items;
		$.each(subcats, function(index, subcat) {
			$('#subcategoriesList').append('<div class="tile"><a href="subcategories.html?id=' + subcat.categories_id + '">' +
					subcat.categories_name + '</a></div>');
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}

function getprodList() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getprodlist.php?id=' + id, function(data) {
		$('#busy').hide();
		prodlist = data.items;
		$.each(prodlist, function(index, prods) {
			$('#subcategoriesList').append('<li><a href="product.html?id=' + prods.products_id + '">' +
					'<table><tr><td><img src="http://toyworld.in/catalog/images/'+ prods.products_image +'" width="100"></td><td>' + prods.products_name + ' - Rs.' + prods.total_price + '</td></tr></table></a></li>');
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