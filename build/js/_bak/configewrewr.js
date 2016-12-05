$(document).ready(function() {
	
	/*
	var lastScrollTop = 0;
	$(window).scroll(function(event){
	   var st = $(this).scrollTop();
	   if (st > lastScrollTop){
		  //alert('Scroll down');
		 $('.topline').animate({top: "-60px"}, 500 ).stop();
	   } else {
		 $('.topline').animate({top: "0px"}, 500 ).stop();
	   }
	   lastScrollTop = st;
	});
	*/

//ScrollMenu
	
$(function(){
    var lastScrollTop = 0, delta = 5;
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
	
//SLIDER Quotes	
	$('#bxslider ul').bxSlider({
		adaptiveHeight: true
	});

//TIPS
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

	
// Search Suggest
	$('#typehead').typeahead({
		source: [{ id: 1, name: 'Toronto' }, { id: 2, name: 'Montreal' }, { id: 3, name: 'New York' }, { id: 4, name: 'Acer' }]
	});
	
});


