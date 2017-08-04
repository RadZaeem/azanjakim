import "clientjs"
import {api} from "../api"
import m from "mithril"
import {Auth}  from "../models/Auth"
import {FBLoginButton} from "./FBLoginButton"

// var FBLoginButton = {
//   view: function (vnode) {
//     return m("div", {
//   // "attributes": {
//     // "visible": (Auth.isAnon ? "true" : "false"),
//     // "onlogin":this.fbLoginButtonCb(),
//     "scope":"public_profile,email",
//     "data-max-rows": "1",
//     "data-size": "large",
//     "data-button-type": "login_with",
//     "data-show-faces": "false",
//     "data-auto-logout-link": "false",
//     "data-use-continue-as": "false",
//     "className": "fb-login-button" }) 
        

//   }
// }

// console.log(FBLoginButton)

export var AuthStatus = {
  oninit: function (){
Auth.initialize()
},

    // show fb login'd user
    // but anon user remain invisible (although registered)
    view: function (vnode) {
      console.log("[AuthStatus] "+"isAnon "+Auth.isAnon)

      if (Auth.isAnon)
//         return m.trust(`
//           <script>
//           function checkLoginState() {
//             Auth.initialize()
//             console.log("")
//   }
//           </script>

//           <fb:login-button scope="public_profile,email" 
//           onlogin="require("../models/Auth");Auth.initialize();">
// </fb:login-button>

// `)
      return m(FBLoginButton)

// else return m("p","Welcome, " + Auth.usernameDisplay)
  // m("button","Logout"),
 
// :[   m("input", {"class":"button", "value":"Logout"} )]

        

    },

fbLoginButtonCb: function () {
      // Auth.FBInit()
      Auth.initialize()
      console.log("[AuthStatus] login cb ")
      // location.reload();

      
    //   FB.login(function(response) {
    //     console.log(response)
    //      if (response.authResponse) {
    //  console.log('Welcome!  Fetching your information.... ');
    //   }
    // })
  }
  } 