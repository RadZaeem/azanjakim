import m from "mithril"
import {Auth} from "../models/Auth"

function fbLoginButtonCb() {
      // Auth.FBInit()
      // Auth.initialize()
      console.log("[fbLoginButtonCb] login cb ")
    }

    export var FBLoginButton = {
      view: function (vnode) {
//         return m.trust(`
// <div class="fb-login-button" onlogin='location.reload();' data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
//           `)
        return [m("div",{
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
          "className": "fb-login-button" })]
        
      }
    }
