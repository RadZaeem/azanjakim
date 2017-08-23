import "clientjs"
import {api} from "../api"
import m from "mithril"
import {Auth}  from "../models/Auth"
import {FBLoginButton} from "./FBLoginButton"
import {state} from "../models/state"
const FBPromise  = require('fb-promise-wrapper')

export var AuthStatus = {
  oninit: function (){
    //Auth.getTokenAndUserWithFBOrTryFingerprint().then( (result) => {console.log(result)})
    },

  view: function (vnode) {
        return [m(FBLoginButton)] // must include button here..

    if (!state.didAuth)//(!state.tokenAndUser) 
        return [m(FBLoginButton), "..."] // must include button here..
    else if (state.tokenAndUser["user"]["first_name"]=="") 
        return [m(FBLoginButton), ""] // ..or it wont show here
    else if (state.tokenAndUser["user"]["first_name"])
        return ["Assalamualaikum,  " +state.tokenAndUser["user"]["first_name"]+"! ", 
            // m("a", {"onClick":"FB.logout(function(response) {location.reload()}) "}, "[Logout]"))]
        m("a", {"onClick":"FB.logout(function(response) {location.reload()}) "}, "[Logout]")]
        //     + Auth.usernameDisplay
        // m("a", {"onClick":"FBPromise.logout().then(function(response) {location.reload()}) "}, "[Logout]")]//     + Auth.usernameDisplay
      
      
    // if (!state.tokenAndUser) {
    //     return [m("p","Loading")]
    //   }
    // else if (state.tokenAndUser) {
    //   if (!state.tokenAndUser["user"]["first_name"])
    //     return [m(FBLoginButton)]
    //   else
    //     return [m("p","Welcome, " +state.tokenAndUser["user"]["first_name"]),
    //     m("a", {"onClick":"FB.logout(function(response) {location.reload()}) "}, "Logout")]//     + Auth.usernameDisplay)
      
    //   }

  } 
}