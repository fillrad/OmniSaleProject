$(document).ready(function(){
	
	$('.login__form button[type=submit]').attr('disabled', 'disabled');
    
    // Masks
    
    $('#phone').mask('0 ( 000 ) 000-00-00');
    
    var phone    = $('#phone').val();
    var password = $('#password').val();
	var input    = $('#password');
    
    $('.login__form .login__input-item').on('keydown, keyup', function(){
		
		//e.preventDefault(); 
         
        phone    = $('#phone').val();
        password = $('#password').val(); 
        
        if(phone.length == 19){
            $('#phone').parent('.login__input-container').addClass('validated').removeClass('not-validated');
        } else if (phone === ''){
            $('#phone').parent('.login__input-container').removeClass('not-validated').removeClass('validated');
        } else{
            $('#phone').parent('.login__input-container').addClass('not-validated').removeClass('validated');
        }
        if(password.length >= 5){
            $('#password').parent('.login__input-container').addClass('validated').removeClass('not-validated');
        } else if (password === ''){
            $('#password').parent('.login__input-container').removeClass('not-validated').removeClass('validated');          
        } else {
            $('#password').parent('.login__input-container').addClass('not-validated').removeClass('validated');
        }
        if(password.length >= 5 && phone.length == 19){
            $('.login__form button[type=submit]').removeAttr('disabled');
        } else {
            $('.login__form button[type=submit]').attr('disabled', 'disabled');
        }
		
    }); 
	
});

function loginForm(){ 
	var params = $('#loginForm').serialize();
	//var url = 'login.php';
	$.ajax({
		type: 'GET',
		//url: url,
		data: params,
		success: function(data) {
            //$('#loginForm').after(data);
			$('#loginForm').after('<div id="form-result">Форма отправлена!</div>')
            $('#loginForm').remove();
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});
}