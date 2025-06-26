(function ($) {

	"use strict";


	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if ($('.preloader').length) {
			$('.preloader').delay(200).fadeOut(500);
		}
	}


	//Update Header Style and Scroll to Top
	function headerStyle() {
		if ($('.main-header').length) {
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');

			var HeaderHight = $('.main-header').height();
			if (windowpos >= HeaderHight) {
				siteHeader.addClass('fixed-header');
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.fadeOut(300);
			}

		}
	}

	headerStyle();


	//Submenu Dropdown Toggle
	if ($('.main-header li.dropdown ul').length) {
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function () {
			$(this).prev('ul').slideToggle(500);
		});

		//Disable dropdown parent link
		$('.navigation li.dropdown > a').on('click', function (e) {
			e.preventDefault();
		});

		//Disable dropdown parent link
		$('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function (e) {
			e.preventDefault();
		});

		$('.xs-sidebar-group .close-button').on('click', function (e) {
			$('.xs-sidebar-group.info-group').removeClass('isActive');
		});

		$('.about-widget').on('click', function (e) {
			$('.about-sidebar').addClass('active');
		});

		$('.about-sidebar .close-button').on('click', function (e) {
			$('.about-sidebar').removeClass('active');
		});

		$('.about-sidebar .gradient-layer').on('click', function (e) {
			$('.about-sidebar').removeClass('active');
		});

	}


	//Mobile Nav Hide Show
	if ($('.mobile-menu').length) {

		//$('.mobile-menu .menu-box').mCustomScrollbar();

		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);

		//Hide / Show Submenu
		$('.mobile-menu .navigation > li.dropdown > .dropdown-btn').on('click', function (e) {
			e.preventDefault();
			var target = $(this).parent('li').children('ul');

			if ($(target).is(':visible')) {
				$(this).parent('li').removeClass('open');
				$(target).slideUp(500);
				$(this).parents('.navigation').children('li.dropdown').removeClass('open');
				$(this).parents('.navigation').children('li.dropdown > ul').slideUp(500);
				return false;
			} else {
				$(this).parents('.navigation').children('li.dropdown').removeClass('open');
				$(this).parents('.navigation').children('li.dropdown').children('ul').slideUp(500);
				$(this).parent('li').toggleClass('open');
				$(this).parent('li').children('ul').slideToggle(500);
			}
		});

		//3rd Level Nav
		$('.mobile-menu .navigation > li.dropdown > ul  > li.dropdown > .dropdown-btn').on('click', function (e) {
			e.preventDefault();
			var targetInner = $(this).parent('li').children('ul');

			if ($(targetInner).is(':visible')) {
				$(this).parent('li').removeClass('open');
				$(targetInner).slideUp(500);
				$(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
				$(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
				return false;
			} else {
				$(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
				$(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
				$(this).parent('li').toggleClass('open');
				$(this).parent('li').children('ul').slideToggle(500);
			}
		});

		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function () {
			$('body').addClass('mobile-menu-visible');

		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () {
			$('body').removeClass('mobile-menu-visible');
			$('.mobile-menu .navigation > li').removeClass('open');
			$('.mobile-menu .navigation li ul').slideUp(0);
		});

		$(document).keydown(function (e) {
			if (e.keyCode == 27) {
				$('body').removeClass('mobile-menu-visible');
				$('.mobile-menu .navigation > li').removeClass('open');
				$('.mobile-menu .navigation li ul').slideUp(0);
			}
		});

	}




	// Odometer
	if ($(".odometer").length) {
		$('.odometer').appear();
		$('.odometer').appear(function () {
			var odo = $(".odometer");
			odo.each(function () {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
			window.odometerOptions = {
				format: 'd',
			};
		});
	}



	// Add Current Class Auto
	function dynamicCurrentMenuClass(selector) {
		let FileName = window.location.href.split("/").reverse()[0];

		selector.find("li").each(function () {
			let anchor = $(this).find("a");
			if ($(anchor).attr("href") == FileName) {
				$(this).addClass("current");
			}
		});
		// if any li has .current elmnt add class
		selector.children("li").each(function () {
			if ($(this).find(".current").length) {
				$(this).addClass("current");
			}
		});
		// if no file name return
		if ("" == FileName) {
			selector.find("li").eq(0).addClass("current");
		}
	}

	if ($('.main-header .main-menu .navigation').length) {
		dynamicCurrentMenuClass($('.main-header .main-menu .navigation'));
	}



	//  Animation Fade Left End
	/////////////////////////////////////////////////////
	// CURSOR
	if ($(".cursor").length && $(".cursor-follower").length) {
		var cursor = $(".cursor"),
			follower = $(".cursor-follower");

		var posX = 0,
			posY = 0;

		var mouseX = 0,
			mouseY = 0;

		TweenMax.to({}, 0.016, {
			repeat: -1,
			onRepeat: function () {
				posX += (mouseX - posX) / 9;
				posY += (mouseY - posY) / 9;

				TweenMax.set(follower, {
					css: {
						left: posX - 12,
						top: posY - 12
					}
				});

				TweenMax.set(cursor, {
					css: {
						left: mouseX,
						top: mouseY
					}
				});
			}
		});

		$(document).on("mousemove", function (e) {
			mouseX = e.clientX;
			mouseY = e.clientY;
		});
		//circle
		$(".theme-btn, a").on("mouseenter", function () {
			cursor.addClass("active");
			follower.addClass("active");
		});
		$(".theme-btn, a").on("mouseleave", function () {
			cursor.removeClass("active");
			follower.removeClass("active");
		});
	}
	// CURSOR End




	// Slider One Nav
	var SliderOne_nav = new Swiper(".slider-one__nav", {
		loop: true,
		spaceBetween: 28,
		speed: 500,
		slidesPerView: 3,
		centeredSlides: true,
		direction: "horizontal",
		autoplay: {
			enabled: true,
			delay: 6000
		},
		navigation: {
			nextEl: '.main-slider-next',
			prevEl: '.main-slider-prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".main-slider_pagination",
			clickable: true,
		},
		breakpoints: {
			'2000': {
				slidesPerView: 3,
				direction: "vertical",
			},
			'1500': {
				slidesPerView: 3,
				direction: "vertical",
			},
			'1200': {
				slidesPerView: 3,
				direction: "horizontal",
			},
			'992': {
				slidesPerView: 3,
				direction: "horizontal",
			},
			'991': {
				slidesPerView: 3,
				direction: "horizontal",
			},
			'768': {
				slidesPerView: 3,
				direction: "horizontal",
			},
			'577': {
				slidesPerView: 3,
				direction: "horizontal",
			},
			'0': {
				slidesPerView: 3,
				direction: "horizontal",
			},
		},
	});
	var swiper3 = new Swiper(".slider-one__active", {
		loop: true,
		spaceBetween: 0,
		//Pagination
		//effect: 'fade',
		autoplay: {
			enabled: true,
			delay: 6000
		},
		slidesPerView: 1,
		thumbs: {
			swiper: SliderOne_nav,
		},
	});



	// Single Item Carousel
	var slider = new Swiper('.single-item-carousel', {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.single-item-carousel_next',
			prevEl: '.single-item-carousel_prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".single-item-carousel_pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});



	// Clients Carousel
	var slider = new Swiper('.clients_slider', {
		slidesPerView: 5,
		spaceBetween: 30,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.clients_slider_next',
			prevEl: '.clients_slider_prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".clients_slider_pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 5,
			},
			'992': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});




	// Two Item Carousel
	var slider = new Swiper('.two-item-carousel', {
		slidesPerView: 2,
		spaceBetween: 30,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.two-item-carousel_next',
			prevEl: '.two-item-carousel_prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".two-item-carousel_pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 2,
			},
			'1200': {
				slidesPerView: 2,
			},
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});




	//Add One Page nav
	if ($('.scroll-nav').length) {
		$('.scroll-nav ul').onePageNav();
	}


	//Custom Scroll Linsk / Sidebar
	if ($('.scroll-nav li a').length) {
		$(".scroll-nav li a").on('click', function (e) {
			e.preventDefault();
			$('body').removeClass('mobile-menu-visible');
		});
	}




	//Jquery Spinner / Quantity Spinner
	if ($('.qty-spinner').length) {
		$("input.qty-spinner").TouchSpin({
			verticalbuttons: true
		});
	}



	// Testimonial Section Four Carousel
	if ($('.shop-detail').length) {
		var thumbsCarousel = new Swiper('.shop-detail .thumbs-carousel', {
			spaceBetween: 15,
			slidesPerView: 4,
			//direction: 'vertical',
			breakpoints: {
				320: {
					//direction: 'horizontal',
					slidesPerView: 3,
				},
				640: {
					//direction: 'horizontal',
					slidesPerView: 4,
				},
				1023: {
					slidesPerView: 4,
				}

			}
		});

		var contentCarousel = new Swiper('.shop-detail .content-carousel', {
			spaceBetween: 0,
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			thumbs: {
				swiper: thumbsCarousel
			},
		});
	}



	//Event Countdown Timer
	if ($('.time-countdown').length) {
		$('.time-countdown').each(function () {
			var $this = $(this), finalDate = $(this).data('countdown');
			$this.countdown(finalDate, function (event) {
				var $this = $(this).html(event.strftime('' + '<div class="counter-column"><span class="count">%D</span>Days</div> ' + '<div class="counter-column"><span class="count">%H</span>Hours</div>  ' + '<div class="counter-column"><span class="count">%M</span>Minutes</div>  ' + '<div class="counter-column"><span class="count">%S</span>Seconds</div>'));
			});
		});
	}

	if ($('.clock-wrapper').length) {
		(function () {
			//generate clock animations
			var now = new Date(),
				hourDeg = now.getHours() / 12 * 360 + now.getMinutes() / 60 * 30,
				minuteDeg = now.getMinutes() / 60 * 360 + now.getSeconds() / 60 * 6,
				secondDeg = now.getSeconds() / 60 * 360,
				stylesDeg = [
					"@-webkit-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
					"@-webkit-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
					"@-webkit-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}",
					"@-moz-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
					"@-moz-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
					"@-moz-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}"
				].join("");
			document.getElementById("clock-animations").innerHTML = stylesDeg;
		})();
	}




	// Three Item Carousel
	var slider = new Swiper('.three-item-carousel', {
		slidesPerView: 3,
		spaceBetween: 30,
		loop: false,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.three-item-carousel_next',
			prevEl: '.three-item-carousel_prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".three-item-carousel_pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'870': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});



	// Four Item Carousel
	var slider = new Swiper('.four-item-carousel', {
		slidesPerView: 4,
		spaceBetween: 30,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.four-item-carousel_next',
			prevEl: '.four-item-carousel_prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".four-item-carousel_pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});




	//Custom Seclect Box
	if ($('.custom-select-box').length) {
		$('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}



	const serviceImgItem = document.querySelectorAll(".trading-block_one-inner");
	function followImageCursor(event, serviceImgItem) {
		const contentBox = serviceImgItem.getBoundingClientRect();
		const dx = event.clientX - contentBox.x;
		const dy = event.clientY - contentBox.y;
		serviceImgItem.children[3].style.transform = `translate(${dx}px, ${dy}px)`;
	}

	serviceImgItem.forEach((item, i) => {
		item.addEventListener("mousemove", (event) => {
			setInterval(followImageCursor(event, item), 1000);
		});
	});



	//Accordion Box
	if ($('.accordion-box').length) {
		$(".accordion-box").on('click', '.acc-btn', function () {

			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');

			if ($(this).hasClass('active') !== true) {
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}

			if ($(this).next('.acc-content').is(':visible')) {
				return false;
			} else {
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);
			}
		});
	}




	if ($(".animation_mode").length) {
		$('.animation_mode').marquee({
			speed: 50,
			gap: 20,
			delayBeforeStart: 0,
			direction: 'left',
			duplicated: true,
			pauseOnHover: true,
			startVisible: true,
		});
	}





	// Tabs Box
	if ($('.tabs-box').length) {
		$('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));

			if ($(target).is(':visible')) {
				return false;
			} else {
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}



	///////////////////////////////////////////////////// 
	// Title Animation
	let splitTitleLines = gsap.utils.toArray(".title-anim");

	splitTitleLines.forEach(splitTextLine => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: splitTextLine,
				start: 'top 90%',
				end: 'bottom 60%',
				scrub: false,
				markers: false,
				toggleActions: 'play none none none'
			}
		});

		const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
		gsap.set(splitTextLine, { perspective: 400 });
		itemSplitted.split({ type: "lines" })
		tl.from(itemSplitted.lines, { duration: 1, delay: 0.3, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
	});
	/////////////////////////////////////////////////////



	//Header Search
	if ($('.search-box-outer').length) {
		$('.search-box-outer').on('click', function () {
			$('body').addClass('search-active');
		});
		$('.close-search').on('click', function () {
			$('body').removeClass('search-active');
		});
	}



	// LightBox Image
	if ($('.lightbox-image').length) {
		$('.lightbox-image').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	}



	// LightBox Video
	if ($('.lightbox-video').length) {
		$('.lightbox-video').magnificPopup({
			// disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			iframe: {
				patterns: {
					youtube: {
						index: 'youtube.com',
						id: 'v=',
						src: 'https://www.youtube.com/embed/%id%'
					},
				},
				srcAction: 'iframe_src',
			},
			fixedContentPos: false
		});
	}



	//Contact Form Validation
	if ($('#contact-form').length) {
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				lastname: {
					required: true
				},
				phone: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				message: {
					required: true
				}
			}
		});
	}



	//Scroll To Target
	$('.scroll-to-target').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 0);
		return false;
	});



	// Elements Animation
	if ($('.wow').length) {
		var wow = new WOW(
			{
				boxClass: 'wow',      // animated element css class (default is wow)
				animateClass: 'animated', // animation css class (default is animated)
				offset: 0,          // distance to the element when triggering the animation (default is 0)
				mobile: true,       // trigger animations on mobile devices (default is true)
				live: true       // act on asynchronously loaded content (default is true)
			}
		);
		wow.init();
	}



	/* ==========================================================================
	   When document is Scrollig, do
	   ========================================================================== */

	$(window).on('scroll', function () {
		headerStyle();
	});

	/* ==========================================================================
	   When document is loading, do
	   ========================================================================== */

	$(window).on('load', function () {
		handlePreloader();
	});

	window.initPageScripts = function () {
		console.log('Running initPageScripts...');

		// Example interaction
		const btn = document.querySelector('.back-to-top');
		if (btn) {
			btn.addEventListener('click', () => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			});
		}
		// Marquee
		if ($(".animation_mode").length) {
			$('.animation_mode').marquee({
				speed: 50,
				gap: 20,
				delayBeforeStart: 0,
				direction: 'left',
				duplicated: true,
				pauseOnHover: true,
				startVisible: true,
			});
		}

		// Tabs
		if ($('.tabs-box').length) {
			$('.tabs-box .tab-buttons .tab-btn').off('click').on('click', function (e) {
				e.preventDefault();
				var target = $($(this).attr('data-tab'));

				if (!$(target).is(':visible')) {
					target.parents('.tabs-box').find('.tab-buttons .tab-btn').removeClass('active-btn');
					$(this).addClass('active-btn');
					target.parents('.tabs-box').find('.tabs-content .tab').fadeOut(0).removeClass('active-tab');
					$(target).fadeIn(300).addClass('active-tab');
				}
			});
		}

		// Title Animation
		let splitTitleLines = gsap.utils.toArray(".title-anim");
		splitTitleLines.forEach(splitTextLine => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: splitTextLine,
					start: 'top 90%',
					end: 'bottom 60%',
					toggleActions: 'play none none none'
				}
			});

			const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
			gsap.set(splitTextLine, { perspective: 400 });
			itemSplitted.split({ type: "lines" });
			tl.from(itemSplitted.lines, {
				duration: 1,
				delay: 0.3,
				opacity: 0,
				rotationX: -80,
				force3D: true,
				transformOrigin: "top center -50",
				stagger: 0.1
			});
		});

		// Search Toggle
		$('.search-box-outer').off('click').on('click', function () {
			$('body').addClass('search-active');
		});
		$('.close-search').off('click').on('click', function () {
			$('body').removeClass('search-active');
		});

		// Lightbox Images
		if ($('.lightbox-image').length) {
			$('.lightbox-image').magnificPopup({
				type: 'image',
				gallery: { enabled: true }
			});
		}

		// Lightbox Videos
		if ($('.lightbox-video').length) {
			$('.lightbox-video').magnificPopup({
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false,
				iframe: {
					patterns: {
						youtube: {
							index: 'youtube.com',
							id: 'v=',
							src: 'https://www.youtube.com/embed/%id%'
						}
					},
					srcAction: 'iframe_src'
				}
			});
		}

		// Contact Form Validation
		if ($('#contact-form').length) {
			$('#contact-form').validate({
				rules: {
					username: { required: true },
					lastname: { required: true },
					phone: { required: true },
					email: { required: true, email: true },
					message: { required: true }
				}
			});
		}

		// Smooth Scroll
		$('.scroll-to-target').off('click').on('click', function () {
			$('html, body').animate({ scrollTop: 0 }, 0);
			return false;
		});

		// WOW Animations
		if ($('.wow').length) {
			new WOW({
				boxClass: 'wow',
				animateClass: 'animated',
				offset: 0,
				mobile: true,
				live: true
			}).init();
		}

		// Header on Scroll
		$(window).off('scroll').on('scroll', function () {
			headerStyle(); // Make sure this is globally defined
		});
	};

	// ✅ Place any plugin logic here
	// eg: $('.wow').addClass('animated');


})(window.jQuery);