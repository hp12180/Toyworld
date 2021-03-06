var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

$(window).load(function() {
	setTimeout(getprodDetails, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').append('Error accessing the server');
});

function getprodDetails() {
	$('#busy').show();
	$.getJSON(serviceURL + 'getproddetails.php?id=' + id, function(data) {
		$('#busy').hide();
		$('#productDetails li').remove();
		$('#productName li').remove();
		pdetails = data.items;
		$.each(pdetails, function(index, pdetail) {
			picons = '';
			if (pdetail.products_ordered > 0)
			{
			picons = picons + '<img src="img/icons/icon_hot.gif">';
			}
			if (pdetail.specials_new_products_price > 0)
			{
			picons = picons + '<img src="img/icons/icon_bargain.gif">';
			}
			if (pdetail.products_quantity < 1)
			{
			picons = picons + '<img src="img/icons/icon_stop.gif">';
			}
			var t = pdetail.products_date_added.split(/[- :]/);
			var pdateadd = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
			today=new Date();
			var one_day=1000*60*60*24;
			dayscount = Math.ceil((today.getTime()-pdateadd.getTime())/(one_day));
			if (dayscount < 30)
			{
			picons = picons + '<img src="img/icons/icon_new.gif">';
			}
			$('#productDetails').append('<li><img src="http://toyworld.in/catalog/images/' + pdetail.products_image + '" width="100%">' +
					'<br>' + pdetail.products_description + '<br><br><img src="img/ages/a' + pdetail.products_minage + '.gif"><img src="img/ages/b' + pdetail.products_maxage + '.gif">' + picons + '<br><b>Price Rs.' + pdetail.total_price + '</b><br><br>');
			$('#productName').append('<h2>' + pdetail.products_name + '</h2>');
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