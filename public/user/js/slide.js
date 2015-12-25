require('../../lib/js/jquery.jcarousel.min.js');
$('.jcarousel').jcarousel({
	wrap:'circular'
}).jcarouselAutoscroll({
	interval: 300000
});
$('.jcarousel-control-prev')
	.on('jcarouselcontrol:active', function() {
		$(this).removeClass('inactive');
	})
	.on('jcarouselcontrol:inactive', function() {
		$(this).addClass('inactive');
	})
	.jcarouselControl({
		target: '-=1'
	});
$('.jcarousel-control-next')
	.on('jcarouselcontrol:active', function() {
		$(this).removeClass('inactive');
	})
	.on('jcarouselcontrol:inactive', function() {
		$(this).addClass('inactive');
	})
	.jcarouselControl({
		target: '+=1'
	});