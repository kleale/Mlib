$(document).ready(function() {
	
//  taggle pages viewer at mobile at manuals
	$('.manothertoggle').click(function(e) {
		$('.manothertoggle .fa').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
	});
        
        
        //toggle text page viewer
        $(".pages_toggle").click(function(){
            $(".pages_toggle").text($(".pages_toggle").text()=="Hide thumbs" ? "Show thumbs" : "Hide thumbs");
            $.post("/ajax/action/togglepv/");
        })
/*
slider = $('.bxslider').bxSlider();
slider.reloadSlider();
*/

//  slider for pageviewer at manuals
/*
	if($('.items').length){
		slider = $('.items').bxSlider({
			infiniteLoop: false,
			minSlides: 2,
			maxSlides: 10,
			slideWidth: 80,
			slideMargin: 11,
			easing: 'ease-out',
			responsive: true,
			speed: 500,
			pause: 6000,
			autoHover: false,
			auto: false,
			nextSelector: '.next',
			prevSelector: '.prev',
			nextText: '',
			prevText: '',
			hideControlOnEnd: true
			//controls : false,
			//pagerCustom: '#bx-pager'
		});
    }
	$('.pages_toggle').click(function(e) {
		$('.manualpages').toggle();
		slider.reloadSlider();
	});
*/

//  2 owlslider for pageviewer at manuals
if($(".items").length){
  var owl = $(".items");
  owl.owlCarousel({
    items: 10,
    lazyLoad: true,
	itemsDesktop: [1000,10], //5 items between 1000px and 901px
    itemsDesktopSmall : [900,8], // betweem 900px and 601px
    itemsTablet: [600,6], //2 items between 600 and 0
	itemsMobile: [479,3],
	scrollPerPage: true,
    navigation: false,
   pagination:false,
   afterInit: function()
   {
       $(".owl-loading").removeClass("owl-loading");
   }
  });
  /*
  if((current_page-scrollable_offset)>5)
      owl.data('owlCarousel').jumpTo((current_page-scrollable_offset)-3);
  else
     owl.data('owlCarousel').jumpTo((current_page-scrollable_offset)-1); 
    }
  */
  $(".next").click(function(){
    owl.trigger('owl.next');
  });
  $(".prev").click(function(){
    owl.trigger('owl.prev');
  });
  $('.pages_toggle').click(function(e) {
	$('.manualpages').toggle();
  });
}

	
//  controlpanel fixed script 
	if($('.controlpanel').length){
		var header = document.querySelector('.controlpanel');
		var origOffsetY = header.offsetTop;
		function onScroll(e) {
		  window.scrollY >= origOffsetY ? header.classList.add('affix') :
			header.classList.remove('affix');
		}
		document.addEventListener('scroll', onScroll);
	}
	
//	??
	$('.dropdown-menu input, .dropdown-menu label').click(function(e) {
		e.stopPropagation();
	});

//  slider testimonials at home	
	if($('#bxslider').length){
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
			
//  bootstrap tips on hover	
	$('.tip').tooltip();
	
//  mps_inner coint for scroll-pane
	var width = 0;
	$('a.mpage').each(function() {
		width += $(this).outerWidth( true );
	});
	$('div.mps_inner').css('width', width + 1);
	if($(".scroll-pane").length){
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

//  reinitialise all scroll-pane.js divs on window reize
	$(window).resize(function(){
		$.each( $('.scroll-pane'), function(){
				var api = $(this).data('jsp');
				api.reinitialise();
		});
	});
	
//  open searcb float div in manual
	$(".searchinmanualblock").delegate('a.seacher_close',"click",function() {
		$(".searchinmanualblock").slideUp();
		$('.searchinmanual').removeClass("active");
	});
	
//  aftocomplete in search form example
//	$('#typehead').typeahead({
//		source: [{ id: 1, name: 'Toronto' }, { id: 2, name: 'Montreal' }, { id: 3, name: 'New York' }, { id: 4, name: 'qwertyuiopasdfghjklzxcvbnm' }]
//	});

// scale pdf on css3
		var maxWidth  = $('div.pdf').width();
		var maxHeight = $('div.pdf').height();

		var windowWidth = $(window).width();
		//var windowHeight = $(window).height();

		$(function() {
			var $window = $(window);
			var width = $window.width();
			//var height = $window.height();
			var scale;
			// early exit
			if(width >= maxWidth ) {
				$('div.pdf').css({'transform': ''});
				$('div.pdf').css({'-ms-transform': ''});
				$('div.pdf').css({'-webkit-transform': ''});
				$('div.pdf').css({'-o-transform': ''});
				$('.page-doc').css({ width: '', height: '' });
				return;
			}
			
			scale = Math.min(width/maxWidth);
			//var rscale = scale.toFixed(2);
			//scale = Math.min(width/windowWidth, height/windowHeight);
			$('div.pdf').css({'transform': 'scale(' + scale + ')'});
			$('div.pdf').css({'-ms-transform': 'scale(' + scale + ')'});
			$('div.pdf').css({'-webkit-transform': 'scale(' + scale + ')'});
			$('div.pdf').css({'-o-transform': 'scale(' + scale + ')'});
			
			$('div.page-doc').css({ width: maxWidth * scale, height: maxHeight * scale });
		});
		
		$(window).resize(function(evt) {
			var $window = $(window);
			var width = $window.width();
			//var height = $window.height();
			var scale;

			// early exit
			if(width >= maxWidth ) {
				$('div.pdf').css({'transform': ''});
				$('div.pdf').css({'-ms-transform': ''});
				$('div.pdf').css({'-webkit-transform': ''});
				$('div.pdf').css({'-o-transform': ''});
				$('.page-doc').css({ width: '', height: '' });
				return;
			}
			
			scale = Math.min(width/maxWidth);
			//scale = Math.min(width/windowWidth, height/windowHeight);
			
			$('div.pdf').css({'transform': 'scale(' + scale + ')'});
			$('div.pdf').css({'-ms-transform': 'scale(' + scale + ')'});
			$('div.pdf').css({'-webkit-transform': 'scale(' + scale + ')'});
			$('div.pdf').css({'-o-transform': 'scale(' + scale + ')'});
			
			$('div.page-doc').css({ width: maxWidth * scale, height: maxHeight * scale });
		});
// end scale pdf on css3

});

// GEO
//$.post("/ajax/geoip-counter?"+(Math.floor(Math.random() * (99)) +1));


