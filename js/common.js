// Input Box Placeholder
function fnremove(arg,val)	{
	if (arg.value == '') {arg.value = val}
}	
function fnshow(arg,val)	{
	if (arg.value == val) {arg.value = ''}
}

$(document).ready(function () {	

	// Sticky Header		
	//$("header .head-inner").sticky({topSpacing:0});	
	//$(".select_box").selectbox(); 	
	//$('.fancybox').fancybox();	
	
	$('.lang-select a.sbSelector').click(function(){ 
		$(this).toggleClass('open');
	});
	
	jsUpdateSize1();
		
});

$(window).load(function(){	
	jsUpdateSize1();	
	jsUpdateSize12();
});

$(window).resize(function(){	
	jsUpdateSize1();
	jsUpdateSize12();
	
});


function jsUpdateSize1()  
{ 
	var width = $(window).width();
	var height = $(window).height();	

	// var hdr_height = $(".head-inner").height();
	// var ftr_height = $(".flex-btns").height();
	// var two_height = hdr_height + ftr_height;
	// var cont_height = height - two_height;

	//alert(cont_height);

	if(width>=1023)
	{
		
		$('.banner-home .flexslider .slides li, .main-img').each(function()
		{ 
			var img = $('img', this).attr('src');
			$(this).css('background-image','url(' + img + ')');	
			$(".banner-home").css('height',height);
			$(this).css('height',height);				
		});

		$(".car-section").css('height',height);
	}
	else{
		$('.banner-home .flexslider .slides li, .main-img').each(function()
		{
			var img = $('img', this).attr('src');
			$(this).css('background-image','url(' + img + ')');			
			$(this).css('height','100%');			
		});			

		$(".car-section").css('height','');
	}

	/* add scroll class */
	if ($(window).width() <= 1023) {
		$(".slider-for").addClass("mbl-slider-scroll");
		$(".eques-content-sec").addClass("eques-content-mbl");
	}
	else{
		$(".slider-for").removeClass("mbl-slider-scroll");
		$(".eques-content-sec").removeClass("eques-content-mbl");
	}

	/* add scroll class */
	if ($(window).width() <= 767) {
		$(".nav-section").removeClass("desk-nav");			
		
		$('.slider-for.slick-slider a.slide-link').on('click', function () {
			setTimeout(function () {
				// $('.slider-dash').slick({
				// 	slidesToShow: 1,
				// 	slidesToScroll: 1,
				// 	arrows: false,
				// 	fade: false,
				// 	draggable: true,
				// 	infinite: false,
				// 	speed: 800,
				// 	asNavFor: '.pop-nav'
				// });

				const slider1 = $(".pop-nav");
				slider1.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					//asNavFor: '.slider-dash',
					dots: false,
					centerMode: true,
					focusOnSelect: true,
					arrows: true,
					draggable: true,
					infinite: false,
					centerPadding: 30,
					speed: 800,     
					mobileFirst: true,  
								   
				});

				slider1.on('wheel', (function (e) {
					e.preventDefault();

					if (e.originalEvent.deltaY < 0) {
						$(this).slick('slickPrev');
					} else {
						$(this).slick('slickNext');
					}
				}));

			}, 1);
			
		});		
		
	}
	else{
		$(".nav-section").addClass("desk-nav");	
		
		$('.slider-for.slick-slider a.slide-link').on('click', function () {
			setTimeout(function () {
				// $('.slider-dash').slick({
				// 	slidesToShow: 1,
				// 	slidesToScroll: 1,
				// 	arrows: false,
				// 	fade: false,
				// 	draggable: true,
				// 	infinite: false,
				// 	speed: 800,
				// 	asNavFor: '.pop-nav'
				// });

				const slider1 = $(".pop-nav");
				slider1.slick({
					slidesToShow: 3,
					slidesToScroll: 1,
					//asNavFor: '.slider-dash',
					dots: false,
					centerMode: true,
					focusOnSelect: true,
					arrows: true,
					draggable: true,
					infinite: false,
					centerPadding: 30,
					speed: 800,     
					mobileFirst: true,  
								   
				});

				slider1.on('wheel', (function (e) {
					e.preventDefault();

					if (e.originalEvent.deltaY < 0) {
						$(this).slick('slickPrev');
					} else {
						$(this).slick('slickNext');
					}
				}));

			}, 1);
			
		});

	}
   
}

function jsUpdateSize12()  
{ 
	var width = $(window).width();
	var height = $(window).height();

	/* landscape popup */
	if ($(window).width() <= 767) {
		applyOrientation();
	}
	// else{
	// 	applyOrientation1();
	// }

	if ( $(window).width() >= 768) {
		applyOrientationTab();		 
	}

	// if ( $(window).width() >= 1025) {		
	// 	$('html').removeClass('portrait');
	// 	$('html').removeClass('landscape'); 
	// }

	}

