import "clientjs"
import {api} from "../api"
import m from "mithril"

export var Auth = {
  user: {},
  client: new ClientJS(),
  fingerprint: "",
  isAnonLogin: true,
  usernameDisplay: "",

    // on backend, anon user with fingerprint and fb login user are same
    // but on frontend, we must make anon user invisibly logged in
    // due to parsedtimes at backend require a user, so need to create one even new user
    getTestToken: function () {
      api.request(
      {
        method: "POST",
        url: api.url+"api-token-auth/",
        data: {"username":"qweqweqwe","password":"qweqweqwe"},
      }
      )
      .then(function(result) {
        api.token(result["token"])
        console.log("update test token: " +api.token())
        return result

      })
    },


    loginOrRegisterFingerprint: function() {
      this.fingerprint = this.client.getFingerprint().toString();
      console.log("using fingerprint " + this.fingerprint )


      m.request ({
          method: "POST",
          url: api.url+"api-token-auth/",
          data: 
          { 
            "username": this.fingerprint,
            "password": "a"+this.fingerprint
          }
        })
      .then( (result) => {
        api.token(result["token"])
        console.log("success login with fingerprint")

      })
      .catch( (error) => {
        console.log("attempt register")
        // register
        m.request({
          method: "POST",
          url: api.url+"rest-auth/registration/",
          data: 
          { 
            "username": this.fingerprint,
            // "email": "",
            "password1": "a"+this.fingerprint,
            "password2": "a"+this.fingerprint,
          }

        })
        .then( (result) => {
          console.log("successfully registered, token: " + result["token"])
          api.token(result["token"])

        })

      })
    },
    initialize: function(vnode)  {
      // console.log(FB)
      // if (typeof(FB).und)
      FB.init({
    appId      : '474493519606356',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
});
      FB.getLoginStatus(function(response) {
        console.log("callback FB login: ")
        console.log(response)
        if (response["status"]=="connected") {
          Auth.FBInit()

        }
        else{
          Auth.anonInit()
        }
    // statusChangeCallback(response);
})
},
    FBInit: function (vnode) {
      
    },

      // TODO get FB login status FIRST
      // If no FB login, proceed using existing anon token 
//       FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });
    anonInit: function(vnode) {
      console.log("initializing, using token: "+api.token())
      if (api.token()) { //token exist
        m.request( {
          method: "POST",
          url: api.url+"api-token-refresh/",
          data: {"token": api.token()}
        })
        .then((result)=>{ // token still not expired
          console.log("token refreshed!")
          // console.log(result)
          // get user info
          api.request( {
            method: "GET",
          url: api.url+"rest-auth/user/",


          })
          .then( (result) => {
            this.user = result

            // console.log("updated user info :" + JSON.stringify(this.user))
            // if (this.user.first_name) {
            //   this.usernameDisplay = this.user.first_name + " " + this.user.last_name
            //   this.isAnonLogin = false
            //    console.log(this.usernameDisplay)
            // }
            // else {
            //   this.usernameDisplay = ""
            //   this.isAnonLogin = true
            //    console.log("anonLogin is: "+this.isAnonLogin)
            // }
            // console.log(this.usernameDisplay)

          })



        })
        .catch((error)=>{
          if (error["non_field_errors"])
            console.log("expired token or invalid")
        
        })
      }
        else { // get new token
          this.loginOrRegisterFingerprint()


        }
      },


    loginFingerprint: function() {

    },

    loginFacebook: function() {

    },
    // django-rest-auth register username,password with fingerprint
    registerFingerprint: function() {
    }
  }



//  // This is called with the results from from FB.getLoginStatus().
//  function statusChangeCallback(response) {
//     console.log('statusChangeCallback');
//     console.log(response);
//     // The response object is returned with a status field that lets the
//     // app know the current login status of the person.
//     // Full docs on the response object can be found in the documentation
//     // for FB.getLoginStatus().
//     if (response.status === 'connected') {
//       // Logged into your app and Facebook.
//       testAPI();
//       var uid = response.authResponse.userID;
//       var accessToken = response.authResponse.accessToken;
//       document.getElementById('status').innerHTML =
//       uid + ': ' + accessToken
//   } else if (response.status === 'not_authorized') {
//       // The person is logged into Facebook, but not your app.
//       document.getElementById('status').innerHTML = 'Please log ' +
//       'into this app.';
//   } else {
//       // The person is not logged into Facebook, so we're not sure if
//       // they are logged into this app or not.
//       document.getElementById('status').innerHTML = 'Please log ' +
//       'into Facebook.';
//   }
// }

//   // This function is called when someone finishes with the Login
//   // Button.  See the onlogin handler attached to it in the sample
//   // code below.
//   function checkLoginState() {
//     FB.getLoginStatus(function(response) {
//       statusChangeCallback(response);
//   });
// }

// window.fbAsyncInit = function() {
//   FB.init({
//     appId      : '474493519606356',
//     cookie     : true,  // enable cookies to allow the server to access 
//                         // the session
//     xfbml      : true,  // parse social plugins on this page
//     version    : 'v2.8' // use graph api version 2.8
// });

//   // Now that we've initialized the JavaScript SDK, we call 
//   // FB.getLoginStatus().  This function gets the state of the
//   // person visiting this page and can return one of three states to
//   // the callback you provide.  They can be:
//   //
//   // 1. Logged into your app ('connected')
//   // 2. Logged into Facebook, but not your app ('not_authorized')
//   // 3. Not logged into Facebook and can't tell if they are logged into
//   //    your app or not.
//   //
//   // These three cases are handled in the callback function.

//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });

// };

//   // Load the SDK asynchronously
//   (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s); js.id = id;
//     js.src="https://connect.facebook.net/en_US/all.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

//   // Here we run a very simple test of the Graph API after login is
//   // successful.  See statusChangeCallback() for when this call is made.
//   function testAPI() {
//     console.log('Welcome!  Fetching your information.... ');
//     FB.api('/me', function(response) {
//       console.log('Successful login for: ' + response.name);
//     //   var uid = response.authResponse.userID;
//     // var accessToken = response.authResponse.accessToken;
//     //   document.getElementById('status').innerHTML =
//     //     uid + ': ' + accessToken
// });
// }




