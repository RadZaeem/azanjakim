import "clientjs"
import {api} from "../api"
import m from "mithril"

export var Auth = {
  user: {},
  client: new ClientJS(),
  fingerprint: "",
  isAnon: true,
  usernameDisplay: "",
//   oninit: function () {
// //      FB.init({
// //     appId      : '474493519606356',
// //     cookie     : true,  // enable cookies to allow the server to access 
// //                         // the session
// //     xfbml      : true,  // parse social plugins on this page
// //     version    : 'v2.8' // use graph api version 2.8
// // });
//     this.initialize() // oroginally Auth was not a Component
//     // so initialize function was not oninit
//   },

    // show fb login'd user
    // but anon user remain invisible (although registered)
 

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
          ,
          background:true
        })
      .then(function (result)  {
        api.token(result["token"])
        console.log("success login with fingerprint")

      })
      .catch( (error) =>  {
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
          ,
          background:true

        })
        .then( function(result)  {
          console.log("successfully registered, token: " + result["token"])
          api.token(result["token"])

        })

      })
    },
    initialize: function(vnode)  {
      // note we added FB SDK load script at index.html
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
      this.isAnon = false
      console.log("FBinit, redraw")
      m.redraw()
      // console.log("FBinit, redraw")
      // m.redraw()

      
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
          data: {"token": api.token()},
          background:true
        })
        .then((result)=>{ // token still not expired
          console.log("token refreshed!")
          // console.log(result)
          // get user info
          api.request( {
            method: "GET",
          url: api.url+"rest-auth/user/",
          background:true


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