var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });


$(document).ajaxError(function(event, request, settings) {
	$('#busy').append('Error accessing the server');
});

function checkPreAuth() {
	console.log("checkPreAuth");
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    if(u != '' && p!= '') {
        $.getJSON(serviceURL + 'login.php?id=' + u + '&pwd='+p, function(data) {
            if(res == true) {
                //store
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;   
				$('#busy').hide();
				$('#login').hide();
				$('#userDet li').remove();
				pdetails = data.items;
				$.each(pdetails, function(index, pdetail) {
					$('#userDet').append('<li>' + pdetail.customers_firstname + ' ' + pdetail.customers_lastname + 
					'<br>' + pdetail.customers_email_address + '<br>'+ pdetail.customers_id + '<br>');
				});
				setTimeout(function(){
				scroll.refresh();
				});				
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         $("#submitButton").removeAttr("disabled");
        },"json");
    } else {
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}