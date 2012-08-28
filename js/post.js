$(document).bind('deviceready', function(){
    $(function(){
        $('form').submit(function(){
            var landmarkID = $(this).parent().attr('data-landmark-id');
            var postData = $(this).serialize();
            $.ajax({
                type: 'POST',
                data: postData+'&lid='+landmarkID,
                url: 'http://toyworld.in/app/services/login.php',
                success: function(data){
                    console.log(data);
                    alert('You have successfully logged in.');
                },
                error: function(){
                    console.log(data);
                    alert('There was an error in your credentials');
                }
            });
            return false;
        });
    });
});