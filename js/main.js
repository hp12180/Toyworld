var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });
$(window).load(function() {
	setTimeout(getmainbanners, 100);
});
		
function getmainbanners() {
	$('#busy').show();
	$('#busy').hide();
	$('#mainDet li').remove();
	$('#mainDet').append('<div class="tile"><a href="myaccount.html">Login</a></div><div class="tile"><a href="index.html">Top Ten Toys</a></div><div class="tile"><a href="index.html">Top Ten Categories</a></div><div class="tile"><a href="index.html">Shop by Brand</a></div><div class="tile"><a href="index.html">Shop by Category</a></div><div class="tile"><a href="index.html">Shop by Age</a></div><div class="tile"><a href="index.html">Shop by Price</a></div>	<div class="tile"><a href="index.html">Contact Us</a></div><div class="tile"><a href="index.html">My Account</a></div><div class="tile"><a href="index.html">Shopping Cart</a></div>');	
	setTimeout(function(){
		scroll.refresh();
	});
}