/* landscape popup function for mobile*/
function applyOrientation() {
	if (window.innerHeight < window.innerWidth) {
		alert("Please view in Portrait Mode");
	} 
}


/* landscape popup function for tablet*/

$(document).load($(window).bind("resize", applyOrientationTab));

$('portrait-block').hide();
function applyOrientationTab() {
	//alert('applyOrientationTab');
	if(window.innerHeight > window.innerWidth){
		$('html').addClass('portrait').removeClass('landscape'); 
		//$('.portrait-block').show();
		alert("USE LANDSCAPE VIEW. Please Rotate your device to get a better view of the configurator");
	} else {
		$('html').removeClass('portrait').addClass('landscape'); 
		//$('.portrait-block').hide();
	}
}



//Hide Loading Box (Preloader)
function handlePreloader() {
	if($('#loader-overlay').length){
		$('#loader-overlay').delay(5000).hide();
		 		
	}
}

$(window).on('load', function() {
	handlePreloader();
});	

/*-------------------------------------------------------------------------------
	preloader js
-------------------------------------------------------------------------------*/
function loader() {
	$(window).on('load', function () {
		$('#ctn-preloader').addClass('loaded');
		if ($('#ctn-preloader').hasClass('loaded')) {
			$('#preloader').delay(5000).hide();
			
		}
	 });
}
loader();


//Mobile Menu Show and Hide
// $(".m-menu").click(function(){ 	
// 	$(this).toggleClass('open');
// 	$(".main-side-menu").toggleClass('open-menu');
// 	$('body').toggleClass('over');
// });
// $(".mn-close").click(function(){ 	
// 	$(".m-menu").removeClass('open');
// 	$(".main-side-menu").removeClass('open-menu');
// 	$('body').removeClass('over');
// });

$(".m-menu").click(function(){ 	
	$(this).toggleClass('open');
	$(".slider-nav").toggleClass('open-menu');	
});

/* price menu script */
$(".price-menu").click(function(){ 	
	$(this).toggleClass('open');
	$(".price-side-menu").toggleClass('open-menu');
	$('body').toggleClass('over-hid');
});

/* popup add class start */
$('.view-port-controls .fancybox, .mob-icons ul li .fancybox').click(function () {
	setTimeout(function () {
		$('#share-pop.popup').parent().parent().parent().addClass('share-close');
		$('#share-pop.popup').parent().parent().parent().parent().parent().addClass('share-overlay');
				
	}, 100);
});


$(".select-cars-parts ul li.door .parts-img .open").hide();
$(".select-cars-parts ul li").click(function(){
	if ($(this).hasClass("door")) {
		if ($(".door").hasClass("open")) {
			$(".door").removeClass("open");
			$(".door").addClass("close");
			
			//var img = $(".select-cars-parts ul li.door.close").attr('src');			
			//$(".select-cars-parts ul li.door .parts-img").css('background-image','url(' + img + ')');
						
			$('.option-sublist ul li.door .open').hide();
			$('.option-sublist ul li.door .close').fadeIn(500);			
		}else{
			$(".door").removeClass("close");
			$(".door").addClass("open");
			
			//var img = $(".select-cars-parts ul li.door.open").attr('src');
			//$(".select-cars-parts ul li.door .parts-img").css('background-image','url(' + img + ')');
			
			$('.option-sublist ul li.door .close').hide();
			$('.option-sublist ul li.door .open').fadeIn(500);
			
		}
   }
});

$('.select-cars-parts ul li.mode .parts-img img.open').hide();
$(".select-cars-parts ul li").click(function(){
	if ($(this).hasClass("mode")) {
		if ($(".mode").hasClass("open")) {
			$(".mode").removeClass("open");
			$(".mode").addClass("close");
			
			// var img = $(".select-cars-parts ul li.mode img.close").attr('src');			
			// $(".select-cars-parts ul li.mode .parts-img").css('background-image','url(' + img + ')');
			
			$('.option-sublist ul li.mode img.close').hide();
			$('.option-sublist ul li.mode img.open').fadeIn(500);
		}else{
			$(".mode").removeClass("close");
			$(".mode").addClass("open");
			
			// var img = $(".select-cars-parts ul li.mode img.open").attr('src');
			// $(".select-cars-parts ul li.mode .parts-img").css('background-image','url(' + img + ')');
			
			$('.option-sublist ul li.mode img.open').hide();
			$('.option-sublist ul li.mode img.close').fadeIn(500);
		}
   }
});





