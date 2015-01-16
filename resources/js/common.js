var expandNav = true;
var animationTime = 300;
var topOffset;
var mobileLogoHTML = "<a href'#'><img src='resources/images/logo-square.png'/></a>";

function arrowClicked() {
	autoScroll(this, '.header');
}

function minNav() {
	$('.nav-items').animate({paddingTop: "20px",
							height: "40px"}, animationTime);
	$('.sticky-nav').animate({ 'background-color': '#ffffff'}, animationTime, function() {
		$('.sticky-nav').addClass('shadow');
	});
	$('.sticky-nav').fadeTo('slow', 0.95);
	
}

function maxNav() {
	$('.nav-items').animate({paddingTop: "30px",
							height: "55px"}, animationTime);
	$('.sticky-nav').animate({ 'background-color': 'transparent'}, animationTime);
	$('.sticky-nav').fadeTo('slow', 1);
	$('.sticky-nav').removeClass('shadow');
	
}
function autoScroll(fromElem, toElem)
{
	$('html, body').animate({
		scrollTop : $(toElem).offset().top 
	}, 800);
}
function emailValidated(emailField) {
	var atpos = emailField.indexOf("@");
	var dotpos = emailField.lastIndexOf(".");
	if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=emailField.length) {
		return false;
	}
	return true;
}

function formSubmitSuccess()
{
	swal({
		title: 'Submission Success!',
		text: 'I will respond to your email as soon as possible!',
		type: 'success',
		Confirm: 'Done'
	});
}

function formSubmitFail()
{
	swal({
		title: 'Submission Failed!',
		text: 'There was a problem in submitting your message. Please try again later.',
		type: 'error',
		Confirm: 'Done'
	});
}

$(document).ready(function() {
	$('#menu').slicknav({
		label: '',
		prependTo: '.slicknav'
	});

	$('.slicknav_menu').prepend("<a href'#'><img src='resources/images/logo-square.png'/></a>");

	$(window).scroll(function() {
		topOffset = $(window).scrollTop();
		if (topOffset > offsetCheck && expandNav) {
			minNav();
			expandNav = false;
		} else if (topOffset <= offsetCheck && !expandNav) {
			maxNav();
			expandNav = true;
		}
	});
	$('#contactForm').submit(function(event) {
		event.preventDefault();
		var formData = $(this).serialize();
		$.ajax({
			url: "http://formspree.io/kevinchang@live.ca", 
			method: "POST",
			data: formData,
			dataType: "json"
		}).done(function() {
			formSubmitSuccess();
		}).fail(function() {
			formSubmitFail();
		});
	});
});