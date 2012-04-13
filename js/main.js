var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });
$(window).load(function() {
	setTimeout(getbanners, 100);
});

function getbanners() {
	$('#busy').show();
	$('#busy').hide();
		setTimeout(function(){
			scroll.refresh();
		});
}