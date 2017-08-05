import "styles/main.scss"
import m from "mithril"

import { routes, generate } from "routes/routes"

 // This is called with the results from from FB.getLoginStatus().
 function statusChangeCallback(response) {
    console.log('statusChangeCallback');

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
      document.getElementById('status').innerHTML =
      uid + ': ' + accessToken
  } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}



  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
      document.getElementById('status').innerHTML =
        uid + ': ' + accessToken
});
}

FB.init({
      appId      : '474493519606356',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });

var routes_values = Object.values(routes);
var r = {}

for (var i = 0; i < routes_values.length; i++) {
    r[routes_values[i].path] = {render: routes_values[i].render}
}


// console.log(JSON.stringify(routes))
// console.log(JSON.stringify(r))
m.route.prefix("")
m.route(document.getElementById("app"), "/", r)
//     console.log(response);
