
$(document).ready(function(){

	if ($(window).width() > 991) {
		$(".line__up--container").on("mouseenter" ,function(){
			pause();
			pause2();
		});
		$(".line__up--container").on("mouseleave" ,function(){
			play();
		});
		let tickerSpeed =0.3;
		let flickity = null;
		let isPaused = false;
		const slideshowEl = document.querySelector('.line__up--left');
		const slideshowEl2 = document.querySelector('.line__up--right');

		const update = () => {
		  if (isPaused) return;
		  if (flickity.slides) {
		    flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
		    flickity.selectedIndex = flickity.dragEndRestingSelect();
		    flickity.updateSelectedSlide();
		    flickity.settle(flickity.x);
		  }
		  window.requestAnimationFrame(update);
		};

		const pause = () => {
		  isPaused = true;
		};

		const play = () => {
		  if (isPaused) {
		    isPaused = false;
		    window.requestAnimationFrame(update);
		    window.requestAnimationFrame(update2);
		  }
		};


		flickity = new Flickity(slideshowEl, {
		  autoPlay: false,
		  prevNextButtons: true,
		  pageDots: false,
		  draggable: true,
		  wrapAround: true,
		  selectedAttraction: 0.015,
		  friction: 0.25
		});
		flickity.x = 0;

		update();

		const update2 = () => {
		  if (isPaused) return;
		  if (flickity2.slides) {
		    flickity2.x = (flickity2.x + tickerSpeed) % flickity2.slideableWidth;
		    flickity2.selectedIndex = flickity2.dragEndRestingSelect();
		    flickity2.updateSelectedSlide();
		    flickity2.settle(flickity2.x);
		  }
		  window.requestAnimationFrame(update2);
		};

		const pause2 = () => {
		  isPaused = true;
		};

		flickity2 = new Flickity(slideshowEl2, {
		  autoPlay: false,
		  prevNextButtons: true,
		  pageDots: false,
		  draggable: true,
		  wrapAround: true,
		  selectedAttraction: 0.015,
		  friction: 0.25
		});
		flickity2.x = 0;

		update2();

	}



	$('.modal__form').on("click" , function(e){
		e.preventDefault();
		$('.modal__wrapper').fadeIn(300);
		$("body,html").css("overflow-y" , "hidden");
	});

	$(document).click(function(event) { 
	  var $target = $(event.target);
	  if(!$target.closest('.inner__modal').length && !$target.closest('.modal__form').length) {
	  	$(".modal__wrapper").fadeOut(300);
	  	$("body,html").css("overflow-y" , "auto");
	  }        
	});

	$(".modal__wrapper .modal__box>a").on("click" ,function(e){
		e.preventDefault();
		$(this).closest(".modal__wrapper").fadeOut(300);
		$("body,html").css("overflow-y" , "auto");
	});

	$('.scrollable__head').on("click" ,function(e){
		e.preventDefault();
		var currentBlock = $(this);
		$('html').animate({ 
    	    scrollTop: $($(currentBlock).attr("data-block")).offset().top - $("header").css("height").slice(0 , -2)
        }, 1000
        );
	});

	$(window).on('scroll' ,function(){
		if ($(window).scrollTop() > 1) {
			$('header').addClass("float__header")
		} else {
			$('header').removeClass("float__header")			
		}
	});
	if ($(window).scrollTop() > 1) {
		$('header').addClass("float__header")
	} else {
		$('header').removeClass("float__header")			
	}
	$(".inner__preloader video").on("ended" ,function(){
		if(document.readyState === 'ready' || document.readyState === 'complete') {
			$(".preloader").fadeOut(300);
			$("body,html").css("overflow-y" , "auto");
		} else {
			$(".preloader p").fadeIn(300);
		  document.onreadystatechange = function () {
		    if (document.readyState == "complete") {
		    	$(".preloader").fadeOut(300);
		    	$("body,html").css("overflow-y" , "auto");
		    }
		  }
		}
	});

	function validateEmail($email) {
	  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	  return emailReg.test( $email );
	}

	if ($(".line__up--container").length) {
		if ($(window).width() > 991) {
		} else{
			$('.copy__line').remove();
			$('.elem__line--up').each(function(index,elem){
				$(this).closest(".line__up--container").append(elem);
			});
			$(".line__up--left").remove();
			$(".line__up--right").remove();
			$(".line__up--container").slick({
				slidesToShow:1,
				dots:true,
				arrows:false,
				adaptiveHeight:true
			});
		}
	}
	$("body").on("input" , "#mc_embed_signup_scroll input[type='email']" ,function(e){
		e.preventDefault();
		$(this).removeClass("error");
		$(".submit__form").slideUp(300);
	});
	$(".form__info #mc_embed_signup form").on("submit" ,function(e){
		e.preventDefault();
		var errors = 0;
		var currentForm = $(this);
		if (!validateEmail($(this).find("input[type='email']").val()) || $(this).find("input[type='email']").val().length == 0) {
			$(this).find("input[type='email']").addClass("error");
			$(currentForm).find('.submit__form').slideDown(300);
			$(currentForm).find('.submit__form').addClass("error__submit");
			$(currentForm).find('.submit__form>p').text("Please enter an email address")
			errors++;
		} else {
   			$(currentForm).find('.submit__form>p').text("thank you, we'll send you an email shortly");
   			$(currentForm).find('.submit__form').slideDown(300);
   			$(currentForm).find('.submit__form').removeClass("error__submit");
   			submitSubscribeForm($(".form__info form"));
   			setTimeout(function(){
				$(currentForm).find("input[type='email']").val("");
   			},500);
   			setTimeout(function(){
       			$(currentForm).find('.submit__form').slideUp(300);	           				
   			},3500);
		}
	});

	function submitSubscribeForm($form, $resultElement) {
        $.ajax({
            type: "POST",
            url: $form.attr("action"),
            data: $form.serialize(),
            cache: false,
            dataType: "jsonp",
            jsonp: "c",
            contentType: "application/json; charset=utf-8",

            error: function(error){},

            success: function(data){
                if (data.result != "success") {
                } else { 
                }
            }
        });
    }
});