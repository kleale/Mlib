$(document).ready(function() {
	
	$('#caffix').affix({
		offset: {
			top: 65, 
			bottom: function () {
				return (this.bottom = $('.footer').outerHeight(true))
		  }
		}
	});		

	$('.dropdown-menu input, .dropdown-menu label').click(function(e) {
        e.stopPropagation();
    });

	if($('#bxslider').length)
            {
	$('#bxslider').bxSlider({
		speed: 500,
		pause: 6000,
		autoHover: false,
		adaptiveHeight: true,
		auto: true,
		controls : false,
		pagerCustom: '#bx-pager'
	});
            }
	//$('.fancybox').fancybox();	
	$('.tip').tooltip();
	
	// mps_inner coint for scroll-pane
	var width = 0;
	$('a.mpage').each(function() {
		width += $(this).outerWidth( true );
	});
	$('div.mps_inner').css('width', width + 1);
	if($(".scroll-pane").length)
            {
	$('.scroll-pane').jScrollPane({
		showArrows: false,
		//animateScroll: true,
		//animateSteps: true,
		//animateDuration: 50,
		horizontalGutter: 0,
		verticalGutter: 0,
		//mouseWheelSpeed: 200,
		verticalDragMinHeight: 80,
		verticalDragMaxHeight: 80,
		horizontalDragMinWidth: 180,
		horizontalDragMaxWidth: 180
	});
            }

	$(window).resize(function(){
		$.each( $('.scroll-pane'), function(){
				var api = $(this).data('jsp');
				api.reinitialise();
		});
	});
	
	
	$(".searchinmanualblock").delegate('a.seacher_close',"click",function() {
		$(".searchinmanualblock").slideUp();
		$('.searchinmanual').removeClass("active");
	});
        
});

$.post("/ajax/geoip-counter?"+(Math.floor(Math.random() * (99)) +1));



