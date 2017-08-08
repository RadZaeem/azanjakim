import "clientjs"
import {api} from "../api"
import m from "mithril"
import {Auth}  from "../models/Auth"
import {FBLoginButton} from "./FBLoginButton"
import {state} from "../models/state"

export var AuthStatus = {
  oninit: function (){
    //Auth.getTokenAndUserWithFBOrTryFingerprint().then( (result) => {console.log(result)})
    },

  view: function (vnode) {
    // api.token("")
   // Somehow mithril cannot render fb login butotn here. disabled

    if (state.tokenAndUser) {
        return [m("p","Loading")]
      }
    else if (state.tokenAndUser) {
      if (!state.tokenAndUser["user"]["first_name"])
        return [m(FBLoginButton)]
      else
        m("p","Welcome, ")//     + Auth.usernameDisplay)
      }

 
  } 
}