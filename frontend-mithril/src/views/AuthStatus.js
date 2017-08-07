import "clientjs"
import {api} from "../api"
import m from "mithril"
import {Auth}  from "../models/Auth"
import {FBLoginButton} from "./FBLoginButton"

export var AuthStatus = {
  oninit: function (){
    // api.token("a")
    // Auth.initialize()
    // var a = 
    // Auth.getTokenAndUserWithFBOrAnonFallback()

    // Auth.getTokenAndUserWithFBLogin().then( (result) => {console.log(result)})
    Auth.getTokenAndUserWithFBOrTryFingerprint().then( (result) => {console.log(result)})
    // .then((result) => { 
    //     var a = result; console.log(a)
    //     api.token(result["token"])
    //     // console.log(api.token())
    // })

    // // console.log(Auth.getTokenAndUserWithFBOrAnonFallback())
  },

  view: function (vnode) {
    // api.token("")
    return null
    console.log("[AuthStatus] view: "+"didFBLogin, didAnonLogin "+Auth.didFBLogin+", "+Auth.didAnonLogin)
    // Somehow mithril cannot render fb login butotn here. disabled

    // if (Auth.didAnonLogin) {
    //     return [m(FBLoginButton)]
    //   }

    // // else 
    // if (Auth.didFBLogin) {
    //     return m("div", [
    //     m("p","Welcome, " + Auth.usernameDisplay),
    //     m("a", {"onClick":"FB.logout(function(response) {location.reload()}) "}, "Logout")
    //   ])
    // }
    
    // else {
    //     return m(FBLoginButton)
    //     // return m("p","Loading...")
    // // }
    // return (!Auth.loginStatus=="Anon") ?  m("div", [
    //     m("p","Welcome, " + Auth.usernameDisplay),
    //     m("a", {"onClick":"FB.logout(function(response) {location.reload()}) "}, "Logout")
    //   ]) : (Auth.loginStatus=="Anon") ? m(FBLoginButton) : m("p","Loading...")//m(FBLoginButton)  

    return (Auth.didFBLogin) ?  m("div", [
        m("p","Welcome, " + Auth.usernameDisplay),
        m("a", {"onClick":"FB.logout(function(response) {location.reload()}) "}, "Logout")
      ]) : m(FBLoginButton)
    // (Auth.didAnonLogin) ? m(FBLoginButton) : null   
        
    
    // else {
        // return m("p","Loading...")
    // }
  } 
}