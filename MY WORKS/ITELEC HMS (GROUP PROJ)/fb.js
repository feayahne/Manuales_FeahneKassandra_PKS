window.fbAsyncInit = function() {
    FB.init({
      appId      : '844173574593960', // Replace 'YOUR_APP_ID' with your actual Facebook App ID
      cookie     : true,
      xfbml      : true,
      version    : 'v12.0'
    });
  
    FB.AppEvents.logPageView();   
  };
  
  // Load the SDK asynchronously
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  
  function facebookLogin() {
    FB.login(function(response) {
      if (response.status === 'connected') {
        // Logged into your webpage and Facebook.
        FB.api('/me', {fields: 'name,email'}, function(response) {
          console.log('Successful login for: ' + response.name);
          console.log('Email: ' + response.email);
          // Here you can send the response data to your server to create or authenticate the user
        });
      } else {
        // The person is not logged into your webpage or we are unable to tell.
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'public_profile,email'});
  }