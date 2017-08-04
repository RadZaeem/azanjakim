import "clientjs"
import {api} from "../api"
import m from "mithril"
import {Auth}  from "../models/Auth"
import {FBLoginButton} from "./FBLoginButton"

export var AuthStatus = {
  oninit: function (){
    // api.token("")
    Auth.initialize()
  },

  view: function (vnode) {
    // api.token("")
    console.log("[AuthStatus] view: "+"didFBLogin, didAnonLogin "+Auth.didFBLogin+", "+Auth.didAnonLogin)

    // if (Auth.didAnonLogin) {
    //     return [m(FBLoginButton)]
    //   }

    // // else 
    if (Auth.didFBLogin) {
        return m("div", [
        m("p","Welcome, " + Auth.usernameDisplay),
        m("a", {"onClick":"FB.logout(function(response) {location.reload()}) "}, "Logout")
      ])
    }
    
    else {
        return m(FBLoginButton)
        // return m("p","Loading...")
    }
  } 
}