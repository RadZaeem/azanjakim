import m from "mithril"
import {Auth} from "../models/Auth"

  function fbLoginButtonCb() {
      // Auth.FBInit()
      Auth.initialize()
      console.log("[fbLoginButtonCb] login cb ")
    }

export var FBLoginButton = {
  view: function (vnode) {
    return m("div",{ //m("fb-login-button[login=this.fbLoginButtonCb()]")
    // },      
  // // "attributes": {
  //   // "visible": (Auth.isAnon ? "true" : "false"),
    "onlogin":
    `
      location.reload();

    `
    ,
    "scope":"public_profile,email",
    "data-max-rows": "1",
    "data-size": "large",
    "data-button-type": "continue_with",
    "data-show-faces": "false",
    "data-auto-logout-link": "false",
    "data-use-continue-as": "false",
    "className": "fb-login-button" }) 
        
}
  // },
  // fbLoginButtonCb: function () {
  //     // Auth.FBInit()
  //     Auth.initialize()
  //     console.log("[fbLoginButtonCb] login cb ")
  //   }
}
