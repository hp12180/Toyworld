$(function() {
  $('.error').hide();
  $('input.text-input').css({backgroundColor:"#FFFFFF"});
  $('input.text-input').focus(function(){
    $(this).css({backgroundColor:"#FFDDAA"});
  });
  $('input.text-input').blur(function(){
    $(this).css({backgroundColor:"#FFFFFF"});
  });

  $(".button").click(function() {
		// validate and process form
		// first hide any error messages
    $('.error').hide();
		
	  var name = $("input#name").val();
		if (name == "") {
      $("label#name_error").show();
      $("input#name").focus();
      return false;
    }
		var email = $("input#email").val();
		if (email == "") {
      $("label#email_error").show();
      $("input#email").focus();
      return false;
    }
		var phone = $("input#phone").val();
		if (phone == "") {
      $("label#phone_error").show();
      $("input#phone").focus();
      return false;
    }
	
		var pwd = $("input#pwd").val();
		if (pwd == "") {
      $("label#pwd_error").show();
      $("input#pwd").focus();
      return false;
    }
	
		var pwd2 = $("input#pwd2").val();
		if (pwd2 == "") {
      $("label#pwd2_error").show();
      $("input#pwd2").focus();
      return false;
    }
		
		if (pwd2 != pwd) {
      $("label#pwd3_error").show();
      $("input#pwd2").focus();
      return false;
    }
		
		var dataString = 'name='+ name + '&email=' + email + '&phone=' + phone + '&pwd=' + pwd + '&pwd2=' + pwd2;
		//alert (dataString);return false;
		
		$.ajax({
      type: "POST",
      url: "http://toyworld.in/app/services/new_account.php",
      data: dataString,
      success: function() {
        $('#contact_form').html("<div id='message'></div>");
        $('#message').html("<h2>New Account has been Created!</h2>")
        .append("<p>Congratulations.</p>")
        .hide()
        .fadeIn(1500, function() {
          $('#message').append("<img id='checkmark' src='img/register/check.png' />");
        });
      }
     });
    return false;
	});
});
runOnLoad(function(){
  $("input#name").select().focus();
});
