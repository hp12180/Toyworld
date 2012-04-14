var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });
$(window).load(function() {
	setTimeout(getmainbanners, 100);
});
			
			
function getmainbanners() {
	$('#busy').show();
	$('#busy').hide();
		setTimeout(function(){
			scroll.refresh();
		});
}