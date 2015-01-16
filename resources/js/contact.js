var reqError = '<small class="error">Required</small>';
var emailError = '<small class="error">Invalid Email</small>';
var offsetCheck = 199;

function validateForm()
{
	//TODO: ADD AJAX
	//TODO: FORM VALIDATION
	$('.input').each(function(i) {
		var value = $(this).val();
		var parent = $(this).closest('.required');
		var noInput = value == null || value == '' ;
		if (noInput) {
			if (!parent.next().is('small')) {
				parent.addClass('error');
				parent.after(reqError);
			} else {
				parent.next().replaceWith(reqError);
			}
		} else if (!noInput) {
			if (i == 1 && !emailValidated(value)) {
				if (!parent.next().is('small')) {
					parent.addClass('error');
					parent.after(emailError);
				} else {
					parent.next().replaceWith(emailError);
				}
			} else if (parent.next().is('small')) {
				parent.removeClass('error');
				parent.next().remove('.error');
			}
		}
	});

	if ($('.required').hasClass('error')) { return false; }
	else { 
		$('#contactForm').trigger('submit');
		return true; 
	}
}
