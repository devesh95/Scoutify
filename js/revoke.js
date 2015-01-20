function disconnectUser(access_token) {
    "use strict";
	if(facebook) {
		FB.logout(function(response) {
			// Person is now logged out
		});
	}
	if(gmail) {
		gapi.auth.signOut();
		var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token;

		// Perform an asynchronous GET request.
		$.ajax({
			type: 'GET',
			url: revokeUrl,
			async: false,
			contentType: "application/json",
			dataType: 'jsonp',
			success: function(nullResponse) {
			// Do something now that user is disconnected
			// The response is always undefined.
			},
			error: function (e) {
				// Handle the error
				// console.log(e);
				// You could point users to manually disconnect if unsuccessful
				// https://plus.google.com/apps
			}
		});
	}
}
// Could trigger the disconnect on a button click
$('#revokeButton').click(disconnectUser);