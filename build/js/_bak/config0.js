$(document).ready(function() {
	$('#caffix').affix({
    offset: {
      top: 55
    , bottom: function () {
        return (this.bottom = $('footer').outerHeight(true))
      }
    }
  })
		
    $('.dropdown-menu input, .dropdown-menu label').click(function(e) {
        e.stopPropagation();
    });
		
/*	
$(function(){
    var lastScrollTop = 0, delta = 10;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       
       if(Math.abs(lastScrollTop - st) <= delta)
          return;
       
       if (st > lastScrollTop){
          // downscroll code
		  $('.topline').stop().animate({marginTop: "-65px"}, 100, "linear" );
          //console.log('scroll down');
       } else {
          // upscroll code
		  $('.topline').stop().animate({marginTop: "0px"}, 100, "linear" );
          //console.log('scroll up');
       }
       lastScrollTop = st;
    });
});
*/
	
	$('#bxslider').bxSlider({
		speed: 500,
		pause: 6000,
		autoHover: false,
		adaptiveHeight: true,
		auto: true,
		controls : false,
		pagerCustom: '#bx-pager'
	});

	//$('.fancybox').fancybox();	
	$('.tip').tooltip();
	
// mps_inner coint for scroll-pane
	var width = 0;
	$('a.mpage').each(function() {
		width += $(this).outerWidth( true );
	});
	$('div.mps_inner').css('width', width + 1);
	
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
	$('.scroll-pane-a').jScrollPane({
		showArrows: true,
		horizontalGutter: 0,
		verticalGutter: 0,
		verticalDragMinHeight: 80,
		verticalDragMaxHeight: 80,
		horizontalDragMinWidth: 180,
		horizontalDragMaxWidth: 180
	});
	
	$(window).resize(function(){
		$.each( $('.scroll-pane'), function(){
				var api = $(this).data('jsp');
				api.reinitialise();
		});
		$.each( $('.scroll-pane-a'), function(){
				var api = $(this).data('jsp');
				api.reinitialise();
		});
	});
	
	
	$('a.seacher_close').click(function() {
		$(".searchinmanualblock").slideUp();
		$('.searchinmanual').removeClass("active");
	});
	
	$('#typehead').typeahead({
		source: [{ id: 1, name: 'Toronto' }, { id: 2, name: 'Montreal' }, { id: 3, name: 'New York' }, { id: 4, name: 'qwertyuiopasdfghjklzxcvbnm' }]
	});
	
});


